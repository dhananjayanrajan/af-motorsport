export const dictionary = {
  host: { en: 'Circuit', es: 'Circuito', pt: 'Circuito' },
  hostPlural: { en: 'Circuits', es: 'Circuitos', pt: 'Circuitos' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Circuit de Monaco', es: 'e.g. Circuito de Mónaco', pt: 'e.g. Circuito de Mônaco' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. MON', es: 'e.g. MON', pt: 'e.g. MON' },
    },
  },
  tabs: {
    basics: {
      tagline: {
        label: { en: 'Tagline', es: 'Lema', pt: 'Lema' },
        placeholder: { en: 'e.g. The Jewel in the Crown', es: 'e.g. La Joya de la Corona', pt: 'e.g. A Joia da Coroa' },
      },
      description: {
        label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
        placeholder: { en: 'Enter description', es: 'Ingrese descripción', pt: 'Insira a descrição' },
      },
    },
    details: {
      type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' } },
      length_km: { label: { en: 'Length (km)', es: 'Longitud (km)', pt: 'Comprimento (km)' } },
      length_miles: { label: { en: 'Length (miles)', es: 'Longitud (millas)', pt: 'Comprimento (milhas)' } },
      turns: { label: { en: 'Turns', es: 'Curvas', pt: 'Curvas' } },
      drs_zones: { label: { en: 'DRS Zones', es: 'Zonas DRS', pt: 'Zonas DRS' } },
      direction: { label: { en: 'Direction', es: 'Dirección', pt: 'Direção' } },
      fia_grade: { label: { en: 'FIA Grade', es: 'Grado FIA', pt: 'Grau FIA' } },
      elevation_change: { label: { en: 'Elevation Change (m)', es: 'Desnivel (m)', pt: 'Desnível (m)' } },
      capacity: { label: { en: 'Capacity', es: 'Capacidad', pt: 'Capacidade' } },
      location: { label: { en: 'Location', es: 'Ubicación', pt: 'Localização' } },
      address: { label: { en: 'Address', es: 'Dirección', pt: 'Endereço' } },
      country: { label: { en: 'Country', es: 'País', pt: 'País' } },
      opened: { label: { en: 'Opened', es: 'Inaugurado', pt: 'Inaugurado' } },
      closed: { label: { en: 'Closed', es: 'Cerrado', pt: 'Fechado' } },
      owner: { label: { en: 'Owner', es: 'Propietario', pt: 'Proprietário' } },
      operator: { label: { en: 'Operator', es: 'Operador', pt: 'Operador' } },
      website: { label: { en: 'Website', es: 'Sitio Web', pt: 'Site' } },
      history: { label: { en: 'History', es: 'Historia', pt: 'História' } },
      notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
    },
    metrics: {
      record_lap_time: {
        label: { en: 'Record Lap Time', es: 'Tiempo Récord', pt: 'Tempo Recorde' },
        description: { en: 'Format: MM:SS.mmm', es: 'Formato: MM:SS.mmm', pt: 'Formato: MM:SS.mmm' },
      },
      record_lap_driver: { label: { en: 'Record Holder', es: 'Poseedor del Récord', pt: 'Detentor do Recorde' } },
      record_lap_year: { label: { en: 'Record Year', es: 'Año del Récord', pt: 'Ano do Recorde' } },
    },
    assets: {
      thumbnail: { label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' } },
      cover: { label: { en: 'Cover', es: 'Portada', pt: 'Capa' } },
      gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
      circuit_map: { label: { en: 'Circuit Map', es: 'Mapa del Circuito', pt: 'Mapa do Circuito' } },
      video: { label: { en: 'Video', es: 'Video', pt: 'Vídeo' } },
      documents: { label: { en: 'Documents', es: 'Documentos', pt: 'Documentos' } },
    },
  },
} as const
