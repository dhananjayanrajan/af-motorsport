// FILE: src/collections/Attributes/Tag/seeders/preload.ts
export const PRELOAD_TAG = (categoriesIds: number[]) => [
  {
    name: 'Formula 1',
    type: categoriesIds[185],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'The pinnacle of open-wheel motorsport competition',
      context: 'FIA World Championship events, technical regulations, and global racing heritage',
      visibility: { show: true }
    },
    seo: { title: 'Formula 1 Tag | AF Motorsport', description: 'Content tagged with Formula 1 - the pinnacle of motorsport' },
    generateSlug: false, slug: 'formula-1',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Le Mans',
    type: categoriesIds[53],
    toggle: 'advanced',
    details: {
      enable: true,
      description: '24 Hours of Le Mans endurance racing heritage',
      context: 'Iconic moments, legendary victories, and endurance racing excellence',
      visibility: { show: true }
    },
    seo: { title: 'Le Mans Tag | AF Motorsport', description: 'Endurance racing heritage and the 24 Hours of Le Mans' },
    generateSlug: false, slug: 'le-mans',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Safety Innovation',
    type: categoriesIds[146],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Advances in motorsport safety technology and protocols',
      context: 'FIA regulations, crash protection systems, and survival cell engineering',
      visibility: { show: true }
    },
    seo: { title: 'Safety Innovation Tag | AF Motorsport', description: 'Latest developments in motorsport safety technology and regulations' },
    generateSlug: false, slug: 'safety-innovation',
    visibility: { check_publish: true, check_featured: false, check_pinned: true }
  },
  {
    name: 'WEC',
    type: categoriesIds[123],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'FIA World Endurance Championship global series',
      context: 'Prototype and GT endurance racing across iconic circuits worldwide',
      visibility: { show: true }
    },
    seo: { title: 'WEC Tag | AF Motorsport', description: 'World Endurance Championship racing content and coverage' },
    generateSlug: false, slug: 'wec',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'IndyCar',
    type: categoriesIds[38],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'North American open-wheel racing championship',
      context: 'Oval and road course competition featuring the Indianapolis 500',
      visibility: { show: true }
    },
    seo: { title: 'IndyCar Tag | AF Motorsport', description: 'IndyCar Series racing content and championship coverage' },
    generateSlug: false, slug: 'indycar',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'NASCAR',
    type: categoriesIds[122],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'American stock car racing championship series',
      context: 'Oval track competition, superspeedway racing, and grassroots motorsport culture',
      visibility: { show: true }
    },
    seo: { title: 'NASCAR Tag | AF Motorsport', description: 'NASCAR stock car racing content and championship coverage' },
    generateSlug: false, slug: 'nascar',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Formula E',
    type: categoriesIds[17],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'All-electric single-seater racing championship',
      context: 'Sustainable motorsport innovation and urban street circuit competition',
      visibility: { show: true }
    },
    seo: { title: 'Formula E Tag | AF Motorsport', description: 'Electric racing championship content and sustainability innovation' },
    generateSlug: false, slug: 'formula-e',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'WRC',
    type: categoriesIds[245],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'World Rally Championship off-road competition',
      context: 'Gravel, tarmac, and snow rallying across diverse global terrains',
      visibility: { show: true }
    },
    seo: { title: 'WRC Tag | AF Motorsport', description: 'World Rally Championship content and off-road racing excellence' },
    generateSlug: false, slug: 'wrc',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'MotoGP',
    type: categoriesIds[243],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Premier class of motorcycle road racing',
      context: 'Two-wheel competition at the highest level of speed and skill',
      visibility: { show: true }
    },
    seo: { title: 'MotoGP Tag | AF Motorsport', description: 'MotoGP motorcycle racing content and championship coverage' },
    generateSlug: false, slug: 'motogp',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'GT3',
    type: categoriesIds[52],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Grand Touring sports car racing category',
      context: 'Balance of performance regulations and manufacturer competition',
      visibility: { show: true }
    },
    seo: { title: 'GT3 Tag | AF Motorsport', description: 'GT3 sports car racing content and manufacturer competition' },
    generateSlug: false, slug: 'gt3',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Aerodynamics',
    type: categoriesIds[215],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Airflow management and downforce generation technology',
      context: 'CFD simulation, wind tunnel testing, and on-track performance optimization',
      visibility: { show: true }
    },
    seo: { title: 'Aerodynamics Tag | AF Motorsport', description: 'Aerodynamic engineering and performance optimization content' },
    generateSlug: false, slug: 'aerodynamics',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Hybrid Powertrain',
    type: categoriesIds[232],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Combined internal combustion and electric propulsion systems',
      context: 'MGU-K, MGU-H, energy recovery, and deployment strategy',
      visibility: { show: true }
    },
    seo: { title: 'Hybrid Powertrain Tag | AF Motorsport', description: 'Hybrid technology and energy management in motorsport' },
    generateSlug: false, slug: 'hybrid-powertrain',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Telemetry',
    type: categoriesIds[107],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Real-time vehicle data acquisition and analysis',
      context: 'Sensor networks, data transmission, and performance diagnostics',
      visibility: { show: true }
    },
    seo: { title: 'Telemetry Tag | AF Motorsport', description: 'Vehicle data acquisition and performance analysis content' },
    generateSlug: false, slug: 'telemetry',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Pit Strategy',
    type: categoriesIds[126],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Race execution planning and in-race decision making',
      context: 'Tire management, fuel strategy, and competitive positioning',
      visibility: { show: true }
    },
    seo: { title: 'Pit Strategy Tag | AF Motorsport', description: 'Race strategy and competitive decision-making content' },
    generateSlug: false, slug: 'pit-strategy',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Tire Management',
    type: categoriesIds[41],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Optimizing tire performance and degradation control',
      context: 'Compound selection, temperature windows, and wear patterns',
      visibility: { show: true }
    },
    seo: { title: 'Tire Management Tag | AF Motorsport', description: 'Tire performance optimization and compound strategy content' },
    generateSlug: false, slug: 'tire-management',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Wet Weather Racing',
    type: categoriesIds[9],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Competition in rain-affected track conditions',
      context: 'Intermediate and wet tire compounds, visibility challenges, and driver skill',
      visibility: { show: true }
    },
    seo: { title: 'Wet Weather Racing Tag | AF Motorsport', description: 'Rain racing content and adverse condition competition' },
    generateSlug: false, slug: 'wet-weather-racing',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Overtaking',
    type: categoriesIds[105],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Wheel-to-wheel racing and position advancement',
      context: 'DRS utilization, slipstreaming, and racecraft execution',
      visibility: { show: true }
    },
    seo: { title: 'Overtaking Tag | AF Motorsport', description: 'Wheel-to-wheel racing and competitive passing content' },
    generateSlug: false, slug: 'overtaking',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Qualifying',
    type: categoriesIds[118],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Single-lap performance optimization for grid position',
      context: 'Tire preparation, fuel load management, and peak power deployment',
      visibility: { show: true }
    },
    seo: { title: 'Qualifying Tag | AF Motorsport', description: 'Qualifying session content and grid position competition' },
    generateSlug: false, slug: 'qualifying',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Monaco Grand Prix',
    type: categoriesIds[27],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Prestigious street circuit race in Monte Carlo',
      context: 'Historic venue, tight corners, and ultimate driver challenge',
      visibility: { show: true }
    },
    seo: { title: 'Monaco Grand Prix Tag | AF Motorsport', description: 'Monaco Grand Prix content and street circuit racing heritage' },
    generateSlug: false, slug: 'monaco-grand-prix',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Spa-Francorchamps',
    type: categoriesIds[166],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Iconic Ardennes circuit featuring Eau Rouge and Raidillon',
      context: 'High-speed corners, elevation changes, and unpredictable weather',
      visibility: { show: true }
    },
    seo: { title: 'Spa-Francorchamps Tag | AF Motorsport', description: 'Spa circuit content and legendary racing venue coverage' },
    generateSlug: false, slug: 'spa-francorchamps',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Indianapolis 500',
    type: categoriesIds[84],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'The Greatest Spectacle in Racing at IMS',
      context: 'Historic oval competition, tradition, and championship significance',
      visibility: { show: true }
    },
    seo: { title: 'Indianapolis 500 Tag | AF Motorsport', description: 'Indy 500 content and historic oval racing heritage' },
    generateSlug: false, slug: 'indianapolis-500',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Bathurst 1000',
    type: categoriesIds[48],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Mount Panorama endurance classic in Australia',
      context: 'The Mountain, elevation changes, and touring car competition',
      visibility: { show: true }
    },
    seo: { title: 'Bathurst 1000 Tag | AF Motorsport', description: 'Bathurst 1000 content and Australian motorsport heritage' },
    generateSlug: false, slug: 'bathurst-1000',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Halo Device',
    type: categoriesIds[109],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Cockpit protection system for driver safety',
      context: 'FIA-mandated safety innovation and impact resistance engineering',
      visibility: { show: true }
    },
    seo: { title: 'Halo Device Tag | AF Motorsport', description: 'Driver safety protection systems and cockpit safety innovation' },
    generateSlug: false, slug: 'halo-device',
    visibility: { check_publish: true, check_featured: false, check_pinned: true }
  },
  {
    name: 'DRS',
    type: categoriesIds[110],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Drag Reduction System for overtaking assistance',
      context: 'Adjustable rear wing, activation zones, and competitive balance',
      visibility: { show: true }
    },
    seo: { title: 'DRS Tag | AF Motorsport', description: 'Drag Reduction System technology and overtaking assistance' },
    generateSlug: false, slug: 'drs',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Sustainability',
    type: categoriesIds[147],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Environmental responsibility in motorsport operations',
      context: 'Carbon neutrality, sustainable fuels, and eco-conscious innovation',
      visibility: { show: true }
    },
    seo: { title: 'Sustainability Tag | AF Motorsport', description: 'Environmental responsibility and sustainable motorsport practices' },
    generateSlug: false, slug: 'sustainability',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Data Analytics',
    type: categoriesIds[211],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Performance insight extraction from racing data',
      context: 'Machine learning, pattern recognition, and strategic optimization',
      visibility: { show: true }
    },
    seo: { title: 'Data Analytics Tag | AF Motorsport', description: 'Performance data analysis and strategic insight generation' },
    generateSlug: false, slug: 'data-analytics',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Team Radio',
    type: categoriesIds[34],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Driver-engineer communication during competition',
      context: 'Strategy updates, performance feedback, and race control messages',
      visibility: { show: true }
    },
    seo: { title: 'Team Radio Tag | AF Motorsport', description: 'Driver communication and race strategy coordination content' },
    generateSlug: false, slug: 'team-radio',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Podium Celebration',
    type: categoriesIds[97],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Post-race victory recognition and achievement',
      context: 'Trophy presentation, champagne spray, and championship moments',
      visibility: { show: true }
    },
    seo: { title: 'Podium Celebration Tag | AF Motorsport', description: 'Victory celebration and championship achievement content' },
    generateSlug: false, slug: 'podium-celebration',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Historic Racing',
    type: categoriesIds[121],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Classic vehicle competition and heritage preservation',
      context: 'Vintage cars, period-correct regulations, and motorsport legacy',
      visibility: { show: true }
    },
    seo: { title: 'Historic Racing Tag | AF Motorsport', description: 'Classic car competition and motorsport heritage preservation' },
    generateSlug: false, slug: 'historic-racing',
    visibility: { check_publish: true, check_featured: false, check_pinned: true }
  },
  {
    name: 'Rookie Driver',
    type: categoriesIds[247],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'First-season competitors in elite racing categories',
      context: 'Development programs, learning curves, and emerging talent',
      visibility: { show: true }
    },
    seo: { title: 'Rookie Driver Tag | AF Motorsport', description: 'Emerging racing talent and first-season competitor content' },
    generateSlug: false, slug: 'rookie-driver',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Champion',
    type: categoriesIds[57],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Championship title holders and record achievers',
      context: 'Season-long excellence, consistency, and competitive mastery',
      visibility: { show: true }
    },
    seo: { title: 'Champion Tag | AF Motorsport', description: 'Championship winners and record-breaking achievement content' },
    generateSlug: false, slug: 'champion',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Works Team',
    type: categoriesIds[180],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Factory-backed racing operations and manufacturer entries',
      context: 'Direct manufacturer support, resource allocation, and technical advantage',
      visibility: { show: true }
    },
    seo: { title: 'Works Team Tag | AF Motorsport', description: 'Factory-backed racing teams and manufacturer competition content' },
    generateSlug: false, slug: 'works-team',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Privateer',
    type: categoriesIds[86],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Independent racing entries without factory support',
      context: 'Resourceful competition, customer equipment, and grassroots spirit',
      visibility: { show: true }
    },
    seo: { title: 'Privateer Tag | AF Motorsport', description: 'Independent racing teams and customer entry competition content' },
    generateSlug: false, slug: 'privateer',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Simulator Development',
    type: categoriesIds[1],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Virtual testing and driver training technology',
      context: 'Physics modeling, correlation validation, and setup optimization',
      visibility: { show: true }
    },
    seo: { title: 'Simulator Development Tag | AF Motorsport', description: 'Virtual testing technology and driver training simulation content' },
    generateSlug: false, slug: 'simulator-development',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Wind Tunnel',
    type: categoriesIds[134],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Aerodynamic testing and validation facility',
      context: 'Scale modeling, flow visualization, and performance correlation',
      visibility: { show: true }
    },
    seo: { title: 'Wind Tunnel Tag | AF Motorsport', description: 'Aerodynamic testing facilities and performance validation content' },
    generateSlug: false, slug: 'wind-tunnel',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Cost Cap',
    type: categoriesIds[53],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Financial regulations limiting team expenditure',
      context: 'Budget compliance, resource optimization, and competitive balance',
      visibility: { show: true }
    },
    seo: { title: 'Cost Cap Tag | AF Motorsport', description: 'Financial regulations and competitive balance in motorsport' },
    generateSlug: false, slug: 'cost-cap',
    visibility: { check_publish: true, check_featured: false, check_pinned: true }
  },
  {
    name: 'Fan Engagement',
    type: categoriesIds[178],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Audience interaction and community building initiatives',
      context: 'Social media, paddock access, and immersive experiences',
      visibility: { show: true }
    },
    seo: { title: 'Fan Engagement Tag | AF Motorsport', description: 'Audience interaction and motorsport community building content' },
    generateSlug: false, slug: 'fan-engagement',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Paddock Life',
    type: categoriesIds[86],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Behind-the-scenes team operations and culture',
      context: 'Garage atmosphere, crew dynamics, and race weekend routines',
      visibility: { show: true }
    },
    seo: { title: 'Paddock Life Tag | AF Motorsport', description: 'Behind-the-scenes team operations and motorsport culture content' },
    generateSlug: false, slug: 'paddock-life',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Golden Age',
    type: categoriesIds[66],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Historic era of motorsport excellence and innovation',
      context: 'Legendary drivers, iconic cars, and transformative competition',
      visibility: { show: true }
    },
    seo: { title: 'Golden Age Tag | AF Motorsport', description: 'Historic motorsport era content and legendary competition heritage' },
    generateSlug: false, slug: 'golden-age',
    visibility: { check_publish: true, check_featured: false, check_pinned: true }
  },
  {
    name: 'Hybrid Era',
    type: categoriesIds[209],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Modern period of combined powertrain technology',
      context: 'Energy recovery systems, efficiency focus, and technical evolution',
      visibility: { show: true }
    },
    seo: { title: 'Hybrid Era Tag | AF Motorsport', description: 'Modern hybrid technology era content and technical evolution' },
    generateSlug: false, slug: 'hybrid-era',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Electric Future',
    type: categoriesIds[28],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Next-generation all-electric racing development',
      context: 'Battery technology, sustainability goals, and innovation pathways',
      visibility: { show: true }
    },
    seo: { title: 'Electric Future Tag | AF Motorsport', description: 'Electric racing development and sustainable motorsport innovation' },
    generateSlug: false, slug: 'electric-future',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Legendary Driver',
    type: categoriesIds[191],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Historic figures who defined motorsport excellence',
      context: 'Championship records, iconic moments, and enduring influence',
      visibility: { show: true }
    },
    seo: { title: 'Legendary Driver Tag | AF Motorsport', description: 'Historic racing figures and championship legacy content' },
    generateSlug: false, slug: 'legendary-driver',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Team Principal',
    type: categoriesIds[239],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Leadership figures directing racing operations',
      context: 'Strategic vision, organizational management, and competitive decisions',
      visibility: { show: true }
    },
    seo: { title: 'Team Principal Tag | AF Motorsport', description: 'Racing team leadership and strategic management content' },
    generateSlug: false, slug: 'team-principal',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Monza',
    type: categoriesIds[97],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'The Temple of Speed - historic Italian circuit',
      context: 'High-speed straights, passionate tifosi, and racing heritage',
      visibility: { show: true }
    },
    seo: { title: 'Monza Tag | AF Motorsport', description: 'Monza circuit content and Italian motorsport heritage' },
    generateSlug: false, slug: 'monza',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Silverstone',
    type: categoriesIds[123],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Home of British Motor Racing and F1 heritage',
      context: 'Historic airfield circuit, fast corners, and championship significance',
      visibility: { show: true }
    },
    seo: { title: 'Silverstone Tag | AF Motorsport', description: 'Silverstone circuit content and British motorsport heritage' },
    generateSlug: false, slug: 'silverstone',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Suzuka',
    type: categoriesIds[213],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Technical figure-eight circuit in Japan',
      context: 'Degner curves, 130R, and driver skill challenge',
      visibility: { show: true }
    },
    seo: { title: 'Suzuka Tag | AF Motorsport', description: 'Suzuka circuit content and Japanese motorsport excellence' },
    generateSlug: false, slug: 'suzuka',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Interlagos',
    type: categoriesIds[219],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'São Paulo circuit with passionate Brazilian fans',
      context: 'Anti-clockwise layout, Senna S, and dramatic championship finales',
      visibility: { show: true }
    },
    seo: { title: 'Interlagos Tag | AF Motorsport', description: 'Interlagos circuit content and Brazilian motorsport passion' },
    generateSlug: false, slug: 'interlagos',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Yas Marina',
    type: categoriesIds[116],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Twilight desert circuit in Abu Dhabi',
      context: 'Marina views, season finale venue, and modern facility',
      visibility: { show: true }
    },
    seo: { title: 'Yas Marina Tag | AF Motorsport', description: 'Yas Marina circuit content and twilight racing in Abu Dhabi' },
    generateSlug: false, slug: 'yas-marina',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Nürburgring',
    type: categoriesIds[239],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'The Green Hell - legendary German circuit',
      context: 'Nordschleife challenge, Eifel Mountains, and driver endurance',
      visibility: { show: true }
    },
    seo: { title: 'Nürburgring Tag | AF Motorsport', description: 'Nürburgring circuit content and legendary German racing venue' },
    generateSlug: false, slug: 'nurburgring',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'COTA',
    type: categoriesIds[93],
    toggle: 'advanced',
    details: {
      enable: true,
      description: 'Circuit of the Americas in Austin, Texas',
      context: 'Elevation changes, Turn 1, and US Grand Prix venue',
      visibility: { show: true }
    },
    seo: { title: 'COTA Tag | AF Motorsport', description: 'Circuit of the Americas content and United States Grand Prix venue' },
    generateSlug: false, slug: 'cota',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  }
] as const;
