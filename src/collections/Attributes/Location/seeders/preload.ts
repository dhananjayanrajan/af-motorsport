// FILE: src/collections/Attributes/Location/seeders/preload.ts
export const PRELOAD_LOCATION = (categoriesIds: number[]) => [
  {
    name: 'Silverstone Circuit',
    label: 'Home of British Motor Racing',
    type: categoriesIds[185],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Silverstone',
      description: 'World-famous motorsport circuit hosting the British Grand Prix.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: 'Towcester, Northamptonshire, NN12 8TN, United Kingdom',
      geometry: {
        coordinates: [-1.0169, 52.0786],
        bounds: '52.0900,-1.0300,52.0700,-1.0000',
        area: '760 acres'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Rolling hills',
        climate: 'Temperate',
        features: 'Former RAF airfield'
      },
      infrastructure: {
        transport: 'M1 motorway, Milton Keynes railway station',
        facilities: 'Paddock, pit buildings, media center',
        amenities: 'Restaurants, hospitality suites, museum'
      },
      accessibility: {
        approach: 'PublicRoad',
        facilities: 'DisabledAccess',
        capacity: 'Large'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Silverstone Circuit | AF Motorsport',
      description: 'Official Silverstone Circuit information - Home of the British Grand Prix'
    },
    generateSlug: false,
    slug: 'silverstone-circuit',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  },
  {
    name: 'Maranello Factory',
    label: 'Heart of Italian Passion',
    type: categoriesIds[53],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Maranello Headquarters',
      description: 'Historic manufacturing facility and headquarters.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: 'Via Abetone Inferiore 4, 41053 Maranello MO, Italy',
      geometry: {
        coordinates: [10.8660, 44.5250],
        bounds: '44.5300,10.8600,44.5200,10.8700',
        area: '250,000 sqm'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Foothills',
        climate: 'Continental',
        features: 'Emilia-Romagna region'
      },
      infrastructure: {
        transport: 'Modena railway station, A1 motorway',
        facilities: 'Production lines, R&D center, wind tunnel',
        amenities: 'Employee cafeteria, museum, gift shop'
      },
      accessibility: {
        approach: 'PublicRoad',
        facilities: 'VIPEntry',
        capacity: 'Medium'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Maranello Factory | AF Motorsport',
      description: 'Historic Ferrari factory and headquarters in Maranello, Italy'
    },
    generateSlug: false,
    slug: 'maranello-factory',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: false
    }
  },
  {
    name: 'Nürburgring Nordschleife',
    label: 'The Green Hell',
    type: categoriesIds[146],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Nürburgring',
      description: 'Notorious and challenging race track in the Eifel Mountains.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: 'Nürburgring Blvd, 53520 Nürburg, Germany',
      geometry: {
        coordinates: [6.9475, 50.3346],
        bounds: '50.3500,6.9300,50.3200,6.9600',
        area: '5,148 acres'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Mountainous, forested',
        climate: 'Continental',
        features: 'Eifel Mountains'
      },
      infrastructure: {
        transport: 'Nürburgring railway station, A48 motorway',
        facilities: 'Grandstands, pit complex, race control',
        amenities: 'Hotels, restaurants, ringwerk shopping center'
      },
      accessibility: {
        approach: 'PublicRoad',
        facilities: 'DisabledAccess',
        capacity: 'Massive'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Nürburgring Nordschleife | AF Motorsport',
      description: 'The legendary Green Hell - Nürburgring Nordschleife circuit information'
    },
    generateSlug: false,
    slug: 'nurburgring-nordschleife',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  },
  {
    name: 'Circuit de Monaco',
    label: 'The Crown Jewel of Street Racing',
    type: categoriesIds[123],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Monaco Grand Prix Circuit',
      description: 'Prestigious street circuit through the streets of Monte Carlo.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: 'Boulevard Albert 1er, 98000 Monaco',
      geometry: {
        coordinates: [7.4206, 43.7347],
        bounds: '43.7400,7.4300,43.7300,7.4100',
        area: '3.34 km'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Coastal urban',
        climate: 'Mediterranean',
        features: 'Harbor views, elevation changes'
      },
      infrastructure: {
        transport: 'Nice Côte d\'Azur Airport, Monaco-Monte-Carlo station',
        facilities: 'Pit lane, paddock, royal box',
        amenities: 'Luxury hospitality, yacht berths, casinos'
      },
      accessibility: {
        approach: 'PublicRoad',
        facilities: 'VIPEntry',
        capacity: 'Small'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Circuit de Monaco | AF Motorsport',
      description: 'Monaco Grand Prix circuit - The most prestigious street race in motorsport'
    },
    generateSlug: false,
    slug: 'circuit-de-monaco',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  },
  {
    name: 'Circuit de Spa-Francorchamps',
    label: 'The Ultimate Driver\'s Circuit',
    type: categoriesIds[38],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Spa-Francorchamps',
      description: 'Iconic Ardennes circuit featuring Eau Rouge and Raidillon.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: 'Route du Circuit 55, 4970 Stavelot, Belgium',
      geometry: {
        coordinates: [5.9714, 50.4372],
        bounds: '50.4500,5.9800,50.4200,5.9600',
        area: '945 acres'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Forest hills, valleys',
        climate: 'Temperate',
        features: 'Ardennes Forest, unpredictable weather'
      },
      infrastructure: {
        transport: 'Liège Airport, E42 motorway',
        facilities: 'Modern pit complex, grandstands, media center',
        amenities: 'Camping, restaurants, fan zones'
      },
      accessibility: {
        approach: 'PublicRoad',
        facilities: 'DisabledAccess',
        capacity: 'Large'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Spa-Francorchamps | AF Motorsport',
      description: 'Circuit de Spa-Francorchamps - Home of the Belgian Grand Prix'
    },
    generateSlug: false,
    slug: 'circuit-de-spa-francorchamps',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  },
  {
    name: 'Suzuka International Racing Course',
    label: 'Technical Mastery Challenge',
    type: categoriesIds[122],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Suzuka Circuit',
      description: 'Figure-eight layout circuit renowned for technical precision.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: '7992 Ino-cho, Suzuka, Mie 510-0295, Japan',
      geometry: {
        coordinates: [136.5407, 34.8431],
        bounds: '34.8500,136.5500,34.8400,136.5300',
        area: '550 acres'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Flat plains',
        climate: 'Subtropical',
        features: 'Figure-eight layout, Degner curves'
      },
      infrastructure: {
        transport: 'Nagoya Airport, JR Kansai Line',
        facilities: 'Honda-owned complex, theme park, hotel',
        amenities: 'Onsen, restaurants, motorsport museum'
      },
      accessibility: {
        approach: 'PublicRoad',
        facilities: 'DisabledAccess',
        capacity: 'Large'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Suzuka Circuit | AF Motorsport',
      description: 'Suzuka International Racing Course - Technical challenge of Japanese motorsport'
    },
    generateSlug: false,
    slug: 'suzuka-international-racing-course',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  },
  {
    name: 'Circuit of the Americas',
    label: 'America\'s Premier Motorsport Venue',
    type: categoriesIds[17],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'COTA',
      description: 'Purpose-built F1 circuit in Austin featuring elevation changes.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: '9201 Circuit of the Americas Blvd, Austin, TX 78617, USA',
      geometry: {
        coordinates: [-97.6411, 30.1328],
        bounds: '30.1400,-97.6300,30.1200,-97.6500',
        area: '1,400 acres'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Hill country',
        climate: 'Subtropical',
        features: '133ft elevation change, Turn 1 inspired by Silverstone'
      },
      infrastructure: {
        transport: 'Austin-Bergstrom Airport, Highway 130',
        facilities: 'Observation tower, amphitheater, karting track',
        amenities: 'Food trucks, VIP suites, camping'
      },
      accessibility: {
        approach: 'PublicRoad',
        facilities: 'DisabledAccess',
        capacity: 'Massive'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Circuit of the Americas | AF Motorsport',
      description: 'COTA Austin - Home of the United States Grand Prix'
    },
    generateSlug: false,
    slug: 'circuit-of-the-americas',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  },
  {
    name: 'Autódromo José Carlos Pace',
    label: 'Interlagos - The People\'s Circuit',
    type: categoriesIds[245],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Interlagos',
      description: 'Historic São Paulo circuit known for passionate fans and dramatic races.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: 'Av. Sen. Teotônio Vilela, 261 - Interlagos, São Paulo, Brazil',
      geometry: {
        coordinates: [-46.6997, -23.7036],
        bounds: '-23.7100,-46.6900,-23.7000,-46.7100',
        area: '780 acres'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Urban plateau',
        climate: 'Subtropical',
        features: 'Anti-clockwise layout, Senna S curve'
      },
      infrastructure: {
        transport: 'Congonhas Airport, Marginal Pinheiros',
        facilities: 'Grandstands, pit complex, media facilities',
        amenities: 'Food courts, fan zones, merchandise'
      },
      accessibility: {
        approach: 'PublicRoad',
        facilities: 'DisabledAccess',
        capacity: 'Large'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Interlagos Circuit | AF Motorsport',
      description: 'Autódromo José Carlos Pace - Brazilian Grand Prix venue in São Paulo'
    },
    generateSlug: false,
    slug: 'autodromo-jose-carlos-pace-interlagos',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  },
  {
    name: 'Autodromo Nazionale di Monza',
    label: 'The Temple of Speed',
    type: categoriesIds[243],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Monza',
      description: 'Historic high-speed circuit in the Royal Park of Monza.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: 'Viale di Vedano, 20900 Monza MB, Italy',
      geometry: {
        coordinates: [9.2811, 45.6156],
        bounds: '45.6200,9.2900,45.6100,9.2700',
        area: '820 acres'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Flat parkland',
        climate: 'Subtropical',
        features: 'Historic banking, long straights'
      },
      infrastructure: {
        transport: 'Milan Malpensa Airport, A4 motorway',
        facilities: 'Historic grandstand, modern paddock, museum',
        amenities: 'Camping, restaurants, park access'
      },
      accessibility: {
        approach: 'PublicRoad',
        facilities: 'DisabledAccess',
        capacity: 'Massive'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Monza Circuit | AF Motorsport',
      description: 'Autodromo Nazionale di Monza - The Temple of Speed, Italian Grand Prix'
    },
    generateSlug: false,
    slug: 'autodromo-nazionale-di-monza',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  },
  {
    name: 'Circuit de la Sarthe',
    label: 'Home of the 24 Hours of Le Mans',
    type: categoriesIds[52],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Le Mans',
      description: 'Legendary endurance racing circuit combining permanent track and public roads.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: 'Circuit des 24 Heures, 72100 Le Mans, France',
      geometry: {
        coordinates: [0.2244, 47.9561],
        bounds: '47.9700,0.2400,47.9400,0.2100',
        area: '1,200 acres'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Rolling countryside',
        climate: 'Oceanic',
        features: 'Mulsanne Straight, Porsche Curves'
      },
      infrastructure: {
        transport: 'Paris-Orly Airport, A11 motorway',
        facilities: 'Dunlop Bridge, pit complex, museum',
        amenities: 'Camping villages, food courts, fan parks'
      },
      accessibility: {
        approach: 'PublicRoad',
        facilities: 'DisabledAccess',
        capacity: 'Massive'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Circuit de la Sarthe | AF Motorsport',
      description: 'Le Mans 24 Hours circuit - The ultimate endurance racing challenge'
    },
    generateSlug: false,
    slug: 'circuit-de-la-sarthe-le-mans',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  },
  {
    name: 'Daytona International Speedway',
    label: 'The World Center of Racing',
    type: categoriesIds[215],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Daytona',
      description: 'Iconic tri-oval superspeedway hosting the Daytona 500.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: '1801 W International Speedway Blvd, Daytona Beach, FL 32114, USA',
      geometry: {
        coordinates: [-81.0711, 29.1864],
        bounds: '29.1900,-81.0600,29.1800,-81.0800',
        area: '2,000 acres'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Coastal flatland',
        climate: 'Subtropical',
        features: '31-degree banking, tri-oval design'
      },
      infrastructure: {
        transport: 'Daytona Beach Airport, I-95',
        facilities: 'INFIELD Road Course, garages, media center',
        amenities: 'Camping, restaurants, motorsports hall of fame'
      },
      accessibility: {
        approach: 'PublicRoad',
        facilities: 'DisabledAccess',
        capacity: 'Massive'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Daytona International Speedway | AF Motorsport',
      description: 'Daytona - The World Center of Racing, home of the Daytona 500'
    },
    generateSlug: false,
    slug: 'daytona-international-speedway',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  },
  {
    name: 'Indianapolis Motor Speedway',
    label: 'The Greatest Spectacle in Racing',
    type: categoriesIds[232],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'The Brickyard',
      description: 'Historic oval and road course venue for Indy 500 and F1.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: '4790 W 16th St, Indianapolis, IN 46222, USA',
      geometry: {
        coordinates: [-86.2347, 39.7950],
        bounds: '39.8000,-86.2200,39.7900,-86.2400',
        area: '560 acres'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Flat plains',
        climate: 'Continental',
        features: 'Historic yard of bricks, 2.5-mile oval'
      },
      infrastructure: {
        transport: 'Indianapolis International Airport, I-465',
        facilities: 'Pagoda control tower, museum, road course',
        amenities: 'Snake Pit, food vendors, camping'
      },
      accessibility: {
        approach: 'PublicRoad',
        facilities: 'DisabledAccess',
        capacity: 'Massive'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Indianapolis Motor Speedway | AF Motorsport',
      description: 'IMS - The Greatest Spectacle in Racing, home of the Indy 500'
    },
    generateSlug: false,
    slug: 'indianapolis-motor-speedway',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  },
  {
    name: 'Mount Panorama Circuit',
    label: 'Bathurst - The Mountain',
    type: categoriesIds[107],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Mount Panorama',
      description: 'Challenging public road circuit hosting the Bathurst 1000.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: 'Panorama Ave, Bathurst NSW 2795, Australia',
      geometry: {
        coordinates: [149.5731, -33.3094],
        bounds: '-33.3200,149.5800,-33.3000,149.5600',
        area: '650 acres'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Mountainous, escarpment',
        climate: 'Oceanic',
        features: '174m elevation change, The Dipper, Skyline'
      },
      infrastructure: {
        transport: 'Sydney Airport, Great Western Highway',
        facilities: 'Pit lane, grandstands, media facilities',
        amenities: 'Camping, food vendors, fan zones'
      },
      accessibility: {
        approach: 'PublicRoad',
        facilities: 'DisabledAccess',
        capacity: 'Large'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Mount Panorama Bathurst | AF Motorsport',
      description: 'Mount Panorama Circuit - Bathurst 1000 venue, Australia\'s most challenging track'
    },
    generateSlug: false,
    slug: 'mount-panorama-circuit-bathurst',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  },
  {
    name: 'Yas Marina Circuit',
    label: 'Desert Twilight Racing',
    type: categoriesIds[126],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Yas Marina',
      description: 'Modern twilight circuit on Yas Island featuring marina views.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: 'Yas Island, Abu Dhabi, United Arab Emirates',
      geometry: {
        coordinates: [54.6031, 24.4672],
        bounds: '24.4800,54.6100,24.4600,54.5900',
        area: '1,100 acres'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Coastal Desert',
        climate: 'Desert',
        features: 'Twilight racing, hotel integrated into pit building'
      },
      infrastructure: {
        transport: 'Abu Dhabi International Airport, E10 highway',
        facilities: 'Yas Hotel, Viceroy, paddock complex',
        amenities: 'Theme park, marina, luxury hospitality'
      },
      accessibility: {
        approach: 'PublicRoad',
        facilities: 'VIPEntry',
        capacity: 'Large'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Yas Marina Circuit | AF Motorsport',
      description: 'Yas Marina Abu Dhabi - Season finale venue with iconic twilight racing'
    },
    generateSlug: false,
    slug: 'yas-marina-circuit',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: true
    }
  },
  {
    name: 'Brackley Mercedes-AMG Petronas Factory',
    label: 'Silver Arrow Headquarters',
    type: categoriesIds[41],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Mercedes F1 HQ',
      description: 'State-of-the-art Formula 1 team headquarters and design center.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: 'Brackley, Northamptonshire, NN13 7BD, United Kingdom',
      geometry: {
        coordinates: [-1.1500, 52.0333],
        bounds: '52.0400,-1.1400,52.0300,-1.1600',
        area: '120,000 sqm'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Flat Midlands',
        climate: 'Temperate',
        features: 'Motorsport Valley location'
      },
      infrastructure: {
        transport: 'M1 motorway, Birmingham Airport',
        facilities: 'Wind tunnel, simulator, manufacturing',
        amenities: 'Staff facilities, visitor center'
      },
      accessibility: {
        approach: 'PrivateRoad',
        facilities: 'VIPEntry',
        capacity: 'Medium'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Mercedes F1 Factory Brackley | AF Motorsport',
      description: 'Mercedes-AMG Petronas F1 Team headquarters in Brackley, UK'
    },
    generateSlug: false,
    slug: 'mercedes-amg-petronas-factory-brackley',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: false
    }
  },
  {
    name: 'Red Bull Racing Factory Milton Keynes',
    label: 'Energy Drink Powerhouse',
    type: categoriesIds[9],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Red Bull Technology Campus',
      description: 'Advanced F1 facility housing design, manufacturing and operations.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: 'Bradwell Common, Milton Keynes, MK13 8DP, United Kingdom',
      geometry: {
        coordinates: [-0.7333, 52.0167],
        bounds: '52.0200,-0.7200,52.0100,-0.7400',
        area: '95,000 sqm'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Urban development',
        climate: 'Temperate',
        features: 'Motorsport Valley hub'
      },
      infrastructure: {
        transport: 'M1 motorway, London Luton Airport',
        facilities: 'Wind tunnel, simulator, CNC machining',
        amenities: 'Staff restaurant, gym, visitor areas'
      },
      accessibility: {
        approach: 'PrivateRoad',
        facilities: 'VIPEntry',
        capacity: 'Medium'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Red Bull Racing Factory | AF Motorsport',
      description: 'Red Bull Technology campus in Milton Keynes - F1 championship headquarters'
    },
    generateSlug: false,
    slug: 'red-bull-racing-factory-milton-keynes',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: false
    }
  },
  {
    name: 'McLaren Technology Centre',
    label: 'Woking Innovation Hub',
    type: categoriesIds[105],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'McLaren Campus',
      description: 'Architectural landmark housing F1 operations and automotive development.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: 'Chertsey Rd, Woking, Surrey, GU21 4YH, United Kingdom',
      geometry: {
        coordinates: [-0.5464, 51.3589],
        bounds: '51.3650,-0.5400,51.3550,-0.5500',
        area: '70,000 sqm'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Surrey countryside',
        climate: 'Temperate',
        features: 'Lake-integrated design, Foster + Partners architecture'
      },
      infrastructure: {
        transport: 'Heathrow Airport, M25 motorway',
        facilities: 'Simulator, wind tunnel, manufacturing',
        amenities: 'Visitor experience, McLaren Automotive'
      },
      accessibility: {
        approach: 'PrivateRoad',
        facilities: 'VIPEntry',
        capacity: 'Small'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'McLaren Technology Centre | AF Motorsport',
      description: 'McLaren Technology Centre Woking - Architectural icon of motorsport innovation'
    },
    generateSlug: false,
    slug: 'mclaren-technology-centre-woking',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: false
    }
  },
  {
    name: 'Porsche Motorsport Weissach',
    label: 'Stuttgart Performance Laboratory',
    type: categoriesIds[118],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Weissach Development Center',
      description: 'Premier motorsport R&D facility for Porsche racing programs.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: 'Weissach, 71287 Weissach, Germany',
      geometry: {
        coordinates: [9.0167, 48.7667],
        bounds: '48.7700,9.0200,48.7600,9.0100',
        area: '300,000 sqm'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Black Forest foothills',
        climate: 'Continental',
        features: 'Integrated test track, dynamic area'
      },
      infrastructure: {
        transport: 'Stuttgart Airport, A8 motorway',
        facilities: 'Test track, wind tunnel, simulator complex',
        amenities: 'Employee facilities, museum access'
      },
      accessibility: {
        approach: 'PrivateRoad',
        facilities: 'ServiceEntry',
        capacity: 'Medium'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Porsche Motorsport Weissach | AF Motorsport',
      description: 'Porsche Development Centre Weissach - Premier motorsport R&D facility'
    },
    generateSlug: false,
    slug: 'porsche-motorsport-weissach',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: false
    }
  },
  {
    name: 'Petersen Automotive Museum',
    label: 'Los Angeles Motorsport Heritage',
    type: categoriesIds[27],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Petersen Museum',
      description: 'World-class automotive museum featuring motorsport history and exhibitions.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: '6060 Wilshire Blvd, Los Angeles, CA 90036, USA',
      geometry: {
        coordinates: [-118.3611, 34.0622],
        bounds: '34.0650,-118.3550,34.0600,-118.3650',
        area: '30,000 sqm'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Urban Miracle Mile',
        climate: 'Mediterranean',
        features: 'Stainless steel ribbon architecture'
      },
      infrastructure: {
        transport: 'LAX Airport, Metro Purple Line',
        facilities: 'Exhibition halls, vault tours, event spaces',
        amenities: 'Cafe, gift shop, educational programs'
      },
      accessibility: {
        approach: 'PublicRoad',
        facilities: 'DisabledAccess',
        capacity: 'Medium'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Petersen Automotive Museum | AF Motorsport',
      description: 'Petersen Museum Los Angeles - Celebrating automotive and motorsport heritage'
    },
    generateSlug: false,
    slug: 'petersen-automotive-museum',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: false
    }
  },
  {
    name: 'Millbrook Proving Ground',
    label: 'UK Vehicle Testing Excellence',
    type: categoriesIds[166],
    toggle: 'advanced',
    basics: {
      enable: true,
      title: 'Millbrook',
      description: 'Comprehensive vehicle testing facility with diverse track configurations.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      address: 'Proving Ground, Millbrook, Bedfordshire, MK45 2JQ, United Kingdom',
      geometry: {
        coordinates: [-0.5167, 52.0333],
        bounds: '52.0400,-0.5100,52.0300,-0.5200',
        area: '700 acres'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      geography: {
        terrain: 'Rolling countryside',
        climate: 'Temperate',
        features: 'High-speed bowl, hill route, dynamic area'
      },
      infrastructure: {
        transport: 'M1 motorway, Bedford railway station',
        facilities: 'Test tracks, climatic chambers, offices',
        amenities: 'Conference facilities, catering, accommodation'
      },
      accessibility: {
        approach: 'PrivateRoad',
        facilities: 'ServiceEntry',
        capacity: 'Medium'
      },
      visibility: { show: true }
    },
    contexts: {
      enable: false,
      visibility: { show: false }
    },
    seo: {
      title: 'Millbrook Proving Ground | AF Motorsport',
      description: 'Millbrook Proving Ground - Premier UK vehicle testing and development facility'
    },
    generateSlug: false,
    slug: 'millbrook-proving-ground',
    visibility: {
      check_publish: true,
      check_featured: true,
      check_pinned: false
    }
  }
] as const;
