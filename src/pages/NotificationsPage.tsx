
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CheckCircle, AlertTriangle, Info, Trash2, RefreshCcw, Settings } from "lucide-react";
import { toast } from "sonner";

// Dados simulados de notificações
const mockNotifications = [
  {
    id: "1",
    title: "Nova conexão adicionada",
    message: "A conexão 'Bot Principal' foi adicionada com sucesso.",
    type: "success",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutos atrás
  },
  {
    id: "2",
    title: "Aviso de sistema",
    message: "A API do Discord está passando por instabilidades. Algumas funcionalidades podem ser afetadas.",
    type: "warning",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutos atrás
  },
  {
    id: "3",
    title: "Limite de uso atingido",
    message: "Sua conta está próxima de atingir o limite mensal. Considere fazer upgrade para o plano Pro.",
    type: "error",
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 horas atrás
  },
  {
    id: "4",
    title: "Bem-vindo ao AionX",
    message: "Bem-vindo à plataforma AionX! Comece explorando nossas funcionalidades.",
    type: "info",
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 dia atrás
  },
  {
    id: "5",
    title: "Manutenção programada",
    message: "Haverá uma manutenção programada neste domingo, das 02h às 04h. O sistema pode ficar indisponível neste período.",
    type: "info",
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 dias atrás
  }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Formatar data relativa (exemplo: "5 minutos atrás")
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.round(diffMs / 1000);
    const diffMins = Math.round(diffSecs / 60);
    const diffHours = Math.round(diffMins / 60);
    const diffDays = Math.round(diffHours / 24);

    if (diffSecs < 60) return "Agora";
    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? "minuto" : "minutos"} atrás`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? "hora" : "horas"} atrás`;
    if (diffDays === 1) return "Ontem";
    if (diffDays < 30) return `${diffDays} dias atrás`;
    
    // Formatação para datas mais antigas
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter(n => !n.read);
      case "read":
        return notifications.filter(n => n.read);
      default:
        return notifications;
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast.success("Todas as notificações foram marcadas como lidas");
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    toast.success("Todas as notificações foram removidas");
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast.success("Notificação removida");
  };

  const refreshNotifications = () => {
    setLoading(true);
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
      toast.success("Notificações atualizadas!");
    }, 1000);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold tracking-tight">Notificações</h1>
          <p className="text-muted-foreground">
            Gerencie suas notificações e alertas do sistema.
          </p>
        </motion.div>
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button variant="outline" size="icon" onClick={refreshNotifications} disabled={loading}>
            <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button variant="outline" onClick={() => toast.info("Configurações de notificação serão implementadas em breve!")}>
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <span>Centro de Notificações</span>
                  {unreadCount > 0 && (
                    <Badge className="ml-2 bg-primary text-primary-foreground">{unreadCount}</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Acompanhe atualizações e alertas do sistema
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="mb-4 w-full justify-start">
                <TabsTrigger value="all">
                  Todas
                  {notifications.length > 0 && (
                    <Badge variant="outline" className="ml-2">
                      {notifications.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Não lidas
                  {unreadCount > 0 && (
                    <Badge variant="outline" className="ml-2">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="read">
                  Lidas
                  <Badge variant="outline" className="ml-2">
                    {notifications.filter(n => n.read).length}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 focus:outline-none">
                {loading ? (
                  <div className="space-y-4">
                    {Array(3).fill(null).map((_, index) => (
                      <div key={index} className="p-4 border border-border/40 rounded-lg shimmer-card">
                        <div className="flex gap-3">
                          <div className="h-5 w-5 rounded-full bg-muted"></div>
                          <div className="space-y-2 w-full">
                            <div className="h-4 bg-muted rounded w-1/3"></div>
                            <div className="h-3 bg-muted rounded w-2/3"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredNotifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-2 text-lg font-medium">Sem notificações</h3>
                    <p className="text-muted-foreground">
                      Você não tem notificações nesta categoria.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredNotifications.map((notification, index) => (
                      <motion.div 
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className={`p-4 border rounded-lg transition-colors ${
                          notification.read ? 'bg-transparent border-border/40' : 'bg-primary/5 border-primary/20'
                        }`}
                      >
                        <div className="flex gap-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className={`text-sm font-medium ${!notification.read && 'text-primary'}`}>
                                {notification.title}
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  {formatRelativeTime(notification.timestamp)}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => clearNotification(notification.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            {!notification.read && (
                              <div className="mt-2">
                                <Button 
                                  variant="link" 
                                  className="h-auto p-0 text-xs text-primary"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  Marcar como lida
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="unread" className="focus:outline-none">
                {/* Mesmo conteúdo para aba "unread", filtrado por getFilteredNotifications */}
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-2 text-lg font-medium">Nenhuma notificação não lida</h3>
                    <p className="text-muted-foreground">
                      Você está em dia com suas notificações.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredNotifications.map((notification, index) => (
                      <motion.div 
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className={`p-4 border rounded-lg transition-colors ${
                          notification.read ? 'bg-transparent border-border/40' : 'bg-primary/5 border-primary/20'
                        }`}
                      >
                        <div className="flex gap-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className={`text-sm font-medium ${!notification.read && 'text-primary'}`}>
                                {notification.title}
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  {formatRelativeTime(notification.timestamp)}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => clearNotification(notification.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            <div className="mt-2">
                              <Button 
                                variant="link" 
                                className="h-auto p-0 text-xs text-primary"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Marcar como lida
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="read" className="focus:outline-none">
                {/* Mesmo conteúdo para aba "read", filtrado por getFilteredNotifications */}
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-2 text-lg font-medium">Nenhuma notificação lida</h3>
                    <p className="text-muted-foreground">
                      Todas as suas notificações estão pendentes de leitura.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredNotifications.map((notification, index) => (
                      <motion.div 
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="p-4 border border-border/40 rounded-lg"
                      >
                        <div className="flex gap-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="text-sm font-medium">
                                {notification.title}
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  {formatRelativeTime(notification.timestamp)}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => clearNotification(notification.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-border/40 pt-4">
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Bell className="h-4 w-4" />
                {filteredNotifications.length > 0 ? (
                  <span>
                    {filteredNotifications.length} notificações exibidas 
                    {activeTab !== "all" && ` (${notifications.length} total)`}
                  </span>
                ) : (
                  <span>Nenhuma notificação</span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Marcar todas como lidas
                </Button>
              )}
              {notifications.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearAllNotifications}>
                  Limpar tudo
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotificationsPage;
