### TRAININGS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Driving, Fitness, Technical, Strategy, Simulator, Classroom, Workshop, Seminar, Onboarding, Certification, Refresher, Emergency, Media, Leadership, TeamBuilding]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]

- TRAITS
  - intensity `select` flags: [advanced] [Low, Medium, High, Extreme]
  - format `select` flags: [advanced] [Individual, Group, Lecture, HandsOn, Simulated, Remote]
  - specifications `relationship: specifications` (hasMany) flags: [hasMany, advanced]

- ASSETS
  - gallery `relationship: galleries` (hasOne) flags: [advanced]
  - playlist `relationship: playlists` (hasOne) flags: [advanced]

- CONTEXTS
  - entities `relationships: [drivers, members, leaders, individuals, organizations]` (hasMany) flags: [hasMany, advanced]
  - strategies `relationship: strategies` (hasMany) flags: [hasMany, advanced]
  - skills `relationship: skills` (hasMany) flags: [hasMany, advanced]
  - stories `relationship: stories` (hasMany) flags: [hasMany, advanced]
