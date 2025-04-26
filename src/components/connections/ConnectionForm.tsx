
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { createConnection } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

const connectionSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  server_id: z.string().min(1, { message: "O ID do servidor é obrigatório" }),
  channel_id: z.string().min(1, { message: "O ID do canal é obrigatório" }),
  token: z.string().optional(),
});

type ConnectionFormValues = z.infer<typeof connectionSchema>;

interface ConnectionFormProps {
  onSuccess?: () => void;
}

export const ConnectionForm = ({ onSuccess }: ConnectionFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<ConnectionFormValues>({
    resolver: zodResolver(connectionSchema),
    defaultValues: {
      name: "",
      server_id: "",
      channel_id: "",
      token: "",
    },
  });

  const onSubmit = async (data: ConnectionFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await createConnection({
        user_id: user.id,
        name: data.name,
        server_id: data.server_id,
        channel_id: data.channel_id,
        token: data.token || null,
        active: false,
      });

      if (error) throw error;
      
      toast({
        title: "Conexão criada",
        description: "A conexão foi adicionada com sucesso.",
      });
      
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar conexão",
        description: error.message || "Ocorreu um erro ao adicionar a conexão.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="cosmic-card border-border">
      <CardHeader>
        <CardTitle className="gradient-text">Adicionar Nova Conexão</CardTitle>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Nome da Conexão</FormLabel>
                  <FormControl>
                    <Input placeholder="Meu Servidor" disabled={isLoading} className="bg-background/40 border-white/10" {...field} />
                  </FormControl>
                  <FormDescription className="text-muted-foreground/80">
                    Um nome para identificar esta conexão
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="server_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">ID do Servidor</FormLabel>
                  <FormControl>
                    <Input placeholder="123456789012345678" disabled={isLoading} className="bg-background/40 border-white/10" {...field} />
                  </FormControl>
                  <FormDescription className="text-muted-foreground/80">
                    ID do servidor Discord onde deseja conectar
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="channel_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">ID do Canal de Voz</FormLabel>
                  <FormControl>
                    <Input placeholder="123456789012345678" disabled={isLoading} className="bg-background/40 border-white/10" {...field} />
                  </FormControl>
                  <FormDescription className="text-muted-foreground/80">
                    ID do canal de voz onde o bot se conectará
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Seu Token</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Digite seu token" 
                      disabled={isLoading} 
                      className="bg-background/40 border-white/10"
                      type="password"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription className="text-muted-foreground/80">
                    Token para sincronização com bot autorizado
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <CardFooter className="px-0 pt-4">
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="ml-auto cosmic-button"
              >
                {isLoading ? "Adicionando..." : "Adicionar Conexão"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
