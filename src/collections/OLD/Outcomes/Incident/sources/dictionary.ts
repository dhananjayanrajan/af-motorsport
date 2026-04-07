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
        attributes: {
          name: 'attributes',
          label: { en: 'Attributes', es: 'Atributos', pt: 'Atributos' },
          entity: { en: 'Attribute', es: 'Atributo', pt: 'Atributo' },
          description: { en: 'Incident attributes.', es: 'Atributos del incidente.', pt: 'Atributos do incidente.' },
          fields: {
            specifications: { label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' } },
          },
        },
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Incident content.', es: 'Contenido del incidente.', pt: 'Conteúdo do incidente.' },
          fields: {
            narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
          },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Incident impacts.', es: 'Impactos del incidente.', pt: 'Impactos do incidente.' },
      fields: {
        outcomes: {
          name: 'outcomes',
          label: { en: 'Outcomes', es: 'Resultados', pt: 'Resultados' },
          entity: { en: 'Outcome', es: 'Resultado', pt: 'Resultado' },
          description: { en: 'Incident outcomes.', es: 'Resultados del incidente.', pt: 'Resultados do incidente.' },
          fields: {
            decisions: { label: { en: 'Decisions', es: 'Decisiones', pt: 'Decisões' } },
            impacts: { label: { en: 'Impacts', es: 'Impactos', pt: 'Impactos' } },
          },
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Incident media and archives.', es: 'Medios y archivos del incidente.', pt: 'Mídia e arquivos do incidente.' },
      fields: {
        thumbnail: { label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' } },
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
        archive: { label: { en: 'Archive', es: 'Archivo', pt: 'Arquivo' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Incident narrative and entities.', es: 'Narrativa y entidades del incidente.', pt: 'Narrativa e entidades do incidente.' },
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
        },
        references: {
          name: 'references',
          label: { en: 'References', es: 'Referencias', pt: 'Referências' },
          entity: { en: 'Reference', es: 'Referencia', pt: 'Referência' },
          description: { en: 'References of the experience.', es: 'Referencias de la experiencia.', pt: 'Referências da experiência.' },
          fields: {
            cars: { label: { en: 'Cars', es: 'Autos', pt: 'Carros' } },
            kits: { label: { en: 'Kits', es: 'Kit', pt: 'Kit' } },
          }
        }
      },
    },
  },
} as const
