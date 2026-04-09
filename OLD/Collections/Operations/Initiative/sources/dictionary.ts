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
        status: { label: { en: 'Status', es: 'Estado', pt: 'Status' } },
        classifications: { label: { en: 'Classifications', es: 'Clasificaciones', pt: 'Classificações' } },
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Initiative status.', es: 'Estado de la iniciativa.', pt: 'Status da iniciativa.' },
      fields: {
        outcomes: {
          name: 'outcomes',
          label: { en: 'Outcomes', es: 'Resultados', pt: 'Resultados' },
          entity: { en: 'Outcome', es: 'Resultado', pt: 'Resultado' },
          description: { en: 'Outcome information', es: 'Información de resultados', pt: 'Informações de resultados' },
          fields: {
            schedules: { label: { en: 'Schedules', es: 'Horarios', pt: 'Cronogramas' } },
            strategies: { label: { en: 'Strategies', es: 'Estrategias', pt: 'Estratégias' } },
            expectations: { label: { en: 'Expectations', es: 'Expectativas', pt: 'Expectativas' } },
          },
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Initiative assets.', es: 'Activos de la iniciativa.', pt: 'Ativos da iniciativa.' },
      fields: {
        primary: { label: { en: 'Primary Media', es: 'Medios primarios', pt: 'Mídia primária' } },
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
        documents: { label: { en: 'Documents', es: 'Documentos', pt: 'Documentos' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Initiative associations and references.', es: 'Asociaciones y referencias de la iniciativa.', pt: 'Associações e referências da iniciativa.' },
      fields: {
        connections: {
          name: 'connections',
          label: { en: 'Connections', es: 'Conexiones', pt: 'Conexões' },
          entity: { en: 'Connection', es: 'Conexión', pt: 'Conexão' },
          description: { en: 'Connection information', es: 'Información de conexiones', pt: 'Informações de conexões' },
          fields: {
            organizations: { label: { en: 'Organizations', es: 'Organizaciones', pt: 'Organizações' } },
            leaders: { label: { en: 'Leaders', es: 'Líderes', pt: 'Líderes' } },
            individuals: { label: { en: 'Individuals', es: 'Individuos', pt: 'Indivíduos' } },
          },
        },
        references: {
          name: 'references',
          label: { en: 'References', es: 'Referencias', pt: 'Referências' },
          entity: { en: 'Reference', es: 'Referencia', pt: 'Referência' },
          description: { en: 'Reference information', es: 'Información de referencias', pt: 'Informações de referências' },
          fields: {
            incidents: { label: { en: 'Incidents', es: 'Incidentes', pt: 'Incidentes' } },
            celebrations: { label: { en: 'Celebrations', es: 'Celebraciones', pt: 'Celebrações' } },
          },
        },
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Content.', es: 'Contenido.', pt: 'Conteúdo.' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          fields: {
            histories: { label: { en: 'Histories', es: 'Historias', pt: 'Históricos' } },
            insights: { label: { en: 'Insights', es: 'Perspectivas', pt: 'Perspectivas' } },
          }
        }
      },
    },
  },
} as const
