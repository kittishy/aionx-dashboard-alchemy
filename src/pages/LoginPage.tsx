
import { useTheme } from "@/contexts/ThemeContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
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
    <div className="flex min-h-screen flex-col bg-background">
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      
      <header className="flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary">
            <span className="text-xl font-bold text-primary-foreground">A</span>
          </div>
          <h1 className="ml-3 text-xl font-semibold tracking-tight">
            <span className="gradient-text font-display">AionX</span>
          </h1>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </header>
      
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tighter font-display gradient-text lg:block hidden">Bem-vindo de volta</h2>
            <p className="mt-2 text-sm lg:text-base text-muted-foreground">
              Entre com suas credenciais para acessar o dashboard
            </p>            
          </div>
          
          <div className="mt-10">
            <LoginForm />
          </div>
        </div>
      </main>
      
      <footer className="lg:py-6 lg:text-center lg:text-sm hidden lg:block text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          &copy; {new Date().getFullYear()} AionX Dashboard. Todos os direitos reservados.
        </div>
      </footer>      
    </div>
  );
};

export default LoginPage;
