
import { FormEvent, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { toast } from "sonner";

const registerSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!registerForm.username) {
      toast.error("Nome de usuário é obrigatório");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await signUp(registerForm.email, registerForm.password, registerForm.username);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Conta criada com sucesso! Faça login para continuar");
        navigate("/login");
      }
    } catch (err: any) {
      toast.error("Falha ao criar conta. Verifique os dados e tente novamente.");
    } finally {
      setIsLoading(false);
      setRegisterForm({...registerForm, password: "", confirmPassword: ""})
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-elevated bg-card/80 backdrop-blur-sm animate-fade-in">
      <CardContent className="p-6 sm:p-8">
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              
              name="email"
              render={() => (
                <FormItem>
                  <FormLabel htmlFor="email" className="text-foreground/80 font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seu.email@exemplo.com"
                      type="email"
                      autoComplete="email"
                      disabled={isLoading}
                      className="h-11 rounded-lg bg-background/40"
                      value={registerForm.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              
              name="password"
              render={() => (
                <FormItem>
                  <FormLabel htmlFor="password" className="text-foreground/80 font-medium">Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        disabled={isLoading}
                        className="h-11 rounded-lg bg-background/40"
                        value={registerForm.password}
                        onChange={handleChange}
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
            
            <FormField
             
              name="confirmPassword"
              render={() => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword" className="text-foreground/80 font-medium">Confirmar Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="••••••••"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        disabled={isLoading}
                        className="h-11 rounded-lg bg-background/40"
                        value={registerForm.confirmPassword}
                        onChange={handleChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
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
            
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nome de Usuário</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 sm:text-sm"
                  value={registerForm.username}
                  onChange={handleChange}
                  required
                  aria-label="Nome de Usuário"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-11 rounded-lg font-medium"
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username) {
      toast.error("Nome de usuário é obrigatório");
      return;
    }
    setLoading(true);
    try {
      const { user, error } = await signUpWithEmail(form.email, form.password, form.username);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Conta criada com sucesso!");
      }
    } catch (err: any) {
      toast.error("Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };
