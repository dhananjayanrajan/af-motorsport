// FILE: src/collections/Attributes/Feature/seeders/preload.ts
export const PRELOAD_FEATURE = (categoriesIds: number[]) => [
  {
    name: 'Active Aerodynamics',
    type: categoriesIds[185],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Automatically adjusting aerodynamic surfaces that optimize downforce and drag balance in real-time based on vehicle dynamics and driver inputs.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Rear wing elements and front splitter components adjust angle of attack and position based on speed, throttle position, brake application, and steering input to maximize cornering grip while minimizing straight-line drag. Integrated with vehicle control systems for seamless performance adaptation.',
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
      description: 'Advanced aerodynamic systems for optimal performance across all racing conditions',
      image: null
    },
    generateSlug: false,
    slug: 'active-aerodynamics',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    },
    updatedAt: '2026-02-22T10:00:00.000Z',
    createdAt: '2026-01-15T09:00:00.000Z'
  },
  {
    name: 'Carbon Composite Monocoque',
    type: categoriesIds[53],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Lightweight yet extremely strong driver survival cell constructed from advanced carbon fiber composites and honeycomb core materials.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Multi-layer carbon fiber and aluminum honeycomb construction providing maximum crash protection with minimum weight. Integrates impact structures, fuel cell containment, and safety system mounting points while maintaining exceptional torsional rigidity for precise vehicle handling.',
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
      description: 'Advanced driver safety cell construction for maximum protection and performance',
      image: null
    },
    generateSlug: false,
    slug: 'carbon-composite-monocoque',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: false
    },
    updatedAt: '2026-02-22T10:30:00.000Z',
    createdAt: '2026-01-16T10:00:00.000Z'
  },
  {
    name: 'Telemetry Data System',
    type: categoriesIds[146],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Comprehensive real-time data acquisition and wireless transmission system monitoring hundreds of vehicle parameters for performance optimization and strategic decision-making.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Over 500 sensors monitor engine parameters, suspension travel, tire temperatures, aerodynamic loads, and driver inputs. Data transmitted via encrypted RF link to pit wall for real-time analysis, with onboard storage for post-session review. Integrated with strategy software for predictive modeling and race decision support.',
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
      description: 'Advanced data acquisition for performance optimization and strategic advantage',
      image: null
    },
    generateSlug: false,
    slug: 'telemetry-data-system',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: false,
      check_pinned: true
    },
    updatedAt: '2026-02-22T11:00:00.000Z',
    createdAt: '2026-01-17T11:00:00.000Z'
  },
  {
    name: 'Hybrid Energy Recovery',
    type: categoriesIds[123],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Advanced kinetic and thermal energy recovery systems converting braking energy and exhaust heat into electrical power for performance enhancement.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'MGU-K recovers kinetic energy during braking, storing in high-voltage battery for deployment during acceleration. MGU-H captures thermal energy from turbocharger exhaust, improving efficiency and reducing turbo lag. Integrated control systems manage energy flow for optimal performance within regulatory limits.',
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
      title: 'Hybrid Energy Recovery | AF Motorsport Features',
      description: 'Advanced energy recovery systems for enhanced performance and efficiency',
      image: null
    },
    generateSlug: false,
    slug: 'hybrid-energy-recovery',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    },
    updatedAt: '2026-02-22T11:30:00.000Z',
    createdAt: '2026-01-18T12:00:00.000Z'
  },
  {
    name: 'Sequential Gearbox',
    type: categoriesIds[38],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'High-performance sequential transmission with paddle-shift operation and electronic control for rapid, precise gear changes.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Eight-speed sequential gearbox with carbon fiber case, titanium gears, and electro-hydraulic actuation. Paddle-shift operation enables gear changes in under 50 milliseconds without lifting throttle. Integrated traction control and launch control systems optimize power delivery for maximum acceleration.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'High',
        visibility: 'Visible',
        impact: 'Significant'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Sequential Gearbox | AF Motorsport Features',
      description: 'High-performance transmission technology for rapid, precise gear changes',
      image: null
    },
    generateSlug: false,
    slug: 'sequential-gearbox',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: false,
      check_pinned: false
    },
    updatedAt: '2026-02-22T12:00:00.000Z',
    createdAt: '2026-01-19T13:00:00.000Z'
  },
  {
    name: 'Pushrod Suspension',
    type: categoriesIds[122],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Advanced suspension architecture using pushrod actuation for optimal weight distribution and aerodynamic packaging.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Pushrod-actuated suspension places springs and dampers within the chassis for improved aerodynamic efficiency and lower center of gravity. Adjustable geometry allows fine-tuning of camber, toe, and roll characteristics for circuit-specific optimization. Integrated with telemetry for real-time setup validation.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'High',
        visibility: 'Visible',
        impact: 'Significant'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Pushrod Suspension | AF Motorsport Features',
      description: 'Advanced suspension architecture for optimal handling and aerodynamic efficiency',
      image: null
    },
    generateSlug: false,
    slug: 'pushrod-suspension',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: false,
      check_pinned: false
    },
    updatedAt: '2026-02-22T12:30:00.000Z',
    createdAt: '2026-01-20T14:00:00.000Z'
  },
  {
    name: 'Fire Suppression System',
    type: categoriesIds[17],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Comprehensive fire protection system with automatic and manual activation for cockpit and engine compartment safety.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Dual-zone fire suppression system with AFFF agent distribution to cockpit and engine bay. Automatic activation via thermal sensors, manual override via driver controls, and external activation points for marshals. Integrated with fuel cut-off and electrical isolation systems for comprehensive incident response.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'Medium',
        visibility: 'Integrated',
        impact: 'Critical'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Fire Suppression System | AF Motorsport Features',
      description: 'Comprehensive fire protection for driver and vehicle safety',
      image: null
    },
    generateSlug: false,
    slug: 'fire-suppression-system',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    },
    updatedAt: '2026-02-22T13:00:00.000Z',
    createdAt: '2026-01-21T15:00:00.000Z'
  },
  {
    name: 'Driver Cooling System',
    type: categoriesIds[245],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Advanced thermal management system maintaining driver comfort and performance in extreme racing conditions.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Liquid-cooled vest system with temperature-regulated coolant circulation through helmet, suit, and gloves. Integrated with vehicle cooling system for efficient heat exchange. Adjustable flow rates allow driver customization based on conditions and personal preference.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'Medium',
        visibility: 'Concealed',
        impact: 'Moderate'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Driver Cooling System | AF Motorsport Features',
      description: 'Advanced thermal management for driver comfort and performance',
      image: null
    },
    generateSlug: false,
    slug: 'driver-cooling-system',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: false,
      check_pinned: false
    },
    updatedAt: '2026-02-22T13:30:00.000Z',
    createdAt: '2026-01-22T16:00:00.000Z'
  },
  {
    name: 'Brake-by-Wire System',
    type: categoriesIds[243],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Electronic brake control system with precise modulation and integration with hybrid energy recovery.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Electro-hydraulic brake system with pedal feel simulation and electronic brake force distribution. Integrated with MGU-K for seamless blending of friction and regenerative braking. Adaptive calibration adjusts brake balance based on track conditions, tire wear, and driver preference.',
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
      title: 'Brake-by-Wire System | AF Motorsport Features',
      description: 'Advanced electronic brake control for precise modulation and hybrid integration',
      image: null
    },
    generateSlug: false,
    slug: 'brake-by-wire-system',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: false,
      check_pinned: false
    },
    updatedAt: '2026-02-22T14:00:00.000Z',
    createdAt: '2026-01-23T17:00:00.000Z'
  },
  {
    name: 'Steering Wheel Interface',
    type: categoriesIds[52],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Multi-function steering wheel with integrated controls, displays, and haptic feedback for comprehensive vehicle management.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Carbon fiber steering wheel with rotary dials, push buttons, and paddle shifters controlling engine maps, differential settings, brake balance, and communication systems. Integrated LCD display shows critical vehicle data. Haptic feedback provides tactile confirmation of system changes without visual distraction.',
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
      title: 'Steering Wheel Interface | AF Motorsport Features',
      description: 'Multi-function steering controls for comprehensive vehicle management',
      image: null
    },
    generateSlug: false,
    slug: 'steering-wheel-interface',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: false,
      check_pinned: false
    },
    updatedAt: '2026-02-22T14:30:00.000Z',
    createdAt: '2026-01-24T18:00:00.000Z'
  },
  {
    name: 'Ground Effect Aerodynamics',
    type: categoriesIds[215],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Advanced underbody aerodynamics generating downforce through venturi tunnel principles for enhanced cornering performance.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Sculpted underbody with venturi tunnels and diffuser generating significant downforce with minimal drag. Adjustable ride height and seal systems optimize ground effect performance across varying track surfaces. Integrated with suspension for consistent aerodynamic platform maintenance.',
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
      title: 'Ground Effect Aerodynamics | AF Motorsport Features',
      description: 'Advanced underbody aerodynamics for maximum downforce efficiency',
      image: null
    },
    generateSlug: false,
    slug: 'ground-effect-aerodynamics',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: false
    },
    updatedAt: '2026-02-22T15:00:00.000Z',
    createdAt: '2026-01-25T19:00:00.000Z'
  },
  {
    name: 'Tire Pressure Monitoring',
    type: categoriesIds[232],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Real-time tire pressure and temperature monitoring system for optimal grip management and strategic decision-making.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Wireless sensors in each wheel transmit real-time pressure and temperature data to pit wall. Integrated with vehicle dynamics software to predict tire behavior and optimize strategy. Alerts for abnormal conditions enable proactive intervention to prevent performance loss or safety incidents.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'Medium',
        visibility: 'Integrated',
        impact: 'Moderate'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Tire Pressure Monitoring | AF Motorsport Features',
      description: 'Real-time tire monitoring for optimal performance and safety',
      image: null
    },
    generateSlug: false,
    slug: 'tire-pressure-monitoring',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: false,
      check_pinned: false
    },
    updatedAt: '2026-02-22T15:30:00.000Z',
    createdAt: '2026-01-26T20:00:00.000Z'
  },
  {
    name: 'Driver Communication System',
    type: categoriesIds[107],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Advanced two-way radio system with noise cancellation and priority channel management for clear race-critical communication.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Digital radio system with active noise cancellation, voice activation, and priority channel management. Integrated with vehicle systems for automated status updates. Redundant transmission paths ensure communication reliability in all conditions. Helmet-mounted controls enable hands-free operation.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'Medium',
        visibility: 'Integrated',
        impact: 'Moderate'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Driver Communication System | AF Motorsport Features',
      description: 'Advanced radio system for clear, reliable race communication',
      image: null
    },
    generateSlug: false,
    slug: 'driver-communication-system',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: false,
      check_pinned: false
    },
    updatedAt: '2026-02-22T16:00:00.000Z',
    createdAt: '2026-01-27T21:00:00.000Z'
  },
  {
    name: 'Fuel Cell Safety System',
    type: categoriesIds[126],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Advanced fuel containment system with puncture-resistant bladder and anti-explosion foam for maximum safety.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Multi-layer Kevlar and rubber bladder with self-sealing properties contains fuel under extreme conditions. Anti-explosion foam prevents vapor accumulation and flame propagation. Integrated with crash sensors for automatic fuel cut-off and system isolation in incident scenarios.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'High',
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
      title: 'Fuel Cell Safety System | AF Motorsport Features',
      description: 'Advanced fuel containment for maximum safety in racing conditions',
      image: null
    },
    generateSlug: false,
    slug: 'fuel-cell-safety-system',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    },
    updatedAt: '2026-02-22T16:30:00.000Z',
    createdAt: '2026-01-28T22:00:00.000Z'
  },
  {
    name: 'Electronic Differential Control',
    type: categoriesIds[41],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Advanced limited-slip differential with electronic control for optimal traction and handling balance.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Electronically controlled multi-plate clutch differential adjusts torque distribution between rear wheels based on steering angle, throttle position, and wheel speed differentials. Driver-adjustable settings allow customization for circuit characteristics and driving style. Integrated with traction control for seamless power delivery.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'High',
        visibility: 'Concealed',
        impact: 'Significant'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Electronic Differential Control | AF Motorsport Features',
      description: 'Advanced traction management for optimal handling and performance',
      image: null
    },
    generateSlug: false,
    slug: 'electronic-differential-control',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: false,
      check_pinned: false
    },
    updatedAt: '2026-02-22T17:00:00.000Z',
    createdAt: '2026-01-29T23:00:00.000Z'
  },
  {
    name: 'Lightweight Wheel Assembly',
    type: categoriesIds[9],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Forged magnesium wheels with integrated brake cooling ducts for reduced unsprung mass and improved thermal management.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Single-piece forged magnesium construction minimizes unsprung mass for improved suspension response. Integrated brake cooling ducts direct airflow to brake discs and calipers for consistent performance under extreme loads. Central locking system enables rapid wheel changes during pit stops.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'Medium',
        visibility: 'Visible',
        impact: 'Moderate'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Lightweight Wheel Assembly | AF Motorsport Features',
      description: 'Advanced wheel technology for reduced weight and improved cooling',
      image: null
    },
    generateSlug: false,
    slug: 'lightweight-wheel-assembly',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: false,
      check_pinned: false
    },
    updatedAt: '2026-02-22T17:30:00.000Z',
    createdAt: '2026-01-30T00:00:00.000Z'
  },
  {
    name: 'Driver Restraint System',
    type: categoriesIds[105],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Advanced six-point harness with HANS device compatibility for maximum driver protection during high-G impacts.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'FIA-approved six-point harness with quick-release buckles and adjustable tensioners. Integrated with HANS device mounting points for head and neck protection. Fire-resistant webbing and padding provide comfort while maintaining safety standards. Pre-tensioning system optimizes restraint during impact events.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'Medium',
        visibility: 'Visible',
        impact: 'Critical'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Driver Restraint System | AF Motorsport Features',
      description: 'Advanced safety harness for maximum driver protection',
      image: null
    },
    generateSlug: false,
    slug: 'driver-restraint-system',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    },
    updatedAt: '2026-02-22T18:00:00.000Z',
    createdAt: '2026-01-31T01:00:00.000Z'
  },
  {
    name: 'Aerodynamic Bodywork',
    type: categoriesIds[118],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Precision-engineered body panels optimizing airflow management for downforce generation and drag reduction.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'Carbon fiber body panels with complex surface geometries managing airflow around and through the vehicle. Front wing, bargeboards, sidepods, and rear wing work in concert to generate downforce while minimizing drag. Modular design enables rapid configuration changes for circuit-specific optimization.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      nature: {
        complexity: 'Extreme',
        visibility: 'Prominent',
        impact: 'Critical'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Aerodynamic Bodywork | AF Motorsport Features',
      description: 'Precision aerodynamic surfaces for optimal performance',
      image: null
    },
    generateSlug: false,
    slug: 'aerodynamic-bodywork',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: false
    },
    updatedAt: '2026-02-22T18:30:00.000Z',
    createdAt: '2026-02-01T02:00:00.000Z'
  },
  {
    name: 'Engine Management System',
    type: categoriesIds[27],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Advanced electronic control unit managing engine parameters for optimal performance, efficiency, and reliability.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      functionality: 'High-performance ECU with real-time control of fuel injection, ignition timing, turbo boost, and hybrid system integration. Adaptive mapping adjusts parameters based on environmental conditions, fuel quality, and component wear. Integrated diagnostics enable proactive maintenance and performance optimization.',
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
      title: 'Engine Management System | AF Motorsport Features',
      description: 'Advanced electronic control for optimal engine performance',
      image: null
    },
    generateSlug: false,
    slug: 'engine-management-system',
    categories: null,
    tags: null,
    visibility: {
      check_publish: true,
      check_featured: false,
      check_pinned: false
    },
    updatedAt: '2026-02-22T19:00:00.000Z',
    createdAt: '2026-02-02T03:00:00.000Z'
  }
] as const
