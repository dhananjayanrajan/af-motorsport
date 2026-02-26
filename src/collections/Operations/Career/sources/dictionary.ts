// FILE: src/collections/Operations/Careers/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Career', es: 'Carrera profesional', pt: 'Carreira' },
  hostPlural: { en: 'Careers', es: 'Carreras profesionales', pt: 'Carreiras' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Max Verstappen Career',
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
      description: { en: 'Career basic details.', es: 'Detalles básicos de la carrera.', pt: 'Detalhes básicos da carreira.' },
      fields: {
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Career narrative and organization.', es: 'Narrativa y organización de la carrera.', pt: 'Narrativa e organização da carreira.' },
      fields: {
        contract: { label: { en: 'Contract', es: 'Contrato', pt: 'Contrato' } },
        positions: {
          name: 'positions',
          label: { en: 'Positions', es: 'Posiciones', pt: 'Posições' },
          entity: { en: 'Position', es: 'Posición', pt: 'Posição' },
          description: { en: 'Historical positions held.', es: 'Posiciones históricas ocupadas.', pt: 'Posições históricas ocupadas.' },
          fields: {
            title: { label: { en: 'Title', es: 'Título', pt: 'Título' } },
            start: { label: { en: 'Start Date', es: 'Fecha de inicio', pt: 'Data de início' } },
            end: { label: { en: 'End Date', es: 'Fecha de fin', pt: 'Data de término' } },
          },
        },
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Career positions and contract.', es: 'Posiciones y contrato de la carrera.', pt: 'Posições e contrato da carreira.' },
      fields: {
        outcomes: {
          name: 'outcomes',
          label: { en: 'Outcomes', es: 'Resultados', pt: 'Resultados' },
          entity: { en: 'Outcome', es: 'Resultado', pt: 'Resultado' },
          description: { en: 'Outcome information', es: 'Información de resultados', pt: 'Informações de resultados' },
          fields: {
            expectations: { label: { en: 'Expectations', es: 'Expectativas', pt: 'Expectativas' } },
            awards: { label: { en: 'Awards', es: 'Premios', pt: 'Prêmios' } },
          }
        },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Career associations and stories.', es: 'Asociaciones e historias de la carrera.', pt: 'Associações e histórias da carreira.' },
      fields: {
        connections: {
          name: 'connections',
          label: { en: 'Connections', es: 'Conexiones', pt: 'Conexões' },
          entity: { en: 'Connection', es: 'Conexión', pt: 'Conexão' },
          description: { en: 'Connection information', es: 'Información de conexión', pt: 'Informações de conexão' },
          fields: {
            drivers: { label: { en: 'Drivers', es: 'Pilotos', pt: 'Pilotos' } },
            members: { label: { en: 'Members', es: 'Miembros', pt: 'Membros' } },
            leaders: { label: { en: 'Leaders', es: 'Líderes', pt: 'Líderes' } },
            individuals: { label: { en: 'Individuals', es: 'Individuos', pt: 'Indivíduos' } },
          }
        },
        associations: {
          name: 'associations',
          label: { en: 'Associations', es: 'Asociaciones', pt: 'Associações' },
          entity: { en: 'Association', es: 'Asociación', pt: 'Associação' },
          description: { en: 'Association information', es: 'Información de asociación', pt: 'Informações de associação' },
          fields: {
            organizations: { label: { en: 'Organizations', es: 'Organizaciones', pt: 'Organizações' } },
            cars: { label: { en: 'Cars', es: 'Coches', pt: 'Carros' } },
          }
        },
        highlights: { label: { en: 'Highlights', es: 'Destacados', pt: 'Destaques' } },
        stories: { label: { en: 'Stories', es: 'Historias', pt: 'Histórias' } },
      },
    },
  },
} as const
