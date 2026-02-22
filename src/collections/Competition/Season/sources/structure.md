### SEASONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - series `relationship: series` (hasOne) flags: [required]
  - type `relationship: categories` (hasOne) flags: [required] [Championship, Test, Development, Exhibition, Anniversary, Farewell]

- BASICS
  - description `textarea` flags: [localized]
  - identifiers `group` [code `text` flags: [index, unique], abbreviation `text` flags: [advanced]]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [advanced]
  - history `relationship: histories` (hasOne) flags: [advanced]
  - schedule `relationship: schedules` (hasOne) flags: [required]
  - classifications `relationship: classifications` (hasMany) flags: [hasMany, advanced]
  - regulations `relationship: protocols` (hasMany) flags: [hasMany, advanced]

- METRICS
  - counts `group` flags: [advanced] [entries `number` flags: [], events `number` flags: [], races `number` flags: []]

- ASSETS
  - cover `relationship: media` (hasOne) flags: [advanced]
  - gallery `relationship: galleries` (hasOne) flags: [advanced]
  - playlist `relationship: playlists` (hasOne) flags: [advanced]
  - archive `relationship: archives` (hasMany) flags: [hasMany, advanced]

- CONTEXTS
  - authorities `relationships: [organizations, individuals]` (hasMany) flags: [hasMany, advanced]
  - teams `relationship: organizations` (hasMany) flags: [hasMany, advanced]
  - participants `relationship: drivers` (hasMany) flags: [hasMany, advanced]
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]

