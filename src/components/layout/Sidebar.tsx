
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  LogOut
} from "lucide-react";

export const Sidebar = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Conexões",
      href: "/connections",
      icon: MessageSquare,
    },
    {
      name: "Configurações",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex w-64 flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-border/40 bg-background/50 backdrop-blur-sm">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/20 shadow-neon">
                  <img 
                    src="/lovable-uploads/122ff0c7-1c56-489c-9976-1bbe2a79d4bf.png" 
                    alt="AionX logo" 
                    className="h-full w-full object-cover animate-float" 
                  />
                </div>
                <span className="text-xl font-semibold tracking-tight gradient-text font-display">
                  AionX
                </span>
              </div>
            </div>
            
            <nav className="mt-8 flex-1 space-y-1 px-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary shadow-neon"
                        : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                    )
                  }
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="flex flex-shrink-0 border-t border-border/40 p-4">
            <div className="flex flex-1 items-center">
              <div className="flex-1 truncate">
                <p className="text-sm font-medium text-foreground truncate">
                  {user.email}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.username}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className="ml-2 rounded-full hover:bg-destructive/10 hover:text-destructive"
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
