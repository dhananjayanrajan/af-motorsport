// FILE: src/collections/Entities/Driver/seeders/preload.ts
export const PRELOAD_DRIVER = (categoriesIds: number[]) => [
  {
    first: 'Max',
    middle: 'Emilian',
    last: 'Verstappen',
    alias: 'MV1',
    toggle: 'advanced',
    type: categoriesIds[185],
    basics: {
      enable: true,
      description: 'Three-time Formula 1 World Champion known for aggressive racecraft and exceptional car control.',
      identifier: { number: '1', nickname: 'The Lion', competition: 'F1', callsign: 'Max' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '27', nationality: 'Dutch' },
      chronology: { birth: '1997-09-30', debut: '2015-03-15', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Max Verstappen Driver Profile | AF Motorsport', description: 'Official profile of three-time Formula 1 World Champion Max Verstappen' },
    generateSlug: false,
    slug: 'max-verstappen',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    first: 'Fernando',
    middle: 'Alonso',
    last: 'Díaz',
    alias: 'FA14',
    toggle: 'advanced',
    type: categoriesIds[53],
    basics: {
      enable: true,
      description: 'Two-time Formula 1 World Champion and endurance racing legend with unmatched versatility.',
      identifier: { number: '14', nickname: 'El Nano', competition: 'F1', callsign: 'Fernando' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '43', nationality: 'Spanish' },
      chronology: { birth: '1981-07-29', debut: '2001-03-04', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Fernando Alonso Driver Profile | AF Motorsport', description: 'Official profile of two-time Formula 1 World Champion Fernando Alonso' },
    generateSlug: false,
    slug: 'fernando-alonso',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    first: 'Charles',
    middle: 'Marc',
    last: 'Leclerc',
    alias: 'CL16',
    toggle: 'advanced',
    type: categoriesIds[146],
    basics: {
      enable: true,
      description: 'Ferrari factory driver known for exceptional qualifying pace and racecraft precision.',
      identifier: { number: '16', nickname: 'Leclerc', competition: 'F1', callsign: 'Charles' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '27', nationality: 'Monegasque' },
      chronology: { birth: '1997-10-16', debut: '2018-03-25', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Charles Leclerc Driver Profile | AF Motorsport', description: 'Official profile of Ferrari Formula 1 driver Charles Leclerc' },
    generateSlug: false,
    slug: 'charles-leclerc',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Lando',
    middle: 'Norris',
    last: 'Norris',
    alias: 'LN4',
    toggle: 'advanced',
    type: categoriesIds[123],
    basics: {
      enable: true,
      description: 'McLaren factory driver renowned for consistency, racecraft, and engaging personality.',
      identifier: { number: '4', nickname: 'Lando', competition: 'F1', callsign: 'Norris' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '25', nationality: 'British' },
      chronology: { birth: '1999-11-13', debut: '2019-03-17', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Lando Norris Driver Profile | AF Motorsport', description: 'Official profile of McLaren Formula 1 driver Lando Norris' },
    generateSlug: false,
    slug: 'lando-norris',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Sébastien',
    middle: 'Ogier',
    last: 'Ogier',
    alias: 'SO1',
    toggle: 'advanced',
    type: categoriesIds[38],
    basics: {
      enable: true,
      description: 'Eight-time World Rally Champion with exceptional adaptability across all surface conditions.',
      identifier: { number: '1', nickname: 'The Fox', competition: 'WRC', callsign: 'Seb' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '41', nationality: 'French' },
      chronology: { birth: '1983-12-17', debut: '2008-01-24', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Sébastien Ogier Driver Profile | AF Motorsport', description: 'Official profile of eight-time World Rally Champion Sébastien Ogier' },
    generateSlug: false,
    slug: 'sebastien-ogier',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Tom',
    middle: 'Kristensen',
    last: 'Kristensen',
    alias: 'MrLeMans',
    toggle: 'advanced',
    type: categoriesIds[122],
    basics: {
      enable: true,
      description: 'Nine-time Le Mans 24 Hours winner and endurance racing legend with unparalleled consistency.',
      identifier: { number: '2', nickname: 'Mr. Le Mans', competition: 'WEC', callsign: 'Tom' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '57', nationality: 'Danish' },
      chronology: { birth: '1967-07-07', debut: '1997-06-14', retirement: '2013-11-30' },
      visibility: { show: true }
    },
    seo: { title: 'Tom Kristensen Driver Profile | AF Motorsport', description: 'Official profile of nine-time Le Mans winner Tom Kristensen' },
    generateSlug: false,
    slug: 'tom-kristensen',
    visibility: { check_publish: true, check_featured: false, check_pinned: true }
  },
  {
    first: 'Scott',
    middle: 'Ronald',
    last: 'Dixon',
    alias: 'SD9',
    toggle: 'advanced',
    type: categoriesIds[17],
    basics: {
      enable: true,
      description: 'Six-time IndyCar Series Champion with exceptional versatility across oval and road courses.',
      identifier: { number: '9', nickname: 'The Iceman', competition: 'INDYCAR', callsign: 'Scott' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '44', nationality: 'New Zealander' },
      chronology: { birth: '1980-07-22', debut: '2001-03-11', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Scott Dixon Driver Profile | AF Motorsport', description: 'Official profile of six-time IndyCar Champion Scott Dixon' },
    generateSlug: false,
    slug: 'scott-dixon',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Kyle',
    middle: 'Larson',
    last: 'Larson',
    alias: 'KL5',
    toggle: 'advanced',
    type: categoriesIds[245],
    basics: {
      enable: true,
      description: 'NASCAR Cup Series Champion known for exceptional car control and versatile racing talent.',
      identifier: { number: '5', nickname: 'Fireball', competition: 'NASCAR', callsign: 'Kyle' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '32', nationality: 'American' },
      chronology: { birth: '1992-07-31', debut: '2014-02-23', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Kyle Larson Driver Profile | AF Motorsport', description: 'Official profile of NASCAR Cup Series Champion Kyle Larson' },
    generateSlug: false,
    slug: 'kyle-larson',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Valentino',
    middle: 'Rossi',
    last: 'Rossi',
    alias: 'VR46',
    toggle: 'advanced',
    type: categoriesIds[243],
    basics: {
      enable: true,
      description: 'Nine-time World Champion motorcycle racer and cultural icon of motorsport.',
      identifier: { number: '46', nickname: 'The Doctor', competition: 'MotoGP', callsign: 'Vale' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '46', nationality: 'Italian' },
      chronology: { birth: '1979-02-16', debut: '1996-03-31', retirement: '2021-11-14' },
      visibility: { show: true }
    },
    seo: { title: 'Valentino Rossi Driver Profile | AF Motorsport', description: 'Official profile of nine-time World Champion motorcycle racer Valentino Rossi' },
    generateSlug: false,
    slug: 'valentino-rossi',
    visibility: { check_publish: true, check_featured: false, check_pinned: true }
  },
  {
    first: 'Nyck',
    middle: 'de Vries',
    last: 'de Vries',
    alias: 'NDV21',
    toggle: 'advanced',
    type: categoriesIds[52],
    basics: {
      enable: true,
      description: 'Formula E World Champion and versatile single-seater competitor with exceptional adaptability.',
      identifier: { number: '21', nickname: 'Nyck', competition: 'FE', callsign: 'DeVries' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '30', nationality: 'Dutch' },
      chronology: { birth: '1995-02-06', debut: '2019-11-22', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Nyck de Vries Driver Profile | AF Motorsport', description: 'Official profile of Formula E World Champion Nyck de Vries' },
    generateSlug: false,
    slug: 'nyck-de-vries',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Jamie',
    middle: 'Chadwick',
    last: 'Chadwick',
    alias: 'JC55',
    toggle: 'advanced',
    type: categoriesIds[215],
    basics: {
      enable: true,
      description: 'Three-time W Series Champion and emerging talent in international single-seater competition.',
      identifier: { number: '55', nickname: 'Jamie', competition: 'W Series', callsign: 'Chadwick' },
      identity: { gender: 'Female', pronouns: 'she/her', age: '26', nationality: 'British' },
      chronology: { birth: '1998-05-20', debut: '2019-05-04', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Jamie Chadwick Driver Profile | AF Motorsport', description: 'Official profile of three-time W Series Champion Jamie Chadwick' },
    generateSlug: false,
    slug: 'jamie-chadwick',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Stoffel',
    middle: 'Vandoorne',
    last: 'Vandoorne',
    alias: 'SV2',
    toggle: 'advanced',
    type: categoriesIds[232],
    basics: {
      enable: true,
      description: 'Formula E race winner and former Formula 1 driver with exceptional technical feedback.',
      identifier: { number: '2', nickname: 'Stoffel', competition: 'FE', callsign: 'Vandoorne' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '33', nationality: 'Belgian' },
      chronology: { birth: '1992-03-26', debut: '2016-03-20', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Stoffel Vandoorne Driver Profile | AF Motorsport', description: 'Official profile of Formula E driver and former F1 competitor Stoffel Vandoorne' },
    generateSlug: false,
    slug: 'stoffel-vandoorne',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Romain',
    middle: 'Grosjean',
    last: 'Grosjean',
    alias: 'RG8',
    toggle: 'advanced',
    type: categoriesIds[107],
    basics: {
      enable: true,
      description: 'Former Formula 1 driver and IndyCar competitor known for resilience and racecraft.',
      identifier: { number: '8', nickname: 'Romain', competition: 'INDYCAR', callsign: 'Grosjean' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '39', nationality: 'French-Swiss' },
      chronology: { birth: '1986-04-17', debut: '2009-08-23', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Romain Grosjean Driver Profile | AF Motorsport', description: 'Official profile of former F1 and current IndyCar driver Romain Grosjean' },
    generateSlug: false,
    slug: 'romain-grosjean',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Colton',
    middle: 'Herta',
    last: 'Herta',
    alias: 'CH26',
    toggle: 'advanced',
    type: categoriesIds[126],
    basics: {
      enable: true,
      description: 'Youngest IndyCar race winner and emerging talent with exceptional raw speed.',
      identifier: { number: '26', nickname: 'Colton', competition: 'INDYCAR', callsign: 'Herta' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '24', nationality: 'American' },
      chronology: { birth: '2000-03-30', debut: '2019-03-24', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Colton Herta Driver Profile | AF Motorsport', description: 'Official profile of emerging IndyCar talent Colton Herta' },
    generateSlug: false,
    slug: 'colton-herta',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Alex',
    middle: 'Palou',
    last: 'Montalbo',
    alias: 'AP10',
    toggle: 'advanced',
    type: categoriesIds[41],
    basics: {
      enable: true,
      description: 'Two-time IndyCar Series Champion known for consistency and strategic racecraft.',
      identifier: { number: '10', nickname: 'Palou', competition: 'INDYCAR', callsign: 'Alex' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '27', nationality: 'Spanish' },
      chronology: { birth: '1997-04-01', debut: '2018-03-25', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Alex Palou Driver Profile | AF Motorsport', description: 'Official profile of two-time IndyCar Champion Alex Palou' },
    generateSlug: false,
    slug: 'alex-palou',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Mike',
    middle: 'Rockenfeller',
    last: 'Rockenfeller',
    alias: 'MR99',
    toggle: 'advanced',
    type: categoriesIds[9],
    basics: {
      enable: true,
      description: 'Le Mans winner and DTM Champion with exceptional endurance racing expertise.',
      identifier: { number: '99', nickname: 'Rocky', competition: 'DTM', callsign: 'Mike' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '41', nationality: 'German' },
      chronology: { birth: '1983-10-31', debut: '2003-06-15', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Mike Rockenfeller Driver Profile | AF Motorsport', description: 'Official profile of Le Mans winner and DTM Champion Mike Rockenfeller' },
    generateSlug: false,
    slug: 'mike-rockenfeller',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Timo',
    middle: 'Bernhard',
    last: 'Bernhard',
    alias: 'TB1',
    toggle: 'advanced',
    type: categoriesIds[105],
    basics: {
      enable: true,
      description: 'Two-time Le Mans winner and endurance racing specialist with exceptional technical feedback.',
      identifier: { number: '1', nickname: 'Timo', competition: 'WEC', callsign: 'Bernhard' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '44', nationality: 'German' },
      chronology: { birth: '1981-07-19', debut: '2000-05-14', retirement: '2019-11-17' },
      visibility: { show: true }
    },
    seo: { title: 'Timo Bernhard Driver Profile | AF Motorsport', description: 'Official profile of two-time Le Mans winner Timo Bernhard' },
    generateSlug: false,
    slug: 'timo-bernhard',
    visibility: { check_publish: true, check_featured: false, check_pinned: true }
  },
  {
    first: 'Brendon',
    middle: 'Hartley',
    last: 'Hartley',
    alias: 'BH36',
    toggle: 'advanced',
    type: categoriesIds[118],
    basics: {
      enable: true,
      description: 'Le Mans winner and former Formula 1 driver with exceptional versatility across disciplines.',
      identifier: { number: '36', nickname: 'Brendon', competition: 'WEC', callsign: 'Hartley' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '35', nationality: 'New Zealander' },
      chronology: { birth: '1989-11-10', debut: '2017-10-22', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Brendon Hartley Driver Profile | AF Motorsport', description: 'Official profile of Le Mans winner and versatile competitor Brendon Hartley' },
    generateSlug: false,
    slug: 'brendon-hartley',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Yuki',
    middle: 'Tsunoda',
    last: 'Tsunoda',
    alias: 'YT22',
    toggle: 'advanced',
    type: categoriesIds[27],
    basics: {
      enable: true,
      description: 'Emerging Formula 1 talent known for aggressive overtaking and rapid adaptation.',
      identifier: { number: '22', nickname: 'Yuki', competition: 'F1', callsign: 'Tsunoda' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '24', nationality: 'Japanese' },
      chronology: { birth: '2000-05-11', debut: '2021-03-28', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Yuki Tsunoda Driver Profile | AF Motorsport', description: 'Official profile of emerging Formula 1 talent Yuki Tsunoda' },
    generateSlug: false,
    slug: 'yuki-tsunoda',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    first: 'Oscar',
    middle: 'Piastri',
    last: 'Piastri',
    alias: 'OP81',
    toggle: 'advanced',
    type: categoriesIds[166],
    basics: {
      enable: true,
      description: 'Rising Formula 1 star with exceptional junior series pedigree and racecraft maturity.',
      identifier: { number: '81', nickname: 'Oscar', competition: 'F1', callsign: 'Piastri' },
      identity: { gender: 'Male', pronouns: 'he/him', age: '23', nationality: 'Australian' },
      chronology: { birth: '2001-04-06', debut: '2023-03-05', retirement: null },
      visibility: { show: true }
    },
    seo: { title: 'Oscar Piastri Driver Profile | AF Motorsport', description: 'Official profile of rising Formula 1 talent Oscar Piastri' },
    generateSlug: false,
    slug: 'oscar-piastri',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  }
] as const;
