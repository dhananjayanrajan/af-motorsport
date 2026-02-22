### ORGANIZATIONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alias `text` flags: [localized, advanced]
  - type `relationship: categories` (hasOne) flags: [required] [RacingTeam, Manufacturer, Sponsor, Supplier, Federation, MediaOutlet, Partner, Institution, Association, Academy, Promoter, CircuitOwner]

- BASICS
  - identifier `group` [code `text` flags: [index, unique], abbreviation `text` flags: [advanced], registration `text` flags: [advanced]]
  - description `textarea` flags: [localized]
  - tagline `text` flags: [localized, advanced]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [advanced]
  - background `textarea` flags: [localized, advanced]
  - parent `relationship: organizations` (hasOne) flags: [advanced]
  - evolution `group` flags: [advanced] [founded `date` flags: [], merged `date` flags: [advanced], rebranded `date` flags: [advanced], defunct `date` flags: [advanced]]

- TRAITS
  - channels `relationship: channels` (hasMany) flags: [hasMany, advanced]
  - reputation `group` flags: [advanced] [prestige `select` flags: [advanced] [Unknown, Emerging, Established, Prestigious, Iconic], reliability `select` flags: [advanced] [Unproven, Developing, Reliable, Exceptional], innovation `select` flags: [advanced] [Conservative, Adaptive, Innovative, Revolutionary]]
  - benefits `array` (hasMany) flags: [hasMany, advanced] [benefit `text` flags: [advanced], type `select` flags: [advanced] [Financial, Technical, Marketing, Operational], impact `select` flags: [advanced] [Minor, Moderate, Significant, Strategic]]

- ASSETS
  - logo `relationship: media` (hasOne) flags: [advanced]
  - gallery `relationship: galleries` (hasOne) flags: [advanced]

- CONTEXTS
  - headquarters `relationship: locations` (hasMany) flags: [hasMany, advanced]
  - history `relationship: histories` (hasOne) flags: [advanced]
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]

## Outcomes

