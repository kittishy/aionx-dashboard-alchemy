
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LogIn } from "lucide-react"; // Using LogIn icon instead of custom SVG
import { toast } from "sonner";

export const LoginForm = () => {
  const { loginWithDiscord, testLogin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDiscordLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithDiscord();
      // O redirecionamento será gerenciado pelo contexto de autenticação
    } catch (error) {
      console.error("Erro ao fazer login com Discord:", error);
      toast.error("Falha ao conectar com Discord. Por favor, tente novamente.");
      setIsLoading(false);
    }
  };

  const handleTestLogin = () => {
    testLogin();
    toast.success("Modo de teste ativado!");
    navigate("/");
  };

  return (
    <Card className="overflow-hidden border-none shadow-elevated cosmic-card animate-fade-in">
      <CardContent className="p-6 sm:p-8">
        <div className="space-y-6">
          <Button 
            onClick={handleDiscordLogin} 
            className="w-full h-12 rounded-lg font-medium discord-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                <span>Conectando...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LogIn className="h-5 w-5" /> {/* Replaced Discord SVG with LogIn icon */}
                <span>Entrar com Discord</span>
              </div>
            )}
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background/80 px-2 text-muted-foreground backdrop-blur-sm">ou</span>
            </div>
          </div>
          
          <Button 
            onClick={handleTestLogin} 
            variant="ghost" 
            className="w-full h-11 rounded-lg font-medium border border-white/10 hover:bg-white/5"
          >
            <div className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <span>Testar sem login</span>
            </div>
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center p-6 pt-0">
        <p className="text-sm text-muted-foreground">
          AionX utiliza Discord para autenticação segura
        </p>
      </CardFooter>
    </Card>
  );
};
