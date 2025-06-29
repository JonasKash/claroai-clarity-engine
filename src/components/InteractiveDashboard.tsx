import React, { useState } from 'react';
import { BarChart, Target, TrendingUp, Users, Instagram, Globe, Mail, Linkedin } from 'lucide-react';
import ClaroCard from './ClaroCard';
import ProgressBar from './ProgressBar';

const InteractiveDashboard = () => {
  const [activeTab, setActiveTab] = useState('mercado');

  const tabs = [
    { id: 'mercado', label: 'Pesquisa de Mercado', icon: BarChart },
    { id: 'digital', label: 'Análise Digital', icon: TrendingUp },
    { id: 'anuncios', label: 'Anúncios Prontos', icon: Target },
    { id: 'icp', label: 'ICP Ideal', icon: Users }
  ];

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
    score: 75,
    status: "Bom"
  };

  const mockData = {
    mercado: {
      tamanhoMercado: 'R$ 4.2 bilhões',
      crescimento: '+22% ao ano',
      concorrentes: ['McKinsey Brasil', 'Deloitte', 'EY Consulting', 'Consultores Independentes'],
      oportunidades: [
        'Digitalização de PMEs acelera demanda por consultoria',
        'Mercado de transformação digital cresce 35% ao ano',
        'Especialização em nichos específicos tem alta demanda',
        'Consultoria remota reduz custos e amplia alcance'
      ],
      tendencias: ['IA aplicada à consultoria', 'Consultoria por assinatura', 'Micro-especializações']
    },
    digital: {
      instagram: { score: 75, status: 'Bom', melhorias: ['Aumentar frequência de posts', 'Melhorar engagement', 'Usar mais stories'] },
      google: { score: 45, status: 'Crítico', melhorias: ['Criar Google Meu Negócio', 'Otimizar SEO', 'Conseguir mais reviews'] },
      site: { score: 60, status: 'Regular', melhorias: ['Melhorar velocidade', 'Adicionar CTAs', 'Otimizar para mobile'] }
    },
    anuncios: [
      {
        tipo: 'LinkedIn Sponsored Content',
        titulo: 'Sua Empresa Cresceu, Mas os Processos Não?',
        copy: 'Empresários que faturam R$ 50k+ mensais enfrentam o mesmo problema: crescimento sem organização gera caos. Nossa metodologia já organizou +200 empresas, aumentando a eficiência em 40% em 90 dias.',
        cta: 'Ver Metodologia',
        plataforma: 'linkedin'
      },
      {
        tipo: 'Google Ads',
        titulo: 'Consultoria Empresarial | Resultados em 90 Dias',
        copy: 'Metodologia comprovada para organizar processos e aumentar faturamento. +200 empresas transformadas.',
        palavras: ['consultoria empresarial', 'organizar processos', 'aumentar faturamento'],
        plataforma: 'google'
      },
      {
        tipo: 'Instagram Stories',
        copy: 'Sua empresa fatura bem, mas vive um caos interno? 🤯\n\nProcessos desorganizados = Oportunidades perdidas\n\nQuer ver como organizar tudo?',
        timing: 'Segunda a quarta, 18h-20h',
        plataforma: 'instagram'
      },
      {
        tipo: 'WhatsApp Business',
        copy: 'Olá! Vi que você trabalha com consultoria. Tenho ajudado empresários como você a organizar processos e aumentar 40% a eficiência. Posso te mostrar como em 5 minutos?',
        plataforma: 'whatsapp'
      },
      {
        tipo: 'E-mail Marketing',
        titulo: 'Como [NOME] aumentou 60% as vendas organizando processos',
        copy: 'A diferença entre empresas que crescem de forma sustentável e as que vivem no caos está na ORGANIZAÇÃO...',
        plataforma: 'email'
      }
    ],
    icp: {
      nome: 'Carlos Empresário',
      idade: '38-52 anos',
      cargo: 'CEO/Diretor de PME',
      renda: 'R$ 25.000 - R$ 80.000/mês',
      localizacao: 'São Paulo, Rio de Janeiro, Belo Horizonte',
      dores: [
        'Processos internos desorganizados afetam crescimento',
        'Dificuldade em escalar operações sem perder qualidade',
        'Falta de visão estratégica para próximos 2-3 anos',
        'Equipe sem metodologia clara de trabalho'
      ],
      desejos: [
        'Aumentar faturamento em 50-100% no próximo ano',
        'Ter processos organizados e previsíveis',
        'Reduzir dependência da própria presença no negócio'
      ],
      canais: ['LinkedIn', 'Eventos de negócios', 'Indicações', 'Google'],
      abordagem: 'Profissional, baseada em dados, com cases específicos do setor'
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return <Linkedin className="w-5 h-5 text-blue-400" />;
      case 'google': return <Globe className="w-5 h-5 text-green-400" />;
      case 'instagram': return <Instagram className="w-5 h-5 text-pink-400" />;
      case 'whatsapp': return <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs">W</div>;
      case 'email': return <Mail className="w-5 h-5 text-purple-400" />;
      default: return <Target className="w-5 h-5 text-claro-accent" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-claro-success';
    if (score >= 50) return 'text-claro-warning';
    return 'text-red-400';
  };

  return (
    <ClaroCard className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs - Vertical no desktop, horizontal no mobile */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:min-w-[250px] pb-2 lg:pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-claro-gradient text-white shadow-claro transform scale-105'
                    : 'claro-glass text-gray-300 hover:bg-claro-accent/10 hover:text-claro-accent'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 min-h-[500px]">
          {activeTab === 'mercado' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-claro-h3 font-bold mb-6 claro-text-gradient">Análise de Mercado - Consultoria</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <ClaroCard>
                  <div className="text-center">
                    <h4 className="text-claro-accent font-semibold mb-2">Tamanho do Mercado</h4>
                    <p className="text-3xl font-bold text-claro-success mb-1">{mockData.mercado.tamanhoMercado}</p>
                    <p className="text-claro-accent text-sm">Crescimento: {mockData.mercado.crescimento}</p>
                  </div>
                </ClaroCard>
                
                <ClaroCard>
                  <div className="text-center">
                    <h4 className="text-claro-accent font-semibold mb-2">Oportunidades</h4>
                    <p className="text-3xl font-bold text-claro-warning mb-1">{mockData.mercado.oportunidades.length}</p>
                    <p className="text-gray-400 text-sm">Identificadas</p>
                  </div>
                </ClaroCard>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ClaroCard>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-claro-accent" />
                    Principais Concorrentes
                  </h4>
                  <ul className="space-y-2">
                    {mockData.mercado.concorrentes.map((concorrente, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-300">
                        <div className="w-2 h-2 bg-claro-accent rounded-full"></div>
                        <span className="text-sm">{concorrente}</span>
                      </li>
                    ))}
                  </ul>
                </ClaroCard>

                <ClaroCard>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-claro-success" />
                    Oportunidades Identificadas
                  </h4>
                  <ul className="space-y-3">
                    {mockData.mercado.oportunidades.map((oportunidade, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-claro-success rounded-full mt-2"></div>
                        <span className="text-sm text-gray-300 leading-relaxed">{oportunidade}</span>
                      </li>
                    ))}
                  </ul>
                </ClaroCard>
              </div>
            </div>
          )}

          {activeTab === 'digital' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-claro-h3 font-bold mb-6 claro-text-gradient">Análise do Posicionamento Digital</h3>
              
              <div className="grid gap-4">
                {/* Instagram with detailed analysis */}
                <ClaroCard>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Instagram className="w-6 h-6 text-pink-400" />
                      <h4 className="text-lg font-semibold">Instagram</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-2xl font-bold ${getScoreColor(instagramMockData.score)}`}>
                        {instagramMockData.score}/100
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-claro-success/20 text-claro-success">
                        {instagramMockData.status}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Instagram Analysis */}
                  <div className="mb-4 p-4 claro-glass rounded-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={instagramMockData.profilePic} 
                        alt="Profile" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h5 className="text-lg font-semibold">@seuperfil</h5>
                        <div className="flex gap-4 text-sm text-gray-400">
                          <span>{instagramMockData.followers} seguidores</span>
                          <span>{instagramMockData.following} seguindo</span>
                          <span>{instagramMockData.posts} posts</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h6 className="text-sm font-medium text-claro-accent mb-2">Últimos Posts:</h6>
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
                  
                  <ProgressBar progress={instagramMockData.score} className="mb-4" />
                  
                  <div>
                    <p className="text-claro-accent text-sm font-medium mb-2">Melhorias Prioritárias:</p>
                    <ul className="space-y-1">
                      {mockData.digital.instagram.melhorias.map((melhoria, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-claro-accent rounded-full"></div>
                          {melhoria}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ClaroCard>

                {/* Other platforms */}
                {Object.entries(mockData.digital).filter(([platform]) => platform !== 'instagram').map(([platform, data]) => (
                  <ClaroCard key={platform}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {platform === 'google' && <Globe className="w-5 h-5 text-blue-400" />}
                        {platform === 'site' && <Globe className="w-5 h-5 text-green-400" />}
                        <h4 className="text-white font-semibold capitalize">{platform}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">{data.score}/100</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          data.score >= 70 ? 'bg-green-500/20 text-green-400' :
                          data.score >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {data.status}
                        </span>
                      </div>
                    </div>
                    <ProgressBar progress={data.score} className="mb-3" />
                    <div>
                      <p className="text-claro-accent text-sm font-medium mb-1">Melhorias Prioritárias:</p>
                      <ul className="space-y-1">
                        {data.melhorias.map((m, i) => (
                          <li key={i} className="text-gray-300 text-sm">• {m}</li>
                        ))}
                      </ul>
                    </div>
                  </ClaroCard>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'anuncios' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-claro-h3 font-bold mb-6 claro-text-gradient">Anúncios Personalizados</h3>
              
              <div className="grid gap-4">
                {mockData.anuncios.map((anuncio, i) => (
                  <ClaroCard key={i}>
                    <div className="flex items-center gap-3 mb-4">
                      {getPlatformIcon(anuncio.plataforma)}
                      <h4 className="text-lg font-semibold">{anuncio.tipo}</h4>
                    </div>
                    
                    {anuncio.titulo && (
                      <h5 className="font-medium text-claro-accent mb-3">{anuncio.titulo}</h5>
                    )}
                    
                    <div className="bg-claro-background/50 rounded-lg p-4 mb-3">
                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                        {anuncio.copy}
                      </p>
                    </div>
                    
                    {anuncio.cta && (
                      <button className="bg-claro-gradient hover:bg-claro-gradient-reverse text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105">
                        {anuncio.cta}
                      </button>
                    )}
                    
                    {anuncio.palavras && (
                      <div className="mt-3">
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
                    
                    {anuncio.timing && (
                      <div className="mt-3">
                        <p className="text-claro-accent text-sm font-medium mb-1">Melhor timing:</p>
                        <p className="text-gray-400 text-xs">{anuncio.timing}</p>
                      </div>
                    )}
                  </ClaroCard>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'icp' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-claro-h3 font-bold mb-6 claro-text-gradient">Seu Cliente Ideal</h3>
              
              <ClaroCard>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-claro-gradient rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{mockData.icp.nome}</h4>
                    <p className="text-claro-accent">{mockData.icp.idade} • {mockData.icp.cargo}</p>
                    <p className="text-gray-400 text-sm">{mockData.icp.renda}</p>
                  </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h5 className="text-claro-accent font-semibold mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      Principais Dores
                    </h5>
                    <ul className="space-y-2">
                      {mockData.icp.dores.map((dor, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></div>
                          {dor}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-claro-accent font-semibold mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-claro-success rounded-full"></div>
                      Principais Desejos
                    </h5>
                    <ul className="space-y-2">
                      {mockData.icp.desejos.map((desejo, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-claro-success rounded-full mt-2"></div>
                          {desejo}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-claro-accent font-semibold mb-3">Onde Encontrar:</h5>
                    <div className="flex flex-wrap gap-2">
                      {mockData.icp.canais.map((canal, i) => (
                        <span key={i} className="bg-claro-accent/20 text-claro-accent px-3 py-1 rounded-full text-sm">
                          {canal}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-claro-accent font-semibold mb-3">Como Abordar:</h5>
                    <p className="text-gray-300 text-sm leading-relaxed">{mockData.icp.abordagem}</p>
                  </div>
                </div>
              </ClaroCard>
            </div>
          )}
        </div>
      </div>
    </ClaroCard>
  );
};

export default InteractiveDashboard;
