// FILE: src/collections/Operations/Training/seeders/preload.ts
export const PRELOAD_TRAINING = [
  {
    name: 'Pit Stop Practice',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'Practice pit stop drills',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 1,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      intensity: 'High',
      format: 'Group',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'pit-stop-practice',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Simulator Session',
    toggle: 'advanced',
    type: 2,
    basics: {
      enable: true,
      description: 'Driver simulator training',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 2,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      intensity: 'Medium',
      format: 'Simulated',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'simulator-session',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Physical Training',
    toggle: 'advanced',
    type: 3,
    basics: {
      enable: true,
      description: 'Driver fitness program',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 3,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      intensity: 'Extreme',
      format: 'Individual',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'physical-training',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
