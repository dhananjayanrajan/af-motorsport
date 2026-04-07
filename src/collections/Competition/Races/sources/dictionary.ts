export const dictionary = {
  host: { en: 'Race', es: 'Carrera', pt: 'Corrida' },
  hostPlural: { en: 'Races', es: 'Carreras', pt: 'Corridas' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Monaco Grand Prix', es: 'e.g. Gran Premio de Mónaco', pt: 'e.g. Grande Prêmio de Mônaco' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. MON_GP', es: 'e.g. MON_GP', pt: 'e.g. MON_GP' },
    },
  },
  tabs: {
    basics: {
      tagline: {
        label: { en: 'Tagline', es: 'Lema', pt: 'Lema' },
        placeholder: { en: 'e.g. The Crown Jewel', es: 'e.g. La Joya de la Corona', pt: 'e.g. A Joia da Coroa' },
      },
      description: {
        label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
        placeholder: { en: 'Enter description', es: 'Ingrese descripción', pt: 'Insira a descrição' },
      },
    },
    details: {
      history: { label: { en: 'History', es: 'Historia', pt: 'História' } },
      type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' } },
      status: { label: { en: 'Status', es: 'Estado', pt: 'Status' } },
      start_date: { label: { en: 'Start Date', es: 'Fecha de Inicio', pt: 'Data de Início' } },
      end_date: { label: { en: 'End Date', es: 'Fecha de Fin', pt: 'Data de Término' } },
      event: { label: { en: 'Event', es: 'Evento', pt: 'Evento' } },
      season: { label: { en: 'Season', es: 'Temporada', pt: 'Temporada' } },
      series: { label: { en: 'Series', es: 'Serie', pt: 'Série' } },
      circuit: { label: { en: 'Circuit', es: 'Circuito', pt: 'Circuito' } },
      laps: { label: { en: 'Laps', es: 'Vueltas', pt: 'Voltas' } },
      distance_km: { label: { en: 'Distance (km)', es: 'Distancia (km)', pt: 'Distância (km)' } },
      winner: { label: { en: 'Winner', es: 'Ganador', pt: 'Vencedor' } },
      pole_position: { label: { en: 'Pole Position', es: 'Pole Position', pt: 'Pole Position' } },
      fastest_lap: { label: { en: 'Fastest Lap', es: 'Vuelta Rápida', pt: 'Volta Mais Rápida' } },
      fastest_lap_time: {
        label: { en: 'Fastest Lap Time', es: 'Tiempo Vuelta Rápida', pt: 'Tempo Volta Mais Rápida' },
        description: { en: 'Format: MM:SS.mmm', es: 'Formato: MM:SS.mmm', pt: 'Formato: MM:SS.mmm' },
      },
      weather: { label: { en: 'Weather', es: 'Clima', pt: 'Clima' } },
      safety_car_periods: { label: { en: 'Safety Car Periods', es: 'Periodos Safety Car', pt: 'Períodos Safety Car' } },
      red_flags: { label: { en: 'Red Flags', es: 'Banderas Rojas', pt: 'Bandeiras Vermelhas' } },
      notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
    },
    assets: {
      thumbnail: { label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' } },
      poster: { label: { en: 'Poster', es: 'Póster', pt: 'Pôster' } },
      cover: { label: { en: 'Cover', es: 'Portada', pt: 'Capa' } },
      gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
      video: { label: { en: 'Video', es: 'Video', pt: 'Vídeo' } },
      highlights: { label: { en: 'Highlights', es: 'Destacados', pt: 'Destaques' } },
      documents: { label: { en: 'Documents', es: 'Documentos', pt: 'Documentos' } },
    },
  },
} as const
