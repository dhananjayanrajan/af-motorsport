// FILE: src/collections/Attributes/Skill/seeders/preload.ts
export const PRELOAD_SKILL = [
  {
    name: 'Aerodynamic Analysis',
    type: 1,
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Computational and physical analysis of aerodynamic performance',
      scope: {
        significance: 'Critical for competitive advantage',
        scale: 'Comprehensive',
        depth: 'Expert',
        rarity: 'Rare'
      },
      visibility: { show: true }
    },
    details: {
      enable: true,
      definition: 'The systematic study of airflow over and through vehicle surfaces to optimize downforce and reduce drag',
      methods: [
        {
          method: 'CFD Simulation',
          type: 'Simulation',
          description: 'Computational Fluid Dynamics analysis'
        }
      ],
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'Extreme',
        visibility: 'Concealed',
        impact: 'Major'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Aerodynamic Analysis | AF Motorsport Skills',
      description: 'Expert-level aerodynamic analysis for competitive motorsport advantage'
    },
    generateSlug: false,
    slug: 'aerodynamic-analysis',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  },
  {
    name: 'Fluid Dynamics Fundamentals',
    type: 1,
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Core principles of fluid mechanics and thermodynamics',
      scope: {
        significance: 'Foundation for all aerodynamic work',
        scale: 'Broad',
        depth: 'Advanced',
        rarity: 'Common'
      },
      visibility: { show: true }
    },
    details: {
      enable: true,
      definition: 'Understanding of Bernoullis principle, boundary layers, laminar and turbulent flow, and heat transfer',
      methods: [
        {
          method: 'Theoretical Study',
          type: 'Theoretical',
          description: 'Mathematical foundations and equations'
        }
      ],
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'High',
        visibility: 'Subtle',
        impact: 'Moderate'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Fluid Dynamics Fundamentals | AF Motorsport Skills',
      description: 'Core principles of fluid mechanics for motorsport engineering'
    },
    generateSlug: false,
    slug: 'fluid-dynamics-fundamentals',
    visibility: {
      check_publish: true,
      check_featured: false,
      check_pinned: false
    }
  },
  {
    name: 'Race Strategy',
    type: 3,
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Strategic decision-making during competitive racing events',
      scope: {
        significance: 'Often determines race outcomes',
        scale: 'Comprehensive',
        depth: 'Advanced',
        rarity: 'Uncommon'
      },
      visibility: { show: true }
    },
    details: {
      enable: true,
      definition: 'Real-time analysis of tire degradation, fuel consumption, weather conditions, and competitor positioning to optimize pit stops and track position',
      methods: [
        {
          method: 'Simulation Training',
          type: 'Simulation',
          description: 'Race strategy software and scenario planning'
        }
      ],
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'High',
        visibility: 'Obvious',
        impact: 'Transformative'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Race Strategy | AF Motorsport Skills',
      description: 'Strategic decision-making expertise for competitive racing'
    },
    generateSlug: false,
    slug: 'race-strategy',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  }
] as const
