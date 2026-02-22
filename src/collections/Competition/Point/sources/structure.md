### POINTS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Championship, Season, Event, Session, Bonus, Penalty, Withdrawal, Adjustment]

- BASICS
  - description `textarea` flags: [localized]
  - value `number` flags: [required]
  - scale `select` flags: [advanced] [Standard, Inverse, Logarithmic, Custom, Multiplier, Fixed]

- DETAILS
  - result `relationship: results` (hasOne) flags: [required]
  - classification `relationship: classifications` (hasOne) flags: [advanced]
  - specification `relationship: specifications` (hasOne) flags: [advanced]

- TRAITS
  - ranking `group` flags: [advanced] [before `number` flags: [], after `number` flags: [], delta `number` flags: []]
  - modifiers `array` (hasMany) flags: [hasMany, advanced] [condition `text` flags: [required], adjustment `number` flags: [required], impact `text` flags: []]

- CONTEXTS
  - authorities `relationship: organizations` (hasMany) flags: [hasMany, advanced]
  - entries `relationship: entries` (hasMany) flags: [hasMany, advanced]
  - drivers `relationship: drivers` (hasMany) flags: [hasMany, advanced]
  - insights `relationship: notes` (hasMany) flags: [hasMany, advanced]

