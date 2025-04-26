import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Star } from "lucide-react";

const RegisterPage: React.FC = () => {


  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center cosmic-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm font-medium text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col cosmic-bg">
      {/* Animated stars */}
      <div className="stars-container absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      {/* Círculos de brilho decorativos */}
      <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[100px]"></div>
      <div className="absolute right-[-5%] bottom-[20%] h-[30%] w-[30%] rounded-full bg-cyan-500/5 blur-[100px]"></div>
      
      <header className="flex h-16 items-center justify-between px-4 lg:px-8 z-10">
        <div className="flex items-center">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/20 shadow-neon">
            <img 
              src="/lovable-uploads/122ff0c7-1c56-489c-9976-1bbe2a79d4bf.png" 
              alt="AionX logo" 
              className="h-full w-full object-cover" 
            />
          </div>
          <h1 className="ml-3 text-xl font-semibold tracking-tight">
            <span className="gradient-text font-display">AionX</span>
          </h1>
        </div>
      </header>
      
      <main className="flex flex-1 items-center justify-center p-6 z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter font-display gradient-text">Crie sua conta</h2>
            <p className="mt-2 text-muted-foreground">
              Registre-se para acessar todos os recursos
            </p>
          </div>
          
          <div className="mt-10">
            <RegisterForm />
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="fixed bottom-0 left-0 w-full">
        <div className="p-4 sm:p-6 rounded-t-xl backdrop-blur-lg bg-black/20 flex justify-center transition-all duration-300">
          <p className="text-sm text-white font-light flex items-center gap-2">
            © 2025 AionX Dashboard. Todos os direitos reservados.
            <Star className="h-4 w-4 animate-pulse-slow text-primary" />
          </p>
        </div>
      </footer>
      
    </div>
  );
};

export default RegisterPage;
