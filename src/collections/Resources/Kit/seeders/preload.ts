// FILE: src/collections/Resources/Kit/seeders/preload.ts
export const PRELOAD_KIT = [
  {
    name: 'Race Suit',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'Professional fireproof race suit',
      purpose: {
        application: 'Track',
        context: 'Race',
        conditions: 'High heat and flame protection',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Performance',
        inspiration: 'Safety and aerodynamics',
        designer: 'Alpinestars',
        year: '2026-01-01',
      },
      functionality: {
        performance: 'Maximum',
        durability: 'Extreme',
        comfort: 'Premium',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'CutAndSew',
        assembly: 'Stitched',
        finish: 'Matte',
      },
      materials: [
        {
          type: 'Nomex',
          specification: 'Fire-resistant 3-layer',
          origin: 'USA',
        },
      ],
      appearance: {
        colors: 'Red/Black/White',
        branding: 'Prominent',
        style: 'Modern',
      },
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
    slug: 'race-suit',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Helmet',
    toggle: 'advanced',
    type: 2,
    basics: {
      enable: true,
      description: 'Carbon fiber racing helmet',
      purpose: {
        application: 'Track',
        context: 'Race',
        conditions: 'Impact protection and aerodynamics',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Aero',
        inspiration: 'Formula 1 safety standards',
        designer: 'Bell',
        year: '2026-01-01',
      },
      functionality: {
        performance: 'Enhanced',
        durability: 'High',
        comfort: 'Premium',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'Molded',
        assembly: 'Bonded',
        finish: 'Glossy',
      },
      materials: [
        {
          type: 'Carbon',
          specification: 'Pre-preg carbon fiber',
          origin: 'Italy',
        },
      ],
      appearance: {
        colors: 'Custom livery',
        branding: 'Prominent',
        style: 'Modern',
      },
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
    slug: 'helmet',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Gloves',
    toggle: 'advanced',
    type: 3,
    basics: {
      enable: true,
      description: 'Performance driving gloves',
      purpose: {
        application: 'Track',
        context: 'Race',
        conditions: 'Grip and comfort',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Grip',
        inspiration: 'Driver feedback',
        designer: 'Sparco',
        year: '2026-01-01',
      },
      functionality: {
        performance: 'Standard',
        durability: 'Medium',
        comfort: 'Comfortable',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'CutAndSew',
        assembly: 'Stitched',
        finish: 'Textured',
      },
      materials: [
        {
          type: 'Leather',
          specification: 'Premium goat leather',
          origin: 'Spain',
        },
      ],
      appearance: {
        colors: 'Black with red accents',
        branding: 'Minimal',
        style: 'Classic',
      },
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
    slug: 'gloves',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
