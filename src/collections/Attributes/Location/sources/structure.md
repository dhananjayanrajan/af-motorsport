### LOCATIONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - label `text` flags: [localized]
  - type `relationship: categories` (hasOne) flags: [required] [Circuit, Venue, Facility, Hotel, Factory, Area, Region, Landmark, Headquarters, Workshop, Showroom, Museum, Paddock, Garage, Hospitality, Office, Warehouse, TestFacility, MediaCenter, Other]

- BASICS
  - title `text` flags: [localized]
  - description `text` flags: [localized]

- DETAILS
  - address `textarea` flags: [localized]
  - geometry `group` flags: [advanced] [coordinates `point` flags: [], bounds `text` flags: [advanced], area `text` flags: [advanced]]

- TRAITS
  - geography `group` flags: [advanced] [terrain `text` flags: [advanced], climate `select` flags: [advanced] [Temperate, Tropical, Arid, Continental, Polar], features `text` flags: [advanced]]
  - infrastructure `group` flags: [advanced] [transport `text` flags: [advanced], facilities `text` flags: [advanced], amenities `text` flags: [advanced]]
  - accessibility `group` flags: [advanced] [approach `select` flags: [advanced] [PublicRoad, PrivateRoad, Air, Sea, Rail], facilities `select` flags: [advanced] [DisabledAccess, VIPEntry, ServiceEntry], capacity `select` flags: [advanced] [Small, Medium, Large, Massive]]

- CONTEXTS
  - entities `relationships: [organizations, individuals, leaders, drivers, members]` (hasMany) flags: [hasMany, advanced]

