export const dictionary = {
  host: { en: 'Leader', es: 'Líder', pt: 'Líder' },
  hostPlural: { en: 'Leaders', es: 'Líderes', pt: 'Líderes' },
  essential: {
    first_name: {
      label: { en: 'First Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Toto',
    },
    middle_name: {
      label: { en: 'Middle Name', es: 'Segundo Nombre', pt: 'Nome do Meio' },
      placeholder: 'e.g. Wolfgang',
    },
    last_name: {
      label: { en: 'Last Name', es: 'Apellido', pt: 'Sobrenome' },
      placeholder: 'e.g. Wolff',
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: 'e.g. TW',
    },
  },
  tabs: {
    basics: {
      nickname: { label: { en: 'Nickname', es: 'Apodo', pt: 'Apelido' }, placeholder: 'e.g. The Strategist' },
      title: { label: { en: 'Title', es: 'Título', pt: 'Título' }, placeholder: 'e.g. Team Principal' },
      gender: { label: { en: 'Gender', es: 'Género', pt: 'Gênero' } },
      nationality: { label: { en: 'Nationality', es: 'Nacionalidad', pt: 'Nacionalidade' } },
      birth_date: { label: { en: 'Birth Date', es: 'Fecha de Nacimiento', pt: 'Data de Nascimento' } },
      debut_date: { label: { en: 'Debut Date', es: 'Fecha de Debut', pt: 'Data de Estreia' } },
      retirement_date: { label: { en: 'Retirement Date', es: 'Fecha de Retiro', pt: 'Data de Aposentadoria' } },
    },
    details: {
      vision: { label: { en: 'Vision', es: 'Visión', pt: 'Visão' } },
      mission: { label: { en: 'Mission', es: 'Misión', pt: 'Missão' } },
      quote: { label: { en: 'Quote', es: 'Cita', pt: 'Citação' } },
      designations: { label: { en: 'Designations', es: 'Designaciones', pt: 'Designações' } },
      biography: { label: { en: 'Biography', es: 'Biografía', pt: 'Biografia' } },
      history: { label: { en: 'History', es: 'Historia', pt: 'História' } },
      awards: { label: { en: 'Awards', es: 'Premios', pt: 'Prêmios' } },
    },
    assets: {
      avatar: { label: { en: 'Avatar', es: 'Avatar', pt: 'Avatar' } },
      cover: { label: { en: 'Cover', es: 'Portada', pt: 'Capa' } },
      gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
    },
  },
} as const
