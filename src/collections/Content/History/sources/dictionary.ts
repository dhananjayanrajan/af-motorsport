// FILE: src/collections/Content/Histories/sources/dictionary.ts
export const dictionary = {
  host: { en: 'History', es: 'Historia', pt: 'História' },
  hostPlural: { en: 'Histories', es: 'Historias', pt: 'Histórias' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Scuderia Ferrari History',
      description: { en: 'The history name.', es: 'El nombre de la historia.', pt: 'O nome da história.' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: 'e.g. Ferrari Heritage',
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'The type of history.', es: 'El tipo de historia.', pt: 'O tipo da história.' },
    },
  },
  tabs: {
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Detailed info.', es: 'Info detallada.', pt: 'Info detalhada.' },
      fields: {
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Content of the feature.', es: 'Contenido de la característica.', pt: 'Conteúdo do recurso.' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          fields: {
            narrative: {
              label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' },
              description: { en: 'Primary narrative.', es: 'Narrativa principal.', pt: 'Narrativa principal.' },
            },
            stories: {
              label: { en: 'Stories', es: 'Historias', pt: 'Histórias' },
              description: { en: 'Related stories.', es: 'Historias relacionadas.', pt: 'Histórias relacionadas.' },
            },
          }
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'History traits.', es: 'Rasgos de la historia.', pt: 'Traços da história.' },
      fields: {
        legacy: {
          name: 'legacy',
          label: { en: 'Legacy', es: 'Legado', pt: 'Legado' },
          entity: { en: 'Legacy', es: 'Legado', pt: 'Legado' },
          description: { en: 'History legacy.', es: 'Legado de la historia.', pt: 'Legado da história.' },
          fields: {
            impact: { label: { en: 'Impact', es: 'Impacto', pt: 'Impacto' } },
            memory: { label: { en: 'Memory', es: 'Memoria', pt: 'Memória' } },
            legacy: { label: { en: 'Legacy Statement', es: 'Declaración de legado', pt: 'Declaração de legado' } },
          },
        },
        evolution: {
          name: 'evolution',
          label: { en: 'Evolution', es: 'Evolución', pt: 'Evolução' },
          entity: { en: 'Evolution', es: 'Evolución', pt: 'Evolução' },
          description: { en: 'History evolution.', es: 'Evolución de la historia.', pt: 'Evolução da história.' },
          fields: {
            origin: { label: { en: 'Origin', es: 'Origen', pt: 'Origem' } },
            development: { label: { en: 'Development', es: 'Desarrollo', pt: 'Desenvolvimento' } },
            lineage: { label: { en: 'Lineage', es: 'Linaje', pt: 'Linhagem' } },
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
  },
} as const
