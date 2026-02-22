// FILE: src/collections/Operations/Initiative/seeders/preload.ts
export const PRELOAD_INITIATIVE = [
  {
    name: 'Aerodynamics Upgrade',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'New front wing development',
      mission: 'Improve downforce by 10%',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 1,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      status: 'Active',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'aero-upgrade',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Sustainability Program',
    toggle: 'advanced',
    type: 2,
    basics: {
      enable: true,
      description: 'Reduce carbon footprint',
      mission: 'Achieve net zero by 2030',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 2,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      status: 'Proposed',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'sustainability',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Driver Academy',
    toggle: 'advanced',
    type: 3,
    basics: {
      enable: true,
      description: 'Develop young talent',
      mission: 'Bring junior drivers to F1',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 3,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      status: 'Active',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'driver-academy',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
