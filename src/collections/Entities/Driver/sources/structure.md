### DRIVERS
- ESSENTIALS
  - names `group` [first `text` flags: [required, localized, index], middle `text` flags: [localized, advanced], last `text` flags: [required, localized, index]]
  - alias `text` flags: [localized, advanced]
  - type `relationship: categories` (hasOne) flags: [required] [Professional, Rookie, Veteran, Reserve, TestDriver, Champion, Legend, GuestDriver]

- BASICS
  - description `textarea` flags: [localized]
  - identifier `group` [number `text` flags: [index], nickname `text` flags: [localized, advanced], competition `text` flags: [advanced], callsign `text` flags: [advanced]]
  - identity `group` flags: [advanced] [gender `select` flags: [] [Male, Female, NonBinary, Undisclosed], pronouns `text` flags: [], age `text` flags: [], nationality `text` flags: [index]]
  - chronology `group` flags: [advanced] [birth `date` flags: [], debut `date` flags: [], retirement `date` flags: [advanced]]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [advanced]
  - biography `relationship: histories` (hasOne) flags: [advanced]
  - journeys `relationship: journeys` (hasMany) flags: [hasMany, advanced]

- TRAITS
  - channels `relationship: channels` (hasMany) flags: [hasMany, advanced]
  - experiences `relationship: experiences` (hasMany) flags: [hasMany, advanced]
  - skills `relationship: skills` (hasMany) flags: [hasMany, advanced]
  - trainings `relationship: trainings` (hasMany) flags: [hasMany, advanced]

- METRICS
  - results `relationship: results` (hasMany) flags: [hasMany, advanced]
  - points `relationship: points` (hasMany) flags: [hasMany, advanced]
  - awards `relationship: awards` (hasMany) flags: [hasMany, advanced]

- ASSETS
  - thumbnail `relationship: media` (hasOne) flags: [advanced]
  - cover `relationship: media` (hasOne) flags: [advanced]
  - helmet `relationship: media` (hasOne) flags: [advanced]
  - suit `relationship: media` (hasOne) flags: [advanced]
  - gallery `relationship: galleries` (hasMany) flags: [hasMany, advanced]

- CONTEXTS
  - teammates `relationship: drivers` (hasMany) flags: [hasMany, advanced]
  - crew `relationships: [members, leaders]` (hasMany) flags: [hasMany, advanced]
  - cars `relationship: cars` (hasMany) flags: [hasMany, advanced]
  - kits `relationship: kits` (hasMany) flags: [hasMany, advanced]

