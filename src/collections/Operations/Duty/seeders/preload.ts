// FILE: src/collections/Operations/Duty/seeders/preload.ts
export const PRELOAD_DUTY = [
  {
    name: 'Race Engineer',
    toggle: 'advanced',
    type: 1,
    basics: {
      enable: true,
      description: 'Manage car setup and driver communication',
      visibility: { show: true },
    },
    details: {
      enable: true,
      obligation: {
        tasks: 'Oversee car setup, analyze telemetry, communicate with driver',
        reporting: 'Chief Engineer',
        authority: 'Pit wall decisions',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'race-engineer',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Pit Crew Chief',
    toggle: 'advanced',
    type: 2,
    basics: {
      enable: true,
      description: 'Coordinate pit stops and crew',
      visibility: { show: true },
    },
    details: {
      enable: true,
      obligation: {
        tasks: 'Manage pit crew, ensure safety, coordinate pit stops',
        reporting: 'Team Manager',
        authority: 'Pit crew assignments',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'pit-crew-chief',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Data Analyst',
    toggle: 'advanced',
    type: 3,
    basics: {
      enable: true,
      description: 'Analyze telemetry and performance data',
      visibility: { show: true },
    },
    details: {
      enable: true,
      obligation: {
        tasks: 'Process telemetry, create reports, support engineers',
        reporting: 'Head of Performance',
        authority: 'Data recommendations',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'data-analyst',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
] as const
