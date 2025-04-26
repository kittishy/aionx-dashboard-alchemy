
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Menu, Moon, Search, Sun, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const MainLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const [username, setUsername] = useState<string>("");
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Erro ao buscar perfil do usuário:', error);
          } else if (data) {
            setUsername(data.username);
          }
        } catch (error) {
          console.error('Erro ao buscar perfil:', error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);
  
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center cosmic-bg" aria-live="polite" role="status">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm font-medium text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const openDiscordSupport = () => {
    window.open("https://discord.gg/aFt6bQJ7Rs", "_blank");
    toast.success("Redirecionando para o canal de suporte...");
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden cosmic-bg">
      {/* Animated stars */}
      <div className="stars-container absolute inset-0 pointer-events-none overflow-hidden z-0">
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

      {/* Mobile sidebar overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
        onClick={() => setSidebarOpen(false)}
      ></div>
      
      {/* Sidebar */}
      <div className={`fixed z-50 h-full lg:static lg:z-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar onCloseSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-hidden bg-transparent backdrop-blur-sm w-full relative z-10">
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-background/30 backdrop-blur-md px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full lg:hidden focus:ring focus:ring-primary/50"
              onClick={toggleSidebar}
              aria-label={sidebarOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary/20 shadow-neon lg:hidden">
              <img 
                src="/lovable-uploads/122ff0c7-1c56-489c-9976-1bbe2a79d4bf.png" 
                alt="AionX logo" 
                className="h-full w-full object-cover" 
              />
            </div>
            <h1 className="text-lg font-semibold tracking-tight lg:hidden">
              <span className="gradient-text font-display">AionX</span>
            </h1>
          </div>
          
          <div className="hidden flex-1 lg:block max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input 
                placeholder="Pesquisar..." 
                className="h-10 rounded-full bg-muted/50 pl-10 focus-visible:ring-primary border-white/10"
                aria-label="Pesquisar na aplicação"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full focus-visible:ring-2 focus-visible:ring-primary"
              title="Suporte no Discord"
              onClick={openDiscordSupport}
              aria-label="Abrir suporte no Discord"
            >
              <Headset className="h-5 w-5 text-primary" aria-hidden="true" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full focus-visible:ring-2 focus-visible:ring-primary"
              title={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
              aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
            
            <Avatar className="h-9 w-9 border-2 border-primary shadow-neon">
              <AvatarFallback className="bg-primary/30 text-primary-foreground">
                {username ? username.charAt(0).toUpperCase() : (user?.email?.charAt(0).toUpperCase() || "U")}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </div>
  );
};
