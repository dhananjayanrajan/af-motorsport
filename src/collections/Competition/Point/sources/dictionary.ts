// FILE: src/collections/Competition/Points/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Point', es: 'Punto', pt: 'Ponto' },
  hostPlural: { en: 'Points', es: 'Puntos', pt: 'Pontos' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. 25 Points for Win',
      description: { en: 'The points name.', es: 'El nombre de los puntos.', pt: 'O nome dos pontos.' },
    },
    result: {
      label: { en: 'Result', es: 'Resultado', pt: 'Resultado' },
      description: { en: 'Associated result.', es: 'Resultado asociado.', pt: 'Resultado associado.' },
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'The type of points.', es: 'El tipo de puntos.', pt: 'O tipo de pontos.' },
    },
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      description: { en: 'Basic info.', es: 'Info básica.', pt: 'Info básica.' },
      fields: {
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Brief description',
          description: { en: 'Short description.', es: 'Descripción corta.', pt: 'Descrição curta.' },
        },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Point details.', es: 'Detalles del punto.', pt: 'Detalhes do ponto.' },
      fields: {
        entries: { label: { en: 'Entries', es: 'Entradas', pt: 'Entradas' } },
        attributes: {
          name: 'attributes',
          label: { en: 'Attributes', es: 'Atributos', pt: 'Atributos' },
          entity: { en: 'Attribute', es: 'Atributo', pt: 'Atributo' },
          description: { en: 'Result attributes.', es: 'Atributos del resultado.', pt: 'Atributos do resultado.' },
          fields: {
            classification: {
              label: { en: 'Classification', es: 'Clasificación', pt: 'Classificação' },
            },
            specification: {
              label: { en: 'Specification', es: 'Especificación', pt: 'Especificação' },
            },
          }
        },
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Content details.', es: 'Detalles del contenido.', pt: 'Detalhes do conteúdo.' },
          fields: {
            insights: { label: { en: 'Insights', es: 'Perspectivas', pt: 'Insights' } },
          },
        }
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Point traits.', es: 'Rasgos del punto.', pt: 'Traços do ponto.' },
      fields: {
        value: {
          label: { en: 'Value', es: 'Valor', pt: 'Valor' },
          description: { en: 'Points value.', es: 'Valor de los puntos.', pt: 'Valor dos pontos.' },
        },
        scale: {
          label: { en: 'Scale', es: 'Escala', pt: 'Escala' },
          description: { en: 'Points scale.', es: 'Escala de puntos.', pt: 'Escala de pontos.' },
        },
        ranking: {
          name: 'ranking',
          label: { en: 'Ranking', es: 'Clasificación', pt: 'Ranking' },
          entity: { en: 'Ranking', es: 'Clasificación', pt: 'Ranking' },
          description: { en: 'Ranking update.', es: 'Actualización de clasificación.', pt: 'Atualização de ranking.' },
          fields: {
            before: { label: { en: 'Before', es: 'Antes', pt: 'Antes' } },
            after: { label: { en: 'After', es: 'Después', pt: 'Depois' } },
            delta: { label: { en: 'Delta', es: 'Delta', pt: 'Delta' } },
          },
        },
        modifiers: {
          name: 'modifiers',
          label: { en: 'Modifiers', es: 'Modificadores', pt: 'Modificadores' },
          description: { en: 'Point modifiers.', es: 'Modificadores de puntos.', pt: 'Modificadores de pontos.' },
          entity: { en: 'Modifier', es: 'Modificador', pt: 'Modificador' },
          fields: {
            condition: { label: { en: 'Condition', es: 'Condición', pt: 'Condição' } },
            adjustment: { label: { en: 'Adjustment', es: 'Ajuste', pt: 'Ajuste' } },
            impact: { label: { en: 'Impact', es: 'Impacto', pt: 'Impacto' } },
          },
        },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Related info.', es: 'Info relacionada.', pt: 'Info relacionada.' },
      entity: { en: 'Context', es: 'Contexto', pt: 'Contexto' },
      fields: {
        connections: {
          name: 'connections',
          label: { en: 'Connections', es: 'Conexiones', pt: 'Conexões' },
          entity: { en: 'Connection', es: 'Conexión', pt: 'Conexão' },
          description: { en: 'Related connections.', es: 'Conexiones relacionadas.', pt: 'Conexões relacionadas.' },
          fields: {
            authorities: { label: { en: 'Authorities', es: 'Autoridades', pt: 'Autoridades' } },
            drivers: { label: { en: 'Drivers', es: 'Pilotos', pt: 'Pilotos' } }
          },
        }
      },
    },
  },
} as const
