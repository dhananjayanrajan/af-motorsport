export const dictionary = {
  host: { en: 'Initiative', es: 'Iniciativa', pt: 'Iniciativa' },
  hostPlural: { en: 'Initiatives', es: 'Iniciativas', pt: 'Iniciativas' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Project Apex', es: 'e.g. Proyecto Apex', pt: 'e.g. Projeto Apex' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. APEX_24', es: 'e.g. APEX_24', pt: 'e.g. APEX_24' },
    },
  },
  tabs: {
    basics: {
      tagline: {
        label: { en: 'Tagline', es: 'Lema', pt: 'Lema' },
        placeholder: { en: 'Short punchy line', es: 'Línea corta', pt: 'Linha curta' },
      },
      mission: {
        label: { en: 'Mission', es: 'Misión', pt: 'Missão' },
        placeholder: { en: 'Core mission statement', es: 'Declaración de misión', pt: 'Declaração de missão' },
      },
      description: {
        label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
        placeholder: { en: 'Detailed overview', es: 'Visión general detallada', pt: 'Visão geral detalhada' },
      },
    },
    details: {
      start_date: {
        label: { en: 'Start Date', es: 'Fecha de Inicio', pt: 'Data de Início' },
      },
      end_date: {
        label: { en: 'End Date', es: 'Fecha de Fin', pt: 'Data de Término' },
      },
      locations: {
        label: { en: 'Locations', es: 'Ubicaciones', pt: 'Localizações' },
      },
      expectations: {
        type: {
          label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
          options: {
            primary: { en: 'Primary', es: 'Primario', pt: 'Primário' },
            secondary: { en: 'Secondary', es: 'Secundario', pt: 'Secundário' },
            optional: { en: 'Optional', es: 'Opcional', pt: 'Opcional' },
          },
        },
        name: {
          label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
        },
        criteria: {
          label: { en: 'Criteria', es: 'Criterios', pt: 'Critérios' },
        },
        statement: {
          label: { en: 'Statement', es: 'Declaración', pt: 'Declaração' },
        },
      },
    },
    assets: {
      thumbnail: {
        label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' },
      },
      candid: {
        label: { en: 'Candid Photo', es: 'Foto Espontánea', pt: 'Foto Espontânea' },
      },
      cover: {
        label: { en: 'Cover', es: 'Portada', pt: 'Capa' },
      },
      documents: {
        label: { en: 'Documents', es: 'Documentos', pt: 'Documentos' },
      },
    },
  },
} as const