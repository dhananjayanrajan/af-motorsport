export const dictionary = {
  host: { en: 'Preference', es: 'Preferencia', pt: 'Preferência' },
  hostPlural: { en: 'Preferences', es: 'Preferencias', pt: 'Preferências' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Dark Mode',
      description: { en: 'Preference name.', es: 'Nombre de preferencia.', pt: 'Nome da preferência.' }
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'Preference type.', es: 'Tipo de preferencia.', pt: 'Tipo de preferência.' }
    }
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      entity: { en: 'Preference', es: 'Preferencia', pt: 'Preferência' },
      description: { en: 'Basic info.', es: 'Info básica.', pt: 'Info básica.' },
      fields: {
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Enter description',
          description: { en: 'Short description.', es: 'Descripción corta.', pt: 'Descrição curta.' }
        }
      }
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      entity: { en: 'Preference', es: 'Preferencia', pt: 'Preferência' },
      description: { en: 'Traits & conditions.', es: 'Rasgos y condiciones.', pt: 'Traços e condições.' },
      fields: {
        conditions: {
          label: { en: 'Conditions', es: 'Condiciones', pt: 'Condições' },
          description: { en: 'Appyling conditions.', es: 'Condiciones de aplicación.', pt: 'Condições de aplicação.' },
          fields: {
            trigger: {
              label: { en: 'Trigger', es: 'Disparador', pt: 'Gatilho' },
              description: { en: 'Condition trigger.', es: 'Disparador de condición.', pt: 'Gatilho da condição.' }
            },
            prerequisite: {
              label: { en: 'Prerequisite', es: 'Prerrequisito', pt: 'Pré-requisito' },
              description: { en: 'Required prerequisite.', es: 'Prerrequisito requerido.', pt: 'Pré-requisito obrigatório.' }
            }
          }
        },
        reasons: {
          label: { en: 'Reasons', es: 'Razones', pt: 'Razões' },
          description: { en: 'Reasons for preference.', es: 'Razones de la preferencia.', pt: 'Razões para a preferência.' },
          fields: {
            reason: {
              label: { en: 'Reason', es: 'Razón', pt: 'Razão' },
              description: { en: 'The reason.', es: 'La razón.', pt: 'A razão.' }
            },
            importance: {
              label: { en: 'Importance', es: 'Importancia', pt: 'Importância' },
              description: { en: 'Importance level.', es: 'Nivel de importancia.', pt: 'Nível de importância.' }
            }
          }
        }
      }
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      entity: { en: 'Preference', es: 'Preferencia', pt: 'Preferência' },
      description: { en: 'Contextual info.', es: 'Info contextual.', pt: 'Info contextual.' },
      fields: {
        principles: {
          label: { en: 'Principles', es: 'Principios', pt: 'Princípios' },
          description: { en: 'Related principles.', es: 'Principios relacionados.', pt: 'Princípios relacionados.' }
        },
        notes: {
          label: { en: 'Notes', es: 'Notas', pt: 'Notas' },
          description: { en: 'Related notes.', es: 'Notas relacionadas.', pt: 'Notas relacionadas.' }
        }
      }
    }
  }
} as const
