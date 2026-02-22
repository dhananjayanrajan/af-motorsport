### NOTES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alias `text` flags: [localized, advanced]
  - type `relationship: categories` (hasOne) flags: [required] [Insights, Observations, Remarks, Analysis, Commentary, Critique, Evaluation, Interpretation, Perspective, Summary]

- DETAILS
  - description `text` flags: [localized]

- TRAITS
  - intentions `array` (hasMany) flags: [hasMany, advanced] [type `select` flags: [] [Inform, Persuade, Clarify, Critique, Praise], impact `select` flags: [] [Positive, Neutral, Negative], remark `text` flags: []]

- ASSETS
  - archive `relationship: archives` (hasOne) flags: [advanced]

