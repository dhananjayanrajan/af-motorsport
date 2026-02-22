// FILE: src/collections/Attributes/Classification/seeders/preload.ts
export const PRELOAD_CLASSIFICATION = [
  {
    id: 1,
    name: 'Formula 1',
    type: 1,
    basics: { enable: true, description: 'The premier class of open-wheel single-seater racing', visibility: { show: true } },
    details: { enable: true, definition: 'FIA-sanctioned international championship featuring the most advanced open-wheel race cars', criteria: 'Teams must meet technical regulations, sporting codes, and financial commitments', visibility: { show: true } },
    contexts: { enable: false, notes: null, visibility: { show: false } },
    seo: { title: 'Formula 1 Classification | AF Motorsport', description: 'Official Formula 1 World Championship classification and standards', image: null },
    generateSlug: false,
    slug: 'formula-1',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: true, check_pinned: true },
    updatedAt: '2026-02-22T09:20:00.000Z',
    createdAt: '2026-01-05T10:00:00.000Z'
  },
  {
    id: 2,
    name: 'FIA World Endurance Championship',
    type: 1,
    basics: { enable: true, description: 'Global endurance racing championship', visibility: { show: true } },
    details: { enable: true, definition: 'International championship for prototype and GT cars competing in endurance events', criteria: 'Hypercar, LMP2, and LMGTE classes with specific technical regulations', visibility: { show: true } },
    contexts: { enable: false, notes: null, visibility: { show: false } },
    seo: { title: 'WEC Classification | AF Motorsport', description: 'FIA World Endurance Championship classification and regulations', image: null },
    generateSlug: false,
    slug: 'fia-world-endurance-championship',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
    updatedAt: '2026-02-21T15:10:00.000Z',
    createdAt: '2026-01-08T14:30:00.000Z'
  },
  {
    id: 3,
    name: 'GT3',
    type: 1,
    basics: { enable: true, description: 'Production-based Grand Touring customer racing category', visibility: { show: true } },
    details: { enable: true, definition: 'Production-based GT cars modified for competition under Balance of Performance regulations', criteria: 'Minimum weight, maximum horsepower, aerodynamic restrictions, and production requirements', visibility: { show: true } },
    contexts: { enable: false, notes: null, visibility: { show: false } },
    seo: { title: 'GT3 Classification | AF Motorsport', description: 'GT3 customer racing category technical specifications and regulations', image: null },
    generateSlug: false,
    slug: 'gt3',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: false, check_pinned: true },
    updatedAt: '2026-02-20T11:45:00.000Z',
    createdAt: '2026-01-10T09:15:00.000Z'
  }
] as const
