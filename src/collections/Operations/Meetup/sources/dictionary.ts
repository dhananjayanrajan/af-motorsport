// FILE: src/collections/Operations/Meetups/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Meetup', es: 'Encuentro', pt: 'Meetup' },
  hostPlural: { en: 'Meetups', es: 'Encuentros', pt: 'Meetups' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Annual Fan Meetup 2024',
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
      description: { en: 'Meetup basic details and location.', es: 'Detalles básicos y ubicación del encuentro.', pt: 'Detalhes básicos e localização do meetup.' },
      fields: {
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
        date: { label: { en: 'Date', es: 'Fecha', pt: 'Data' } },
        location: { label: { en: 'Location', es: 'Ubicación', pt: 'Localização' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Meetup narrative and features.', es: 'Narrativa y características del encuentro.', pt: 'Narrativa e características do meetup.' },
      fields: {
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
        features: { label: { en: 'Features', es: 'Características', pt: 'Características' } },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Meetup format and access.', es: 'Formato y acceso del encuentro.', pt: 'Formato e acesso do meetup.' },
      fields: {
        specifications: { label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' } },
        format: { label: { en: 'Format', es: 'Formato', pt: 'Formato' } },
        access: { label: { en: 'Access', es: 'Acceso', pt: 'Acesso' } },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Meetup media and materials.', es: 'Medios y materiales del encuentro.', pt: 'Mídia e materiais do meetup.' },
      fields: {
        primary: { label: { en: 'Primary Media', es: 'Medios primarios', pt: 'Mídia primária' } },
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
        playlist: { label: { en: 'Playlist', es: 'Playlist', pt: 'Playlist' } },
        materials: { label: { en: 'Materials', es: 'Materiales', pt: 'Materiais' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Meetup hosts and attendees.', es: 'Anfitriones y asistentes del encuentro.', pt: 'Anfitriões e participantes do meetup.' },
      fields: {
        hosts: { label: { en: 'Hosts', es: 'Anfitriones', pt: 'Anfitriões' } },
        attendees: { label: { en: 'Attendees', es: 'Asistentes', pt: 'Participantes' } },
        schedules: { label: { en: 'Schedules', es: 'Horarios', pt: 'Cronogramas' } },
        references: { label: { en: 'References', es: 'Referencias', pt: 'Referências' } },
        notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
      },
    },
  },
} as const
