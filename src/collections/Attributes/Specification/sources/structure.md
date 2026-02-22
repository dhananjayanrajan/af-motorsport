### SPECIFICATIONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - identifier `group` [code `text` flags: [index, unique], version `text` flags: [advanced], revision `text` flags: [advanced]]
  - type `relationship: categories` (hasOne) flags: [required] [Powertrain, Chassis, Aerodynamics, Dimensions, Weight, Electronics, Suspension, Performance, Component, Fluid, Software, Material]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - definition `textarea` flags: [localized, advanced]
  - conditions `group` flags: [advanced] [environment `text` flags: [advanced], constraints `text` flags: [advanced], compliance `select` flags: [advanced] [Mandatory, Optional, Recommended, NotApplicable]]

- METRICS
  - parameters `array` (hasMany) flags: [hasMany] [parameter `text` flags: [required], value `text` flags: [required], unit `text` flags: [required], tolerance `text` flags: [advanced]]
  - measurement `group` flags: [advanced] [method `text` flags: [advanced], frequency `select` flags: [advanced] [Once, Periodic, Continuous, OnDemand], accuracy `select` flags: [advanced] [Low, Medium, High, Precision]]

