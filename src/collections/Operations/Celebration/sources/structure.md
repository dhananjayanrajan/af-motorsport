### CELEBRATIONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Victory, Anniversary, Retirement, Launch, Award, Milestone, Achievement, Homecoming, Tribute, Induction]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]
  - expectations `relationship: expectations` (hasMany) flags: [hasMany, advanced]
  - stories `relationship: stories` (hasMany) flags: [hasMany, advanced]

- TRAITS
  - prestige `select` flags: [advanced] [Intimate, Notable, Prestigious, Iconic]
  - exclusivity `select` flags: [advanced] [Public, InviteOnly, Private, TeamOnly]

- ASSETS
  - primary `relationship: media` (hasOne) flags: [advanced]
  - gallery `relationship: galleries` (hasOne) flags: [advanced]
  - playlist `relationship: playlists` (hasOne) flags: [advanced]

- CONTEXTS
  - beneficiaries `relationships: [drivers, members, leaders, organizations, individuals]` (hasMany) flags: [hasMany, advanced]
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]

