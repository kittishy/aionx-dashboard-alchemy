
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Home, LogOut, MessageSquare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  const { signOut } = useAuth();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: MessageSquare, label: "Conexões", path: "/connections" },
    { icon: Settings, label: "Configurações", path: "/settings" },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar border-r border-border">
      <div className="flex h-14 items-center border-b border-border px-4">
        <h2 className="text-lg font-bold text-sidebar-foreground">Discord Selfbot</h2>
      </div>
      
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="border-t border-border p-4">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </Button>
      </div>
    </aside>
  );
};
