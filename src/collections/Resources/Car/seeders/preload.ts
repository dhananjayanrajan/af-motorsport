// FILE: src/collections/Resources/Car/seeders/preload.ts
export const PRELOAD_CAR = [
  {
    name: 'SF-24',
    toggle: 'advanced',
    type: 1,
    identifiers: {
      chassis: '675',
      model: 'SF-24',
      version: 'Evo',
      code: 'Ferrari',
    },
    basics: {
      enable: true,
      description: '2024 Ferrari Formula 1 car',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      status: 'Active',
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
    slug: 'sf-24',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'RB20',
    toggle: 'advanced',
    type: 2,
    identifiers: {
      chassis: 'RB20-01',
      model: 'RB20',
      version: 'Spec 1',
      code: 'Red Bull',
    },
    basics: {
      enable: true,
      description: '2024 Red Bull Racing Formula 1 car',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      status: 'Active',
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
    slug: 'rb20',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'W15',
    toggle: 'advanced',
    type: 3,
    identifiers: {
      chassis: 'W15-001',
      model: 'W15',
      version: 'Launch Spec',
      code: 'Mercedes',
    },
    basics: {
      enable: true,
      description: '2024 Mercedes-AMG Formula 1 car',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      status: 'Active',
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
    slug: 'w15',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
