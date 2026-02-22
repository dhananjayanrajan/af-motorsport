### INCIDENTS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Collision, Mechanical, Electronic, Operational, Medical, Weather, Regulatory, Security]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - decisions `relationship: decisions` (hasMany) flags: [hasMany, advanced]
  - specifications `relationship: specifications` (hasMany) flags: [hasMany, advanced]

- TRAITS
  - impacts `relationship: impacts` (hasMany) flags: [hasMany, advanced]

- ASSETS
  - gallery `relationship: galleries` (hasOne) flags: [advanced]
  - archive `relationship: archives` (hasOne) flags: [advanced]

- CONTEXTS
  - narrative `relationship: narratives` (hasOne) flags: [required]
  - entities `relationships: [drivers, members, leaders, organizations, kits]` (hasMany) flags: [hasMany, advanced]

