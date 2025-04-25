
import { useState } from "react";
import { ConnectionForm } from "@/components/connections/ConnectionForm";
import { ConnectionList } from "@/components/connections/ConnectionList";

const ConnectionsPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const handleConnectionAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight lg:text-3xl" tabIndex={0}>Conexões</h2>
        <p className="text-muted-foreground mt-1">
          Gerencie suas conexões com servidores do Discord
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <h3 className="text-lg font-medium mb-4" id="connection-list-heading">Suas Conexões</h3>
          <ConnectionList 
            refreshTrigger={refreshTrigger}
            aria-labelledby="connection-list-heading"
          />
        </div>
        
        <div className="order-1 lg:order-2">
          <h3 className="text-lg font-medium mb-4" id="connection-form-heading">Adicionar Conexão</h3>
          <ConnectionForm 
            onSuccess={handleConnectionAdded}
            aria-labelledby="connection-form-heading"
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectionsPage;
