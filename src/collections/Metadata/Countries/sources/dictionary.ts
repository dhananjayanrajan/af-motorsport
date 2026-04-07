export const dictionary = {
  host: { en: 'Country', es: 'País', pt: 'País' },
  hostPlural: { en: 'Countries', es: 'Países', pt: 'Países' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. United Kingdom', es: 'e.g. Reino Unido', pt: 'e.g. Reino Unido' },
    },
    code: {
      label: { en: 'ISO Code', es: 'Código ISO', pt: 'Código ISO' },
      placeholder: { en: 'e.g. GB', es: 'e.g. GB', pt: 'e.g. GB' },
    },
  },
  tabs: {
    basics: {
      flag: {
        label: { en: 'Flag', es: 'Bandera', pt: 'Bandeira' },
      },
      description: {
        label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
        placeholder: { en: 'Optional context', es: 'Contexto opcional', pt: 'Contexto opcional' },
      },
    },
  },
} as const
