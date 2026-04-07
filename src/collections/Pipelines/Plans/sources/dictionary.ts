export const dictionary = {
  host: { en: 'Plan', es: 'Plan', pt: 'Plano' },
  hostPlural: { en: 'Plans', es: 'Planes', pt: 'Planos' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. 2024 Season Plan', es: 'e.g. Plan Temporada 2024', pt: 'e.g. Plano Temporada 2024' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. SEASON_24', es: 'e.g. TEMP_24', pt: 'e.g. TEMP_24' },
    },
  },
  tabs: {
    basics: {
      tagline: {
        label: { en: 'Tagline', es: 'Lema', pt: 'Lema' },
        placeholder: { en: 'e.g. Road to Glory', es: 'e.g. Camino a la Gloria', pt: 'e.g. Caminho para a Glória' },
      },
      description: {
        label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
        placeholder: { en: 'Enter description', es: 'Ingrese descripción', pt: 'Insira a descrição' },
      },
    },
    details: {
      vision: { label: { en: 'Vision', es: 'Visión', pt: 'Visão' } },
      mission: { label: { en: 'Mission', es: 'Misión', pt: 'Missão' } },
      scope: { label: { en: 'Scope', es: 'Alcance', pt: 'Escopo' } },
      status: { label: { en: 'Status', es: 'Estado', pt: 'Status' } },
      priority: { label: { en: 'Priority', es: 'Prioridad', pt: 'Prioridade' } },
      start_date: { label: { en: 'Start Date', es: 'Fecha de Inicio', pt: 'Data de Início' } },
      end_date: { label: { en: 'End Date', es: 'Fecha de Fin', pt: 'Data de Término' } },
      budget: { label: { en: 'Budget', es: 'Presupuesto', pt: 'Orçamento' } },
      currency: { label: { en: 'Currency', es: 'Moneda', pt: 'Moeda' } },
      assigned_to: { label: { en: 'Assigned To', es: 'Asignado A', pt: 'Atribuído A' } },
      dependencies: { label: { en: 'Dependencies', es: 'Dependencias', pt: 'Dependências' } },
      notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
    },
    traits: {
      // Labels handled in groupFactory directly for arrays
    },
    assets: {
      thumbnail: { label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' } },
      cover: { label: { en: 'Cover', es: 'Portada', pt: 'Capa' } },
      documents: { label: { en: 'Documents', es: 'Documentos', pt: 'Documentos' } },
    },
  },
} as const
