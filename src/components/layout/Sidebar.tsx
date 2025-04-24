
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Home, LogOut, MessageSquare, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const { signOut, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: MessageSquare, label: "Conexões", path: "/connections" },
    { icon: Settings, label: "Configurações", path: "/settings" },
  ];

  const handleSignOut = () => {
    signOut();
    toast.success("Sessão encerrada com sucesso!");
  };

  return (
    <aside 
      className={cn(
        "flex h-screen flex-col bg-sidebar border-r border-border/60 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border/60 px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary">
              <span className="text-sm font-bold text-primary-foreground">A</span>
            </div>
            <h2 className="text-lg font-semibold text-sidebar-foreground font-display">
              <span className="gradient-text">AionX</span>
            </h2>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-lg p-1"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex flex-1 flex-col justify-between overflow-y-auto py-4">
        <nav className="px-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/80 hover:text-sidebar-foreground"
                    )
                  }
                >
                  <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "")} />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="px-2 mt-auto">
          {!collapsed && user && (
            <div className="mb-4 rounded-lg bg-muted/50 p-3">
              <p className="text-xs font-medium text-foreground/70">Conectado como</p>
              <p className="truncate text-sm font-medium">{user.email}</p>
            </div>
          )}
          
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start gap-2 border-border/60 bg-transparent",
              collapsed && "justify-center px-0"
            )}
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Sair</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};
