export const dictionary = {
  host: { en: 'Story', es: 'Historia', pt: 'História' },
  hostPlural: { en: 'Stories', es: 'Historias', pt: 'Histórias' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. The 1976 Season',
      description: { en: 'The story name.', es: 'El nombre de la historia.', pt: 'O nome da história.' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: 'e.g. 76 Rivalry',
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'The type of story.', es: 'El tipo de historia.', pt: 'O tipo da história.' },
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
          description: { en: 'Primary narrative.', es: 'Narrativa principal.', pt: 'Narrativa principal.' },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Story traits.', es: 'Rasgos de la historia.', pt: 'Traços da história.' },
      fields: {
        concerns: {
          label: { en: 'Concerns', es: 'Inquietudes', pt: 'Preocupações' },
          description: { en: 'Story elements.', es: 'Elementos de la historia.', pt: 'Elementos da história.' },
          fields: {
            conflict: { label: { en: 'Conflict', es: 'Conflicto', pt: 'Conflito' } },
            stakes: { label: { en: 'Stakes', es: 'Apuestas', pt: 'Apostas' } },
            resolution: { label: { en: 'Resolution', es: 'Resolución', pt: 'Resolução' } },
          },
        },
        interactions: {
          label: { en: 'Interactions', es: 'Interacciones', pt: 'Interações' },
          description: { en: 'Character dynamics.', es: 'Dinámicas de personajes.', pt: 'Dinâmicas de personagens.' },
          fields: {
            dynamics: { label: { en: 'Dynamics', es: 'Dinámicas', pt: 'Dinâmicas' } },
            outcome: { label: { en: 'Outcome', es: 'Resultado', pt: 'Resultado' } },
          },
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
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Connections.', es: 'Conexiones.', pt: 'Conexões.' },
      fields: {
        highlights: { label: { en: 'Highlights', es: 'Destacados', pt: 'Destaques' } },
        incidents: { label: { en: 'Incidents', es: 'Incidentes', pt: 'Incidentes' } },
      },
    },
  },
} as const
