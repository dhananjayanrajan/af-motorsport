// FILE: src/collections/Attributes/Channels/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Channel', es: 'Canal', pt: 'Canal' },
  hostPlural: { en: 'Channels', es: 'Canales', pt: 'Canais' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Official Website',
      description: { en: 'The name of the channel.', es: 'El nombre del canal.', pt: 'O nome do canal.' }
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'Category of the channel.', es: 'Categoría del canal.', pt: 'Categoria do canal.' }
    }
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      entity: { en: 'Channel', es: 'Canal', pt: 'Canal' },
      description: { en: 'Basic properties.', es: 'Propiedades básicas.', pt: 'Propriedades básicas.' },
      fields: {
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Enter description',
          description: { en: 'Category description.', es: 'Descripción de la categoría.', pt: 'Descrição da categoria.' },
        },
      }
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      entity: { en: 'Channel', es: 'Canal', pt: 'Canal' },
      description: { en: 'Channel characteristics.', es: 'Características del canal.', pt: 'Características do canal.' },
      usage: {
        name: 'usage',
        label: { en: 'Usage', es: 'Uso', pt: 'Uso' },
        entity: { en: 'Usage', es: 'Uso', pt: 'Uso' },
        description: { en: 'Usage constraints.', es: 'Restricciones de uso.', pt: 'Restrições de uso.' },
        fields: {
          purpose: {
            label: { en: 'Purpose', es: 'Propósito', pt: 'Propósito' },
            placeholder: 'e.g. Public Inquiries',
            description: { en: 'Intended use.', es: 'Uso previsto.', pt: 'Uso pretendido.' }
          },
          role: {
            label: { en: 'Role', es: 'Rol', pt: 'Papel' },
            placeholder: 'Select role',
            description: { en: 'Functional role.', es: 'Rol funcional.', pt: 'Papel funcional.' }
          },
          function: {
            label: { en: 'Function', es: 'Función', pt: 'Função' },
            placeholder: 'Select function',
            description: { en: 'Operational function.', es: 'Función operativa.', pt: 'Função operacional.' }
          }
        }
      },
      validity: {
        name: 'validity',
        label: { en: 'Validity', es: 'Validez', pt: 'Validez' },
        entity: { en: 'Validity', es: 'Validez', pt: 'Validade' },
        description: { en: 'Validity status.', es: 'Estado de validez.', pt: 'Status de validade.' },
        fields: {
          status: {
            label: { en: 'Status', es: 'Estado', pt: 'Status' },
            placeholder: 'Select status',
            description: { en: 'Current status.', es: 'Estado actual.', pt: 'Status atual.' }
          },
          condition: {
            label: { en: 'Condition', es: 'Condición', pt: 'Condição' },
            placeholder: 'Select condition',
            description: { en: 'Operational condition.', es: 'Condición operativa.', pt: 'Condição operacional.' }
          },
          state: {
            label: { en: 'State', es: 'Estado', pt: 'Estado' },
            placeholder: 'Select state',
            description: { en: 'Connection state.', es: 'Estado de conexión.', pt: 'Estado de conexão.' }
          }
        }
      }
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      entity: { en: 'Channel', es: 'Canal', pt: 'Canal' },
      description: { en: 'Additional details.', es: 'Detalles adicionales.', pt: 'Detalhes adicionais.' },

      identifier: {
        name: 'identifier',
        label: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
        entity: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
        description: { en: 'Identification details.', es: 'Detalles de identificación.', pt: 'Detalhes de identificação.' },
        fields: {
          label: {
            label: { en: 'Label', es: 'Etiqueta', pt: 'Rótulo' },
            placeholder: 'e.g. Work Email',
            description: { en: 'Display name.', es: 'Nombre para mostrar.', pt: 'Nome de exibição.' }
          },
          title: {
            label: { en: 'Title', es: 'Título', pt: 'Título' },
            placeholder: 'e.g. Corporate Communication',
            description: { en: 'Formal title.', es: 'Título formal.', pt: 'Título formal.' }
          }
        }
      },
      address: {
        name: 'address',
        label: { en: 'Address', es: 'Dirección', pt: 'Endereço' },
        entity: { en: 'Address', es: 'Dirección', pt: 'Endereço' },
        description: { en: 'Address details.', es: 'Detalles de la dirección.', pt: 'Detalhes do endereço.' },
        fields: {
          value: {
            label: { en: 'Value', es: 'Valor', pt: 'Valor' },
            placeholder: 'e.g. https://example.com',
            description: { en: 'The actual address.', es: 'La dirección real.', pt: 'O endereço real.' }
          },
          locator: {
            label: { en: 'Locator', es: 'Localizador', pt: 'Localizador' },
            placeholder: 'e.g. IP Address',
            description: { en: 'Location reference.', es: 'Referencia de ubicación.', pt: 'Referência de localização.' }
          },
          endpoint: {
            label: { en: 'Endpoint', es: 'Punto final', pt: 'Ponto final' },
            placeholder: 'e.g. /api/v1',
            description: { en: 'Specific endpoint.', es: 'Punto final específico.', pt: 'Ponto final específico.' }
          }
        }
      },
      protocol: {
        name: 'protocol',
        label: { en: 'Protocol', es: 'Protocolo', pt: 'Protocolo' },
        entity: { en: 'Protocol', es: 'Protocolo', pt: 'Protocolo' },
        description: { en: 'Protocol details.', es: 'Detalles del protocolo.', pt: 'Detalhes do protocolo.' },
        fields: {
          format: {
            label: { en: 'Format', es: 'Formato', pt: 'Formato' },
            placeholder: 'Select format',
            description: { en: 'Data format.', es: 'Formato de datos.', pt: 'Formato de dados.' }
          },
          scheme: {
            label: { en: 'Scheme', es: 'Esquema', pt: 'Esquema' },
            placeholder: 'Select scheme',
            description: { en: 'Communication scheme.', es: 'Esquema de comunicación.', pt: 'Esquema de comunicação.' }
          },
          specification: {
            label: { en: 'Specification', es: 'Especificación', pt: 'Especificação' },
            placeholder: 'e.g. RFC 1234',
            description: { en: 'Technical spec.', es: 'Especificación técnica.', pt: 'Especificação técnica.' }
          }
        }
      }
    }
  }
} as const
