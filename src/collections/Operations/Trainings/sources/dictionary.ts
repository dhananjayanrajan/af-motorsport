export const dictionary = {
  host: { en: 'Training', es: 'Entrenamiento', pt: 'Treinamento' },
  hostPlural: { en: 'Trainings', es: 'Entrenamientos', pt: 'Treinamentos' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Advanced Cornering', es: 'e.g. Curvas Avanzadas', pt: 'e.g. Curvas Avançadas' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. ADV_CORNER', es: 'e.g. CURVA_ADV', pt: 'e.g. CURVA_AVANC' },
    },
  },
  tabs: {
    basics: {
      description: {
        label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
        placeholder: { en: 'Overview of training', es: 'Resumen del entrenamiento', pt: 'Visão geral do treinamento' },
      },
      intensity: {
        label: { en: 'Intensity', es: 'Intensidad', pt: 'Intensidade' },
      },
      format: {
        label: { en: 'Format', es: 'Formato', pt: 'Formato' },
      },
    },
    details: {
      start_date: {
        label: { en: 'Start Date', es: 'Fecha de Inicio', pt: 'Data de Início' },
      },
      end_date: {
        label: { en: 'End Date', es: 'Fecha de Fin', pt: 'Data de Término' },
      },
    },
    assets: {
      gallery: {
        label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' },
      },
    },
  },
} as const
