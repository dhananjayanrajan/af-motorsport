// FILE: src/collections/Entities/Member/seeders/preload.ts
export const PRELOAD_MEMBER = (categoriesIds: number[], narrativesIds: number[]) => [
  {
    first: 'James',
    middle: '',
    last: 'Allison',
    alias: 'JA-TD',
    toggle: 'advanced',
    type: categoriesIds[185],
    basics: {
      enable: true,
      description: 'Technical Director overseeing chassis and aerodynamic development programs.',
      identifier: { number: 'TD001', nickname: 'J', callsign: 'Allison', badge: 'TECH-DIR' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '56', nationality: 'British' },
      chronology: { birth: '1968-02-22', debut: '2017-03-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Former Ferrari chassis director with championship-winning experience across multiple teams. Joined Mercedes to lead technical development and competitive strategy.', visibility: { show: true } },
    seo: { title: 'James Allison Member Profile | AF Motorsport', description: 'Profile of Technical Director James Allison' },
    generateSlug: false, slug: 'james-allison',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    first: 'Andrew',
    middle: '',
    last: 'Shovlin',
    alias: 'Shov',
    toggle: 'advanced',
    type: categoriesIds[53],
    basics: {
      enable: true,
      description: 'Trackside Engineering Director leading race operations and strategy execution.',
      identifier: { number: 'TED002', nickname: 'Shov', callsign: 'Shovlin', badge: 'TRACK-ENG' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '50', nationality: 'British' },
      chronology: { birth: '1973-11-04', debut: '2000-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Long-time Mercedes engineer with extensive trackside experience. Leads real-time strategy decisions and race weekend operations.', visibility: { show: true } },
    seo: { title: 'Andrew Shovlin Member Profile | AF Motorsport', description: 'Profile of Trackside Engineering Director Andrew Shovlin' },
    generateSlug: false, slug: 'andrew-shovlin',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Günther',
    middle: '',
    last: 'Steiner',
    alias: 'GS-TP',
    toggle: 'advanced',
    type: categoriesIds[146],
    basics: {
      enable: true,
      description: 'Former Team Principal known for candid leadership and operational excellence.',
      identifier: { number: 'TP003', nickname: 'Gunther', callsign: 'Steiner', badge: 'TEAM-PRIN' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '59', nationality: 'Italian' },
      chronology: { birth: '1965-04-07', debut: '2016-01-01', retirement: '2024-01-10' },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Founded and led Haas F1 Team from inception through competitive midfield campaigns. Known for direct communication and team-first leadership philosophy.', visibility: { show: true } },
    seo: { title: 'Günther Steiner Member Profile | AF Motorsport', description: 'Profile of former Team Principal Günther Steiner' },
    generateSlug: false, slug: 'gunther-steiner',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Mike',
    middle: '',
    last: 'Elliott',
    alias: 'ME-PD',
    toggle: 'advanced',
    type: categoriesIds[123],
    basics: {
      enable: true,
      description: 'Performance Director overseeing vehicle dynamics and setup optimization.',
      identifier: { number: 'PD004', nickname: 'Mike', callsign: 'Elliott', badge: 'PERF-DIR' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '52', nationality: 'British' },
      chronology: { birth: '1971-08-15', debut: '2010-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Former race engineer promoted to Performance Director. Expertise in vehicle dynamics, tire management, and race strategy execution.', visibility: { show: true } },
    seo: { title: 'Mike Elliott Member Profile | AF Motorsport', description: 'Profile of Performance Director Mike Elliott' },
    generateSlug: false, slug: 'mike-elliott',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Sarah',
    middle: '',
    last: 'Johnson',
    alias: 'SJ-DE',
    toggle: 'advanced',
    type: categoriesIds[38],
    basics: {
      enable: true,
      description: 'Lead Data Engineer specializing in telemetry analysis and performance modeling.',
      identifier: { number: 'DE005', nickname: 'Sarah', callsign: 'Johnson', badge: 'DATA-ENG' },
      identity: { gender: 'Female', pronouns: 'she/her', age: '38', nationality: 'British' },
      chronology: { birth: '1986-05-20', debut: '2015-03-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'PhD in aerospace engineering with specialization in real-time data processing. Leads telemetry analysis team for performance optimization.', visibility: { show: true } },
    seo: { title: 'Sarah Johnson Member Profile | AF Motorsport', description: 'Profile of Lead Data Engineer Sarah Johnson' },
    generateSlug: false, slug: 'sarah-johnson',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Marco',
    middle: '',
    last: 'Serra',
    alias: 'MS-PE',
    toggle: 'advanced',
    type: categoriesIds[122],
    basics: {
      enable: true,
      description: 'Senior Performance Engineer focused on tire strategy and race pace optimization.',
      identifier: { number: 'PE006', nickname: 'Marco', callsign: 'Serra', badge: 'PERF-ENG' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '42', nationality: 'Italian' },
      chronology: { birth: '1982-11-08', debut: '2012-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Former tire manufacturer engineer with deep expertise in compound behavior and degradation modeling. Key contributor to race strategy development.', visibility: { show: true } },
    seo: { title: 'Marco Serra Member Profile | AF Motorsport', description: 'Profile of Senior Performance Engineer Marco Serra' },
    generateSlug: false, slug: 'marco-serra',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Emma',
    middle: '',
    last: 'Clarke',
    alias: 'EC-STR',
    toggle: 'advanced',
    type: categoriesIds[17],
    basics: {
      enable: true,
      description: 'Chief Strategist leading race planning and in-race decision making.',
      identifier: { number: 'STR007', nickname: 'Emma', callsign: 'Clarke', badge: 'CHIEF-STRAT' },
      identity: { gender: 'Female', pronouns: 'she/her', age: '45', nationality: 'British' },
      chronology: { birth: '1979-03-12', debut: '2008-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Mathematics background with specialization in game theory and real-time optimization. Leads strategy team for championship campaigns.', visibility: { show: true } },
    seo: { title: 'Emma Clarke Member Profile | AF Motorsport', description: 'Profile of Chief Strategist Emma Clarke' },
    generateSlug: false, slug: 'emma-clarke',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Luca',
    middle: '',
    last: 'Fabbri',
    alias: 'LF-AE',
    toggle: 'advanced',
    type: categoriesIds[245],
    basics: {
      enable: true,
      description: 'Aerodynamics Specialist leading CFD development and wind tunnel correlation.',
      identifier: { number: 'AE008', nickname: 'Luca', callsign: 'Fabbri', badge: 'AERO-SPEC' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '40', nationality: 'Italian' },
      chronology: { birth: '1984-07-25', debut: '2014-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'PhD in fluid dynamics with expertise in computational modeling and experimental validation. Leads aerodynamic development programs.', visibility: { show: true } },
    seo: { title: 'Luca Fabbri Member Profile | AF Motorsport', description: 'Profile of Aerodynamics Specialist Luca Fabbri' },
    generateSlug: false, slug: 'luca-fabbri',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Rachel',
    middle: '',
    last: 'Thompson',
    alias: 'RT-PC',
    toggle: 'advanced',
    type: categoriesIds[243],
    basics: {
      enable: true,
      description: 'Pit Crew Chief coordinating sub-2-second stop execution and crew training.',
      identifier: { number: 'PC009', nickname: 'Rach', callsign: 'Thompson', badge: 'PIT-CHIEF' },
      identity: { gender: 'Female', pronouns: 'she/her', age: '35', nationality: 'British' },
      chronology: { birth: '1989-09-14', debut: '2016-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Former professional athlete with expertise in team coordination and performance under pressure. Leads pit crew training and race weekend operations.', visibility: { show: true } },
    seo: { title: 'Rachel Thompson Member Profile | AF Motorsport', description: 'Profile of Pit Crew Chief Rachel Thompson' },
    generateSlug: false, slug: 'rachel-thompson',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Hans',
    middle: '',
    last: 'Mueller',
    alias: 'HM-ME',
    toggle: 'advanced',
    type: categoriesIds[52],
    basics: {
      enable: true,
      description: 'Lead Mechanic specializing in powertrain assembly and reliability optimization.',
      identifier: { number: 'ME010', nickname: 'Hans', callsign: 'Mueller', badge: 'LEAD-MECH' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '48', nationality: 'German' },
      chronology: { birth: '1976-01-30', debut: '2005-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Master technician with decades of experience in high-performance engine assembly. Leads powertrain reliability programs and maintenance protocols.', visibility: { show: true } },
    seo: { title: 'Hans Mueller Member Profile | AF Motorsport', description: 'Profile of Lead Mechanic Hans Mueller' },
    generateSlug: false, slug: 'hans-mueller',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Sophie',
    middle: '',
    last: 'Laurent',
    alias: 'SL-CO',
    toggle: 'advanced',
    type: categoriesIds[215],
    basics: {
      enable: true,
      description: 'Operations Coordinator managing logistics and race weekend scheduling.',
      identifier: { number: 'CO011', nickname: 'Sophie', callsign: 'Laurent', badge: 'OPS-COORD' },
      identity: { gender: 'Female', pronouns: 'she/her', age: '36', nationality: 'French' },
      chronology: { birth: '1988-04-18', debut: '2017-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Project management background with expertise in complex logistics coordination. Manages global freight, travel, and race weekend operations.', visibility: { show: true } },
    seo: { title: 'Sophie Laurent Member Profile | AF Motorsport', description: 'Profile of Operations Coordinator Sophie Laurent' },
    generateSlug: false, slug: 'sophie-laurent',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'David',
    middle: '',
    last: 'Chen',
    alias: 'DC-SE',
    toggle: 'advanced',
    type: categoriesIds[232],
    basics: {
      enable: true,
      description: 'Simulation Engineer developing driver training and setup optimization tools.',
      identifier: { number: 'SE012', nickname: 'Dave', callsign: 'Chen', badge: 'SIM-ENG' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '33', nationality: 'Canadian' },
      chronology: { birth: '1991-06-22', debut: '2019-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Computer science background with specialization in physics modeling and real-time simulation. Develops driver training platforms and setup correlation tools.', visibility: { show: true } },
    seo: { title: 'David Chen Member Profile | AF Motorsport', description: 'Profile of Simulation Engineer David Chen' },
    generateSlug: false, slug: 'david-chen',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Maria',
    middle: '',
    last: 'Rodriguez',
    alias: 'MR-FA',
    toggle: 'advanced',
    type: categoriesIds[107],
    basics: {
      enable: true,
      description: 'Fabrication Specialist leading composite manufacturing and rapid prototyping.',
      identifier: { number: 'FA013', nickname: 'Maria', callsign: 'Rodriguez', badge: 'FAB-SPEC' },
      identity: { gender: 'Female', pronouns: 'she/her', age: '39', nationality: 'Spanish' },
      chronology: { birth: '1985-12-05', debut: '2013-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Materials engineering background with expertise in carbon fiber composites and additive manufacturing. Leads rapid prototyping and component fabrication.', visibility: { show: true } },
    seo: { title: 'Maria Rodriguez Member Profile | AF Motorsport', description: 'Profile of Fabrication Specialist Maria Rodriguez' },
    generateSlug: false, slug: 'maria-rodriguez',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Thomas',
    middle: '',
    last: 'Anderson',
    alias: 'TA-WE',
    toggle: 'advanced',
    type: categoriesIds[126],
    basics: {
      enable: true,
      description: 'Welding Specialist ensuring structural integrity of chassis and safety components.',
      identifier: { number: 'WE014', nickname: 'Tom', callsign: 'Anderson', badge: 'WELD-SPEC' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '44', nationality: 'Swedish' },
      chronology: { birth: '1980-08-11', debut: '2010-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Master welder with certification in aerospace-grade joining techniques. Specializes in titanium and aluminum alloy fabrication for safety-critical components.', visibility: { show: true } },
    seo: { title: 'Thomas Anderson Member Profile | AF Motorsport', description: 'Profile of Welding Specialist Thomas Anderson' },
    generateSlug: false, slug: 'thomas-anderson',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Yuki',
    middle: '',
    last: 'Tanaka',
    alias: 'YT-EL',
    toggle: 'advanced',
    type: categoriesIds[41],
    basics: {
      enable: true,
      description: 'Electronics Specialist managing vehicle electrical systems and sensor integration.',
      identifier: { number: 'EL015', nickname: 'Yuki', callsign: 'Tanaka', badge: 'ELEC-SPEC' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '37', nationality: 'Japanese' },
      chronology: { birth: '1987-02-28', debut: '2015-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Electrical engineering background with expertise in high-voltage systems and sensor networks. Manages vehicle electrical architecture and data acquisition systems.', visibility: { show: true } },
    seo: { title: 'Yuki Tanaka Member Profile | AF Motorsport', description: 'Profile of Electronics Specialist Yuki Tanaka' },
    generateSlug: false, slug: 'yuki-tanaka',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Claire',
    middle: '',
    last: 'Dubois',
    alias: 'CD-PA',
    toggle: 'advanced',
    type: categoriesIds[9],
    basics: {
      enable: true,
      description: 'Paint Specialist leading livery application and surface finish quality control.',
      identifier: { number: 'PA016', nickname: 'Claire', callsign: 'Dubois', badge: 'PAINT-SPEC' },
      identity: { gender: 'Female', pronouns: 'she/her', age: '32', nationality: 'French' },
      chronology: { birth: '1992-10-03', debut: '2018-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Industrial design background with expertise in automotive finishes and branding application. Leads livery design implementation and quality assurance.', visibility: { show: true } },
    seo: { title: 'Claire Dubois Member Profile | AF Motorsport', description: 'Profile of Paint Specialist Claire Dubois' },
    generateSlug: false, slug: 'claire-dubois',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Roberto',
    middle: '',
    last: 'Martinez',
    alias: 'RM-LO',
    toggle: 'advanced',
    type: categoriesIds[105],
    basics: {
      enable: true,
      description: 'Logistics Manager coordinating global freight and race weekend equipment transport.',
      identifier: { number: 'LO017', nickname: 'Rob', callsign: 'Martinez', badge: 'LOG-MGR' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '46', nationality: 'Spanish' },
      chronology: { birth: '1978-05-17', debut: '2011-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Supply chain management background with expertise in international freight and customs compliance. Manages global logistics for race calendar execution.', visibility: { show: true } },
    seo: { title: 'Roberto Martinez Member Profile | AF Motorsport', description: 'Profile of Logistics Manager Roberto Martinez' },
    generateSlug: false, slug: 'roberto-martinez',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Anna',
    middle: '',
    last: 'Kowalski',
    alias: 'AK-SA',
    toggle: 'advanced',
    type: categoriesIds[118],
    basics: {
      enable: true,
      description: 'Safety Officer ensuring compliance with FIA regulations and incident response protocols.',
      identifier: { number: 'SA018', nickname: 'Anna', callsign: 'Kowalski', badge: 'SAFETY-OFF' },
      identity: { gender: 'Female', pronouns: 'she/her', age: '41', nationality: 'Polish' },
      chronology: { birth: '1983-07-09', debut: '2014-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Medical and safety engineering background with FIA certification. Leads safety protocol development and emergency response training programs.', visibility: { show: true } },
    seo: { title: 'Anna Kowalski Member Profile | AF Motorsport', description: 'Profile of Safety Officer Anna Kowalski' },
    generateSlug: false, slug: 'anna-kowalski',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Michael',
    middle: '',
    last: 'O\'Brien',
    alias: 'MOB-ME',
    toggle: 'advanced',
    type: categoriesIds[27],
    basics: {
      enable: true,
      description: 'Media Engineer managing broadcast systems and content production infrastructure.',
      identifier: { number: 'ME019', nickname: 'Mikey', callsign: 'OBrien', badge: 'MEDIA-ENG' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '34', nationality: 'Irish' },
      chronology: { birth: '1990-11-21', debut: '2017-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Broadcast engineering background with expertise in live production and digital content distribution. Manages media infrastructure for global audience engagement.', visibility: { show: true } },
    seo: { title: 'Michael O\'Brien Member Profile | AF Motorsport', description: 'Profile of Media Engineer Michael O\'Brien' },
    generateSlug: false, slug: 'michael-obrien',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Lisa',
    middle: '',
    last: 'Wagner',
    alias: 'LW-HR',
    toggle: 'advanced',
    type: categoriesIds[166],
    basics: {
      enable: true,
      description: 'Human Resources Coordinator managing talent development and team welfare programs.',
      identifier: { number: 'HR020', nickname: 'Lisa', callsign: 'Wagner', badge: 'HR-COORD' },
      identity: { gender: 'Female', pronouns: 'she/her', age: '38', nationality: 'German' },
      chronology: { birth: '1986-03-14', debut: '2016-01-01', retirement: null },
      visibility: { show: true }
    },
    details: { enable: true, background: 'Organizational psychology background with expertise in talent development and performance culture. Manages recruitment, training, and team wellness initiatives.', visibility: { show: true } },
    seo: { title: 'Lisa Wagner Member Profile | AF Motorsport', description: 'Profile of HR Coordinator Lisa Wagner' },
    generateSlug: false, slug: 'lisa-wagner',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  }
] as const;
