// FILE: src/collections/Attributes/Locations/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Location', es: 'Ubicación', pt: 'Localização' },
  hostPlural: { en: 'Locations', es: 'Ubicaciones', pt: 'Localizações' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Silverstone Circuit',
      description: { en: 'The name of the location.', es: 'El nombre de la ubicación.', pt: 'O nome da localização.' }
    },
    label: {
      label: { en: 'Label', es: 'Etiqueta', pt: 'Rótulo' },
      placeholder: 'e.g. Home of British Motor Racing',
      description: { en: 'A short label.', es: 'Una etiqueta corta.', pt: 'Um rótulo curto.' }
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'The type of location.', es: 'El tipo de ubicación.', pt: 'O tipo de localização.' }
    }
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      entity: { en: 'Location', es: 'Ubicación', pt: 'Localização' },
      description: { en: 'Basic information.', es: 'Información básica.', pt: 'Informações básicas.' },
      fields: {
        title: {
          label: { en: 'Title', es: 'Título', pt: 'Título' },
          placeholder: 'e.g. Silverstone',
          description: { en: 'Display title.', es: 'Título para mostrar.', pt: 'Título de exibição.' }
        },
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Enter description',
          description: { en: 'Brief description.', es: 'Breve descripción.', pt: 'Breve descrição.' } // Corrected to text description per generic
        }
      }
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      entity: { en: 'Location', es: 'Ubicación', pt: 'Localização' },
      description: { en: 'Detailed information.', es: 'Información detallada.', pt: 'Informações detalhadas.' },
      fields: {
        address: {
          label: { en: 'Address', es: 'Dirección', pt: 'Endereço' },
          placeholder: 'Enter full address',
          description: { en: 'Full address.', es: 'Dirección completa.', pt: 'Endereço completo.' }
        },
        geometry: {
          name: 'geometry',
          label: { en: 'Geometry', es: 'Geometría', pt: 'Geometria' },
          entity: { en: 'Geometry', es: 'Geometría', pt: 'Geometria' },
          description: { en: 'Geometric data.', es: 'Datos geométricos.', pt: 'Dados geométricos.' },
          fields: {
            coordinates: {
              label: { en: 'Coordinates', es: 'Coordenadas', pt: 'Coordenadas' },
              description: { en: 'Location coordinates.', es: 'Coordenadas de ubicación.', pt: 'Coordenadas de localização.' }
            },
            bounds: {
              label: { en: 'Bounds', es: 'Límites', pt: 'Limites' },
              placeholder: 'e.g. [x,y,w,h]',
              description: { en: 'Geographic bounds.', es: 'Límites geográficos.', pt: 'Limites geográficos.' }
            },
            area: {
              label: { en: 'Area', es: 'Área', pt: 'Área' },
              placeholder: 'e.g. 500 acres',
              description: { en: 'Total area.', es: 'Área total.', pt: 'Área total.' }
            }
          }
        }
      }
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      entity: { en: 'Location', es: 'Ubicación', pt: 'Localização' },
      description: { en: 'Location traits.', es: 'Rasgos de ubicación.', pt: 'Traços de localização.' },
      geography: {
        name: 'geography',
        label: { en: 'Geography', es: 'Geografía', pt: 'Geografia' },
        entity: { en: 'Geography', es: 'Geografía', pt: 'Geografia' },
        description: { en: 'Geographic features.', es: 'Características geográficas.', pt: 'Características geográficas.' },
        fields: {
          terrain: {
            label: { en: 'Terrain', es: 'Terreno', pt: 'Terreno' },
            placeholder: 'e.g. Flat, Hilly',
            description: { en: 'Terrain type.', es: 'Tipo de terreno.', pt: 'Tipo de terreno.' }
          },
          climate: {
            label: { en: 'Climate', es: 'Clima', pt: 'Clima' },
            placeholder: 'Select climate',
            description: { en: 'Climate zone.', es: 'Zona climática.', pt: 'Zona climática.' }
          },
          features: {
            label: { en: 'Features', es: 'Características', pt: 'Características' },
            placeholder: 'e.g. Lake, Forest',
            description: { en: 'Natural features.', es: 'Características naturales.', pt: 'Características naturais.' }
          }
        }
      },
      infrastructure: {
        name: 'infrastructure',
        label: { en: 'Infrastructure', es: 'Infraestructura', pt: 'Infraestrutura' },
        entity: { en: 'Infrastructure', es: 'Infraestructura', pt: 'Infraestrutura' },
        description: { en: 'Infrastructure details.', es: 'Detalles de infraestructura.', pt: 'Detalhes da infraestrutura.' },
        fields: {
          transport: {
            label: { en: 'Transport', es: 'Transporte', pt: 'Transporte' },
            placeholder: 'e.g. Helipad, Train Station',
            description: { en: 'Transport links.', es: 'Enlaces de transporte.', pt: 'Links de transporte.' }
          },
          facilities: {
            label: { en: 'Facilities', es: 'Instalaciones', pt: 'Instalações' },
            placeholder: 'e.g. Medical Center',
            description: { en: 'On-site facilities.', es: 'Instalaciones en el sitio.', pt: 'Instalações no local.' }
          },
          amenities: {
            label: { en: 'Amenities', es: 'Comodidades', pt: 'Comodidades' },
            placeholder: 'e.g. Wi-Fi, Restaurant',
            description: { en: 'Visitor amenities.', es: 'Comodidades para visitantes.', pt: 'Comodidades para visitantes.' }
          }
        }
      },
      accessibility: {
        name: 'accessibility',
        label: { en: 'Accessibility', es: 'Accesibilidad', pt: 'Acessibilidade' },
        entity: { en: 'Accessibility', es: 'Accesibilidad', pt: 'Acessibilidade' },
        description: { en: 'Accessibility info.', es: 'Info de accesibilidad.', pt: 'Info de acessibilidade.' },
        fields: {
          approach: {
            label: { en: 'Approach', es: 'Enfoque', pt: 'Abordagem' },
            placeholder: 'Select approach',
            description: { en: 'Main access route.', es: 'Ruta de acceso principal.', pt: 'Rota de acesso principal.' }
          },
          facilities: {
            label: { en: 'Facilities', es: 'Instalaciones', pt: 'Instalações' },
            placeholder: 'Select facilities',
            description: { en: 'Access facilities.', es: 'Instalaciones de acceso.', pt: 'Instalações de acesso.' }
          },
          capacity: {
            label: { en: 'Capacity', es: 'Capacidad', pt: 'Capacidade' },
            placeholder: 'Select capacity',
            description: { en: 'Visitor capacity.', es: 'Capacidad de visitantes.', pt: 'Capacidade de visitantes.' }
          }
        }
      }
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      entity: { en: 'Location', es: 'Ubicación', pt: 'Localização' },
      description: { en: 'Related entities.', es: 'Entidades relacionadas.', pt: 'Entidades relacionadas.' },
      fields: {
        entities: {
          label: { en: 'Entities', es: 'Entidades', pt: 'Entidades' },
          description: { en: 'Associated entities.', es: 'Entidades asociadas.', pt: 'Entidades associadas.' }
        }
      }
    }
  }
} as const
