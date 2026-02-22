// FILE: src/collections/Resources/Media/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Media', es: 'Media', pt: 'Media' },
  hostPlural: { en: 'Media', es: 'Media', pt: 'Media' },

  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Monaco GP 2024',
      description: { en: 'The media name.', es: 'El nombre del archivo.', pt: 'O nome do arquivo.' },
    },
    alt: {
      label: { en: 'Alt Text', es: 'Texto alternativo', pt: 'Texto alternativo' },
      placeholder: 'e.g. Charles Leclerc at Monaco',
      description: { en: 'Alternative text for accessibility.', es: 'Texto alternativo para accesibilidad.', pt: 'Texto alternativo para acessibilidade.' },
    },
  },

  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      entity: { en: 'Media', es: 'Media', pt: 'Media' },
      description: { en: 'Basic data', es: 'Datos básicos', pt: 'Dados básicos' },
      fields: {}
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      entity: { en: 'Media', es: 'Media', pt: 'Media' },
      description: { en: 'File details', es: 'Detalles del archivo', pt: 'Detalhes do arquivo' },
      fields: {
        file: {
          label: { en: 'File', es: 'Archivo', pt: 'Arquivo' },
          description: { en: 'Upload media file.', es: 'Subir archivo multimedia.', pt: 'Fazer upload de arquivo de mídia.' },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      entity: { en: 'Media', es: 'Media', pt: 'Media' },
      description: { en: 'Media traits', es: 'Rasgos del archivo', pt: 'Características da mídia' },
      fields: {
        tone: {
          label: { en: 'Tone', es: 'Tono', pt: 'Tom' },
          description: { en: 'Emotional tone.', es: 'Tono emocional.', pt: 'Tom emocional.' },
        },
        sources: {
          label: { en: 'Sources', es: 'Fuentes', pt: 'Fontes' },
          description: { en: 'Original and derived sources.', es: 'Fuentes originales y derivadas.', pt: 'Fontes originais e derivadas.' },
          fields: {
            url: { label: { en: 'URL', es: 'URL', pt: 'URL' } },
            type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' } },
          },
        },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      entity: { en: 'Media', es: 'Media', pt: 'Media' },
      description: { en: 'Related notes and entities.', es: 'Notas y entidades relacionadas.', pt: 'Notas e entidades relacionadas.' },
      fields: {
        notes: {
          label: { en: 'Notes', es: 'Notas', pt: 'Notas' },
          description: { en: 'Related notes.', es: 'Notas relacionadas.', pt: 'Notas relacionadas.' },
        },
        entities: {
          label: { en: 'Entities', es: 'Entidades', pt: 'Entidades' },
          description: { en: 'Related entities.', es: 'Entidades relacionadas.', pt: 'Entidades relacionadas.' },
        },
      },
    },
  },
} as const
