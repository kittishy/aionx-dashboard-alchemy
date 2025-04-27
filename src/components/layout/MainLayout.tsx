import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Headset, LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect } from "react";

export const MainLayout = () => {
  const { user, loading, signOut } = useAuth();

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

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden cosmic-bg">
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
      
      {/* Decorative glow effects */} 
      <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[100px]"></div>
      <div className="absolute right-[-5%] bottom-[20%] h-[30%] w-[30%] rounded-full bg-cyan-500/5 blur-[100px]"></div>

      <Sidebar />
      
      <main className="flex flex-1 flex-col overflow-hidden bg-background/50 backdrop-blur-sm">
        <header className="flex h-16 items-center justify-between border-b border-border/40 px-4 sm:px-6">          
          <a href="/" className="hidden lg:block">
            <h1 className="text-lg font-semibold tracking-tight"><span className="gradient-text font-display">AionX</span></h1>
          </a>
          <div className="flex items-center gap-4 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/20 shadow-neon">
              <img 
                src="/lovable-uploads/122ff0c7-1c56-489c-9976-1bbe2a79d4bf.png" 
                alt="AionX logo" 
                className="h-full w-full object-cover" 
              />
            </div>
            <a href="/">
              <h1 className="text-lg font-semibold tracking-tight">
                <span className="gradient-text font-display">AionX</span>
              </h1>
            </a>
            
          </div>
          
          <div className="hidden flex-1 lg:block max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Pesquisar..." 
                className="h-10 rounded-full bg-background/40 pl-10 border-white/10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-primary/10 text-primary"
              onClick={() => window.open('https://discord.gg/your-support-server', '_blank')}
              title="Suporte"
            >
              <Headset className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 border-2 border-primary shadow-neon cursor-pointer">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="cosmic-card">
                <DropdownMenuItem className="text-sm text-muted-foreground opacity-70 cursor-default">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut} className="text-destructive flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-4 sm:p-6 pb-20">
          <Outlet />
        </div>
      </main>
      
      <Toaster />
    </div>
  );
};
