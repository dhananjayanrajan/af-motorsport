// FILE: src/collections/Operations/Protocols/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Protocol', es: 'Protocolo', pt: 'Protocolo' },
  hostPlural: { en: 'Protocols', es: 'Protocolos', pt: 'Protocolos' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Engine Warm-up Protocol',
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
      description: { en: 'Protocol basic objectives.', es: 'Objetivos básicos del protocolo.', pt: 'Objetivos básicos do protocolo.' },
      fields: {
        identifier: {
          name: 'identifier',
          label: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
          entity: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
          description: { en: 'Protocol identification details.', es: 'Detalles de identificación del protocolo.', pt: 'Detalhes de identificação do protocolo.' },
          fields: {
            code: { label: { en: 'Code', es: 'Código', pt: 'Código' } },
            version: { label: { en: 'Version', es: 'Versión', pt: 'Versão' } },
            revision: { label: { en: 'Revision', es: 'Revisión', pt: 'Revisão' } },
          },
        },
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
        objective: { label: { en: 'Objective', es: 'Objetivo', pt: 'Objetivo' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Protocol procedure and steps.', es: 'Procedimiento y pasos del protocolo.', pt: 'Procedimento e etapas do protocolo.' },
      fields: {
        procedure: { label: { en: 'Procedure', es: 'Procedimiento', pt: 'Procedimento' } },
        steps: {
          name: 'steps',
          label: { en: 'Steps', es: 'Pasos', pt: 'Etapas' },
          entity: { en: 'Step', es: 'Paso', pt: 'Etapa' },
          description: { en: 'Step-by-step instructions.', es: 'Instrucciones paso a paso.', pt: 'Instruções passo a passo.' },
          fields: {
            step: { label: { en: 'Step Name', es: 'Nombre del paso', pt: 'Nome da etapa' } },
            instruction: { label: { en: 'Instruction', es: 'Instrucción', pt: 'Instrução' } },
            requirement: { label: { en: 'Requirement', es: 'Requisito', pt: 'Requisito' } },
          },
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Protocol documentation.', es: 'Documentación del protocolo.', pt: 'Documentação do protocolo.' },
      fields: {
        documentation: { label: { en: 'Documentation', es: 'Documentación', pt: 'Documentação' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Protocol classifications.', es: 'Clasificaciones del protocolo.', pt: 'Classificações do protocolo.' },
      fields: {
        classifications: { label: { en: 'Classifications', es: 'Clasificaciones', pt: 'Classificações' } },
      },
    },
  },
} as const
