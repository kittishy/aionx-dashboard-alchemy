
import { useState } from "react";
import { ConnectionForm } from "@/components/connections/ConnectionForm";
import { ConnectionList } from "@/components/connections/ConnectionList";

const ConnectionsPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const handleConnectionAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight gradient-text">Conexões</h2>
        <p className="text-muted-foreground mt-2">
          Gerencie suas conexões com servidores do Discord
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <ConnectionForm onSuccess={handleConnectionAdded} />
        <div className="space-y-4">
          <h3 className="text-xl font-medium flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-slow" aria-hidden="true"></span>
            Suas Conexões
          </h3>
          <ConnectionList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
};

export default ConnectionsPage;
