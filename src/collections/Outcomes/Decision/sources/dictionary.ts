// FILE: src/collections/Outcomes/Decisions/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Decision', es: 'Decisión', pt: 'Decisão' },
  hostPlural: { en: 'Decisions', es: 'Decisiones', pt: 'Decisões' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Pit Strategy Change',
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
      description: { en: 'Decision basic details.', es: 'Detalles básicos de la decisión.', pt: 'Detalhes básicos da decisão.' },
      fields: {
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Decision narrative and features.', es: 'Narrativa y características de la decisión.', pt: 'Narrativa e características da decisão.' },
      fields: {
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Content.', es: 'Contenido.', pt: 'Conteúdo.' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          fields: {
            narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
            notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
          }
        }
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Decision traits and expectations.', es: 'Rasgos y expectativas de la decisión.', pt: 'Traços e expectativas da decisão.' },
      fields: {
        features: { label: { en: 'Features', es: 'Características', pt: 'Características' } },
        specifications: { label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' } },
      },
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      description: { en: 'Decision metrics and statistics.', es: 'Métricas y estadísticas de la decisión.', pt: 'Métricas e estatísticas da decisão.' },
      fields: {
        outcomes: {
          name: 'outcomes',
          label: { en: 'Outcomes', es: 'Resultados', pt: 'Resultados' },
          description: { en: 'Outcomes.', es: 'Resultados.', pt: 'Resultados.' },
          entity: { en: 'Outcome', es: 'Resultado', pt: 'Resultado' },
          fields: {
            expectations: { label: { en: 'Expectations', es: 'Expectativas', pt: 'Expectativas' } },
            impacts: { label: { en: 'Impacts', es: 'Impactos', pt: 'Impactos' } },
          }
        }
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Decision contexts and impacts.', es: 'Contextos e impactos de la decisión.', pt: 'Contextos e impactos da decisão.' },
      fields: {
        entities: { label: { en: 'Entities', es: 'Entidades', pt: 'Entidades' } },
        connections: {
          name: 'connections',
          label: { en: 'Connections', es: 'Conexiones', pt: 'Conexões' },
          description: { en: 'Decision connections.', es: 'Conexiones de la decisión.', pt: 'Conexões da decisão.' },
          entity: { en: 'Connections', es: 'Conexiones', pt: 'Conexões' },
          fields: {
            drivers: { label: { en: 'Drivers', es: 'Drivers', pt: 'Drivers' } },
            members: { label: { en: 'Members', es: 'Miembros', pt: 'Membros' } },
            leaders: { label: { en: 'Leaders', es: 'Líderes', pt: 'Líderes' } },
            organizations: { label: { en: 'Organizations', es: 'Organizaciones', pt: 'Organizações' } },
            individuals: { label: { en: 'Individuals', es: 'Individuos', pt: 'Indivíduos' } }
          }
        },
        operations: {
          name: 'operations',
          label: { en: 'Operations', es: 'Operaciones', pt: 'Operações' },
          description: { en: 'Decision operations.', es: 'Operaciones de la decisión.', pt: 'Operações da decisão.' },
          entity: { en: 'Operations', es: 'Operaciones', pt: 'Operações' },
          fields: {
            protocols: { label: { en: 'Protocols', es: 'Protocolos', pt: 'Protocolos' } },
            preferences: { label: { en: 'Preferences', es: 'Preferencias', pt: 'Preferências' } },
          }
        }
      },
    },
  },
} as const
