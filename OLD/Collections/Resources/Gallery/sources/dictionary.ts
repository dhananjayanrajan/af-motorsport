// FILE: src/collections/Resources/Galleries/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Gallery', es: 'Galería', pt: 'Galeria' },
  hostPlural: { en: 'Galleries', es: 'Galerías', pt: 'Galerias' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. 2024 Monaco GP Highlights',
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
      description: { en: 'Gallery images and narrative.', es: 'Imágenes y narrativa de la galería.', pt: 'Imagens e narrativa da galeria.' },
      fields: {
        images: { label: { en: 'Images', es: 'Imágenes', pt: 'Imagens' } }
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
    }
  },
} as const
