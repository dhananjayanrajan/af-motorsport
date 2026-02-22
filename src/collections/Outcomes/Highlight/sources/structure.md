### HIGHLIGHTS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Performance, Maneuver, Strategy, Technical, Comeback, Record, Milestone, Overtake]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]

- TRAITS
  - specifications `relationship: specifications` (hasMany) flags: [hasMany, advanced]

- ASSETS
  - thumbnail `relationship: media` (hasOne) flags: [advanced]
  - gallery `relationship: galleries` (hasOne) flags: [advanced]
  - playlist `relationship: playlists` (hasOne) flags: [advanced]

- CONTEXTS
  - entities `relationships: [drivers, cars]` (hasMany) flags: [hasMany, advanced]
  - stories `relationship: stories` (hasMany) flags: [hasMany, advanced]

