### STORIES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alias `text` flags: [localized, advanced]
  - type `relationship: categories` (hasOne) flags: [required] [Origin, Journey, Challenge, Victory, BehindTheScenes, Legacy]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]

- TRAITS
  - concerns `array` (hasMany) flags: [hasMany, advanced] [conflict `text` flags: [], stakes `text` flags: [], resolution `text` flags: []]
  - interactions `array` (hasMany) flags: [hasMany, advanced] [dynamics `select` flags: [] [Cooperative, Competitive, Adversarial, Mentorship], outcome `text` flags: []]

- ASSETS
  - gallery `relationship: galleries` (hasOne) flags: [advanced]
  - playlist `relationship: playlists` (hasOne) flags: [advanced]

- CONTEXTS
  - highlights `relationship: highlights` (hasMany) flags: [hasMany, advanced]
  - incidents `relationship: incidents` (hasMany) flags: [hasMany, advanced]

## Entities

