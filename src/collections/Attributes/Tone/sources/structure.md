### TONES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alias `text` flags: [localized, advanced]
  - type `relationship: categories` (hasOne) flags: [required] [Magnitude, Quality, Emotion, Character, Essence, Spirit, Mood, Nuance]

- BASICS
  - description `text` flags: [localized]

- TRAITS
  - scope `group` flags: [advanced] [significance `text` flags: [advanced], scale `select` flags: [advanced] [Local, Regional, National, Global], depth `select` flags: [advanced] [Surface, Moderate, Deep, Profound]]
  - qualities `array` (hasMany) flags: [hasMany, advanced] [quality `select` flags: [advanced] [Positive, Neutral, Negative, Mixed], intensity `select` flags: [advanced] [Low, Medium, High, Extreme], mood `select` flags: [advanced] [Optimistic, Somber, Energetic, Calm, Tense, Celebratory], scale `select` flags: [advanced] [Minute, Moderate, Grand, Epic]]

## Competition

