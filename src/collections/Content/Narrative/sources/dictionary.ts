// FILE: src/collections/Content/Narratives/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' },
  hostPlural: { en: 'Narratives', es: 'Narrativas', pt: 'Narrativas' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. The Golden Era',
      description: { en: 'The narrative name.', es: 'El nombre de la narrativa.', pt: 'O nome da narrativa.' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: 'e.g. Era Overview',
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'The type of history.', es: 'El tipo de historia.', pt: 'O tipo da história.' },
    },
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      description: { en: 'Basic Information', es: 'Información básica', pt: 'Informação básica' },
      fields: {
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Short summary',
        },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Narrative details.', es: 'Detalles de la narrativa.', pt: 'Detalhes da narrativa.' },
      fields: {
        content: {
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Main narrative body.', es: 'Cuerpo principal.', pt: 'Corpo principal.' },
        },
        scope: {
          name: 'scope',
          label: { en: 'Scope', es: 'Alcance', pt: 'Escopo' },
          entity: { en: 'Scope', es: 'Alcance', pt: 'Escopo' },
          description: { en: 'Narrative scope.', es: 'Alcance de la narrativa.', pt: 'Escopo da narrativa.' },
          fields: {
            significance: { label: { en: 'Significance', es: 'Significancia', pt: 'Significância' } },
            scale: { label: { en: 'Scale', es: 'Escala', pt: 'Escala' } },
            depth: { label: { en: 'Depth', es: 'Profundidad', pt: 'Profundidade' } },
            level: { label: { en: 'Level', es: 'Nivel', pt: 'Nível' } },
          },
        },
        context: {
          name: 'context',
          label: { en: 'Context', es: 'Contexto', pt: 'Contexto' },
          entity: { en: 'Context', es: 'Contexto', pt: 'Contexto' },
          description: { en: 'Narrative context.', es: 'Contexto de la narrativa.', pt: 'Contexto da narrativa.' },
          fields: {
            background: { label: { en: 'Background', es: 'Antecedentes', pt: 'Antecedentes' } },
            perspective: { label: { en: 'Perspective', es: 'Perspectiva', pt: 'Perspectiva' } },
            purpose: { label: { en: 'Purpose', es: 'Propósito', pt: 'Propósito' } },
          },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Narrative traits.', es: 'Rasgos de la narrativa.', pt: 'Traços da narrativa.' },
      fields: {
        tone: {
          label: { en: 'Tone', es: 'Tono', pt: 'Tom' },
          description: { en: 'Emotional tone.', es: 'Tono emocional.', pt: 'Tom emocional.' },
        },
      },
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      description: { en: 'Narrative metrics.', es: 'Métricas de la narrativa.', pt: 'Métricas da narrativa.' },
      fields: {
        timeline: {
          name: 'timeline',
          label: { en: 'Timeline', es: 'Línea de tiempo', pt: 'Linha do tempo' },
          description: { en: 'Key moments.', es: 'Momentos clave.', pt: 'Momentos-chave.' },
          entity: { en: 'Timeline', es: 'Línea de tiempo', pt: 'Linha do tempo' },
          fields: {
            date: { label: { en: 'Date', es: 'Fecha', pt: 'Data' } },
            type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' } },
          },
        },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Connections.', es: 'Conexiones.', pt: 'Conexões.' },
      fields: {
        locations: { label: { en: 'Locations', es: 'Ubicaciones', pt: 'Localizações' } },
        connections: {
          name: 'connections',
          label: { en: 'Connections', es: 'Conexiones', pt: 'Conexões' },
          description: { en: 'Connections of the location.', es: 'Conexiones de la ubicación.', pt: 'Conexões da localização.' },
          entity: { en: 'Connection', es: 'Conexión', pt: 'Conexão' },
          fields: {
            drivers: {
              label: { en: 'Drivers', es: 'Drivers', pt: 'Pilotos' },
              description: { en: 'Associated drivers.', es: 'Drivers asociados.', pt: 'Pilotos associados.' }
            },
            members: {
              label: { en: 'Members', es: 'Miembros', pt: 'Membros' },
              description: { en: 'Associated members.', es: 'Miembros asociados.', pt: 'Membros associados.' }
            },
            leaders: {
              label: { en: 'Leaders', es: 'Líderes', pt: 'Líderes' },
              description: { en: 'Associated leaders.', es: 'Líderes asociados.', pt: 'Líderes associados.' }
            },
            organizations: {
              label: { en: 'Organizations', es: 'Organizaciones', pt: 'Organizações' },
              description: { en: 'Associated organizations.', es: 'Organizaciones asociadas.', pt: 'Organizações associadas.' }
            },
            individuals: {
              label: { en: 'Individuals', es: 'Individuos', pt: 'Indivíduos' },
              description: { en: 'Associated individuals.', es: 'Individuos asociados.', pt: 'Indivíduos associados.' }
            }
          }
        },
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
      },
    }
  },
} as const
