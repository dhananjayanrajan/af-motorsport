### IMPACTS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Technical, Sporting, Financial, Cultural, Regulatory, Safety, Structural, Environmental]

- BASICS
  - description `textarea` flags: [localized]
  - scope `group` flags: [advanced] [significance `text` flags: [advanced], scale `select` flags: [advanced] [Local, Regional, National, Global], depth `select` flags: [advanced] [Surface, Moderate, Deep, Fundamental]]

- TRAITS
  - tone `relationship: tones` (hasOne) flags: [advanced]
  - velocity `select` flags: [advanced] [Immediate, Rapid, Gradual, Delayed]
  - gravity `select` flags: [advanced] [Catastrophic, Severe, Moderate, Minor, Negligible]
  - permanence `select` flags: [advanced] [Permanent, LongTerm, Temporary, Reversible]

- CONTEXTS
  - entities `relationships: [organizations, individuals, drivers, leaders, members, cars, kits]` (hasMany) flags: [hasMany, advanced]
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]

