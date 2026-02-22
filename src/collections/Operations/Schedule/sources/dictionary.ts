// FILE: src/collections/Operations/Schedules/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Schedule', es: 'Horario', pt: 'Cronograma' },
  hostPlural: { en: 'Schedules', es: 'Horarios', pt: 'Cronogramas' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Monaco GP Weekend Schedule',
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
      description: { en: 'Schedule agenda and scope.', es: 'Agenda y alcance del horario.', pt: 'Agenda e escopo do cronograma.' },
      fields: {
        agenda: { label: { en: 'Agenda', es: 'Agenda', pt: 'Agenda' } },
        scope: {
          name: 'scope',
          label: { en: 'Scope', es: 'Alcance', pt: 'Escopo' },
          entity: { en: 'Scope', es: 'Alcance', pt: 'Escopo' },
          description: { en: 'Significance and scale of the schedule.', es: 'Importancia y escala del horario.', pt: 'Significância e escala do cronograma.' },
          fields: {
            significance: { label: { en: 'Significance', es: 'Importancia', pt: 'Significância' } },
            scale: { label: { en: 'Scale', es: 'Escala', pt: 'Escala' } },
            depth: { label: { en: 'Depth', es: 'Profundidad', pt: 'Profundidade' } },
          },
        },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Schedule chronology and slots.', es: 'Cronología y turnos del horario.', pt: 'Cronologia e slots do cronograma.' },
      fields: {
        chronology: {
          name: 'chronology',
          label: { en: 'Chronology', es: 'Cronología', pt: 'Cronologia' },
          entity: { en: 'Chronology', es: 'Cronología', pt: 'Cronologia' },
          description: { en: 'Date and recurring type.', es: 'Fecha y tipo recurrente.', pt: 'Data e tipo recorrente.' },
          fields: {
            date: { label: { en: 'Date', es: 'Fecha', pt: 'Data' } },
            type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' } },
          },
        },
        slots: {
          name: 'slots',
          label: { en: 'Slots', es: 'Turnos', pt: 'Slots' },
          entity: { en: 'Slot', es: 'Turno', pt: 'Slot' },
          description: { en: 'Timeline of activities.', es: 'Línea de tiempo de actividades.', pt: 'Linha do tempo de atividades.' },
          fields: {
            activity: { label: { en: 'Activity', es: 'Actividad', pt: 'Atividade' } },
            start: { label: { en: 'Start', es: 'Inicio', pt: 'Início' } },
            end: { label: { en: 'End', es: 'Fin', pt: 'Fim' } },
            duration: { label: { en: 'Duration', es: 'Duración', pt: 'Duração' } },
            location: { label: { en: 'Location', es: 'Ubicación', pt: 'Localização' } },
          },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Schedule constraints.', es: 'Restricciones del horario.', pt: 'Restrições do cronograma.' },
      fields: {
        constraints: {
          name: 'constraints',
          label: { en: 'Constraints', es: 'Restricciones', pt: 'Restrições' },
          entity: { en: 'Constraint', es: 'Restricción', pt: 'Restrição' },
          description: { en: 'Factors limiting the schedule.', es: 'Factores que limitan el horario.', pt: 'Fatores que limitam o cronograma.' },
          fields: {
            constraint: { label: { en: 'Constraint', es: 'Restricción', pt: 'Restrição' } },
            type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' } },
            impact: { label: { en: 'Impact', es: 'Impacto', pt: 'Impacto' } },
          },
        },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Schedule occurrences and entities.', es: 'Ocurrencias y entidades del horario.', pt: 'Ocorrências e entidades do cronograma.' },
      fields: {
        occurrences: { label: { en: 'Occurrences', es: 'Ocurrencias', pt: 'Ocorrências' } },
        entities: { label: { en: 'Entities', es: 'Entidades', pt: 'Entidades' } },
      },
    },
  },
} as const
