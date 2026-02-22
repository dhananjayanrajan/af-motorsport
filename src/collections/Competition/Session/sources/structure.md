### SESSIONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alias `text` flags: [localized, advanced]
  - code `text` flags: [index, unique]
  - type `relationship: categories` (hasOne) flags: [required] [Practice, Qualifying, Race, Sprint, Warmup, Test]

- BASICS
  - description `text` flags: [localized]
  - status `select` flags: [required] [Scheduled, Confirmed, Completed, Cancelled, Postponed, Abandoned, Provisional]
  - access `select` flags: [required] [Public, Private, InviteOnly, MemberOnly, VIP]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [advanced]
  - event `relationship: events` (hasOne) flags: [required]
  - format `group` [segment `text` flags: [], duration `number` flags: [], interval `number` flags: [], specification `text` flags: [advanced]]
  - classifications `relationship: classifications` (hasMany) flags: [hasMany, advanced]
  - features `relationship: features` (hasMany) flags: [hasMany, advanced]
  - protocols `relationship: protocols` (hasMany) flags: [hasMany, advanced]
  - strategies `relationship: strategies` (hasMany) flags: [hasMany, advanced]

- TRAITS
  - constraints `array` (hasMany) flags: [hasMany, advanced] [type `relationship: classifications` (hasOne) flags: [advanced], limit `text` flags: [advanced], unit `text` flags: [advanced]]
  - parameters `array` (hasMany) flags: [hasMany, advanced] [parameter `relationship: classifications` (hasOne) flags: [advanced], value `text` flags: [advanced], unit `text` flags: [advanced]]
  - specifications `relationship: specifications` (hasMany) flags: [hasMany, advanced]

- METRICS
  - quantifiers `group` flags: [advanced] [laps `number` flags: [], distance `text` flags: [], duration `text` flags: []]

- ASSETS
  - gallery `relationship: galleries` (hasOne) flags: [advanced]
  - playlist `relationship: playlists` (hasOne) flags: [advanced]

- CONTEXTS
  - highlights `relationship: highlights` (hasMany) flags: [hasMany, advanced]
  - incidents `relationship: incidents` (hasMany) flags: [hasMany, advanced]
  - authorities `relationships: [organizations, individuals]` (hasMany) flags: [hasMany, advanced]
  - participants `relationships: drivers` (hasMany) flags: [hasMany, advanced]
  - crews `relationships: members` (hasMany) flags: [hasMany, advanced]
  - entities `relationships: [organizations, individuals]` (hasMany) flags: [hasMany, advanced]
  - insights `relationship: notes` (hasMany) flags: [hasMany, advanced]

## Content

