// FILE: src/collections/Outcomes/Impacts/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Impact', es: 'Impacto', pt: 'Impacto' },
  hostPlural: { en: 'Impacts', es: 'Impactos', pt: 'Impactos' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Aerodynamic Rule Change Impact',
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
      description: { en: 'Impact basic details.', es: 'Detalles básicos del impacto.', pt: 'Detalhes básicos do impacto.' },
      fields: {
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
        scope: {
          name: 'scope',
          label: { en: 'Scope', es: 'Alcance', pt: 'Escopo' },
          entity: { en: 'Scope', es: 'Alcance', pt: 'Escopo' },
          description: { en: 'Impact scope and significance.', es: 'Alcance y significancia del impacto.', pt: 'Escopo e significância do impacto.' },
          fields: {
            significance: { label: { en: 'Significance', es: 'Significancia', pt: 'Significância' } },
            scale: { label: { en: 'Scale', es: 'Escala', pt: 'Escala' } },
            depth: { label: { en: 'Depth', es: 'Profundidad', pt: 'Profundidade' } },
          },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Impact characteristics and severity.', es: 'Características y gravedad del impacto.', pt: 'Características e gravidade do impacto.' },
      fields: {
        tone: { label: { en: 'Tone', es: 'Tono', pt: 'Tom' } },
        velocity: { label: { en: 'Velocity', es: 'Velocidad', pt: 'Velocidade' } },
        gravity: { label: { en: 'Gravity', es: 'Gravedad', pt: 'Gravidade' } },
        permanence: { label: { en: 'Permanence', es: 'Permanencia', pt: 'Permanência' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Impact contexts and associations.', es: 'Contextos y asociaciones del impacto.', pt: 'Contextos e associações do impacto.' },
      fields: {
        entities: { label: { en: 'Entities', es: 'Entidades', pt: 'Entidades' } },
        notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
      },
    },
  },
} as const
