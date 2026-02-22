### STRATEGIES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Competitive, Technical, Development, Marketing, Financial, LongTerm, Race, Qualifying, Testing]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - methodology `textarea` flags: [localized, advanced]
  - decisions `relationship: decisions` (hasMany) flags: [hasMany, advanced]
  - impacts `relationship: impacts` (hasMany) flags: [hasMany, advanced]

- TRAITS
  - directives `array` (hasMany) flags: [hasMany, advanced] [phase `text` flags: [], action `text` flags: [], owner `text` flags: [], deadline `date` flags: []]
  - contingencies `array` (hasMany) flags: [hasMany, advanced] [trigger `text` flags: [advanced], response `text` flags: [advanced], probability `select` flags: [advanced] [Low, Medium, High, Certain], impact `select` flags: [advanced] [Minor, Moderate, Major, Critical]]

- CONTEXTS
  - narrative `relationship: narratives` (hasOne) flags: [advanced]
  - entities `relationships: [drivers, members, leaders, organizations, kits]` (hasMany) flags: [hasMany, advanced]

## Resources

