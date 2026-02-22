// FILE: src/collections/Competition/Seasons/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Season', es: 'Temporada', pt: 'Temporada' },
  hostPlural: { en: 'Seasons', es: 'Temporadas', pt: 'Temporadas' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. 2024 Formula 1 Season',
      description: { en: 'The season name.', es: 'El nombre de la temporada.', pt: 'O nome da temporada.' },
    },
    series: {
      label: { en: 'Series', es: 'Serie', pt: 'Série' },
      description: { en: 'Associated series.', es: 'Serie asociada.', pt: 'Série associada.' },
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'The type of season.', es: 'El tipo de temporada.', pt: 'O tipo de temporada.' },
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
          description: { en: 'Season identifiers.', es: 'Identificadores de temporada.', pt: 'Identificadores de temporada.' },
          fields: {
            code: {
              label: { en: 'Code', es: 'Código', pt: 'Código' },
              placeholder: 'e.g. F1-2024',
            },
            abbreviation: {
              label: { en: 'Abbreviation', es: 'Abreviatura', pt: 'Abreviatura' },
              placeholder: 'e.g. 2024',
            },
          },
        },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Season details.', es: 'Detalles de la temporada.', pt: 'Detalhes da temporada.' },
      fields: {
        narrative: {
          label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' },
        },
        history: {
          label: { en: 'History', es: 'Historia', pt: 'História' },
        },
        schedule: {
          label: { en: 'Schedule', es: 'Calendario', pt: 'Calendário' },
          description: { en: 'Season schedule.', es: 'Calendario de la temporada.', pt: 'Calendário da temporada.' },
        },
        classifications: {
          label: { en: 'Classifications', es: 'Clasificaciones', pt: 'Classificações' },
        },
        regulations: {
          label: { en: 'Regulations', es: 'Reglamentos', pt: 'Regulamentação' },
        },
      },
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      description: { en: 'Season counts.', es: 'Contadores de temporada.', pt: 'Contadores da temporada.' },
      fields: {
        counts: {
          name: 'counts',
          label: { en: 'Counts', es: 'Contadores', pt: 'Contadores' },
          entity: { en: 'Count', es: 'Contador', pt: 'Contador' },
          description: { en: 'Season estadísticas.', es: 'Estadísticas de temporada.', pt: 'Estatísticas da temporada.' },
          fields: {
            entries: { label: { en: 'Entries', es: 'Entradas', pt: 'Entradas' } },
            events: { label: { en: 'Events', es: 'Eventos', pt: 'Eventos' } },
            races: { label: { en: 'Races', es: 'Carreras', pt: 'Corridas' } },
          },
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Media assets.', es: 'Archivos multimedia.', pt: 'Arquivos de mídia.' },
      fields: {
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
        authorities: { label: { en: 'Authorities', es: 'Autoridades', pt: 'Autoridades' } },
        teams: { label: { en: 'Teams', es: 'Equipos', pt: 'Equipes' } },
        participants: { label: { en: 'Participants', es: 'Participantes', pt: 'Participantes' } },
        notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
      },
    },
  },
} as const
