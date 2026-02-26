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
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
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
        departments: { label: { en: 'Departments', es: 'Departamentos', pt: 'Departamentos' } },
        about: {
          name: 'about',
          label: { en: 'About', es: 'Sobre', pt: 'Sobre' },
          entity: { en: 'About', es: 'Sobre', pt: 'Sobre' },
          description: { en: 'About information', es: 'Información sobre', pt: 'Informações sobre' },
          fields: {
            narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
            background: { label: { en: 'Background', es: 'Antecedentes', pt: 'Antecedentes' } },
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
        qualifications: {
          name: 'qualifications',
          label: { en: 'Qualifications', es: 'Calificaciones', pt: 'Qualificações' },
          entity: { en: 'Qualification', es: 'Calificación', pt: 'Qualificação' },
          description: { en: 'Qualification data', es: 'Datos de calificación', pt: 'Dados de qualificação' },
          fields: {
            duties: { label: { en: 'Duties', es: 'Deberes', pt: 'Deveres' } },
            skills: { label: { en: 'Skills', es: 'Habilidades', pt: 'Habilidades' } },
            trainings: { label: { en: 'Trainings', es: 'Entrenamientos', pt: 'Treinamentos' } },
            certifications: { label: { en: 'Certifications', es: 'Certificaciones', pt: 'Certificações' } },
          },
        },
        outcomes: {
          name: 'outcomes',
          label: { en: 'Outcomes', es: 'Resultados', pt: 'Resultados' },
          entity: { en: 'Outcome', es: 'Resultado', pt: 'Resultado' },
          description: { en: 'Outcome information', es: 'Información de resultados', pt: 'Informações de resultados' },
          fields: {
            impacts: { label: { en: 'Impacts', es: 'Impactos', pt: 'Impactos' } },
            awards: { label: { en: 'Awards', es: 'Premios', pt: 'Prêmios' } },
          }
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      fields: {
        thumbnail: { label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' } },
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
            mentors: { label: { en: 'Mentors', es: 'Mentores', pt: 'Mentores' } },
            crew: { label: { en: 'Crew', es: 'Equipo', pt: 'Equipe' } },
          },
        },
        associations: {
          name: 'associations',
          label: { en: 'Associations', es: 'Asociaciones', pt: 'Associações' },
          entity: { en: 'Association', es: 'Asociación', pt: 'Associação' },
          description: { en: 'Association information', es: 'Información de asociación', pt: 'Informações de associação' },
          fields: {
            cars: { label: { en: 'Cars', es: 'Autos', pt: 'Carros' } },
          }
        }
      },
    },
  },
} as const
