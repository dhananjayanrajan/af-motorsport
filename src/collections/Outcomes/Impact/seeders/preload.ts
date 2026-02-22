// FILE: src/collections/Outcomes/Impact/seeders/preload.ts
export const PRELOAD_IMPACT = [
  {
    name: 'Aerodynamic Change',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'Impact of new aero package on lap time',
      scope: {
        significance: 'Increased downforce by 15%',
        scale: 'National',
        depth: 'Moderate',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      velocity: 'Rapid',
      gravity: 'Moderate',
      permanence: 'Permanent',
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'aero-impact',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Driver Change',
    toggle: 'advanced',
    type: 2,
    basics: {
      enable: true,
      description: 'Impact of driver substitution on team morale',
      scope: {
        significance: 'Team cohesion affected',
        scale: 'Regional',
        depth: 'Surface',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      velocity: 'Immediate',
      gravity: 'Moderate',
      permanence: 'Temporary',
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'driver-change-impact',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Regulation Change',
    toggle: 'advanced',
    type: 3,
    basics: {
      enable: true,
      description: 'Impact of new FIA regulations on car performance',
      scope: {
        significance: 'Performance shift across grid',
        scale: 'Global',
        depth: 'Fundamental',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      velocity: 'Gradual',
      gravity: 'Severe',
      permanence: 'LongTerm',
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'regulation-impact',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
