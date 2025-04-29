
import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Erro capturado:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen cosmic-bg p-4">
          <div className="cosmic-card p-6 max-w-lg w-full text-center space-y-6 shadow-neon">
            <h1 className="text-2xl font-bold gradient-text">Opa! Algo deu errado</h1>
            <p className="text-white/80">
              Encontramos um erro inesperado. Nosso time já foi notificado.
            </p>
            {this.state.error && (
              <div className="bg-white/5 p-4 rounded-md text-left overflow-auto max-h-36 text-sm text-red-300">
                <p>{this.state.error.toString()}</p>
              </div>
            )}
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => window.location.href = "/"} 
                variant="outline"
                className="border-white/10 hover:bg-white/10"
              >
                Voltar para o Início
              </Button>
              <Button 
                onClick={() => window.location.reload()}
                className="cosmic-button"
              >
                Tentar Novamente
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
