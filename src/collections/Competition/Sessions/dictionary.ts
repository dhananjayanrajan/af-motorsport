export const dictionary = {
  host: { en: 'Session', es: 'Sesión', pt: 'Sessão' },
  hostPlural: { en: 'Sessions', es: 'Sesiones', pt: 'Sessões' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Free Practice 1',
      description: { en: 'The session name.', es: 'El nombre de la sesión.', pt: 'O nome da sessão.' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: 'e.g. FP1',
    },
    code: {
      label: { en: 'Code', es: 'Código', pt: 'Código' },
      placeholder: 'e.g. FP1-MCO',
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'The type of session.', es: 'El tipo de sesión.', pt: 'O tipo da sessão.' },
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
        status: {
          label: { en: 'Status', es: 'Estado', pt: 'Status' },
          description: { en: 'Session status.', es: 'Estado de la sesión.', pt: 'Status da sessão.' },
        },
        access: {
          label: { en: 'Access', es: 'Acceso', pt: 'Acesso' },
          description: { en: 'Session access.', es: 'Acceso a la sesión.', pt: 'Acesso à sessão.' },
        },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Session details.', es: 'Detalles de la sesión.', pt: 'Detalhes da sessão.' },
      fields: {
        narrative: {
          label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' },
        },
        event: {
          label: { en: 'Event', es: 'Evento', pt: 'Evento' },
          description: { en: 'Associated event.', es: 'Evento asociado.', pt: 'Evento associado.' },
        },
        format: {
          name: 'format',
          label: { en: 'Format', es: 'Formato', pt: 'Formato' },
          entity: { en: 'Format', es: 'Formato', pt: 'Formato' },
          description: { en: 'Session format.', es: 'Formato de la sesión.', pt: 'Formato da sessão.' },
          fields: {
            segment: { label: { en: 'Segment', es: 'Segmento', pt: 'Segmento' } },
            duration: { label: { en: 'Duration', es: 'Duración', pt: 'Duração' } },
            interval: { label: { en: 'Interval', es: 'Intervalo', pt: 'Intervalo' } },
            specification: { label: { en: 'Specification', es: 'Especificación', pt: 'Especificação' } },
          },
        },
        classifications: {
          label: { en: 'Classifications', es: 'Clasificaciones', pt: 'Classificações' },
        },
        features: {
          label: { en: 'Features', es: 'Características', pt: 'Características' },
        },
        protocols: {
          label: { en: 'Protocols', es: 'Protocolos', pt: 'Protocolos' },
        },
        strategies: {
          label: { en: 'Strategies', es: 'Estrategias', pt: 'Estratégias' },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Session traits.', es: 'Rasgos de la sesión.', pt: 'Traços da sessão.' },
      fields: {
        constraints: {
          label: { en: 'Constraints', es: 'Restricciones', pt: 'Restrições' },
          description: { en: 'Session constraints.', es: 'Restricciones de la sesión.', pt: 'Restrições da sessão.' },
          fields: {
            type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' } },
            limit: { label: { en: 'Limit', es: 'Límite', pt: 'Limite' } },
            unit: { label: { en: 'Unit', es: 'Unidad', pt: 'Unidade' } },
          },
        },
        parameters: {
          label: { en: 'Parameters', es: 'Parámetros', pt: 'Parâmetros' },
          description: { en: 'Session parameters.', es: 'Parámetros de la sesión.', pt: 'Parâmetros da sessão.' },
          fields: {
            parameter: { label: { en: 'Parameter', es: 'Parámetro', pt: 'Parâmetro' } },
            value: { label: { en: 'Value', es: 'Valor', pt: 'Valor' } },
            unit: { label: { en: 'Unit', es: 'Unidad', pt: 'Unidade' } },
          },
        },
        specifications: {
          label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' },
        },
      },
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      description: { en: 'Session metrics.', es: 'Métricas de la sesión.', pt: 'Métricas da sessão.' },
      fields: {
        quantifiers: {
          name: 'quantifiers',
          label: { en: 'Quantifiers', es: 'Cuantificadores', pt: 'Quantificadores' },
          entity: { en: 'Quantifier', es: 'Cuantificador', pt: 'Quantificador' },
          description: { en: 'Quantifiable data.', es: 'Datos cuantificables.', pt: 'Dados quantificáveis.' },
          fields: {
            laps: { label: { en: 'Laps', es: 'Vueltas', pt: 'Voltas' } },
            distance: { label: { en: 'Distance', es: 'Distancia', pt: 'Distância' } },
            duration: { label: { en: 'Duration', es: 'Duración', pt: 'Duração' } },
          },
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Media assets.', es: 'Archivos multimedia.', pt: 'Arquivos de mídia.' },
      fields: {
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
        playlist: { label: { en: 'Playlist', es: 'Lista de reproducción', pt: 'Playlist' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Related info.', es: 'Info relacionada.', pt: 'Info relacionada.' },
      fields: {
        highlights: { label: { en: 'Highlights', es: 'Destacados', pt: 'Destaques' } },
        incidents: { label: { en: 'Incidents', es: 'Incidentes', pt: 'Incidentes' } },
        authorities: { label: { en: 'Authorities', es: 'Autoridades', pt: 'Autoridades' } },
        participants: { label: { en: 'Participants', es: 'Participantes', pt: 'Participantes' } },
        crews: { label: { en: 'Crews', es: 'Equipos', pt: 'Equipes' } },
        entities: { label: { en: 'Entities', es: 'Entidades', pt: 'Entidades' } },
        insights: { label: { en: 'Insights', es: 'Perspectivas', pt: 'Insights' } },
      },
    },
  },
} as const
