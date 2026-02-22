// FILE: src/collections/Competition/Point/seeders/preload.ts
export const PRELOAD_POINT = [
  {
    name: 'British GP Winner Points',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'Points awarded for winning the British Grand Prix.',
      value: 25,
      scale: 'Standard',
      visibility: { show: true },
    },
    details: {
      enable: true,
      result: 1,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      ranking: { before: 1, after: 1, delta: 25 },
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'british-gp-2026-winner-points',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const