
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ClaroButton from '@/components/ClaroButton';
import ClaroInput from '@/components/ClaroInput';
import LoadingSpinner from '@/components/LoadingSpinner';
import ProgressBar from '@/components/ProgressBar';
import { useAppContext } from '@/contexts/AppContext';

interface ChatMessage {
  id: number;
  type: 'ai' | 'user';
  content: string;
  options?: string[];
  inputType?: 'text' | 'phone' | 'url';
  placeholder?: string;
}

const Analise = () => {
  const navigate = useNavigate();
  const { user, setUser, setCurrentStep, formProgress, setFormProgress } = useAppContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentChatStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatSteps = [
    {
      message: "Olá! 👋 Sou a IA do ClaroAI. Vou fazer uma análise completa do seu negócio em poucos minutos.",
      type: 'greeting'
    },
    {
      message: "Primeiro, me diga seu nome:",
      type: 'input',
      field: 'nome',
      inputType: 'text',
      placeholder: 'Digite seu nome completo'
    },
    {
      message: "Qual seu WhatsApp para enviarmos o relatório?",
      type: 'input',
      field: 'whatsapp',
      inputType: 'phone',
      placeholder: '(11) 99999-9999'
    },
    {
      message: "Que tipo de serviço você oferece?",
      type: 'options',
      field: 'tipoNegocio',
      options: ['Consultoria', 'Design', 'Marketing', 'Advocacia', 'Contabilidade', 'Outros']
    },
    {
      message: "Qual seu faturamento mensal aproximado?",
      type: 'options',
      field: 'faturamento',
      options: ['Até R$10k', 'R$10k-30k', 'R$30k-100k', 'Mais de R$100k']
    },
    {
      message: "Qual seu principal desafio comercial hoje?",
      type: 'options',
      field: 'desafio',
      options: ['Gerar leads', 'Converter leads', 'Organizar processo', 'Aumentar ticket']
    },
    {
      message: "Tem Instagram ou site do negócio?",
      type: 'multi-input',
      fields: ['instagram', 'site']
    },
    {
      message: "Como faz prospecção hoje?",
      type: 'options',
      field: 'prospeccao',
      options: ['Indicação', 'Redes sociais', 'Google', 'Não faço']
    },
    {
      message: "Quanto investe em marketing por mês?",
      type: 'options',
      field: 'investimento',
      options: ['Nada', 'Até R$500', 'R$500-2k', 'Mais de R$2k']
    },
    {
      message: "Perfeito! 🎯 Agora vou analisar tudo...",
      type: 'loading'
    },
    {
      message: "Análise concluída! Encontrei insights poderosos sobre seu negócio. Clique para ver:",
      type: 'final'
    }
  ];

  useEffect(() => {
    console.log('[Analise] Iniciando chat');
    addMessage(chatSteps[0].message, 'ai');
    setTimeout(() => {
      setCurrentChatStep(1);
      addMessage(chatSteps[1].message, 'ai');
    }, 1500);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (content: string, type: 'ai' | 'user', options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type,
        content,
        options,
      }]);
      setIsTyping(false);
    }, type === 'ai' ? 1000 : 0);
  };

  const handleInputSubmit = (value: string) => {
    const step = chatSteps[currentStep];
    console.log(`[Analise] Resposta recebida para ${step.field}:`, value);
    
    if (!value.trim()) return;

    const sanitizedValue = value.trim().replace(/[<>\"']/g, '');
    
    addMessage(sanitizedValue, 'user');
    
    if (step.field) {
      setUser({ [step.field]: sanitizedValue });
    }

    proceedToNextStep();
  };

  const handleOptionSelect = (option: string) => {
    const step = chatSteps[currentStep];
    console.log(`[Analise] Opção selecionada para ${step.field}:`, option);
    
    addMessage(option, 'user');
    
    if (step.field) {
      setUser({ [step.field]: option });
    }

    proceedToNextStep();
  };

  const handleMultiInputSubmit = () => {
    const instagram = currentInput.includes('@') ? currentInput : '';
    const site = currentInput.includes('http') || currentInput.includes('.com') ? currentInput : '';
    
    const response = [];
    if (instagram) response.push(`Instagram: ${instagram}`);
    if (site) response.push(`Site: ${site}`);
    if (response.length === 0) response.push('Ainda não tenho');

    addMessage(response.join('\n'), 'user');
    setUser({ instagram, site });
    setCurrentInput('');
    proceedToNextStep();
  };

  const proceedToNextStep = () => {
    const progress = ((currentStep + 1) / chatSteps.length) * 100;
    setFormProgress(progress);

    if (currentStep < chatSteps.length - 1) {
      setTimeout(() => {
        const nextStep = currentStep + 1;
        setCurrentChatStep(nextStep);

        if (chatSteps[nextStep].type === 'loading') {
          addMessage(chatSteps[nextStep].message, 'ai');
          
          setTimeout(() => {
            setCurrentChatStep(nextStep + 1);
            addMessage(chatSteps[nextStep + 1].message, 'ai');
          }, 3000);
        } else {
          addMessage(chatSteps[nextStep].message, 'ai', chatSteps[nextStep].options);
        }
      }, 1500);
    }
  };

  const handleViewAnalysis = () => {
    console.log('[Analise] Redirecionando para dashboard');
    setCurrentStep('dashboard');
    navigate('/dashboard');
  };

  const currentStepData = chatSteps[currentStep];
  const isWaitingForInput = currentStepData && ['input', 'multi-input'].includes(currentStepData.type);
  const isWaitingForOptions = currentStepData && currentStepData.type === 'options';
  const isFinalStep = currentStepData && currentStepData.type === 'final';

  return (
    <div className="min-h-screen bg-claro-background">
      {/* Header Moderno */}
      <header className="bg-claro-card/80 backdrop-blur-sm border-b border-claro-accent/20 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-claro-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div>
              <h1 className="text-lg font-bold claro-text-gradient">ClaroAI Assistant</h1>
              <p className="text-xs text-gray-400">Análise Comercial Inteligente</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ProgressBar progress={formProgress} className="w-24" />
            <span className="text-xs text-gray-400">{Math.round(formProgress)}%</span>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto bg-claro-card/30 rounded-t-2xl mt-4 mx-4 shadow-claro-lg overflow-hidden">
        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4 bg-claro-background/50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex animate-fade-in ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-claro-gradient' 
                    : 'bg-claro-accent'
                }`}>
                  <span className="text-white font-bold text-xs">
                    {message.type === 'user' ? 'U' : 'AI'}
                  </span>
                </div>
                
                {/* Message Bubble */}
                <div className={`rounded-2xl p-4 shadow-sm ${
                  message.type === 'user'
                    ? 'bg-claro-gradient text-white'
                    : 'claro-glass'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                  
                  {/* Options */}
                  {message.options && isWaitingForOptions && (
                    <div className="mt-4 grid gap-2">
                      {message.options.map((option, index) => (
                        <ClaroButton
                          key={index}
                          variant="secondary"
                          size="sm"
                          className="w-full text-left justify-start hover:scale-105 transition-transform"
                          onClick={() => handleOptionSelect(option)}
                        >
                          {option}
                        </ClaroButton>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Animation */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 bg-claro-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AI</span>
                </div>
                <div className="claro-glass rounded-2xl p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-claro-accent rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-claro-accent rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-claro-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {currentStepData?.type === 'loading' && (
            <div className="flex justify-center animate-fade-in">
              <LoadingSpinner text="Analisando seus dados..." />
            </div>
          )}

          {/* Final CTA */}
          {isFinalStep && (
            <div className="flex justify-center animate-fade-in">
              <ClaroButton 
                onClick={handleViewAnalysis} 
                size="lg"
                className="shadow-claro-lg hover:scale-105 transition-all duration-300"
              >
                Ver Minha Análise Completa
              </ClaroButton>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        {isWaitingForInput && (
          <div className="border-t border-claro-accent/20 bg-claro-card/50 p-4">
            {currentStepData.type === 'multi-input' ? (
              <div className="space-y-3">
                <ClaroInput
                  placeholder="@seuinstagram ou https://seusite.com"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleMultiInputSubmit()}
                  className="w-full"
                />
                <div className="flex space-x-2">
                  <ClaroButton
                    onClick={handleMultiInputSubmit}
                    className="flex-1"
                  >
                    Continuar
                  </ClaroButton>
                  <ClaroButton
                    variant="ghost"
                    onClick={() => {
                      addMessage('Ainda não tenho', 'user');
                      proceedToNextStep();
                    }}
                  >
                    Pular
                  </ClaroButton>
                </div>
              </div>
            ) : (
              <div className="flex space-x-3">
                <ClaroInput
                  placeholder={currentStepData.placeholder}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit(currentInput)}
                  className="flex-1"
                />
                <ClaroButton
                  onClick={() => handleInputSubmit(currentInput)}
                  disabled={!currentInput.trim()}
                  className="px-6"
                >
                  Enviar
                </ClaroButton>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analise;
