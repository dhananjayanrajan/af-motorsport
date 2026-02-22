### EVENTS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [GrandPrix, Rally, Race, Test, Show, Festival, Launch, Preview, Gala, Auction, Convention, Summit, Exhibition, Qualifying, Shootout, TimeAttack, HillClimb, Sprint, Endurance, Charity]

- BASICS
  - description `textarea` flags: [localized]
  - identifiers `group` [code `text` flags: [index, unique], round `text` flags: [advanced]]
  - status `select` flags: [required] [Scheduled, Confirmed, Completed, Cancelled, Postponed, Abandoned, Provisional]
  - access `select` flags: [required] [Public, Private, InviteOnly, MemberOnly, VIP]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [advanced]
  - story `relationship: stories` (hasOne) flags: [advanced]
  - season `relationship: seasons` (hasOne) flags: [required]
  - location `relationship: locations` (hasOne) flags: [required]
  - classification `relationship: classifications` (hasMany) flags: [hasMany, advanced]
  - features `relationship: features` (hasMany) flags: [hasMany, advanced]
  - regulations `relationship: protocols` (hasMany) flags: [hasMany, advanced]

- TRAITS
  - chronology `group` [start `date` flags: [required], end `date` flags: [required], timezone `text` flags: [required]]
  - format `relationship: categories` (hasOne) flags: [required] [Weekend, OneDay, MultiDay, Evening, Night, DoubleHeader, TripleHeader]

- METRICS
  - specifications `relationship: specifications` (hasMany) flags: [hasMany, advanced]

- ASSETS
  - poster `relationship: media` (hasOne) flags: [advanced]
  - cover `relationship: media` (hasOne) flags: [advanced]
  - gallery `relationship: galleries` (hasOne) flags: [advanced]
  - playlist `relationship: playlists` (hasOne) flags: [advanced]
  - archive `relationship: archives` (hasMany) flags: [hasMany, advanced]

- CONTEXTS
  - highlights `relationship: highlights` (hasMany) flags: [hasMany, advanced]
  - insights `relationship: notes` (hasMany) flags: [hasMany, advanced]

