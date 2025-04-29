
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Bell, Headset, LogOut, Search, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [notifications, setNotifications] = useState(3);
  
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

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.title = "AionX Dashboard";
  }, []);

  // Page Change Animation
  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center cosmic-bg">
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          ></motion.div>
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

  const viewNotifications = () => {
    toast.info("Notificações serão implementadas em breve!");
    setNotifications(0);
  };

  const openHelpCenter = () => {
    toast.info("Central de ajuda será implementada em breve!");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden cosmic-bg">
      {/* Animated stars */}
      <div className="stars-container absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="star"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity,
              delay: Math.random() * 3
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`
            }}
          />
        ))}
      </div>
      
      {/* Decorative glow effects */} 
      <motion.div 
        className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[100px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute right-[-5%] bottom-[20%] h-[30%] w-[30%] rounded-full bg-cyan-500/5 blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <Sidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden bg-background/50 backdrop-blur-sm">
        <motion.header 
          className="flex h-16 items-center justify-between border-b border-border/40 px-4 sm:px-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >          
          <motion.a 
            href="/" 
            className="hidden lg:block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <h1 className="text-lg font-semibold tracking-tight"><span className="gradient-text font-display">AionX</span></h1>
          </motion.a>
          <div className="flex items-center gap-4 lg:hidden">
            <motion.div 
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/20 shadow-neon"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img 
                src="/lovable-uploads/122ff0c7-1c56-489c-9976-1bbe2a79d4bf.png" 
                alt="AionX logo" 
                className="h-full w-full object-cover" 
              />
            </motion.div>
            <a href="/">
              <h1 className="text-lg font-semibold tracking-tight">
                <span className="gradient-text font-display">AionX</span>
              </h1>
            </a>
          </div>
          
          <div className="hidden flex-1 lg:flex max-w-md items-center">
            <motion.div 
              className="relative w-full"
              initial={{ opacity: 0, width: "80%" }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Pesquisar... (Ctrl + K)" 
                className="h-10 w-full rounded-full bg-background/40 pl-10 border-white/10 focus-visible:ring-offset-1"
                onFocus={() => setOpen(true)}
                readOnly
              />
            </motion.div>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:bg-primary/10 text-primary"
                onClick={viewNotifications}
                aria-label="Notificações"
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <motion.span 
                    className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {notifications}
                  </motion.span>
                )}
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:bg-primary/10 text-primary"
                onClick={openHelpCenter}
                aria-label="Ajuda"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:bg-primary/10 text-primary"
                onClick={() => window.open('https://discord.gg/your-support-server', '_blank')}
                aria-label="Suporte"
              >
                <Headset className="h-5 w-5" />
              </Button>
            </motion.div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div 
                  className="flex items-center gap-3 cursor-pointer p-1.5 px-2 rounded-full hover:bg-white/5"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Avatar className="h-9 w-9 border-2 border-primary shadow-neon">
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
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="cosmic-card border-white/10">
                <div className="flex items-center gap-3 p-3 border-b border-white/10">
                  <Avatar className="h-10 w-10 shadow-neon">
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
                    toast.info("Configurações serão implementadas em breve!");
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
        </motion.header>
        
        <ScrollArea className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div 
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-4 sm:p-6 pb-20"
            >
              <SkipNavContent />
              <Outlet />
            </motion.div>
          </AnimatePresence>
          
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
