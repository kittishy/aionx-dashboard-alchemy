
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { toast } from "sonner";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <Card className="overflow-hidden border-none shadow-elevated cosmic-card animate-fade-in">
      <CardContent className="p-6 sm:p-8">
        <div className="space-y-6 text-center">
          <h2 className="text-xl font-semibold gradient-text">Apenas Autenticação Discord</h2>
          <p className="text-muted-foreground">
            O AionX agora utiliza apenas autenticação via Discord para uma experiência simplificada.
          </p>
          
          <Button 
            onClick={handleGoToLogin}
            className="w-full h-11 rounded-lg font-medium"
          >
            <div className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <span>Ir para Login</span>
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
