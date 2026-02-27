// FILE: src/collections/Attributes/Classifications/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Classification', es: 'Clasificación', pt: 'Classificação' },
  hostPlural: { en: 'Classifications', es: 'Clasificaciones', pt: 'Classificações' },

  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Formula 1',
      description: { en: 'The name of the classification.', es: 'El nombre de la clasificación.', pt: 'O nome da classificação.' }
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'The category type.', es: 'El tipo de categoría.', pt: 'O tipo de categoria.' }
    }
  },

  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      entity: { en: 'Classification', es: 'Clasificación', pt: 'Classificação' },
      description: { en: 'Basic information.', es: 'Información básica.', pt: 'Informações básicas.' },

      fields: {
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'e.g. The premier class of motor racing.',
          description: { en: 'A brief description.', es: 'Una breve descripción.', pt: 'Uma breve descrição.' }
        }
      }
    },

    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      entity: { en: 'Classification', es: 'Clasificación', pt: 'Classificação' },
      description: { en: 'Detailed information.', es: 'Información detallada.', pt: 'Informações detalhadas.' },
      fields: {
        definition: {
          label: { en: 'Definition', es: 'Definición', pt: 'Definição' },
          placeholder: 'Enter definition',
          description: { en: 'Formal definition.', es: 'Definición formal.', pt: 'Definição formal.' }
        },
        criteria: {
          label: { en: 'Criteria', es: 'Criterios', pt: 'Critérios' },
          placeholder: 'Enter criteria',
          description: { en: 'Classification criteria.', es: 'Criterios de clasificación.', pt: 'Critérios de classificação.' }
        }
      }
    },

    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      entity: { en: 'Classification', es: 'Clasificación', pt: 'Classificação' },
      description: { en: 'Relationships.', es: 'Relaciones.', pt: 'Relacionamentos.' },

      fields: {
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Content of the feature.', es: 'Contenido de la característica.', pt: 'Conteúdo do recurso.' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          fields: {
            notes: {
              label: { en: 'Notes', es: 'Notas', pt: 'Notas' },
              description: { en: 'Related notes.', es: 'Notas relacionadas.', pt: 'Notas relacionadas.' }
            }
          }
        },
      }
    }
  }
} as const
