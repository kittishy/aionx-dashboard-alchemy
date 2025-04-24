
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserConnections } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Connection } from "@/types";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Bem-vindo ao seu painel de controle do AionX!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle>Conexões Ativas</CardTitle>
            <CardDescription>Número de conexões ativas no momento</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-12 items-center">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : (
              <div className="text-3xl font-bold">{activeCount}</div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle>Total de Conexões</CardTitle>
            <CardDescription>Número total de conexões configuradas</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-12 items-center">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : (
              <div className="text-3xl font-bold">{totalCount}</div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle>Status do Selfbot</CardTitle>
            <CardDescription>Estado atual do selfbot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <span className="font-medium">Online</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Conexões Recentes</CardTitle>
            <CardDescription>Suas últimas conexões configuradas</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-24 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : connections.length > 0 ? (
              <ul className="space-y-2">
                {connections.slice(0, 5).map((connection) => (
                  <li key={connection.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{connection.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {connection.server_id.substring(0, 8)}...
                      </p>
                    </div>
                    <div className={`h-2 w-2 rounded-full ${connection.active ? "bg-primary" : "bg-muted-foreground"}`} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p>Nenhuma conexão encontrada.</p>
                <Button variant="outline" asChild className="mt-2">
                  <Link to="/connections">Adicionar Conexão</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Guia Rápido</CardTitle>
            <CardDescription>Como utilizar o AionX</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4 pl-5 list-decimal">
              <li>
                <span className="font-medium">Adicione uma conexão</span>
                <p className="text-sm text-muted-foreground">
                  Vá para a página "Conexões" e adicione um servidor e canal.
                </p>
              </li>
              <li>
                <span className="font-medium">Ative a conexão</span>
                <p className="text-sm text-muted-foreground">
                  Use o interruptor para ativar a conexão desejada.
                </p>
              </li>
              <li>
                <span className="font-medium">Monitoramento</span>
                <p className="text-sm text-muted-foreground">
                  Acompanhe o status das suas conexões pelo Dashboard.
                </p>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
