
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { LogIn, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    toast.info("Redirecionando para a página de login");
    navigate("/login");
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
              <UserPlus className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
          </div>
          <h3 className="text-center text-xl font-semibold gradient-text">Autenticação Simplificada</h3>
        </CardHeader>
        
        <CardContent className="p-6 sm:p-8">
          <div className="space-y-6 text-center">
            <p className="text-muted-foreground">
              O AionX agora utiliza apenas autenticação via Discord para uma experiência simplificada e segura.
            </p>
            
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Button 
                onClick={handleGoToLogin}
                className="w-full h-11 rounded-lg font-medium"
              >
                <div className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Ir para Login</span>
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
