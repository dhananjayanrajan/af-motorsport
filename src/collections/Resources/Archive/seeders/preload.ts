// FILE: src/collections/Resources/Archive/seeders/preload.ts
export const PRELOAD_ARCHIVE = [
  {
    name: 'Technical Drawings Archive',
    toggle: 'advanced',
    type: 1,
    details: {
      enable: true,
      narrative: 1,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'technical-drawings-archive',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Race Footage Archive',
    toggle: 'advanced',
    type: 2,
    details: {
      enable: true,
      narrative: 2,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'race-footage-archive',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Press Releases Archive',
    toggle: 'advanced',
    type: 3,
    details: {
      enable: true,
      narrative: 3,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'press-releases-archive',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
