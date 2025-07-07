-- Script SQL para criar a tabela chat_leads no Supabase
-- Versão 2.0 - Suporte a Análise JSON Completa

-- Habilitar a extensão uuid-ossp se não estiver habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar a tabela chat_leads com estrutura robusta
CREATE TABLE public.chat_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    session_id TEXT NOT NULL,
    chat_history JSONB DEFAULT '[]'::jsonb,
    lead_data JSONB DEFAULT '{}'::jsonb,
    status TEXT NOT NULL DEFAULT 'collecting' CHECK (status IN ('collecting', 'generating_insight', 'analysis_ready', 'completed')),
    generated_insight TEXT,
    generated_analysis JSONB DEFAULT '{}'::jsonb
);

-- Adicionar comentários para explicar o propósito das colunas
COMMENT ON TABLE public.chat_leads IS 'Armazena cada lead e o estado de sua conversa no funil interativo.';
COMMENT ON COLUMN public.chat_leads.session_id IS 'Fingerprint do navegador, usado para agrupar as mensagens da mesma sessão.';
COMMENT ON COLUMN public.chat_leads.status IS 'O estado atual do lead no funil de captura e insight.';
COMMENT ON COLUMN public.chat_leads.generated_analysis IS 'Análise JSON completa gerada pela IA com painel de controle, SWOT e recomendações.';

-- Criar índices para otimizar as consultas mais comuns
CREATE INDEX idx_chat_leads_session_id ON public.chat_leads(session_id);
CREATE INDEX idx_chat_leads_status ON public.chat_leads(status);
CREATE INDEX idx_chat_leads_analysis ON public.chat_leads USING GIN (generated_analysis);

-- Criar função para atualizar o timestamp 'updated_at' automaticamente em cada modificação
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar o trigger que chama a função acima antes de cada UPDATE na tabela
CREATE TRIGGER update_chat_leads_updated_at 
    BEFORE UPDATE ON public.chat_leads 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- HABILITAR A ROW LEVEL SECURITY (RLS) - PASSO DE SEGURANÇA CRÍTICO
-- Ao habilitar a RLS e NÃO criar nenhuma política, nós bloqueamos por padrão todo o acesso
-- que não venha do nosso backend usando a chave de serviço (service_role_key).
-- Esta é a configuração mais segura para esta tabela.
ALTER TABLE public.chat_leads ENABLE ROW LEVEL SECURITY;

-- NENHUMA POLÍTICA (POLICY) SERÁ CRIADA AQUI. ISSO É INTENCIONAL.