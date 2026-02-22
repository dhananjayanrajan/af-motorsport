// FILE: src/collections/Operations/Celebrations/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Celebration', es: 'Celebración', pt: 'Celebração' },
  hostPlural: { en: 'Celebrations', es: 'Celebraciones', pt: 'Celebrações' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. 2024 Season Launch',
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
      description: { en: 'Celebration basic details.', es: 'Detalles básicos de la celebración.', pt: 'Detalhes básicos da celebração.' },
      fields: {
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Celebration narrative and stories.', es: 'Narrativa e historias de la celebración.', pt: 'Narrativa e histórias da celebração.' },
      fields: {
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
        expectations: { label: { en: 'Expectations', es: 'Expectativas', pt: 'Expectativas' } },
        stories: { label: { en: 'Stories', es: 'Historias', pt: 'Histórias' } },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Celebration prestige and exclusivity.', es: 'Prestigio y exclusividad de la celebración.', pt: 'Prestígio e exclusividade da celebração.' },
      fields: {
        prestige: { label: { en: 'Prestige', es: 'Prestigio', pt: 'Prestígio' } },
        exclusivity: { label: { en: 'Exclusivity', es: 'Exclusividad', pt: 'Exclusividade' } },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Celebration media assets.', es: 'Activos multimedia de la celebración.', pt: 'Ativos de mídia da celebração.' },
      fields: {
        primary: { label: { en: 'Primary Media', es: 'Medios primarios', pt: 'Mídia primária' } },
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
        playlist: { label: { en: 'Playlist', es: 'Playlist', pt: 'Playlist' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Celebration beneficiaries and notes.', es: 'Beneficiarios y notas de la celebración.', pt: 'Beneficiários e notas da celebração.' },
      fields: {
        beneficiaries: { label: { en: 'Beneficiaries', es: 'Beneficiarios', pt: 'Beneficiários' } },
        notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
      },
    },
  },
} as const
