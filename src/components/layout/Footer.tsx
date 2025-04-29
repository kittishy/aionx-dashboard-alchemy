
import { Star, Heart, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.div 
      className="relative z-10 w-full mt-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 sm:py-8 gap-4">
          <motion.div 
            className="cosmic-card flex items-center gap-2 px-4 py-2 rounded-full shadow-neon"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Star className="h-4 w-4 text-primary animate-pulse" aria-hidden="true" />
            <p className="text-sm text-white/90 glow-text">
              © {currentYear} AionX Dashboard
            </p>
          </motion.div>
          
          <div className="flex items-center space-x-4 text-sm">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.a 
                    href="/privacy" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Privacidade
                  </motion.a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Política de Privacidade</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.a 
                    href="/terms" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Termos
                  </motion.a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Termos de Uso</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div 
                    className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Heart className="h-3 w-3" aria-hidden="true" />
                    <span>Feito com amor</span>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Desenvolvido com carinho</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
