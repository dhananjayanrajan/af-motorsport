// FILE: src/collections/Competition/Entries/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Entry', es: 'Entrada', pt: 'Entrada' },
  hostPlural: { en: 'Entries', es: 'Entradas', pt: 'Entradas' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Scuderia Ferrari #16',
      description: { en: 'The entry name.', es: 'El nombre de la entrada.', pt: 'O nome da entrada.' },
    },
    session: {
      label: { en: 'Session', es: 'Sesión', pt: 'Sessão' },
      description: { en: 'Associated session.', es: 'Sesión asociada.', pt: 'Sessão associada.' },
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'The type of entry.', es: 'El tipo de entrada.', pt: 'O tipo de entrada.' },
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
          description: { en: 'Entry identifiers.', es: 'Identificadores de entrada.', pt: 'Identificadores de entrada.' },
          fields: {
            number: {
              label: { en: 'Number', es: 'Número', pt: 'Número' },
              placeholder: 'e.g. 16',
            },
            plate: {
              label: { en: 'Plate', es: 'Placa', pt: 'Placa' },
              placeholder: 'e.g. MO-16-F1',
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
      description: { en: 'Entry details.', es: 'Detalles de la entrada.', pt: 'Detalhes da entrada.' },
      fields: {
        status: {
          label: { en: 'Status', es: 'Estado', pt: 'Status' },
          description: { en: 'Entry status.', es: 'Estado de la entrada.', pt: 'Status da entrada.' },
        },
        attributes: {
          name: 'attributes',
          label: { en: 'Attributes', es: 'Atributos', pt: 'Atributos' },
          entity: { en: 'Attribute', es: 'Atributo', pt: 'Atributo' },
          description: { en: 'Session attributes.', es: 'Atributos de la sesión.', pt: 'Atributos da sessão.' },
          fields: {
            classification: {
              label: { en: 'Classification', es: 'Clasificación', pt: 'Classificação' },
              description: { en: 'Classification.', es: 'Clasificación.', pt: 'Classificação.' },
            },
            preferences: {
              label: { en: 'Preferences', es: 'Preferencias', pt: 'Preferências' },
            },
            specifications: {
              label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' },
            },
          },
        },
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Entry content.', es: 'Contenido de la entrada.', pt: 'Conteúdo da entrada.' },
          fields: {
            narrative: {
              label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' },
              description: { en: 'Related narrative.', es: 'Narrativa relacionada.', pt: 'Narrativa relacionada.' },
            },
            notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
          },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Entry traits.', es: 'Rasgos de la entrada.', pt: 'Traços da entrada.' },
      fields: {
        role: {
          label: { en: 'Role', es: 'Rol', pt: 'Papel' },
        },
        eligibility: {
          name: 'eligibility',
          label: { en: 'Eligibility', es: 'Elegibilidad', pt: 'Elegibilidade' },
          entity: { en: 'Eligibility', es: 'Elegibilidad', pt: 'Elegibilidade' },
          description: { en: 'Eligibility info.', es: 'Info de elegibilidad.', pt: 'Informações de elegibilidade.' },
          fields: {
            license: { label: { en: 'License', es: 'Licencia', pt: 'Licença' } },
            waiver: { label: { en: 'Waiver', es: 'Exención', pt: 'Isenção' } },
            restriction: { label: { en: 'Restriction', es: 'Restricción', pt: 'Restrição' } },
          },
        }
      },
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      description: { en: 'Entry metrics.', es: 'Métricas de entrada.', pt: 'Métricas da entrada.' },
      fields: {
        positions: {
          name: 'positions',
          label: { en: 'Positions', es: 'Posiciones', pt: 'Posições' },
          entity: { en: 'Position', es: 'Posición', pt: 'Posição' },
          description: { en: 'Race positions.', es: 'Posiciones de carrera.', pt: 'Posições da corrida.' },
          fields: {
            grid: { label: { en: 'Grid', es: 'Parrilla', pt: 'Grid' } },
            start: { label: { en: 'Start', es: 'Salida', pt: 'Largada' } },
            finish: { label: { en: 'Finish', es: 'Llegada', pt: 'Chegada' } },
            laps: { label: { en: 'Laps', es: 'Vueltas', pt: 'Voltas' } },
          }
        },
        parameters: {
          name: 'parameters',
          label: { en: 'Parameters', es: 'Parámetros', pt: 'Parâmetros' },
          description: { en: 'Custom parameters.', es: 'Parámetros personalizados.', pt: 'Parâmetros personalizados.' },
          entity: { en: 'Parameter', es: 'Parámetro', pt: 'Parâmetro' },
          fields: {
            parameter: { label: { en: 'Parameter', es: 'Parámetro', pt: 'Parâmetro' } },
            value: { label: { en: 'Value', es: 'Valor', pt: 'Valor' } },
            unit: { label: { en: 'Unit', es: 'Unidad', pt: 'Unidade' } },
          },
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Media assets.', es: 'Archivos multimedia.', pt: 'Arquivos de mídia.' },
      fields: {
        thumbnail: { label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' } },
        livery: { label: { en: 'Livery', es: 'Librea', pt: 'Pintura' } },
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
        playlist: { label: { en: 'Playlist', es: 'Lista de reproducción', pt: 'Playlist' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Related info.', es: 'Info relacionada.', pt: 'Info relacionada.' },
      fields: {
        associations: {
          name: 'associations',
          label: { en: 'Associations', es: 'Asociaciones', pt: 'Associações' },
          entity: { en: 'Association', es: 'Asociación', pt: 'Associação' },
          description: { en: 'Session associations.', es: 'Asociaciones de la sesión.', pt: 'Associações da sessão.' },
          fields: {
            drivers: {
              label: { en: 'Drivers', es: 'Pilotos', pt: 'Pilotos' },
              description: { en: 'Assigned drivers.', es: 'Pilotos asignados.', pt: 'Pilotos atribuídos.' },
            },
            crew: {
              label: { en: 'Crew', es: 'Equipo', pt: 'Equipe' },
              description: { en: 'Assigned crew.', es: 'Equipo asignado.', pt: 'Equipe atribuída.' },
            },
            car: {
              label: { en: 'Car', es: 'Auto', pt: 'Carro' },
              description: { en: 'Assigned car.', es: 'Auto asignado.', pt: 'Carro atribuído.' },
            },
          },
        },
      },
    },
  },
} as const
