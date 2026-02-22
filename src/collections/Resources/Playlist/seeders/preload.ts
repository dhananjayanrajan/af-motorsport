// FILE: src/collections/Resources/Playlist/seeders/preload.ts
export const PRELOAD_PLAYLIST = [
  {
    name: 'Race Highlights',
    toggle: 'advanced',
    type: 1,
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      quality: '4K',
      format: 'Wide',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'race-highlights',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Interviews',
    toggle: 'advanced',
    type: 2,
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      quality: 'HD',
      format: 'Wide',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'interviews',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Technical Analysis',
    toggle: 'advanced',
    type: 3,
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      quality: 'HD',
      format: 'Wide',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'technical-analysis',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
