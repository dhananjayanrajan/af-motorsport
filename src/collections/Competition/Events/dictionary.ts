export const dictionary = {
  host: { en: 'Event', es: 'Evento', pt: 'Evento' },
  hostPlural: { en: 'Events', es: 'Eventos', pt: 'Eventos' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Monaco Grand Prix',
      description: { en: 'The event name.', es: 'El nombre del evento.', pt: 'O nome do evento.' },
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'The type of event.', es: 'El tipo de evento.', pt: 'O tipo de evento.' },
    },
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      description: { en: 'Basic info.', es: 'Info básica.', pt: 'Info básica.' },
      fields: {
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Brief description',
          description: { en: 'Short description.', es: 'Descripción corta.', pt: 'Descrição curta.' },
        },
        identifiers: {
          name: 'identifiers',
          label: { en: 'Identifiers', es: 'Identificadores', pt: 'Identificadores' },
          entity: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
          description: { en: 'Event identifiers.', es: 'Identificadores de evento.', pt: 'Identificadores de evento.' },
          fields: {
            code: {
              label: { en: 'Code', es: 'Código', pt: 'Código' },
              placeholder: 'e.g. MCO24',
            },
            round: {
              label: { en: 'Round', es: 'Ronda', pt: 'Rodada' },
              placeholder: 'e.g. 8',
            },
          },
        },
        status: {
          label: { en: 'Status', es: 'Estado', pt: 'Status' },
          description: { en: 'Event status.', es: 'Estado del evento.', pt: 'Status do evento.' },
        },
        access: {
          label: { en: 'Access', es: 'Acceso', pt: 'Acesso' },
          description: { en: 'Event access.', es: 'Acceso al evento.', pt: 'Acesso ao evento.' },
        },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Event details.', es: 'Detalles del evento.', pt: 'Detalhes do evento.' },
      fields: {
        narrative: {
          label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' },
        },
        story: {
          label: { en: 'Story', es: 'Historia', pt: 'História' },
        },
        season: {
          label: { en: 'Season', es: 'Temporada', pt: 'Temporada' },
          description: { en: 'Associated season.', es: 'Temporada asociada.', pt: 'Temporada associada.' },
        },
        location: {
          label: { en: 'Location', es: 'Ubicación', pt: 'Localização' },
          description: { en: 'Event location.', es: 'Ubicación del evento.', pt: 'Localização do evento.' },
        },
        classification: {
          label: { en: 'Classification', es: 'Clasificación', pt: 'Classificação' },
        },
        features: {
          label: { en: 'Features', es: 'Características', pt: 'Características' },
        },
        regulations: {
          label: { en: 'Regulations', es: 'Reglamentos', pt: 'Regulamentação' },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Event traits.', es: 'Rasgos del evento.', pt: 'Traços do evento.' },
      fields: {
        chronology: {
          name: 'chronology',
          label: { en: 'Chronology', es: 'Cronología', pt: 'Cronologia' },
          entity: { en: 'Chronology', es: 'Cronología', pt: 'Cronologia' },
          description: { en: 'Event timing.', es: 'Tiempos del evento.', pt: 'Cronograma do evento.' },
          fields: {
            start: { label: { en: 'Start', es: 'Inicio', pt: 'Início' } },
            end: { label: { en: 'End', es: 'Fin', pt: 'Fim' } },
            timezone: { label: { en: 'Timezone', es: 'Zona horaria', pt: 'Fuso horário' } },
          },
        },
        format: {
          label: { en: 'Format', es: 'Formato', pt: 'Formato' },
        },
      },
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      description: { en: 'Event metrics.', es: 'Métricas del evento.', pt: 'Métricas do evento.' },
      fields: {
        specifications: { label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' } },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Media assets.', es: 'Archivos multimedia.', pt: 'Arquivos de mídia.' },
      fields: {
        poster: { label: { en: 'Poster', es: 'Póster', pt: 'Pôster' } },
        cover: { label: { en: 'Cover', es: 'Portada', pt: 'Capa' } },
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
        playlist: { label: { en: 'Playlist', es: 'Lista de reproducción', pt: 'Playlist' } },
        archive: { label: { en: 'Archive', es: 'Archivo', pt: 'Arquivo' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Related info.', es: 'Info relacionada.', pt: 'Info relacionada.' },
      fields: {
        highlights: { label: { en: 'Highlights', es: 'Destacados', pt: 'Destaques' } },
        insights: { label: { en: 'Insights', es: 'Perspectivas', pt: 'Insights' } },
      },
    },
  },
} as const
