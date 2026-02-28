// FILE: src/collections/Resources/Visualizations/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Visualization', es: 'Visualización', pt: 'Visualização' },
  hostPlural: { en: 'Visualizations', es: 'Visualizaciones', pt: 'Visualizações' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. 2024 Lap Time Analysis',
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
    },
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      description: { en: 'Basic Information', es: 'Información básica', pt: 'Informação básica' },
      fields: {
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Enter description',
        },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Visualization designs and narrative.', es: 'Diseños y narrativa de la visualización.', pt: 'Designs e narrativa da visualização.' },
      fields: {
        designs: { label: { en: 'Designs', es: 'Diseños', pt: 'Designs' } },
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      entity: { en: 'Gallery', es: 'Galería', pt: 'Galeria' },
      description: { en: 'Related info.', es: 'Info relacionada.', pt: 'Info relacionada.' },
      fields: {
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Content.', es: 'Contenido.', pt: 'Conteúdo.' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          fields: {
            narratives: { label: { en: 'Narratives', es: 'Narrativas', pt: 'Narrativas' } },
          }
        }
      }
    },
  },
} as const
