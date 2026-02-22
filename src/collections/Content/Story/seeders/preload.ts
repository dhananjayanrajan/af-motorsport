// FILE: src/collections/Content/Story/seeders/preload.ts
export const PRELOAD_STORY = [
  {
    name: 'First Win',
    alias: 'Maiden Victory',
    toggle: 'advanced',
    type: 1,
    details: {
      enable: true,
      narrative: 1,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'first-win',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Championship Decider',
    alias: 'Title Race',
    toggle: 'advanced',
    type: 2,
    details: {
      enable: true,
      narrative: 2,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'championship-decider',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Underdog Triumph',
    alias: 'Upset Win',
    toggle: 'advanced',
    type: 3,
    details: {
      enable: true,
      narrative: 3,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'underdog-triumph',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
