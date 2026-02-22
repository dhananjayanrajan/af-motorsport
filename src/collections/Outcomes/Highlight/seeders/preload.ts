// FILE: src/collections/Outcomes/Highlight/seeders/preload.ts
export const PRELOAD_HIGHLIGHT = [
  {
    name: 'Last Lap Overtake',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'Dramatic last lap pass for victory',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 1,
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
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'last-lap-overtake',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Pole Lap',
    toggle: 'advanced',
    type: 2,
    basics: {
      enable: true,
      description: 'Record-breaking pole position lap',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 2,
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
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'pole-lap',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Pit Stop Record',
    toggle: 'advanced',
    type: 3,
    basics: {
      enable: true,
      description: 'Fastest pit stop in team history',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 3,
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
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'pit-stop-record',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
