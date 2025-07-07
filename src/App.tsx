import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { ChatProvider, useChat } from "@/contexts/ChatContext";
import ChatWidget from "@/components/chat/ChatWidget";
import Index from "./pages/Index";
import Analise from "./pages/Analise";
import AnalisePage from "./pages/AnalisePage";
import Dashboard from "./pages/Dashboard";
import Agendamento from "./pages/Agendamento";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const { initiateProactiveChat } = useChat();
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Gatilho: Scrollou mais de 25% da página
      if (window.scrollY > document.documentElement.scrollHeight * 0.25 && !hasScrolled) {
        setHasScrolled(true);
        initiateProactiveChat();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Limpeza do evento
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled, initiateProactiveChat]);

  return (
    <>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/analise" element={<Analise />} />
        <Route path="/analise/:leadId" element={<AnalisePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agendamento" element={<Agendamento />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!location.pathname.startsWith('/analise/') && <ChatWidget />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <ChatProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </ChatProvider>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
