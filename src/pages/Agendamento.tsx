
import React, { useState } from 'react';
import { Check, Clock, Calendar, MessageCircle, User, Mail, Phone } from 'lucide-react';
import ClaroButton from '@/components/ClaroButton';
import ClaroCard from '@/components/ClaroCard';
import ClaroInput from '@/components/ClaroInput';
import { useAppContext } from '@/contexts/AppContext';

const Agendamento = () => {
  const { user } = useAppContext();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    nome: user.nome || '',
    email: '',
    telefone: user.whatsapp || '',
    empresa: '',
    observacoes: ''
  });
  const [agendado, setAgendado] = useState(false);

  // Datas disponíveis (próximos 7 dias úteis)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let count = 0;
    let currentDate = new Date(today);

    while (count < 7) {
      currentDate.setDate(currentDate.getDate() + 1);
      
      // Pular fins de semana
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        dates.push({
          date: currentDate.toISOString().split('T')[0],
          formatted: currentDate.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          })
        });
        count++;
      }
    }
    return dates;
  };

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const beneficios = [
    'Análise detalhada dos seus resultados',
    'Oportunidades específicas identificadas',
    'Plano personalizado para seu negócio',
    'Como automatizar 100% do seu comercial'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirmarAgendamento = () => {
    console.log('[Agendamento] Confirmando agendamento:', {
      ...formData,
      data: selectedDate,
      horario: selectedTime
    });

    // Simular confirmação
    setAgendado(true);
  };

  const handleWhatsAppDireto = () => {
    const message = `Olá! Vim do ClaroAI e gostaria de agendar uma conversa estratégica. Meu nome é ${formData.nome} e trabalho com ${user.tipoNegocio}.`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (agendado) {
    return (
      <div className="min-h-screen bg-claro-background flex items-center justify-center p-4">
        <ClaroCard className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-claro-success rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Agendamento Confirmado!</h2>
          
          <div className="space-y-3 text-left mb-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-claro-accent" />
              <span>{getAvailableDates().find(d => d.date === selectedDate)?.formatted}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-claro-accent" />
              <span>{selectedTime}</span>
            </div>
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-claro-accent" />
              <span>{formData.nome}</span>
            </div>
          </div>

          <div className="bg-claro-background/50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Próximos Passos:</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>✅ Confirmação enviada para seu e-mail</li>
              <li>✅ Link da reunião no WhatsApp</li>
              <li>✅ Lembrete 1h antes</li>
            </ul>
          </div>

          <ClaroButton onClick={handleWhatsAppDireto} className="w-full">
            <MessageCircle className="h-4 w-4 mr-2" />
            Confirmar no WhatsApp
          </ClaroButton>
        </ClaroCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-claro-background">
      {/* Header */}
      <header className="border-b border-claro-accent/20 bg-claro-card/50 backdrop-blur-claro">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-claro-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold claro-text-gradient">ClaroAI</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Lado Esquerdo - Benefícios */}
          <div className="space-y-6">
            <div>
              <h1 className="text-claro-h2 font-bold mb-4">
                Conversa Estratégica <span className="claro-text-gradient">Gratuita</span>
              </h1>
              <p className="text-xl text-gray-300">
                15 minutos para mostrar como podemos <strong className="text-claro-accent">3x suas vendas</strong>
              </p>
            </div>

            <ClaroCard>
              <h3 className="text-xl font-semibold mb-4">O que vamos discutir:</h3>
              <ul className="space-y-3">
                {beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-claro-success rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span>{beneficio}</span>
                  </li>
                ))}
              </ul>
            </ClaroCard>

            <ClaroCard gradient>
              <div className="text-center">
                <div className="text-4xl mb-3">🚀</div>
                <blockquote className="text-lg italic mb-4">
                  "Em 30 dias aumentei 60% as vendas seguindo o método apresentado na conversa"
                </blockquote>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">👨‍💼</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Carlos Silva</p>
                    <p className="text-sm opacity-80">Consultor Empresarial</p>
                  </div>
                </div>
              </div>
            </ClaroCard>

            <div className="text-center">
              <p className="text-gray-400 mb-4">Prefere falar direto no WhatsApp?</p>
              <ClaroButton onClick={handleWhatsAppDireto} variant="secondary" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Falar com Especialista Agora
              </ClaroButton>
            </div>
          </div>

          {/* Lado Direito - Formulário de Agendamento */}
          <div className="space-y-6">
            <ClaroCard>
              <h3 className="text-xl font-semibold mb-6">Agendar Conversa</h3>

              {/* Seleção de Data */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Escolha a data:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {getAvailableDates().map((date) => (
                    <button
                      key={date.date}
                      onClick={() => setSelectedDate(date.date)}
                      className={`p-3 rounded-lg text-left transition-all duration-300 capitalize ${
                        selectedDate === date.date
                          ? 'bg-claro-gradient text-white'
                          : 'bg-claro-background/50 hover:bg-claro-accent/10 border border-claro-accent/20'
                      }`}
                    >
                      {date.formatted}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seleção de Horário */}
              {selectedDate && (
                <div className="mb-6 animate-fade-in">
                  <h4 className="font-medium mb-3">Escolha o horário:</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg text-sm transition-all duration-300 ${
                          selectedTime === time
                            ? 'bg-claro-gradient text-white'
                            : 'bg-claro-background/50 hover:bg-claro-accent/10 border border-claro-accent/20'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Formulário */}
              {selectedDate && selectedTime && (
                <div className="space-y-4 animate-fade-in">
                  <ClaroInput
                    label="Nome completo"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    placeholder="Seu nome completo"
                  />

                  <ClaroInput
                    label="E-mail"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                  />

                  <ClaroInput
                    label="WhatsApp"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange('telefone', e.target.value)}
                    placeholder="(11) 99999-9999"
                  />

                  <ClaroInput
                    label="Empresa/Negócio"
                    value={formData.empresa}
                    onChange={(e) => handleInputChange('empresa', e.target.value)}
                    placeholder="Nome da sua empresa"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Observações (opcional)
                    </label>
                    <textarea
                      className="w-full px-4 py-3 bg-claro-card/50 border border-claro-accent/30 rounded-claro text-white placeholder-gray-400 focus:border-claro-accent focus:ring-2 focus:ring-claro-accent/20 focus:outline-none transition-all duration-300 resize-none"
                      rows={3}
                      value={formData.observacoes}
                      onChange={(e) => handleInputChange('observacoes', e.target.value)}
                      placeholder="Conte um pouco sobre seu principal desafio..."
                    />
                  </div>

                  <ClaroButton
                    onClick={handleConfirmarAgendamento}
                    className="w-full"
                    disabled={!formData.nome || !formData.email || !formData.telefone}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Confirmar Agendamento
                  </ClaroButton>

                  <p className="text-xs text-gray-400 text-center">
                    ✅ Sem compromisso • ✅ 100% gratuito • ✅ Cancelamento fácil
                  </p>
                </div>
              )}
            </ClaroCard>

            {/* Informações de Contato */}
            <ClaroCard>
              <h4 className="font-semibold mb-4">Informações da Reunião</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-claro-accent" />
                  <span>Duração: 15-20 minutos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-4 w-4 text-claro-accent" />
                  <span>Via Google Meet ou WhatsApp</span>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-claro-accent" />
                  <span>Com especialista certificado</span>
                </div>
              </div>
            </ClaroCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agendamento;
