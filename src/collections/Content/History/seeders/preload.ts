// FILE: src/collections/Content/History/seeders/preload.ts
export const PRELOAD_HISTORY = [
  {
    name: 'Team History',
    alias: 'Team Origins',
    toggle: 'advanced',
    type: 1,
    details: {
      enable: true,
      narrative: 1,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'team-history',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Driver Legacy',
    alias: 'Famous Drivers',
    toggle: 'advanced',
    type: 2,
    details: {
      enable: true,
      narrative: 2,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'driver-legacy',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Circuit Evolution',
    alias: 'Track History',
    toggle: 'advanced',
    type: 3,
    details: {
      enable: true,
      narrative: 3,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'circuit-evolution',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
