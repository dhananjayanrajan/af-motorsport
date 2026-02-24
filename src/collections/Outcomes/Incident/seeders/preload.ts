export const PRELOAD_INCIDENT = (categoriesIds: number[], narrativesIds: number[]) => [
  {
    name: 'Verstappen-Hamilton Collision: Turn 1 Contact at Silverstone',
    toggle: 'advanced',
    type: categoriesIds[185],
    basics: {
      enable: true,
      description: 'High-speed first-corner incident involving championship contenders resulting in 51G impact, safety car deployment, and subsequent steward investigation under FIA sporting regulations for racing incident classification.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[29],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'verstappen-hamilton-collision-turn-1-silverstone',
    visibility: { check_publish: true, check_featured: true, check_pinned: true },
  },
  {
    name: 'Power Unit Failure: MGU-K Thermal Overload at Bahrain GP',
    toggle: 'advanced',
    type: categoriesIds[53],
    basics: {
      enable: true,
      description: 'Critical mechanical failure of MGU-K component due to thermal management system malfunction during high-load deployment phase, resulting in immediate power loss and retirement from championship-contending position.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[1],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'power-unit-failure-mgu-k-thermal-overload-bahrain',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'ERS Software Glitch: Energy Deployment Failure at Monaco',
    toggle: 'advanced',
    type: categoriesIds[146],
    basics: {
      enable: true,
      description: 'Electronic control unit software anomaly causing intermittent MGU-K deployment failure during qualifying session, requiring immediate ECU reset procedure and strategic compromise for race start positioning.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[50],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'ers-software-glitch-energy-deployment-failure-monaco',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Pit Lane Speed Limit Violation: Procedural Penalty at Spa',
    toggle: 'advanced',
    type: categoriesIds[123],
    basics: {
      enable: true,
      description: 'Operational incident involving pit lane speed limit exceedance during safety car period, resulting in automatic time penalty application and championship points impact under FIA sporting regulation Article 54.3.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[31],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'pit-lane-speed-limit-violation-procedural-penalty-spa',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Driver Medical Assessment: Concussion Protocol Activation at Monza',
    toggle: 'advanced',
    type: categoriesIds[38],
    basics: {
      enable: true,
      description: 'Medical incident triggering FIA concussion assessment protocol following high-impact barrier contact, requiring immediate extrication, neurological evaluation, and competition clearance determination under medical delegate authority.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[12],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'driver-medical-assessment-concussion-protocol-monza',
    visibility: { check_publish: true, check_featured: true, check_pinned: true },
  },
  {
    name: 'Heavy Rain Delay: Standing Start Procedure Suspension at Interlagos',
    toggle: 'advanced',
    type: categoriesIds[122],
    basics: {
      enable: true,
      description: 'Weather-related incident causing race start suspension due to extreme precipitation and reduced visibility, requiring safety car formation lap, delayed standing start procedure, and dynamic strategy recalibration.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[33],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'heavy-rain-delay-standing-start-suspension-interlagos',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Technical Regulation Breach: Floor Deflection Non-Compliance',
    toggle: 'advanced',
    type: categoriesIds[17],
    basics: {
      enable: true,
      description: 'Regulatory incident involving post-race technical scrutiny discovery of floor deflection exceeding FIA technical regulation limits, resulting in formal protest filing, steward hearing, and potential championship points penalty.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[52],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'technical-regulation-breach-floor-deflection-non-compliance',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'Track Intrusion Security Alert: Unauthorized Access at Paddock',
    toggle: 'advanced',
    type: categoriesIds[245],
    basics: {
      enable: true,
      description: 'Security incident involving unauthorized personnel access to restricted paddock area during qualifying session, triggering immediate security protocol activation, area lockdown, and competition continuity assessment under FIA safety standards.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[54],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'track-intrusion-security-alert-unauthorized-access-paddock',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Multi-Car Pile-Up: First Corner Chaos at Suzuka',
    toggle: 'advanced',
    type: categoriesIds[243],
    basics: {
      enable: true,
      description: 'Mass collision incident at race start involving seven cars at tight first corner complex, requiring red flag deployment, barrier repair assessment, and comprehensive steward investigation for racing incident determination and penalty allocation.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[30],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'multi-car-pile-up-first-corner-chaos-suzuka',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'Gearbox Hydraulic Failure: Shift Mechanism Malfunction at Le Mans',
    toggle: 'advanced',
    type: categoriesIds[52],
    basics: {
      enable: true,
      description: 'Mechanical incident involving gearbox hydraulic pressure loss causing sequential shift mechanism failure during endurance race night stint, requiring extended pit stop for system reset and competitive position recovery strategy.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[27],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'gearbox-hydraulic-failure-shift-malfunction-le-mans',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Telemetry Data Loss: Real-Time Monitoring System Failure',
    toggle: 'advanced',
    type: categoriesIds[215],
    basics: {
      enable: true,
      description: 'Electronic incident involving loss of real-time telemetry data transmission during critical race phase, requiring fallback to recorded data analysis, radio communication adaptation, and strategic decision-making under reduced information conditions.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[59],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'telemetry-data-loss-real-time-monitoring-failure',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Fuel Flow Regulation Breach: Sensor Calibration Discrepancy',
    toggle: 'advanced',
    type: categoriesIds[232],
    basics: {
      enable: true,
      description: 'Operational incident involving fuel flow sensor calibration discrepancy detected during post-qualifying technical inspection, requiring immediate FIA technical delegate consultation, procedural correction, and potential grid penalty assessment.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[5],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'fuel-flow-regulation-breach-sensor-calibration-discrepancy',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'Heat Exhaustion Medical Withdrawal: Driver Fitness Assessment',
    toggle: 'advanced',
    type: categoriesIds[107],
    basics: {
      enable: true,
      description: 'Medical incident involving driver heat exhaustion symptoms during extreme ambient temperature conditions, requiring immediate medical evaluation, hydration protocol implementation, and competition fitness clearance determination under FIA medical standards.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[60],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'heat-exhaustion-medical-withdrawal-driver-fitness',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Lightning Storm Race Suspension: Extreme Weather Protocol',
    toggle: 'advanced',
    type: categoriesIds[126],
    basics: {
      enable: true,
      description: 'Weather incident involving lightning activity within 10km radius of circuit triggering mandatory race suspension under FIA safety regulations, requiring immediate red flag deployment, personnel shelter protocol, and dynamic restart procedure planning.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[54],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'lightning-storm-race-suspension-extreme-weather-protocol',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'Aerodynamic Component Homologation Dispute: Technical Protest',
    toggle: 'advanced',
    type: categoriesIds[41],
    basics: {
      enable: true,
      description: 'Regulatory incident involving competitor protest regarding aerodynamic component homologation compliance, requiring technical working group review, FIA technical directive consultation, and potential design modification mandate under sporting regulations.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[10],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'aerodynamic-component-homologation-dispute-technical-protest',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Cybersecurity Alert: Team Network Intrusion Attempt',
    toggle: 'advanced',
    type: categoriesIds[9],
    basics: {
      enable: true,
      description: 'Security incident involving detected unauthorized access attempt to team data network during race weekend, triggering immediate cybersecurity protocol activation, system isolation procedure, and forensic investigation under FIA data protection standards.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[38],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'cybersecurity-alert-team-network-intrusion-attempt',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Tire Delamination: Compound Failure at High-Speed Corner',
    toggle: 'advanced',
    type: categoriesIds[105],
    basics: {
      enable: true,
      description: 'Mechanical incident involving tire compound delamination at high-speed corner due to extreme load conditions and temperature window exceedance, resulting in immediate loss of control, barrier contact, and safety car deployment for debris clearance.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[46],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'tire-delamination-compound-failure-high-speed-corner',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'Radio Communication Blackout: Team Driver Link Failure',
    toggle: 'advanced',
    type: categoriesIds[118],
    basics: {
      enable: true,
      description: 'Electronic incident involving complete radio communication failure between pit wall and driver during critical race phase, requiring fallback to pre-agreed hand signals, strategic autonomy execution, and post-race system diagnostic investigation.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[3],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'radio-communication-blackout-team-driver-link-failure',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Parc Fermé Breach: Post-Qualifying Technical Access Violation',
    toggle: 'advanced',
    type: categoriesIds[27],
    basics: {
      enable: true,
      description: 'Operational incident involving unauthorized technical access to vehicle under parc fermé conditions following qualifying session, triggering immediate steward notification, procedural investigation, and potential grid penalty assessment under FIA sporting regulations.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[24],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'parc-ferme-breach-post-qualifying-technical-access',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Barrier Impact Medical Response: High-G Extraction Protocol',
    toggle: 'advanced',
    type: categoriesIds[166],
    basics: {
      enable: true,
      description: 'Medical incident involving high-impact barrier collision requiring immediate FIA medical delegate activation, specialized extrication team deployment, on-site trauma assessment, and rapid transport protocol coordination under international motorsport safety standards.',
      visibility: { show: true },
    },
    details: {
      enable: true,
      visibility: { show: true },
    },
    traits: {
      enable: true,
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      narrative: narrativesIds[2],
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'barrier-impact-medical-response-high-g-extraction',
    visibility: { check_publish: true, check_featured: true, check_pinned: true },
  },
] as const
