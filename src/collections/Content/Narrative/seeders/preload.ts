// FILE: src/collections/Content/Narrative/seeders/preload.ts
export const PRELOAD_NARRATIVE = [
  {
    name: 'Silverstone Victory',
    alias: '2025 Win',
    toggle: 'advanced',
    details: {
      enable: true,
      content: {
        root: {
          type: 'root',
          children: [{ type: 'paragraph', version: 1, children: [{ type: 'text', text: 'A thrilling victory at Silverstone.', version: 1 }] }],
          direction: null,
          format: '',
          indent: 0,
          version: 1,
        },
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'silverstone-victory',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Monza Overtake',
    alias: 'Last Lap Pass',
    toggle: 'advanced',
    details: {
      enable: true,
      content: {
        root: {
          type: 'root',
          children: [{ type: 'paragraph', version: 1, children: [{ type: 'text', text: 'Last lap pass at Monza.', version: 1 }] }],
          direction: null,
          format: '',
          indent: 0,
          version: 1,
        },
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'monza-overtake',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Le Mans Comeback',
    alias: '24h Recovery',
    toggle: 'advanced',
    details: {
      enable: true,
      content: {
        root: {
          type: 'root',
          children: [{ type: 'paragraph', version: 1, children: [{ type: 'text', text: 'Recovery from early setback at Le Mans.', version: 1 }] }],
          direction: null,
          format: '',
          indent: 0,
          version: 1,
        },
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'le-mans-comeback',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
