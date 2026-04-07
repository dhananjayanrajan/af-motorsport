export const dictionary = {
  host: { en: 'Vacancy', es: 'Vacante', pt: 'Vaga' },
  hostPlural: { en: 'Vacancies', es: 'Vacantes', pt: 'Vagas' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Senior Engineer', es: 'e.g. Ingeniero Senior', pt: 'e.g. Engenheiro Sênior' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. SR_ENG', es: 'e.g. ING_SR', pt: 'e.g. ENG_SR' },
    },
  },
  tabs: {
    basics: {
      title: {
        label: { en: 'Job Title', es: 'Título del Puesto', pt: 'Cargo' },
        placeholder: { en: 'e.g. Lead Aerodynamicist', es: 'e.g. Aerodinamista Jefe', pt: 'e.g. Aerodinamicista Chefe' },
      },
      description: {
        label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
        placeholder: { en: 'Full job description', es: 'Descripción completa', pt: 'Descrição completa' },
      },
    },
    details: {
      department: {
        label: { en: 'Department', es: 'Departamento', pt: 'Departamento' },
      },
      contract: {
        label: { en: 'Contract Type', es: 'Tipo de Contrato', pt: 'Tipo de Contrato' },
      },
      locations: {
        label: { en: 'Locations', es: 'Ubicaciones', pt: 'Localizações' },
      },
    },
    assets: {
      thumbnail: {
        label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' },
      },
    },
  },
} as const
