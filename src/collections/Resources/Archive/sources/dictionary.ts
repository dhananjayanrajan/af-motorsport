// FILE: src/collections/Resources/Archives/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Archive', es: 'Archivo', pt: 'Arquivo' },
  hostPlural: { en: 'Archives', es: 'Archivos', pt: 'Arquivos' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. 2024 Technical Manuals',
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
    },
  },
  tabs: {
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Archive documents and narrative.', es: 'Documentos y narrativa del archivo.', pt: 'Documentos e narrativa do arquivo.' },
      fields: {
        samples: { label: { en: 'Samples', es: 'Muestras', pt: 'Amostras' } },
        documents: { label: { en: 'Documents', es: 'Documentos', pt: 'Documentos' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      entity: { en: 'Archive', es: 'Archivo', pt: 'Arquivo' },
      description: { en: 'Related info.', es: 'Info relacionada.', pt: 'Info relacionada.' },
      fields: {
        narratives: { label: { en: 'Narratives', es: 'Narrativas', pt: 'Narrativas' } },
      }
    }
  },
} as const
