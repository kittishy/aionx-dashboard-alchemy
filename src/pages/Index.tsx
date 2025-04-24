
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Redireciona para o dashboard se estiver autenticado, caso contrário para o login
  return user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />;
};

export default Index;
