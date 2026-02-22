### JOURNEYS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Job, Project, Growth, Personal, Team, Transformation]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]
  - stories `relationship: stories` (hasMany) flags: [hasMany, advanced]

- TRAITS
  - lessons `array` (hasMany) flags: [hasMany, advanced] [lesson `text` flags: [required], significance `select` flags: [] [Minor, Notable, Significant, LifeChanging], application `text` flags: [], impact `select` flags: [] [Personal, Team, Organizational, Industry]]
  - decisions `relationship: decisions` (hasMany) flags: [hasMany, advanced]
  - impacts `relationship: impacts` (hasMany) flags: [hasMany, advanced]

- ASSETS
  - gallery `relationship: galleries` (hasOne) flags: [advanced]
  - playlist `relationship: playlists` (hasOne) flags: [advanced]

