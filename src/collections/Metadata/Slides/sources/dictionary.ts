export const dictionary = {
  host: { en: 'Slide', es: 'Diapositiva', pt: 'Slide' },
  hostPlural: { en: 'Slides', es: 'Diapositivas', pt: 'Slides' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Championship Intro', es: 'e.g. Intro del Campeonato', pt: 'e.g. Intro do Campeonato' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. CHAMP_INTRO', es: 'e.g. CAMP_INTRO', pt: 'e.g. CAMP_INTRO' },
    },
  },
  tabs: {
    basics: {
      description: {
        label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
        placeholder: { en: 'Enter description', es: 'Ingrese descripción', pt: 'Insira a descrição' },
      },
      story: {
        label: { en: 'Story', es: 'Historia', pt: 'História' },
        placeholder: { en: 'Slide narrative', es: 'Narrativa de la diapositiva', pt: 'Narrativa do slide' },
      },
    },
    details: {
      type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' } },
      orientation: { label: { en: 'Orientation', es: 'Orientación', pt: 'Orientação' } },
      template: { label: { en: 'Template', es: 'Plantilla', pt: 'Modelo' } },
      transition: { label: { en: 'Transition', es: 'Transición', pt: 'Transição' } },
      duration: { label: { en: 'Duration (seconds)', es: 'Duración (segundos)', pt: 'Duração (segundos)' } },
      order: { label: { en: 'Order', es: 'Orden', pt: 'Ordem' } },
      notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
    },
    traits: {
      notes: {
        label: { en: 'Internal Notes', es: 'Notas Internas', pt: 'Notas Internas' },
        placeholder: { en: 'Internal production notes', es: 'Notas internas de producción', pt: 'Notas internas de produção' },
      },
    },
    assets: {
      background: { label: { en: 'Background', es: 'Fondo', pt: 'Fundo' } },
      thumbnail: { label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' } },
      foreground: { label: { en: 'Foreground', es: 'Primer Plano', pt: 'Primeiro Plano' } },
    },
  },
} as const
