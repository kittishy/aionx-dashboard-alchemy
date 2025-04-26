
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { toast } from "sonner";

const registerSchema = z.object({
  username: z.string().min(3, { message: "Nome de usuário deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const { success, error } = await signUp(data.email, data.password, { 
        username: data.username 
      });
      
      if (success) {
        toast.success("Conta criada com sucesso! Por favor, verifique seu email para ativar sua conta.");
        navigate("/login");
      } else {
        if (error?.message.includes("already registered")) {
          toast.error("Este email já está registrado. Tente fazer login.");
        } else {
          toast.error(error?.message || "Falha ao criar conta");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Falha ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-elevated cosmic-card animate-fade-in">
      <CardHeader className="pb-0">
        <CardTitle className="gradient-text text-xl text-center">Criar sua conta</CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 sm:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium">Nome de Usuário</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seu_usuario"
                      disabled={isLoading}
                      className="h-11 rounded-lg bg-background/40 border-white/10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seu.email@exemplo.com"
                      type="email"
                      disabled={isLoading}
                      className="h-11 rounded-lg bg-background/40 border-white/10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium">Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        disabled={isLoading}
                        className="h-11 rounded-lg bg-background/40 border-white/10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full h-11 rounded-lg font-medium cosmic-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  <span>Criando conta...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Criar Conta</span>
                </div>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      
      <CardFooter className="flex justify-center p-6 pt-0">
        <p className="text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline hover:text-primary/80 transition-colors">
            Faça login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
