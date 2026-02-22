### KITS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Race, Practice, Casual, Formal, SpecialEdition, Heritage, Team, Technical, Safety, Promotion, Commemorative, Partnership]

- BASICS
  - description `textarea` flags: [localized]
  - purpose `group` [application `select` flags: [] [Track, Street, Show, Promotion], context `text` flags: [advanced], conditions `text` flags: [advanced]]

- DETAILS
  - design `group` flags: [advanced] [concept `text` flags: [localized], inspiration `text` flags: [localized], designer `text` flags: [], year `date` flags: []]
  - functionality `group` flags: [advanced] [performance `select` flags: [] [Standard, Enhanced, Maximum], durability `select` flags: [] [Low, Medium, High, Extreme], comfort `select` flags: [] [Basic, Comfortable, Premium]]

- TRAITS
  - composition `group` flags: [advanced] [construction `select` flags: [advanced] [CutAndSew, Knitted, 3DPrinted, Molded], assembly `select` flags: [advanced] [Glued, Stitched, Welded, Bonded], finish `select` flags: [advanced] [Matte, Glossy, Textured, Coated]]
  - materials `array` (hasMany) flags: [hasMany, advanced] [type `select` flags: [advanced] [Cotton, Polyester, Nomex, Carbon, Leather, Synthetic], specification `text` flags: [advanced], origin `text` flags: [advanced]]
  - appearance `group` flags: [advanced] [colors `text` flags: [], branding `select` flags: [] [Minimal, Prominent, Full, Heritage], style `select` flags: [] [Classic, Modern, Futuristic, Retro]]

- ASSETS
  - thumbnail `relationship: media` (hasOne) flags: [advanced]
  - cover `relationship: media` (hasOne) flags: [advanced]
  - gallery `relationship: galleries` (hasOne) flags: [advanced]
  - visualizations `relationship: visualizations` (hasMany) flags: [hasMany, advanced]

- CONTEXTS
  - entities `relationships: [drivers, members, leaders]` (hasMany) flags: [hasMany, advanced]
  - associations `relationships: [individuals, organizations]` (hasMany) flags: [hasMany, advanced]
  - notes `relationship: notes` (hasMany) flags: [hasMany, advanced]

