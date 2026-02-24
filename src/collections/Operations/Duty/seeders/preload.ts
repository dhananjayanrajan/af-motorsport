// FILE: src/collections/Operations/Duty/seeders/preload.ts
export const PRELOAD_DUTY = (categoriesIds: number[]) => [
  {
    name: 'Race Strategy Execution Duty',
    toggle: 'advanced',
    type: categoriesIds[185],
    basics: { enable: true, description: 'Responsibility for implementing and adapting race strategy decisions during competitive sessions.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Monitor live telemetry data, coordinate pit stop timing, communicate strategy updates to driver, adapt to changing race conditions', reporting: 'Direct to Team Principal and Chief Strategist', authority: 'Authority to recommend in-race tactical adjustments within predefined parameters' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Race Strategy Execution Duty | AF Motorsport', description: 'Duty definition for race strategy implementation responsibilities' },
    generateSlug: false, slug: 'race-strategy-execution-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Vehicle Safety Inspection Duty',
    toggle: 'advanced',
    type: categoriesIds[53],
    basics: { enable: true, description: 'Mandatory pre-session and post-session vehicle safety verification and compliance documentation.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Conduct structural integrity checks, verify safety system functionality, document compliance with FIA regulations, report deficiencies', reporting: 'Direct to Safety Officer and Technical Director', authority: 'Authority to withhold vehicle clearance until safety standards are met' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Vehicle Safety Inspection Duty | AF Motorsport', description: 'Duty definition for mandatory vehicle safety verification responsibilities' },
    generateSlug: false, slug: 'vehicle-safety-inspection-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Technical Data Analysis Duty',
    toggle: 'advanced',
    type: categoriesIds[146],
    basics: { enable: true, description: 'Responsibility for processing telemetry data and generating actionable performance insights.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Process real-time sensor data, identify performance trends, generate comparative reports, recommend setup adjustments', reporting: 'Direct to Performance Engineer and Technical Director', authority: 'Authority to flag critical performance anomalies for immediate attention' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Technical Data Analysis Duty | AF Motorsport', description: 'Duty definition for telemetry processing and performance insight generation' },
    generateSlug: false, slug: 'technical-data-analysis-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Pit Stop Coordination Duty',
    toggle: 'advanced',
    type: categoriesIds[123],
    basics: { enable: true, description: 'Responsibility for orchestrating precise pit stop execution and crew coordination.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Coordinate crew positioning, verify equipment readiness, execute timed stop procedures, document performance metrics', reporting: 'Direct to Pit Crew Chief and Race Engineer', authority: 'Authority to abort stop procedure if safety protocols are compromised' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Pit Stop Coordination Duty | AF Motorsport', description: 'Duty definition for pit stop execution and crew coordination responsibilities' },
    generateSlug: false, slug: 'pit-stop-coordination-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Driver Communication Duty',
    toggle: 'advanced',
    type: categoriesIds[38],
    basics: { enable: true, description: 'Responsibility for maintaining clear, prioritized communication with driver during competitive sessions.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Transmit strategy updates, relay performance feedback, communicate safety information, manage radio protocol compliance', reporting: 'Direct to Race Engineer and Team Principal', authority: 'Authority to prioritize critical safety communications over non-essential traffic' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Driver Communication Duty | AF Motorsport', description: 'Duty definition for driver communication and information management responsibilities' },
    generateSlug: false, slug: 'driver-communication-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Aerodynamic Development Duty',
    toggle: 'advanced',
    type: categoriesIds[122],
    basics: { enable: true, description: 'Responsibility for advancing aerodynamic performance through CFD analysis and wind tunnel correlation.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Execute CFD simulations, coordinate wind tunnel testing, analyze correlation data, recommend design iterations', reporting: 'Direct to Aerodynamics Director and Technical Director', authority: 'Authority to prioritize development resources within allocated budget parameters' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Aerodynamic Development Duty | AF Motorsport', description: 'Duty definition for aerodynamic performance advancement responsibilities' },
    generateSlug: false, slug: 'aerodynamic-development-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Regulatory Compliance Duty',
    toggle: 'advanced',
    type: categoriesIds[17],
    basics: { enable: true, description: 'Responsibility for ensuring organizational adherence to sporting and technical regulations.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Monitor regulation updates, verify technical compliance, prepare documentation for scrutineering, liaise with governing bodies', reporting: 'Direct to Team Principal and Legal Counsel', authority: 'Authority to halt non-compliant activities pending regulatory clarification' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Regulatory Compliance Duty | AF Motorsport', description: 'Duty definition for regulatory adherence and compliance verification responsibilities' },
    generateSlug: false, slug: 'regulatory-compliance-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Powertrain Reliability Duty',
    toggle: 'advanced',
    type: categoriesIds[245],
    basics: { enable: true, description: 'Responsibility for maintaining powertrain performance and preventing mechanical failures.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Monitor engine parameters, schedule maintenance intervals, analyze failure modes, implement preventive measures', reporting: 'Direct to Powertrain Director and Technical Director', authority: 'Authority to recommend engine replacement based on reliability thresholds' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Powertrain Reliability Duty | AF Motorsport', description: 'Duty definition for powertrain performance maintenance and failure prevention' },
    generateSlug: false, slug: 'powertrain-reliability-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Media Relations Duty',
    toggle: 'advanced',
    type: categoriesIds[243],
    basics: { enable: true, description: 'Responsibility for managing organizational communications with media and public audiences.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Coordinate press conferences, manage social media content, prepare briefing materials, handle crisis communications', reporting: 'Direct to Communications Director and Team Principal', authority: 'Authority to approve or decline media access requests within organizational guidelines' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Media Relations Duty | AF Motorsport', description: 'Duty definition for media communication and public relations management' },
    generateSlug: false, slug: 'media-relations-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Logistics Coordination Duty',
    toggle: 'advanced',
    type: categoriesIds[52],
    basics: { enable: true, description: 'Responsibility for managing global freight movement and race weekend equipment transport.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Plan freight schedules, coordinate customs documentation, manage warehouse inventory, oversee equipment loading', reporting: 'Direct to Operations Director and Team Principal', authority: 'Authority to adjust transport priorities based on event-critical requirements' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Logistics Coordination Duty | AF Motorsport', description: 'Duty definition for global freight management and race weekend logistics' },
    generateSlug: false, slug: 'logistics-coordination-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Driver Fitness Monitoring Duty',
    toggle: 'advanced',
    type: categoriesIds[215],
    basics: { enable: true, description: 'Responsibility for tracking driver physical condition and recommending performance optimization.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Monitor biometric data, assess recovery status, coordinate training programs, recommend rest periods', reporting: 'Direct to Team Doctor and Performance Director', authority: 'Authority to recommend driver substitution based on medical assessment' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Driver Fitness Monitoring Duty | AF Motorsport', description: 'Duty definition for driver physical condition tracking and performance optimization' },
    generateSlug: false, slug: 'driver-fitness-monitoring-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Sponsorship Activation Duty',
    toggle: 'advanced',
    type: categoriesIds[232],
    basics: { enable: true, description: 'Responsibility for delivering partner brand exposure and activation commitments.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Coordinate brand placement, manage hospitality events, track activation metrics, report ROI to partners', reporting: 'Direct to Commercial Director and Team Principal', authority: 'Authority to approve brand integration within technical and safety constraints' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Sponsorship Activation Duty | AF Motorsport', description: 'Duty definition for partner brand activation and exposure delivery' },
    generateSlug: false, slug: 'sponsorship-activation-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Incident Response Duty',
    toggle: 'advanced',
    type: categoriesIds[107],
    basics: { enable: true, description: 'Responsibility for coordinating emergency response and safety protocols during incidents.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Activate emergency protocols, coordinate medical response, document incident details, liaise with race control', reporting: 'Direct to Safety Officer and Team Principal', authority: 'Authority to initiate immediate safety interventions without prior approval' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Incident Response Duty | AF Motorsport', description: 'Duty definition for emergency response coordination and safety protocol execution' },
    generateSlug: false, slug: 'incident-response-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Simulation Development Duty',
    toggle: 'advanced',
    type: categoriesIds[126],
    basics: { enable: true, description: 'Responsibility for advancing driver training and setup correlation through simulation platforms.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Develop simulation scenarios, correlate virtual and real data, train drivers on platforms, validate setup predictions', reporting: 'Direct to Simulation Director and Technical Director', authority: 'Authority to prioritize simulation development resources within technical roadmap' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Simulation Development Duty | AF Motorsport', description: 'Duty definition for simulation platform advancement and driver training support' },
    generateSlug: false, slug: 'simulation-development-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Quality Assurance Duty',
    toggle: 'advanced',
    type: categoriesIds[41],
    basics: { enable: true, description: 'Responsibility for verifying component quality and manufacturing process compliance.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Inspect manufactured components, verify process documentation, conduct failure analysis, implement corrective actions', reporting: 'Direct to Quality Manager and Technical Director', authority: 'Authority to reject non-conforming components and halt production processes' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Quality Assurance Duty | AF Motorsport', description: 'Duty definition for component quality verification and process compliance' },
    generateSlug: false, slug: 'quality-assurance-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Tire Strategy Duty',
    toggle: 'advanced',
    type: categoriesIds[9],
    basics: { enable: true, description: 'Responsibility for optimizing tire compound selection and degradation management.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Analyze tire performance data, predict degradation patterns, recommend compound choices, coordinate pit stop timing', reporting: 'Direct to Chief Strategist and Race Engineer', authority: 'Authority to recommend tire strategy adjustments based on real-time performance data' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Tire Strategy Duty | AF Motorsport', description: 'Duty definition for tire compound optimization and degradation management' },
    generateSlug: false, slug: 'tire-strategy-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Weather Monitoring Duty',
    toggle: 'advanced',
    type: categoriesIds[105],
    basics: { enable: true, description: 'Responsibility for tracking weather conditions and advising on strategic adaptations.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Monitor meteorological data, predict track condition changes, recommend tire and setup adjustments, communicate updates to team', reporting: 'Direct to Race Engineer and Chief Strategist', authority: 'Authority to recommend immediate strategy changes based on weather developments' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Weather Monitoring Duty | AF Motorsport', description: 'Duty definition for weather tracking and strategic adaptation recommendations' },
    generateSlug: false, slug: 'weather-monitoring-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Budget Compliance Duty',
    toggle: 'advanced',
    type: categoriesIds[118],
    basics: { enable: true, description: 'Responsibility for ensuring organizational expenditure adherence to regulatory cost caps.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Track departmental expenditures, verify cost cap compliance, prepare regulatory submissions, recommend budget adjustments', reporting: 'Direct to Finance Director and Team Principal', authority: 'Authority to flag non-compliant expenditures for immediate review' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Budget Compliance Duty | AF Motorsport', description: 'Duty definition for cost cap adherence and financial regulatory compliance' },
    generateSlug: false, slug: 'budget-compliance-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Driver Development Duty',
    toggle: 'advanced',
    type: categoriesIds[27],
    basics: { enable: true, description: 'Responsibility for nurturing emerging talent and advancing driver performance capabilities.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Assess driver performance, design training programs, provide coaching feedback, track progression metrics', reporting: 'Direct to Sporting Director and Team Principal', authority: 'Authority to recommend driver promotion or role adjustment based on performance assessment' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Driver Development Duty | AF Motorsport', description: 'Duty definition for emerging talent nurturing and performance advancement' },
    generateSlug: false, slug: 'driver-development-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Sustainability Initiative Duty',
    toggle: 'advanced',
    type: categoriesIds[166],
    basics: { enable: true, description: 'Responsibility for advancing environmental responsibility across organizational operations.', visibility: { show: true } },
    details: { enable: true, obligation: { tasks: 'Implement sustainable practices, track carbon footprint, coordinate recycling programs, report environmental metrics', reporting: 'Direct to Sustainability Officer and Team Principal', authority: 'Authority to recommend operational changes to improve environmental performance' }, visibility: { show: true } },
    contexts: { enable: true, protocols: [], expectations: [], notes: [], visibility: { show: true } },
    seo: { title: 'Sustainability Initiative Duty | AF Motorsport', description: 'Duty definition for environmental responsibility advancement and sustainability tracking' },
    generateSlug: false, slug: 'sustainability-initiative-duty',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  }
] as const;
