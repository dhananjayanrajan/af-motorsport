### CARS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - identifiers `group` [chassis `text` flags: [index, unique], model `text` flags: [required, localized], version `text` flags: [advanced], code `text` flags: [index]]
  - type `relationship: categories` (hasOne) flags: [required] [Formula, Prototype, GT, Rally, Electric, Hybrid, Historic, Concept, Showcar, SafetyCar, PaceCar, Support, RoadCar, Retrofit]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - classifications `relationship: classifications` (hasMany) flags: [hasMany, advanced]

- TRAITS
  - status `select` flags: [required] [Active, Retired, Development, Museum, Prototype, Concept]
  - features `relationship: features` (hasMany) flags: [hasMany, advanced]
  - specifications `relationship: specifications` (hasMany) flags: [hasMany, advanced]

- ASSETS
  - primary `relationship: media` (hasOne) flags: [advanced]
  - cover `relationship: media` (hasOne) flags: [advanced]
  - gallery `relationship: galleries` (hasOne) flags: [advanced]
  - playlist `relationship: playlists` (hasOne) flags: [advanced]
  - visualization `relationship: visualizations` (hasOne) flags: [advanced]
  - documents `relationship: archives` (hasMany) flags: [hasMany, advanced]

- CONTEXTS
  - manufacturers `relationship: organizations` (hasMany) flags: [hasMany, advanced]
  - drivers `relationship: drivers` (hasMany) flags: [hasMany, advanced]
  - crew `relationship: members` (hasMany) flags: [hasMany, advanced]
  - associations `relationships: [organizations, individuals, leaders]` (hasMany) flags: [hasMany, advanced]
  - histories `relationship: histories` (hasOne) flags: [advanced]

