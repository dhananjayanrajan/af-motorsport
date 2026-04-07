export const dictionary = {
  host: { en: 'Season', es: 'Temporada', pt: 'Temporada' },
  hostPlural: { en: 'Seasons', es: 'Temporadas', pt: 'Temporadas' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. 2024 Formula One Season', es: 'e.g. Temporada 2024 de Fórmula Uno', pt: 'e.g. Temporada 2024 da Fórmula 1' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. F1 2024', es: 'e.g. F1 2024', pt: 'e.g. F1 2024' },
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
          description: { en: 'Season identification codes', es: 'Códigos de identificación', pt: 'Códigos de identificação' },
          fields: {
            code: {
              label: { en: 'Code', es: 'Código', pt: 'Código' },
              placeholder: { en: 'e.g. F1_2024', es: 'e.g. F1_2024', pt: 'e.g. F1_2024' },
            },
            abbreviation: {
              label: { en: 'Abbreviation', es: 'Abreviatura', pt: 'Abreviação' },
              placeholder: { en: 'e.g. 24', es: 'e.g. 24', pt: 'e.g. 24' },
            },
          },
        },
        tagline: {
          label: { en: 'Tagline', es: 'Lema', pt: 'Lema' },
          placeholder: { en: 'e.g. The Championship Decade', es: 'e.g. La Década del Campeonato', pt: 'e.g. A Década do Campeonato' },
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
        series: {
          label: { en: 'Series', es: 'Serie', pt: 'Série' },
        },
        history: {
          label: { en: 'History', es: 'Historia', pt: 'História' },
          placeholder: { en: 'Enter season history', es: 'Ingrese historia de la temporada', pt: 'Insira a história da temporada' },
        },
        entries: {
          label: { en: 'Entries', es: 'Inscripciones', pt: 'Inscrições' },
        },
        races: {
          label: { en: 'Races', es: 'Carreras', pt: 'Corridas' },
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
        cover: {
          label: { en: 'Cover', es: 'Portada', pt: 'Capa' },
        },
        trailer: {
          label: { en: 'Trailer', es: 'Trailer', pt: 'Trailer' },
        },
        gallery: {
          label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' },
        },
        highlights: {
          label: { en: 'Highlights', es: 'Destacados', pt: 'Destaques' },
        },
      },
    },
  },
} as const
