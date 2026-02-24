// FILE: src/collections/Entities/Organization/seeders/preload.ts
export const PRELOAD_ORGANIZATION = (categoriesIds: number[]) => [
  {
    name: 'Mercedes-AMG Petronas Formula One Team',
    alias: 'Mercedes-AMG Petronas F1',
    toggle: 'advanced',
    type: categoriesIds[185],
    basics: {
      enable: true,
      identifier: { code: 'MER-F1', abbreviation: 'MER', registration: 'GB-REG-2010-001' },
      description: 'German manufacturer-backed Formula 1 team with eight consecutive constructors championships.',
      tagline: 'Performance through innovation',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Founded in 2010 following Mercedes-Benz acquisition of Brawn GP. Dominant era 2014-2021 with hybrid powertrain excellence.',
      parent: null,
      evolution: { founded: '2010-01-01', merged: null, rebranded: null, defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Iconic', reliability: 'Exceptional', innovation: 'Revolutionary' },
      benefits: [
        { benefit: 'Technical partnership access to Mercedes-AMG HPP powertrains', type: 'Technical', impact: 'Strategic' },
        { benefit: 'Global brand exposure through championship success', type: 'Marketing', impact: 'Significant' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'Mercedes-AMG Petronas F1 Profile | AF Motorsport', description: 'Official profile of Mercedes-AMG Petronas Formula One Team' },
    generateSlug: false,
    slug: 'mercedes-amg-petronas-f1',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Oracle Red Bull Racing',
    alias: 'Red Bull Racing',
    toggle: 'advanced',
    type: categoriesIds[53],
    basics: {
      enable: true,
      identifier: { code: 'RBR-F1', abbreviation: 'RBR', registration: 'GB-REG-2005-002' },
      description: 'Austrian energy drink-backed Formula 1 team known for aggressive development and championship success.',
      tagline: 'Give you wings',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Established 2005 following Red Bull acquisition of Jaguar Racing. Multiple constructors and drivers championships with innovative technical approach.',
      parent: null,
      evolution: { founded: '2005-01-01', merged: null, rebranded: '2022-01-01', defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Iconic', reliability: 'Exceptional', innovation: 'Revolutionary' },
      benefits: [
        { benefit: 'Red Bull Advanced Technologies aerodynamic expertise', type: 'Technical', impact: 'Strategic' },
        { benefit: 'Global marketing platform through championship visibility', type: 'Marketing', impact: 'Strategic' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'Oracle Red Bull Racing Profile | AF Motorsport', description: 'Official profile of Oracle Red Bull Racing Formula 1 Team' },
    generateSlug: false,
    slug: 'oracle-red-bull-racing',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Scuderia Ferrari',
    alias: 'Ferrari F1',
    toggle: 'advanced',
    type: categoriesIds[146],
    basics: {
      enable: true,
      identifier: { code: 'FER-F1', abbreviation: 'FER', registration: 'IT-REG-1950-001' },
      description: 'Italian legendary Formula 1 team with unmatched heritage and passionate global fanbase.',
      tagline: 'We are racing',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Founded by Enzo Ferrari in 1929, competing in Formula 1 since inaugural 1950 season. Most successful team in F1 history by race wins.',
      parent: null,
      evolution: { founded: '1929-11-16', merged: null, rebranded: null, defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Iconic', reliability: 'Exceptional', innovation: 'Innovative' },
      benefits: [
        { benefit: 'Ferrari powertrain technical partnership opportunities', type: 'Technical', impact: 'Strategic' },
        { benefit: 'Unparalleled brand heritage and global fan engagement', type: 'Marketing', impact: 'Strategic' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'Scuderia Ferrari Profile | AF Motorsport', description: 'Official profile of Scuderia Ferrari Formula 1 Team' },
    generateSlug: false,
    slug: 'scuderia-ferrari',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'McLaren Racing Limited',
    alias: 'McLaren F1',
    toggle: 'advanced',
    type: categoriesIds[123],
    basics: {
      enable: true,
      identifier: { code: 'MCL-F1', abbreviation: 'MCL', registration: 'GB-REG-1963-003' },
      description: 'British Formula 1 team with rich heritage and commitment to technological innovation.',
      tagline: 'Racing is in our DNA',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Founded by Bruce McLaren in 1963. Multiple constructors and drivers championships. Undergoing organizational transformation for competitive resurgence.',
      parent: null,
      evolution: { founded: '1963-09-02', merged: null, rebranded: null, defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Prestigious', reliability: 'Reliable', innovation: 'Innovative' },
      benefits: [
        { benefit: 'McLaren Applied technologies transfer opportunities', type: 'Technical', impact: 'Significant' },
        { benefit: 'Strong brand heritage with global fan engagement', type: 'Marketing', impact: 'Significant' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'McLaren Racing Profile | AF Motorsport', description: 'Official profile of McLaren Racing Formula 1 Team' },
    generateSlug: false,
    slug: 'mclaren-racing',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Aston Martin Aramco Cognizant F1 Team',
    alias: 'Aston Martin F1',
    toggle: 'advanced',
    type: categoriesIds[38],
    basics: {
      enable: true,
      identifier: { code: 'AST-F1', abbreviation: 'AST', registration: 'GB-REG-2021-004' },
      description: 'British luxury manufacturer-backed Formula 1 team with ambitious championship aspirations.',
      tagline: 'Victory. Redefined.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Rebranded from Racing Point in 2021 following Lawrence Stroll acquisition. Significant investment in facilities and personnel for competitive growth.',
      parent: null,
      evolution: { founded: '2021-01-01', merged: null, rebranded: '2021-01-01', defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Established', reliability: 'Developing', innovation: 'Adaptive' },
      benefits: [
        { benefit: 'Aston Martin luxury brand association and marketing synergy', type: 'Marketing', impact: 'Significant' },
        { benefit: 'Aramco energy partnership technical collaboration', type: 'Technical', impact: 'Moderate' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'Aston Martin F1 Profile | AF Motorsport', description: 'Official profile of Aston Martin Aramco Cognizant F1 Team' },
    generateSlug: false,
    slug: 'aston-martin-f1',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'BWT Alpine F1 Team',
    alias: 'Alpine F1',
    toggle: 'advanced',
    type: categoriesIds[122],
    basics: {
      enable: true,
      identifier: { code: 'ALP-F1', abbreviation: 'ALP', registration: 'FR-REG-2021-005' },
      description: 'French manufacturer-backed Formula 1 team representing Renault Group motorsport ambitions.',
      tagline: 'Born from competition',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Rebranded from Renault F1 Team in 2021 to promote Alpine sports car brand. Continuing Renault powertrain development and competition.',
      parent: null,
      evolution: { founded: '2021-01-01', merged: null, rebranded: '2021-01-01', defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Established', reliability: 'Reliable', innovation: 'Adaptive' },
      benefits: [
        { benefit: 'Renault Group powertrain technical expertise', type: 'Technical', impact: 'Significant' },
        { benefit: 'Alpine brand marketing and lifestyle association', type: 'Marketing', impact: 'Moderate' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'Alpine F1 Profile | AF Motorsport', description: 'Official profile of BWT Alpine F1 Team' },
    generateSlug: false,
    slug: 'alpine-f1',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Williams Racing',
    alias: 'Williams F1',
    toggle: 'advanced',
    type: categoriesIds[17],
    basics: {
      enable: true,
      identifier: { code: 'WIL-F1', abbreviation: 'WIL', registration: 'GB-REG-1977-006' },
      description: 'Historic British Formula 1 team with legendary heritage undergoing competitive rebuild.',
      tagline: 'One team, one dream',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Founded by Frank and Claire Williams in 1977. Nine constructors championships. Acquired by Dorilton Capital in 2020 for organizational transformation.',
      parent: null,
      evolution: { founded: '1977-01-01', merged: null, rebranded: null, defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Prestigious', reliability: 'Developing', innovation: 'Adaptive' },
      benefits: [
        { benefit: 'Williams Advanced Engineering technology transfer', type: 'Technical', impact: 'Moderate' },
        { benefit: 'Historic brand heritage with loyal fanbase', type: 'Marketing', impact: 'Moderate' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'Williams Racing Profile | AF Motorsport', description: 'Official profile of Williams Racing Formula 1 Team' },
    generateSlug: false,
    slug: 'williams-racing',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Visa Cash App RB Formula One Team',
    alias: 'RB F1',
    toggle: 'advanced',
    type: categoriesIds[245],
    basics: {
      enable: true,
      identifier: { code: 'RB-F1', abbreviation: 'RB', registration: 'IT-REG-2006-007' },
      description: 'Italian-based Formula 1 team with Red Bull technical partnership and young driver development focus.',
      tagline: 'Dare to be different',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Founded as Toro Rosso in 2006, rebranded to Visa Cash App RB in 2024. Serves as Red Bull junior team for driver development.',
      parent: null,
      evolution: { founded: '2006-01-01', merged: null, rebranded: '2024-01-01', defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Established', reliability: 'Reliable', innovation: 'Adaptive' },
      benefits: [
        { benefit: 'Red Bull Racing technical partnership and knowledge transfer', type: 'Technical', impact: 'Significant' },
        { benefit: 'Young driver development pathway to F1', type: 'Operational', impact: 'Strategic' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'Visa Cash App RB Profile | AF Motorsport', description: 'Official profile of Visa Cash App RB Formula One Team' },
    generateSlug: false,
    slug: 'visa-cash-app-rb-f1',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'MoneyGram Haas F1 Team',
    alias: 'Haas F1',
    toggle: 'advanced',
    type: categoriesIds[243],
    basics: {
      enable: true,
      identifier: { code: 'HAA-F1', abbreviation: 'HAA', registration: 'US-REG-2016-008' },
      description: 'American Formula 1 team with Ferrari technical partnership and efficient operational model.',
      tagline: 'American muscle, Italian heart',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Founded by Gene Haas in 2016 as first American F1 team in decades. Operates with Ferrari technical partnership for cost-effective competition.',
      parent: null,
      evolution: { founded: '2016-01-01', merged: null, rebranded: null, defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Emerging', reliability: 'Reliable', innovation: 'Adaptive' },
      benefits: [
        { benefit: 'Ferrari powertrain and technical components partnership', type: 'Technical', impact: 'Significant' },
        { benefit: 'American market access and brand exposure', type: 'Marketing', impact: 'Moderate' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'Haas F1 Profile | AF Motorsport', description: 'Official profile of MoneyGram Haas F1 Team' },
    generateSlug: false,
    slug: 'moneygram-haas-f1',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Stake F1 Team Kick Sauber',
    alias: 'Sauber F1',
    toggle: 'advanced',
    type: categoriesIds[52],
    basics: {
      enable: true,
      identifier: { code: 'SAU-F1', abbreviation: 'SAU', registration: 'CH-REG-1993-009' },
      description: 'Swiss-based Formula 1 team with Ferrari technical partnership preparing for Audi manufacturer entry.',
      tagline: 'Swiss precision, global ambition',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Founded by Peter Sauber in 1993. Operating as Ferrari customer team while preparing facilities and personnel for Audi works entry in 2026.',
      parent: null,
      evolution: { founded: '1993-01-01', merged: null, rebranded: '2024-01-01', defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Established', reliability: 'Reliable', innovation: 'Adaptive' },
      benefits: [
        { benefit: 'Ferrari technical partnership and powertrain supply', type: 'Technical', impact: 'Significant' },
        { benefit: 'Audi manufacturer investment and future works status', type: 'Financial', impact: 'Strategic' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'Stake F1 Team Kick Sauber Profile | AF Motorsport', description: 'Official profile of Stake F1 Team Kick Sauber' },
    generateSlug: false,
    slug: 'stake-f1-team-kick-sauber',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Fédération Internationale de l\'Automobile',
    alias: 'FIA',
    toggle: 'advanced',
    type: categoriesIds[215],
    basics: {
      enable: true,
      identifier: { code: 'FIA-GOV', abbreviation: 'FIA', registration: 'FR-ORG-1904-001' },
      description: 'Global governing body for motorsport and mobility, establishing regulations and safety standards.',
      tagline: 'Driving change for a better world',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Founded in 1904, governing international motorsport since 1946. Responsible for F1, WEC, WRC, and numerous other championships worldwide.',
      parent: null,
      evolution: { founded: '1904-06-20', merged: null, rebranded: null, defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Iconic', reliability: 'Exceptional', innovation: 'Adaptive' },
      benefits: [
        { benefit: 'Global regulatory framework and safety standard development', type: 'Operational', impact: 'Strategic' },
        { benefit: 'International sporting governance and dispute resolution', type: 'Operational', impact: 'Strategic' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'FIA Profile | AF Motorsport', description: 'Official profile of Fédération Internationale de l\'Automobile' },
    generateSlug: false,
    slug: 'fia',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Formula One Group',
    alias: 'F1 Group',
    toggle: 'advanced',
    type: categoriesIds[232],
    basics: {
      enable: true,
      identifier: { code: 'F1-GRP', abbreviation: 'F1G', registration: 'GB-ORG-2017-010' },
      description: 'Commercial rights holder and promoter of Formula 1 World Championship global media and events.',
      tagline: 'The pinnacle of motorsport',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Acquired by Liberty Media in 2017. Responsible for commercial strategy, media production, and global expansion of Formula 1 championship.',
      parent: null,
      evolution: { founded: '2017-01-23', merged: null, rebranded: null, defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Iconic', reliability: 'Exceptional', innovation: 'Innovative' },
      benefits: [
        { benefit: 'Global media rights distribution and digital platform development', type: 'Marketing', impact: 'Strategic' },
        { benefit: 'Event promotion and commercial partnership management', type: 'Financial', impact: 'Strategic' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'Formula One Group Profile | AF Motorsport', description: 'Official profile of Formula One Group commercial rights holder' },
    generateSlug: false,
    slug: 'formula-one-group',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Pirelli & C. SpA',
    alias: 'Pirelli',
    toggle: 'advanced',
    type: categoriesIds[107],
    basics: {
      enable: true,
      identifier: { code: 'PIR-SUP', abbreviation: 'PIR', registration: 'IT-CORP-1872-011' },
      description: 'Italian premium tire manufacturer and exclusive Formula 1 tire supplier since 2011.',
      tagline: 'Power is nothing without control',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Founded in 1872, supplying tires to Formula 1 since 2011. Develops multiple compound specifications for varying circuit and weather conditions.',
      parent: null,
      evolution: { founded: '1872-01-01', merged: null, rebranded: null, defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Prestigious', reliability: 'Exceptional', innovation: 'Innovative' },
      benefits: [
        { benefit: 'Exclusive tire supply partnership with technical data sharing', type: 'Technical', impact: 'Strategic' },
        { benefit: 'Global brand exposure through championship association', type: 'Marketing', impact: 'Significant' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'Pirelli Profile | AF Motorsport', description: 'Official profile of Pirelli Formula 1 tire supplier' },
    generateSlug: false,
    slug: 'pirelli',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Aramco',
    alias: 'Saudi Aramco',
    toggle: 'advanced',
    type: categoriesIds[126],
    basics: {
      enable: true,
      identifier: { code: 'ARM-SPN', abbreviation: 'ARM', registration: 'SA-CORP-1933-012' },
      description: 'Saudi Arabian multinational petroleum company and strategic partner to multiple Formula 1 teams.',
      tagline: 'Energy for a changing world',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Founded 1933, world\'s largest oil producer. Strategic partnerships with Aston Martin F1 and other motorsport entities for sustainability innovation.',
      parent: null,
      evolution: { founded: '1933-05-29', merged: null, rebranded: null, defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Prestigious', reliability: 'Exceptional', innovation: 'Adaptive' },
      benefits: [
        { benefit: 'Sustainable fuels research and development collaboration', type: 'Technical', impact: 'Strategic' },
        { benefit: 'Global energy sector brand visibility through motorsport', type: 'Marketing', impact: 'Significant' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'Aramco Profile | AF Motorsport', description: 'Official profile of Aramco motorsport partnership' },
    generateSlug: false,
    slug: 'aramco',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Petronas',
    alias: 'PETRONAS',
    toggle: 'advanced',
    type: categoriesIds[41],
    basics: {
      enable: true,
      identifier: { code: 'PET-SPN', abbreviation: 'PET', registration: 'MY-CORP-1974-013' },
      description: 'Malaysian multinational oil and gas company and title partner of Mercedes-AMG Petronas F1 Team.',
      tagline: 'Passion for performance',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Founded 1974, Malaysia\'s national oil company. Technical partnership with Mercedes for lubricants, fuels, and fluid technology development.',
      parent: null,
      evolution: { founded: '1974-08-17', merged: null, rebranded: null, defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Prestigious', reliability: 'Exceptional', innovation: 'Innovative' },
      benefits: [
        { benefit: 'Advanced lubricants and fluids technical co-development', type: 'Technical', impact: 'Strategic' },
        { benefit: 'Asian market brand expansion through championship association', type: 'Marketing', impact: 'Significant' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'Petronas Profile | AF Motorsport', description: 'Official profile of Petronas motorsport partnership' },
    generateSlug: false,
    slug: 'petronas',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Red Bull GmbH',
    alias: 'Red Bull',
    toggle: 'advanced',
    type: categoriesIds[9],
    basics: {
      enable: true,
      identifier: { code: 'RBL-SPN', abbreviation: 'RBL', registration: 'AT-CORP-1987-014' },
      description: 'Austrian energy drink company and owner of Red Bull Racing and Visa Cash App RB Formula 1 teams.',
      tagline: 'Red Bull gives you wings',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Founded 1987, global leader in energy drinks. Owns and operates two Formula 1 teams with integrated marketing and technical strategy.',
      parent: null,
      evolution: { founded: '1987-04-01', merged: null, rebranded: null, defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Iconic', reliability: 'Exceptional', innovation: 'Revolutionary' },
      benefits: [
        { benefit: 'Dual-team technical development and resource sharing', type: 'Technical', impact: 'Strategic' },
        { benefit: 'Global brand marketing through championship success', type: 'Marketing', impact: 'Strategic' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'Red Bull Profile | AF Motorsport', description: 'Official profile of Red Bull motorsport ownership' },
    generateSlug: false,
    slug: 'red-bull',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Cognizant Technology Solutions',
    alias: 'Cognizant',
    toggle: 'advanced',
    type: categoriesIds[105],
    basics: {
      enable: true,
      identifier: { code: 'COG-SPN', abbreviation: 'COG', registration: 'US-CORP-1994-015' },
      description: 'American multinational technology company and title partner of Aston Martin F1 Team.',
      tagline: 'Engineering the future',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Founded 1994, global IT services and consulting leader. Title partnership with Aston Martin F1 for digital transformation and brand visibility.',
      parent: null,
      evolution: { founded: '1994-01-01', merged: null, rebranded: null, defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Established', reliability: 'Reliable', innovation: 'Innovative' },
      benefits: [
        { benefit: 'Digital transformation and data analytics collaboration', type: 'Technical', impact: 'Moderate' },
        { benefit: 'Global technology sector brand exposure through F1', type: 'Marketing', impact: 'Significant' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'Cognizant Profile | AF Motorsport', description: 'Official profile of Cognizant motorsport partnership' },
    generateSlug: false,
    slug: 'cognizant',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'BWT AG',
    alias: 'BWT',
    toggle: 'advanced',
    type: categoriesIds[118],
    basics: {
      enable: true,
      identifier: { code: 'BWT-SPN', abbreviation: 'BWT', registration: 'AT-CORP-1990-016' },
      description: 'Austrian water technology company and title partner of Alpine F1 Team.',
      tagline: 'Water for life',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Founded 1990, European leader in water treatment technology. Title partnership with Alpine F1 for sustainability messaging and brand visibility.',
      parent: null,
      evolution: { founded: '1990-01-01', merged: null, rebranded: null, defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Established', reliability: 'Reliable', innovation: 'Adaptive' },
      benefits: [
        { benefit: 'Sustainability and water technology innovation collaboration', type: 'Technical', impact: 'Moderate' },
        { benefit: 'European market brand exposure through F1 association', type: 'Marketing', impact: 'Moderate' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'BWT Profile | AF Motorsport', description: 'Official profile of BWT motorsport partnership' },
    generateSlug: false,
    slug: 'bwt',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'MoneyGram International',
    alias: 'MoneyGram',
    toggle: 'advanced',
    type: categoriesIds[27],
    basics: {
      enable: true,
      identifier: { code: 'MGM-SPN', abbreviation: 'MGM', registration: 'US-CORP-1940-017' },
      description: 'American financial services company and title partner of Haas F1 Team.',
      tagline: 'Moving money, connecting people',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Founded 1940, global leader in money transfer services. Title partnership with Haas F1 for American market visibility and brand association.',
      parent: null,
      evolution: { founded: '1940-01-01', merged: null, rebranded: null, defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Established', reliability: 'Reliable', innovation: 'Adaptive' },
      benefits: [
        { benefit: 'American market brand visibility through F1 platform', type: 'Marketing', impact: 'Significant' },
        { benefit: 'Financial services technology collaboration opportunities', type: 'Operational', impact: 'Moderate' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'MoneyGram Profile | AF Motorsport', description: 'Official profile of MoneyGram motorsport partnership' },
    generateSlug: false,
    slug: 'moneygram',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Stake.com',
    alias: 'Stake',
    toggle: 'advanced',
    type: categoriesIds[166],
    basics: {
      enable: true,
      identifier: { code: 'STK-SPN', abbreviation: 'STK', registration: 'CW-CORP-2017-018' },
      description: 'Cryptocurrency-based online casino and title partner of Stake F1 Team Kick Sauber.',
      tagline: 'Level up your game',
      visibility: { show: true }
    },
    details: {
      enable: true,
      narrative: null,
      background: 'Founded 2017, leading cryptocurrency gambling platform. Title partnership with Sauber F1 for digital audience engagement and brand visibility.',
      parent: null,
      evolution: { founded: '2017-01-01', merged: null, rebranded: null, defunct: null },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      channels: [],
      reputation: { prestige: 'Emerging', reliability: 'Developing', innovation: 'Innovative' },
      benefits: [
        { benefit: 'Digital audience engagement and cryptocurrency adoption', type: 'Marketing', impact: 'Significant' },
        { benefit: 'Blockchain technology collaboration opportunities', type: 'Technical', impact: 'Moderate' }
      ],
      visibility: { show: true }
    },
    assets: { enable: true, logo: null, gallery: null, visibility: { show: true } },
    contexts: {
      enable: true,
      headquarters: [],
      history: null,
      notes: [],
      visibility: { show: true }
    },
    seo: { title: 'Stake Profile | AF Motorsport', description: 'Official profile of Stake motorsport partnership' },
    generateSlug: false,
    slug: 'stake',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  }
] as const;
