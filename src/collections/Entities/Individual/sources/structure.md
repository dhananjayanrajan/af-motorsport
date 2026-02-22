### INDIVIDUALS
- ESSENTIALS
  - names `group` [first `text` flags: [required, localized, index], middle `text` flags: [localized, advanced], last `text` flags: [required, localized, index]]
  - alias `text` flags: [localized, advanced]
  - type `relationship: categories` (hasOne) flags: [required] [Fan, Journalist, Influencer, Celebrity, Guest, Contact, Contributor, Collaborator, Observer, Enthusiast, VIP, Alumni]

- BASICS
  - identifier `group` [nickname `text` flags: [localized, advanced], code `text` flags: [advanced], number `text` flags: [advanced]]
  - identity `group` flags: [advanced] [gender `select` flags: [] [Male, Female, NonBinary, Undisclosed], pronouns `text` flags: [], age `text` flags: [], nationality `text` flags: [index]]
  - description `textarea` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [advanced]
  - background `textarea` flags: [localized, advanced]
  - interests `array` (hasMany) flags: [hasMany, advanced] [interest `text` flags: [required], level `select` flags: [] [Casual, Enthusiast, Expert, Professional], duration `text` flags: []]

- TRAITS
  - channels `relationship: channels` (hasMany) flags: [hasMany, advanced]
  - influence `group` flags: [advanced] [reach `select` flags: [advanced] [Local, Regional, National, Global], authority `select` flags: [advanced] [None, Low, Medium, High], network `select` flags: [advanced] [Small, Moderate, Extensive, Vast]]
  - benefits `array` (hasMany) flags: [hasMany, advanced] [benefit `text` flags: [advanced], type `select` flags: [advanced] [Access, Discount, Information, Collaboration], impact `select` flags: [advanced] [Minor, Moderate, Significant, Strategic]]

- ASSETS
  - avatar `relationship: media` (hasOne) flags: [advanced]
  - gallery `relationship: galleries` (hasOne) flags: [advanced]

- CONTEXTS
  - history `relationship: histories` (hasOne) flags: [advanced]
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]

