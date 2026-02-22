### HISTORIES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alias `text` flags: [localized, advanced]
  - type `relationship: categories` (hasOne) flags: [required] [Founding, Evolution, Milestone, Archive, Legacy, Development]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]
  - stories `relationship: stories` (hasMany) flags: [hasMany, advanced]

- TRAITS
  - legacy `group` flags: [advanced] [impact `select` flags: [advanced] [Low, Medium, High, Monumental], memory `select` flags: [advanced] [Forgotten, Obscure, Celebrated, Legendary], legacy `text` flags: [advanced]]
  - evolution `group` flags: [advanced] [origin `text` flags: [advanced], development `text` flags: [advanced], lineage `text` flags: [advanced]]

- ASSETS
  - gallery `relationship: galleries` (hasOne) flags: [advanced]
  - playlist `relationship: playlists` (hasOne) flags: [advanced]

