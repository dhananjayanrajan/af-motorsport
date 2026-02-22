### MEMBERS
- ESSENTIALS
  - names `group` [first `text` flags: [required, localized, index], middle `text` flags: [localized, advanced], last `text` flags: [required, localized, index]]
  - alias `text` flags: [localized, advanced]
  - type `relationship: categories` (hasOne) flags: [required] [Engineer, Mechanic, PitCrew, Technician, Logistician, Analyst, Coordinator, Specialist, SupportStaff, Trainee, Electrician, Fabricator, DataEngineer, PerformanceEngineer, Strategist, Composites, Welder, Painter]

- BASICS
  - description `textarea` flags: [localized]
  - identifier `group` [number `text` flags: [index], nickname `text` flags: [localized, advanced], callsign `text` flags: [advanced], badge `text` flags: [advanced]]
  - identity `group` flags: [advanced] [gender `select` flags: [] [Male, Female, NonBinary, Undisclosed], pronouns `text` flags: [], age `text` flags: [], nationality `text` flags: [index]]
  - chronology `group` flags: [advanced] [birth `date` flags: [], debut `date` flags: [], retirement `date` flags: [advanced]]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [advanced]
  - background `textarea` flags: [localized, advanced]
  - departments `relationship: classifications` (hasMany) flags: [hasMany, advanced]

- TRAITS
  - channels `relationship: channels` (hasMany) flags: [hasMany, advanced]
  - personalities `relationship: features` (hasMany) flags: [hasMany, advanced]
  - duties `relationship: duties` (hasMany) flags: [hasMany, advanced]
  - skills `relationship: skills` (hasMany) flags: [hasMany, advanced]
  - trainings `relationship: trainings` (hasMany) flags: [hasMany, advanced]

- METRICS
  - impacts `relationship: impacts` (hasMany) flags: [hasMany, advanced]
  - awards `relationship: awards` (hasMany) flags: [hasMany, advanced]

- ASSETS
  - thumbnail `relationship: media` (hasOne) flags: [advanced]
  - cover `relationship: media` (hasOne) flags: [advanced]
  - gallery `relationship: galleries` (hasOne) flags: [advanced]
  - certifications `relationship: archives` (hasMany) flags: [hasMany, advanced]

- CONTEXTS
  - mentors `relationships: [leaders, members]` (hasMany) flags: [hasMany, advanced]
  - crew `relationships: drivers` (hasMany) flags: [hasMany, advanced]
  - cars `relationship: cars` (hasMany) flags: [hasMany, advanced]

