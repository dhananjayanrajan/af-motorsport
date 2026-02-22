### MEETUPS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Gathering, Networking, Conference, Convention, Summit, Forum, Workshop, Clinic, Reception, Mixer, TownHall, FanMeet, AutographSession, PressConference]

- BASICS
  - description `textarea` flags: [localized]
  - date `date` flags: [required]
  - location `relationship: locations` (hasOne) flags: [required]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]
  - features `relationship: features` (hasMany) flags: [hasMany, advanced]

- TRAITS
  - specifications `relationship: specifications` (hasMany) flags: [hasMany, advanced]
  - format `select` flags: [required] [InPerson, Virtual, Hybrid]
  - access `select` flags: [required] [Public, InviteOnly, Private, Exclusive]

- ASSETS
  - primary `relationship: media` (hasOne) flags: [advanced]
  - gallery `relationship: galleries` (hasOne) flags: [advanced]
  - playlist `relationship: playlists` (hasOne) flags: [advanced]
  - materials `relationship: archives` (hasMany) flags: [hasMany, advanced]

- CONTEXTS
  - hosts `relationships: [organizations, leaders, individuals]` (hasMany) flags: [hasMany, advanced]
  - attendees `relationships: [drivers, members, leaders, individuals, organizations]` (hasMany) flags: [hasMany, advanced]
  - schedules `relationship: schedules` (hasMany) flags: [hasMany, advanced]
  - references `relationships: [initiatives, celebrations]` (hasMany) flags: [hasMany, advanced]
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]

