
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Server } from "lucide-react";

const ConnectionsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight gradient-text">Conexões</h2>
        <p className="text-muted-foreground mt-2">
          Gerencie suas conexões com servidores do Discord
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="cosmic-card border-border">
          <CardHeader>
            <CardTitle>Sem Conexões</CardTitle>
            <CardDescription className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Server className="h-10 w-10 mb-4 text-muted-foreground/60" aria-hidden="true" />
              <p className="text-center">
                Nenhuma conexão disponível no momento
              </p>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default ConnectionsPage;
