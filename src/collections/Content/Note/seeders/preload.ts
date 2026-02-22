// FILE: src/collections/Content/Note/seeders/preload.ts
export const PRELOAD_NOTE = [
  {
    name: 'Setup Notes',
    alias: 'Suspension Setup',
    toggle: 'advanced',
    type: 1,
    details: {
      enable: true,
      description: 'Recommended suspension settings for high-speed circuits.',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'setup-notes',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Driver Feedback',
    alias: 'Handling Comments',
    toggle: 'advanced',
    type: 2,
    details: {
      enable: true,
      description: 'Driver reports understeer in slow corners.',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'driver-feedback',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Race Strategy',
    alias: 'Pit Stop Plan',
    toggle: 'advanced',
    type: 3,
    details: {
      enable: true,
      description: 'Plan to undercut competitors during pit window.',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'race-strategy-notes',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
