
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Headset, MessageSquare, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface SidebarProps {
  onCloseSidebar?: () => void;
}

interface UserProfile {
  username: string;
}

export const Sidebar = ({ onCloseSidebar }: SidebarProps) => {
  const { signOut, user } = useAuth();
  const isMobile = useIsMobile();
  const [username, setUsername] = useState<string>("");

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/", ariaLabel: "Ir para Dashboard" },
    { icon: MessageSquare, label: "Conexões", path: "/connections", ariaLabel: "Ir para Conexões" },
    { icon: Settings, label: "Configurações", path: "/settings", ariaLabel: "Ir para Configurações" },
  ];
  
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

  const handleSignOut = () => {
    signOut();
    toast.success("Sessão encerrada com sucesso!");
  };

  const openDiscordSupport = () => {
    window.open("https://discord.gg/aFt6bQJ7Rs", "_blank");
    toast.success("Redirecionando para o canal de suporte...");
  };

  return (
    <aside 
      className="flex h-screen w-[250px] flex-col cosmic-bg border-r border-border/40 transition-all duration-300"
      aria-label="Menu lateral"
    >
      <div className="flex h-16 items-center justify-between border-b border-border/40 px-4">
        <div className="flex items-center gap-2">
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-sidebar-accent glow-effect">
            <img 
              src="/lovable-uploads/122ff0c7-1c56-489c-9976-1bbe2a79d4bf.png" 
              alt="AionX logo" 
              className="h-full w-full object-cover" 
              aria-hidden="true" 
            />
          </div>
          <h2 className="text-lg font-semibold text-sidebar-foreground font-display">
            <span className="gradient-text">AionX</span>
          </h2>
        </div>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onCloseSidebar}
            className="rounded-full"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <div className="flex flex-1 flex-col justify-between overflow-y-auto py-4">
        <nav className="px-2" aria-label="Navegação principal">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isActive
                        ? "bg-primary/20 text-primary font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )
                  }
                  aria-label={item.ariaLabel}
                  onClick={isMobile ? onCloseSidebar : undefined}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}

            <li>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground rounded-lg px-3 py-2.5"
                onClick={openDiscordSupport}
                aria-label="Abrir suporte no Discord"
              >
                <Headset className="h-5 w-5" aria-hidden="true" />
                <span>Suporte</span>
              </Button>
            </li>
          </ul>
        </nav>
        
        <div className="px-2 mt-auto">
          {user && (
            <div className="mb-4 rounded-lg bg-muted/30 p-3 cosmic-card">
              <p className="text-xs font-medium text-foreground/70">Conectado como</p>
              <p className="truncate text-sm font-medium">{username || "Usuário"}</p>
            </div>
          )}
          
          <Button
            variant="outline"
            className="w-full justify-start gap-2 border-border/60 bg-transparent hover:bg-muted/30"
            onClick={handleSignOut}
            aria-label="Encerrar sessão"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out h-4 w-4">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>Sair</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};
