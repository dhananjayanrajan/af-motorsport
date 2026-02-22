// FILE: src/collections/Operations/Protocol/seeders/preload.ts
export const PRELOAD_PROTOCOL = [
  {
    name: 'Pit Stop Procedure',
    toggle: 'advanced',
    type: 1,
    identifier: {
      code: 'PIT-001',
      version: '1.0',
      revision: 'A',
    },
    basics: {
      enable: true,
      description: 'Standard pit stop protocol',
      objective: 'Execute safe and fast pit stops',
      visibility: { show: true },
    },
    details: {
      enable: true,
      procedure: '1. Car enters pit lane. 2. Jack men lift car. 3. Tire changers replace wheels. 4. Car lowered and released.',
      steps: [
        {
          step: 'Entry',
          instruction: 'Car stops at marks',
          requirement: 'Speed limit observed',
        },
      ],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'pit-stop-procedure',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Qualifying Outlap',
    toggle: 'advanced',
    type: 2,
    identifier: {
      code: 'QLY-002',
      version: '2.1',
      revision: 'C',
    },
    basics: {
      enable: true,
      description: 'Procedure for qualifying outlap',
      objective: 'Prepare tires for flying lap',
      visibility: { show: true },
    },
    details: {
      enable: true,
      procedure: 'Gradual acceleration, tire warming, battery charge management.',
      steps: [
        {
          step: 'Warm-up',
          instruction: 'Weave to heat tires',
          requirement: 'Stay within track limits',
        },
      ],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'qualifying-outlap',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Safety Car Restart',
    toggle: 'advanced',
    type: 3,
    identifier: {
      code: 'RES-003',
      version: '3.0',
      revision: 'B',
    },
    basics: {
      enable: true,
      description: 'Restart procedure after safety car',
      objective: 'Ensure safe and fair restart',
      visibility: { show: true },
    },
    details: {
      enable: true,
      procedure: 'Lights out at designated point, no overtaking until start/finish line.',
      steps: [
        {
          step: 'Restart',
          instruction: 'Accelerate at lights out',
          requirement: 'No overtaking before line',
        },
      ],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'safety-car-restart',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
