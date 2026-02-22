// FILE: src/collections/Outcomes/Strategy/seeders/preload.ts
export const PRELOAD_STRATEGY = [
  {
    name: 'One-Stop Strategy',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'Race with a single pit stop',
      visibility: { show: true },
    },
    details: {
      enable: true,
      methodology: 'Conservative approach to preserve tires',
      visibility: { show: true },
    },
    traits: {
      enable: true,
      directives: [
        {
          phase: 'Race',
          action: 'Pit on lap 25',
          owner: 'Strategy Team',
          deadline: '2026-07-05',
        },
      ],
      contingencies: [
        {
          trigger: 'Safety car',
          response: 'Stay out',
          probability: 'Medium',
          impact: 'Moderate',
        },
      ],
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'one-stop-strategy',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Undercut Strategy',
    toggle: 'advanced',
    type: 2,
    basics: {
      enable: true,
      description: 'Pit early to overtake competitors',
      visibility: { show: true },
    },
    details: {
      enable: true,
      methodology: 'Aggressive undercut to gain track position',
      visibility: { show: true },
    },
    traits: {
      enable: true,
      directives: [
        {
          phase: 'Race',
          action: 'Pit early in window',
          owner: 'Race Engineer',
          deadline: '2026-07-05',
        },
      ],
      contingencies: [
        {
          trigger: 'Traffic',
          response: 'Delay pit stop',
          probability: 'High',
          impact: 'Minor',
        },
      ],
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'undercut-strategy',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Fuel Saving',
    toggle: 'advanced',
    type: 3,
    basics: {
      enable: true,
      description: 'Lift and coast to save fuel',
      visibility: { show: true },
    },
    details: {
      enable: true,
      methodology: 'Conservation driving to reach finish',
      visibility: { show: true },
    },
    traits: {
      enable: true,
      directives: [
        {
          phase: 'Final stint',
          action: 'Lift early at corners',
          owner: 'Driver',
          deadline: '2026-07-05',
        },
      ],
      contingencies: [
        {
          trigger: 'Virtual safety car',
          response: 'Reduce fuel saving',
          probability: 'Low',
          impact: 'Moderate',
        },
      ],
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'fuel-saving',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
