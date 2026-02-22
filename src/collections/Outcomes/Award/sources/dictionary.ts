// FILE: src/collections/Outcomes/Awards/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Award', es: 'Premio', pt: 'Prêmio' },
  hostPlural: { en: 'Awards', es: 'Premios', pt: 'Prêmios' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. World Drivers Championship',
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
    },
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      description: { en: 'Award basic details.', es: 'Detalles básicos del premio.', pt: 'Detalhes básicos do prêmio.' },
      fields: {
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Award narrative and details.', es: 'Narrativa y detalles del premio.', pt: 'Narrativa e detalhes do prêmio.' },
      fields: {
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Award media assets.', es: 'Activos multimedia del premio.', pt: 'Ativos de mídia do prêmio.' },
      fields: {
        thumbnail: { label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' } },
        visualization: { label: { en: 'Visualization', es: 'Visualización', pt: 'Visualização' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Award relationships and stories.', es: 'Relaciones e historias del premio.', pt: 'Relações e histórias do prêmio.' },
      fields: {
        entities: { label: { en: 'Entities', es: 'Entidades', pt: 'Entidades' } },
        story: { label: { en: 'Story', es: 'Historia', pt: 'História' } },
      },
    },
  },
} as const
