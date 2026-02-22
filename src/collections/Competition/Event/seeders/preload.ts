// FILE: src/collections/Competition/Event/seeders/preload.ts
export const PRELOAD_EVENT = [
  {
    name: 'British Grand Prix',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'The British Grand Prix at Silverstone Circuit.',
      identifiers: { code: 'GBR', round: '12' },
      status: 'Scheduled',
      access: 'Public',
      visibility: { show: true },
    },
    details: {
      enable: true,
      season: 1,
      location: 1,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      chronology: {
        start: '2026-07-03T08:00:00.000Z',
        end: '2026-07-05T18:00:00.000Z',
        timezone: 'Europe/London',
      },
      format: 1,
      visibility: { show: true },
    },
    metrics: {
      enable: true,
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
    slug: 'british-grand-prix-2026',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
] as const