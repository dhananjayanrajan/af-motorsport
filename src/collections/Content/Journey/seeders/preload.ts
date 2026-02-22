// FILE: src/collections/Content/Journey/seeders/preload.ts
export const PRELOAD_JOURNEY = [
  {
    name: 'Rookie Season',
    toggle: 'advanced',
    type: 1,
    details: {
      enable: true,
      narrative: 1,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'rookie-season',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Championship Campaign',
    toggle: 'advanced',
    type: 2,
    details: {
      enable: true,
      narrative: 2,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'championship-campaign',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Career Comeback',
    toggle: 'advanced',
    type: 3,
    details: {
      enable: true,
      narrative: 3,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'career-comeback',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
