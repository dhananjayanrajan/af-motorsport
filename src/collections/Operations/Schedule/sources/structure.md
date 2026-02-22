### SCHEDULES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Competition, Testing, Maintenance, Travel, Media, Personal, Briefing, Debrief]

- BASICS
  - agenda `textarea` flags: [localized]
  - scope `group` flags: [advanced] [significance `select` flags: [advanced] [Minor, Moderate, Major, Critical], scale `select` flags: [advanced] [Individual, Team, Department, Organization], depth `select` flags: [advanced] [Overview, Detailed, Comprehensive]]

- DETAILS
  - chronology `group` [date `date` flags: [required], type `select` flags: [advanced] [Single, Recurring, MultiDay]]
  - slots `array` (hasMany) flags: [hasMany, advanced] [activity `text` flags: [required], start `date` flags: [required], end `date` flags: [required], duration `text` flags: [], location `text` flags: []]

- TRAITS
  - constraints `array` (hasMany) flags: [hasMany, advanced] [constraint `text` flags: [advanced], type `select` flags: [advanced] [Time, Resource, Weather, Regulation], impact `select` flags: [advanced] [Low, Medium, High, Blocking]]

- CONTEXTS
  - occurrences `relationships: [trainings, meetups, initiatives, celebrations]` (hasMany) flags: [hasMany, advanced]
  - entities `relationships: [leaders, drivers, members, individuals, organizations]` (hasMany) flags: [hasMany, advanced]

