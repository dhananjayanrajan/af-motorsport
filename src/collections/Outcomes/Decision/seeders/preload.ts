// FILE: src/collections/Outcomes/Decision/seeders/preload.ts
export const PRELOAD_DECISION = [
  {
    name: 'Tire Choice',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'Decision on tire strategy for race',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 1,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'tire-choice',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Pit Stop Timing',
    toggle: 'advanced',
    type: 2,
    basics: {
      enable: true,
      description: 'When to pit during the race',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 2,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'pit-stop-timing',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Driver Swap',
    toggle: 'advanced',
    type: 3,
    basics: {
      enable: true,
      description: 'Decision to swap drivers during race',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 3,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'driver-swap',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
