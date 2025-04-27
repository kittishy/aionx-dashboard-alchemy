
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LogIn } from "lucide-react";
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M7.5 7.2c.3-1 1.4-1.2 1.4-1.2s1.1-.2 2.1-.2c1 0 2.1.2 2.1.2s1.1.2 1.4 1.2c.3 1 .2 2.3.2 2.3s.2 3.2-2.7 3.2c-2.9 0-2.7-3.2-2.7-3.2s-.1-1.3.2-2.3z"/><path d="M15.5 17a5 5 0 0 0 4 0"/>
                  <path d="M8.8 14.2c-.4 1.3-1.6 2.1-3 2"/>
                  <path d="M18.2 14.2c.4 1.3 1.6 2.1 3 2"/><path d="M9 22h6c1 0 1-1 1-1V18H8v3s0 1 1 1z"/>
                  <path d="M19 4c-1.2-.1-2.2-.1-3-.2-1.8-.1-2.9.5-2.9.5A16 16 0 0 0 8.8 7.5"/>
                  <path d="m6 10 2-2"/>
                  <path d="m16 10 2-2"/>
                </svg>
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
