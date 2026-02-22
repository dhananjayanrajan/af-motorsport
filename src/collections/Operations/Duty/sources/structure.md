### DUTIES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Operational, Strategic, Administrative, Technical, Leadership, Compliance, Safety, Representative]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - obligation `group` [tasks `textarea` flags: [required, localized], reporting `text` flags: [advanced], authority `text` flags: [advanced]]

- CONTEXTS
  - protocols `relationship: protocols` (hasMany) flags: [hasMany, advanced]
  - expectations `relationship: expectations` (hasMany) flags: [hasMany, advanced]
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]

