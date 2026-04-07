export const dictionary = {
  host: { en: 'Member', es: 'Miembro', pt: 'Membro' },
  hostPlural: { en: 'Members', es: 'Miembros', pt: 'Membros' },
  essential: {
    first_name: { label: { en: 'First Name', es: 'Nombre', pt: 'Nome' }, placeholder: 'e.g. John' },
    middle_name: { label: { en: 'Middle Name', es: 'Segundo Nombre', pt: 'Nome do Meio' }, placeholder: 'e.g. Michael' },
    last_name: { label: { en: 'Last Name', es: 'Apellido', pt: 'Sobrenome' }, placeholder: 'e.g. Doe' },
    alias: { label: { en: 'Alias', es: 'Alias', pt: 'Alias' }, placeholder: 'e.g. JD' },
  },
  tabs: {
    basics: {
      nickname: { label: { en: 'Nickname', es: 'Apodo', pt: 'Apelido' }, placeholder: 'e.g. The Specialist' },
      description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
      gender: { label: { en: 'Gender', es: 'Género', pt: 'Gênero' } },
      pronouns: { label: { en: 'Pronouns', es: 'Pronombres', pt: 'Pronomes' }, placeholder: 'e.g. he/him' },
      nationality: { label: { en: 'Nationality', es: 'Nacionalidad', pt: 'Nacionalidade' } },
      birth_date: { label: { en: 'Birth Date', es: 'Fecha de Nacimiento', pt: 'Data de Nascimento' } },
      joining_date: { label: { en: 'Joining Date', es: 'Fecha de Ingreso', pt: 'Data de Entrada' } },
      retirement_date: { label: { en: 'Retirement Date', es: 'Fecha de Retiro', pt: 'Data de Aposentadoria' } },
    },
    details: {
      duties: { label: { en: 'Duties', es: 'Deberes', pt: 'Deveres' } },
      skills: { label: { en: 'Skills', es: 'Habilidades', pt: 'Habilidades' } },
      trainings: { label: { en: 'Trainings', es: 'Entrenamientos', pt: 'Treinamentos' } },
      addresses: { label: { en: 'Addresses', es: 'Direcciones', pt: 'Endereços' } },
    },
    assets: {
      avatar: { label: { en: 'Avatar', es: 'Avatar', pt: 'Avatar' } },
      cover: { label: { en: 'Cover', es: 'Portada', pt: 'Capa' } },
    },
  },
} as const
