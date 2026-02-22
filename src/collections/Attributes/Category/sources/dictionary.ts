// FILE: src/collections/Attributes/Categories/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Category', es: 'Categoría', pt: 'Categoria' },
  hostPlural: { en: 'Categories', es: 'Categorías', pt: 'Categorias' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Racing Categories',
      description: { en: 'The category name.', es: 'El nombre de la categoría.', pt: 'O nome da categoria.' },
    },
    fields: {
      label: {
        label: { en: 'Label', es: 'Etiqueta', pt: 'Rótulo' },
        placeholder: 'e.g. Formula 1',
        description: { en: 'Display label.', es: 'Etiqueta de visualización.', pt: 'Rótulo de exibição.' },
      },
      value: {
        label: { en: 'Value', es: 'Valor', pt: 'Valor' },
        placeholder: 'e.g. formula-1',
        description: { en: 'Unique value.', es: 'Valor único.', pt: 'Valor único.' },
      },
    },
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      entity: { en: 'Category', es: 'Categoría', pt: 'Categoria' },
      description: { en: 'Basic information.', es: 'Información básica.', pt: 'Informações básicas.' },
      fields: {
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Enter description',
          description: { en: 'Category description.', es: 'Descripción de la categoría.', pt: 'Descrição da categoria.' },
        },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      entity: { en: 'Category', es: 'Categoría', pt: 'Categoria' },
      description: { en: 'Category details.', es: 'Detalles de la categoría.', pt: 'Detalhes da categoria.' },
      fields: {
        parent: {
          label: { en: 'Parent', es: 'Padre', pt: 'Pai' },
          description: { en: 'Parent category.', es: 'Categoría padre.', pt: 'Categoria pai.' },
        },
      },
    },
  },
} as const