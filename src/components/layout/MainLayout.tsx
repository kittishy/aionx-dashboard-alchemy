
import { useTheme } from "@/contexts/ThemeContext"
import { useAuth } from "@/contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom"
import { Sidebar } from "@/components/layout/Sidebar"
import { Toaster } from "@/components/ui/toaster"
import { Menu, Moon, Search, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile"

export const MainLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background" aria-live="polite" role="status">
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

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile sidebar overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
        onClick={() => setSidebarOpen(false)}
      ></div>
      
      {/* Sidebar */}
      <div className={`fixed z-50 h-full lg:static lg:z-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar onCloseSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-hidden bg-background w-full">
        <header className="flex h-16 items-center justify-between border-b border-border/60 bg-background px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full lg:hidden"
              onClick={toggleSidebar}
              aria-label={sidebarOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary lg:hidden">
              <img src="/logo-dashboard.png" alt="Logo AionX" className="h-8 w-8 object-cover" />
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
                className="h-10 rounded-full bg-muted/50 pl-10 focus-visible:ring-primary"
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
              onClick={() => window.open("https://discord.gg/aFt6bQJ7Rs", "_blank")}
              aria-label="Abrir suporte no Discord"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M4 15v2a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-2" />
                <circle cx="12" cy="7" r="4" />
                <path d="M6 15v-2a6 6 0 0 1 12 0v2" />
              </svg>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full focus-visible:ring-2 focus-visible:ring-primary"
              title={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
              aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
            </Button>
            
            <Avatar className="h-9 w-9 border-2 border-primary">
              <img src="/logo-dashboard.png" alt="Logo AionX" className="h-9 w-9 object-cover rounded-full" />
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
