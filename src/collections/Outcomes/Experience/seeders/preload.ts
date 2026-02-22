// FILE: src/collections/Outcomes/Experience/seeders/preload.ts
export const PRELOAD_EXPERIENCE = [
  {
    name: 'First F1 Race',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'Driver debut experience',
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
    slug: 'first-f1-race',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Le Mans Win',
    toggle: 'advanced',
    type: 2,
    basics: {
      enable: true,
      description: 'Winning Le Mans 24 Hours',
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
    slug: 'le-mans-win',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Championship Season',
    toggle: 'advanced',
    type: 3,
    basics: {
      enable: true,
      description: 'Winning the championship',
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
    slug: 'championship-season',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
