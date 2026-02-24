export const PRELOAD_SCHEDULE = (categoriesIds: number[]) => [
  {
    name: 'F1 Pre-Season Testing - Bahrain International Circuit',
    toggle: 'advanced',
    type: categoriesIds[185],
    basics: {
      enable: true,
      agenda: 'Three-day official pre-season testing program for Formula 1 teams to validate car performance, systems integration, and driver acclimatization ahead of the championship opener.',
      scope: {
        significance: 'Critical',
        scale: 'Organization',
        depth: 'Comprehensive'
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2024-02-21',
        type: 'MultiDay',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'f1-pre-season-testing-bahrain-2024',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'Monaco Grand Prix Race Weekend Schedule',
    toggle: 'advanced',
    type: categoriesIds[53],
    basics: {
      enable: true,
      agenda: 'Complete operational timeline for the Monaco Grand Prix weekend including practice sessions, qualifying, race day procedures, and post-event activities.',
      scope: {
        significance: 'Critical',
        scale: 'Organization',
        depth: 'Comprehensive'
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2024-05-23',
        type: 'MultiDay',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'monaco-gp-race-weekend-schedule-2024',
    visibility: { check_publish: true, check_featured: true, check_pinned: true },
  },
  {
    name: 'WEC Le Mans 24h Pre-Event Testing Schedule',
    toggle: 'advanced',
    type: categoriesIds[146],
    basics: {
      enable: true,
      agenda: 'Official test day at Circuit de la Sarthe for WEC Hypercar and LMP2 entries to validate endurance setups, night running procedures, and safety systems.',
      scope: {
        significance: 'Major',
        scale: 'Organization',
        depth: 'Detailed'
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2024-06-02',
        type: 'Single',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'wec-le-mans-pre-event-testing-2024',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'MotoGP Official Test - Sepang International Circuit',
    toggle: 'advanced',
    type: categoriesIds[123],
    basics: {
      enable: true,
      agenda: 'Factory and satellite MotoGP teams conduct tire evaluation, electronics calibration, and rider feedback sessions in tropical conditions.',
      scope: {
        significance: 'Major',
        scale: 'Department',
        depth: 'Detailed'
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2024-02-06',
        type: 'MultiDay',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'motogp-official-test-sepang-2024',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'WRC Rally Monte-Carlo Recce Schedule',
    toggle: 'advanced',
    type: categoriesIds[38],
    basics: {
      enable: true,
      agenda: 'Pre-event reconnaissance schedule for crews to survey special stages, create pace notes, and assess weather-dependent route conditions.',
      scope: {
        significance: 'Critical',
        scale: 'Team',
        depth: 'Comprehensive'
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2024-01-22',
        type: 'MultiDay',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'wrc-monte-carlo-recce-schedule-2024',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'Qualifying Session Driver Briefing Schedule',
    toggle: 'advanced',
    type: categoriesIds[122],
    basics: {
      enable: true,
      agenda: 'Mandatory pre-qualifying briefing covering track evolution, flag protocols, DRS zones, and procedural updates for all competing drivers.',
      scope: {
        significance: 'Major',
        scale: 'Team',
        depth: 'Detailed'
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2024-03-15',
        type: 'Single',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'qualifying-driver-briefing-schedule',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Post-Race Technical Debrief Schedule',
    toggle: 'advanced',
    type: categoriesIds[17],
    basics: {
      enable: true,
      agenda: 'Structured post-race analysis session for engineering, strategy, and performance teams to review telemetry, tire data, and operational execution.',
      scope: {
        significance: 'Major',
        scale: 'Department',
        depth: 'Comprehensive'
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2024-04-07',
        type: 'Single',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'post-race-technical-debrief-schedule',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Chassis Maintenance Window Schedule',
    toggle: 'advanced',
    type: categoriesIds[245],
    basics: {
      enable: true,
      agenda: 'Scheduled downtime for comprehensive chassis inspection, component replacement, and structural integrity verification between race events.',
      scope: {
        significance: 'Moderate',
        scale: 'Department',
        depth: 'Detailed'
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2024-03-25',
        type: 'Single',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'chassis-maintenance-window-schedule',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Season Launch Media Day Schedule',
    toggle: 'advanced',
    type: categoriesIds[243],
    basics: {
      enable: true,
      agenda: 'Coordinated media activities including car reveal, driver interviews, technical presentations, and sponsor activations for season launch event.',
      scope: {
        significance: 'Major',
        scale: 'Organization',
        depth: 'Detailed'
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2024-02-15',
        type: 'Single',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'season-launch-media-day-schedule',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'Flyaway Race Logistics Travel Schedule',
    toggle: 'advanced',
    type: categoriesIds[52],
    basics: {
      enable: true,
      agenda: 'End-to-end logistics timeline for freight forwarding, personnel travel, customs clearance, and equipment deployment for overseas events.',
      scope: {
        significance: 'Critical',
        scale: 'Organization',
        depth: 'Comprehensive'
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2024-03-01',
        type: 'MultiDay',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'flyaway-race-logistics-travel-schedule',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Driver Simulator Training Schedule',
    toggle: 'advanced',
    type: categoriesIds[215],
    basics: {
      enable: true,
      agenda: 'Structured simulator sessions for driver track familiarization, setup validation, race strategy rehearsal, and performance benchmarking.',
      scope: {
        significance: 'Moderate',
        scale: 'Individual',
        depth: 'Detailed'
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2024-02-28',
        type: 'Recurring',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'driver-simulator-training-schedule',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Race Day Strategy Briefing Schedule',
    toggle: 'advanced',
    type: categoriesIds[232],
    basics: {
      enable: true,
      agenda: 'Pre-race strategic alignment session covering tire compound selection, pit stop windows, weather contingencies, and competitor analysis.',
      scope: {
        significance: 'Critical',
        scale: 'Team',
        depth: 'Comprehensive'
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2024-05-05',
        type: 'Single',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'race-day-strategy-briefing-schedule',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'Pit Stop Practice Session Schedule',
    toggle: 'advanced',
    type: categoriesIds[107],
    basics: {
      enable: true,
      agenda: 'Dedicated pit lane time for crew choreography refinement, equipment validation, and sub-2.5 second stop procedure optimization.',
      scope: {
        significance: 'Moderate',
        scale: 'Team',
        depth: 'Detailed'
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2024-04-12',
        type: 'Recurring',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'pit-stop-practice-session-schedule',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'FIA Technical Inspection Schedule',
    toggle: 'advanced',
    type: categoriesIds[126],
    basics: {
      enable: true,
      agenda: 'Mandatory pre-event technical scrutiny schedule for dimensional checks, weight verification, and regulatory compliance validation.',
      scope: {
        significance: 'Critical',
        scale: 'Organization',
        depth: 'Comprehensive'
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2024-03-20',
        type: 'Single',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'fia-technical-inspection-schedule',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Championship Celebration Event Schedule',
    toggle: 'advanced',
    type: categoriesIds[41],
    basics: {
      enable: true,
      agenda: 'End-of-season awards ceremony schedule including trophy presentations, gala dinner, entertainment programming, and stakeholder recognition.',
      scope: {
        significance: 'Major',
        scale: 'Organization',
        depth: 'Detailed'
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      chronology: {
        date: '2024-12-08',
        type: 'Single',
      },
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'championship-celebration-event-schedule',
    visibility: { check_publish: true, check_featured: true, check_pinned: true },
  },
] as const
