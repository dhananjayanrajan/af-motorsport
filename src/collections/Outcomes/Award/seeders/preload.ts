// FILE: src/collections/Outcomes/Award/seeders/preload.ts
export const PRELOAD_AWARD = [
  {
    name: 'Driver of the Year',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'Best driver award for outstanding performance',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 1,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      entities: {
        relationTo: 'organizations',
        value: 1,
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'driver-of-the-year',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Team of the Year',
    toggle: 'advanced',
    type: 2,
    basics: {
      enable: true,
      description: 'Best team award for consistent excellence',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 2,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      entities: {
        relationTo: 'organizations',
        value: 2,
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'team-of-the-year',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Innovation Award',
    toggle: 'advanced',
    type: 3,
    basics: {
      enable: true,
      description: 'Award for technical innovation',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 3,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      entities: {
        relationTo: 'organizations',
        value: 3,
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'innovation-award',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
