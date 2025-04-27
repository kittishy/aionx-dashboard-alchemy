
import React, { createContext, useState, useEffect, useContext } from "react";
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
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [discordUser, setDiscordUser] = useState<DiscordUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    // Checar se está no modo de teste
    const testMode = localStorage.getItem("aionx_test_mode");
    if (testMode === "true") {
      setIsTestMode(true);
      setUser({ id: "test-user", email: "test@example.com" });
      setLoading(false);
      return;
    }

    // Verificar se já existe uma sessão ativa
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      if (session?.user) {
        // Se houver um usuário logado, tenta buscar os dados do Discord
        fetchDiscordUserData(session.user);
      }
      
      setLoading(false);

      // Configurar listener para mudanças na autenticação
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user || null);
          
          if (session?.user) {
            // Atualiza os dados do Discord quando o estado de autenticação muda
            fetchDiscordUserData(session.user);
          } else {
            setDiscordUser(null);
          }
        }
      );

      // Remover listener quando o componente desmontar
      return () => {
        subscription.unsubscribe();
      };
    };

    checkSession();
  }, []);

  const fetchDiscordUserData = async (user: any) => {
    try {
      // Em um cenário real, aqui faríamos uma chamada para nossa API backend
      // que usaria o access_token do Discord para obter os dados do usuário
      // Para simulação, vamos usar dados mock
      
      // Simula o delay de uma requisição real
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
  };

  const loginWithDiscord = async () => {
    try {
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
      
      toast.success("Login realizado com sucesso!");
      window.location.href = "/"; // Redireciona para a dashboard
      
    } catch (error: any) {
      console.error("Erro ao fazer login com Discord:", error);
      toast.error("Falha ao conectar com Discord: " + (error.message || "Erro desconhecido"));
      throw error;
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
  };

  const signOut = async () => {
    try {
      // Se estiver no modo de teste, apenas limpa o localStorage
      if (isTestMode) {
        localStorage.removeItem("aionx_test_mode");
        setIsTestMode(false);
        setUser(null);
        setDiscordUser(null);
        toast.success("Sessão encerrada com sucesso!");
        window.location.href = "/login";
        return;
      }
      
      // Caso contrário, faz logout normal do Supabase
      await supabase.auth.signOut();
      setDiscordUser(null);
      toast.success("Sessão encerrada com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao encerrar a sessão");
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
        testLogin
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
