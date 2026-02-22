// FILE: src/collections/Entities/Individuals/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Individual', es: 'Individuo', pt: 'Indivíduo' },
  hostPlural: { en: 'Individuals', es: 'Individuos', pt: 'Indivíduos' },
  essential: {
    names: {
      name: 'names',
      label: { en: 'Names', es: 'Nombres', pt: 'Nomes' },
      entity: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      description: { en: 'Name information', es: 'Información del nombre', pt: 'Informações de nome' },
      fields: {
        first: { label: { en: 'First Name', es: 'Nombre', pt: 'Nome' }, placeholder: 'e.g. John' },
        middle: { label: { en: 'Middle Name', es: 'Segundo Nombre', pt: 'Nome do Meio' }, placeholder: 'e.g. Quincy' },
        last: { label: { en: 'Last Name', es: 'Apellido', pt: 'Sobrenome' }, placeholder: 'e.g. Adams' },
      },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: 'e.g. Johnny',
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
            nickname: { label: { en: 'Nickname', es: 'Apodo', pt: 'Apelido' }, placeholder: 'e.g. Jay' },
            code: { label: { en: 'Code', es: 'Código', pt: 'Código' } },
            number: { label: { en: 'Number', es: 'Número', pt: 'Número' } },
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
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      fields: {
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
        background: { label: { en: 'Background', es: 'Antecedentes', pt: 'Antecedentes' } },
        interests: {
          label: { en: 'Interests', es: 'Intereses', pt: 'Interesses' },
          description: { en: 'Personal interests.', es: 'Intereses personales.', pt: 'Interesses pessoais.' },
          fields: {
            interest: { label: { en: 'Interest', es: 'Interés', pt: 'Interesse' } },
            level: { label: { en: 'Level', es: 'Nivel', pt: 'Nível' } },
            duration: { label: { en: 'Duration', es: 'Duración', pt: 'Duração' } },
          },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      fields: {
        channels: { label: { en: 'Channels', es: 'Canales', pt: 'Canais' } },
        influence: {
          name: 'influence',
          label: { en: 'Influence', es: 'Influencia', pt: 'Influência' },
          entity: { en: 'Influence', es: 'Influencia', pt: 'Influência' },
          description: { en: 'Network influence.', es: 'Influencia de red.', pt: 'Influência de rede.' },
          fields: {
            reach: { label: { en: 'Reach', es: 'Alcance', pt: 'Alcance' } },
            authority: { label: { en: 'Authority', es: 'Autoridad', pt: 'Autoridade' } },
            network: { label: { en: 'Network', es: 'Red', pt: 'Rede' } },
          },
        },
        benefits: {
          label: { en: 'Benefits', es: 'Beneficios', pt: 'Benefícios' },
          description: { en: 'Member benefits.', es: 'Beneficios de miembro.', pt: 'Benefícios de membro.' },
          fields: {
            benefit: { label: { en: 'Benefit', es: 'Beneficio', pt: 'Benefício' } },
            type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' } },
            impact: { label: { en: 'Impact', es: 'Impacto', pt: 'Impacto' } },
          },
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      fields: {
        avatar: { label: { en: 'Avatar', es: 'Avatar', pt: 'Avatar' } },
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      fields: {
        history: { label: { en: 'History', es: 'Historia', pt: 'História' } },
        notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
      },
    },
  },
} as const
