// FILE: src/collections/Outcomes/Incident/seeders/preload.ts
export const PRELOAD_INCIDENT = [
  {
    name: 'Turn 1 Collision',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'First lap collision between two cars',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: 1,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'turn1-collision',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Engine Failure',
    toggle: 'advanced',
    type: 2,
    basics: {
      enable: true,
      description: 'Engine blow-up during race',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: 2,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'engine-failure',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Pit Lane Speeding',
    toggle: 'advanced',
    type: 3,
    basics: {
      enable: true,
      description: 'Pit lane speeding penalty',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: 3,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'pit-lane-speeding',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
