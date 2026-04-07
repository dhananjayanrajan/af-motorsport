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
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Content.', es: 'Contenido.', pt: 'Conteúdo.' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          fields: {
            narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
            stories: { label: { en: 'Stories', es: 'Historias', pt: 'Histórias' } },
          }
        }
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
        associations: {
          name: 'associations',
          label: { en: 'Associations', es: 'Asociaciones', pt: 'Associações' },
          description: { en: 'Associations.', es: 'Asociaciones.', pt: 'Associações.' },
          entity: { en: 'Association', es: 'Asociación', pt: 'Associação' },
          fields: {
            leaders: { label: { en: 'Leaders', es: 'Líderes', pt: 'Líderes' } },
            organizations: { label: { en: 'Organizations', es: 'Organizaciones', pt: 'Organizações' } },
            individuals: { label: { en: 'Individuals', es: 'Individuos', pt: 'Indivíduos' } },
          }
        }
      },
    },
  },
} as const
