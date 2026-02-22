// FILE: src/collections/Attributes/Feature/seeders/preload.ts
export const PRELOAD_FEATURE = [
  {
    name: 'Active Aerodynamics',
    type: 1,
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Automatically adjusting aerodynamic surfaces for optimal performance',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Rear wing elements adjust angle of attack based on speed, throttle position, and driver input to balance downforce and drag',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'High',
        visibility: 'Prominent',
        impact: 'Significant'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Active Aerodynamics | AF Motorsport Features',
      description: 'Advanced aerodynamic systems for optimal performance'
    },
    generateSlug: false,
    slug: 'active-aerodynamics',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  },
  {
    name: 'Carbon Composite Monocoque',
    type: 1,
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Lightweight and extremely strong driver survival cell',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Carbon fiber and honeycomb construction providing maximum protection with minimum weight, integrating impact structures and safety features',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'Extreme',
        visibility: 'Concealed',
        impact: 'Critical'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Carbon Composite Monocoque | AF Motorsport Features',
      description: 'Advanced driver safety cell construction'
    },
    generateSlug: false,
    slug: 'carbon-composite-monocoque',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: false
    }
  },
  {
    name: 'Telemetry System',
    type: 1,
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Real-time data acquisition and transmission system',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Hundreds of sensors monitor vehicle parameters, transmitting data to pit wall for real-time analysis and strategic decisions',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'High',
        visibility: 'Integrated',
        impact: 'Significant'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Telemetry System | AF Motorsport Features',
      description: 'Advanced data acquisition for performance optimization'
    },
    generateSlug: false,
    slug: 'telemetry-system',
    visibility: {
      check_publish: true,
      check_featured: false,
      check_pinned: true
    }
  }
] as const
