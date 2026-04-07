export const dictionary = {
  host: { en: 'Roadmap', es: 'Hoja de Ruta', pt: 'Roteiro' },
  hostPlural: { en: 'Roadmaps', es: 'Hojas de Ruta', pt: 'Roteiros' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. 2025 Technical Roadmap', es: 'e.g. Hoja de Ruta Técnica 2025', pt: 'e.g. Roteiro Técnico 2025' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. TECH_RM_25', es: 'e.g. HR_TEC_25', pt: 'e.g. RT_TEC_25' },
    },
  },
  tabs: {
    basics: {
      tagline: {
        label: { en: 'Tagline', es: 'Lema', pt: 'Lema' },
        placeholder: { en: 'e.g. The Path Forward', es: 'e.g. El Camino a Seguir', pt: 'e.g. O Caminho a Seguir' },
      },
      description: {
        label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
        placeholder: { en: 'Enter description', es: 'Ingrese descripción', pt: 'Insira a descrição' },
      },
    },
    details: {
      vision: { label: { en: 'Vision', es: 'Visión', pt: 'Visão' } },
      strategy: { label: { en: 'Strategy', es: 'Estrategia', pt: 'Estratégia' } },
      scope: { label: { en: 'Scope', es: 'Alcance', pt: 'Escopo' } },
      status: { label: { en: 'Status', es: 'Estado', pt: 'Status' } },
      start_date: { label: { en: 'Start Date', es: 'Fecha de Inicio', pt: 'Data de Início' } },
      end_date: { label: { en: 'End Date', es: 'Fecha de Fin', pt: 'Data de Término' } },
      dependencies: { label: { en: 'Dependencies', es: 'Dependencias', pt: 'Dependências' } },
      stakeholders: { label: { en: 'Stakeholders', es: 'Interesados', pt: 'Partes Interessadas' } },
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
