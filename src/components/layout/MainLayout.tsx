
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MainLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, loading } = useAuth();

  // Se estiver carregando, mostra um indicador de carregamento
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para a página de login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      
      <main className="flex flex-1 flex-col overflow-hidden bg-background">
        <header className="flex h-14 items-center justify-between border-b border-border bg-background px-6">
          <div className="text-xl font-bold text-foreground">AionX Dashboard</div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
      
      <Toaster />
    </div>
  );
};
