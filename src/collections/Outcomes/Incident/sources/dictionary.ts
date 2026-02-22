// FILE: src/collections/Outcomes/Incidents/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Incident', es: 'Incidente', pt: 'Incidente' },
  hostPlural: { en: 'Incidents', es: 'Incidentes', pt: 'Incidentes' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Turn 1 Collision',
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
      description: { en: 'Incident basic details.', es: 'Detalles básicos del incidente.', pt: 'Detalhes básicos do incidente.' },
      fields: {
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Incident decisions and specs.', es: 'Decisiones y especificaciones del incidente.', pt: 'Decisões e especificações do incidente.' },
      fields: {
        decisions: { label: { en: 'Decisions', es: 'Decisiones', pt: 'Decisões' } },
        specifications: { label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' } },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Incident impacts.', es: 'Impactos del incidente.', pt: 'Impactos do incidente.' },
      fields: {
        impacts: { label: { en: 'Impacts', es: 'Impactos', pt: 'Impactos' } },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Incident media and archives.', es: 'Medios y archivos del incidente.', pt: 'Mídia e arquivos do incidente.' },
      fields: {
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
        archive: { label: { en: 'Archive', es: 'Archivo', pt: 'Arquivo' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Incident narrative and entities.', es: 'Narrativa y entidades del incidente.', pt: 'Narrativa e entidades do incidente.' },
      fields: {
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
        entities: { label: { en: 'Entities', es: 'Entidades', pt: 'Entidades' } },
      },
    },
  },
} as const
