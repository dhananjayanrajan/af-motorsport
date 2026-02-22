// FILE: src/collections/Operations/Celebration/seeders/preload.ts
export const PRELOAD_CELEBRATION = [
  {
    name: 'Constructors Championship Win 2025',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'Celebration of 2025 title',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 1,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      prestige: 'Iconic',
      exclusivity: 'TeamOnly',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: '2025-constructors-win',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Drivers Championship Gala',
    toggle: 'advanced',
    type: 2,
    basics: {
      enable: true,
      description: 'Gala for drivers title',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 2,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      prestige: 'Prestigious',
      exclusivity: 'InviteOnly',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'drivers-gala',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: '100th Win Party',
    toggle: 'advanced',
    type: 3,
    basics: {
      enable: true,
      description: 'Celebrating 100th race win',
      visibility: { show: true },
    },
    details: {
      enable: true,
      narrative: 3,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      prestige: 'Notable',
      exclusivity: 'Public',
      visibility: { show: true },
    },
    generateSlug: false,
    slug: '100th-win-party',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
