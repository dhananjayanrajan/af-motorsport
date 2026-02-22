// FILE: src/collections/Competition/Session/seeders/preload.ts
export const PRELOAD_SESSION = [
  {
    name: 'Practice 1',
    alias: 'FP1',
    code: 'FP1',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'First free practice session.',
      status: 'Completed',
      access: 'Public',
      visibility: { show: true },
    },
    details: {
      enable: true,
      event: 1,
      format: {
        segment: 'Practice',
        duration: 60,
        interval: 0,
        specification: 'Standard FP1',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    metrics: {
      enable: true,
      quantifiers: { laps: 30, distance: '150 km', duration: '60 min' },
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
    slug: 'practice-1-british-gp-2026',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const