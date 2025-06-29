import React, { useEffect, useMemo } from 'react';

const CalendlyWidget: React.FC = () => {
  // Recupera nome e email do localStorage
  const name = localStorage.getItem('claroai_nome') || '';
  const email = localStorage.getItem('claroai_email') || '';

  // Monta a URL do Calendly com prefill
  const calendlyUrl = useMemo(() => {
    const base = 'https://calendly.com/agencialobuzlancamentos/30min';
    const params = new URLSearchParams({
      background_color: '1a1b3a',
      text_color: 'ffffff',
      primary_color: '8b5cf6',
    });
    if (name) params.append('name', name);
    if (email) params.append('email', email);
    return `${base}?${params.toString()}`;
  }, [name, email]);

  useEffect(() => {
    const scriptId = 'calendly-widget-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url={calendlyUrl}
      style={{ minWidth: 320, height: 700 }}
    />
  );
};

export default CalendlyWidget; 