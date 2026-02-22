### PREFERENCES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Visual, Auditory, Technical, Driving, Lifestyle, Communication, Ergonomic, Environmental]

- BASICS
  - description `text` flags: [localized]

- TRAITS
  - conditions `array` (hasMany) flags: [hasMany, advanced] [trigger `text` flags: [advanced], prerequisite `text` flags: [advanced]]
  - reasons `array` (hasMany) flags: [hasMany, advanced] [reason `text` flags: [advanced], importance `select` flags: [advanced] [Low, Medium, High, Critical]]

- CONTEXTS
  - principles `relationship: principles` (hasMany) flags: [hasMany, advanced]
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]

