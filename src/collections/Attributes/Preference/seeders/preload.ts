// FILE: src/collections/Attributes/Preference/seeders/preload.ts
export const PRELOAD_PREFERENCE = (categoriesIds: number[]) => [
  {
    name: 'High Contrast Mode',
    type: categoriesIds[185],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Optimizes UI for visual clarity in bright paddock conditions.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Ambient light > 10000 lux', prerequisite: 'Light Sensor API' },
        { trigger: 'User accessibility toggle', prerequisite: 'OS Settings' }
      ],
      reasons: [
        { reason: 'Improves telemetry readability under direct sunlight', importance: 'Critical' },
        { reason: 'Reduces eye strain during extended race weekends', importance: 'High' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'High Contrast Mode | AF Motorsport', description: 'Accessibility preference for motorsport telemetry interfaces' },
    generateSlug: false,
    slug: 'high-contrast-mode',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Telemetry Overlay Density',
    type: categoriesIds[53],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Controls the amount of live data displayed on driver HUD.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Session type: Race', prerequisite: 'FIA Timing API' },
        { trigger: 'Driver experience level', prerequisite: 'License Classification' }
      ],
      reasons: [
        { reason: 'Prevents cognitive overload during critical race phases', importance: 'Critical' },
        { reason: 'Enables focused data analysis for engineering debriefs', importance: 'High' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Telemetry Overlay Settings | AF Motorsport', description: 'Customize live data display density for racing interfaces' },
    generateSlug: false,
    slug: 'telemetry-overlay-density',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Radio Communication Priority',
    type: categoriesIds[146],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Filters team radio messages by urgency and role.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Safety car deployment', prerequisite: 'Race Control Feed' },
        { trigger: 'Driver request for engineering', prerequisite: 'Team Protocol' }
      ],
      reasons: [
        { reason: 'Ensures critical safety messages are never missed', importance: 'Critical' },
        { reason: 'Reduces radio clutter during strategic decision windows', importance: 'High' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Team Radio Filter | AF Motorsport', description: 'Prioritize essential communications during race operations' },
    generateSlug: false,
    slug: 'radio-communication-priority',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Tire Compound Visualization',
    type: categoriesIds[123],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Color-codes tire strategy and degradation status.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Pirelli compound allocation', prerequisite: 'Technical Regulations' },
        { trigger: 'Live tire temperature data', prerequisite: 'Telemetry Stream' }
      ],
      reasons: [
        { reason: 'Enables instant strategy assessment at a glance', importance: 'High' },
        { reason: 'Supports real-time degradation monitoring', importance: 'Critical' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Tire Strategy Display | AF Motorsport', description: 'Visual preference for tire compound and wear tracking' },
    generateSlug: false,
    slug: 'tire-compound-visualization',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Fuel Strategy Alerts',
    type: categoriesIds[38],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Notifies driver and engineer of fuel consumption thresholds.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Fuel margin < 2 laps', prerequisite: 'ECU Data Stream' },
        { trigger: 'Safety car probability > 70%', prerequisite: 'Weather/Race Control API' }
      ],
      reasons: [
        { reason: 'Prevents race-ending fuel starvation', importance: 'Critical' },
        { reason: 'Enables proactive lift-and-coast strategy adjustments', importance: 'High' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Fuel Management Alerts | AF Motorsport', description: 'Critical notifications for race fuel strategy optimization' },
    generateSlug: false,
    slug: 'fuel-strategy-alerts',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Weather Radar Integration',
    type: categoriesIds[122],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Overlays real-time precipitation and track condition data.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Rain probability > 30%', prerequisite: 'Meteorological Service API' },
        { trigger: 'Track temperature delta > 5°C', prerequisite: 'Track Sensors' }
      ],
      reasons: [
        { reason: 'Enables proactive tire and setup decisions', importance: 'Critical' },
        { reason: 'Improves driver safety in changing conditions', importance: 'Critical' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Weather Radar Preference | AF Motorsport', description: 'Real-time weather integration for race strategy planning' },
    generateSlug: false,
    slug: 'weather-radar-integration',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Driver Biometric Display',
    type: categoriesIds[17],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Shows heart rate, G-force exposure, and hydration metrics.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Session duration > 45 minutes', prerequisite: 'Timing System' },
        { trigger: 'Ambient temperature > 30°C', prerequisite: 'Weather API' }
      ],
      reasons: [
        { reason: 'Monitors driver physical readiness for performance optimization', importance: 'High' },
        { reason: 'Supports medical team intervention protocols', importance: 'Critical' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Biometric Monitoring | AF Motorsport', description: 'Driver health and performance metrics display preference' },
    generateSlug: false,
    slug: 'driver-biometric-display',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Pit Stop Timer Preference',
    type: categoriesIds[245],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Customizes countdown display for pit lane entry and stop execution.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Pit lane speed limit active', prerequisite: 'FIA Timing' },
        { trigger: 'Crew readiness confirmation', prerequisite: 'Team Protocol' }
      ],
      reasons: [
        { reason: 'Minimizes time loss during critical race phases', importance: 'Critical' },
        { reason: 'Coordinates multi-role pit crew actions precisely', importance: 'High' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Pit Stop Timer | AF Motorsport', description: 'Precision timing preference for pit lane operations' },
    generateSlug: false,
    slug: 'pit-stop-timer-preference',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Track Map Detail Level',
    type: categoriesIds[243],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Adjusts granularity of circuit layout and sector information.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Qualifying session', prerequisite: 'Session Type API' },
        { trigger: 'Driver request for reference', prerequisite: 'Team Radio' }
      ],
      reasons: [
        { reason: 'Supports precise braking point and apex visualization', importance: 'High' },
        { reason: 'Reduces visual clutter during high-speed decision making', importance: 'Medium' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Track Map Settings | AF Motorsport', description: 'Customizable circuit layout display for driver reference' },
    generateSlug: false,
    slug: 'track-map-detail-level',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Audio Mix Balance',
    type: categoriesIds[52],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Balances engine noise, team radio, and ambient track audio.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Cockpit microphone active', prerequisite: 'Audio System' },
        { trigger: 'Radio traffic volume threshold', prerequisite: 'Communication Protocol' }
      ],
      reasons: [
        { reason: 'Ensures clear communication without masking critical engine cues', importance: 'Critical' },
        { reason: 'Enhances driver situational awareness through ambient sound', importance: 'Medium' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Audio Mix Settings | AF Motorsport', description: 'Custom audio balance preference for racing communications' },
    generateSlug: false,
    slug: 'audio-mix-balance',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Haptic Feedback Intensity',
    type: categoriesIds[215],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Controls vibration alerts for warnings and system notifications.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'ABS activation', prerequisite: 'ECU Signal' },
        { trigger: 'Track limits warning', prerequisite: 'FIA Timing' }
      ],
      reasons: [
        { reason: 'Provides tactile alerts without visual distraction', importance: 'High' },
        { reason: 'Supports driver focus during high-G cornering', importance: 'Medium' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Haptic Feedback | AF Motorsport', description: 'Tactile alert preference for driver interface systems' },
    generateSlug: false,
    slug: 'haptic-feedback-intensity',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Data Refresh Rate',
    type: categoriesIds[232],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Sets telemetry update frequency for live performance metrics.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Race session active', prerequisite: 'Timing System' },
        { trigger: 'Network bandwidth > 10Mbps', prerequisite: 'Connectivity Monitor' }
      ],
      reasons: [
        { reason: 'Ensures real-time decision support for strategy team', importance: 'Critical' },
        { reason: 'Balances data fidelity with system resource usage', importance: 'Medium' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Telemetry Refresh Rate | AF Motorsport', description: 'Live data update frequency preference for racing operations' },
    generateSlug: false,
    slug: 'data-refresh-rate',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Night Mode Auto-Switch',
    type: categoriesIds[107],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Automatically enables dark UI theme for twilight and night sessions.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Ambient light < 500 lux', prerequisite: 'Light Sensor' },
        { trigger: 'Session start time after 18:00 local', prerequisite: 'Event Schedule' }
      ],
      reasons: [
        { reason: 'Reduces eye strain during twilight racing conditions', importance: 'High' },
        { reason: 'Preserves night vision for driver and engineer focus', importance: 'Medium' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Night Mode Preference | AF Motorsport', description: 'Automatic dark theme for evening and night racing sessions' },
    generateSlug: false,
    slug: 'night-mode-auto-switch',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Team Radio Filter',
    type: categoriesIds[126],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Filters non-essential radio chatter during critical race phases.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Final 10 laps of race', prerequisite: 'Timing System' },
        { trigger: 'Safety car or VSC active', prerequisite: 'Race Control' }
      ],
      reasons: [
        { reason: 'Ensures driver focus on race-critical communications', importance: 'Critical' },
        { reason: 'Reduces cognitive load during high-pressure moments', importance: 'High' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Radio Filter Settings | AF Motorsport', description: 'Priority-based team radio filtering for race operations' },
    generateSlug: false,
    slug: 'team-radio-filter',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Lap Delta Display Format',
    type: categoriesIds[41],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Chooses between time delta, percentage, or sector-based lap comparison.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Qualifying session', prerequisite: 'Session Type' },
        { trigger: 'Driver preference selection', prerequisite: 'User Profile' }
      ],
      reasons: [
        { reason: 'Enables personalized performance feedback style', importance: 'High' },
        { reason: 'Supports different driver cognitive processing preferences', importance: 'Medium' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Lap Delta Format | AF Motorsport', description: 'Customizable lap time comparison display preference' },
    generateSlug: false,
    slug: 'lap-delta-display-format',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Gear Shift Indicator Style',
    type: categoriesIds[9],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Selects visual, auditory, or haptic shift point notifications.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Engine RPM > 90% redline', prerequisite: 'ECU Data' },
        { trigger: 'DRS activation zone', prerequisite: 'Track Mapping' }
      ],
      reasons: [
        { reason: 'Optimizes shift timing for maximum power delivery', importance: 'Critical' },
        { reason: 'Adapts to driver sensory preference for performance consistency', importance: 'High' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Shift Indicator Preference | AF Motorsport', description: 'Custom gear shift notification style for racing interfaces' },
    generateSlug: false,
    slug: 'gear-shift-indicator-style',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Brake Temperature Warning Threshold',
    type: categoriesIds[105],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Sets alert level for brake disc temperature monitoring.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Brake temp > 800°C', prerequisite: 'Telemetry Sensors' },
        { trigger: 'Consecutive heavy braking zones', prerequisite: 'Track Analysis' }
      ],
      reasons: [
        { reason: 'Prevents brake fade and failure during endurance stints', importance: 'Critical' },
        { reason: 'Enables proactive cooling strategy adjustments', importance: 'High' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Brake Temp Alerts | AF Motorsport', description: 'Critical temperature monitoring preference for brake systems' },
    generateSlug: false,
    slug: 'brake-temperature-warning-threshold',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Aerodynamic Balance Visualization',
    type: categoriesIds[118],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Displays real-time front/rear downforce distribution metrics.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'DRS activation/deactivation', prerequisite: 'FIA Timing' },
        { trigger: 'Setup change confirmation', prerequisite: 'Engineering Protocol' }
      ],
      reasons: [
        { reason: 'Enables precise aero balance tuning during session', importance: 'High' },
        { reason: 'Supports driver feedback on car handling characteristics', importance: 'Medium' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Aero Balance Display | AF Motorsport', description: 'Real-time aerodynamic distribution visualization preference' },
    generateSlug: false,
    slug: 'aerodynamic-balance-visualization',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Driver Coaching Audio Level',
    type: categoriesIds[27],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Adjusts volume of engineer coaching and performance feedback.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Free practice session', prerequisite: 'Session Type' },
        { trigger: 'Driver request for feedback', prerequisite: 'Team Radio' }
      ],
      reasons: [
        { reason: 'Enables clear instruction without masking critical race audio', importance: 'High' },
        { reason: 'Supports personalized learning style for driver development', importance: 'Medium' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Coaching Audio Settings | AF Motorsport', description: 'Customizable engineer feedback volume preference' },
    generateSlug: false,
    slug: 'driver-coaching-audio-level',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Race Control Message Priority',
    type: categoriesIds[166],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Categorizes and prioritizes official race control communications.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Safety car deployment', prerequisite: 'FIA Timing' },
        { trigger: 'Track incident flag', prerequisite: 'Race Control API' }
      ],
      reasons: [
        { reason: 'Ensures immediate awareness of safety-critical directives', importance: 'Critical' },
        { reason: 'Prevents missed penalties or procedural instructions', importance: 'High' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Race Control Alerts | AF Motorsport', description: 'Priority filtering for official race communications' },
    generateSlug: false,
    slug: 'race-control-message-priority',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Suspension Setup Quick-View',
    type: categoriesIds[84],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Provides one-tap access to current suspension configuration metrics.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Pit stop entry', prerequisite: 'Timing System' },
        { trigger: 'Engineering change request', prerequisite: 'Team Protocol' }
      ],
      reasons: [
        { reason: 'Accelerates setup decision-making during limited pit windows', importance: 'High' },
        { reason: 'Reduces cognitive load when evaluating multiple parameters', importance: 'Medium' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Suspension Quick-View | AF Motorsport', description: 'Rapid access preference for chassis setup parameters' },
    generateSlug: false,
    slug: 'suspension-setup-quick-view',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Fuel Consumption Projection',
    type: categoriesIds[48],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Displays predictive fuel usage based on current pace and conditions.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Race distance > 50% complete', prerequisite: 'Timing System' },
        { trigger: 'Safety car probability assessment', prerequisite: 'Strategy Algorithm' }
      ],
      reasons: [
        { reason: 'Enables proactive fuel saving strategy implementation', importance: 'Critical' },
        { reason: 'Supports dynamic race plan adjustments in real-time', importance: 'High' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Fuel Projection Display | AF Motorsport', description: 'Predictive fuel management preference for race strategy' },
    generateSlug: false,
    slug: 'fuel-consumption-projection',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Tire Degradation Alert Sensitivity',
    type: categoriesIds[109],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Configures threshold for tire wear and performance drop notifications.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Lap time delta > 0.5s', prerequisite: 'Timing Data' },
        { trigger: 'Tire temperature spread > 15°C', prerequisite: 'Telemetry Sensors' }
      ],
      reasons: [
        { reason: 'Prevents unexpected performance loss during critical race phases', importance: 'Critical' },
        { reason: 'Enables precise pit stop timing optimization', importance: 'High' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Tire Wear Alerts | AF Motorsport', description: 'Customizable tire degradation monitoring preference' },
    generateSlug: false,
    slug: 'tire-degradation-alert-sensitivity',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Position Change Notification Style',
    type: categoriesIds[110],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Selects visual, auditory, or combined alerts for overtakes and position changes.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Position change detected', prerequisite: 'FIA Timing' },
        { trigger: 'Battle with direct competitor', prerequisite: 'Strategy Algorithm' }
      ],
      reasons: [
        { reason: 'Ensures immediate awareness of race position dynamics', importance: 'High' },
        { reason: 'Supports driver focus by minimizing unnecessary interruptions', importance: 'Medium' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'Position Alerts | AF Motorsport', description: 'Custom notification style for race position changes' },
    generateSlug: false,
    slug: 'position-change-notification-style',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'DRS Zone Indicator Preference',
    type: categoriesIds[147],
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Customizes display of DRS activation zones and availability status.',
      visibility: { show: true }
    },
    traits: {
      enable: true,
      conditions: [
        { trigger: 'Within 1 second of car ahead', prerequisite: 'Timing Data' },
        { trigger: 'DRS detection zone entry', prerequisite: 'Track Mapping' }
      ],
      reasons: [
        { reason: 'Enables precise DRS utilization for overtaking opportunities', importance: 'Critical' },
        { reason: 'Prevents illegal DRS activation and penalties', importance: 'Critical' }
      ],
      visibility: { show: true }
    },
    contexts: { enable: true, visibility: { show: true } },
    seo: { title: 'DRS Zone Display | AF Motorsport', description: 'Customizable DRS activation zone visualization preference' },
    generateSlug: false,
    slug: 'drs-zone-indicator-preference',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  }
] as const;
