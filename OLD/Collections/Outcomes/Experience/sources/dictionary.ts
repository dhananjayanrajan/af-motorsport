// FILE: src/collections/Outcomes/Experiences/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Experience', es: 'Experiencia', pt: 'Experiência' },
  hostPlural: { en: 'Experiences', es: 'Experiencias', pt: 'Experiências' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Lead Aerodynamicist at Red Bull',
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
      description: { en: 'Experience basic details.', es: 'Detalles básicos de la experiencia.', pt: 'Detalhes básicos da experiência.' },
      fields: {
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Experience narrative and details.', es: 'Narrativa y detalles de la experiencia.', pt: 'Narrativa e detalhes da experiência.' },
      fields: {
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Experience content.', es: 'Contenido de la experiencia.', pt: 'Conteúdo da experiência.' },
          fields: {
            narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
            journey: { label: { en: 'Journey', es: 'Trayectoria', pt: 'Jornada' } },
          },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Experience traits and skills.', es: 'Rasgos y habilidades de la experiencia.', pt: 'Traços e habilidades da experiência.' },
      fields: {
        skills: {
          name: 'skills',
          label: { en: 'Skills', es: 'Habilidades', pt: 'Habilidades' },
          entity: { en: 'Skill', es: 'Habilidad', pt: 'Habilidade' },
          description: { en: 'Skills acquired or used.', es: 'Habilidades adquiridas o usadas.', pt: 'Habilidades adquiridas ou usadas.' },
          fields: {
            skill: { label: { en: 'Skill', es: 'Habilidad', pt: 'Habilidade' } },
            proficiency: { label: { en: 'Proficiency', es: 'Competencia', pt: 'Competência' } },
          },
        },
      },
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      description: { en: 'Experience metrics.', es: 'Métricas de la experiencia.', pt: 'Métricas da experiência.' },
      fields: {
        outcomes: {
          name: 'outcomes',
          label: { en: 'Outcomes', es: 'Resultados', pt: 'Resultados' },
          entity: { en: 'Outcome', es: 'Resultado', pt: 'Resultado' },
          description: { en: 'Outcomes of the experience.', es: 'Resultados de la experiencia.', pt: 'Resultados da experiência.' },
          fields: {
            highlights: { label: { en: 'Highlights', es: 'Destacados', pt: 'Destaques' } },
            incidents: { label: { en: 'Incidents', es: 'Incidentes', pt: 'Incidentes' } },
          },
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Experience evidence and media.', es: 'Evidencia y medios de la experiencia.', pt: 'Evidência e mídia da experiência.' },
      fields: {
        evidence: { label: { en: 'Evidence', es: 'Evidencia', pt: 'Evidência' } },
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Experience contexts and relationships.', es: 'Contextos y relaciones de la experiencia.', pt: 'Contextos e relações da experiência.' },
      fields: {
        connections: {
          name: 'connections',
          label: { en: 'Connections', es: 'Conexiones', pt: 'Conexões' },
          entity: { en: 'Connection', es: 'Conexión', pt: 'Conexão' },
          description: { en: 'Connections of the experience.', es: 'Conexiones de la experiencia.', pt: 'Conexões da experiência.' },
          fields: {
            drivers: { label: { en: 'Drivers', es: 'Conductores', pt: 'Condutor' } },
            members: { label: { en: 'Members', es: 'Miembros', pt: 'Membros' } },
            leaders: { label: { en: 'Leaders', es: 'Líderes', pt: 'Líderes' } },
          },
        },
        associations: {
          name: 'associations',
          label: { en: 'Associations', es: 'Asociaciones', pt: 'Associações' },
          entity: { en: 'Association', es: 'Asociación', pt: 'Associação' },
          description: { en: 'Associations of the experience.', es: 'Asociaciones de la experiencia.', pt: 'Associações da experiência.' },
          fields: {
            organizations: { label: { en: 'Organizations', es: 'Organizaciones', pt: 'Organizações' } },
            individuals: { label: { en: 'Individuals', es: 'Individuos', pt: 'Individuos' } },
          },
        }
      },
    },
  },
} as const
