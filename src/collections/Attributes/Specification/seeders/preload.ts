// FILE: src/collections/Attributes/Specification/seeders/preload.ts
export const PRELOAD_SPECIFICATION = [
  {
    name: 'Engine Displacement',
    type: 1,
    toggle: 'advanced',
    identifier: { code: 'ENG-DISP-001', version: '2026.1', revision: 'A' },
    basics: { enable: true, description: 'Total swept volume of all engine cylinders', visibility: { show: true } },
    details: {
      enable: true,
      definition: 'The volume displaced by all pistons during one complete engine cycle',
      conditions: { environment: 'Standard atmospheric conditions', constraints: 'Measured at rest, ambient temperature 20°C', compliance: 'Mandatory' },
      visibility: { show: true }
    },
    metrics: {
      enable: true,
      parameters: [{ parameter: 'Displacement', value: '1.6', unit: 'liters', tolerance: '±0.1L' }],
      measurement: { method: 'Bore × Stroke × Cylinder count calculation', frequency: 'Once', accuracy: 'Precision' },
      visibility: { show: true }
    },
    seo: { title: 'Engine Displacement Specification', description: 'Technical specification for racing engine displacement' },
    generateSlug: false,
    slug: 'engine-displacement',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Minimum Weight',
    type: 2,
    toggle: 'advanced',
    identifier: { code: 'WGT-MIN-002', version: '2026.1', revision: 'B' },
    basics: { enable: true, description: 'Minimum allowable vehicle weight including driver', visibility: { show: true } },
    details: {
      enable: true,
      definition: 'Total mass of car with driver, fully fueled, ready to race',
      conditions: { environment: 'Post-race scrutineering', constraints: 'Dry conditions, no ballast removal', compliance: 'Mandatory' },
      visibility: { show: true }
    },
    metrics: {
      enable: true,
      parameters: [{ parameter: 'Minimum Weight', value: '798', unit: 'kg', tolerance: '0' }],
      measurement: { method: 'Electronic scales, all four wheels simultaneously', frequency: 'Periodic', accuracy: 'High' },
      visibility: { show: true }
    },
    seo: { title: 'Minimum Weight Specification', description: 'Technical specification for minimum vehicle weight regulations' },
    generateSlug: false,
    slug: 'minimum-weight',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Fuel Flow Rate',
    type: 3,
    toggle: 'advanced',
    identifier: { code: 'FUL-FLOW-003', version: '2026.2', revision: 'A' },
    basics: { enable: true, description: 'Maximum permitted fuel mass flow rate', visibility: { show: true } },
    details: {
      enable: true,
      definition: 'The maximum instantaneous fuel mass that can be delivered to the engine',
      conditions: { environment: 'All racing conditions', constraints: 'Measured at fuel rail', compliance: 'Mandatory' },
      visibility: { show: true }
    },
    metrics: {
      enable: true,
      parameters: [{ parameter: 'Maximum Flow Rate', value: '100', unit: 'kg/h', tolerance: '0' }],
      measurement: { method: 'Coriolis flow meter', frequency: 'Continuous', accuracy: 'Precision' },
      visibility: { show: true }
    },
    seo: { title: 'Fuel Flow Rate Specification', description: 'Technical specification for maximum fuel flow regulations' },
    generateSlug: false,
    slug: 'fuel-flow-rate',
    visibility: { check_publish: true, check_featured: false, check_pinned: true }
  }
] as const
