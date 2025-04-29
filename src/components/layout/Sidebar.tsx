
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Settings, 
  Network, 
  ChevronLeft, 
  ChevronRight,
  BarChart3,
  Users,
  Bell,
  Star
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Verifica se a tela é mobile para colapsar a sidebar automaticamente
  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth < 1024) {
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

  // Menu items com ícones e rotas
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
    },
    {
      name: "Estatísticas",
      icon: BarChart3,
      path: "/statistics",
      badge: "Em Breve"
    },
    {
      name: "Usuários",
      icon: Users,
      path: "/users",
      badge: "Novo"
    }
  ];

  const secondaryMenuItems = [
    {
      name: "Configurações",
      icon: Settings,
      path: "/settings",
      badge: ""
    },
    {
      name: "Notificações",
      icon: Bell,
      path: "/notifications",
      badge: "3"
    }
  ];

  // Variantes para animação do sidebar
  const sidebarVariants = {
    expanded: {
      width: "240px",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 25
      }
    },
    collapsed: {
      width: "72px",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 25
      }
    }
  };

  const textVariants = {
    expanded: {
      opacity: 1,
      display: "inline-flex",
      transition: {
        delay: 0.1,
        duration: 0.3
      }
    },
    collapsed: {
      opacity: 0,
      display: "none",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      className="sidebar h-screen bg-background/30 backdrop-blur-md border-r border-border/40 relative flex flex-col z-20"
      initial={false}
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
    >
      {/* Logo e Header */}
      <div className="flex items-center h-16 px-4 border-b border-border/40">
        <div className="flex items-center gap-3 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/20 shadow-neon"
          >
            <img 
              src="/lovable-uploads/122ff0c7-1c56-489c-9976-1bbe2a79d4bf.png" 
              alt="AionX logo" 
              className="h-full w-full object-cover" 
            />
          </motion.div>
          <motion.h1 
            className="text-lg font-semibold tracking-tight"
            variants={textVariants}
          >
            <span className="gradient-text font-display">AionX</span>
          </motion.h1>
        </div>
      </div>

      {/* Conteúdo da Sidebar */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {/* Menu Principal */}
          <div className="space-y-1">
            <div className={cn("text-xs text-muted-foreground pl-3 py-2", collapsed && "pl-0 flex justify-center")}>
              <motion.span variants={textVariants}>Principal</motion.span>
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
                          ? "bg-primary text-primary-foreground shadow-neon" 
                          : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                      )}
                    >
                      {({ isActive }) => (
                        <motion.div
                          className={cn("flex items-center gap-3 w-full", 
                            collapsed ? "justify-center" : "justify-start"
                          )}
                          whileHover={{ x: collapsed ? 0 : 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <item.icon className={cn(
                            "h-5 w-5 shrink-0",
                            isActive ? "text-current" : "text-muted-foreground group-hover:text-primary"
                          )} />
                          <motion.span 
                            variants={textVariants}
                            className="truncate"
                          >
                            {item.name}
                          </motion.span>
                          
                          {/* Badge - visível apenas quando expandido */}
                          {item.badge && (
                            <motion.div 
                              variants={textVariants}
                              className="ml-auto"
                            >
                              <Badge text={item.badge} variant={item.badge === "Novo" ? "primary" : "secondary"} />
                            </motion.div>
                          )}
                        </motion.div>
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
              <motion.span variants={textVariants}>Configuração</motion.span>
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
                          ? "bg-primary text-primary-foreground shadow-neon" 
                          : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                      )}
                    >
                      {({ isActive }) => (
                        <motion.div
                          className={cn("flex items-center gap-3 w-full", 
                            collapsed ? "justify-center" : "justify-start"
                          )}
                          whileHover={{ x: collapsed ? 0 : 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <item.icon className={cn(
                            "h-5 w-5 shrink-0",
                            isActive ? "text-current" : "text-muted-foreground group-hover:text-primary"
                          )} />
                          <motion.span 
                            variants={textVariants}
                            className="truncate"
                          >
                            {item.name}
                          </motion.span>
                          
                          {/* Badge para notificações */}
                          {item.badge && (
                            <motion.div 
                              variants={textVariants}
                              className="ml-auto"
                            >
                              <Badge text={item.badge} variant="accent" />
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </NavLink>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <div className="flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge text={item.badge} variant="accent" />
                        )}
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          
          {/* Footet - Pro tag */}
          <div className={`p-3 ${collapsed ? 'hidden' : 'block'} mt-auto border-t border-border/40`}>
            <motion.div 
              variants={textVariants}
              className="flex items-center gap-2 py-2 px-3 rounded-lg bg-gradient-to-r from-primary/20 to-cyan-500/20 backdrop-blur-sm"
            >
              <Star className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium">AionX Pro</span>
              <Button
                size="sm"
                variant="outline"
                className="ml-auto h-7 bg-background/40 backdrop-blur-sm hover:bg-background/60"
                onClick={() => {
                  // Implementação futura do botão Pro
                  console.log("Upgrade para Pro");
                }}
              >
                Upgrade
              </Button>
            </motion.div>
          </div>
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
    </motion.div>
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
