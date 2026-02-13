export const dictionary = {
  host: { en: 'Result', es: 'Resultado', pt: 'Resultado' },
  hostPlural: { en: 'Results', es: 'Resultados', pt: 'Resultados' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Race Results',
      description: { en: 'The result name.', es: 'El nombre del resultado.', pt: 'O nome do resultado.' },
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'The type of result.', es: 'El tipo de resultado.', pt: 'O tipo de resultado.' },
    },
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      description: { en: 'Basic info.', es: 'Info básica.', pt: 'Info básica.' },
      fields: {
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Brief description',
          description: { en: 'Short description.', es: 'Descripción corta.', pt: 'Descrição curta.' },
        },
        status: {
          label: { en: 'Status', es: 'Estado', pt: 'Status' },
          description: { en: 'Result status.', es: 'Estado del resultado.', pt: 'Status do resultado.' },
        },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      description: { en: 'Result details.', es: 'Detalles del resultado.', pt: 'Detalhes do resultado.' },
      fields: {
        narrative: {
          label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' },
        },
        classification: {
          label: { en: 'Classification', es: 'Clasificación', pt: 'Classificação' },
        },
        highlights: {
          label: { en: 'Highlights', es: 'Destacados', pt: 'Destaques' },
        },
        incidents: {
          label: { en: 'Incidents', es: 'Incidentes', pt: 'Incidentes' },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      description: { en: 'Result traits.', es: 'Rasgos del resultado.', pt: 'Traços do resultado.' },
      fields: {
        position: {
          name: 'position',
          label: { en: 'Position', es: 'Posición', pt: 'Posição' },
          entity: { en: 'Position', es: 'Posición', pt: 'Posição' },
          description: { en: 'Final positions.', es: 'Posiciones finales.', pt: 'Posições finais.' },
          fields: {
            overall: { label: { en: 'Overall', es: 'General', pt: 'Geral' } },
            class: { label: { en: 'Class', es: 'Clase', pt: 'Classe' } },
            order: { label: { en: 'Order', es: 'Orden', pt: 'Ordem' } },
          },
        },
        achievement: {
          name: 'achievement',
          label: { en: 'Achievement', es: 'Logro', pt: 'Conquista' },
          entity: { en: 'Achievement', es: 'Logro', pt: 'Conquista' },
          description: { en: 'Achievement details.', es: 'Detalles del logro.', pt: 'Detalhes da conquista.' },
          fields: {
            gap: { label: { en: 'Gap', es: 'Brecha', pt: 'Gap' } },
            interval: { label: { en: 'Interval', es: 'Intervalo', pt: 'Intervalo' } },
            status: { label: { en: 'Status', es: 'Estado', pt: 'Status' } },
          },
        },
      },
    },
    metrics: {
      name: 'metrics',
      label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
      description: { en: 'Result metrics.', es: 'Métricas del resultado.', pt: 'Métricas do resultado.' },
      fields: {
        performance: {
          name: 'performance',
          label: { en: 'Performance', es: 'Rendimiento', pt: 'Desempenho' },
          entity: { en: 'Performance', es: 'Rendimiento', pt: 'Desempenho' },
          description: { en: 'Performance stats.', es: 'Estadísticas de rendimiento.', pt: 'Estatísticas de desempenho.' },
          fields: {
            laps: { label: { en: 'Laps', es: 'Vueltas', pt: 'Voltas' } },
            time: { label: { en: 'Time', es: 'Tiempo', pt: 'Tempo' } },
            speed: { label: { en: 'Speed', es: 'Velocidad', pt: 'Velocidade' } },
            distance: { label: { en: 'Distance', es: 'Distancia', pt: 'Distância' } },
          },
        },
        stoppages: {
          label: { en: 'Stoppages', es: 'Paradas', pt: 'Paradas' },
          description: { en: 'Session stoppages.', es: 'Paradas de la sesión.', pt: 'Paradas da sessão.' },
          fields: {
            reason: { label: { en: 'Reason', es: 'Razón', pt: 'Razão' } },
            duration: { label: { en: 'Duration', es: 'Duración', pt: 'Duração' } },
            lap: { label: { en: 'Lap', es: 'Vuelta', pt: 'Volta' } },
          },
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      description: { en: 'Visual assets.', es: 'Activos visuales.', pt: 'Ativos visuais.' },
      fields: {
        visualization: { label: { en: 'Visualization', es: 'Visualización', pt: 'Visualização' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      description: { en: 'Related info.', es: 'Info relacionada.', pt: 'Info relacionada.' },
      fields: {
        entry: { label: { en: 'Entry', es: 'Entrada', pt: 'Entrada' } },
        notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
      },
    },
  },
} as const
