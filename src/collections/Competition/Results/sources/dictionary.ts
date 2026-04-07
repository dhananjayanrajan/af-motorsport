export const dictionary = {
  host: { en: 'Result', es: 'Resultado', pt: 'Resultado' },
  hostPlural: { en: 'Results', es: 'Resultados', pt: 'Resultados' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: { en: 'e.g. Monaco GP 2024 Result', es: 'e.g. Resultado GP Mónaco 2024', pt: 'e.g. Resultado GP Mônaco 2024' },
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: { en: 'e.g. MON_RES', es: 'e.g. MON_RES', pt: 'e.g. MON_RES' },
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
        status: {
          label: { en: 'Status', es: 'Estado', pt: 'Status' },
        },
        overall: {
          label: { en: 'Overall Position', es: 'Posición General', pt: 'Posição Geral' },
        },
        class: {
          label: { en: 'Class Position', es: 'Posición de Clase', pt: 'Posição de Classe' },
        },
        order: {
          label: { en: 'Order', es: 'Orden', pt: 'Ordem' },
        },
        interval: {
          label: { en: 'Interval (seconds)', es: 'Intervalo (segundos)', pt: 'Intervalo (segundos)' },
        },
        gap: {
          label: { en: 'Gap (seconds)', es: 'Brecha (segundos)', pt: 'Diferença (segundos)' },
        },
        state: {
          label: { en: 'State', es: 'Estado', pt: 'Estado' },
        },
        laps: {
          label: { en: 'Laps Completed', es: 'Vueltas Completadas', pt: 'Voltas Completadas' },
        },
        time: {
          label: { en: 'Time (seconds)', es: 'Tiempo (segundos)', pt: 'Tempo (segundos)' },
        },
        speed: {
          label: { en: 'Speed (km/h)', es: 'Velocidad (km/h)', pt: 'Velocidade (km/h)' },
        },
        distance: {
          label: { en: 'Distance (km)', es: 'Distancia (km)', pt: 'Distância (km)' },
        },
        notes: {
          label: { en: 'Notes', es: 'Notas', pt: 'Notas' },
          placeholder: { en: 'Additional notes', es: 'Notas adicionales', pt: 'Notas adicionais' },
        },
      },
    },
  },
} as const
