// FILE: src/collections/Attributes/Tags/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Tag', es: 'Etiqueta', pt: 'Etiqueta' },
  hostPlural: { en: 'Tags', es: 'Etiquetas', pt: 'Etiquetas' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Formula 1',
      description: { en: 'Tag name.', es: 'Nombre de etiqueta.', pt: 'Nome da etiqueta.' }
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'Tag type.', es: 'Tipo de etiqueta.', pt: 'Tipo de etiqueta.' }
    }
  },
  tabs: {
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      entity: { en: 'Tag', es: 'Etiqueta', pt: 'Etiqueta' },
      description: { en: 'Detail info.', es: 'Info detallada.', pt: 'Info detalhada.' },
      fields: {
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Enter description',
          description: { en: 'Tag description.', es: 'Descripción de etiqueta.', pt: 'Descrição da etiqueta.' }
        },
        context: {
          label: { en: 'Context', es: 'Contexto', pt: 'Contexto' },
          placeholder: 'Enter context',
          description: { en: 'Usage context.', es: 'Contexto de uso.', pt: 'Contexto de uso.' }
        }
      }
    }
  }
} as const
