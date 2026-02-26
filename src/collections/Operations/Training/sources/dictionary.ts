// FILE: src/collections/Operations/Trainings/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Training', es: 'Entrenamiento', pt: 'Treinamento' },
  hostPlural: { en: 'Trainings', es: 'Entrenamientos', pt: 'Treinamentos' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Simulator Session A',
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
      description: { en: 'Training basic details.', es: 'Detalles básicos del entrenamiento.', pt: 'Detalhes básicos do treinamento.' },
      fields: {
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Training narrative.', es: 'Narrativa del entrenamiento.', pt: 'Narrativa do treinamento.' },
      fields: {
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Training intensity and format.', es: 'Intensidad y formato del entrenamiento.', pt: 'Intensidade e formato do treinamento.' },
      fields: {
        intensity: { label: { en: 'Intensity', es: 'Intensidad', pt: 'Intensidade' } },
        format: { label: { en: 'Format', es: 'Formato', pt: 'Formato' } },
        specifications: { label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' } },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Training media assets.', es: 'Activos multimedia del entrenamiento.', pt: 'Ativos de mídia do treinamento.' },
      fields: {
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
        playlist: { label: { en: 'Playlist', es: 'Playlist', pt: 'Playlist' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Training strategies and skills.', es: 'Estrategias y habilidades del entrenamiento.', pt: 'Estratégias e habilidades do treinamento.' },
      fields: {
        connections: {
          name: 'connections',
          label: { en: 'Connections', es: 'Conexiones', pt: 'Conexões' },
          entity: { en: 'Connection', es: 'Conexión', pt: 'Conexão' },
          description: { en: 'Connection information', es: 'Información de conexiones', pt: 'Informações de conexões' },
          fields: {
            drivers: { label: { en: 'Drivers', es: 'Pilotos', pt: 'Pilotos' } },
            members: { label: { en: 'Members', es: 'Miembros', pt: 'Membros' } },
            leaders: { label: { en: 'Leaders', es: 'Líderes', pt: 'Líderes' } },
            individuals: { label: { en: 'Individuals', es: 'Individuos', pt: 'Indivíduos' } },
            organizations: { label: { en: 'Organizations', es: 'Organizaciones', pt: 'Organizações' } }
          },
        },
        associations: {
          name: 'associations',
          label: { en: 'Associations', es: 'Asociaciones', pt: 'Associações' },
          entity: { en: 'Association', es: 'Asociación', pt: 'Associação' },
          description: { en: 'Association information', es: 'Información de asociaciones', pt: 'Informações de associações' },
          fields: {
            strategies: { label: { en: 'Strategies', es: 'Estrategias', pt: 'Estratégias' } },
            skills: { label: { en: 'Skills', es: 'Habilidades', pt: 'Habilidades' } },
          },
        },
        stories: { label: { en: 'Stories', es: 'Historias', pt: 'Histórias' } },
      },
    },
  },
} as const
