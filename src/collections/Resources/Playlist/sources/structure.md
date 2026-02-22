### PLAYLISTS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Onboard, Interview, Highlights, Documentary, BehindTheScenes, Promotional]

- DETAILS
  - clips `relationship: media` (hasMany) flags: [hasMany, advanced]
  - videos `relationship: media` (hasMany) flags: [hasMany, advanced]
  - narrative `relationship: narratives` (hasOne) flags: [advanced]

- TRAITS
  - quality `select` flags: [advanced] [4K, HD, SD, Raw]
  - format `select` flags: [advanced] [Wide, Vertical, Square]

