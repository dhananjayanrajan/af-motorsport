// FILE: src/collections/Outcomes/Highlights/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Highlight', es: 'Destacado', pt: 'Destaque' },
  hostPlural: { en: 'Highlights', es: 'Destacados', pt: 'Destaques' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Monaco Lap Record',
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
      description: { en: 'Highlight basic details.', es: 'Detalles básicos del destacado.', pt: 'Detalhes básicos do destaque.' },
      fields: {
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Highlight narrative and details.', es: 'Narrativa y detalles del destacado.', pt: 'Narrativa e detalhes do destaque.' },
      fields: {
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Highlight traits and specifications.', es: 'Rasgos y especificaciones del destacado.', pt: 'Traços e especificações do destaque.' },
      fields: {
        specifications: { label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' } },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Highlight media assets.', es: 'Activos multimedia del destacado.', pt: 'Ativos de mídia do destaque.' },
      fields: {
        thumbnail: { label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' } },
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
        playlist: { label: { en: 'Playlist', es: 'Playlist', pt: 'Playlist' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Highlight contexts and stories.', es: 'Contextos e historias del destacado.', pt: 'Contextos e histórias do destaque.' },
      fields: {
        entities: { label: { en: 'Entities', es: 'Entidades', pt: 'Entidades' } },
        stories: { label: { en: 'Stories', es: 'Historias', pt: 'Histórias' } },
      },
    },
  },
} as const
