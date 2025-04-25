
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

export const MainLayout = () => {
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

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-background">
      <div className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:hidden transition-opacity lg:hidden" data-state="closed" ></div>
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-hidden bg-background ml-0 lg:ml-[250px]">
        <header className="flex h-14 items-center justify-between border-b border-border/60 bg-background px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative hidden h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary lg:flex">
              <span className="text-sm font-bold text-primary-foreground">
                A
              </span>
            </div>
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary lg:hidden">
                <span className="text-sm font-bold text-primary-foreground">A</span>
            </div>
            <h1 className="text-lg font-semibold tracking-tight">
              <span className="gradient-text font-display">AionX</span>
            </h1>
          </div>
          
          <div className="hidden flex-1 lg:block max-w-md">
            <div className="relative ">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Pesquisar..." 
                className="h-10 rounded-full bg-muted/50 pl-10 focus-visible:ring-primary"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              title="Suporte no Discord"
              onClick={() => window.open("https://discord.gg/aFt6bQJ7Rs", "_blank")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <circle cx="9" cy="12" r="1" />
                <circle cx="15" cy="12" r="1" />
                <path d="M7.5 7.2C3.7 9.3 3.3 14.1 3 18.7c1.9.5 4 .7 6 .7 2 0 4.1-.2 6-.7" />
                <path d="M16.5 7.2C20.3 9.3 20.7 14.1 21 18.7c-1.9.5-4 .7-6 .7-2 0-4.1-.2-6-.7" />
                <path d="M8 7s1.5-2 4-2 4 2 4 2" />
              </svg>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              title={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Avatar className="h-9 w-9 border-2 border-primary">
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                {user?.email?.charAt(0).toUpperCase() || "U"}
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
