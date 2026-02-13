export const dictionary = {
  host: { en: 'Feature', es: 'Característica', pt: 'Recurso' },
  hostPlural: { en: 'Features', es: 'Características', pt: 'Recursos' },

  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Active Aerodynamics',
      description: { en: 'The name of the feature.', es: 'El nombre de la característica.', pt: 'O nome do recurso.' }
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'The category of the feature.', es: 'La categoría de la característica.', pt: 'A categoria do recurso.' }
    }
  },

  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      entity: { en: 'Feature', es: 'Característica', pt: 'Recurso' },
      description: { en: 'Basic information.', es: 'Información básica.', pt: 'Informações básicas.' },

      fields: {
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'e.g. Automatically adjusts downforce based on speed.',
          description: { en: 'A brief description.', es: 'Una breve descripción.', pt: 'Uma breve descrição.' }
        }
      }
    },

    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      entity: { en: 'Feature', es: 'Característica', pt: 'Recurso' },
      description: { en: 'Detailed information.', es: 'Información detallada.', pt: 'Informações detalhadas.' },

      fields: {
        functionality: {
          label: { en: 'Functionality', es: 'Funcionalidad', pt: 'Funcionalidade' },
          placeholder: 'Enter functionality details',
          description: { en: 'How the feature works.', es: 'Cómo funciona la característica.', pt: 'Como o recurso funciona.' }
        }
      }
    },

    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      entity: { en: 'Feature', es: 'Característica', pt: 'Recurso' },
      description: { en: 'Feature characteristics.', es: 'Características de la característica.', pt: 'Características do recurso.' },

      nature: {
        name: 'nature',
        label: { en: 'Nature', es: 'Naturaleza', pt: 'Natureza' },
        entity: { en: 'Nature', es: 'Naturaleza', pt: 'Natureza' },
        description: { en: 'Nature of the feature.', es: 'Naturaleza de la característica.', pt: 'Natureza do recurso.' },
        fields: {
          complexity: {
            label: { en: 'Complexity', es: 'Complejidad', pt: 'Complexidade' },
            placeholder: 'Select complexity',
            description: { en: 'Technical complexity.', es: 'Complejidad técnica.', pt: 'Complexidade técnica.' }
          },
          visibility: {
            label: { en: 'Visibility', es: 'Visibilidad', pt: 'Visibilidade' },
            placeholder: 'Select visibility',
            description: { en: 'Feature visibility.', es: 'Visibilidad de la característica.', pt: 'Visibilidade do recurso.' }
          },
          impact: {
            label: { en: 'Impact', es: 'Impacto', pt: 'Impacto' },
            placeholder: 'Select impact',
            description: { en: 'Feature impact.', es: 'Impacto de la característica.', pt: 'Impacto do recurso.' }
          }
        }
      }
    },

    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      entity: { en: 'Feature', es: 'Característica', pt: 'Recurso' },
      description: { en: 'Relationships.', es: 'Relaciones.', pt: 'Relacionamentos.' },

      fields: {
        notes: {
          label: { en: 'Notes', es: 'Notas', pt: 'Notas' },
          description: { en: 'Related notes.', es: 'Notas relacionadas.', pt: 'Notas relacionadas.' }
        }
      }
    }
  }
} as const
