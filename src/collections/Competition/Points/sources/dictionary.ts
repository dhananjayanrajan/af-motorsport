export const dictionary = {
  host: { en: 'Point', es: 'Punto', pt: 'Ponto' },
  hostPlural: { en: 'Points', es: 'Puntos', pt: 'Pontos' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Championship Point', es: 'e.g. Punto de Campeonato', pt: 'e.g. Ponto de Campeonato' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. CHAMP_PT', es: 'e.g. CHAMP_PT', pt: 'e.g. CHAMP_PT' },
    },
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      fields: {
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: { en: 'Enter description', es: 'Ingrese descripción', pt: 'Insira a descrição' },
        },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      fields: {
        scale: {
          label: { en: 'Scale', es: 'Escala', pt: 'Escala' },
        },
        value: {
          label: { en: 'Value', es: 'Valor', pt: 'Valor' },
        },
        before: {
          label: { en: 'Before', es: 'Antes', pt: 'Antes' },
        },
        after: {
          label: { en: 'After', es: 'Después', pt: 'Depois' },
        },
        delta: {
          label: { en: 'Delta', es: 'Delta', pt: 'Delta' },
        },
        condition: {
          label: { en: 'Condition', es: 'Condición', pt: 'Condição' },
        },
        adjustment: {
          label: { en: 'Adjustment', es: 'Ajuste', pt: 'Ajuste' },
        },
        impact: {
          label: { en: 'Impact', es: 'Impacto', pt: 'Impacto' },
          placeholder: { en: 'Describe the impact', es: 'Describa el impacto', pt: 'Descreva o impacto' },
        },
        notes: {
          label: { en: 'Notes', es: 'Notas', pt: 'Notas' },
          placeholder: { en: 'Additional notes', es: 'Notas adicionales', pt: 'Notas adicionais' },
        },
      },
    },
  },
} as const
