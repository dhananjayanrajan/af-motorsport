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
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Gallery images and narrative.', es: 'Imágenes y narrativa de la galería.', pt: 'Imagens e narrativa da galeria.' },
      fields: {
        images: { label: { en: 'Images', es: 'Imágenes', pt: 'Imagens' } },
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
      },
    },
  },
} as const
