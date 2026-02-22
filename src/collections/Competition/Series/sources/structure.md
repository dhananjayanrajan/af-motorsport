### SERIES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alias `text` flags: [localized, advanced]
  - type `relationship: categories` (hasOne) flags: [required] [Championship, Trophy, Cup, Invitational, Support, Esports, Historic, Development, ProAm, Masters, Rookie, Endurance, Sprint, Winter, Summer]

- BASICS
  - description `textarea` flags: [localized]
  - identifiers `group` [code `text` flags: [index, unique], abbreviation `text` flags: [advanced]]
  - tagline `text` flags: [localized, advanced]
  - status `select` flags: [required] [Active, Inactive, Defunct, Upcoming, Rebranded, Merged, Sanctioned]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [advanced]
  - history `relationship: histories` (hasOne) flags: [advanced]
  - organization `relationship: organizations` (hasMany) flags: [hasMany, advanced]
  - classification `relationship: classifications` (hasMany) flags: [hasMany, advanced]
  - features `relationship: features` (hasMany) flags: [hasMany, advanced]

- TRAITS
  - heritage `group` flags: [advanced] [predecessor `relationship: series` (hasOne) flags: [], successor `relationship: series` (hasOne) flags: []]
  - specifications `relationship: specifications` (hasMany) flags: [hasMany, advanced]
  - schedule `relationship: schedules` (hasOne) flags: [required]

- METRICS
  - counts `group` flags: [advanced] [seasons `number` flags: [], events `number` flags: [], participants `number` flags: []]

- ASSETS
  - logo `relationship: media` (hasOne) flags: [advanced]
  - cover `relationship: media` (hasOne) flags: [advanced]
  - archive `relationship: archives` (hasMany) flags: [hasMany, advanced]

- CONTEXTS
  - locations `relationship: locations` (hasMany) flags: [hasMany, advanced]
  - authorities `relationships: [organizations, individuals]` (hasMany) flags: [hasMany, advanced]
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]

