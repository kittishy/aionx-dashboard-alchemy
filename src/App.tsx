
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import ConnectionsPage from "@/pages/ConnectionsPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";
import { SkipNavLink } from "@/components/accessibility/SkipNavLink";
import { ErrorBoundary } from "@/components/errors/ErrorBoundary";

// Configuração react-query com otimizações - sem stateTime longo para reduzir uso de memória
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <SkipNavLink />
              <Toaster />
              <Sonner position="top-center" closeButton />
              
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Rotas protegidas - o MainLayout fará a verificação de autenticação */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/connections" element={<ConnectionsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>
                
                {/* Rota padrão - redireciona para a página não encontrada */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
