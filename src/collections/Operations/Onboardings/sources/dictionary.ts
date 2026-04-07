export const dictionary = {
  host: { en: 'Onboarding', es: 'Incorporación', pt: 'Integração' },
  hostPlural: { en: 'Onboardings', es: 'Incorporaciones', pt: 'Integrações' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Driver Onboarding 2024', es: 'e.g. Incorporación de Pilotos 2024', pt: 'e.g. Integração de Pilotos 2024' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. DRV_ONB_24', es: 'e.g. PIL_INC_24', pt: 'e.g. PIL_INT_24' },
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
      type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' } },
      format: { label: { en: 'Format', es: 'Formato', pt: 'Formato' } },
      status: { label: { en: 'Status', es: 'Estado', pt: 'Status' } },
      start_date: { label: { en: 'Start Date', es: 'Fecha de Inicio', pt: 'Data de Início' } },
      end_date: { label: { en: 'End Date', es: 'Fecha de Fin', pt: 'Data de Término' } },
      assigned_to: { label: { en: 'Assigned To', es: 'Asignado A', pt: 'Atribuído A' } },
      assigned_by: { label: { en: 'Assigned By', es: 'Asignado Por', pt: 'Atribuído Por' } },
      feedback: { label: { en: 'Feedback', es: 'Comentarios', pt: 'Feedback' } },
      notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
    },
    traits: {
      // Labels handled in groupFactory directly for arrays
    },
    assets: {
      documents: { label: { en: 'Documents', es: 'Documentos', pt: 'Documentos' } },
      videos: { label: { en: 'Videos', es: 'Videos', pt: 'Vídeos' } },
      completion_certificate: { label: { en: 'Certificate', es: 'Certificado', pt: 'Certificado' } },
      thumbnail: { label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' } },
      cover: { label: { en: 'Cover', es: 'Portada', pt: 'Capa' } },
    },
  },
} as const
