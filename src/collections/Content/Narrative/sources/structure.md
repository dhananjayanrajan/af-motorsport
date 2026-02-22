### NARRATIVES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alias `text` flags: [localized, advanced]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - content `richtext` flags: [required, localized]
  - scope `group` flags: [advanced] [significance `select` flags: [advanced] [Minor, Moderate, Major, Historic], scale `select` flags: [advanced] [Individual, Team, Organization, Sport], depth `select` flags: [advanced] [Surface, Detailed, Comprehensive, Exhaustive], level `text` flags: [advanced]]
  - context `group` flags: [advanced] [background `text` flags: [advanced], perspective `text` flags: [advanced], purpose `text` flags: [advanced]]
  - timeline `array` (hasMany) flags: [hasMany, advanced] [date `date` flags: [advanced], type `select` flags: [advanced] [Event, Milestone, Decision, Incident]]

- TRAITS
  - tone `relationship: tones` (hasOne) flags: [advanced]

- CONTEXTS
  - locations `relationship: locations` (hasMany) flags: [hasMany, advanced]
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]
  - entities `relationships: [organizations, individuals, leaders, drivers, members]` (hasMany) flags: [hasMany, advanced]

