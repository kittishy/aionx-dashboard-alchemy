
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Home, LogOut, MessageSquare, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onCloseSidebar?: () => void;
}

export const Sidebar = ({ onCloseSidebar }: SidebarProps) => {
  const { signOut, user } = useAuth();
  const isMobile = useIsMobile();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/", ariaLabel: "Ir para Dashboard" },
    { icon: MessageSquare, label: "Conexões", path: "/connections", ariaLabel: "Ir para Conexões" },
    { icon: Settings, label: "Configurações", path: "/settings", ariaLabel: "Ir para Configurações" },
  ];
  
  const handleSignOut = () => {
    signOut();
    toast.success("Sessão encerrada com sucesso!");
  };

  return (
    <aside 
      className="flex h-screen w-[250px] flex-col bg-sidebar border-r border-border/60 transition-all duration-300"
      aria-label="Menu lateral"
    >
      <div className="flex h-16 items-center justify-between border-b border-border/60 px-4">
        <div className="flex items-center gap-2 px-4 py-6">
          <img src="/logo-dashboard.png" alt="Logo AionX" className="h-10 w-10 object-cover rounded-full" />
          <span className="text-xl font-bold gradient-text font-display">AionX</span>
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
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/80 hover:text-sidebar-foreground"
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
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 w-full px-4 py-4 border-t border-border/60 bg-background flex items-center gap-3">
          <img src="/logo-dashboard.png" alt="Logo AionX" className="h-8 w-8 object-cover rounded-full" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-sidebar-foreground">{user?.user_metadata?.username || "Usuário"}</span>
          </div>
        </div>
        <div className="px-2 mt-auto">
          {user && (
            <div className="mb-4 rounded-lg bg-muted/50 p-3">
              <p className="text-xs font-medium text-foreground/70">Conectado como</p>
              <p className="truncate text-sm font-medium">{user.email}</p>
            </div>
          )}
          
          <Button
            variant="outline"
            className="w-full justify-start gap-2 border-border/60 bg-transparent"
            onClick={handleSignOut}
            aria-label="Encerrar sessão"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span>Sair</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};
