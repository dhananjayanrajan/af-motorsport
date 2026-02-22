// FILE: src/collections/Operations/Initiatives/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Initiative', es: 'Iniciativa', pt: 'Iniciativa' },
  hostPlural: { en: 'Initiatives', es: 'Iniciativas', pt: 'Iniciativas' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Net Zero 2030',
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
      description: { en: 'Initiative basic details.', es: 'Detalles básicos de la iniciativa.', pt: 'Detalhes básicos da iniciativa.' },
      fields: {
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
        mission: { label: { en: 'Mission', es: 'Misión', pt: 'Missão' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Initiative narrative and strategies.', es: 'Narrativa y estrategias de la iniciativa.', pt: 'Narrativa e estratégias da iniciativa.' },
      fields: {
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
        strategies: { label: { en: 'Strategies', es: 'Estrategias', pt: 'Estratégias' } },
        expectations: { label: { en: 'Expectations', es: 'Expectativas', pt: 'Expectativas' } },
        insights: { label: { en: 'Insights', es: 'Perspectivas', pt: 'Perspectivas' } },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Initiative status.', es: 'Estado de la iniciativa.', pt: 'Status da iniciativa.' },
      fields: {
        status: { label: { en: 'Status', es: 'Estado', pt: 'Status' } },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Initiative assets.', es: 'Activos de la iniciativa.', pt: 'Ativos da iniciativa.' },
      fields: {
        primary: { label: { en: 'Primary Media', es: 'Medios primarios', pt: 'Mídia primária' } },
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
        document: { label: { en: 'Document', es: 'Documento', pt: 'Documento' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Initiative associations and references.', es: 'Asociaciones y referencias de la iniciativa.', pt: 'Associações e referências da iniciativa.' },
      fields: {
        classifications: { label: { en: 'Classifications', es: 'Clasificaciones', pt: 'Classificações' } },
        entities: { label: { en: 'Entities', es: 'Entidades', pt: 'Entidades' } },
        schedules: { label: { en: 'Schedules', es: 'Horarios', pt: 'Cronogramas' } },
        references: { label: { en: 'References', es: 'Referencias', pt: 'Referências' } },
        histories: { label: { en: 'Histories', es: 'Historias', pt: 'Históricos' } },
      },
    },
  },
} as const
