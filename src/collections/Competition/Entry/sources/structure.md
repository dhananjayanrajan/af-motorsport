### ENTRIES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Works, Privateer, Wildcard, Guest, Factory, Customer, Independent, Development, Test, Historic, OneOff, Invitational, Trophy, ProAm, Rookie]

- BASICS
  - description `textarea` flags: [localized]
  - identifiers `group` [number `text` flags: [required, index], plate `text` flags: [advanced]]
  - status `select` flags: [required] [Entered, Confirmed, Withdrawn, Disqualified, DidNotStart, DidNotFinish, Classified, NotClassified, Provisional, Excluded]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [advanced]
  - session `relationship: sessions` (hasOne) flags: [required]
  - drivers `relationship: drivers` (hasMany) flags: [hasMany, required]
  - crew `relationship: members` (hasMany) flags: [hasMany, advanced]
  - car `relationship: cars` (hasOne) flags: [required]
  - classification `relationship: classifications` (hasOne) flags: [advanced]

- TRAITS
  - role `select` flags: [advanced] [Primary, Reserve, Test, Development, Rookie, Veteran, Guest]
  - eligibility `group` flags: [advanced] [license `text` flags: [], waiver `text` flags: [advanced], restriction `text` flags: []]
  - preferences `relationship: preferences` (hasMany) flags: [hasMany, advanced]
  - specifications `relationship: specifications` (hasMany) flags: [hasMany, advanced]

- METRICS
  - positions `group` [grid `number` flags: [], start `number` flags: [], finish `number` flags: [], laps `number` flags: []]
  - parameters `array` (hasMany) flags: [hasMany, advanced] [parameter `relationship: classifications` (hasOne) flags: [advanced], value `text` flags: [advanced], unit `text` flags: [advanced]]

- ASSETS
  - thumbnail `relationship: media` (hasOne) flags: [advanced]
  - livery `relationship: media` (hasOne) flags: [advanced]
  - gallery `relationship: galleries` (hasOne) flags: [advanced]
  - playlist `relationship: playlists` (hasOne) flags: [advanced]

- CONTEXTS
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]

