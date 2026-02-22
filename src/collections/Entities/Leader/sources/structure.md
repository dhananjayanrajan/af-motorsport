### LEADERS
- ESSENTIALS
  - names `group` [first `text` flags: [required, localized, index], middle `text` flags: [localized, advanced], last `text` flags: [required, localized, index]]
  - alias `text` flags: [localized, advanced]
  - type `relationship: categories` (hasOne) flags: [required] [Principal, Director, Manager, Strategist, Advisor, Owner, Founder, Executive, DepartmentHead, TeamLeader, TechnicalDirector, SportingDirector]

- BASICS
  - identifier `group` [designation `text` flags: [advanced], title `text` flags: [required, localized], code `text` flags: [advanced]]
  - description `textarea` flags: [localized]
  - identity `group` flags: [advanced] [gender `select` flags: [] [Male, Female, NonBinary, Undisclosed], pronouns `text` flags: [], age `text` flags: [], nationality `text` flags: [index]]
  - chronology `group` flags: [advanced] [birth `date` flags: [], debut `date` flags: [], retirement `date` flags: [advanced]]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [advanced]
  - biography `relationship: histories` (hasOne) flags: [advanced]
  - vision `relationship: principles` (hasMany) flags: [hasMany, advanced]
  - departments `relationship: classifications` (hasMany) flags: [hasMany, advanced]

- TRAITS
  - channels `relationship: channels` (hasMany) flags: [hasMany, advanced]
  - personalities `relationship: features` (hasMany) flags: [hasMany, advanced]
  - achievements `relationship: experiences` (hasMany) flags: [hasMany, advanced]
  - strategies `relationship: strategies` (hasMany) flags: [hasMany, advanced]

- METRICS
  - impacts `relationship: impacts` (hasMany) flags: [hasMany, advanced]
  - awards `relationship: awards` (hasMany) flags: [hasMany, advanced]

- ASSETS
  - avatar `relationship: media` (hasOne) flags: [advanced]
  - cover `relationship: media` (hasOne) flags: [advanced]
  - gallery `relationship: galleries` (hasOne) flags: [advanced]

- CONTEXTS
  - peers `relationships: [leaders, individuals]` (hasMany) flags: [hasMany, advanced]
  - crew `relationships: [drivers, members]` (hasMany) flags: [hasMany, advanced]
  - anecdotes `relationship: notes` (hasMany) flags: [hasMany, advanced]

