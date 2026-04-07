// FILE: src/collections/Resources/Kits/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Kit', es: 'Kit', pt: 'Kit' },
  hostPlural: { en: 'Kits', es: 'Kits', pt: 'Kits' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. 2024 Race Suit',
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
      description: { en: 'Kit basic details and purpose.', es: 'Detalles básicos y propósito del kit.', pt: 'Detalhes básicos e propósito do kit.' },
      fields: {
        tagline: {
          label: { en: 'Tagline', es: 'Lema', pt: 'Lema' },
          placeholder: { en: 'e.g. The Hammer', es: 'e.g. El Martillo', pt: 'e.g. O Martelo' },
        },
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
        purpose: {
          name: 'purpose',
          label: { en: 'Purpose', es: 'Propósito', pt: 'Propósito' },
          entity: { en: 'Purpose', es: 'Propósito', pt: 'Propósito' },
          description: { en: 'Kit usage purpose.', es: 'Propósito de uso del kit.', pt: 'Propósito de uso do kit.' },
          fields: {
            application: { label: { en: 'Application', es: 'Aplicación', pt: 'Aplicação' } },
            context: { label: { en: 'Context', es: 'Contexto', pt: 'Contexto' } },
            conditions: { label: { en: 'Conditions', es: 'Condiciones', pt: 'Condições' } },
          },
        },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Kit design and appearance.', es: 'Diseño y apariencia del kit.', pt: 'Design e aparência do kit.' },
      fields: {
        design: {
          name: 'design',
          label: { en: 'Design', es: 'Diseño', pt: 'Design' },
          entity: { en: 'Design', es: 'Diseño', pt: 'Design' },
          description: { en: 'Kit design details.', es: 'Detalles de diseño del kit.', pt: 'Detalhes de design do kit.' },
          fields: {
            concept: { label: { en: 'Concept', es: 'Concepto', pt: 'Conceito' } },
            inspiration: { label: { en: 'Inspiration', es: 'Inspiración', pt: 'Inspiração' } },
            designer: { label: { en: 'Designer', es: 'Diseñador', pt: 'Designer' } },
            year: { label: { en: 'Year', es: 'Año', pt: 'Ano' } },
          },
        },
        appearance: {
          name: 'appearance',
          label: { en: 'Appearance', es: 'Apariencia', pt: 'Aparência' },
          entity: { en: 'Appearance', es: 'Apariencia', pt: 'Aparência' },
          description: { en: 'Visual appearance and branding.', es: 'Apariencia visual y branding.', pt: 'Aparência visual e branding.' },
          fields: {
            colors: { label: { en: 'Colors', es: 'Colores', pt: 'Cores' } },
            branding: { label: { en: 'Branding', es: 'Branding', pt: 'Branding' } },
            style: { label: { en: 'Style', es: 'Estilo', pt: 'Estilo' } },
          },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Kit materials and functionality.', es: 'Materiales y funcionalidad del kit.', pt: 'Materiais e funcionalidade do kit.' },
      fields: {
        composition: {
          name: 'composition',
          label: { en: 'Composition', es: 'Composición', pt: 'Composição' },
          entity: { en: 'Composition', es: 'Composición', pt: 'Composição' },
          description: { en: 'Material and construction composition.', es: 'Composición de material y construcción.', pt: 'Composição de material e construção.' },
          fields: {
            construction: { label: { en: 'Construction', es: 'Construcción', pt: 'Construção' } },
            assembly: { label: { en: 'Assembly', es: 'Ensamblaje', pt: 'Montagem' } },
            finish: { label: { en: 'Finish', es: 'Acabado', pt: 'Acabamento' } },
          },
        },
        functionality: {
          name: 'functionality',
          label: { en: 'Functionality', es: 'Funcionalidad', pt: 'Funcionalidade' },
          entity: { en: 'Functionality', es: 'Funcionalidad', pt: 'Funcionalidade' },
          description: { en: 'Kit functionality ratings.', es: 'Calificaciones de funcionalidad del kit.', pt: 'Classificações de funcionalidade do kit.' },
          fields: {
            performance: { label: { en: 'Performance', es: 'Rendimiento', pt: 'Desempenho' } },
            durability: { label: { en: 'Durability', es: 'Durabilidad', pt: 'Durabilidade' } },
            comfort: { label: { en: 'Comfort', es: 'Comodidad', pt: 'Conforto' } },
          },
        },
        materials: {
          name: 'materials',
          label: { en: 'Materials', es: 'Materiales', pt: 'Materiais' },
          entity: { en: 'Material', es: 'Material', pt: 'Material' },
          description: { en: 'Materials used in the kit.', es: 'Materiales usados en el kit.', pt: 'Materiais usados no kit.' },
          fields: {
            type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' } },
            specification: { label: { en: 'Specification', es: 'Especificación', pt: 'Especificação' } },
            origin: { label: { en: 'Origin', es: 'Origen', pt: 'Origem' } },
          },
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Kit media and visualizations.', es: 'Medios y visualizaciones del kit.', pt: 'Mídia e visualizações do kit.' },
      fields: {
        thumbnail: { label: { en: 'Thumbnail', es: 'Miniatura', pt: 'Miniatura' } },
        cover: { label: { en: 'Cover', es: 'Portada', pt: 'Capa' } },
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
        visualizations: { label: { en: 'Visualizations', es: 'Visualizaciones', pt: 'Visualizações' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Kit relationships and notes.', es: 'Relaciones y notas del kit.', pt: 'Relações e notas do kit.' },
      fields: {
        connections: {
          name: 'connections',
          label: { en: 'Connections', es: 'Conexiones', pt: 'Conexões' },
          entity: { en: 'Connection', es: 'Conexión', pt: 'Conexão' },
          description: { en: 'Connection information', es: 'Información de conexión', pt: 'Informações de conexão' },
          fields: {
            drivers: { label: { en: 'Drivers', es: 'Pilotos', pt: 'Pilotos' } },
            members: { label: { en: 'Members', es: 'Miembros', pt: 'Membros' } },
            leaders: { label: { en: 'Leaders', es: 'Líderes', pt: 'Líderes' } },
            individuals: { label: { en: 'Individuals', es: 'Individuos', pt: 'Indivíduos' } },
          }
        },
        associations: {
          name: 'associations',
          label: { en: 'Associations', es: 'Asociaciones', pt: 'Associações' },
          entity: { en: 'Association', es: 'Asociación', pt: 'Associação' },
          description: { en: 'Association information', es: 'Información de asociación', pt: 'Informações de associação' },
          fields: {
            organizations: { label: { en: 'Organizations', es: 'Organizaciones', pt: 'Organizações' } },
            individuals: { label: { en: 'Individuals', es: 'Individuos', pt: 'Indivíduos' } },
          }
        },
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Content.', es: 'Contenido.', pt: 'Conteúdo.' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          fields: {
            notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
          }
        }
      },
    },
  },
} as const
