export const dictionary = {
  host: { en: 'Journey', es: 'Trayectoria', pt: 'Jornada' },
  hostPlural: { en: 'Journeys', es: 'Trayectorias', pt: 'Jornadas' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Career at Ferrari',
      description: { en: 'The journey name.', es: 'El nombre de la trayectoria.', pt: 'O nome da jornada.' },
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'The type of journey.', es: 'El tipo de trayectoria.', pt: 'O tipo da jornada.' },
    },
  },
  tabs: {
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Detailed info.', es: 'Info detallada.', pt: 'Info detalhada.' },
      fields: {
        narrative: {
          label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' },
        },
        stories: {
          label: { en: 'Stories', es: 'Historias', pt: 'Histórias' },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Journey traits.', es: 'Rasgos de la trayectoria.', pt: 'Traços da jornada.' },
      fields: {
        lessons: {
          label: { en: 'Lessons', es: 'Lecciones', pt: 'Lições' },
          description: { en: 'Key takeaways.', es: 'Lecciones aprendidas.', pt: 'Lições aprendidas.' },
          fields: {
            lesson: { label: { en: 'Lesson', es: 'Lección', pt: 'Lição' } },
            significance: { label: { en: 'Significance', es: 'Significancia', pt: 'Significância' } },
            application: { label: { en: 'Application', es: 'Aplicación', pt: 'Aplicação' } },
            impact: { label: { en: 'Impact', es: 'Impacto', pt: 'Impacto' } },
          },
        },
        decisions: {
          label: { en: 'Decisions', es: 'Decisiones', pt: 'Decisões' },
        },
        impacts: {
          label: { en: 'Impacts', es: 'Impactos', pt: 'Impactos' },
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Visual assets.', es: 'Activos visuales.', pt: 'Ativos visuais.' },
      fields: {
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
        playlist: { label: { en: 'Playlist', es: 'Lista de reproducción', pt: 'Playlist' } },
      },
    },
  },
} as const
