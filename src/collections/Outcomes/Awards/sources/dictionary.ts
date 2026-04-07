export const dictionary = {
  host: { en: 'Award', es: 'Premio', pt: 'Prêmio' },
  hostPlural: { en: 'Awards', es: 'Premios', pt: 'Prêmios' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Drivers Championship', es: 'e.g. Campeonato de Pilotos', pt: 'e.g. Campeonato de Pilotos' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. WDC_2024', es: 'e.g. WDC_2024', pt: 'e.g. WDC_2024' },
    },
  },
  tabs: {
    basics: {
      description: {
        label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
        placeholder: { en: 'Brief overview of the award', es: 'Resumen breve del premio', pt: 'Visão geral breve do prêmio' },
      },
    },
    details: {
      story: {
        label: { en: 'Story', es: 'Historia', pt: 'História' },
        placeholder: { en: 'The narrative behind this award', es: 'La narrativa detrás de este premio', pt: 'A narrativa por trás deste prêmio' },
      },
      awarded_date: {
        label: { en: 'Awarded Date', es: 'Fecha de Otorgamiento', pt: 'Data de Premiação' },
      },
      awarded_location: {
        label: { en: 'Awarded Location', es: 'Lugar de Otorgamiento', pt: 'Local de Premiação' },
      },
    },
    assets: {
      thumbnail: {
        label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' },
      },
      candid: {
        label: { en: 'Candid Photo', es: 'Foto Espontánea', pt: 'Foto Espontânea' },
      },
      video: {
        label: { en: 'Video', es: 'Video', pt: 'Vídeo' },
      },
    },
  },
} as const
