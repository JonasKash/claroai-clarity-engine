
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import ClaroButton from '@/components/ClaroButton';
import ClaroCard from '@/components/ClaroCard';
import { useAppContext } from '@/contexts/AppContext';

const Agendamento = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);

  // Mock available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return {
      value: date.toISOString().split('T')[0],
      display: date.toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      })
    };
  });

  // Mock available times
  const availableTimes = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      console.log('[Agendamento] Simulando agendamento para:', selectedDate, selectedTime);
      setIsScheduled(true);
      
      // Simulate API call delay
      setTimeout(() => {
        console.log('[Agendamento] Agendamento confirmado');
      }, 1000);
    }
  };

  const handleWhatsAppContact = () => {
    const message = `Olá! Sou ${user.nome || 'um usuário'} e gostaria de agendar uma conversa estratégica sobre minha análise comercial.`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isScheduled) {
    return (
      <div className="min-h-screen bg-claro-background flex items-center justify-center px-4">
        <ClaroCard className="max-w-md mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-claro-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Reunião Agendada!</h2>
          <p className="text-gray-300 mb-2">
            Sua conversa estratégica foi agendada para:
          </p>
          <div className="bg-claro-background/50 rounded-lg p-4 mb-6">
            <p className="text-claro-accent font-semibold">
              {availableDates.find(d => d.value === selectedDate)?.display}
            </p>
            <p className="text-claro-accent font-semibold">
              às {selectedTime}
            </p>
          </div>
          <p className="text-sm text-gray-400 mb-6">
            * Integração Calendly será ativada na versão final
          </p>
          <div className="space-y-3">
            <ClaroButton 
              onClick={() => navigate('/dashboard')}
              className="w-full"
            >
              Voltar ao Dashboard
            </ClaroButton>
            <ClaroButton 
              onClick={handleWhatsAppContact}
              variant="ghost"
              className="w-full"
            >
              Falar no WhatsApp
            </ClaroButton>
          </div>
        </ClaroCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-claro-background">
      {/* Header */}
      <header className="border-b border-claro-accent/20 bg-claro-card/50 backdrop-blur-claro">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Agendar Conversa Estratégica</h1>
              <p className="text-gray-400">15 minutos para mostrar como podemos 3x suas vendas</p>
            </div>
            <ClaroButton 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
            >
              Voltar
            </ClaroButton>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Benefits */}
          <div className="space-y-6">
            <ClaroCard>
              <h3 className="text-xl font-semibold mb-4">O que vamos discutir:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-claro-success mt-0.5" />
                  <span>Análise detalhada dos seus resultados</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-claro-success mt-0.5" />
                  <span>Oportunidades específicas identificadas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-claro-success mt-0.5" />
                  <span>Plano personalizado para seu negócio</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-claro-success mt-0.5" />
                  <span>Como automatizar 100% do seu comercial</span>
                </li>
              </ul>
            </ClaroCard>

            <ClaroCard>
              <blockquote className="text-center">
                <p className="text-lg text-gray-300 mb-4 italic">
                  "Em 30 dias aumentei 60% as vendas após a conversa estratégica"
                </p>
                <footer className="text-claro-accent font-semibold">
                  - Cliente Real
                </footer>
              </blockquote>
            </ClaroCard>
          </div>

          {/* Scheduling */}
          <div className="space-y-6">
            <ClaroCard>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-claro-accent" />
                Escolha uma data
              </h3>
              
              <div className="grid grid-cols-1 gap-2 mb-6">
                {availableDates.map((date) => (
                  <button
                    key={date.value}
                    onClick={() => setSelectedDate(date.value)}
                    className={`p-3 rounded-lg text-left transition-all duration-300 ${
                      selectedDate === date.value
                        ? 'bg-claro-gradient text-white'
                        : 'bg-claro-background/50 text-gray-300 hover:bg-claro-accent/10'
                    }`}
                  >
                    {date.display}
                  </button>
                ))}
              </div>

              {selectedDate && (
                <>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-claro-accent" />
                    Escolha um horário
                  </h4>
                  
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg text-center transition-all duration-300 ${
                          selectedTime === time
                            ? 'bg-claro-gradient text-white'
                            : 'bg-claro-background/50 text-gray-300 hover:bg-claro-accent/10'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {selectedDate && selectedTime && (
                <div className="space-y-4">
                  <div className="bg-claro-background/50 rounded-lg p-4">
                    <h5 className="font-semibold text-claro-accent mb-2">Resumo do Agendamento:</h5>
                    <p className="text-gray-300">
                      {availableDates.find(d => d.value === selectedDate)?.display}
                    </p>
                    <p className="text-gray-300">às {selectedTime}</p>
                  </div>
                  
                  <ClaroButton
                    onClick={handleSchedule}
                    className="w-full"
                    size="lg"
                  >
                    Confirmar Agendamento
                  </ClaroButton>
                  
                  <p className="text-xs text-gray-400 text-center">
                    * Integração Calendly será ativada na versão final
                  </p>
                </div>
              )}
            </ClaroCard>

            <ClaroCard>
              <h4 className="font-semibold mb-3">Prefere falar agora?</h4>
              <ClaroButton
                onClick={handleWhatsAppContact}
                variant="secondary"
                className="w-full"
              >
                Chamar no WhatsApp
              </ClaroButton>
            </ClaroCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agendamento;
