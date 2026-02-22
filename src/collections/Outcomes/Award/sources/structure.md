### AWARDS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Championship, RaceWin, Pole, FastestLap, ManOfTheMatch, DesignAward, InnovationPrize, SafetyAward, EnvironmentalAward, SpecialRecognition, HallOfFame, LifetimeAchievement, TeamOfTheYear, EmployeeOfTheYear, LongService, FanFavorite, MomentOfTheYear, OvertakeOfTheSeason, PhotographOfTheYear]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]

- ASSETS
  - thumbnail `relationship: media` (hasOne) flags: [advanced]
  - visualization `relationship: visualizations` (hasOne) flags: [advanced]

- CONTEXTS
  - entities `relationships: [leaders, organizations, individuals]` (hasOne) flags: [required]
  - story `relationship: stories` (hasOne) flags: [advanced]

