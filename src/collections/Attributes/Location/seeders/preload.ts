// FILE: src/collections/Attributes/Location/seeders/preload.ts
export const PRELOAD_LOCATION = [
  {
    name: 'Silverstone Circuit',
    label: 'Home of British Motor Racing',
    type: 1,
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
        coordinates: [52.0786, -1.0169],
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
    type: 1,
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
        coordinates: [44.5250, 10.8660],
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
    type: 1,
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
        coordinates: [50.3346, 6.9475],
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
  }
] as const
