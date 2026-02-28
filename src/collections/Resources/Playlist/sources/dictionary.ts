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
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      description: { en: 'Basic info.', es: 'Info básica.', pt: 'Info básica.' },
      fields: {
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Enter description',
        },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Playlist clips and narrative.', es: 'Clips y narrativa de la lista.', pt: 'Clipes e narrativa da playlist.' },
      fields: {
        clips: { label: { en: 'Clips', es: 'Clips', pt: 'Clipes' } },
        videos: { label: { en: 'Videos', es: 'Vídeos', pt: 'Vídeos' } },
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
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      entity: { en: 'Playlist', es: 'Lista de reproducción', pt: 'Playlist' },
      description: { en: 'Related info.', es: 'Info relacionada.', pt: 'Info relacionada.' },
      fields: {
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Content.', es: 'Contenido.', pt: 'Conteúdo.' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          fields: {
            narratives: { label: { en: 'Narratives', es: 'Narrativas', pt: 'Narrativas' } },
          }
        }
      }
    }
  },
} as const
