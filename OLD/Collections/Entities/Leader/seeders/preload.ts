// FILE: src/collections/Entities/Leader/seeders/preload.ts
export const PRELOAD_LEADER = (categoriesIds: number[], narrativesIds: number[]) => [
  {
    first: 'Toto',
    middle: '',
    last: 'Wolff',
    alias: 'The Boss',
    toggle: 'advanced',
    type: categoriesIds[185],
    basics: {
      enable: true,
      description: 'CEO and Team Principal of Mercedes-AMG Petronas F1 Team, leading eight consecutive constructors championships.',
      identifier: { designation: 'Team Principal', title: 'CEO', code: 'TW-MER' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '52', nationality: 'Austrian' },
      chronology: { birth: '1972-01-12', debut: '2013-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Toto Wolff Profile | AF Motorsport', description: 'Profile of Mercedes-AMG Petronas F1 Team Principal Toto Wolff' },
    generateSlug: false, slug: 'toto-wolff',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    first: 'Christian',
    middle: '',
    last: 'Horner',
    alias: 'CH',
    toggle: 'advanced',
    type: categoriesIds[53],
    basics: {
      enable: true,
      description: 'Team Principal of Oracle Red Bull Racing, leading multiple championship-winning campaigns.',
      identifier: { designation: 'Team Principal', title: 'Team Principal', code: 'CH-RBR' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '51', nationality: 'British' },
      chronology: { birth: '1973-11-16', debut: '2005-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Christian Horner Profile | AF Motorsport', description: 'Profile of Oracle Red Bull Racing Team Principal Christian Horner' },
    generateSlug: false, slug: 'christian-horner',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    first: 'Frederic',
    middle: '',
    last: 'Vasseur',
    alias: 'FV',
    toggle: 'advanced',
    type: categoriesIds[146],
    basics: {
      enable: true,
      description: 'Team Principal of Scuderia Ferrari, leading the iconic team\'s championship resurgence.',
      identifier: { designation: 'Team Principal', title: 'Team Principal', code: 'FV-FER' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '56', nationality: 'French' },
      chronology: { birth: '1968-06-17', debut: '2023-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Frederic Vasseur Profile | AF Motorsport', description: 'Profile of Scuderia Ferrari Team Principal Frederic Vasseur' },
    generateSlug: false, slug: 'frederic-vasseur',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Andrea',
    middle: '',
    last: 'Stella',
    alias: 'AS',
    toggle: 'advanced',
    type: categoriesIds[123],
    basics: {
      enable: true,
      description: 'Team Principal of McLaren F1 Team, leading organizational transformation and competitive resurgence.',
      identifier: { designation: 'Team Principal', title: 'Team Principal', code: 'AS-MCL' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '52', nationality: 'Italian' },
      chronology: { birth: '1971-04-22', debut: '2023-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Andrea Stella Profile | AF Motorsport', description: 'Profile of McLaren F1 Team Principal Andrea Stella' },
    generateSlug: false, slug: 'andrea-stella',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Mike',
    middle: '',
    last: 'Krack',
    alias: 'MK',
    toggle: 'advanced',
    type: categoriesIds[38],
    basics: {
      enable: true,
      description: 'Team Principal of Aston Martin Aramco Cognizant F1 Team.',
      identifier: { designation: 'Team Principal', title: 'Team Principal', code: 'MK-AST' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '53', nationality: 'German' },
      chronology: { birth: '1971-03-18', debut: '2022-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Mike Krack Profile | AF Motorsport', description: 'Profile of Aston Martin F1 Team Principal Mike Krack' },
    generateSlug: false, slug: 'mike-krack',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'James',
    middle: '',
    last: 'Vowles',
    alias: 'JV',
    toggle: 'advanced',
    type: categoriesIds[122],
    basics: {
      enable: true,
      description: 'Team Principal of Williams Racing, leading organizational rebuild and competitive development.',
      identifier: { designation: 'Team Principal', title: 'Team Principal', code: 'JV-WIL' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '45', nationality: 'British' },
      chronology: { birth: '1979-06-20', debut: '2023-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'James Vowles Profile | AF Motorsport', description: 'Profile of Williams Racing Team Principal James Vowles' },
    generateSlug: false, slug: 'james-vowles',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Ayao',
    middle: '',
    last: 'Komatsu',
    alias: 'AK',
    toggle: 'advanced',
    type: categoriesIds[17],
    basics: {
      enable: true,
      description: 'Team Principal of Visa Cash App RB F1 Team, leading technical development program.',
      identifier: { designation: 'Team Principal', title: 'Team Principal', code: 'AK-RB' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '48', nationality: 'Japanese' },
      chronology: { birth: '1976-01-25', debut: '2024-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Ayao Komatsu Profile | AF Motorsport', description: 'Profile of Visa Cash App RB F1 Team Principal Ayao Komatsu' },
    generateSlug: false, slug: 'ayao-komatsu',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Oliver',
    middle: '',
    last: 'Hoffmann',
    alias: 'OH',
    toggle: 'advanced',
    type: categoriesIds[245],
    basics: {
      enable: true,
      description: 'Team Principal of Stake F1 Team Kick Sauber, leading technical partnership development.',
      identifier: { designation: 'Team Principal', title: 'Team Principal', code: 'OH-SAU' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '49', nationality: 'German' },
      chronology: { birth: '1975-08-14', debut: '2024-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Oliver Hoffmann Profile | AF Motorsport', description: 'Profile of Stake F1 Team Kick Sauber Team Principal Oliver Hoffmann' },
    generateSlug: false, slug: 'oliver-hoffmann',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Bruno',
    middle: '',
    last: 'Famin',
    alias: 'BF',
    toggle: 'advanced',
    type: categoriesIds[243],
    basics: {
      enable: true,
      description: 'Team Principal of BWT Alpine F1 Team, leading technical and organizational development.',
      identifier: { designation: 'Team Principal', title: 'Team Principal', code: 'BF-ALP' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '54', nationality: 'French' },
      chronology: { birth: '1970-09-03', debut: '2023-09-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Bruno Famin Profile | AF Motorsport', description: 'Profile of BWT Alpine F1 Team Principal Bruno Famin' },
    generateSlug: false, slug: 'bruno-famin',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Alessandro',
    middle: '',
    last: 'Alunni Bravi',
    alias: 'AAB',
    toggle: 'advanced',
    type: categoriesIds[52],
    basics: {
      enable: true,
      description: 'Managing Director of Stake F1 Team Kick Sauber, overseeing commercial and operational strategy.',
      identifier: { designation: 'Managing Director', title: 'Managing Director', code: 'AAB-SAU' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '50', nationality: 'Italian' },
      chronology: { birth: '1974-05-22', debut: '2023-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Alessandro Alunni Bravi Profile | AF Motorsport', description: 'Profile of Stake F1 Team Managing Director Alessandro Alunni Bravi' },
    generateSlug: false, slug: 'alessandro-alunni-bravi',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Stefano',
    middle: '',
    last: 'Domenicali',
    alias: 'SD-F1',
    toggle: 'advanced',
    type: categoriesIds[215],
    basics: {
      enable: true,
      description: 'President and CEO of Formula 1, leading global governance and commercial strategy.',
      identifier: { designation: 'President', title: 'CEO', code: 'SD-F1' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '59', nationality: 'Italian' },
      chronology: { birth: '1965-05-14', debut: '2021-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Stefano Domenicali Profile | AF Motorsport', description: 'Profile of Formula 1 President and CEO Stefano Domenicali' },
    generateSlug: false, slug: 'stefano-domenicali',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    first: 'Mohammed',
    middle: '',
    last: 'Ben Sulayem',
    alias: 'MBS-FIA',
    toggle: 'advanced',
    type: categoriesIds[232],
    basics: {
      enable: true,
      description: 'President of the Fédération Internationale de l\'Automobile (FIA), leading global motorsport governance.',
      identifier: { designation: 'President', title: 'FIA President', code: 'MBS-FIA' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '63', nationality: 'Emirati' },
      chronology: { birth: '1961-06-12', debut: '2021-12-17', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Mohammed Ben Sulayem Profile | AF Motorsport', description: 'Profile of FIA President Mohammed Ben Sulayem' },
    generateSlug: false, slug: 'mohammed-ben-sulayem',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    first: 'Albert',
    middle: '',
    last: 'Bielby',
    alias: 'AB-WEC',
    toggle: 'advanced',
    type: categoriesIds[107],
    basics: {
      enable: true,
      description: 'CEO of the FIA World Endurance Championship, leading global endurance racing governance.',
      identifier: { designation: 'CEO', title: 'WEC CEO', code: 'AB-WEC' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '56', nationality: 'British' },
      chronology: { birth: '1968-03-10', debut: '2020-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Albert Bielby Profile | AF Motorsport', description: 'Profile of FIA WEC CEO Albert Bielby' },
    generateSlug: false, slug: 'albert-bielby',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Mark',
    middle: '',
    last: 'Miles',
    alias: 'MM-INDY',
    toggle: 'advanced',
    type: categoriesIds[126],
    basics: {
      enable: true,
      description: 'CEO of IndyCar Series, leading North American open-wheel racing governance and development.',
      identifier: { designation: 'CEO', title: 'IndyCar CEO', code: 'MM-INDY' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '58', nationality: 'American' },
      chronology: { birth: '1966-07-25', debut: '2020-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Mark Miles Profile | AF Motorsport', description: 'Profile of IndyCar Series CEO Mark Miles' },
    generateSlug: false, slug: 'mark-miles',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Jens',
    middle: '',
    last: 'Marquardt',
    alias: 'JM-AUDI',
    toggle: 'advanced',
    type: categoriesIds[41],
    basics: {
      enable: true,
      description: 'CEO of Audi Formula 1 Project, leading manufacturer entry preparation for 2026.',
      identifier: { designation: 'CEO', title: 'Audi F1 CEO', code: 'JM-AUDI' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '54', nationality: 'German' },
      chronology: { birth: '1970-11-08', debut: '2022-07-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Jens Marquardt Profile | AF Motorsport', description: 'Profile of Audi Formula 1 Project CEO Jens Marquardt' },
    generateSlug: false, slug: 'jens-marquardt',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Laurent',
    middle: '',
    last: 'Mekies',
    alias: 'LM-FER',
    toggle: 'advanced',
    type: categoriesIds[9],
    basics: {
      enable: true,
      description: 'Sporting Director of Scuderia Ferrari, overseeing race operations and driver strategy.',
      identifier: { designation: 'Sporting Director', title: 'Sporting Director', code: 'LM-FER' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '48', nationality: 'French' },
      chronology: { birth: '1976-10-12', debut: '2024-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Laurent Mekies Profile | AF Motorsport', description: 'Profile of Scuderia Ferrari Sporting Director Laurent Mekies' },
    generateSlug: false, slug: 'laurent-mekies',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Tom',
    middle: '',
    last: 'McCullough',
    alias: 'TM-AST',
    toggle: 'advanced',
    type: categoriesIds[105],
    basics: {
      enable: true,
      description: 'Technical Director of Aston Martin Aramco Cognizant F1 Team, leading technical development.',
      identifier: { designation: 'Technical Director', title: 'Technical Director', code: 'TM-AST' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '46', nationality: 'British' },
      chronology: { birth: '1978-04-15', debut: '2023-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Tom McCullough Profile | AF Motorsport', description: 'Profile of Aston Martin F1 Technical Director Tom McCullough' },
    generateSlug: false, slug: 'tom-mccullough',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Peter',
    middle: '',
    last: 'Prodromou',
    alias: 'PP-MCL',
    toggle: 'advanced',
    type: categoriesIds[118],
    basics: {
      enable: true,
      description: 'Technical Director of Aerodynamics at McLaren F1 Team, leading aerodynamic development.',
      identifier: { designation: 'Technical Director', title: 'Aerodynamics TD', code: 'PP-MCL' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '55', nationality: 'British-Cypriot' },
      chronology: { birth: '1969-02-28', debut: '2023-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Peter Prodromou Profile | AF Motorsport', description: 'Profile of McLaren F1 Aerodynamics Technical Director Peter Prodromou' },
    generateSlug: false, slug: 'peter-prodromou',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Enrico',
    middle: '',
    last: 'Cardile',
    alias: 'EC-FER',
    toggle: 'advanced',
    type: categoriesIds[27],
    basics: {
      enable: true,
      description: 'Technical Director of Chassis at Scuderia Ferrari, leading chassis and aerodynamic development.',
      identifier: { designation: 'Technical Director', title: 'Chassis TD', code: 'EC-FER' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '51', nationality: 'Italian' },
      chronology: { birth: '1973-08-19', debut: '2024-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Enrico Cardile Profile | AF Motorsport', description: 'Profile of Scuderia Ferrari Chassis Technical Director Enrico Cardile' },
    generateSlug: false, slug: 'enrico-cardile',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Pat',
    middle: '',
    last: 'Fry',
    alias: 'PF-AST',
    toggle: 'advanced',
    type: categoriesIds[166],
    basics: {
      enable: true,
      description: 'Chief Technical Officer of Aston Martin Aramco Cognizant F1 Team, leading overall technical strategy.',
      identifier: { designation: 'Chief Technical Officer', title: 'CTO', code: 'PF-AST' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '56', nationality: 'British' },
      chronology: { birth: '1968-07-03', debut: '2023-01-01', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Pat Fry Profile | AF Motorsport', description: 'Profile of Aston Martin F1 Chief Technical Officer Pat Fry' },
    generateSlug: false, slug: 'pat-fry',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  }
] as const;
