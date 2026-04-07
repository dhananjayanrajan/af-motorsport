export const dictionary = {
  host: { en: 'Event', es: 'Evento', pt: 'Evento' },
  hostPlural: { en: 'Events', es: 'Eventos', pt: 'Eventos' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Monaco Grand Prix', es: 'e.g. Gran Premio de Mónaco', pt: 'e.g. Grande Prêmio de Mônaco' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. MON', es: 'e.g. MON', pt: 'e.g. MON' },
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
          description: { en: 'Event identification codes', es: 'Códigos de identificación', pt: 'Códigos de identificação' },
          fields: {
            code: {
              label: { en: 'Code', es: 'Código', pt: 'Código' },
              placeholder: { en: 'e.g. MON_2024', es: 'e.g. MON_2024', pt: 'e.g. MON_2024' },
            },
          },
        },
        tagline: {
          label: { en: 'Tagline', es: 'Lema', pt: 'Lema' },
          placeholder: { en: 'e.g. The Jewel in the Crown', es: 'e.g. La Joya de la Corona', pt: 'e.g. A Joia da Coroa' },
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
        status: {
          label: { en: 'Status', es: 'Estado', pt: 'Status' },
        },
        access: {
          label: { en: 'Access', es: 'Acceso', pt: 'Acesso' },
        },
        season: {
          label: { en: 'Season', es: 'Temporada', pt: 'Temporada' },
        },
        location: {
          label: { en: 'Location', es: 'Ubicación', pt: 'Localização' },
        },
        history: {
          label: { en: 'History', es: 'Historia', pt: 'História' },
          placeholder: { en: 'Enter event history', es: 'Ingrese historia del evento', pt: 'Insira a história do evento' },
        },
        start_date: {
          label: { en: 'Start Date', es: 'Fecha de Inicio', pt: 'Data de Início' },
        },
        end_date: {
          label: { en: 'End Date', es: 'Fecha de Fin', pt: 'Data de Término' },
        },
        notes: {
          label: { en: 'Notes', es: 'Notas', pt: 'Notas' },
          placeholder: { en: 'Additional notes', es: 'Notas adicionales', pt: 'Notas adicionais' },
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
        poster: {
          label: { en: 'Poster', es: 'Póster', pt: 'Pôster' },
        },
        cover: {
          label: { en: 'Cover', es: 'Portada', pt: 'Capa' },
        },
        videos: {
          label: { en: 'Videos', es: 'Videos', pt: 'Vídeos' },
        },
      },
    },
  },
} as const
