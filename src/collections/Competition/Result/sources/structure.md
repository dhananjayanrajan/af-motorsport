### RESULTS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Race, Qualifying, Practice, Sprint, Warmup, Heat, Final, Stage, Segment, Shootout]

- BASICS
  - description `textarea` flags: [localized]
  - status `select` flags: [required] [Official, Provisional, Corrected, Historic, Estimated, Certified, Void]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [advanced]
  - classification `relationship: classifications` (hasOne) flags: [advanced]
  - highlights `relationship: highlights` (hasMany) flags: [hasMany, advanced]
  - incidents `relationship: incidents` (hasMany) flags: [hasMany, advanced]

- TRAITS
  - position `group` [overall `number` flags: [required], class `number` flags: [advanced], order `number` flags: [advanced]]
  - achievement `group` flags: [advanced] [gap `text` flags: [], interval `text` flags: [], status `text` flags: []]

- METRICS
  - performance `group` flags: [advanced] [laps `number` flags: [], time `text` flags: [], speed `text` flags: [], distance `text` flags: []]
  - stoppages `array` (hasMany) flags: [hasMany, advanced] [reason `text` flags: [], duration `text` flags: [], lap `number` flags: []]

- ASSETS
  - visualization `relationship: visualizations` (hasOne) flags: [advanced]

- CONTEXTS
  - entry `relationship: entries` (hasOne) flags: [required]
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]

