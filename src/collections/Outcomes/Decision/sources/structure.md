### DECISIONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Strategic, Tactical, Operational, Technical, Personnel, Financial, Emergency, Regulatory]

- BASICS
  - description `text` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]

- TRAITS
  - features `relationship: features` (hasMany) flags: [hasMany, advanced]
  - specifications `relationship: specifications` (hasMany) flags: [hasMany, advanced]
  - expectations `relationship: expectations` (hasMany) flags: [hasMany, advanced]

- CONTEXTS
  - protocols `relationship: protocols` (hasMany) flags: [hasMany, advanced]
  - preferences `relationship: preferences` (hasMany) flags: [hasMany, advanced]
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]

