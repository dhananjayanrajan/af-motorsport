// FILE: src/collections/Resources/Playlists/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Playlist', es: 'Lista de reproducción', pt: 'Playlist' },
  hostPlural: { en: 'Playlists', es: 'Listas de reproducción', pt: 'Playlists' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. 2024 Season Highlights',
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
      description: { en: 'Playlist clips and narrative.', es: 'Clips y narrativa de la lista.', pt: 'Clipes e narrativa da playlist.' },
      fields: {
        clips: { label: { en: 'Clips', es: 'Clips', pt: 'Clipes' } },
        videos: { label: { en: 'Videos', es: 'Vídeos', pt: 'Vídeos' } },
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Playlist quality and format.', es: 'Calidad y formato de la lista.', pt: 'Qualidade e formato da playlist.' },
      fields: {
        quality: { label: { en: 'Quality', es: 'Calidad', pt: 'Qualidade' } },
        format: { label: { en: 'Format', es: 'Formato', pt: 'Formato' } },
      },
    },
  },
} as const
