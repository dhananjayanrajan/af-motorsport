// FILE: src/collections/Entities/Leaders/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Leader', es: 'Líder', pt: 'Líder' },
  hostPlural: { en: 'Leaders', es: 'Líderes', pt: 'Líderes' },
  essential: {
    names: {
      name: 'names',
      label: { en: 'Names', es: 'Nombres', pt: 'Nomes' },
      entity: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      description: { en: 'Name information', es: 'Información del nombre', pt: 'Informações de nome' },
      fields: {
        first: { label: { en: 'First Name', es: 'Nombre', pt: 'Nome' }, placeholder: 'e.g. Christian' },
        middle: { label: { en: 'Middle Name', es: 'Segundo Nombre', pt: 'Nome do Meio' }, placeholder: 'e.g. Edward' },
        last: { label: { en: 'Last Name', es: 'Apellido', pt: 'Sobrenome' }, placeholder: 'e.g. Horner' },
      },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: 'e.g. Team Principal',
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
    },
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      fields: {
        identifier: {
          name: 'identifier',
          label: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
          entity: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
          description: { en: 'Identification data', es: 'Datos de identificación', pt: 'Dados de identificação' },
          fields: {
            designation: { label: { en: 'Designation', es: 'Designación', pt: 'Designação' } },
            title: { label: { en: 'Title', es: 'Título', pt: 'Título' } },
            code: { label: { en: 'Code', es: 'Código', pt: 'Código' } },
          },
        },
        tagline: {
          label: { en: 'Tagline', es: 'Lema', pt: 'Lema' },
          placeholder: { en: 'e.g. The Hammer', es: 'e.g. El Martillo', pt: 'e.g. O Martelo' },
        },
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      fields: {
        about: {
          name: 'about',
          label: { en: 'About', es: 'Sobre', pt: 'Sobre' },
          entity: { en: 'About', es: 'Sobre', pt: 'Sobre' },
          description: { en: 'About information', es: 'Información sobre', pt: 'Informações sobre' },
          fields: {
            narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
            biography: { label: { en: 'Biography', es: 'Biografía', pt: 'Biografia' } },
          },
        },
        vision: {
          name: 'vision',
          label: { en: 'Vision', es: 'Visión', pt: 'Visão' },
          entity: { en: 'Vision', es: 'Visión', pt: 'Visão' },
          description: { en: 'Guiding principles', es: 'Principios rectores', pt: 'Princípios orientadores' },
          fields: {
            principles: { label: { en: 'Principles', es: 'Principios', pt: 'Principios' } },
          },
        },
        departments: { label: { en: 'Departments', es: 'Departamentos', pt: 'Departamentos' } },
        chronology: {
          name: 'chronology',
          label: { en: 'Chronology', es: 'Cronología', pt: 'Cronologia' },
          entity: { en: 'Chronology', es: 'Cronología', pt: 'Cronologia' },
          description: { en: 'Time events', es: 'Eventos temporales', pt: 'Eventos temporais' },
          fields: {
            birth: { label: { en: 'Birth', es: 'Nacimiento', pt: 'Nascimento' } },
            debut: { label: { en: 'Debut', es: 'Debut', pt: 'Estreia' } },
            retirement: { label: { en: 'Retirement', es: 'Retiro', pt: 'Aposentadoria' } },
          },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      fields: {
        identity: {
          name: 'identity',
          label: { en: 'Identity', es: 'Identidad', pt: 'Identidade' },
          entity: { en: 'Identity', es: 'Identidad', pt: 'Identidade' },
          description: { en: 'Personal identity', es: 'Identidad personal', pt: 'Identidade pessoal' },
          fields: {
            gender: { label: { en: 'Gender', es: 'Género', pt: 'Gênero' } },
            pronouns: { label: { en: 'Pronouns', es: 'Pronombres', pt: 'Pronomes' } },
            age: { label: { en: 'Age', es: 'Edad', pt: 'Idade' } },
            nationality: { label: { en: 'Nationality', es: 'Nacionalidad', pt: 'Nacionalidade' } },
          },
        },
        communication: {
          name: 'communication',
          label: { en: 'Communication', es: 'Comunicación', pt: 'Comunicação' },
          entity: { en: 'Communication', es: 'Comunicación', pt: 'Comunicação' },
          description: { en: 'Communication information', es: 'Información de comunicación', pt: 'Informações de comunicação' },
          fields: {
            channels: { label: { en: 'Channels', es: 'Canales', pt: 'Canais' } },
          }
        },
        personalities: { label: { en: 'Personalities', es: 'Personalidades', pt: 'Personalidades' } },
      },
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      fields: {
        operations: {
          name: 'operations',
          label: { en: 'Operations', es: 'Operaciones', pt: 'Operações' },
          entity: { en: 'Operation', es: 'Operación', pt: 'Operação' },
          description: { en: 'Operational information', es: 'Información operacional', pt: 'Informações operacionais' },
          fields: {
            achievements: { label: { en: 'Achievements', es: 'Logros', pt: 'Conquistas' } },
            impacts: { label: { en: 'Impacts', es: 'Impactos', pt: 'Impactos' } },
          }
        },
        outcomes: {
          name: 'outcomes',
          label: { en: 'Outcomes', es: 'Resultados', pt: 'Resultados' },
          entity: { en: 'Outcome', es: 'Resultado', pt: 'Resultado' },
          description: { en: 'Outcome information', es: 'Información de resultados', pt: 'Informações de resultados' },
          fields: {
            strategies: { label: { en: 'Strategies', es: 'Estrategias', pt: 'Estratégias' } },
            awards: { label: { en: 'Awards', es: 'Premios', pt: 'Prêmios' } },
          }
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      fields: {
        avatar: { label: { en: 'Avatar', es: 'Avatar', pt: 'Avatar' } },
        cover: { label: { en: 'Cover', es: 'Portada', pt: 'Capa' } },
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      fields: {
        connections: {
          name: 'connections',
          label: { en: 'Connections', es: 'Conexiones', pt: 'Conexões' },
          entity: { en: 'Connection', es: 'Conexión', pt: 'Conexão' },
          description: { en: 'Connection information', es: 'Información de conexión', pt: 'Informações de conexão' },
          fields: {
            peers: { label: { en: 'Peers', es: 'Pares', pt: 'Pares' } },
            crew: { label: { en: 'Crew', es: 'Equipo', pt: 'Equipe' } },
          }
        },
        anecdotes: { label: { en: 'Anecdotes', es: 'Anécdotas', pt: 'Anedotas' } },
      },
    },
  },
} as const
