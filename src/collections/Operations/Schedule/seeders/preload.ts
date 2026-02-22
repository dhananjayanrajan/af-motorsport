// FILE: src/collections/Operations/Schedule/seeders/preload.ts
export const PRELOAD_SCHEDULE = [
  {
    name: 'Race Weekend Schedule',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      agenda: 'Full race weekend timeline',
      scope: {
        significance: 'Major',
        scale: 'Team',
        depth: 'Detailed',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2026-07-03',
        type: 'MultiDay',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'race-weekend-schedule',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Test Session Schedule',
    toggle: 'advanced',
    type: 2,
    basics: {
      enable: true,
      agenda: 'Private test day',
      scope: {
        significance: 'Moderate',
        scale: 'Team',
        depth: 'Detailed',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2026-04-12',
        type: 'Single',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'test-schedule',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Manufacturing Schedule',
    toggle: 'advanced',
    type: 3,
    basics: {
      enable: true,
      agenda: 'Production timeline for new parts',
      scope: {
        significance: 'Critical',
        scale: 'Department',
        depth: 'Overview',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2026-02-01',
        type: 'Recurring',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'manufacturing-schedule',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
