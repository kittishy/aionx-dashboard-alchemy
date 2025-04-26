
import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface AuthContextData {
  user: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean }>;
  signUp: (email: string, password: string, userData: { username: string }) => Promise<{ success: boolean; error?: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se já existe uma sessão ativa
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);

      // Configurar listener para mudanças na autenticação
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null);
        }
      );

      // Remover listener quando o componente desmontar
      return () => {
        subscription.unsubscribe();
      };
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Falha ao entrar: " + error.message);
        throw error;
      }
      
      toast.success("Login realizado com sucesso!");
      return { success: true };
    } catch (error: any) {
      console.error("Erro ao fazer login:", error.message);
      return { success: false };
    }
  };

  const signUp = async (email: string, password: string, userData: { username: string }) => {
    try {
      if (!userData?.username) {
        toast.error("Nome de usuário é obrigatório");
        throw new Error("Nome de usuário é obrigatório");
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: userData.username,
          },
        },
      });

      if (error) {
        toast.error("Falha ao criar conta: " + error.message);
        throw error;
      }
      
      toast.success("Conta criada com sucesso! Por favor, verifique seu e-mail.");
      return { success: true };
    } catch (error: any) {
      console.error("Erro ao criar conta:", error.message);
      return { success: false, error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
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
        loading,
        signIn,
        signUp,
        signOut,
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
