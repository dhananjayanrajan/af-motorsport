export const dictionary = {
  host: { en: 'Individual', es: 'Individual', pt: 'Indivíduo' },
  hostPlural: { en: 'Individuals', es: 'Individuales', pt: 'Indivíduos' },
  essential: {
    first_name: {
      label: { en: 'First Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Adrian',
    },
    last_name: {
      label: { en: 'Last Name', es: 'Apellido', pt: 'Sobrenome' },
      placeholder: 'e.g. Newey',
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: 'e.g. AN',
    },
  },
  tabs: {
    basics: {
      type: {
        label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      },
      description: {
        label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
        placeholder: 'Brief context about this individual',
      },
      is_contact: {
        label: { en: 'Is Primary Contact?', es: '¿Es contacto principal?', pt: 'É contato principal?' },
      },
      gender: {
        label: { en: 'Gender', es: 'Género', pt: 'Gênero' },
      },
      pronouns: {
        label: { en: 'Pronouns', es: 'Pronombres', pt: 'Pronomes' },
        placeholder: 'e.g. he/him',
      },
    },
    assets: {
      avatar: {
        label: { en: 'Avatar', es: 'Avatar', pt: 'Avatar' },
      },
      thumbnail: {
        label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' },
      },
    },
  },
} as const
