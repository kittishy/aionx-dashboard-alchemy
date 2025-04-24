
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
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="flex h-14 items-center justify-between px-6">
        <div className="text-xl font-bold">Discord Selfbot</div>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </header>
      
      <main className="flex flex-1 items-center justify-center p-6">
        <LoginForm />
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Discord Selfbot Dashboard. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default LoginPage;
