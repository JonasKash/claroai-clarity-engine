
export interface BusinessAnalysis {
  mercado: {
    tamanho: string;
    crescimento: string;
    concorrentes: string[];
    oportunidades: string[];
    tendencias: string[];
  };
  digital: {
    instagram: DigitalScore;
    google: DigitalScore;
    site: DigitalScore;
  };
  icp: {
    nome: string;
    idade: string;
    cargo: string;
    renda: string;
    localizacao: string;
    dores: string[];
    desejos: string[];
    comportamentos: string[];
    canais: string[];
    objecoes: string[];
    abordagem: string;
  };
  anuncios: Advertisement[];
  scoreGeral: number;
  recomendacoes: Recommendation[];
}

interface DigitalScore {
  score: number;
  status: string;
  melhorias: string[];
  oportunidades?: string[];
  metricas?: any;
}

interface Advertisement {
  tipo: string;
  titulo?: string;
  copy: string;
  cta?: string;
  palavras?: string[];
  timing?: string;
  plataforma: string;
  segmentacao?: string;
  extensoes?: string[];
  elementos?: string[];
}

interface Recommendation {
  prioridade: string;
  acao: string;
  impacto: string;
  prazo: string;
}

const businessTypes = {
  'Consultoria': {
    mercado: {
      tamanho: 'R$ 4.2 bilhões',
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
        'Reduzir dependência da própria presença no negócio',
        'Profissionalizar gestão da empresa'
      ],
      comportamentos: [
        'Busca soluções no LinkedIn e Google',
        'Prefere indicações de outros empresários',
        'Valoriza cases de sucesso concretos',
        'Quer ROI claro e mensurável'
      ],
      canais: ['LinkedIn', 'Eventos de negócios', 'Indicações', 'Google'],
      objecoes: [
        'Preço alto vs orçamento disponível',
        'Receio de não ter tempo para implementar',
        'Dúvida sobre real necessidade',
        'Experiências ruins com consultores anteriores'
      ],
      abordagem: 'Profissional, baseada em dados, com cases específicos do setor'
    }
  },
  'Design': {
    mercado: {
      tamanho: 'R$ 1.8 bilhões',
      crescimento: '+18% ao ano',
      concorrentes: ['99designs', 'Freelancers', 'Agências locais', 'Canva Pro'],
      oportunidades: [
        'Demanda por identidade visual cresce com empreendedorismo',
        'Design para redes sociais em alta',
        'Mercado de UX/UI aquecido',
        'Especialização em nichos específicos'
      ],
      tendencias: ['Design system', 'Motion graphics', 'Design sustentável']
    },
    icp: {
      nome: 'Ana Empreendedora',
      idade: '28-42 anos',
      cargo: 'Empreendedora/Gerente Marketing',
      renda: 'R$ 8.000 - R$ 35.000/mês',
      localizacao: 'Capitais e regiões metropolitanas',
      dores: [
        'Visual amador prejudica credibilidade',
        'Não sabe como transmitir profissionalismo',
        'Concorrentes têm identidade mais forte',
        'Dificuldade em se destacar visualmente'
      ],
      desejos: [
        'Ter uma marca que transmita confiança',
        'Se destacar da concorrência',
        'Aumentar conversões com design melhor',
        'Profissionalizar comunicação visual'
      ],
      comportamentos: [
        'Busca inspiração no Pinterest e Instagram',
        'Valoriza portfolio visual',
        'Quer ver resultado antes de decidir',
        'Prefere trabalhar com especialistas'
      ],
      canais: ['Instagram', 'Behance', 'Pinterest', 'Indicações'],
      objecoes: [
        'Pode fazer no Canva mesmo',
        'Design é muito caro',
        'Não vê diferença no resultado',
        'Demora muito para entregar'
      ],
      abordagem: 'Visual, com portfolio forte e cases de transformação'
    }
  },
  'Marketing': {
    mercado: {
      tamanho: 'R$ 3.1 bilhões',
      crescimento: '+25% ao ano',
      concorrentes: ['Grandes agências', 'Marketing digital', 'Consultores independentes', 'Ferramentas automatizadas'],
      oportunidades: [
        'Marketing de performance em alta',
        'Demanda por especialistas em ROI',
        'Automação de marketing crescendo',
        'Mercado B2B carente de especialistas'
      ],
      tendencias: ['Marketing conversacional', 'IA no marketing', 'Data-driven marketing']
    },
    icp: {
      nome: 'Pedro Gestor',
      idade: '30-45 anos',
      cargo: 'Gerente/Diretor de Marketing',
      renda: 'R$ 12.000 - R$ 45.000/mês',
      localizacao: 'Grandes centros urbanos',
      dores: [
        'Pressão por resultados mensuráveis',
        'Dificuldade em provar ROI do marketing',
        'Muitas ferramentas, pouco resultado',
        'Equipe sem especialização técnica'
      ],
      desejos: [
        'Aumentar leads qualificados',
        'Melhorar ROI dos investimentos',
        'Automatizar processos repetitivos',
        'Ter dados claros de performance'
      ],
      comportamentos: [
        'Consome conteúdo sobre marketing no LinkedIn',
        'Testa novas ferramentas constantemente',
        'Busca cases de sucesso do setor',
        'Valoriza dados e métricas'
      ],
      canais: ['LinkedIn', 'Google', 'Eventos de marketing', 'Webinars'],
      objecoes: [
        'Já temos equipe interna',
        'Ferramentas são muito caras',
        'Não temos tempo para implementar',
        'ROI não compensa investimento'
      ],
      abordagem: 'Data-driven, com métricas claras e cases comprovados'
    }
  },
  'Advocacia': {
    mercado: {
      tamanho: 'R$ 2.5 bilhões',
      crescimento: '+12% ao ano',
      concorrentes: ['Grandes escritórios', 'Advogados especialistas', 'Lawtech', 'Consultorias jurídicas'],
      oportunidades: [
        'Direito digital em expansão',
        'Demanda por consultoria preventiva',
        'Advocacia online crescendo',
        'Especialização em LGPD e compliance'
      ],
      tendencias: ['Legal tech', 'Advocacia preventiva', 'Direito digital']
    },
    icp: {
      nome: 'Dra. Maria',
      idade: '35-55 anos',
      cargo: 'Advogada/Sócia de escritório',
      renda: 'R$ 15.000 - R$ 60.000/mês',
      localizacao: 'Capitais e cidades de médio porte',
      dores: [
        'Concorrência acirrada por preço',
        'Dificuldade em conquistar clientes de qualidade',
        'Muito tempo gasto com tarefas administrativas',
        'Clientes não valorizam consultoria preventiva'
      ],
      desejos: [
        'Ter carteira de clientes recorrentes',
        'Cobrar honorários mais altos',
        'Ser reconhecida como especialista',
        'Automatizar processos burocráticos'
      ],
      comportamentos: [
        'Participa de eventos jurídicos',
        'Networking é fundamental',
        'Valoriza reputação e credibilidade',
        'Prefere indicações de qualidade'
      ],
      canais: ['OAB', 'Eventos jurídicos', 'LinkedIn', 'Indicações'],
      objecoes: [
        'Marketing não é ético para advogados',
        'Clientes vão por preço mesmo',
        'Não tenho tempo para marketing',
        'Minha área é muito específica'
      ],
      abordagem: 'Conservadora, focada em credibilidade e expertise técnica'
    }
  },
  'Contabilidade': {
    mercado: {
      tamanho: 'R$ 1.9 bilhões',
      crescimento: '+15% ao ano',
      concorrentes: ['Grandes escritórios', 'Fintechs', 'Contadores tradicionais', 'Sistemas automatizados'],
      oportunidades: [
        'Contabilidade consultiva em alta',
        'Automação libera tempo para consultoria',
        'Demanda por consultoria fiscal especializada',
        'PIX e e-commerce geram complexidade'
      ],
      tendencias: ['Contabilidade digital', 'Business intelligence', 'Consultoria fiscal']
    },
    icp: {
      nome: 'João Contador',
      idade: '40-60 anos',
      cargo: 'Contador/Sócio de escritório',
      renda: 'R$ 10.000 - R$ 40.000/mês',
      localizacao: 'Todas as regiões do Brasil',
      dores: [
        'Concorrência por preço é intensa',
        'Clientes veem como commodity',
        'Muito trabalho operacional, pouco consultivo',
        'Dificuldade em mostrar valor agregado'
      ],
      desejos: [
        'Ser visto como consultor, não apenas contador',
        'Cobrar mais pelos serviços',
        'Ter clientes que valorizam consultoria',
        'Automatizar tarefas repetitivas'
      ],
      comportamentos: [
        'Participa de cursos de atualização',
        'Valoriza relacionamento de longo prazo',
        'Prefere indicações de clientes satisfeitos',
        'Busca especialização técnica'
      ],
      canais: ['CRC', 'Indicações', 'Eventos contábeis', 'WhatsApp'],
      objecoes: [
        'Cliente não quer pagar mais',
        'Mercado é muito competitivo',
        'Não tenho tempo para prospectar',
        'Meus clientes são pequenos'
      ],
      abordagem: 'Técnica, baseada em economia e benefícios fiscais'
    }
  }
};

export const generateMockAnalysis = (userData: any): BusinessAnalysis => {
  const businessType = userData.tipoNegocio || 'Consultoria';
  const baseData = businessTypes[businessType] || businessTypes['Consultoria'];

  const digital = generateDigitalAnalysis(userData);
  const scoreGeral = calculateOverallScore(userData, digital);
  const anuncios = generateAdvertisements(userData, businessType);
  const recomendacoes = generateRecommendations(userData, digital);

  return {
    mercado: baseData.mercado,
    digital,
    icp: baseData.icp,
    anuncios,
    scoreGeral,
    recomendacoes
  };
};

const generateDigitalAnalysis = (userData: any) => {
  const hasInstagram = userData.instagram && userData.instagram.length > 0;
  const hasSite = userData.site && userData.site.length > 0;

  return {
    instagram: {
      score: hasInstagram ? Math.floor(Math.random() * 30) + 60 : Math.floor(Math.random() * 40) + 20,
      status: hasInstagram ? (Math.random() > 0.5 ? 'Bom' : 'Regular') : 'Crítico',
      melhorias: hasInstagram 
        ? ['Aumentar frequência de posts', 'Melhorar Stories', 'Usar Reels', 'Otimizar bio']
        : ['Criar perfil profissional', 'Definir identidade visual', 'Planejar conteúdo'],
      oportunidades: hasInstagram
        ? ['Stories interativos', 'Reels educativos', 'Lives semanais']
        : ['Grande potencial inexplorado', 'Concorrentes com presença fraca']
    },
    google: {
      score: hasSite ? Math.floor(Math.random() * 25) + 50 : Math.floor(Math.random() * 30) + 15,
      status: hasSite ? 'Regular' : 'Crítico',
      melhorias: hasSite
        ? ['Otimizar SEO', 'Google Meu Negócio', 'Conseguir reviews', 'Melhorar velocidade']
        : ['Criar Google Meu Negócio', 'Desenvolver site', 'SEO local'],
      oportunidades: ['Baixa concorrência local', 'Potencial para busca orgânica']
    },
    site: {
      score: hasSite ? Math.floor(Math.random() * 35) + 45 : 0,
      status: hasSite ? 'Regular' : 'Inexistente',
      melhorias: hasSite
        ? ['Melhorar velocidade', 'Otimizar mobile', 'CTAs claros', 'UX design']
        : ['Criar site profissional', 'Landing pages', 'Analytics'],
      metricas: hasSite ? {
        velocidade: Math.floor(Math.random() * 40) + 40,
        mobile: Math.floor(Math.random() * 30) + 60,
        seo: Math.floor(Math.random() * 35) + 35
      } : null
    }
  };
};

const calculateOverallScore = (userData: any, digital: any) => {
  let score = 40; // Base score
  
  // Bonus por presença digital
  score += digital.instagram.score * 0.3;
  score += digital.google.score * 0.25;
  score += digital.site.score * 0.2;
  
  // Bonus por faturamento
  const faturamentBonus = {
    'Mais de R$100k': 15,
    'R$30k-100k': 10,
    'R$10k-30k': 5,
    'Até R$10k': 0
  };
  score += faturamentBonus[userData.faturamento] || 0;
  
  // Bonus por investimento
  const investimentoBonus = {
    'Mais de R$2k': 10,
    'R$500-2k': 5,
    'Até R$500': 2,
    'Nada': 0
  };
  score += investimentoBonus[userData.investimento] || 0;
  
  return Math.min(Math.round(score), 95);
};

const generateAdvertisements = (userData: any, businessType: string): Advertisement[] => {
  const baseAds = [
    {
      tipo: 'LinkedIn Sponsored Content',
      titulo: `${businessType}: Aumente Seus Resultados em 90 Dias`,
      copy: `Profissionais de ${businessType.toLowerCase()} que implementam nossa metodologia aumentam 40% o faturamento em 90 dias. Quer ver como?`,
      cta: 'Saber Mais',
      plataforma: 'linkedin',
      segmentacao: `${businessType}, 35-55 anos, empresas 10-100 funcionários`
    },
    {
      tipo: 'Google Ads',
      titulo: `${businessType} Especializado | Resultados Garantidos`,
      copy: `Metodologia comprovada para ${businessType.toLowerCase()}. Mais de 500 casos de sucesso. Diagnóstico gratuito.`,
      palavras: [`${businessType.toLowerCase()}`, `melhor ${businessType.toLowerCase()}`, `${businessType.toLowerCase()} especializado`],
      plataforma: 'google',
      extensoes: ['Diagnóstico Gratuito', 'Resultados Garantidos', 'Metodologia Própria']
    },
    {
      tipo: 'Instagram Stories',
      copy: `Seu ${businessType.toLowerCase()} não está gerando os resultados esperados? 🤔\n\nDescubra como profissionais como você estão aumentando 60% as vendas.\n\nToque para saber mais! 👆`,
      timing: 'Terça a quinta, 19h-21h',
      plataforma: 'instagram',
      elementos: ['Texto animado', 'CTA "Saiba Mais"', 'Enquete interativa']
    },
    {
      tipo: 'WhatsApp Business',
      copy: `Olá! Vi que você trabalha com ${businessType.toLowerCase()}. Tenho ajudado profissionais como você a aumentar 40% o faturamento. Posso te mostrar como em 5 minutos?`,
      plataforma: 'whatsapp'
    },
    {
      tipo: 'E-mail Marketing',
      titulo: `Como ${userData.nome || '[NOME]'} pode aumentar 60% as vendas`,
      copy: `Oi ${userData.nome || '[NOME]'},\n\nVocê já se perguntou por que alguns profissionais de ${businessType.toLowerCase()} conseguem resultados excepcionais?\n\nA diferença está na METODOLOGIA certa...\n\n[Continue lendo]`,
      plataforma: 'email'
    }
  ];

  return baseAds;
};

const generateRecommendations = (userData: any, digital: any): Recommendation[] => {
  const recommendations = [];
  
  if (digital.instagram.score < 50) {
    recommendations.push({
      prioridade: 'Alta',
      acao: 'Criar/otimizar perfil profissional no Instagram',
      impacto: 'Aumentar visibilidade em 200%',
      prazo: '1 semana'
    });
  }
  
  if (digital.site.score === 0) {
    recommendations.push({
      prioridade: 'Alta',
      acao: 'Desenvolver site profissional',
      impacto: 'Aumentar credibilidade e conversões',
      prazo: '2-4 semanas'
    });
  }
  
  if (userData.investimento === 'Nada') {
    recommendations.push({
      prioridade: 'Média',
      acao: 'Investir pelo menos R$ 300/mês em marketing digital',
      impacto: 'Gerar leads qualificados consistentemente',
      prazo: 'Imediato'
    });
  }
  
  if (digital.google.score < 60) {
    recommendations.push({
      prioridade: 'Média',
      acao: 'Criar e otimizar Google Meu Negócio',
      impacto: 'Aparecer em buscas locais',
      prazo: '1 semana'
    });
  }
  
  return recommendations;
};
