// FILE: src/collections/Outcomes/Strategies/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Strategy', es: 'Estrategia', pt: 'Estratégia' },
  hostPlural: { en: 'Strategies', es: 'Estrategias', pt: 'Estratégias' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. 2024 Aero Development Strategy',
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
      description: { en: 'Strategy basic details.', es: 'Detalles básicos de la estrategia.', pt: 'Detalhes básicos da estratégia.' },
      fields: {
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Strategy methodology and impacts.', es: 'Metodología e impactos de la estrategia.', pt: 'Metodologia e impactos da estratégia.' },
      fields: {
        methodology: { label: { en: 'Methodology', es: 'Metodología', pt: 'Metodologia' } },
        outcomes: {
          name: 'outcomes',
          label: { en: 'Outcomes', es: 'Resultados', pt: 'Resultados' },
          entity: { en: 'Outcome', es: 'Resultado', pt: 'Resultado' },
          description: { en: 'Strategy outcomes.', es: 'Resultados de la estrategia.', pt: 'Resultados da estratégia.' },
          fields: {
            decisions: { label: { en: 'Decisions', es: 'Decisiones', pt: 'Decisões' } },
            impacts: { label: { en: 'Impacts', es: 'Impactos', pt: 'Impactos' } },
          },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Strategy directives and contingencies.', es: 'Directivas y contingencias de la estrategia.', pt: 'Diretivas e contingências da estratégia.' },
      fields: {
        directives: {
          name: 'directives',
          label: { en: 'Directives', es: 'Directivas', pt: 'Diretivas' },
          entity: { en: 'Directive', es: 'Directiva', pt: 'Diretiva' },
          description: { en: 'Strategy directives.', es: 'Directivas de la estrategia.', pt: 'Diretivas da estratégia.' },
          fields: {
            phase: { label: { en: 'Phase', es: 'Fase', pt: 'Fase' } },
            action: { label: { en: 'Action', es: 'Acción', pt: 'Ação' } },
            owner: { label: { en: 'Owner', es: 'Dueño', pt: 'Dono' } },
            deadline: { label: { en: 'Deadline', es: 'Plazo', pt: 'Prazo' } },
          },
        },
        contingencies: {
          name: 'contingencies',
          label: { en: 'Contingencies', es: 'Contingencias', pt: 'Contingências' },
          entity: { en: 'Contingency', es: 'Contingencia', pt: 'Contingência' },
          description: { en: 'Strategy contingencies.', es: 'Contingencias de la estrategia.', pt: 'Contingências da estratégia.' },
          fields: {
            trigger: { label: { en: 'Trigger', es: 'Disparador', pt: 'Gatilho' } },
            response: { label: { en: 'Response', es: 'Respuesta', pt: 'Resposta' } },
            probability: { label: { en: 'Probability', es: 'Probabilidad', pt: 'Probabilidade' } },
            impact: { label: { en: 'Impact', es: 'Impacto', pt: 'Impacto' } },
          },
        },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Strategy narrative and entities.', es: 'Narrativa y entidades de la estrategia.', pt: 'Narrativa e entidades da estratégia.' },
      fields: {
        entities: { label: { en: 'Entities', es: 'Entidades', pt: 'Entidades' } },
        associations: {
          name: 'associations',
          label: { en: 'Associations', es: 'Asociaciones', pt: 'Associações' },
          entity: { en: 'Association', es: 'Asociación', pt: 'Associação' },
          description: { en: 'Strategy associations.', es: 'Asociaciones de la estrategia.', pt: 'Associações da estratégia.' },
          fields: {
            leaders: { label: { en: 'Leaders', es: 'Líderes', pt: 'Líderes' } },
            organizations: { label: { en: 'Organizations', es: 'Organizaciones', pt: 'Organizações' } },
            individuals: { label: { en: 'Individuals', es: 'Individuos', pt: 'Indivíduos' } },
          },
        },
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Strategy content.', es: 'Contenido de la estrategia.', pt: 'Conteúdo da estratégia.' },
          fields: {
            narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
          },
        },
      },
    },
  },
} as const
