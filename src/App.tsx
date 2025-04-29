
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
import { SkipNavLink, SkipNavContent } from "@/components/accessibility/SkipNavLink";
import { ErrorBoundary } from "@/components/errors/ErrorBoundary";
import { Suspense, lazy } from "react";
import { LoadingScreen } from "@/components/ui/loading-screen";

// Lazy loaded components para melhorar performance
const UsersPage = lazy(() => import("@/pages/UsersPage"));
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));
const StatisticsPage = lazy(() => import("@/pages/StatisticsPage"));

// Configuração react-query com otimizações
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutos
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
              <Sonner position="top-center" expand visibleToasts={5} closeButton richColors />
              
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Rotas protegidas - o MainLayout fará a verificação de autenticação */}
                <Route element={<MainLayout />}>
                  <SkipNavContent />
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/connections" element={<ConnectionsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  
                  {/* Novas páginas com lazy loading */}
                  <Route path="/users" element={
                    <Suspense fallback={<LoadingScreen />}>
                      <UsersPage />
                    </Suspense>
                  } />
                  <Route path="/statistics" element={
                    <Suspense fallback={<LoadingScreen />}>
                      <StatisticsPage />
                    </Suspense>
                  } />
                  <Route path="/notifications" element={
                    <Suspense fallback={<LoadingScreen />}>
                      <NotificationsPage />
                    </Suspense>
                  } />
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
