// FILE: src/collections/Operations/Duties/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Duty', es: 'Deber', pt: 'Dever' },
  hostPlural: { en: 'Duties', es: 'Deberes', pt: 'Deveres' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Lead Engineer Duties',
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
      description: { en: 'Duty basic details.', es: 'Detalles básicos del deber.', pt: 'Detalhes básicos do dever.' },
      fields: {
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Duty obligations and tasks.', es: 'Obligaciones y tareas del deber.', pt: 'Obrigações e tarefas do dever.' },
      fields: {
        protocols: { label: { en: 'Protocols', es: 'Protocolos', pt: 'Protocolos' } },
        expectations: { label: { en: 'Expectations', es: 'Expectativas', pt: 'Expectativas' } },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Duty traits.', es: 'Rasgos del deber.', pt: 'Traços do dever.' },
      fields: {
        obligation: {
          name: 'obligation',
          label: { en: 'Obligation', es: 'Obligación', pt: 'Obrigação' },
          entity: { en: 'Obligation', es: 'Obligación', pt: 'Obrigação' },
          description: { en: 'Detailed duties and authority.', es: 'Deberes detallados y autoridad.', pt: 'Deveres detalhados e autoridade.' },
          fields: {
            tasks: { label: { en: 'Tasks', es: 'Tareas', pt: 'Tarefas' } },
            reporting: { label: { en: 'Reporting', es: 'Reporte', pt: 'Relatórios' } },
            authority: { label: { en: 'Authority', es: 'Autoridad', pt: 'Autoridade' } },
          },
        },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Duty protocols and expectations.', es: 'Protocolos y expectativas del deber.', pt: 'Protocolos e expectativas do dever.' },
      fields: {
        content: {
          name: 'content',
          label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          description: { en: 'Content.', es: 'Contenido.', pt: 'Conteúdo.' },
          entity: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' },
          fields: {
            notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
          }
        },
      },
    },
  },
} as const
