import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Target, TrendingUp, Users, FileText, Instagram, Globe, Mail, Linkedin } from 'lucide-react';
import ClaroButton from '@/components/ClaroButton';
import ClaroCard from '@/components/ClaroCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ProgressBar from '@/components/ProgressBar';
import { useAppContext } from '@/contexts/AppContext';
import { generateMockAnalysis, BusinessAnalysis } from '@/utils/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setCurrentStep } = useAppContext();
  const [currentSection, setCurrentSection] = useState('pesquisa');
  const [loading, setLoading] = useState(true);
  const [richAnalysis, setRichAnalysis] = useState<BusinessAnalysis | null>(null);

  // Instagram mock data for detailed analysis
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
    engagement: "7.3%"
  };

  useEffect(() => {
    console.log('[Dashboard] Iniciando análise para:', user.nome);
    
    setTimeout(() => {
      const newAnalysis = generateMockAnalysis(user);
      setRichAnalysis(newAnalysis);
      setLoading(false);
    }, 2000);
  }, [user]);

  const handleAgendarConversa = () => {
    console.log('[Dashboard] Redirecionando para agendamento');
    setCurrentStep('agendamento');
    navigate('/agendamento');
  };

  const scoreColor = (score: number) => {
    if (score >= 80) return 'text-claro-success';
    if (score >= 60) return 'text-claro-warning';
    return 'text-red-400';
  };

  const scoreLabel = (score: number) => {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Bom';
    return 'Precisa melhorar';
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return <Linkedin className="w-5 h-5 text-blue-400" />;
      case 'google': return <Globe className="w-5 h-5 text-green-400" />;
      case 'instagram': return <Instagram className="w-5 h-5 text-pink-400" />;
      case 'whatsapp': return <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs text-white">W</div>;
      case 'email': return <Mail className="w-5 h-5 text-purple-400" />;
      default: return <Target className="w-5 h-5 text-claro-accent" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-claro-background flex items-center justify-center">
        <LoadingSpinner size="lg" text="Gerando sua análise personalizada..." />
      </div>
    );
  }

  if (!richAnalysis) {
    return (
      <div className="min-h-screen bg-claro-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Erro ao carregar análise</h2>
          <ClaroButton onClick={() => navigate('/analise')}>
            Refazer Análise
          </ClaroButton>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'pesquisa', name: 'Pesquisa de Mercado', icon: <BarChart className="h-5 w-5" /> },
    { id: 'digital', name: 'Análise Digital', icon: <Target className="h-5 w-5" /> },
    { id: 'anuncios', name: 'Anúncios Prontos', icon: <FileText className="h-5 w-5" /> },
    { id: 'icp', name: 'Seu ICP Ideal', icon: <Users className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-claro-background">
      {/* Header */}
      <header className="border-b border-claro-accent/20 bg-claro-card/50 backdrop-blur-claro">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Análise de {user.nome || 'Usuário'} | Score: {' '}
                <span className={scoreColor(richAnalysis.scoreGeral)}>{richAnalysis.scoreGeral}/100</span>
              </h1>
              <p className="text-gray-400">
                {user.tipoNegocio} • Análise gerada em {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <ClaroButton onClick={handleAgendarConversa} className="w-full md:w-auto">
                Agendar Conversa Estratégica
              </ClaroButton>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-claro-card/30 border-r border-claro-accent/20 p-6">
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  currentSection === section.id
                    ? 'bg-claro-gradient text-white'
                    : 'text-gray-300 hover:bg-claro-accent/10 hover:text-claro-accent'
                }`}
              >
                {section.icon}
                <span className="font-medium">{section.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {currentSection === 'pesquisa' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-claro-h2 font-bold mb-6">Pesquisa de Mercado</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <ClaroCard>
                  <h3 className="font-semibold text-gray-300 mb-2">Tamanho do Mercado</h3>
                  <p className="text-2xl font-bold text-claro-success">{richAnalysis.mercado.tamanho}</p>
                </ClaroCard>
                
                <ClaroCard>
                  <h3 className="font-semibold text-gray-300 mb-2">Crescimento Anual</h3>
                  <p className="text-2xl font-bold text-claro-accent">{richAnalysis.mercado.crescimento}</p>
                </ClaroCard>

                <ClaroCard>
                  <h3 className="font-semibold text-gray-300 mb-2">Concorrentes</h3>
                  <p className="text-2xl font-bold text-claro-warning">{richAnalysis.mercado.concorrentes.length}</p>
                  <p className="text-sm text-gray-400">identificados</p>
                </ClaroCard>

                <ClaroCard>
                  <h3 className="font-semibold text-gray-300 mb-2">Oportunidades</h3>
                  <p className="text-2xl font-bold text-claro-success">{richAnalysis.mercado.oportunidades.length}</p>
                  <p className="text-sm text-gray-400">encontradas</p>
                </ClaroCard>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ClaroCard>
                  <h3 className="text-xl font-semibold mb-4">Concorrentes Principais</h3>
                  <ul className="space-y-2">
                    {richAnalysis.mercado.concorrentes.map((concorrente, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-claro-accent rounded-full"></div>
                        <span>{concorrente}</span>
                      </li>
                    ))}
                  </ul>
                </ClaroCard>

                <ClaroCard>
                  <h3 className="text-xl font-semibold mb-4">Oportunidades Identificadas</h3>
                  <ul className="space-y-2">
                    {richAnalysis.mercado.oportunidades.map((oportunidade, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-claro-success rounded-full mt-2"></div>
                        <span className="text-sm">{oportunidade}</span>
                      </li>
                    ))}
                  </ul>
                </ClaroCard>
              </div>
            </div>
          )}

          {currentSection === 'digital' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-claro-h2 font-bold mb-6">Análise Digital</h2>
              
              <div className="grid gap-6">
                {Object.entries(richAnalysis.digital).map(([platform, data]) => (
                  <ClaroCard key={platform}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {platform === 'instagram' && <Instagram className="w-6 h-6 text-pink-400" />}
                        {platform === 'google' && <Globe className="w-6 h-6 text-blue-400" />}
                        {platform === 'site' && <Globe className="w-6 h-6 text-green-400" />}
                        <h3 className="text-lg font-semibold capitalize">{platform}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-2xl font-bold ${scoreColor(data.score)}`}>
                          {data.score}/100
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          data.score >= 70 ? 'bg-claro-success/20 text-claro-success' :
                          data.score >= 50 ? 'bg-claro-warning/20 text-claro-warning' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {data.status}
                        </span>
                      </div>
                    </div>
                    
                    {/* Detailed Instagram Analysis */}
                    {platform === 'instagram' && (
                      <div className="mb-4 p-4 claro-glass rounded-lg">
                        <div className="flex items-center gap-4 mb-4">
                          <img 
                            src={instagramMockData.profilePic} 
                            alt="Profile" 
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
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
                          <div className="flex gap-2">
                            {instagramMockData.lastPosts.map((post, i) => (
                              <img key={i} src={post} alt={`Post ${i+1}`} className="w-16 h-16 rounded object-cover" />
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-claro-accent font-medium">
                            Engajamento: {instagramMockData.engagement}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <ProgressBar progress={data.score} className="mb-4" />
                    
                    <div>
                      <p className="text-claro-accent text-sm font-medium mb-2">Melhorias Prioritárias:</p>
                      <ul className="space-y-1">
                        {data.melhorias.map((melhoria, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-claro-accent rounded-full"></div>
                            {melhoria}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ClaroCard>
                ))}
              </div>
            </div>
          )}

          {currentSection === 'anuncios' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-claro-h2 font-bold mb-6">Anúncios Prontos para Usar</h2>
              
              <div className="grid gap-6">
                {richAnalysis.anuncios.map((anuncio, i) => (
                  <ClaroCard key={i}>
                    <div className="flex items-center gap-3 mb-4">
                      {getPlatformIcon(anuncio.plataforma)}
                      <h3 className="text-lg font-semibold">{anuncio.tipo}</h3>
                    </div>
                    
                    {anuncio.titulo && (
                      <h4 className="font-medium text-claro-accent mb-3">{anuncio.titulo}</h4>
                    )}
                    
                    <div className="bg-claro-background/50 rounded-lg p-4 mb-3">
                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                        {anuncio.copy}
                      </p>
                    </div>
                    
                    {anuncio.cta && (
                      <button className="bg-claro-gradient hover:bg-claro-gradient-reverse text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 mb-3">
                        {anuncio.cta}
                      </button>
                    )}
                    
                    {anuncio.palavras && (
                      <div className="mb-3">
                        <p className="text-claro-accent text-sm font-medium mb-2">Palavras-chave:</p>
                        <div className="flex flex-wrap gap-2">
                          {anuncio.palavras.map((palavra, j) => (
                            <span key={j} className="bg-claro-accent/20 text-claro-accent px-2 py-1 rounded text-xs">
                              {palavra}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {anuncio.segmentacao && (
                      <div className="text-xs text-gray-400">
                        <strong>Segmentação:</strong> {anuncio.segmentacao}
                      </div>
                    )}
                  </ClaroCard>
                ))}
              </div>
            </div>
          )}

          {currentSection === 'icp' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-claro-h2 font-bold mb-6">Seu ICP (Cliente Ideal)</h2>
              
              <ClaroCard>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-claro-gradient rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{richAnalysis.icp.nome}</h3>
                    <p className="text-claro-accent">{richAnalysis.icp.idade} • {richAnalysis.icp.cargo}</p>
                    <p className="text-gray-400 text-sm">{richAnalysis.icp.renda}</p>
                  </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="text-claro-accent font-semibold mb-3">Principais Dores</h4>
                    <ul className="space-y-2">
                      {richAnalysis.icp.dores.map((dor, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                          {dor}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-claro-accent font-semibold mb-3">Principais Desejos</h4>
                    <ul className="space-y-2">
                      {richAnalysis.icp.desejos.map((desejo, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                          <div className="w-2 h-2 bg-claro-success rounded-full mt-2"></div>
                          {desejo}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-claro-accent font-semibold mb-3">Onde Encontrar</h4>
                    <div className="flex flex-wrap gap-2">
                      {richAnalysis.icp.canais.map((canal, i) => (
                        <span key={i} className="bg-claro-accent/20 text-claro-accent px-3 py-1 rounded-full text-sm">
                          {canal}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-claro-accent font-semibold mb-3">Como Abordar</h4>
                    <p className="text-gray-300 text-sm">{richAnalysis.icp.abordagem}</p>
                  </div>
                </div>
              </ClaroCard>
            </div>
          )}
        </div>
      </div>

      {/* Fixed CTA - Properly positioned at the bottom */}
      <div className="bg-claro-gradient p-6 mt-8">
        <div className="container mx-auto">
          <ClaroCard gradient className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              Isso é apenas 10% do que nossa plataforma completa oferece
            </h3>
            <p className="mb-4 opacity-90">Quer automatizar 100% do seu comercial?</p>
            <ClaroButton
              onClick={handleAgendarConversa}
              variant="secondary"
              className="bg-white text-claro-primary hover:bg-gray-100"
            >
              Agendar Conversa Estratégica
            </ClaroButton>
          </ClaroCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
