### GALLERIES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Competition, Portrait, Action, BehindTheScenes, Historical, Promotional]

- DETAILS
  - images `relationship: media` (hasMany) flags: [hasMany, required]
  - narrative `relationship: narratives` (hasOne) flags: [advanced]

