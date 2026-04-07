export const dictionary = {
  host: { en: 'Program', es: 'Programa', pt: 'Programa' },
  hostPlural: { en: 'Programs', es: 'Programas', pt: 'Programas' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Junior Driver Academy', es: 'e.g. Academia de Pilotos Juniors', pt: 'e.g. Academia de Pilotos Juniores' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. JDA_2024', es: 'e.g. ADJ_2024', pt: 'e.g. ADJ_2024' },
    },
  },
  tabs: {
    basics: {
      tagline: {
        label: { en: 'Tagline', es: 'Lema', pt: 'Lema' },
        placeholder: { en: 'e.g. Building Future Champions', es: 'e.g. Construyendo Futuros Campeones', pt: 'e.g. Construindo Futuros Campeões' },
      },
      description: {
        label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
        placeholder: { en: 'Enter description', es: 'Ingrese descripción', pt: 'Insira a descrição' },
      },
    },
    details: {
      objective: { label: { en: 'Objective', es: 'Objetivo', pt: 'Objetivo' } },
      type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' } },
      status: { label: { en: 'Status', es: 'Estado', pt: 'Status' } },
      duration: { label: { en: 'Duration Unit', es: 'Unidad de Duración', pt: 'Unidade de Duração' } },
      start_date: { label: { en: 'Start Date', es: 'Fecha de Inicio', pt: 'Data de Início' } },
      end_date: { label: { en: 'End Date', es: 'Fecha de Fin', pt: 'Data de Término' } },
      budget: { label: { en: 'Budget', es: 'Presupuesto', pt: 'Orçamento' } },
      outcomes: { label: { en: 'Outcomes', es: 'Resultados', pt: 'Resultados' } },
      mentors: { label: { en: 'Mentors', es: 'Mentores', pt: 'Mentores' } },
      participants: { label: { en: 'Participants', es: 'Participantes', pt: 'Participantes' } },
      partners: { label: { en: 'Partners', es: 'Socios', pt: 'Parceiros' } },
      sponsors: { label: { en: 'Sponsors', es: 'Patrocinadores', pt: 'Patrocinadores' } },
      notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
    },
    traits: {
      // Labels handled in groupFactory directly for arrays
    },
    assets: {
      thumbnail: { label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' } },
      cover: { label: { en: 'Cover', es: 'Portada', pt: 'Capa' } },
      gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
      documents: { label: { en: 'Documents', es: 'Documentos', pt: 'Documentos' } },
    },
  },
} as const
