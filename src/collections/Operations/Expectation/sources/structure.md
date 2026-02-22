### EXPECTATIONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Performance, Behavioral, Professional, Contractual, Strategic, Cultural, Service, Reliability]

- BASICS
  - statement `textarea` flags: [required, localized]

- DETAILS
  - criteria `textarea` flags: [localized, advanced]

- TRAITS
  - direction `select` flags: [advanced] [Required, Anticipated, Committed]
  - priority `select` flags: [advanced] [Critical, High, Medium, Low]
  - flexibility `select` flags: [advanced] [Strict, Negotiable, Guideline]

- CONTEXTS
  - specifications `relationship: specifications` (hasMany) flags: [hasMany, advanced]
  - protocols `relationship: protocols` (hasMany) flags: [hasMany, advanced]
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]

