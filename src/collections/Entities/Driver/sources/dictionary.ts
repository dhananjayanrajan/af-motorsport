// FILE: src/collections/Entities/Drivers/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Driver', es: 'Piloto', pt: 'Piloto' },
  hostPlural: { en: 'Drivers', es: 'Pilotos', pt: 'Pilotos' },
  essential: {
    names: {
      name: 'names',
      label: { en: 'Names', es: 'Nombres', pt: 'Nomes' },
      entity: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      description: { en: 'Name information', es: 'Información del nombre', pt: 'Informações de nome' },
      fields: {
        first: { label: { en: 'First Name', es: 'Nombre', pt: 'Nome' }, placeholder: 'e.g. Lewis' },
        middle: { label: { en: 'Middle Name', es: 'Segundo Nombre', pt: 'Nome do Meio' }, placeholder: 'e.g. Carl' },
        last: { label: { en: 'Last Name', es: 'Apellido', pt: 'Sobrenome' }, placeholder: 'e.g. Hamilton' },
      },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: 'e.g. Billion Dollar Man',
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
        tagline: {
          label: { en: 'Tagline', es: 'Lema', pt: 'Lema' },
          placeholder: { en: 'e.g. The Hammer', es: 'e.g. El Martillo', pt: 'e.g. O Martelo' },
        },
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
        identifier: {
          name: 'identifier',
          label: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
          entity: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
          description: { en: 'Identification data', es: 'Datos de identificación', pt: 'Dados de identificação' },
          fields: {
            number: { label: { en: 'Number', es: 'Número', pt: 'Número' }, placeholder: '44' },
            nickname: { label: { en: 'Nickname', es: 'Apodo', pt: 'Apelido' }, placeholder: 'The Hammer' },
            competition: { label: { en: 'Competition', es: 'Competición', pt: 'Competição' } },
            callsign: { label: { en: 'Callsign', es: 'Distintivo', pt: 'Callsign' } },
          },
        },
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
            journeys: { label: { en: 'Journeys', es: 'Trayectorias', pt: 'Jornadas' } },
          },
        },
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
          description: { en: 'Communication data', es: 'Datos de comunicación', pt: 'Dados de comunicação' },
          fields: {
            channels: { label: { en: 'Channels', es: 'Canales', pt: 'Canais' } },
          },
        },
      },
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      fields: {
        qualifications: {
          name: 'qualifications',
          label: { en: 'Qualifications', es: 'Calificaciones', pt: 'Qualificações' },
          entity: { en: 'Qualification', es: 'Calificación', pt: 'Qualificação' },
          description: { en: 'Qualification data', es: 'Datos de calificación', pt: 'Dados de qualificação' },
          fields: {
            experiences: { label: { en: 'Experiences', es: 'Experiencias', pt: 'Experiências' } },
            skills: { label: { en: 'Skills', es: 'Habilidades', pt: 'Habilidades' } },
            trainings: { label: { en: 'Trainings', es: 'Entrenamientos', pt: 'Treinamentos' } },
          },
        },
        outcomes: {
          name: 'outcomes',
          label: { en: 'Outcomes', es: 'Resultados', pt: 'Resultados' },
          entity: { en: 'Outcome', es: 'Resultado', pt: 'Resultado' },
          description: { en: 'Outcome information', es: 'Información de resultados', pt: 'Informações de resultados' },
          fields: {
            points: { label: { en: 'Points', es: 'Puntos', pt: 'Pontos' } },
            results: { label: { en: 'Results', es: 'Resultados', pt: 'Resultados' } },
            awards: { label: { en: 'Awards', es: 'Premios', pt: 'Prêmios' } },
          }
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      fields: {
        autograph: { label: { en: 'Autograph', es: 'Autógrafo', pt: 'Autógrafo' } },
        thumbnail: { label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' } },
        cover: { label: { en: 'Cover', es: 'Portada', pt: 'Capa' } },
        helmet: { label: { en: 'Helmet', es: 'Casco', pt: 'Capacete' } },
        suit: { label: { en: 'Suit', es: 'Traje', pt: 'Macacão' } },
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
          description: { en: 'Connection information', es: 'Información de conexiones', pt: 'Informações de conexões' },
          fields: {
            teammates: { label: { en: 'Teammates', es: 'Compañeros', pt: 'Companheiros' } },
            crew: { label: { en: 'Crew', es: 'Equipo', pt: 'Equipe' } },
          },
        },
        associations: {
          name: 'associations',
          label: { en: 'Associations', es: 'Asociaciones', pt: 'Associações' },
          entity: { en: 'Association', es: 'Asociación', pt: 'Associação' },
          description: { en: 'Association information', es: 'Información de asociaciones', pt: 'Informações de associações' },
          fields: {
            cars: { label: { en: 'Cars', es: 'Autos', pt: 'Carros' } },
            kits: { label: { en: 'Kits', es: 'Kits', pt: 'Kits' } },
          },
        },
      },
    },
  },
} as const
