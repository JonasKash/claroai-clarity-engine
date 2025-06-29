
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Bot, User } from 'lucide-react';
import ClaroButton from '@/components/ClaroButton';
import ClaroCard from '@/components/ClaroCard';
import { useAppContext } from '@/contexts/AppContext';

const Analise = () => {
  const navigate = useNavigate();
  const { setUser, setCurrentStep } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userData, setUserData] = useState({
    nome: '',
    whatsapp: '',
    tipoNegocio: '',
    faturamento: '',
    desafio: '',
    site: '',
    instagram: '',
    prospeccao: '',
    investimento: '',
  });
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const chatFlow = [
    {
      id: 'welcome',
      type: 'bot',
      message: 'Olá! 👋 Sou Clara, assistente da ClaroAI. Vou fazer uma análise completa do seu negócio em poucos minutos.',
      delay: 1000
    },
    {
      id: 'name',
      type: 'bot',
      message: 'Primeiro, me diga seu nome:',
      inputType: 'text',
      field: 'nome',
      delay: 1500
    },
    {
      id: 'whatsapp',
      type: 'bot',
      message: 'Ótimo, {nome}! Qual seu WhatsApp para enviarmos o relatório?',
      inputType: 'tel',
      field: 'whatsapp',
      delay: 1000
    },
    {
      id: 'business',
      type: 'bot',
      message: 'Que tipo de serviço você oferece?',
      inputType: 'options',
      field: 'tipoNegocio',
      options: ['Consultoria', 'Design', 'Marketing', 'Advocacia', 'Contabilidade', 'Outros'],
      delay: 1000
    },
    {
      id: 'revenue',
      type: 'bot',
      message: 'Qual seu faturamento mensal aproximado?',
      inputType: 'options',
      field: 'faturamento',
      options: ['Até R$10k', 'R$10k-30k', 'R$30k-100k', 'Mais de R$100k'],
      delay: 1000
    },
    {
      id: 'challenge',
      type: 'bot',
      message: 'Qual seu principal desafio comercial hoje?',
      inputType: 'options',
      field: 'desafio',
      options: ['Gerar leads', 'Converter leads', 'Organizar processo', 'Aumentar ticket'],
      delay: 1000
    },
    {
      id: 'site',
      type: 'bot',
      message: 'Qual o site da sua empresa?',
      inputType: 'text',
      field: 'site',
      delay: 1000,
      placeholder: 'Digite seu site ou "não tenho"'
    },
    {
      id: 'instagram',
      type: 'bot',
      message: '', // Will be set dynamically
      inputType: 'text',
      field: 'instagram',
      delay: 1000,
      placeholder: '@usuario ou "não tenho"'
    },
    {
      id: 'prospecting',
      type: 'bot',
      message: 'Como faz prospecção hoje?',
      inputType: 'options',
      field: 'prospeccao',
      options: ['Indicação', 'Redes sociais', 'Google', 'Não faço'],
      delay: 1000
    },
    {
      id: 'investment',
      type: 'bot',
      message: 'Quanto investe em marketing por mês?',
      inputType: 'options',
      field: 'investimento',
      options: ['Nada', 'Até R$500', 'R$500-2k', 'Mais de R$2k'],
      delay: 1000
    },
    {
      id: 'analyzing',
      type: 'bot',
      message: 'Perfeito! 🎯 Agora vou analisar tudo...',
      delay: 2000,
      showLoading: true
    },
    {
      id: 'complete',
      type: 'bot',
      message: 'Análise concluída! Encontrei insights poderosos sobre seu negócio. 🚀',
      delay: 3000,
      showButton: true,
      buttonText: 'Ver Minha Análise Completa',
      buttonAction: 'complete'
    }
  ];

  // Initialize chat
  useEffect(() => {
    console.log('[Analise] Component mounted, starting chat');
    if (!chatStarted) {
      setChatStarted(true);
      processNextStep(0);
    }
  }, []);

  // Process next step in chat flow
  const processNextStep = (stepIndex) => {
    console.log(`[Analise] Processing step ${stepIndex}`);
    
    if (stepIndex >= chatFlow.length) {
      console.log('[Analise] Chat flow completed');
      return;
    }

    const step = chatFlow[stepIndex];
    
    setTimeout(() => {
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        let message = step.message;
        
        // Handle dynamic Instagram message based on site response
        if (step.id === 'instagram') {
          const hasSite = userData.site && userData.site.toLowerCase() !== 'não tenho' && userData.site.trim() !== '';
          message = hasSite ? 'Ótimo! E qual seu Instagram (@usuario)?' : 'Entendido. Qual seu Instagram (@usuario)?';
        } else {
          message = message.replace('{nome}', userData.nome || '');
        }
        
        setMessages(prev => [...prev, {
          ...step,
          message,
          timestamp: new Date()
        }]);
        
        setAwaitingResponse(step.inputType ? true : false);
        
        // If step doesn't require input, move to next step
        if (!step.inputType && !step.showButton && !step.showLoading) {
          setCurrentStepIndex(stepIndex + 1);
        }
      }, 1500);
    }, step.delay || 0);
  };

  // Handle sending message
  const handleSendMessage = (value) => {
    if (awaitingResponse && currentStepIndex < chatFlow.length) {
      console.log(`[Analise] Message sent: ${value}`);
      
      const currentStepData = chatFlow[currentStepIndex];
      
      // Add user message
      setMessages(prev => [...prev, {
        type: 'user',
        message: value,
        timestamp: new Date()
      }]);

      // Update user data
      const newUserData = { ...userData };
      if (currentStepData.field) {
        newUserData[currentStepData.field] = value;
        setUserData(newUserData);
        setUser(newUserData);
      }

      setCurrentInput('');
      setAwaitingResponse(false);
      
      // Move to next step
      const nextStepIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextStepIndex);
      
      // Process next step after a short delay
      setTimeout(() => {
        processNextStep(nextStepIndex);
      }, 500);
    }
  };

  const handleOptionClick = (option) => {
    if (awaitingResponse) {
      handleSendMessage(option);
    }
  };

  const handleButtonClick = (action) => {
    if (action === 'complete') {
      console.log('[Analise] Redirecting to dashboard');
      setCurrentStep('dashboard');
      navigate('/dashboard');
    }
  };

  const renderInput = () => {
    if (currentStepIndex >= chatFlow.length) return null;
    
    const step = chatFlow[currentStepIndex];
    
    if (step.showButton) {
      return (
        <div className="p-4 border-t border-claro-accent/20">
          <ClaroButton
            onClick={() => handleButtonClick(step.buttonAction)}
            size="lg"
            className="w-full"
          >
            {step.buttonText}
          </ClaroButton>
        </div>
      );
    }

    if (step.inputType === 'options' && awaitingResponse) {
      return (
        <div className="p-4 border-t border-claro-accent/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {step.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="p-3 claro-glass hover:bg-claro-accent/10 text-white rounded-lg transition-all duration-300 text-sm font-medium border border-claro-accent/20 hover:border-claro-accent"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step.inputType && step.inputType !== 'options' && awaitingResponse && !step.showButton && !step.showLoading) {
      return (
        <div className="p-4 border-t border-claro-accent/20">
          <div className="flex gap-3">
            <input
              type={step.inputType}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && currentInput.trim()) {
                  handleSendMessage(currentInput.trim());
                }
              }}
              placeholder={step.placeholder || 'Digite sua resposta...'}
              className="flex-1 p-3 claro-glass border border-claro-accent/20 rounded-lg text-white placeholder-gray-400 focus:border-claro-accent focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => currentInput.trim() && handleSendMessage(currentInput.trim())}
              disabled={!currentInput.trim()}
              className="bg-claro-gradient hover:bg-claro-gradient-reverse disabled:bg-gray-600 text-white p-3 rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-claro-background">
      {/* Header */}
      <header className="border-b border-claro-accent/20 bg-claro-card/50 backdrop-blur-claro">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-claro-gradient rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Clara - Assistente ClaroAI</h1>
              <p className="text-gray-400 text-sm">Análise Comercial Inteligente</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <ClaroCard className="max-w-4xl mx-auto overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-claro-gradient' 
                      : 'claro-glass border border-claro-accent/20'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-claro-accent" />
                    )}
                  </div>
                  <div className={`rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-claro-gradient text-white'
                      : 'claro-glass text-gray-100'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.message}</p>
                    {message.showLoading && (
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-claro-accent rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-claro-accent rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-claro-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-xs text-claro-accent">Analisando...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-10 h-10 claro-glass border border-claro-accent/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-claro-accent" />
                  </div>
                  <div className="claro-glass rounded-2xl p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {renderInput()}
        </ClaroCard>
      </div>
    </div>
  );
};

export default Analise;
