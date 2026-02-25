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
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Decision traits and expectations.', es: 'Rasgos y expectativas de la decisión.', pt: 'Traços e expectativas da decisão.' },
      fields: {
        features: { label: { en: 'Features', es: 'Características', pt: 'Características' } },
        specifications: { label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' } },
        expectations: { label: { en: 'Expectations', es: 'Expectativas', pt: 'Expectativas' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Decision contexts and impacts.', es: 'Contextos e impactos de la decisión.', pt: 'Contextos e impactos da decisão.' },
      fields: {
        entities: { label: { en: 'Entities', es: 'Entidades', pt: 'Entidades' } },
        operations: {
          name: 'operations',
          label: { en: 'Operations', es: 'Operaciones', pt: 'Operações' },
          description: { en: 'Decision operations.', es: 'Operaciones de la decisión.', pt: 'Operações da decisão.' },
          entity: { en: 'Operations', es: 'Operaciones', pt: 'Operações' },
          fields: {
            protocols: { label: { en: 'Protocols', es: 'Protocolos', pt: 'Protocolos' } },
            preferences: { label: { en: 'Preferences', es: 'Preferencias', pt: 'Preferências' } },
          }
        },
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Decision notes and impacts.', es: 'Notas e impactos de la decisión.', pt: 'Notas e impactos da decisão.' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          fields: {
            notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
            impacts: { label: { en: 'Impacts', es: 'Impactos', pt: 'Impactos' } },
          }
        }
      },
    },
  },
} as const
