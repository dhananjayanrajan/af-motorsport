### CAREERS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Driver, Engineer, Mechanic, Strategist, Manager, Leader, Principal, Founder, Executive, Specialist]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]
  - organization `relationship: organizations` (hasOne) flags: [required]
  - expectations `relationship: expectations` (hasMany) flags: [hasMany, advanced]
  - awards `relationship: awards` (hasMany) flags: [hasMany, advanced]

- TRAITS
  - positions `array` (hasMany) flags: [hasMany, advanced] [title `text` flags: [required], start `date` flags: [required], end `date` flags: []]
  - contract `select` flags: [advanced] [FullTime, PartTime, Reserve, Test, Loan, Guest]

- CONTEXTS
  - entities `relationships: [leaders, drivers, members, individuals, cars]` (hasMany) flags: [hasMany, advanced]
  - highlights `relationship: highlights` (hasMany) flags: [hasMany, advanced]
  - stories `relationship: stories` (hasMany) flags: [hasMany, advanced]

