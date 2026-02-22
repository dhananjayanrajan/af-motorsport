// FILE: src/collections/Competition/Season/seeders/preload.ts
export const PRELOAD_SEASON = [
  {
    name: '2026 Formula 1 Season',
    series: 1,
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'The 2026 FIA Formula One World Championship season.',
      identifiers: { code: 'F1-2026', abbreviation: '2026' },
      visibility: { show: true },
    },
    details: {
      enable: true,
      schedule: 1,
      visibility: { show: true },
    },
    metrics: {
      enable: true,
      counts: { entries: 20, events: 24, races: 24 },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: '2026-f1-season',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
] as const