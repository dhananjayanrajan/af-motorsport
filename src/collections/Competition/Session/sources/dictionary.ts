// FILE: src/collections/Competition/Sessions/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Session', es: 'Sesión', pt: 'Sessão' },
  hostPlural: { en: 'Sessions', es: 'Sesiones', pt: 'Sessões' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Free Practice 1',
      description: { en: 'The session name.', es: 'El nombre de la sesión.', pt: 'O nome da sessão.' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: 'e.g. FP1',
    },
    event: {
      label: { en: 'Event', es: 'Evento', pt: 'Evento' },
      description: { en: 'Associated event.', es: 'Evento asociado.', pt: 'Evento associado.' },
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'The type of session.', es: 'El tipo de sesión.', pt: 'O tipo da sessão.' },
    },
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      description: { en: 'Basic info.', es: 'Info básica.', pt: 'Info básica.' },
      fields: {
        identifiers: {
          name: 'identifiers',
          label: { en: 'Identifiers', es: 'Identificadores', pt: 'Identificadores' },
          entity: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
          description: { en: 'Series identifiers.', es: 'Identificadores de serie.', pt: 'Identificadores da série.' },
          fields: {
            code: {
              label: { en: 'Code', es: 'Código', pt: 'Código' },
              placeholder: 'e.g. F1',
            },
          },
        },
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
      description: { en: 'Session details.', es: 'Detalles de la sesión.', pt: 'Detalhes da sessão.' },
      fields: {
        status: {
          label: { en: 'Status', es: 'Estado', pt: 'Status' },
          description: { en: 'Session status.', es: 'Estado de la sesión.', pt: 'Status da sessão.' },
        },
        access: {
          label: { en: 'Access', es: 'Acceso', pt: 'Acesso' },
          description: { en: 'Session access.', es: 'Acceso a la sesión.', pt: 'Acesso à sessão.' },
        },
        attributes: {
          name: 'attributes',
          label: { en: 'Attributes', es: 'Atributos', pt: 'Atributos' },
          entity: { en: 'Attribute', es: 'Atributo', pt: 'Atributo' },
          description: { en: 'Session attributes.', es: 'Atributos de la sesión.', pt: 'Atributos da sessão.' },
          fields: {
            classifications: {
              label: { en: 'Classifications', es: 'Clasificaciones', pt: 'Classificações' },
            },
            features: {
              label: { en: 'Features', es: 'Características', pt: 'Características' },
            },
          },
        },
        operations: {
          name: 'operations',
          label: { en: 'Operations', es: 'Operaciones', pt: 'Operações' },
          entity: { en: 'Operation', es: 'Operación', pt: 'Operação' },
          description: { en: 'Session operations.', es: 'Operaciones de la sesión.', pt: 'Operações da sessão.' },
          fields: {
            protocols: {
              label: { en: 'Protocols', es: 'Protocolos', pt: 'Protocolos' },
            },
            strategies: {
              label: { en: 'Strategies', es: 'Estrategias', pt: 'Estratégias' },
            },
          },
        },
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Content information', es: 'Información de contenido', pt: 'Informações de conteúdo' },
          fields: {
            narrative: {
              label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' },
              description: { en: 'Event narrative.', es: 'Narrativa del evento.', pt: 'Narrativa do evento.' },
            },
            history: {
              label: { en: 'History', es: 'Historia', pt: 'História' },
              description: { en: 'Event history.', es: 'Historia del evento.', pt: 'História do evento.' },
            },
            insights: { label: { en: 'Insights', es: 'Perspectivas', pt: 'Insights' } },
          },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Session traits.', es: 'Rasgos de la sesión.', pt: 'Traços da sessão.' },
      fields: {
        format: {
          name: 'format',
          label: { en: 'Format', es: 'Formato', pt: 'Formato' },
          entity: { en: 'Format', es: 'Formato', pt: 'Formato' },
          description: { en: 'Session format.', es: 'Formato de la sesión.', pt: 'Formato da sessão.' },
          fields: {
            segment: { label: { en: 'Segment', es: 'Segmento', pt: 'Segmento' } },
            duration: { label: { en: 'Duration', es: 'Duración', pt: 'Duração' } },
            interval: { label: { en: 'Interval', es: 'Intervalo', pt: 'Intervalo' } },
            specification: { label: { en: 'Specification', es: 'Especificación', pt: 'Especificação' } },
          },
        },
        constraints: {
          name: 'constraints',
          label: { en: 'Constraints', es: 'Restricciones', pt: 'Restrições' },
          description: { en: 'Session constraints.', es: 'Restricciones de la sesión.', pt: 'Restrições da sessão.' },
          entity: { en: 'Constraint', es: 'Restricción', pt: 'Restrição' },
          fields: {
            type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' } },
            limit: { label: { en: 'Limit', es: 'Límite', pt: 'Limite' } },
            unit: { label: { en: 'Unit', es: 'Unidad', pt: 'Unidade' } },
          },
        },
        parameters: {
          name: 'parameters',
          label: { en: 'Parameters', es: 'Parámetros', pt: 'Parâmetros' },
          description: { en: 'Session parameters.', es: 'Parámetros de la sesión.', pt: 'Parâmetros da sessão.' },
          entity: { en: 'Parameter', es: 'Parámetro', pt: 'Parâmetro' },
          fields: {
            parameter: { label: { en: 'Parameter', es: 'Parámetro', pt: 'Parâmetro' } },
            value: { label: { en: 'Value', es: 'Valor', pt: 'Valor' } },
            unit: { label: { en: 'Unit', es: 'Unidad', pt: 'Unidade' } },
          },
        },
        specifications: {
          label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' },
        }
      },
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      description: { en: 'Session metrics.', es: 'Métricas de la sesión.', pt: 'Métricas da sessão.' },
      fields: {
        quantifiers: {
          name: 'quantifiers',
          label: { en: 'Quantifiers', es: 'Cuantificadores', pt: 'Quantificadores' },
          entity: { en: 'Quantifier', es: 'Cuantificador', pt: 'Quantificador' },
          description: { en: 'Quantifiable data.', es: 'Datos cuantificables.', pt: 'Dados quantificáveis.' },
          fields: {
            laps: { label: { en: 'Laps', es: 'Vueltas', pt: 'Voltas' } },
            distance: { label: { en: 'Distance', es: 'Distancia', pt: 'Distância' } },
            duration: { label: { en: 'Duration', es: 'Duración', pt: 'Duração' } },
          },
        },
        outcomes: {
          name: 'outcomes',
          label: { en: 'Outcomes', es: 'Resultados', pt: 'Resultados' },
          entity: { en: 'Outcome', es: 'Resultado', pt: 'Resultado' },
          description: { en: 'Session outcomes.', es: 'Resultados de la sesión.', pt: 'Resultados da sessão.' },
          fields: {
            highlights: { label: { en: 'Highlights', es: 'Destacados', pt: 'Destaques' } },
            incidents: { label: { en: 'Incidents', es: 'Incidentes', pt: 'Incidentes' } },
          }
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Media assets.', es: 'Archivos multimedia.', pt: 'Arquivos de mídia.' },
      fields: {
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
        playlist: { label: { en: 'Playlist', es: 'Lista de reproducción', pt: 'Playlist' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Related info.', es: 'Info relacionada.', pt: 'Info relacionada.' },
      fields: {
        connections: {
          name: 'connections',
          label: { en: 'Connections', es: 'Conexiones', pt: 'Conexões' },
          entity: { en: 'Connection', es: 'Conexión', pt: 'Conexão' },
          description: { en: 'Session connections.', es: 'Conexiones de la sesión.', pt: 'Conexões da sessão.' },
          fields: {
            authorities: { label: { en: 'Authorities', es: 'Autoridades', pt: 'Autoridades' } },
            participants: { label: { en: 'Participants', es: 'Participantes', pt: 'Participantes' } },
            crews: { label: { en: 'Crews', es: 'Equipos', pt: 'Equipes' } },
          }
        },
        associations: {
          name: 'associations',
          label: { en: 'Associations', es: 'Asociaciones', pt: 'Associações' },
          entity: { en: 'Association', es: 'Asociación', pt: 'Associação' },
          description: { en: 'Session associations.', es: 'Asociaciones de la sesión.', pt: 'Associações da sessão.' },
          fields: {
            entities: { label: { en: 'Entities', es: 'Entidades', pt: 'Entidades' } },
          }
        }
      },
    },
  },
} as const
