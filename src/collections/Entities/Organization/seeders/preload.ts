// FILE: src/collections/Entities/Organization/seeders/preload.ts
export const PRELOAD_ORGANIZATION = [
  {
    name: 'Mercedes-AMG Petronas F1 Team',
    alias: 'Mercedes',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'Formula 1 works team of Mercedes-Benz',
      tagline: 'The Silver Arrows',
      identifier: {
        code: 'MER',
        abbreviation: 'MER',
        registration: 'F1-001',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      background: 'Founded in 1954, re-entered F1 in 2010, dominant team of the hybrid era.',
      evolution: {
        founded: '1954-01-01',
        merged: null,
        rebranded: null,
        defunct: null,
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      reputation: {
        prestige: 'Iconic',
        reliability: 'Exceptional',
        innovation: 'Innovative',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'mercedes-f1',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Red Bull Racing',
    alias: 'Red Bull',
    toggle: 'advanced',
    type: 2,
    basics: {
      enable: true,
      description: 'Formula 1 team owned by Red Bull GmbH',
      tagline: 'The energy drinks team',
      identifier: {
        code: 'RBR',
        abbreviation: 'RBR',
        registration: 'F1-002',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      background: 'Acquired Jaguar Racing in 2004, multiple championship winners.',
      evolution: {
        founded: '2005-01-01',
        merged: null,
        rebranded: null,
        defunct: null,
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      reputation: {
        prestige: 'Prestigious',
        reliability: 'Reliable',
        innovation: 'Innovative',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'red-bull-racing',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Scuderia Ferrari',
    alias: 'Ferrari',
    toggle: 'advanced',
    type: 3,
    basics: {
      enable: true,
      description: 'The oldest and most successful F1 team',
      tagline: 'La Rossa',
      identifier: {
        code: 'FER',
        abbreviation: 'FER',
        registration: 'F1-003',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      background: 'Founded by Enzo Ferrari in 1929, competing in F1 since 1950.',
      evolution: {
        founded: '1929-11-16',
        merged: null,
        rebranded: null,
        defunct: null,
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      reputation: {
        prestige: 'Iconic',
        reliability: 'Reliable',
        innovation: 'Adaptive',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'ferrari',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
