export const dictionary = {
  host: { en: 'Principle', es: 'Principio', pt: 'Princípio' },
  hostPlural: { en: 'Principles', es: 'Principios', pt: 'Princípios' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Integrity',
      description: { en: 'Principle name.', es: 'Nombre del principio.', pt: 'Nome do princípio.' }
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'Principle type.', es: 'Tipo de principio.', pt: 'Tipo de princípio.' }
    }
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      entity: { en: 'Principle', es: 'Principio', pt: 'Princípio' },
      description: { en: 'Basic info.', es: 'Info básica.', pt: 'Info básica.' },
      fields: {
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Brief description',
          description: { en: 'Short description.', es: 'Descripción corta.', pt: 'Descrição curta.' }
        },
        statement: {
          label: { en: 'Statement', es: 'Declaración', pt: 'Declaração' },
          placeholder: 'Enter statement',
          description: { en: 'Official statement.', es: 'Declaración oficial.', pt: 'Declaração oficial.' }
        }
      }
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      entity: { en: 'Principle', es: 'Principio', pt: 'Princípio' },
      description: { en: 'Detailed info.', es: 'Info detallada.', pt: 'Info detalhada.' },
      fields: {
        application: {
          label: { en: 'Application', es: 'Aplicación', pt: 'Aplicação' },
          placeholder: 'How to apply',
          description: { en: 'Application guide.', es: 'Guía de aplicación.', pt: 'Guia de aplicação.' }
        },
        rationale: {
          label: { en: 'Rationale', es: 'Fundamento', pt: 'Fundamentação' },
          placeholder: 'Why this principle',
          description: { en: 'Underlying rationale.', es: 'Fundamento subyacente.', pt: 'Fundamentação subjacente.' }
        }
      }
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      entity: { en: 'Principle', es: 'Principio', pt: 'Princípio' },
      description: { en: 'Related info.', es: 'Info relacionada.', pt: 'Info relacionada.' },
      fields: {
        notes: {
          label: { en: 'Notes', es: 'Notas', pt: 'Notas' },
          description: { en: 'Related notes.', es: 'Notas relacionadas.', pt: 'Notas relacionadas.' }
        }
      }
    }
  }
} as const
