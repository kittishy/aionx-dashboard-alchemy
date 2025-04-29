
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { LogIn, KeyRound, Loader2 } from "lucide-react"; 
import { toast } from "sonner";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-none shadow-elevated cosmic-card">
        <CardHeader className="pb-0">
          <div className="flex justify-center mb-2">
            <div className="p-3 rounded-full bg-primary/10 shadow-neon">
              <KeyRound className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
          </div>
          <h3 className="text-center text-xl font-semibold gradient-text">Acesso Seguro</h3>
        </CardHeader>
        
        <CardContent className="p-6 sm:p-8">
          <div className="space-y-6">
            <Button 
              onClick={handleDiscordLogin} 
              className="w-full h-12 rounded-lg font-medium discord-button transition-all group"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Conectando...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn className="h-5 w-5 group-hover:scale-110 transition-transform" />
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
            
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Button 
                onClick={handleTestLogin} 
                variant="ghost" 
                className="w-full h-11 rounded-lg font-medium border border-white/10 hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Testar sem login</span>
                </div>
              </Button>
            </motion.div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center p-6 pt-0">
          <p className="text-sm text-muted-foreground">
            AionX utiliza Discord para autenticação segura
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
