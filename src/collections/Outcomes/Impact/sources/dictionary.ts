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
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Impact details.', es: 'Detalles del impacto.', pt: 'Detalhes do impacto.' },
      fields: {
        scope: {
          name: 'scope',
          label: { en: 'Scope', es: 'Alcance', pt: 'Escopo' },
          entity: { en: 'Scope', es: 'Alcance', pt: 'Escopo' },
          description: { en: 'Impact scope and significance.', es: 'Alcance y significancia del impacto.', pt: 'Escopo e significância do impacto.' },
          fields: {
            significance: { label: { en: 'Significance', es: 'Significancia', pt: 'Significância' } },
            scale: { label: { en: 'Scale', es: 'Escala', pt: 'Escala' } },
            depth: { label: { en: 'Depth', es: 'Profundidad', pt: 'Profundidade' } },
            rarity: { label: { en: 'Rarity', es: 'Rareza', pt: 'Raridade' } },
          },
        },
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Impact content.', es: 'Contenido del impacto.', pt: 'Conteúdo do impacto.' },
          fields: {
            notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
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
        connections: {
          name: 'connections',
          label: { en: 'Connections', es: 'Conexiones', pt: 'Conexões' },
          entity: { en: 'Connection', es: 'Conexión', pt: 'Conexão' },
          description: { en: 'Connections of the experience.', es: 'Conexiones de la experiencia.', pt: 'Conexões da experiência.' },
          fields: {
            drivers: { label: { en: 'Drivers', es: 'Conductores', pt: 'Condutor' } },
            members: { label: { en: 'Members', es: 'Miembros', pt: 'Membros' } },
            leaders: { label: { en: 'Leaders', es: 'Líderes', pt: 'Líderes' } },
          },
        },
        associations: {
          name: 'associations',
          label: { en: 'Associations', es: 'Asociaciones', pt: 'Associações' },
          entity: { en: 'Association', es: 'Asociación', pt: 'Associação' },
          description: { en: 'Associations of the experience.', es: 'Asociaciones de la experiencia.', pt: 'Associações da experiência.' },
          fields: {
            organizations: { label: { en: 'Organizations', es: 'Organizaciones', pt: 'Organizações' } },
            individuals: { label: { en: 'Individuals', es: 'Individuos', pt: 'Individuos' } },
          },
        },
        references: {
          name: 'references',
          label: { en: 'References', es: 'Referencias', pt: 'Referências' },
          entity: { en: 'Reference', es: 'Referencia', pt: 'Referência' },
          description: { en: 'References of the experience.', es: 'Referencias de la experiencia.', pt: 'Referências da experiência.' },
          fields: {
            cars: { label: { en: 'Cars', es: 'Autos', pt: 'Carros' } },
            kits: { label: { en: 'Kits', es: 'Kit', pt: 'Kit' } },
          }
        }
      },
    },
  },
} as const
