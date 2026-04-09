// FILE: src/collections/Competition/Series/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Series', es: 'Serie', pt: 'Série' },
  hostPlural: { en: 'Series', es: 'Series', pt: 'Séries' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Formula 1',
      description: { en: 'The series name.', es: 'El nombre de la serie.', pt: 'O nome da série.' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: 'e.g. F1',
      description: { en: 'The series alias.', es: 'El alias de la serie.', pt: 'O alias da série.' },
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'The type of series.', es: 'El tipo de serie.', pt: 'O tipo da série.' },
    },
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      description: { en: 'Basic Information', es: 'Información básica', pt: 'Informação básica' },
      fields: {
        identifiers: {
          name: 'identifiers',
          label: { en: 'Identifiers', es: 'Identificadores', pt: 'Identificadores' },
          entity: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
          description: { en: 'Series identifiers.', es: 'Identificadores de serie.', pt: 'Identificadores da série.' },
          fields: {
            code: {
              label: { en: 'Code', es: 'Código', pt: 'Código' },
              placeholder: 'e.g. F1',
            },
            abbreviation: {
              label: { en: 'Abbreviation', es: 'Abreviatura', pt: 'Abreviatura' },
              placeholder: 'e.g. F1',
            },
          },
        },
        tagline: {
          label: { en: 'Tagline', es: 'Eslogan', pt: 'Slogan' },
          placeholder: 'Enter tagline',
        },
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Brief description',
          description: { en: 'Short description.', es: 'Descripción corta.', pt: 'Descrição curta.' },
        },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Series details.', es: 'Detalles de la serie.', pt: 'Detalhes da série.' },
      fields: {
        status: {
          label: { en: 'Status', es: 'Estado', pt: 'Status' },
          description: { en: 'Series status.', es: 'Estado de la serie.', pt: 'Status da série.' },
        },
        attributes: {
          name: 'attributes',
          label: { en: 'Attributes', es: 'Atributos', pt: 'Atributos' },
          entity: { en: 'Attribute', es: 'Atributo', pt: 'Atributo' },
          description: { en: 'Series attributes.', es: 'Atributos de la serie.', pt: 'Atributos da série.' },
          fields: {
            classification: {
              label: { en: 'Classification', es: 'Clasificación', pt: 'Classificação' },
            },
            features: {
              label: { en: 'Features', es: 'Características', pt: 'Características' },
            },
          },
        },
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Content information', es: 'Información de contenido', pt: 'Informações de conteúdo' },
          fields: {
            history: {
              label: { en: 'History', es: 'Historia', pt: 'História' },
            },
            narrative: {
              label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' },
            },
          },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Series traits.', es: 'Rasgos de la serie.', pt: 'Traços da série.' },
      fields: {
        specifications: {
          label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' },
        },
        heritage: {
          name: 'heritage',
          label: { en: 'Heritage', es: 'Herencia', pt: 'Herança' },
          entity: { en: 'Heritage', es: 'Herencia', pt: 'Herança' },
          description: { en: 'Series lineage.', es: 'Linaje de la serie.', pt: 'Linhagem da série.' },
          fields: {
            predecessor: { label: { en: 'Predecessor', es: 'Predecesor', pt: 'Predecessor' } },
            successor: { label: { en: 'Successor', es: 'Sucesor', pt: 'Sucessor' } },
          },
        },
      },
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      description: { en: 'Series counts.', es: 'Contadores de serie.', pt: 'Contadores da série.' },
      fields: {
        schedule: {
          label: { en: 'Schedule', es: 'Calendario', pt: 'Calendário' },
        },
        locations: { label: { en: 'Locations', es: 'Ubicaciones', pt: 'Localizações' } },
        counts: {
          name: 'counts',
          label: { en: 'Counts', es: 'Contadores', pt: 'Contadores' },
          entity: { en: 'Count', es: 'Contador', pt: 'Contador' },
          description: { en: 'Series estadísticas.', es: 'Estadísticas de serie.', pt: 'Estatísticas da série.' },
          fields: {
            seasons: { label: { en: 'Seasons', es: 'Temporadas', pt: 'Temporadas' } },
            events: { label: { en: 'Events', es: 'Eventos', pt: 'Eventos' } },
            participants: { label: { en: 'Participants', es: 'Participantes', pt: 'Participantes' } },
          },
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Visual assets.', es: 'Activos visuales.', pt: 'Ativos visuais.' },
      fields: {
        logo: { label: { en: 'Logo', es: 'Logo', pt: 'Logo' } },
        cover: { label: { en: 'Cover', es: 'Portada', pt: 'Capa' } },
        archive: { label: { en: 'Archive', es: 'Archivo', pt: 'Arquivo' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Related info.', es: 'Info relacionada.', pt: 'Info relacionada.' },
      fields: {
        connections: {
          name: 'connections',
          label: { en: 'Connections', es: 'Conexiones', pt: 'Conexões' },
          entity: { en: 'Connection', es: 'Conexión', pt: 'Conexão' },
          description: { en: 'Connection information', es: 'Información de conexiones', pt: 'Informações de conexões' },
          fields: {
            organizations: {
              label: { en: 'Organizations', es: 'Organizaciones', pt: 'Organizações' },
            },
            individuals: {
              label: { en: 'Individuals', es: 'Individuos', pt: 'Indivíduos' },
            },
          },
        },
        notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
      },
    },
  },
} as const
