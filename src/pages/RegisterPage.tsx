
import { useTheme } from "@/contexts/ThemeContext";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, loading } = useAuth();
  
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      
      <header className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary">
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
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} AionX Dashboard. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage;
