// FILE: src/collections/Content/Notes/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Note', es: 'Nota', pt: 'Nota' },
  hostPlural: { en: 'Notes', es: 'Notas', pt: 'Notas' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Race Observation',
      description: { en: 'The note name.', es: 'El nombre de la nota.', pt: 'O nome da nota.' },
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'The type of note.', es: 'El tipo de nota.', pt: 'O tipo da nota.' },
    },
  },
  tabs: {
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Detailed info.', es: 'Info detallada.', pt: 'Info detalhada.' },
      fields: {
        alias: {
          label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
          placeholder: 'e.g. Observation 1',
        },
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Note content',
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Note traits.', es: 'Rasgos de la nota.', pt: 'Traços da nota.' },
      fields: {
        intentions: {
          name: 'intentions',
          label: { en: 'Intentions', es: 'Intenciones', pt: 'Intenções' },
          description: { en: 'Communication goals.', es: 'Objetivos de comunicación.', pt: 'Objetivos de comunicação.' },
          entity: { en: 'Intention', es: 'Intención', pt: 'Intenção' },
          fields: {
            type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' } },
            impact: { label: { en: 'Impact', es: 'Impacto', pt: 'Impacto' } },
            remark: { label: { en: 'Remark', es: 'Comentario', pt: 'Comentário' } },
          },
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Visual assets.', es: 'Activos visuales.', pt: 'Ativos visuais.' },
      fields: {
        thumbnail: { label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' } },
        archive: { label: { en: 'Archive', es: 'Archivo', pt: 'Arquivo' } },
        visualization: { label: { en: 'Visualization', es: 'Visualización', pt: 'Visualização' } },
      },
    },
  },
} as const
