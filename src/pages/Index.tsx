import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Target, TrendingUp, Users, FileText, ArrowDown } from 'lucide-react';
import ClaroButton from '@/components/ClaroButton';
import ClaroCard from '@/components/ClaroCard';
import InteractiveDashboard from '@/components/InteractiveDashboard';
import { useAppContext } from '@/contexts/AppContext';

const Index = () => {
  const navigate = useNavigate();
  const { setCurrentStep } = useAppContext();

  const handleStartAnalysis = () => {
    console.log('[Landing] Iniciando análise');
    setCurrentStep('formulario');
    navigate('/analise');
  };

  const problemas = [
    {
      icon: <BarChart className="h-8 w-8 text-claro-accent" />,
      titulo: "Não sabe se seu marketing está funcionando",
      descricao: "Investe tempo e dinheiro sem ter clareza do retorno real"
    },
    {
      icon: <Users className="h-8 w-8 text-claro-accent" />,
      titulo: "Perde tempo com leads que não convertem",
      descricao: "Desperdiça energia com prospectos desqualificados"
    },
    {
      icon: <Target className="h-8 w-8 text-claro-accent" />,
      titulo: "Investe sem saber o retorno real",
      descricao: "Falta visibilidade sobre ROI e métricas importantes"
    }
  ];

  const metodoCLARO = [
    { letra: 'C', titulo: 'Captura Inteligente', icon: <Target className="h-6 w-6" />, descricao: 'Identificamos oportunidades ocultas no seu mercado' },
    { letra: 'L', titulo: 'Leads Qualificados', icon: <Users className="h-6 w-6" />, descricao: 'Encontramos seu ICP ideal e onde capturá-lo' },
    { letra: 'A', titulo: 'Análise Estratégica', icon: <BarChart className="h-6 w-6" />, descricao: 'Análise completa do seu posicionamento digital' },
    { letra: 'R', titulo: 'Roteiros Personalizados', icon: <FileText className="h-6 w-6" />, descricao: 'Anúncios e campanhas prontos para usar' },
    { letra: 'O', titulo: 'Otimização Contínua', icon: <TrendingUp className="h-6 w-6" />, descricao: 'Melhorias constantes baseadas em dados' }
  ];

  // Mock Instagram data for demonstration
  const instagramMockData = {
    profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format",
    followers: "1.2K",
    following: "890",
    posts: "156",
    lastPosts: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&auto=format"
    ],
    engagement: "7.3%",
    score: "75/100"
  };

  const depoimentos = [
    {
      nome: "João Silva",
      profissao: "Consultor",
      foto: "👨‍💼",
      depoimento: "Descobri 3 oportunidades que não via",
      resultado: "40% mais leads qualificados"
    },
    {
      nome: "Maria Santos",
      profissao: "Designer",
      foto: "👩‍🎨",
      depoimento: "Aumentei 40% as vendas em 2 meses",
      resultado: "R$ 15k a mais por mês"
    },
    {
      nome: "Pedro Costa",
      profissao: "Advogado",
      foto: "👨‍⚖️",
      depoimento: "Finalmente tenho clareza do meu comercial",
      resultado: "3x mais conversões"
    }
  ];

  return (
    <div className="min-h-screen bg-claro-background">
      {/* Header Fixo */}
      <header className="fixed top-0 w-full z-50 bg-claro-background/95 backdrop-blur-claro border-b border-claro-accent/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-claro-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-claro-h3 font-bold claro-text-gradient">ClaroAI</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#funcionalidades" className="text-gray-300 hover:text-claro-accent transition-colors">Funcionalidades</a>
            <a href="#como-funciona" className="text-gray-300 hover:text-claro-accent transition-colors">Como Funciona</a>
            <a href="#precos" className="text-gray-300 hover:text-claro-accent transition-colors">Preços</a>
            <a href="#contato" className="text-gray-300 hover:text-claro-accent transition-colors">Contato</a>
          </nav>

          <ClaroButton onClick={handleStartAnalysis} size="sm">
            Análise Gratuita
          </ClaroButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-claro-h1 md:text-6xl font-bold mb-6 leading-tight">
              A Primeira IA que Entrega{' '}
              <span className="claro-text-gradient">Clareza Total</span>{' '}
              Sobre Seu Comercial
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Análise completa + Leads qualificados + Campanhas personalizadas. 
              <br />
              <strong className="text-claro-accent">Método C.L.A.R.O</strong> comprovado para prestadores de serviços.
            </p>

            <ClaroButton 
              onClick={handleStartAnalysis}
              size="lg"
              className="mb-8 text-xl px-12 py-4 hover:scale-105 transition-transform"
            >
              Gerar Minha Análise Gratuita
            </ClaroButton>

            {/* Instagram Analysis Preview */}
            <div className="max-w-3xl mx-auto mt-12">
              <h3 className="text-xl font-semibold mb-6 text-claro-accent">Análise Prévia do Instagram</h3>
              <ClaroCard className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={instagramMockData.profilePic} 
                    alt="Profile" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h4 className="text-lg font-semibold">@seuperfil</h4>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>{instagramMockData.followers} seguidores</span>
                      <span>{instagramMockData.following} seguindo</span>
                      <span>{instagramMockData.posts} posts</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-claro-accent mb-2">Últimos Posts:</h5>
                  <div className="flex gap-2 justify-center">
                    {instagramMockData.lastPosts.map((post, i) => (
                      <img key={i} src={post} alt={`Post ${i+1}`} className="w-16 h-16 rounded object-cover" />
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-claro-success">{instagramMockData.score}</span>
                    <span className="text-gray-400 ml-2">Score Geral</span>
                  </div>
                  <div className="text-claro-accent">
                    Engajamento: {instagramMockData.engagement}
                  </div>
                </div>
              </ClaroCard>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Problema */}
      <section className="py-20 px-4 bg-claro-card/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-claro-h2 font-bold mb-6">
              Cansado de Trabalhar <span className="claro-text-gradient">no Escuro?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {problemas.map((problema, index) => (
              <ClaroCard key={index} className="text-center hover:scale-105 transition-transform duration-300">
                <div className="mb-4 flex justify-center">
                  {problema.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{problema.titulo}</h3>
                <p className="text-gray-400">{problema.descricao}</p>
              </ClaroCard>
            ))}
          </div>
        </div>
      </section>

      {/* Método C.L.A.R.O */}
      <section id="como-funciona" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-claro-h2 font-bold mb-6">
              Método <span className="claro-text-gradient">C.L.A.R.O</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nossa metodologia exclusiva que transforma a nebulosa do seu comercial em clareza total
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {metodoCLARO.map((item, index) => (
                <div key={index} className="relative">
                  <ClaroCard className="text-center h-full hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-claro-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold">{item.letra}</span>
                    </div>
                    <div className="mb-3 flex justify-center text-claro-accent">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{item.titulo}</h3>
                    <p className="text-gray-400 text-sm">{item.descricao}</p>
                  </ClaroCard>
                  
                  {index < metodoCLARO.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowDown className="h-6 w-6 text-claro-accent rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Interativo */}
      <section id="funcionalidades" className="py-20 px-4 bg-claro-card/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-claro-h2 font-bold mb-6">
              Veja o Que Você Receberá <span className="claro-text-gradient">GRATUITAMENTE</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Dashboard interativo com insights reais do seu negócio. Explore cada seção abaixo:
            </p>
          </div>

          <InteractiveDashboard />
        </div>
      </section>

      {/* Prova Social */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-claro-h2 font-bold mb-6">
              Mais de <span className="claro-text-gradient">500+</span> Prestadores de Serviços Já Usam
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {depoimentos.map((depoimento, index) => (
              <ClaroCard key={index}>
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{depoimento.foto}</div>
                  <div>
                    <h4 className="font-semibold">{depoimento.nome}</h4>
                    <p className="text-gray-400 text-sm">{depoimento.profissao}</p>
                  </div>
                </div>
                <blockquote className="text-gray-300 mb-4 italic">
                  "{depoimento.depoimento}"
                </blockquote>
                <div className="text-claro-accent font-semibold">
                  {depoimento.resultado}
                </div>
              </ClaroCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-claro-gradient">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-claro-h2 font-bold mb-6">
              Pronto Para Ter Clareza Total?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Análise completa em 5 minutos. 100% gratuito.
            </p>
            <ClaroButton 
              onClick={handleStartAnalysis}
              variant="secondary"
              size="lg"
              className="bg-white text-claro-primary hover:bg-gray-100 text-xl px-12 py-4"
            >
              Começar Minha Análise Agora
            </ClaroButton>
            
            <p className="text-sm mt-4 opacity-75">
              ✅ Sem compromisso • ✅ Resultados em tempo real • ✅ Suporte especializado
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-claro-background border-t border-claro-accent/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-claro-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">AI</span>
            </div>
            <span className="text-lg font-bold claro-text-gradient">ClaroAI</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 ClaroAI. A primeira IA comercial para prestadores de serviços.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
