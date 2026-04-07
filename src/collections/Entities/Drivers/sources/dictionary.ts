export const dictionary = {
  host: { en: 'Driver', es: 'Piloto', pt: 'Piloto' },
  hostPlural: { en: 'Drivers', es: 'Pilotos', pt: 'Pilotos' },
  essential: {
    first_name: {
      label: { en: 'First Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Lewis',
    },
    middle_name: {
      label: { en: 'Middle Name', es: 'Segundo Nombre', pt: 'Nome do Meio' },
      placeholder: 'e.g. Carl',
    },
    last_name: {
      label: { en: 'Last Name', es: 'Apellido', pt: 'Sobrenome' },
      placeholder: 'e.g. Hamilton',
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: 'e.g. Billion Dollar Man',
    },
  },
  tabs: {
    basics: {
      racing_number: { label: { en: 'Racing Number', es: 'Número de Carreras', pt: 'Número de Corrida' } },
      nickname: { label: { en: 'Nickname', es: 'Apodo', pt: 'Apelido' }, placeholder: 'e.g. The Hammer' },
      competition_name: { label: { en: 'Competition Name', es: 'Nombre de Competición', pt: 'Nome de Competição' } },
      callsign: { label: { en: 'Callsign', es: 'Distintivo', pt: 'Callsign' } },
      catchphrase: { label: { en: 'Catchphrase', es: 'Frase Celebre', pt: 'Frase de Efeito' }, placeholder: 'e.g. Get in there Lewis!' },
      birth_date: { label: { en: 'Birth Date', es: 'Fecha de Nacimiento', pt: 'Data de Nascimento' } },
      debut_date: { label: { en: 'Debut Date', es: 'Fecha de Debut', pt: 'Data de Estreia' } },
      retirement_date: { label: { en: 'Retirement Date', es: 'Fecha de Retiro', pt: 'Data de Aposentadoria' } },
      nationality: { label: { en: 'Nationality', es: 'Nacionalidad', pt: 'Nacionalidade' } },
      gender: { label: { en: 'Gender', es: 'Género', pt: 'Gênero' } },
      pronouns: { label: { en: 'Pronouns', es: 'Pronombres', pt: 'Pronomes' }, placeholder: 'e.g. he/him' },
    },
    details: {
      story: { label: { en: 'Story', es: 'Historia', pt: 'História' } },
      biography: { label: { en: 'Biography', es: 'Biografía', pt: 'Biografia' } },
      skills: { label: { en: 'Skills', es: 'Habilidades', pt: 'Habilidades' } },
      points: { label: { en: 'Points', es: 'Puntos', pt: 'Pontos' } },
      results: { label: { en: 'Results', es: 'Resultados', pt: 'Resultados' } },
      awards: { label: { en: 'Awards', es: 'Premios', pt: 'Prêmios' } },
      cars: { label: { en: 'Cars', es: 'Autos', pt: 'Carros' } },
    },
    assets: {
      avatar: { label: { en: 'Avatar', es: 'Avatar', pt: 'Avatar' } },
      autograph: { label: { en: 'Autograph', es: 'Autógrafo', pt: 'Autógrafo' } },
      cover: { label: { en: 'Cover', es: 'Portada', pt: 'Capa' } },
    },
  },
} as const
