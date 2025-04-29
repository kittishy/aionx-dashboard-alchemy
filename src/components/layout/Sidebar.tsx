
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Settings, 
  Network, 
  ChevronLeft, 
  ChevronRight,
  Star
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Verifica se a tela é mobile para colapsar a sidebar automaticamente
  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    // Verifica na montagem e adiciona listener para resize
    checkWidth();
    window.addEventListener("resize", checkWidth);
    
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  // Menu items com ícones e rotas - simplificado
  const menuItems = [
    {
      name: "Início",
      icon: Home,
      path: "/",
      badge: ""
    },
    {
      name: "Conexões",
      icon: Network,
      path: "/connections",
      badge: ""
    }
  ];

  const secondaryMenuItems = [
    {
      name: "Configurações",
      icon: Settings,
      path: "/settings",
      badge: ""
    }
  ];

  // Variantes para animação do sidebar - simplificadas
  const sidebarVariants = {
    expanded: { width: "240px" },
    collapsed: { width: "64px" }
  };

  return (
    <div
      className={cn(
        "sidebar h-screen bg-background/30 backdrop-blur-md border-r border-border/40 relative flex flex-col z-20 transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo e Header */}
      <div className="flex items-center h-16 px-4 border-b border-border/40">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/20">
            <img 
              src="/lovable-uploads/122ff0c7-1c56-489c-9976-1bbe2a79d4bf.png" 
              alt="AionX logo" 
              className="h-full w-full object-cover" 
            />
          </div>
          {!collapsed && (
            <h1 className="text-lg font-semibold tracking-tight">
              <span className="gradient-text font-display">AionX</span>
            </h1>
          )}
        </div>
      </div>

      {/* Conteúdo da Sidebar */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {/* Menu Principal */}
          <div className="space-y-1">
            <div className={cn("text-xs text-muted-foreground pl-3 py-2", collapsed && "pl-0 flex justify-center")}>
              <span className={collapsed ? "hidden" : "block"}>Principal</span>
            </div>
            
            {menuItems.map((item) => (
              <TooltipProvider key={item.path}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => cn(
                        "group flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                      )}
                    >
                      {({ isActive }) => (
                        <div className={cn(
                          "flex items-center gap-3 w-full", 
                          collapsed ? "justify-center" : "justify-start"
                        )}>
                          <item.icon className={cn(
                            "h-5 w-5 shrink-0",
                            isActive ? "text-current" : "text-muted-foreground group-hover:text-primary"
                          )} />
                          {!collapsed && <span className="truncate">{item.name}</span>}
                          
                          {/* Badge - visível apenas quando expandido */}
                          {!collapsed && item.badge && (
                            <div className="ml-auto">
                              <Badge text={item.badge} variant={item.badge === "Novo" ? "primary" : "secondary"} />
                            </div>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <div className="flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge text={item.badge} variant={item.badge === "Novo" ? "primary" : "secondary"} />
                        )}
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          
          {/* Menu Secundário */}
          <div className="space-y-1 pt-3 mt-4 border-t border-border/40">
            <div className={cn("text-xs text-muted-foreground pl-3 py-2", collapsed && "pl-0 flex justify-center")}>
              <span className={collapsed ? "hidden" : "block"}>Configuração</span>
            </div>
            
            {secondaryMenuItems.map((item) => (
              <TooltipProvider key={item.path}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => cn(
                        "group flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                      )}
                    >
                      {({ isActive }) => (
                        <div className={cn(
                          "flex items-center gap-3 w-full", 
                          collapsed ? "justify-center" : "justify-start"
                        )}>
                          <item.icon className={cn(
                            "h-5 w-5 shrink-0",
                            isActive ? "text-current" : "text-muted-foreground group-hover:text-primary"
                          )} />
                          {!collapsed && <span className="truncate">{item.name}</span>}
                          
                          {/* Badge para notificações - removido */}
                        </div>
                      )}
                    </NavLink>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <div className="flex items-center gap-2">
                        <span>{item.name}</span>
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          
          {/* Footer - Pro tag */}
          {!collapsed && (
            <div className="p-3 mt-auto border-t border-border/40">
              <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-gradient-to-r from-primary/20 to-cyan-500/20">
                <Star className="h-4 w-4 text-yellow-300" />
                <span className="text-sm font-medium">AionX Pro</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-auto h-7 bg-background/40 hover:bg-background/60"
                >
                  Upgrade
                </Button>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Botão para toggle do sidebar */}
      <div className="h-12 flex items-center justify-end px-3 border-t border-border/40">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-primary/10 text-muted-foreground"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

// Componente Badge
type BadgeProps = {
  text: string;
  variant: "primary" | "secondary" | "accent";
};

const Badge = ({ text, variant = "primary" }: BadgeProps) => {
  const variantStyles = {
    primary: "bg-primary/90 text-primary-foreground",
    secondary: "bg-muted text-muted-foreground",
    accent: "bg-blue-600 text-white"
  };

  return (
    <span className={`text-[10px] font-medium py-1 px-2 rounded-full ${variantStyles[variant]}`}>
      {text}
    </span>
  );
};
