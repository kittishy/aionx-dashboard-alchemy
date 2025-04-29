
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
}

interface AuthContextData {
  user: any;
  discordUser: DiscordUser | null;
  loading: boolean;
  loginWithDiscord: () => Promise<void>;
  signOut: () => Promise<void>;
  testLogin: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [discordUser, setDiscordUser] = useState<DiscordUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTestMode, setIsTestMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função para buscar dados do Discord
  const fetchDiscordUserData = useCallback(async (user: any) => {
    try {
      // Em um cenário real, aqui faríamos uma chamada para nossa API backend
      // que usaria o access_token do Discord para obter os dados do usuário
      // Para simulação, vamos usar dados mock
      
      // Simula o delay de uma requisição real
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mocked Discord user data - em produção, isso viria da API do Discord
      const mockDiscordData: DiscordUser = {
        id: user.id.substring(0, 8),
        username: "discord_user",
        avatar: "default",
        discriminator: "0000"
      };
      
      setDiscordUser(mockDiscordData);
    } catch (error) {
      console.error("Erro ao buscar dados do Discord:", error);
      toast.error("Não foi possível carregar seus dados do Discord");
    }
  }, []);

  useEffect(() => {
    // Função para verificar a sessão atual
    const checkSession = async () => {
      try {
        // Checar se está no modo de teste
        const testMode = localStorage.getItem("aionx_test_mode");
        if (testMode === "true") {
          setIsTestMode(true);
          setUser({ id: "test-user", email: "test@example.com" });
          setIsAuthenticated(true);
          
          // Simular dados do Discord no modo de teste
          const testDiscordData: DiscordUser = {
            id: "test1234",
            username: "Teste_User",
            avatar: "https://cdn.discordapp.com/embed/avatars/2.png",
            discriminator: "0000"
          };
          setDiscordUser(testDiscordData);
          
          setLoading(false);
          return;
        }

        // Verificar se já existe uma sessão ativa
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
        setIsAuthenticated(!!session?.user);
        
        if (session?.user) {
          // Se houver um usuário logado, tenta buscar os dados do Discord
          fetchDiscordUserData(session.user);
        }
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    // Configurar listener para mudanças na autenticação
    const setupAuthListener = () => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log("Auth state changed:", event);
          setUser(session?.user || null);
          setIsAuthenticated(!!session?.user);
          
          if (session?.user) {
            // Atualiza os dados do Discord quando o estado de autenticação muda
            fetchDiscordUserData(session.user);
          } else {
            setDiscordUser(null);
          }
        }
      );

      return subscription;
    };

    // Inicializar autenticação
    const initAuth = async () => {
      const subscription = setupAuthListener();
      await checkSession();
      
      return () => {
        subscription.unsubscribe();
      };
    };

    const unsubscribe = initAuth();
    return () => {
      unsubscribe.then(fn => fn());
    };
  }, [fetchDiscordUserData]);

  const loginWithDiscord = async () => {
    try {
      setLoading(true);
      // Em um ambiente real, isso redirecionaria para a autenticação do Discord
      // await supabase.auth.signInWithOAuth({
      //   provider: 'discord',
      //   options: {
      //     redirectTo: window.location.origin
      //   }
      // });
      
      // Para simular sem integração real:
      // Simula o delay de uma requisição real
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simula um login bem-sucedido com dados de usuário mock
      const mockUser = { 
        id: "discord-" + Math.random().toString(36).substring(2, 10),
        email: "discord_user@example.com"
      };
      
      const mockDiscordData: DiscordUser = {
        id: mockUser.id.substring(0, 8),
        username: "AionX_User",
        avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
        discriminator: "1234"
      };
      
      setUser(mockUser);
      setDiscordUser(mockDiscordData);
      setIsAuthenticated(true);
      
      toast.success("Login realizado com sucesso! Bem-vindo(a) ao AionX Dashboard.");
      window.location.href = "/"; // Redireciona para a dashboard
      
    } catch (error: any) {
      console.error("Erro ao fazer login com Discord:", error);
      toast.error("Falha ao conectar com Discord: " + (error.message || "Erro desconhecido"));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const testLogin = () => {
    localStorage.setItem("aionx_test_mode", "true");
    setIsTestMode(true);
    
    // Define um usuário de teste
    const testUser = { 
      id: "test-user",
      email: "test@example.com"
    };
    
    const testDiscordData: DiscordUser = {
      id: "test1234",
      username: "Teste_User",
      avatar: "https://cdn.discordapp.com/embed/avatars/2.png",
      discriminator: "0000"
    };
    
    setUser(testUser);
    setDiscordUser(testDiscordData);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    try {
      setLoading(true);
      // Se estiver no modo de teste, apenas limpa o localStorage
      if (isTestMode) {
        localStorage.removeItem("aionx_test_mode");
        setIsTestMode(false);
        setUser(null);
        setDiscordUser(null);
        setIsAuthenticated(false);
        toast.success("Sessão encerrada com sucesso!");
        window.location.href = "/login";
        return;
      }
      
      // Caso contrário, faz logout normal do Supabase
      await supabase.auth.signOut();
      setDiscordUser(null);
      setIsAuthenticated(false);
      toast.success("Sessão encerrada com sucesso!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao encerrar a sessão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        discordUser,
        loading,
        loginWithDiscord,
        signOut,
        testLogin,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
