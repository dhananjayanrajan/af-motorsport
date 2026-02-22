// FILE: src/collections/Competition/Result/seeders/preload.ts
export const PRELOAD_RESULT = [
  {
    name: 'British GP Race Result - Entry 44',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'Official race result for entry 44.',
      status: 'Official',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      position: { overall: 1, class: 1, order: 1 },
      achievement: {
        gap: '+0.000',
        interval: '+0.000',
        status: 'Winner',
      },
      visibility: { show: true },
    },
    metrics: {
      enable: true,
      performance: {
        laps: 52,
        time: '1:27:15.123',
        speed: '231.4 km/h',
        distance: '306.2 km',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      entry: 1,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'british-gp-2026-result-44',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const