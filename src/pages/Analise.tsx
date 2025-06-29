
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
  inputPlaceholder?: string;
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
    
    // Validação básica
    if (!value.trim()) return;

    // Sanitização
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
          
          // Simular loading
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
    <div className="min-h-screen bg-claro-background flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-claro-accent/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-claro-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold claro-text-gradient">ClaroAI</span>
          </div>
          
          <ProgressBar progress={formProgress} className="flex-1 mx-8 max-w-md" />
          
          <span className="text-sm text-gray-400">
            {Math.round(formProgress)}% completo
          </span>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-claro-gradient text-white ml-4'
                  : 'claro-glass mr-4'
              }`}>
                {message.type === 'ai' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-claro-gradient rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">AI</span>
                    </div>
                    <span className="text-sm font-medium text-claro-accent">ClaroAI</span>
                  </div>
                )}
                
                <p className="whitespace-pre-line">{message.content}</p>
                
                {message.options && isWaitingForOptions && (
                  <div className="mt-4 space-y-2">
                    {message.options.map((option, index) => (
                      <ClaroButton
                        key={index}
                        variant="secondary"
                        size="sm"
                        className="w-full text-left justify-start"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option}
                      </ClaroButton>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="claro-glass px-4 py-3 rounded-2xl mr-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-claro-gradient rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">AI</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-claro-accent rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-claro-accent rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-claro-accent rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStepData?.type === 'loading' && (
            <div className="flex justify-center">
              <LoadingSpinner text="Analisando seus dados..." />
            </div>
          )}

          {isFinalStep && (
            <div className="flex justify-center animate-fade-in">
              <ClaroButton onClick={handleViewAnalysis} size="lg">
                Ver Minha Análise Completa
              </ClaroButton>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      {isWaitingForInput && (
        <div className="p-4 border-t border-claro-accent/20">
          <div className="max-w-4xl mx-auto">
            {currentStepData.type === 'multi-input' ? (
              <div className="space-y-4">
                <ClaroInput
                  placeholder="@seuinstagram ou https://seusite.com"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleMultiInputSubmit()}
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
              <div className="flex space-x-2">
                <ClaroInput
                  placeholder={currentStepData.inputPlaceholder}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit(currentInput)}
                  className="flex-1"
                />
                <ClaroButton
                  onClick={() => handleInputSubmit(currentInput)}
                  disabled={!currentInput.trim()}
                >
                  Enviar
                </ClaroButton>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analise;
