// FILE: src/collections/Competition/Series/seeders/preload.ts
export const PRELOAD_SERIES = [
  {
    name: 'Formula 1 World Championship',
    alias: 'F1',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'The pinnacle of single-seater motorsport.',
      identifiers: { code: 'F1', abbreviation: 'F1' },
      tagline: 'The pinnacle of motorsport',
      status: 'Active',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      heritage: {},
      schedule: 1,
      visibility: { show: true },
    },
    metrics: {
      enable: true,
      counts: { seasons: 75, events: 24, participants: 20 },
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
    slug: 'formula-1',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
] as const