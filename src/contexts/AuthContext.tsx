
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, signIn, signOut, signUp, supabase } from "@/lib/supabase";
import { User } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error: any }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Verificar o usuário atual quando o componente é montado
    const checkUser = async () => {
      try {
        const { user, error } = await getCurrentUser();
        if (error) throw error;
        setUser(user as unknown as User);
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Setup auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user as unknown as User);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    checkUser();

    // Cleanup
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await signUp(email, password);
      if (error) throw error;
      
      toast({
        title: "Conta criada com sucesso",
        description: "Por favor verifique seu email para confirmar sua conta.",
      });
      
      return { success: true, error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: error.message || "Ocorreu um erro ao tentar criar sua conta.",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await signIn(email, password);
      if (error) throw error;
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
      
      return { success: true, error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: error.message || "Email ou senha incorretos. Tente novamente.",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer logout",
        description: error.message || "Ocorreu um erro ao tentar desconectar.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp: handleSignUp,
        signIn: handleSignIn,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
