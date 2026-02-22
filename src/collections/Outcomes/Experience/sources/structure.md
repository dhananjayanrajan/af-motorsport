### EXPERIENCES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Employment, Project, Role, Achievement, Milestone, Internship, Volunteer, Contract, Freelance, Research, Competition, Development, Crisis, Transition, Expedition]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]

- TRAITS
  - skills `array` (hasMany) flags: [hasMany, advanced] [skill `relationship: skills` (hasOne) flags: [required], proficiency `select` flags: [] [Beginner, Intermediate, Advanced, Expert]]

- ASSETS
  - evidence `relationship: media` (hasMany) flags: [hasMany, advanced]
  - gallery `relationship: galleries` (hasOne) flags: [advanced]

- CONTEXTS
  - entities `relationships: [organizations, drivers, members, leaders, individuals]` (hasMany) flags: [hasMany, advanced]
  - highlights `relationship: highlights` (hasMany) flags: [hasMany, advanced]
  - incidents `relationship: incidents` (hasMany) flags: [hasMany, advanced]
  - journey `relationship: journeys` (hasOne) flags: [advanced]

