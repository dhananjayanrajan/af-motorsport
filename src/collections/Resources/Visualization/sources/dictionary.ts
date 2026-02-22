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
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Visualization designs and narrative.', es: 'Diseños y narrativa de la visualización.', pt: 'Designs e narrativa da visualização.' },
      fields: {
        designs: { label: { en: 'Designs', es: 'Diseños', pt: 'Designs' } },
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
      },
    },
  },
} as const
