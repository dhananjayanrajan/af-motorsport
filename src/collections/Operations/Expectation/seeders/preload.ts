// FILE: src/collections/Operations/Expectation/seeders/preload.ts
export const PRELOAD_EXPECTATION = [
  {
    name: 'Podium Finish',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      statement: 'Driver must finish on podium',
      visibility: { show: true },
    },
    details: {
      enable: true,
      criteria: 'Top 3 finish',
      visibility: { show: true },
    },
    traits: {
      enable: true,
      direction: 'Required',
      priority: 'High',
      flexibility: 'Strict',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'podium-finish',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Reliability Target',
    toggle: 'advanced',
    type: 2,
    basics: {
      enable: true,
      statement: 'Car must finish the race',
      visibility: { show: true },
    },
    details: {
      enable: true,
      criteria: 'No mechanical DNFs',
      visibility: { show: true },
    },
    traits: {
      enable: true,
      direction: 'Anticipated',
      priority: 'Critical',
      flexibility: 'Negotiable',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'reliability-target',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Qualifying Q3',
    toggle: 'advanced',
    type: 3,
    basics: {
      enable: true,
      statement: 'Driver must reach Q3',
      visibility: { show: true },
    },
    details: {
      enable: true,
      criteria: 'Top 10 qualifying',
      visibility: { show: true },
    },
    traits: {
      enable: true,
      direction: 'Committed',
      priority: 'Medium',
      flexibility: 'Guideline',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'qualifying-q3',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
