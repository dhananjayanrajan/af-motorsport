// FILE: src/collections/Attributes/Tag/seeders/preload.ts
export const PRELOAD_TAG = [
  {
    name: 'Formula 1',
    type: 1,
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'The pinnacle of open-wheel motorsport',
      context: 'World Championship events and technical regulations',
      visibility: { show: true }
    },
    seo: {
      title: 'Formula 1 Tag | AF Motorsport',
      description: 'Content tagged with Formula 1 - the pinnacle of motorsport'
    },
    generateSlug: false,
    slug: 'formula-1',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  },
  {
    name: 'Le Mans',
    type: 3,
    toggle: 'advanced',
    details: {
      enable: true,
      description: '24 Hours of Le Mans endurance racing',
      context: 'Heritage, iconic moments, and legendary victories',
      visibility: { show: true }
    },
    seo: {
      title: 'Le Mans Tag | AF Motorsport',
      description: 'Endurance racing heritage and the 24 Hours of Le Mans'
    },
    generateSlug: false,
    slug: 'le-mans',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: false
    }
  },
  {
    name: 'Safety Innovation',
    type: 2,
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Advances in motorsport safety technology',
      context: 'FIA regulations, crash protection, and survival cells',
      visibility: { show: true }
    },
    seo: {
      title: 'Safety Innovation Tag | AF Motorsport',
      description: 'Latest developments in motorsport safety technology and regulations'
    },
    generateSlug: false,
    slug: 'safety-innovation',
    visibility: {
      check_publish: true,
      check_featured: false,
      check_pinned: true
    }
  }
] as const
