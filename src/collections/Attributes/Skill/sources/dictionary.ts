// FILE: src/collections/Attributes/Skills/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Skill', es: 'Habilidad', pt: 'Habilidade' },
  hostPlural: { en: 'Skills', es: 'Habilidades', pt: 'Habilidades' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Aerodynamics',
      description: { en: 'Skill name.', es: 'Nombre de habilidad.', pt: 'Nome da habilidade.' }
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'Skill type.', es: 'Tipo de habilidad.', pt: 'Tipo de habilidade.' }
    }
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      entity: { en: 'Add Basic Details', es: 'Añadir Detalles Básicos', pt: 'Adicionar Detalhes Básicos' },
      description: { en: 'Basic info.', es: 'Info básica.', pt: 'Info básica.' },
      fields: {
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Enter description',
          description: { en: 'Skill description.', es: 'Descripción de habilidad.', pt: 'Descrição da habilidade.' }
        },
        scope: {
          name: 'scope',
          label: { en: 'Scope', es: 'Alcance', pt: 'Escopo' },
          entity: { en: 'Add a new Scope', es: 'Añadir un nuevo Alcance', pt: 'Adicionar um novo Escopo' },
          description: { en: 'Skill scope.', es: 'Alcance de habilidad.', pt: 'Escopo da habilidade.' },
          fields: {
            significance: {
              label: { en: 'Significance', es: 'Significancia', pt: 'Significância' },
              description: { en: 'Skill significance.', es: 'Significancia de habilidad.', pt: 'Significância da habilidade.' }
            },
            scale: {
              label: { en: 'Scale', es: 'Escala', pt: 'Escala' },
              description: { en: 'Skill scale.', es: 'Escala de habilidad.', pt: 'Escala da habilidade.' }
            },
            depth: {
              label: { en: 'Depth', es: 'Profundidad', pt: 'Profundidade' },
              description: { en: 'Skill depth.', es: 'Profundidad de habilidad.', pt: 'Profundidade da habilidade.' }
            },
            rarity: {
              label: { en: 'Rarity', es: 'Rareza', pt: 'Raridade' },
              description: { en: 'Skill rarity.', es: 'Rareza de habilidad.', pt: 'Raridade da habilidade.' }
            }
          }
        }
      }
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      entity: { en: 'Add a new Detail', es: 'Añadir un nuevo Detalle', pt: 'Adicionar um novo Detalhe' },
      description: { en: 'Detailed info.', es: 'Info detallada.', pt: 'Info detalhada.' },
      fields: {
        definition: {
          label: { en: 'Definition', es: 'Definición', pt: 'Definição' },
          placeholder: 'Enter definition',
          description: { en: 'Official definition.', es: 'Definición oficial.', pt: 'Definição oficial.' }
        },
        classifications: { label: { en: 'Classifications', es: 'Clasificaciones', pt: 'Classificações' }, description: { en: 'Related classifications.', es: 'Clasificaciones relacionadas.', pt: 'Classificações relacionadas.' } },
        features: {
          label: { en: 'Features', es: 'Características', pt: 'Características' },
          description: { en: 'Related features.', es: 'Características relacionadas.', pt: 'Características relacionadas.' }
        },
        specifications: {
          label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' },
          description: { en: 'Related specs.', es: 'Especificaciones relacionadas.', pt: 'Especificações relacionadas.' }
        }
      }
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      entity: { en: 'Add a new Trait', es: 'Añadir un nuevo Rasgo', pt: 'Adicionar um novo Traço' },
      description: { en: 'Nature of skill.', es: 'Naturaleza de habilidad.', pt: 'Natureza da habilidade.' },
      nature: {
        name: 'nature',
        label: { en: 'Nature', es: 'Naturaleza', pt: 'Natureza' },
        entity: { en: 'Nature', es: 'Naturaleza', pt: 'Natureza' },
        description: { en: 'Skill nature.', es: 'Naturaleza de habilidad.', pt: 'Natureza da habilidade.' },
        fields: {
          complexity: { label: { en: 'Complexity', es: 'Complejidad', pt: 'Complexidade' }, description: { en: 'Skill complexity.', es: 'Complejidad de habilidad.', pt: 'Complexidade da habilidade.' } },
          visibility: { label: { en: 'Visibility', es: 'Visibilidad', pt: 'Visibilidade' }, description: { en: 'Skill visibility.', es: 'Visibilidad de habilidad.', pt: 'Visibilidade da habilidade.' } },
          impact: { label: { en: 'Impact', es: 'Impacto', pt: 'Impacto' }, description: { en: 'Skill impact.', es: 'Impacto de habilidad.', pt: 'Impacto da habilidade.' } }
        }
      },
      methods: {
        name: 'methods',
        label: { en: 'Methods', es: 'Métodos', pt: 'Métodos' },
        description: { en: 'Learning methods.', es: 'Métodos de aprendizaje.', pt: 'Métodos de aprendizado.' },
        entity: { en: 'Add a new Method', es: 'Añadir un nuevo Método', pt: 'Adicionar um novo Método' },
        fields: {
          method: { label: { en: 'Method', es: 'Método', pt: 'Método' }, description: { en: 'Method name.', es: 'Nombre del método.', pt: 'Nome do método.' } },
          type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' }, description: { en: 'Method type.', es: 'Tipo de método.', pt: 'Tipo de método.' } },
          description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' }, description: { en: 'Method description.', es: 'Descripción del método.', pt: 'Descrição do método.' } }
        }
      },
      dependencies: {
        name: 'dependencies',
        label: { en: 'Dependencies', es: 'Dependencias', pt: 'Dependências' },
        description: { en: 'Skill dependencies.', es: 'Dependencias de habilidad.', pt: 'Dependências de habilidade.' },
        entity: { en: 'Add a new Dependency', es: 'Añadir una nueva Dependencia', pt: 'Adicionar uma nova Dependência' },
        fields: {
          skill: { label: { en: 'Skill', es: 'Habilidad', pt: 'Habilidade' }, description: { en: 'Dependent skill.', es: 'Habilidad dependiente.', pt: 'Habilidade dependente.' } },
          type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' }, description: { en: 'Dependency type.', es: 'Tipo de dependencia.', pt: 'Tipo de dependência.' } }
        }
      }
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      entity: { en: 'Add a new Context', es: 'Añadir un nuevo Contexto', pt: 'Adicionar um novo Contexto' },
      description: { en: 'Context info.', es: 'Info contextual.', pt: 'Info contextual.' },
      fields: {
        trainings: { label: { en: 'Trainings', es: 'Entrenamientos', pt: 'Treinamentos' }, description: { en: 'Related trainings.', es: 'Entrenamientos relacionados.', pt: 'Treinamentos relacionados.' } },
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
