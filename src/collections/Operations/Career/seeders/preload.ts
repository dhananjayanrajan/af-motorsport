// FILE: src/collections/Operations/Career/seeders/preload.ts
export const PRELOAD_CAREER = [
  {
    name: 'Lewis Hamilton F1 Career',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'Career with Mercedes-AMG Petronas',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 1,
      organization: 1,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      contract: 'FullTime',
      positions: [
        {
          title: 'Driver',
          start: '2013-01-01',
        },
      ],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'lewis-hamilton-career',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Max Verstappen F1 Career',
    toggle: 'advanced',
    type: 2,
    basics: {
      enable: true,
      description: 'Career with Red Bull Racing',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 2,
      organization: 2,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      contract: 'FullTime',
      positions: [
        {
          title: 'Driver',
          start: '2016-05-05',
        },
      ],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'max-verstappen-career',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Toto Wolff Management Career',
    toggle: 'advanced',
    type: 3,
    basics: {
      enable: true,
      description: 'Career as team principal',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 3,
      organization: 1,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      contract: 'FullTime',
      positions: [
        {
          title: 'Team Principal',
          start: '2013-01-01',
        },
      ],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'toto-wolff-career',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
