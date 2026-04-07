// FILE: src/collections/Content/Pages/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Page', es: 'Página', pt: 'Página' },
  hostPlural: { en: 'Pages', es: 'Páginas', pt: 'Páginas' },

  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      entity: { en: 'Pages', es: 'Páginas', pt: 'Páginas' },
      description: { en: 'Basic data', es: 'Datos básicos', pt: 'Dados básicos' }
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      entity: { en: 'Pages', es: 'Páginas', pt: 'Páginas' },
      description: { en: 'Detailed data', es: 'Datos detallados', pt: 'Dados detalhados' }
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      entity: { en: 'Pages', es: 'Páginas', pt: 'Páginas' },
      description: { en: 'Traits', es: 'Rasgos', pt: 'Traços' }
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      entity: { en: 'Pages', es: 'Páginas', pt: 'Páginas' },
      description: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' }
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      entity: { en: 'Pages', es: 'Páginas', pt: 'Páginas' },
      description: { en: 'Assets', es: 'Activos', pt: 'Ativos' }
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      entity: { en: 'Pages', es: 'Páginas', pt: 'Páginas' },
      description: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' }
    }
  }
} as const
