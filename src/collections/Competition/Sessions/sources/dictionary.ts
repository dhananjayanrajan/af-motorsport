export const dictionary = {
  host: { en: 'Session', es: 'Sesión', pt: 'Sessão' },
  hostPlural: { en: 'Sessions', es: 'Sesiones', pt: 'Sessões' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Qualifying 1', es: 'e.g. Clasificación 1', pt: 'e.g. Classificação 1' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. Q1', es: 'e.g. Q1', pt: 'e.g. Q1' },
    },
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      fields: {
        identifiers: {
          label: { en: 'Identifiers', es: 'Identificadores', pt: 'Identificadores' },
          entity: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
          description: { en: 'Session identification codes', es: 'Códigos de identificación', pt: 'Códigos de identificação' },
          fields: {
            code: {
              label: { en: 'Code', es: 'Código', pt: 'Código' },
              placeholder: { en: 'e.g. MON_Q1', es: 'e.g. MON_Q1', pt: 'e.g. MON_Q1' },
            },
          },
        },
        segment: {
          label: { en: 'Segment', es: 'Segmento', pt: 'Segmento' },
          placeholder: { en: 'e.g. Qualifying', es: 'e.g. Clasificación', pt: 'e.g. Classificação' },
        },
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: { en: 'Enter description', es: 'Ingrese descripción', pt: 'Insira a descrição' },
        },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      fields: {
        access: {
          label: { en: 'Access', es: 'Acceso', pt: 'Acesso' },
        },
        specification: {
          label: { en: 'Specification', es: 'Especificación', pt: 'Especificação' },
          placeholder: { en: 'Enter session specifications', es: 'Ingrese especificaciones', pt: 'Insira especificações' },
        },
        history: {
          label: { en: 'History', es: 'Historia', pt: 'História' },
          placeholder: { en: 'Enter session history', es: 'Ingrese historia', pt: 'Insira história' },
        },
        notes: {
          label: { en: 'Notes', es: 'Notas', pt: 'Notas' },
          placeholder: { en: 'Additional notes', es: 'Notas adicionales', pt: 'Notas adicionais' },
        },
      },
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      fields: {
        quantifiers: {
          label: { en: 'Quantifiers', es: 'Cuantificadores', pt: 'Quantificadores' },
          entity: { en: 'Quantifier', es: 'Cuantificador', pt: 'Quantificador' },
          description: { en: 'Session quantitative metrics', es: 'Métricas cuantitativas', pt: 'Métricas quantitativas' },
          fields: {
            laps: {
              label: { en: 'Laps', es: 'Vueltas', pt: 'Voltas' },
            },
            distance: {
              label: { en: 'Distance (km)', es: 'Distancia (km)', pt: 'Distância (km)' },
            },
            duration: {
              label: { en: 'Duration (minutes)', es: 'Duración (minutos)', pt: 'Duração (minutos)' },
            },
            interval: {
              label: { en: 'Interval (minutes)', es: 'Intervalo (minutos)', pt: 'Intervalo (minutos)' },
            },
            specification: {
              label: { en: 'Specification', es: 'Especificación', pt: 'Especificação' },
              placeholder: { en: 'Additional specifications', es: 'Especificaciones adicionales', pt: 'Especificações adicionais' },
            },
          },
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      fields: {
        thumbnail: {
          label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' },
        },
        gallery: {
          label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' },
        },
        videos: {
          label: { en: 'Videos', es: 'Videos', pt: 'Vídeos' },
        },
      },
    },
  },
} as const
