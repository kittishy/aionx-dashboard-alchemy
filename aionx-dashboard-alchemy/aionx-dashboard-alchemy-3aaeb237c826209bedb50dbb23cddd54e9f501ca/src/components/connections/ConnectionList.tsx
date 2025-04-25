
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserConnections, updateConnection, deleteConnection } from "@/lib/supabase";
import { Connection } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Trash, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ConnectionListProps {
  refreshTrigger?: number;
}

export const ConnectionList = ({ refreshTrigger = 0 }: ConnectionListProps) => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<string[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchConnections = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await getUserConnections(user.id);
      
      if (error) throw error;
      
      setConnections(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar conexões",
        description: error.message || "Ocorreu um erro ao carregar suas conexões.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, [user, refreshTrigger]);

  const toggleConnectionActive = async (connection: Connection) => {
    setProcessingIds(prev => [...prev, connection.id]);
    
    try {
      const { error } = await updateConnection(connection.id, {
        active: !connection.active,
      });
      
      if (error) throw error;
      
      // Atualizar localmente
      setConnections(prev =>
        prev.map(c =>
          c.id === connection.id ? { ...c, active: !c.active } : c
        )
      );
      
      toast({
        title: `Conexão ${!connection.active ? "ativada" : "desativada"}`,
        description: `A conexão "${connection.name}" foi ${!connection.active ? "ativada" : "desativada"} com sucesso.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar conexão",
        description: error.message || "Ocorreu um erro ao atualizar o estado da conexão.",
      });
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== connection.id));
    }
  };

  const handleDeleteConnection = async (id: string) => {
    setProcessingIds(prev => [...prev, id]);
    
    try {
      const { error } = await deleteConnection(id);
      
      if (error) throw error;
      
      // Remover localmente
      setConnections(prev => prev.filter(c => c.id !== id));
      
      toast({
        title: "Conexão removida",
        description: "A conexão foi removida com sucesso.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao remover conexão",
        description: error.message || "Ocorreu um erro ao remover a conexão.",
      });
    } finally {
      setProcessingIds(prev => prev.filter(connId => connId !== id));
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Nenhuma Conexão</CardTitle>
          <CardDescription>
            Você ainda não adicionou nenhuma conexão. Adicione uma para começar.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {connections.map((connection) => {
        const isProcessing = processingIds.includes(connection.id);
        
        return (
          <Card key={connection.id} className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{connection.name}</span>
                <Switch
                  checked={connection.active}
                  onCheckedChange={() => toggleConnectionActive(connection)}
                  disabled={isProcessing}
                />
              </CardTitle>
              <CardDescription>
                Servidor: {connection.server_id}
                <br />
                Canal: {connection.channel_id}
              </CardDescription>
            </CardHeader>
            
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Status: {connection.active ? "Ativo" : "Inativo"}
              </p>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="icon" disabled={isProcessing}>
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                  </Button>
                </DialogTrigger>
                
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Remover Conexão</DialogTitle>
                    <DialogDescription>
                      Tem certeza que deseja remover a conexão "{connection.name}"?
                      Esta ação não pode ser desfeita.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <DialogFooter>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteConnection(connection.id)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Removendo..." : "Remover"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
