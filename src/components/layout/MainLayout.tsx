
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Headset, LogOut, Search, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { SkipNavContent } from "@/components/accessibility/SkipNavLink";

export const MainLayout = () => {
  const { user, discordUser, loading, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  // Handle keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Page Change - sem animações pesadas
  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-sm font-medium text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Sessão encerrada com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Ocorreu um erro ao encerrar a sessão");
    }
  };

  const openHelpCenter = () => {
    toast.info("Central de ajuda será implementada em breve!");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Background subtil sem animações pesadas */}
      <div className="fixed inset-0 bg-gradient-to-br from-background to-background/90 -z-10"></div>
      
      <Sidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden bg-background/50 backdrop-blur-sm">
        <header className="flex h-16 items-center justify-between border-b border-border/40 px-4 sm:px-6">
          <div className="flex items-center gap-4 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/20">
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
          
          <div className="hidden flex-1 lg:flex max-w-md items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Pesquisar... (Ctrl + K)" 
                className="h-10 w-full rounded-full bg-background/40 pl-10 border-white/10 focus-visible:ring-offset-1"
                onFocus={() => setOpen(true)}
                readOnly
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-primary/10 text-primary"
              onClick={openHelpCenter}
              aria-label="Ajuda"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-primary/10 text-primary"
              onClick={() => window.open('https://discord.gg/your-support-server', '_blank')}
              aria-label="Suporte"
            >
              <Headset className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer p-1.5 px-2 rounded-full hover:bg-white/5">
                  <Avatar className="h-9 w-9 border-2 border-primary">
                    {discordUser?.avatar ? (
                      <AvatarImage 
                        src={discordUser.avatar === "default" 
                          ? `https://cdn.discordapp.com/embed/avatars/${parseInt(discordUser.discriminator) % 5}.png`
                          : `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`}
                        alt={discordUser.username}
                        className="object-cover"
                      />
                    ) : (
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {discordUser?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="text-sm font-medium hidden md:inline-block">
                    {discordUser?.username || 'Usuário'}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-white/10">
                <div className="flex items-center gap-3 p-3 border-b border-white/10">
                  <Avatar className="h-10 w-10">
                    {discordUser?.avatar ? (
                      <AvatarImage 
                        src={discordUser.avatar === "default" 
                          ? `https://cdn.discordapp.com/embed/avatars/${parseInt(discordUser.discriminator) % 5}.png`
                          : `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`}
                        alt={discordUser?.username}
                      />
                    ) : (
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {discordUser?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <div className="font-medium">{discordUser?.username || 'Usuário'}</div>
                    <div className="text-xs text-muted-foreground">
                      {discordUser ? `Discord ID: ${discordUser.id}` : user?.email || 'Modo de teste'}
                    </div>
                  </div>
                </div>
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer hover:bg-white/5 focus:bg-white/5"
                  onSelect={() => {
                    window.location.href = "/settings";
                  }}
                >
                  <Settings className="h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleSignOut} 
                  className="text-destructive flex items-center gap-2 cursor-pointer hover:bg-white/5 focus:bg-white/5"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <ScrollArea className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 pb-20">
            <SkipNavContent />
            <Outlet />
          </div>
          
          <Footer />
        </ScrollArea>
      </div>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Digite um comando ou pesquise..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          <CommandGroup heading="Sugestões">
            <CommandItem onSelect={() => {
              setOpen(false);
              setTimeout(() => {
                window.location.href = "/";
              }, 200);
            }}>
              <Search className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              setOpen(false);
              setTimeout(() => {
                window.location.href = "/connections";
              }, 200);
            }}>
              <Search className="mr-2 h-4 w-4" />
              <span>Conexões</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              setOpen(false);
              setTimeout(() => {
                window.location.href = "/settings";
              }, 200);
            }}>
              <Search className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      
      <Toaster />
    </div>
  );
};
