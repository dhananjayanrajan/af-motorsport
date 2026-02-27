// FILE: src/collections/Resources/Cars/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Car', es: 'Coche', pt: 'Carro' },
  hostPlural: { en: 'Cars', es: 'Coches', pt: 'Carros' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Red Bull RB19',
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
      description: { en: 'Car basic details.', es: 'Detalles básicos del coche.', pt: 'Detalhes básicos do carro.' },
      fields: {
        identifiers: {
          name: 'identifiers',
          label: { en: 'Identifiers', es: 'Identificadores', pt: 'Identificadores' },
          entity: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
          description: { en: 'Car identification details.', es: 'Detalles de identificación del coche.', pt: 'Detalhes de identificação do carro.' },
          fields: {
            chassis: { label: { en: 'Chassis', es: 'Chasis', pt: 'Chassi' } },
            model: { label: { en: 'Model', es: 'Modelo', pt: 'Modelo' } },
            version: { label: { en: 'Version', es: 'Versión', pt: 'Versão' } },
            code: { label: { en: 'Code', es: 'Código', pt: 'Código' } },
          },
        },
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Car classifications and details.', es: 'Clasificaciones y detalles del coche.', pt: 'Classificações e detalhes do carro.' },
      fields: {
        status: { label: { en: 'Status', es: 'Estado', pt: 'Estado' } },
        classifications: { label: { en: 'Classifications', es: 'Clasificaciones', pt: 'Classificações' } },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Car status and specifications.', es: 'Estado y especificaciones del coche.', pt: 'Status e especificações do carro.' },
      fields: {
        features: { label: { en: 'Feature', es: 'Característica', pt: 'Característica' } },
        specifications: { label: { en: 'Specification', es: 'Especificación', pt: 'Especificação' } },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Car media and documentation.', es: 'Medios y documentación del coche.', pt: 'Mídia e documentação do carro.' },
      fields: {
        primary: { label: { en: 'Primary Media', es: 'Medios primarios', pt: 'Mídia primária' } },
        cover: { label: { en: 'Cover Media', es: 'Medios de portada', pt: 'Mídia de capa' } },
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
        playlist: { label: { en: 'Playlist', es: 'Playlist', pt: 'Playlist' } },
        visualization: { label: { en: 'Visualization', es: 'Visualización', pt: 'Visualização' } },
        documents: { label: { en: 'Documents', es: 'Documentos', pt: 'Documentos' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Car relationships and history.', es: 'Relaciones e historia del coche.', pt: 'Relações e história do carro.' },
      fields: {
        connections: {
          name: 'connections',
          label: { en: 'Connections', es: 'Conexiones', pt: 'Conexões' },
          description: { en: 'Car relationships.', es: 'Relaciones del coche.', pt: 'Relações do carro.' },
          entity: { en: 'Connection', es: 'Conexión', pt: 'Conexão' },
          fields: {
            manufacturers: { label: { en: 'Manufacturers', es: 'Fabricantes', pt: 'Fabricantes' } },
            drivers: { label: { en: 'Drivers', es: 'Pilotos', pt: 'Pilotos' } },
            crew: { label: { en: 'Crew', es: 'Tripulación', pt: 'Equipe' } },
          }
        },
        associations: {
          name: 'associations',
          label: { en: 'Associations', es: 'Asociaciones', pt: 'Associações' },
          entity: { en: 'Association', es: 'Asociación', pt: 'Associação' },
          description: { en: 'Association information', es: 'Información de asociación', pt: 'Informações de associação' },
          fields: {
            organizations: { label: { en: 'Organizations', es: 'Organizaciones', pt: 'Organizações' } },
            leaders: { label: { en: 'Leaders', es: 'Líderes', pt: 'Líderes' } },
            individuals: { label: { en: 'Individuals', es: 'Individuos', pt: 'Indivíduos' } },
          }
        },
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Content.', es: 'Contenido.', pt: 'Conteúdo.' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          fields: {
            history: { label: { en: 'History', es: 'Historia', pt: 'História' } },
          }
        }
      },
    },
  },
} as const
