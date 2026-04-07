export const dictionary = {
  host: { en: 'Entry', es: 'Inscripción', pt: 'Inscrição' },
  hostPlural: { en: 'Entries', es: 'Inscripciones', pt: 'Inscrições' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Lewis Hamilton Entry', es: 'e.g. Inscripción de Lewis Hamilton', pt: 'e.g. Inscrição de Lewis Hamilton' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. HAM_ENTRY', es: 'e.g. HAM_ENTRY', pt: 'e.g. HAM_ENTRY' },
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
          description: { en: 'Entry identification numbers', es: 'Números de identificación', pt: 'Números de identificação' },
          fields: {
            number: {
              label: { en: 'Number', es: 'Número', pt: 'Número' },
              placeholder: { en: 'e.g. 44', es: 'e.g. 44', pt: 'e.g. 44' },
            },
            plate: {
              label: { en: 'Plate', es: 'Placa', pt: 'Placa' },
              placeholder: { en: 'e.g. HAM', es: 'e.g. HAM', pt: 'e.g. HAM' },
            },
          },
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
        session: {
          label: { en: 'Session', es: 'Sesión', pt: 'Sessão' },
        },
        status: {
          label: { en: 'Status', es: 'Estado', pt: 'Status' },
        },
        grid_position: {
          label: { en: 'Grid Position', es: 'Posición de Parrilla', pt: 'Posição de Grid' },
        },
        start_position: {
          label: { en: 'Start Position', es: 'Posición de Salida', pt: 'Posição de Largada' },
        },
        finish_position: {
          label: { en: 'Finish Position', es: 'Posición Final', pt: 'Posição Final' },
        },
        laps_position: {
          label: { en: 'Laps Position', es: 'Posición de Vueltas', pt: 'Posição de Voltas' },
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
      },
    },
  },
} as const
