
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // If no Supabase configuration, show a helpful message
  if (import.meta.env.VITE_SUPABASE_URL === undefined || import.meta.env.VITE_SUPABASE_ANON_KEY === undefined) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Configuração Necessária</h1>
        <p className="max-w-md mb-8 text-muted-foreground">
          Este projeto requer uma conexão com o Supabase para funcionar corretamente. 
          Por favor, clique no botão verde do Supabase no canto superior direito da interface
          e conecte ou crie um projeto Supabase.
        </p>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-sm text-muted-foreground mb-2">
            Depois de conectar, você precisará criar uma tabela chamada "connections" com os seguintes campos:
          </p>
          <ul className="list-disc text-sm text-left text-muted-foreground mb-6">
            <li>id (uuid, primary key)</li>
            <li>user_id (uuid, obrigatório) - referência para auth.users.id</li>
            <li>server_id (text, obrigatório)</li>
            <li>channel_id (text, obrigatório)</li>
            <li>name (text, obrigatório)</li>
            <li>active (boolean, obrigatório, padrão: false)</li>
            <li>created_at (timestamp, padrão: now())</li>
          </ul>
        </div>
      </div>
    );
  }

  // Redireciona para o dashboard se estiver autenticado, caso contrário para o login
  return user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />;
};

export default Index;
