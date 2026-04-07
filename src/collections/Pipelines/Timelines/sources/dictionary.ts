export const dictionary = {
  host: { en: 'Timeline', es: 'Línea de Tiempo', pt: 'Linha do Tempo' },
  hostPlural: { en: 'Timelines', es: 'Líneas de Tiempo', pt: 'Linhas do Tempo' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. 2024 Season Timeline', es: 'e.g. Línea de Tiempo 2024', pt: 'e.g. Linha do Tempo 2024' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. TL_2024', es: 'e.g. LT_2024', pt: 'e.g. LT_2024' },
    },
  },
  tabs: {
    basics: {
      description: {
        label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
        placeholder: { en: 'Enter description', es: 'Ingrese descripción', pt: 'Insira a descrição' },
      },
    },
    details: {
      scope: { label: { en: 'Scope', es: 'Alcance', pt: 'Escopo' } },
      status: { label: { en: 'Status', es: 'Estado', pt: 'Status' } },
      start_date: { label: { en: 'Start Date', es: 'Fecha de Inicio', pt: 'Data de Início' } },
      end_date: { label: { en: 'End Date', es: 'Fecha de Fin', pt: 'Data de Término' } },
      color_scheme: { label: { en: 'Color Scheme', es: 'Esquema de Color', pt: 'Esquema de Cores' } },
      orientation: { label: { en: 'Orientation', es: 'Orientación', pt: 'Orientação' } },
      notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
    },
    traits: {
      // Labels handled in groupFactory directly for arrays
    },
    assets: {
      thumbnail: { label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' } },
      cover: { label: { en: 'Cover', es: 'Portada', pt: 'Capa' } },
      documents: { label: { en: 'Documents', es: 'Documentos', pt: 'Documentos' } },
    },
  },
} as const
