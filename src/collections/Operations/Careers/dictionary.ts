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
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
        organization: { label: { en: 'Organization', es: 'Organización', pt: 'Organização' } },
        expectations: { label: { en: 'Expectations', es: 'Expectativas', pt: 'Expectativas' } },
        awards: { label: { en: 'Awards', es: 'Premios', pt: 'Prêmios' } },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Career positions and contract.', es: 'Posiciones y contrato de la carrera.', pt: 'Posições e contrato da carreira.' },
      fields: {
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
        contract: { label: { en: 'Contract', es: 'Contrato', pt: 'Contrato' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Career associations and stories.', es: 'Asociaciones e historias de la carrera.', pt: 'Associações e histórias da carreira.' },
      fields: {
        entities: { label: { en: 'Entities', es: 'Entidades', pt: 'Entidades' } },
        highlights: { label: { en: 'Highlights', es: 'Destacados', pt: 'Destaques' } },
        stories: { label: { en: 'Stories', es: 'Historias', pt: 'Histórias' } },
      },
    },
  },
} as const
