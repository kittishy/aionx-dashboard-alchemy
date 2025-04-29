
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Filter, UserPlus, Search, RefreshCcw, Users as UsersIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Dados simulados de usuários
const mockUsers = [
  {
    id: "1",
    name: "Alex Silva",
    email: "alex.silva@example.com",
    role: "Admin",
    status: "Ativo",
    lastActive: "Agora",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex"
  },
  {
    id: "2",
    name: "Bianca Mendes",
    email: "bianca.m@example.com",
    role: "Moderador",
    status: "Ativo",
    lastActive: "5min atrás",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Bianca"
  },
  {
    id: "3",
    name: "Carlos Lima",
    email: "carlos.lima@example.com",
    role: "Usuário",
    status: "Inativo",
    lastActive: "3 dias atrás",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carlos"
  },
  {
    id: "4",
    name: "Daniela Costa",
    email: "dani.costa@example.com",
    role: "Usuário",
    status: "Ativo",
    lastActive: "1h atrás",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Daniela"
  },
  {
    id: "5",
    name: "Eduardo Santos",
    email: "edu.santos@example.com",
    role: "Moderador",
    status: "Ativo",
    lastActive: "20min atrás",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Eduardo"
  }
];

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filtrar usuários com base no termo de pesquisa
    const filtered = mockUsers.filter(
      user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm]);

  const handleAddUser = () => {
    toast.info("Funcionalidade de adicionar usuário será implementada em breve!");
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Lista de usuários atualizada!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold tracking-tight">Gerenciamento de Usuários</h1>
          <p className="text-muted-foreground">
            Visualize e gerencie os usuários do seu sistema.
          </p>
        </motion.div>
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button onClick={handleAddUser} className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Adicionar Usuário</span>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Usuários</CardTitle>
            <CardDescription>
              Total de {filteredUsers.length} usuários{" "}
              {filteredUsers.length !== mockUsers.length && `(filtrando de ${mockUsers.length})`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center">
              <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar usuários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 ml-auto">
                <Button variant="outline" size="icon" onClick={handleRefresh} disabled={loading}>
                  <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Filtrar</span>
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {Array(5).fill(null).map((_, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg border border-border/40 shimmer-card">
                    <div className="w-10 h-10 rounded-full bg-muted"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-muted rounded w-1/4"></div>
                      <div className="h-3 bg-muted rounded w-1/3"></div>
                    </div>
                    <div className="h-6 bg-muted rounded w-16"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredUsers.map(user => (
                  <motion.div 
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-border/40"
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{user.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 min-w-[120px]">
                      <Badge 
                        variant={user.role === "Admin" ? "destructive" : 
                               user.role === "Moderador" ? "outline" : "secondary"}
                        className="whitespace-nowrap"
                      >
                        {user.role}
                      </Badge>
                    </div>
                    <div className="hidden md:flex items-center gap-1 text-xs min-w-[100px]">
                      <span className={`w-2 h-2 rounded-full ${user.status === 'Ativo' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      <span className={user.status === 'Ativo' ? 'text-green-500' : 'text-muted-foreground'}>
                        {user.status}
                      </span>
                    </div>
                    <div className="hidden lg:block text-xs text-muted-foreground min-w-[100px]">
                      {user.lastActive}
                    </div>
                    <Button variant="ghost" size="icon" aria-label={`Menu de ações para ${user.name}`}>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t border-border/40 pt-4">
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <UsersIcon className="h-4 w-4" />
                <span>{filteredUsers.length} usuários exibidos</span>
              </div>
            </div>
            <Button variant="outline" size="sm" disabled>
              Exportar Lista
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default UsersPage;
