// FILE: src/collections/Attributes/Specifications/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Specification', es: 'Especificación', pt: 'Especificação' },
  hostPlural: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Max Speed',
      description: { en: 'Spec name.', es: 'Nombre de especificación.', pt: 'Nome da especificação.' }
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'Spec type.', es: 'Tipo de especificación.', pt: 'Tipo de especificação.' }
    }
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      entity: { en: 'Specification', es: 'Especificación', pt: 'Especificação' },
      description: { en: 'Basic info.', es: 'Info básica.', pt: 'Info básica.' },
      fields: {
        identifier: {
          name: 'identifier',
          label: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
          entity: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
          description: { en: 'Unique identifier.', es: 'Identificador único.', pt: 'Identificador único.' },
          fields: {
            code: {
              label: { en: 'Code', es: 'Código', pt: 'Código' },
              description: { en: 'Spec code.', es: 'Código de especificación.', pt: 'Código da especificação.' }
            },
            version: {
              label: { en: 'Version', es: 'Versión', pt: 'Versão' },
              description: { en: 'Spec version.', es: 'Versión de especificación.', pt: 'Versão da especificação.' }
            },
            revision: {
              label: { en: 'Revision', es: 'Revisión', pt: 'Revisão' },
              description: { en: 'Spec revision.', es: 'Revisión de especificación.', pt: 'Revisão da especificação.' }
            }
          }
        },
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Enter description',
          description: { en: 'Spec description.', es: 'Descripción de especificación.', pt: 'Descrição da especificação.' }
        }
      }
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      entity: { en: 'Specification', es: 'Especificación', pt: 'Especificação' },
      description: { en: 'Detailed info.', es: 'Info detallada.', pt: 'Info detalhada.' },
      fields: {
        definition: {
          label: { en: 'Definition', es: 'Definición', pt: 'Definição' },
          placeholder: 'Enter definition',
          description: { en: 'Spec definition.', es: 'Definición de especificación.', pt: 'Definição da especificação.' }
        },
        conditions: {
          name: 'conditions',
          label: { en: 'Conditions', es: 'Condiciones', pt: 'Condições' },
          entity: { en: 'Conditions', es: 'Condiciones', pt: 'Condições' },
          description: { en: 'Spec conditions.', es: 'Condiciones de especificación.', pt: 'Condições da especificação.' },
          fields: {
            environment: { label: { en: 'Environment', es: 'Entorno', pt: 'Ambiente' }, description: { en: 'Environment condition.', es: 'Condición ambiental.', pt: 'Condição ambiental.' } },
            constraints: { label: { en: 'Constraints', es: 'Restricciones', pt: 'Restrições' }, description: { en: 'Constraint details.', es: 'Detalles de restricciones.', pt: 'Detalhes das restrições.' } },
            compliance: { label: { en: 'Compliance', es: 'Cumplimiento', pt: 'Conformidade' }, description: { en: 'Compliance level.', es: 'Nivel de cumplimiento.', pt: 'Nível de conformidade.' } }
          }
        }
      }
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      entity: { en: 'Specification', es: 'Especificación', pt: 'Especificação' },
      description: { en: 'Measurement metrics.', es: 'Métricas de medición.', pt: 'Métricas de medição.' },
      fields: {
        measurement: {
          name: 'measurement',
          label: { en: 'Measurement', es: 'Medición', pt: 'Medição' },
          entity: { en: 'Measurement', es: 'Medición', pt: 'Medição' },
          description: { en: 'Measurement method.', es: 'Método de medición.', pt: 'Método de medição.' },
          fields: {
            method: { label: { en: 'Method', es: 'Método', pt: 'Método' }, description: { en: 'Measurement method.', es: 'Método de medición.', pt: 'Método de medição.' } },
            frequency: { label: { en: 'Frequency', es: 'Frecuencia', pt: 'Frequência' }, description: { en: 'Measurement frequency.', es: 'Frecuencia de medición.', pt: 'Frequência de medição.' } },
            accuracy: { label: { en: 'Accuracy', es: 'Precisión', pt: 'Precisão' }, description: { en: 'Measurement accuracy.', es: 'Precisión de medición.', pt: 'Precisão de medição.' } }
          }
        },
        parameters: {
          name: 'parameters',
          label: { en: 'Parameters', es: 'Parámetros', pt: 'Parâmetros' },
          description: { en: 'Spec parameters.', es: 'Parámetros de especificación.', pt: 'Parâmetros da especificação.' },
          entity: { en: 'Parameter', es: 'Parámetro', pt: 'Parâmetro' },
          fields: {
            parameter: { label: { en: 'Parameter', es: 'Parámetro', pt: 'Parâmetro' }, description: { en: 'Parameter name.', es: 'Nombre del parámetro.', pt: 'Nome do parâmetro.' } },
            value: { label: { en: 'Value', es: 'Valor', pt: 'Valor' }, description: { en: 'Parameter value.', es: 'Valor del parámetro.', pt: 'Valor do parâmetro.' } },
            unit: { label: { en: 'Unit', es: 'Unidad', pt: 'Unidade' }, description: { en: 'Measurement unit.', es: 'Unidad de medida.', pt: 'Unidade de medida.' } },
            tolerance: { label: { en: 'Tolerance', es: 'Tolerancia', pt: 'Tolerância' }, description: { en: 'Allowed tolerance.', es: 'Tolerancia permitida.', pt: 'Tolerância permitida.' } }
          }
        }
      }
    }
  }
} as const
