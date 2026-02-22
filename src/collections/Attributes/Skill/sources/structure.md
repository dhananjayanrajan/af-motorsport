### SKILLS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Technical, Engineering, Strategy, Leadership, Communication, Mechanical, Analytical, Creative, Physical, Mental, Administrative, Safety, Medical, Logistics, Digital, Driving]

- BASICS
  - description `textarea` flags: [localized]
  - scope `group` flags: [advanced] [significance `text` flags: [advanced], scale `select` flags: [advanced] [Narrow, Moderate, Broad, Comprehensive], depth `select` flags: [advanced] [Basic, Intermediate, Advanced, Expert], rarity `select` flags: [advanced] [Common, Uncommon, Rare, Unique]]

- DETAILS
  - definition `textarea` flags: [localized, advanced]
  - methods `array` (hasMany) flags: [hasMany, advanced] [method `text` flags: [advanced], type `select` flags: [advanced] [Theoretical, Practical, Simulation, Field], description `textarea` flags: [advanced]]
  - features `relationship: features` (hasMany) flags: [hasMany, advanced]
  - specifications `relationship: specifications` (hasMany) flags: [hasMany, advanced]
  - dependencies `array` (hasMany) flags: [hasMany, advanced] [skill `relationship: skills` (hasOne) flags: [advanced], type `select` flags: [advanced] [Prerequisite, Corequisite, Recommended]]

- TRAITS
  - nature `group` flags: [advanced] [complexity `select` flags: [advanced] [Low, Medium, High, Extreme], visibility `select` flags: [advanced] [Obvious, Subtle, Concealed, Latent], impact `select` flags: [advanced] [Minor, Moderate, Major, Transformative]]

- CONTEXTS
  - classifications `relationship: classifications` (hasMany) flags: [hasMany, advanced]
  - trainings `relationship: trainings` (hasMany) flags: [hasMany, advanced]
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]

