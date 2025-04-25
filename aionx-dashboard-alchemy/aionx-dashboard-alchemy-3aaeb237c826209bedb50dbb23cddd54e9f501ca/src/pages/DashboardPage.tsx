
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserConnections } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Connection } from "@/types";
import { Activity, ArrowRight, ChevronRight, Loader2, Plus, Server, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const DashboardPage = () => {
  const { user } = useAuth();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCount, setActiveCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchConnections = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await getUserConnections(user.id);
        
        if (error) throw error;
        
        const connectionsData = data || [];
        setConnections(connectionsData);
        setActiveCount(connectionsData.filter((conn) => conn.active).length || 0);
        setTotalCount(connectionsData.length || 0);
      } catch (error) {
        console.error("Error fetching connections:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConnections();
  }, [user]);

  return (
    <div className="space-y-8 animate-slide-up">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-display">Dashboard</h2>
            <p className="text-muted-foreground">
              Bem-vindo ao seu painel de controle do AionX
            </p>
          </div>
          <Button asChild className="sm:self-end gap-2 rounded-lg">
            <Link to="/connections">
              <Plus className="h-4 w-4" />
              <span>Nova Conexão</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/40 shadow-subtle overflow-hidden">
          <div className="absolute right-4 top-4 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium tracking-tight">Conexões Ativas</CardTitle>
            <CardDescription>Total de conexões ativas no momento</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-12 items-center">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : (
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">{activeCount}</span>
                <span className="text-sm text-muted-foreground mb-1">de {totalCount}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/40 shadow-subtle overflow-hidden">
          <div className="absolute right-4 top-4 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Server className="h-4 w-4 text-primary" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium tracking-tight">Total de Conexões</CardTitle>
            <CardDescription>Número total de conexões configuradas</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-12 items-center">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : (
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">{totalCount}</span>
                <span className="text-sm text-muted-foreground mb-1">conexões</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/40 shadow-subtle overflow-hidden">
          <div className="absolute right-4 top-4 h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse-slow"></div>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium tracking-tight">Status do Bot</CardTitle>
            <CardDescription>Estado atual do bot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="font-medium">Online</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/40 shadow-subtle">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium tracking-tight">Conexões Recentes</CardTitle>
              <Button variant="ghost" size="sm" asChild className="text-sm gap-1">
                <Link to="/connections">
                  <span>Ver todas</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <CardDescription>Suas últimas conexões configuradas</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-48 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : connections.length > 0 ? (
              <div className="space-y-1 mt-2">
                {connections.slice(0, 5).map((connection) => (
                  <div key={connection.id} className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${connection.active ? "bg-green-500" : "bg-muted-foreground"}`} />
                      <div>
                        <p className="font-medium">{connection.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {connection.server_id.substring(0, 8)}...
                        </p>
                      </div>
                    </div>
                    <Badge variant={connection.active ? "default" : "outline"} className="text-[10px]">
                      {connection.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Server className="h-10 w-10 mb-2 text-muted-foreground/60" />
                <p className="mb-1">Nenhuma conexão encontrada</p>
                <Button variant="outline" size="sm" asChild className="mt-2 gap-1">
                  <Link to="/connections">
                    <Plus className="h-3 w-3" />
                    <span>Adicionar Conexão</span>
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/40 shadow-subtle">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-medium tracking-tight">Guia Rápido</CardTitle>
            <CardDescription>Como utilizar o AionX</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Adicione uma conexão</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure um novo servidor e canal na página "Conexões"
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  2
                </div>
                <div>
                  <h3 className="font-medium">Ative a conexão</h3>
                  <p className="text-sm text-muted-foreground">
                    Use o interruptor para ativar a conexão desejada
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Monitoramento</h3>
                  <p className="text-sm text-muted-foreground">
                    Acompanhe o status das suas conexões pelo Dashboard
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-2">
                <Button variant="outline" className="w-full justify-between">
                  <span>Ver documentação completa</span>
                  <SquareArrowOutUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
