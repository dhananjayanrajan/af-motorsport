export const dictionary = {
  host: { en: 'Suit', es: 'Traje', pt: 'Macacão' },
  hostPlural: { en: 'Suits', es: 'Trajes', pt: 'Macacões' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Sparco X-Light', es: 'e.g. Sparco X-Light', pt: 'e.g. Sparco X-Light' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. SP_XL', es: 'e.g. SP_XL', pt: 'e.g. SP_XL' },
    },
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      fields: {
        tagline: {
          label: { en: 'Tagline', es: 'Lema', pt: 'Lema' },
          placeholder: { en: 'e.g. Pure Performance', es: 'e.g. Puro Rendimiento', pt: 'e.g. Pura Performance' },
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
        usage: {
          label: { en: 'Usage', es: 'Uso', pt: 'Uso' },
        },
        durability: {
          label: { en: 'Durability', es: 'Durabilidad', pt: 'Durabilidade' },
        },
        material: {
          label: { en: 'Material', es: 'Material', pt: 'Material' },
        },
        appearance: {
          label: { en: 'Appearance', es: 'Apariencia', pt: 'Aparência' },
        },
        manufacturers: {
          label: { en: 'Manufacturers', es: 'Fabricantes', pt: 'Fabricantes' },
          description: { en: 'Component manufacturers', es: 'Fabricantes de componentes', pt: 'Fabricantes de componentes' },
        },
        manufacturerFields: {
          entity: { en: 'Manufacturer', es: 'Fabricante', pt: 'Fabricante' },
          name: { label: { en: 'Name', es: 'Nombre', pt: 'Nome' } },
          description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
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
        video: {
          label: { en: 'Video', es: 'Video', pt: 'Vídeo' },
        },
        images: {
          label: { en: 'Images', es: 'Imágenes', pt: 'Imagens' },
        },
      },
    },
  },
} as const
