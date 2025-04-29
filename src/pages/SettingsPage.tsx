
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

const settingsSchema = z.object({
  darkMode: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      darkMode: theme === "dark",
    },
  });

  const onSubmit = (data: SettingsFormValues) => {
    // Se o tema mudou, atualize
    if ((theme === "dark") !== data.darkMode) {
      toggleTheme();
    }
    
    toast.success("Configurações salvas com sucesso!");
    console.log("Settings updated:", data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground mt-1">
          Gerencie as configurações da sua dashboard 
        </p>
      </div>
      
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle>Preferências</CardTitle>
          <CardDescription>
            Personalize sua experiência na dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="darkMode"
                render={({ field }) => ( 
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base" htmlFor="darkMode">Tema Escuro</FormLabel>
                      <FormDescription>
                        Ativar o tema escuro para a interface
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        id="darkMode"
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          toggleTheme();
                        }}
                        aria-label="Ativar tema escuro"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">Salvar Configurações</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
