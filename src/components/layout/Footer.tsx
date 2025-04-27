
import { Star } from "lucide-react";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-center sm:justify-end py-3 sm:py-4">
          <div className="cosmic-card flex items-center gap-2 px-6 py-3 rounded-full shadow-neon">
            <Star className="h-4 w-4 text-primary animate-pulse" aria-hidden="true" />
            <p className="text-sm sm:text-base text-white/90 glow-text">
              © 2025 AionX Dashboard. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
