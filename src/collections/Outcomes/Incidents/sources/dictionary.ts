export const dictionary = {
  host: { en: 'Incident', es: 'Incidente', pt: 'Incidente' },
  hostPlural: { en: 'Incidents', es: 'Incidentes', pt: 'Incidentes' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Turn 1 Collision', es: 'e.g. Colisión Curva 1', pt: 'e.g. Colisão Curva 1' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. T1_COLL_LAP12', es: 'e.g. T1_COL_LAP12', pt: 'e.g. T1_COL_VOLTA12' },
    },
  },
  tabs: {
    basics: {
      description: {
        label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
        placeholder: { en: 'Brief overview of the incident', es: 'Resumen breve del incidente', pt: 'Visão geral breve do incidente' },
      },
    },
    details: {
      date_time: {
        label: { en: 'Date & Time', es: 'Fecha y Hora', pt: 'Data e Hora' },
      },
      story: {
        label: { en: 'Story', es: 'Historia', pt: 'História' },
        placeholder: { en: 'Detailed account of the incident', es: 'Relato detallado del incidente', pt: 'Relato detalhado do incidente' },
      },
      location: {
        label: { en: 'Location', es: 'Ubicación', pt: 'Localização' },
      },
      cars: {
        label: { en: 'Cars Involved', es: 'Autos Involucrados', pt: 'Carros Envolvidos' },
      },
      drivers: {
        label: { en: 'Drivers Involved', es: 'Pilotos Involucrados', pt: 'Pilotos Envolvidos' },
      },
    },
    assets: {
      thumbnail: {
        label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' },
      },
      video: {
        label: { en: 'Video', es: 'Video', pt: 'Vídeo' },
      },
      gallery: {
        label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' },
      },
    },
  },
} as const
