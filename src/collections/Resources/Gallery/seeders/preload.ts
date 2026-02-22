// FILE: src/collections/Resources/Gallery/seeders/preload.ts
export const PRELOAD_GALLERY = (mediaIds: number[]) => [
  {
    name: 'Race Day Gallery',
    toggle: 'advanced',
    type: 1,
    details: {
      enable: true,
      images: mediaIds[0],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'race-day-gallery',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Behind the Scenes',
    toggle: 'advanced',
    type: 2,
    details: {
      enable: true,
      images: mediaIds[1],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'behind-scenes',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Heritage Gallery',
    toggle: 'advanced',
    type: 3,
    details: {
      enable: true,
      images: mediaIds[2],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'heritage-gallery',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
