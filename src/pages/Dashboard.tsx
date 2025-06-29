
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Target, TrendingUp, Users, FileText, ArrowDown } from 'lucide-react';
import ClaroButton from '@/components/ClaroButton';
import ClaroCard from '@/components/ClaroCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAppContext } from '@/contexts/AppContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, analise, setAnalise, setCurrentStep } = useAppContext();
  const [currentSection, setCurrentSection] = useState('pesquisa');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[Dashboard] Iniciando análise para:', user.nome);
    
    // Simular carregamento e gerar análise mockada
    setTimeout(() => {
      const mockAnalise = generateMockAnalise(user);
      setAnalise(mockAnalise);
      setLoading(false);
    }, 2000);
  }, [user, setAnalise]);

  const generateMockAnalise = (userData: any) => {
    console.log('[Dashboard] Gerando análise mockada para:', userData.tipoNegocio);
    
    const mercadoData = {
      'Consultoria': { tamanho: 'R$ 2.3 bilhões/ano', crescimento: '+15%', concorrentes: ['McKinsey', 'Deloitte', 'Consultores locais'], oportunidades: ['Digitalização PMEs', 'Consultoria online', 'Nichos especializados'] },
      'Design': { tamanho: 'R$ 1.8 bilhões/ano', crescimento: '+22%', concorrentes: ['Agências grandes', 'Freelancers', 'Plataformas online'], oportunidades: ['UX/UI especializado', 'Brand design', 'Design para e-commerce'] },
      'Marketing': { tamanho: 'R$ 3.1 bilhões/ano', crescimento: '+18%', concorrentes: ['Grandes agências', 'Marketing digital', 'Consultores independentes'], oportunidades: ['Marketing de conteúdo', 'Automação', 'Performance marketing'] },
      'Advocacia': { tamanho: 'R$ 4.2 bilhões/ano', crescimento: '+8%', concorrentes: ['Grandes escritórios', 'Advogados especialistas', 'Lawtech'], oportunidades: ['Direito digital', 'Consultoria preventiva', 'Advocacia online'] },
      'Contabilidade': { tamanho: 'R$ 2.8 bilhões/ano', crescimento: '+12%', concorrentes: ['Grandes escritórios', 'Fintechs', 'Contadores tradicionais'], oportunidades: ['Contabilidade consultiva', 'Automação', 'Consultoria fiscal'] }
    };

    const tipoNegocio = userData.tipoNegocio || 'Consultoria';
    const mercado = mercadoData[tipoNegocio] || mercadoData['Consultoria'];

    return {
      pesquisaMercado: {
        tamanhoMercado: mercado.tamanho,
        crescimento: mercado.crescimento,
        concorrentes: mercado.concorrentes,
        oportunidades: mercado.oportunidades
      },
      analiseDigital: {
        instagramScore: Math.floor(Math.random() * 30) + 60,
        googleScore: Math.floor(Math.random() * 40) + 40,
        siteScore: Math.floor(Math.random() * 35) + 55,
        recomendacoes: [
          'Aumentar frequência de posts no Instagram',
          'Otimizar perfil do Google Meu Negócio',
          'Melhorar velocidade de carregamento do site',
          'Implementar blog com conteúdo relevante',
          'Criar estratégia de reviews online'
        ]
      },
      anuncios: [
        {
          tipo: 'Instagram Stories',
          titulo: 'Transforme seu negócio hoje!',
          copy: `Você sabia que ${tipoNegocio.toLowerCase()} pode aumentar 40% o faturamento com a estratégia certa? 🚀\n\nDescubra como profissionais como você estão revolucionando seus resultados.\n\n👆 Deslize para saber mais`,
          orientacoes: ['Use cores vibrantes', 'Post entre 18h-21h', 'Inclua call-to-action claro']
        },
        {
          tipo: 'Feed Instagram',
          titulo: 'O segredo dos profissionais de sucesso',
          copy: `3 erros que todo ${userData.tipoNegocio?.toLowerCase() || 'profissional'} comete (e como evitar):\n\n❌ Não ter clareza do seu ICP\n❌ Investir sem medir resultados\n❌ Focar em quantidade, não qualidade\n\n✅ A solução? Método comprovado que já ajudou 500+ profissionais.\n\nQuer saber qual? Comenta "QUERO" que eu te explico!`,
          orientacoes: ['Post às 12h ou 19h', 'Use hashtags do nicho', 'Responda todos os comentários']
        },
        {
          tipo: 'Google Ads',
          titulo: `${tipoNegocio} Especializado | Resultados Garantidos`,
          copy: `Aumente seu faturamento em até 60% com nossa metodologia exclusiva. Mais de 500 casos de sucesso. Consultoria gratuita disponível.`,
          orientacoes: ['Palavras-chave: consultoria + sua cidade', 'Landing page otimizada', 'Orçamento mínimo R$ 30/dia']
        },
        {
          tipo: 'WhatsApp Business',
          titulo: 'Abordagem inicial',
          copy: `Olá! Vi que você trabalha com ${userData.tipoNegocio?.toLowerCase() || 'seu serviço'}. Tenho ajudado profissionais como você a aumentar 40% o faturamento. Posso te mostrar como em 5 minutos?`,
          orientacoes: ['Personalize com o nome', 'Envie após conexão no LinkedIn', 'Ofereça valor imediato']
        },
        {
          tipo: 'E-mail Marketing',
          titulo: 'Como [NOME] aumentou 60% as vendas em 30 dias',
          copy: `Oi ${userData.nome || '[NOME]'},\n\nVocê já se perguntou por que alguns profissionais conseguem resultados excepcionais enquanto outros lutam para conseguir clientes?\n\nA diferença está na CLAREZA.\n\n[NOME] descobriu isso da pior forma...\n[Continue lendo para ver a história completa]`,
          orientacoes: ['Subject line com curiosidade', 'Contar uma história', 'CTA claro no final']
        }
      ],
      icp: {
        nome: `${userData.tipoNegocio || 'Profissional'} Empreendedor`,
        demografia: `35-50 anos, renda R$ 15k+, ${userData.tipoNegocio?.toLowerCase() || 'profissional liberal'} há 5+ anos`,
        dores: [
          'Dificuldade para encontrar clientes qualificados',
          'Não consegue precificar adequadamente seus serviços',
          'Falta tempo para focar no comercial',
          'Não sabe como se destacar da concorrência'
        ],
        canais: ['LinkedIn', 'Instagram', 'Google', 'Indicações', 'Eventos do setor'],
        abordagem: 'Tom consultivo, focado em resultados e ROI. Timing: terça a quinta, 9h-11h ou 14h-17h',
        ticketMedio: userData.faturamento === 'Mais de R$100k' ? 'R$ 8.000 - R$ 25.000' : 'R$ 2.500 - R$ 8.000',
        objecoes: [
          '"Está muito caro" → Mostrar ROI e casos de sucesso',
          '"Preciso pensar" → Criar senso de urgência',
          '"Já tentei isso antes" → Diferenciar metodologia',
          '"Não tenho tempo" → Mostrar automatização'
        ]
      }
    };
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-claro-background flex items-center justify-center">
        <LoadingSpinner size="lg" text="Gerando sua análise personalizada..." />
      </div>
    );
  }

  if (!analise) {
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

  const scoreGeral = Math.round((analise.analiseDigital.instagramScore + analise.analiseDigital.googleScore + analise.analiseDigital.siteScore) / 3);

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
                <span className={scoreColor(scoreGeral)}>{scoreGeral}/100</span>
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
                  <p className="text-2xl font-bold text-claro-success">{analise.pesquisaMercado.tamanhoMercado}</p>
                </ClaroCard>
                
                <ClaroCard>
                  <h3 className="font-semibold text-gray-300 mb-2">Crescimento Anual</h3>
                  <p className="text-2xl font-bold text-claro-accent">{analise.pesquisaMercado.crescimento}</p>
                </ClaroCard>

                <ClaroCard>
                  <h3 className="font-semibold text-gray-300 mb-2">Principais Concorrentes</h3>
                  <p className="text-sm text-gray-400">{analise.pesquisaMercado.concorrentes.length} identificados</p>
                </ClaroCard>

                <ClaroCard>
                  <h3 className="font-semibold text-gray-300 mb-2">Oportunidades</h3>
                  <p className="text-sm text-gray-400">{analise.pesquisaMercado.oportunidades.length} encontradas</p>
                </ClaroCard>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ClaroCard>
                  <h3 className="text-xl font-semibold mb-4">Concorrentes Principais</h3>
                  <ul className="space-y-2">
                    {analise.pesquisaMercado.concorrentes.map((concorrente, index) => (
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
                    {analise.pesquisaMercado.oportunidades.map((oportunidade, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-claro-success rounded-full"></div>
                        <span>{oportunidade}</span>
                      </li>
                    ))}
                  </ul>
                </ClaroCard>
              </div>

              {/* Gráfico Mockado */}
              <ClaroCard>
                <h3 className="text-xl font-semibold mb-4">Crescimento do Mercado</h3>
                <div className="h-64 bg-gradient-to-r from-claro-primary/20 to-claro-accent/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 text-claro-accent mx-auto mb-4" />
                    <p className="text-gray-400">Gráfico de crescimento do mercado</p>
                    <p className="text-sm text-gray-500 mt-2">Dados dos últimos 5 anos</p>
                  </div>
                </div>
              </ClaroCard>
            </div>
          )}

          {currentSection === 'digital' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-claro-h2 font-bold mb-6">Análise Digital</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <ClaroCard>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Instagram</h3>
                    <div className="text-2xl">📱</div>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-400">Score</span>
                      <span className={`font-bold ${scoreColor(analise.analiseDigital.instagramScore)}`}>
                        {analise.analiseDigital.instagramScore}/100
                      </span>
                    </div>
                    <div className="w-full bg-claro-background rounded-full h-2">
                      <div
                        className="bg-claro-gradient h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${analise.analiseDigital.instagramScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{scoreLabel(analise.analiseDigital.instagramScore)}</p>
                </ClaroCard>

                <ClaroCard>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Google</h3>
                    <div className="text-2xl">🔍</div>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-400">Score</span>
                      <span className={`font-bold ${scoreColor(analise.analiseDigital.googleScore)}`}>
                        {analise.analiseDigital.googleScore}/100
                      </span>
                    </div>
                    <div className="w-full bg-claro-background rounded-full h-2">
                      <div
                        className="bg-claro-gradient h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${analise.analiseDigital.googleScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{scoreLabel(analise.analiseDigital.googleScore)}</p>
                </ClaroCard>

                <ClaroCard>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Site</h3>
                    <div className="text-2xl">🌐</div>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-400">Score</span>
                      <span className={`font-bold ${scoreColor(analise.analiseDigital.siteScore)}`}>
                        {analise.analiseDigital.siteScore}/100
                      </span>
                    </div>
                    <div className="w-full bg-claro-background rounded-full h-2">
                      <div
                        className="bg-claro-gradient h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${analise.analiseDigital.siteScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{scoreLabel(analise.analiseDigital.siteScore)}</p>
                </ClaroCard>
              </div>

              <ClaroCard>
                <h3 className="text-xl font-semibold mb-4">Recomendações Prioritárias</h3>
                <div className="space-y-3">
                  {analise.analiseDigital.recomendacoes.map((recomendacao, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-claro-background/50 rounded-lg">
                      <div className="w-6 h-6 bg-claro-accent rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <span>{recomendacao}</span>
                    </div>
                  ))}
                </div>
              </ClaroCard>
            </div>
          )}

          {currentSection === 'anuncios' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-claro-h2 font-bold mb-6">Anúncios Prontos para Usar</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {analise.anuncios.map((anuncio, index) => (
                  <ClaroCard key={index}>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{anuncio.tipo}</h3>
                        <span className="text-2xl">
                          {anuncio.tipo.includes('Instagram') ? '📱' : 
                           anuncio.tipo.includes('Google') ? '🔍' : 
                           anuncio.tipo.includes('WhatsApp') ? '💬' : '📧'}
                        </span>
                      </div>
                      <h4 className="font-medium text-claro-accent mb-3">{anuncio.titulo}</h4>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-medium mb-2">Copy:</h5>
                      <div className="bg-claro-background/50 p-4 rounded-lg">
                        <p className="whitespace-pre-line text-sm">{anuncio.copy}</p>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Orientações:</h5>
                      <ul className="space-y-1">
                        {anuncio.orientacoes.map((orientacao, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-claro-accent rounded-full mt-2"></div>
                            <span className="text-gray-400">{orientacao}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ClaroCard>
                ))}
              </div>
            </div>
          )}

          {currentSection === 'icp' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-claro-h2 font-bold mb-6">Seu ICP (Cliente Ideal)</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ClaroCard>
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-claro-gradient rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                      👤
                    </div>
                    <h3 className="text-xl font-semibold">{analise.icp.nome}</h3>
                    <p className="text-gray-400 mt-2">{analise.icp.demografia}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Ticket Médio Recomendado</h4>
                    <div className="bg-claro-success/20 border border-claro-success/30 rounded-lg p-4 text-center">
                      <span className="text-xl font-bold text-claro-success">{analise.icp.ticketMedio}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Como Abordar</h4>
                    <p className="text-gray-400 text-sm">{analise.icp.abordagem}</p>
                  </div>
                </ClaroCard>

                <div className="space-y-6">
                  <ClaroCard>
                    <h4 className="font-semibold mb-3">Principais Dores</h4>
                    <ul className="space-y-2">
                      {analise.icp.dores.map((dor, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                          <span className="text-sm">{dor}</span>
                        </li>
                      ))}
                    </ul>
                  </ClaroCard>

                  <ClaroCard>
                    <h4 className="font-semibold mb-3">Onde Encontrar</h4>
                    <div className="flex flex-wrap gap-2">
                      {analise.icp.canais.map((canal, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-claro-accent/20 text-claro-accent rounded-full text-xs font-medium"
                        >
                          {canal}
                        </span>
                      ))}
                    </div>
                  </ClaroCard>
                </div>
              </div>

              <ClaroCard>
                <h4 className="font-semibold mb-4">Objeções Comuns & Como Responder</h4>
                <div className="space-y-4">
                  {analise.icp.objecoes.map((objecao, index) => {
                    const [pergunta, resposta] = objecao.split(' → ');
                    return (
                      <div key={index} className="border border-claro-accent/20 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-red-400/20 rounded-full flex items-center justify-center text-red-400 text-xs font-bold">
                            ?
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-red-400 mb-2">{pergunta}</p>
                            <p className="text-sm text-gray-400">{resposta}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ClaroCard>
            </div>
          )}
        </div>
      </div>

      {/* Footer Fixo */}
      <div className="fixed bottom-0 left-0 right-0 bg-claro-gradient p-4 border-t border-claro-accent/20">
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

      {/* Espaçamento para o footer fixo */}
      <div className="h-32"></div>
    </div>
  );
};

export default Dashboard;
