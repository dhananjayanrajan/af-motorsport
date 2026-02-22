// FILE: src/collections/Entities/Members/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Member', es: 'Miembro', pt: 'Membro' },
  hostPlural: { en: 'Members', es: 'Miembros', pt: 'Membros' },
  essential: {
    names: {
      name: 'names',
      label: { en: 'Names', es: 'Nombres', pt: 'Nomes' },
      entity: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      description: { en: 'Name information', es: 'Información del nombre', pt: 'Informações de nome' },
      fields: {
        first: { label: { en: 'First Name', es: 'Nombre', pt: 'Nome' }, placeholder: 'e.g. Adrian' },
        middle: { label: { en: 'Middle Name', es: 'Segundo Nombre', pt: 'Nome do Meio' }, placeholder: 'e.g. Martin' },
        last: { label: { en: 'Last Name', es: 'Apellido', pt: 'Sobrenome' }, placeholder: 'e.g. Newey' },
      },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: 'e.g. Aero Genius',
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
            number: { label: { en: 'Number', es: 'Número', pt: 'Número' } },
            nickname: { label: { en: 'Nickname', es: 'Apodo', pt: 'Apelido' } },
            callsign: { label: { en: 'Callsign', es: 'Distintivo', pt: 'Callsign' } },
            badge: { label: { en: 'Badge', es: 'Insignia', pt: 'Distintivo' } },
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
        background: { label: { en: 'Background', es: 'Antecedentes', pt: 'Antecedentes' } },
        departments: { label: { en: 'Departments', es: 'Departamentos', pt: 'Departamentos' } },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      fields: {
        channels: { label: { en: 'Channels', es: 'Canales', pt: 'Canais' } },
        personalities: { label: { en: 'Personalities', es: 'Personalidades', pt: 'Personalidades' } },
        duties: { label: { en: 'Duties', es: 'Deberes', pt: 'Deveres' } },
        skills: { label: { en: 'Skills', es: 'Habilidades', pt: 'Habilidades' } },
        trainings: { label: { en: 'Trainings', es: 'Entrenamientos', pt: 'Treinamentos' } },
      },
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      fields: {
        impacts: { label: { en: 'Impacts', es: 'Impactos', pt: 'Impactos' } },
        awards: { label: { en: 'Awards', es: 'Premios', pt: 'Prêmios' } },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      fields: {
        thumbnail: { label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' } },
        cover: { label: { en: 'Cover', es: 'Portada', pt: 'Capa' } },
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
        certifications: { label: { en: 'Certifications', es: 'Certificaciones', pt: 'Certificações' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      fields: {
        mentors: { label: { en: 'Mentors', es: 'Mentores', pt: 'Mentores' } },
        crew: { label: { en: 'Crew', es: 'Equipo', pt: 'Equipe' } },
        cars: { label: { en: 'Cars', es: 'Autos', pt: 'Carros' } },
      },
    },
  },
} as const
