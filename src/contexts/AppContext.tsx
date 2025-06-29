import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  nome: string;
  whatsapp: string;
  tipoNegocio: string;
  faturamento: string;
  desafio: string;
  instagram: string;
  site: string;
  prospeccao: string;
  investimento: string;
}

interface Analise {
  pesquisaMercado: {
    tamanhoMercado: string;
    crescimento: string;
    concorrentes: string[];
    oportunidades: string[];
  };
  analiseDigital: {
    instagramScore: number;
    googleScore: number;
    siteScore: number;
    recomendacoes: string[];
  };
  anuncios: Array<{
    tipo: string;
    titulo: string;
    copy: string;
    orientacoes: string[];
  }>;
  icp: {
    nome: string;
    demografia: string;
    dores: string[];
    canais: string[];
    abordagem: string;
    ticketMedio: string;
    objecoes: string[];
  };
}

interface AppContextType {
  user: User;
  setUser: (user: Partial<User>) => void;
  analise: Analise | null;
  setAnalise: (analise: Analise) => void;
  currentStep: 'landing' | 'formulario' | 'dashboard' | 'agendamento' | 'analise';
  setCurrentStep: (step: 'landing' | 'formulario' | 'dashboard' | 'agendamento' | 'analise') => void;
  formProgress: number;
  setFormProgress: (progress: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User>({
    nome: '',
    whatsapp: '',
    tipoNegocio: '',
    faturamento: '',
    desafio: '',
    instagram: '',
    site: '',
    prospeccao: '',
    investimento: '',
  });

  const [analise, setAnalise] = useState<Analise | null>(null);
  const [currentStep, setCurrentStep] = useState<'landing' | 'formulario' | 'dashboard' | 'agendamento' | 'analise'>('landing');
  const [formProgress, setFormProgress] = useState(0);

  const setUser = (userData: Partial<User>) => {
    console.log('[AppContext] Updating user data:', userData);
    setUserState(prev => ({ ...prev, ...userData }));
  };

  const value = {
    user,
    setUser,
    analise,
    setAnalise,
    currentStep,
    setCurrentStep,
    formProgress,
    setFormProgress,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
