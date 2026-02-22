### MEDIA
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alt `text` flags: [required, localized]

- DETAILS
  - file `upload` flags: [required]

- TRAITS
  - tone `relationship: tones` (hasOne) flags: [advanced]
  - sources `array` (hasMany) flags: [hasMany, advanced] [url `text` flags: [required], type `select` flags: [] [Original, Cropped, Edited, Compressed]]

- CONTEXTS
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]
  - entities `relationships: [organizations, individuals, leaders, drivers, members]` (hasMany) flags: [hasMany, advanced]

