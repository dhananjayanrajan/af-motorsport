export const dictionary = {
  host: { en: 'Team', es: 'Equipo', pt: 'Equipe' },
  hostPlural: { en: 'Teams', es: 'Equipos', pt: 'Equipes' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Mercedes-AMG Petronas', es: 'e.g. Mercedes-AMG Petronas', pt: 'e.g. Mercedes-AMG Petronas' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. MERC', es: 'e.g. MERC', pt: 'e.g. MERC' },
    },
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      fields: {
        tagline: {
          label: { en: 'Tagline', es: 'Lema', pt: 'Lema' },
          placeholder: { en: 'e.g. The Silver Arrows', es: 'e.g. Las Flechas de Plata', pt: 'e.g. As Flechas de Prata' },
        },
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: { en: 'Enter description', es: 'Ingrese descripción', pt: 'Insira a descrição' },
        },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      fields: {
        history: {
          label: { en: 'History', es: 'Historia', pt: 'História' },
          placeholder: { en: 'Enter team history', es: 'Ingrese historia del equipo', pt: 'Insira a história da equipe' },
        },
        country: {
          label: { en: 'Country', es: 'País', pt: 'País' },
        },
        start_date: {
          label: { en: 'Start Date', es: 'Fecha de Inicio', pt: 'Data de Início' },
        },
        end_date: {
          label: { en: 'End Date', es: 'Fecha de Fin', pt: 'Data de Término' },
        },
        website: {
          label: { en: 'Website', es: 'Sitio Web', pt: 'Site' },
          placeholder: { en: 'e.g. https://www.mercedes-amg.com', es: 'e.g. https://www.mercedes-amg.com', pt: 'e.g. https://www.mercedes-amg.com' },
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      fields: {
        logo: {
          label: { en: 'Logo', es: 'Logotipo', pt: 'Logotipo' },
        },
        cover: {
          label: { en: 'Cover', es: 'Portada', pt: 'Capa' },
        },
        gallery: {
          label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' },
        },
      },
    },
  },
} as const
