export const PRELOAD_PREFERENCE = [
  {
    name: 'High Contrast Mode',
    type: 1,
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Optimizes UI for visual clarity.',
      visibility: {
        show: true
      }
    },
    traits: {
      enable: true,
      conditions: [
        {
          trigger: 'Low light detection',
          prerequisite: 'Light Sensor API'
        },
        {
          trigger: 'User accessibility toggle',
          prerequisite: 'OS Settings'
        }
      ],
      reasons: [
        {
          reason: 'Improves readability',
          importance: 'Critical'
        },
        {
          reason: 'Battery saving',
          importance: 'Medium'
        }
      ],
      visibility: {
        show: true
      }
    },
    contexts: {
      enable: true,
      visibility: {
        show: true
      }
    },
    seo: {
      title: 'High Contrast Mode | AF Motorsport',
      description: 'Accessibility preference settings.'
    },
    generateSlug: false,
    slug: 'high-contrast-mode',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: false
    }
  }
] as const