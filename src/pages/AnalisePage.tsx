import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Calendar,
  Users,
  DollarSign
} from 'lucide-react';
import ClaroButton from '@/components/ClaroButton';

interface AnalysisData {
  painel_de_controle: {
    score_geral: {
      valor: number;
      descricao: string;
    };
    principais_kpis: Array<{
      nome: string;
      valor: string;
      cor: string;
    }>;
  };
  analise_swot: {
    pontos_fortes: string[];
    pontos_fracos: string[];
    oportunidades: string[];
    ameacas: string[];
  };
  recomendacao_estrategica_imediata: {
    titulo: string;
    passos: string[];
    impacto_esperado: string;
  };
}

interface LeadData {
  nome?: string;
  whatsapp?: string;
  site?: string;
  instagram?: string;
  desafio?: string;
}

const AnalisePage: React.FC = () => {
  const { leadId } = useParams<{ leadId: string }>();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!leadId) return;

      try {
        const response = await fetch(`http://localhost:3001/api/analysis?leadId=${leadId}`);
        const data = await response.json();

        if (response.status === 202) {
          // Análise ainda sendo processada
          setError(data.message);
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(data.error || 'Erro ao carregar análise');
        }

        let analysisObj = data.analysis;
        if (typeof analysisObj === 'string') {
          try {
            analysisObj = JSON.parse(analysisObj);
          } catch (e) {
            setError('Erro ao processar análise recebida do backend.');
            setLoading(false);
            return;
          }
        }
        setAnalysis(analysisObj);
        setLeadData(data.leadData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [leadId]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981'; // Verde
    if (score >= 60) return '#F59E0B'; // Amarelo
    return '#EF4444'; // Vermelho
  };

  const getKpiColor = (cor: string) => {
    switch (cor) {
      case 'verde': return '#10B981';
      case 'amarelo': return '#F59E0B';
      case 'vermelho': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const handleScheduleCall = () => {
    // Redirecionar para agendamento com dados do lead
    navigate('/agendamento', { 
      state: { 
        leadData,
        analysisId: leadId 
      } 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-claro-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-claro-accent mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando sua análise personalizada...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-claro-background flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Análise em Processamento</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Esta página será atualizada automaticamente quando estiver pronta.</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-claro-background flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Análise não encontrada</h2>
          <p className="text-gray-400">Verifique se o link está correto.</p>
        </div>
      </div>
    );
  }

  // Preparar dados para gráficos
  const kpiData = analysis.painel_de_controle.principais_kpis.map(kpi => ({
    name: kpi.nome,
    value: kpi.valor === 'Alta' ? 100 : kpi.valor === 'Média' ? 60 : 30,
    color: getKpiColor(kpi.cor)
  }));

  const swotData = [
    { name: 'Pontos Fortes', value: analysis.analise_swot.pontos_fortes.length, color: '#10B981' },
    { name: 'Pontos Fracos', value: analysis.analise_swot.pontos_fracos.length, color: '#EF4444' },
    { name: 'Oportunidades', value: analysis.analise_swot.oportunidades.length, color: '#3B82F6' },
    { name: 'Ameaças', value: analysis.analise_swot.ameacas.length, color: '#F59E0B' }
  ];

  return (
    <div className="min-h-screen bg-claro-background">
      {/* Header */}
      <header className="bg-claro-card/50 backdrop-blur-sm border-b border-claro-accent/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-claro-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold claro-text-gradient">ClaroAI</h1>
                <p className="text-sm text-gray-400">Análise de Mercado Personalizada</p>
              </div>
            </div>
            
            <ClaroButton 
              onClick={handleScheduleCall}
              size="lg"
              className="bg-claro-gradient hover:bg-claro-gradient-reverse"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Agendar Call Estratégica
            </ClaroButton>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Score Geral */}
        <div className="mb-8">
          <div className="bg-claro-card rounded-2xl p-6 border border-claro-accent/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Score Geral</h2>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-claro-accent" />
                <span className="text-sm text-gray-400">Potencial de Mercado</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-700"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - analysis.painel_de_controle.score_geral.valor / 100)}`}
                    className="transition-all duration-1000 ease-out"
                    style={{ color: getScoreColor(analysis.painel_de_controle.score_geral.valor) }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold" style={{ color: getScoreColor(analysis.painel_de_controle.score_geral.valor) }}>
                    {analysis.painel_de_controle.score_geral.valor}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">{analysis.painel_de_controle.score_geral.descricao}</h3>
                <p className="text-gray-400">
                  {leadData?.nome ? `Olá ${leadData.nome}!` : 'Olá!'} Sua análise de mercado está pronta.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* KPIs Principais */}
          <div className="bg-claro-card rounded-2xl p-6 border border-claro-accent/20">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-claro-accent" />
              Principais KPIs
            </h3>
            
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={kpiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1B3A', 
                    border: '1px solid #6B46C1',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" fill="#6B46C1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Análise SWOT */}
          <div className="bg-claro-card rounded-2xl p-6 border border-claro-accent/20">
            <h3 className="text-xl font-semibold mb-4">Análise SWOT</h3>
            
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={swotData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {swotData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1B3A', 
                    border: '1px solid #6B46C1',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-semibold text-green-500 mb-2">Pontos Fortes</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  {analysis.analise_swot.pontos_fortes.slice(0, 2).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-500 mb-2">Oportunidades</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  {analysis.analise_swot.oportunidades.slice(0, 2).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <TrendingUp className="w-3 h-3 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Recomendação Estratégica */}
        <div className="bg-claro-card rounded-2xl p-6 border border-claro-accent/20 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-claro-accent" />
            Ação de Impacto Rápido
          </h3>
          
          <div className="bg-claro-accent/10 rounded-xl p-4 mb-4">
            <h4 className="font-semibold mb-3">{analysis.recomendacao_estrategica_imediata.titulo}</h4>
            
            <div className="space-y-3 mb-4">
              {analysis.recomendacao_estrategica_imediata.passos.map((passo, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-claro-accent rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-300">{passo}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <p className="text-green-400 font-semibold">
                {analysis.recomendacao_estrategica_imediata.impacto_esperado}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <ClaroButton 
              onClick={handleScheduleCall}
              size="lg"
              className="bg-claro-gradient hover:bg-claro-gradient-reverse"
            >
              <Users className="w-4 h-4 mr-2" />
              Quero Implementar Esta Estratégia
            </ClaroButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalisePage; 