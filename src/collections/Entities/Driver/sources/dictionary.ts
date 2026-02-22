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
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      fields: {
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
        biography: { label: { en: 'Biography', es: 'Biografía', pt: 'Biografia' } },
        journeys: { label: { en: 'Journeys', es: 'Trayectorias', pt: 'Jornadas' } },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      fields: {
        channels: { label: { en: 'Channels', es: 'Canales', pt: 'Canais' } },
        experiences: { label: { en: 'Experiences', es: 'Experiencias', pt: 'Experiências' } },
        skills: { label: { en: 'Skills', es: 'Habilidades', pt: 'Habilidades' } },
        trainings: { label: { en: 'Trainings', es: 'Entrenamientos', pt: 'Treinamentos' } },
      },
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      fields: {
        results: { label: { en: 'Results', es: 'Resultados', pt: 'Resultados' } },
        points: { label: { en: 'Points', es: 'Puntos', pt: 'Pontos' } },
        awards: { label: { en: 'Awards', es: 'Premios', pt: 'Prêmios' } },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      fields: {
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
        teammates: { label: { en: 'Teammates', es: 'Compañeros', pt: 'Companheiros' } },
        crew: { label: { en: 'Crew', es: 'Equipo', pt: 'Equipe' } },
        cars: { label: { en: 'Cars', es: 'Autos', pt: 'Carros' } },
        kits: { label: { en: 'Kits', es: 'Kits', pt: 'Kits' } },
      },
    },
  },
} as const
