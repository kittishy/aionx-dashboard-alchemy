
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  LineChart, 
  PieChart,
  Download, 
  Calendar, 
  RefreshCcw,
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  MessageSquare,
  Zap
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { toast } from "sonner";

// Dados simulados
const lastMonthData = [
  { name: "Seg", usuários: 40, mensagens: 24, interações: 60 },
  { name: "Ter", usuários: 30, mensagens: 13, interações: 40 },
  { name: "Qua", usuários: 20, mensagens: 28, interações: 45 },
  { name: "Qui", usuários: 27, mensagens: 39, interações: 50 },
  { name: "Sex", usuários: 18, mensagens: 48, interações: 65 },
  { name: "Sáb", usuários: 23, mensagens: 38, interações: 70 },
  { name: "Dom", usuários: 34, mensagens: 43, interações: 72 }
];

const monthlyData = [
  { name: "Jan", usuários: 200, mensagens: 240, interações: 600 },
  { name: "Fev", usuários: 250, mensagens: 398, interações: 720 },
  { name: "Mar", usuários: 280, mensagens: 470, interações: 850 },
  { name: "Abr", usuários: 320, mensagens: 540, interações: 940 },
  { name: "Mai", usuários: 400, mensagens: 650, interações: 1200 },
  { name: "Jun", usuários: 450, mensagens: 700, interações: 1380 }
];

const pieData = [
  { name: "Discord", value: 65, color: "#5865F2" },
  { name: "Web", value: 20, color: "#33C3F0" },
  { name: "Mobile", value: 15, color: "#4CAF50" }
];

// Dados de estatísticas gerais
const statsData = {
  users: {
    total: 4283,
    change: 12.5,
    trend: "up"
  },
  messages: {
    total: 27854,
    change: -3.2,
    trend: "down"
  },
  interactions: {
    total: 42913,
    change: 8.7,
    trend: "up"
  },
  connections: {
    total: 356,
    change: 0.5,
    trend: "stable"
  }
};

const StatisticsPage = () => {
  const [timeFrame, setTimeFrame] = useState("week");
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(lastMonthData);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Atualizar dados do gráfico com base no período selecionado
    setChartData(timeFrame === "week" ? lastMonthData : monthlyData);
  }, [timeFrame]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Dados atualizados com sucesso!");
    }, 1000);
  };

  const handleDownload = () => {
    toast.info("Função de download de relatórios será implementada em breve!");
  };

  // Componente para exibir valor com tendência
  const StatWithTrend = ({ label, value, change, trend, icon: Icon }) => (
    <div className="flex flex-col">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="flex items-end gap-2">
        <div className="text-2xl font-bold">{value.toLocaleString("pt-BR")}</div>
        <div className={`flex items-center text-xs font-medium ${
          trend === "up" ? "text-green-500" : 
          trend === "down" ? "text-red-500" : 
          "text-yellow-500"
        }`}>
          {trend === "up" ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : trend === "down" ? (
            <TrendingDown className="h-3 w-3 mr-1" />
          ) : (
            <Minus className="h-3 w-3 mr-1" />
          )}
          {Math.abs(change).toFixed(1)}%
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold tracking-tight">Estatísticas</h1>
          <p className="text-muted-foreground">
            Visualize métricas de desempenho e engajamento.
          </p>
        </motion.div>
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={loading}>
            <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </motion.div>
      </div>

      {/* Cards de métricas principais */}
      <motion.div 
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Card: Usuários */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-8 bg-muted rounded shimmer-card"></div>
            ) : (
              <StatWithTrend 
                label="Usuários Ativos"
                value={statsData.users.total}
                change={statsData.users.change}
                trend={statsData.users.trend}
                icon={Users}
              />
            )}
          </CardContent>
        </Card>

        {/* Card: Mensagens */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total de Mensagens</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-8 bg-muted rounded shimmer-card"></div>
            ) : (
              <StatWithTrend 
                label="Mensagens Enviadas"
                value={statsData.messages.total}
                change={statsData.messages.change}
                trend={statsData.messages.trend}
                icon={MessageSquare}
              />
            )}
          </CardContent>
        </Card>

        {/* Card: Interações */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total de Interações</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-8 bg-muted rounded shimmer-card"></div>
            ) : (
              <StatWithTrend 
                label="Interações"
                value={statsData.interactions.total}
                change={statsData.interactions.change}
                trend={statsData.interactions.trend}
                icon={Zap}
              />
            )}
          </CardContent>
        </Card>

        {/* Card: Conexões */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Conexões Ativas</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-8 bg-muted rounded shimmer-card"></div>
            ) : (
              <StatWithTrend 
                label="Total de Conexões"
                value={statsData.connections.total}
                change={statsData.connections.change}
                trend={statsData.connections.trend}
                icon={BarChart3}
              />
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Gráfico Principal */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle>Visão Geral</CardTitle>
                <CardDescription>Análise de métricas principais</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant={timeFrame === "week" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setTimeFrame("week")}
                  className="h-8"
                >
                  Semana
                </Button>
                <Button 
                  variant={timeFrame === "month" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setTimeFrame("month")}
                  className="h-8"
                >
                  Mês
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            {loading ? (
              <div className="w-full h-80 bg-muted rounded-md shimmer-card mx-2"></div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUsuarios" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#33C3F0" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#33C3F0" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorMensagens" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5865F2" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#5865F2" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorInteracoes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#888"
                      tick={{ fill: "#888" }}
                      tickLine={{ stroke: "#888" }}
                    />
                    <YAxis 
                      stroke="#888"
                      tick={{ fill: "#888" }}
                      tickLine={{ stroke: "#888" }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1A1F2C", 
                        border: "1px solid #333",
                        borderRadius: "8px"
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="usuários" 
                      stroke="#33C3F0" 
                      fillOpacity={1} 
                      fill="url(#colorUsuarios)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="mensagens" 
                      stroke="#5865F2" 
                      fillOpacity={1} 
                      fill="url(#colorMensagens)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="interações" 
                      stroke="#4CAF50" 
                      fillOpacity={1} 
                      fill="url(#colorInteracoes)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gráfico de Distribuição */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Acesso</CardTitle>
            <CardDescription>Por plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="w-full h-[260px] bg-muted rounded-md shimmer-card"></div>
            ) : (
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={1}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1A1F2C", 
                        border: "1px solid #333",
                        borderRadius: "8px"
                      }} 
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Seção de Atividade por Dia da Semana */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Atividade por Dia da Semana</CardTitle>
            <CardDescription>
              Análise de engajamento diário
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="w-full h-[300px] bg-muted rounded-md shimmer-card"></div>
            ) : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={lastMonthData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#888"
                      tick={{ fill: "#888" }}
                      tickLine={{ stroke: "#888" }}
                    />
                    <YAxis 
                      stroke="#888"
                      tick={{ fill: "#888" }}
                      tickLine={{ stroke: "#888" }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1A1F2C", 
                        border: "1px solid #333",
                        borderRadius: "8px"
                      }} 
                    />
                    <Bar dataKey="usuários" fill="#33C3F0" name="Usuários" />
                    <Bar dataKey="mensagens" fill="#5865F2" name="Mensagens" />
                    <Bar dataKey="interações" fill="#4CAF50" name="Interações" />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StatisticsPage;
