// FILE: src/collections/Resources/Visualization/seeders/preload.ts
export const PRELOAD_VISUALIZATION = (mediaIds: number[]) => [
  {
    name: 'Aero Simulation',
    toggle: 'advanced',
    type: 1,
    details: {
      enable: true,
      designs: mediaIds[0],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'aero-simulation',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Pit Stop Animation',
    toggle: 'advanced',
    type: 2,
    details: {
      enable: true,
      designs: mediaIds[1],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'pit-stop-animation',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Circuit Map',
    toggle: 'advanced',
    type: 3,
    details: {
      enable: true,
      designs: mediaIds[2],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'circuit-map',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
