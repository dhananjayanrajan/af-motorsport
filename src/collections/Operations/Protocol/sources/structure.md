### PROTOCOLS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - identifier `group` [code `text` flags: [index, unique], version `text` flags: [advanced], revision `text` flags: [advanced]]
  - type `relationship: categories` (hasOne) flags: [required] [Technical, Operational, Safety, Communication, Quality, Compliance]

- BASICS
  - description `textarea` flags: [localized]
  - objective `textarea` flags: [required, localized]

- DETAILS
  - procedure `textarea` flags: [required, localized]
  - steps `array` (hasMany) flags: [hasMany, advanced] [step `text` flags: [required], instruction `text` flags: [required], requirement `text` flags: []]

- ASSETS
  - documentation `relationship: archives` (hasMany) flags: [hasMany, advanced]

- CONTEXTS
  - classifications `relationship: classifications` (hasMany) flags: [hasMany, advanced]

