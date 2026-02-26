// FILE: src/collections/Operations/Expectations/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Expectation', es: 'Expectativa', pt: 'Expectativa' },
  hostPlural: { en: 'Expectations', es: 'Expectativas', pt: 'Expectativas' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Lap Time Target',
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
      description: { en: 'Expectation basic statement.', es: 'Declaración básica de la expectativa.', pt: 'Declaração básica da expectativa.' },
      fields: {
        statement: { label: { en: 'Statement', es: 'Declaración', pt: 'Declaração' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Expectation criteria and details.', es: 'Criterios y detalles de la expectativa.', pt: 'Critérios e detalhes da expectativa.' },
      fields: {
        specifications: { label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' } },
        protocols: { label: { en: 'Protocols', es: 'Protocolos', pt: 'Protocolos' } },
        criteria: { label: { en: 'Criteria', es: 'Criterios', pt: 'Critérios' } },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Expectation priority and direction.', es: 'Prioridad y dirección de la expectativa.', pt: 'Prioridade e direção da expectativa.' },
      fields: {
        direction: { label: { en: 'Direction', es: 'Dirección', pt: 'Direção' } },
        priority: { label: { en: 'Priority', es: 'Prioridad', pt: 'Prioridade' } },
        flexibility: { label: { en: 'Flexibility', es: 'Flexibilidad', pt: 'Flexibilidade' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Expectation specifications and protocols.', es: 'Especificaciones y protocolos de la expectativa.', pt: 'Especificações e protocolos da expectativa.' },
      fields: {
        notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
      },
    },
  },
} as const
