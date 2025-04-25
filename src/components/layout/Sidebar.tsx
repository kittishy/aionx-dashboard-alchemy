
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
        <div className="mt-auto w-full border-t border-border/60 px-4 py-4">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/30 mb-3">
            <div className="relative">
              <img 
                src="/logo-dashboard.png" 
                alt="Avatar do usuário" 
                className="h-10 w-10 object-cover rounded-full border-2 border-primary/40" 
              />
              <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-sidebar" aria-hidden="true"></div>
            </div>
            <div className="flex flex-col">
              <span 
                className="text-sm font-semibold text-sidebar-foreground truncate" 
                title={user?.user_metadata?.username || "Usuário"}
              >
                {user?.user_metadata?.username || "Usuário"}
              </span>
              <span className="text-xs text-sidebar-foreground/60">Online</span>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-primary hover:shadow-sm transition-all duration-200 rounded-lg py-2.5 focus-visible:ring-2 focus-visible:ring-primary group"
            onClick={handleSignOut}
            aria-label="Encerrar sessão"
          >
            <div className="p-1.5 rounded-md bg-sidebar-accent/40 group-hover:bg-primary/10 transition-colors duration-200">
              <LogOut className="h-4 w-4 group-hover:text-primary transition-colors duration-200" aria-hidden="true" />
            </div>
            <span>Sair</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};
