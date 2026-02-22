// FILE: src/collections/Content/Pages/seeders/preload.ts
export const PRELOAD_PAGE = [
  {
    toggle: 'advanced',
    generateSlug: false,
    slug: 'home',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    toggle: 'advanced',
    generateSlug: false,
    slug: 'about',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    toggle: 'advanced',
    generateSlug: false,
    slug: 'contact',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
