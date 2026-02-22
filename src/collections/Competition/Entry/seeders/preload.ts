// FILE: src/collections/Competition/Entry/seeders/preload.ts
export const PRELOAD_ENTRY = [
  {
    name: 'Entry 44',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'Championship contender entry.',
      identifiers: { number: '44', plate: 'GBR' },
      status: 'Confirmed',
      visibility: { show: true },
    },
    details: {
      enable: true,
      session: 1,
      drivers: 1,
      car: 1,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      role: 'Primary',
      eligibility: {
        license: 'FIA Platinum',
      },
      visibility: { show: true },
    },
    metrics: {
      enable: true,
      positions: { grid: 1, start: 1, finish: 1, laps: 52 },
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
    slug: 'entry-44-british-gp-2026',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const