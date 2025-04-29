
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Footer } from "@/components/layout/Footer";

const LoginPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center cosmic-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm font-medium text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    document.documentElement.classList.add("dark");
    
    // Melhorar acessibilidade
    document.title = "Login | AionX Dashboard";
  }, []);

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex min-h-screen flex-col cosmic-bg">
        {/* Animated stars */}
        <div className="stars-container absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="star"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ 
                duration: Math.random() * 3 + 2, 
                repeat: Infinity,
                delay: Math.random() * 3
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`
              }}
            />
          ))}
        </div>
        
        {/* Círculos de brilho decorativos melhorados */}
        <motion.div
          className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[100px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-5%] bottom-[20%] h-[30%] w-[30%] rounded-full bg-cyan-500/5 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        <motion.header 
          className="flex h-16 items-center justify-between px-4 lg:px-8 z-10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center">
            <motion.div 
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/20 shadow-neon"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img 
                src="/lovable-uploads/122ff0c7-1c56-489c-9976-1bbe2a79d4bf.png" 
                alt="AionX logo" 
                className="h-full w-full object-cover" 
                loading="eager"
              />
            </motion.div>
            <motion.h1 
              className="ml-3 text-xl font-semibold tracking-tight"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="gradient-text font-display">AionX</span>
            </motion.h1>
          </div>
        </motion.header>
        
        <main className="flex flex-1 items-center justify-center p-6 z-10">
          <motion.div 
            className="w-full max-w-md space-y-8"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="text-center" variants={itemVariants}>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tighter font-display gradient-text lg:block">Bem-vindo ao AionX</h2>
              <p className="mt-2 text-sm lg:text-base text-muted-foreground">
                Entre com sua conta Discord para acessar o dashboard
              </p>            
            </motion.div>
            
            <motion.div className="mt-10" variants={itemVariants}>
              <LoginForm />
            </motion.div>
          </motion.div>
        </main>
        
        {/* Adicionando o Footer em todas as páginas */}
        <Footer />
      </div>
    </ScrollArea>
  );
};

export default LoginPage;
