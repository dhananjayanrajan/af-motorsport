### INITIATIVES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Movement, Campaign, Fundraiser, Program, Action, Advocacy, Research, Expedition, Sustainability, Diversity, Innovation, Community, Safety, Environmental]

- BASICS
  - description `textarea` flags: [localized]
  - mission `textarea` flags: [required, localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]
  - strategies `relationship: strategies` (hasMany) flags: [hasMany, advanced]
  - expectations `relationship: expectations` (hasMany) flags: [hasMany, advanced]
  - insights `relationship: notes` (hasMany) flags: [hasMany, advanced]

- TRAITS
  - status `select` flags: [required] [Proposed, Active, Paused, Completed, Archived]

- ASSETS
  - primary `relationship: media` (hasOne) flags: [advanced]
  - gallery `relationship: galleries` (hasOne) flags: [advanced]
  - document `relationship: archives` (hasMany) flags: [hasMany, advanced]

- CONTEXTS
  - classifications `relationship: classifications` (hasOne) flags: [advanced]
  - entities `relationships: [organizations, leaders, individuals]` (hasMany) flags: [hasMany, advanced]
  - schedules `relationship: schedules` (hasMany) flags: [hasMany, advanced]
  - references `relationships: [incidents, celebrations]` (hasMany) flags: [hasMany, advanced]
  - histories `relationship: histories` (hasMany) flags: [hasMany, advanced]

