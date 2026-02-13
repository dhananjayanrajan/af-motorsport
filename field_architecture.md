# AF Motorsport Field Structure

## Purpose
This document outlines the field structure for all collections across the entire project and will act as a guideline in building them.

## Attributes

### CATEGORIES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `array` (hasMany) flags: [hasMany] [label `text` flags: [required, localized], value `text` flags: [required]]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - parent `relationship: categories` (hasOne) flags: [] [Advanced]

### CHANNELS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Social, Email, Phone, Website, Press]

- BASICS
  - identifier `group` [label `text` flags: [localized], title `text` flags: [localized]]
  - address `group` [value `text` flags: [localized], locator `text` flags: [localized], endpoint `text` flags: [localized]]
  - protocol `group` [format `select` flags: [required] [HTTP, HTTPS, FTP, SFTP, SMTP, Custom], scheme `select` flags: [] [Standard, Secure, Legacy], specification `text` flags: [advanced]]

- TRAITS
  - usage `group` [purpose `text` flags: [localized], role `select` flags: [] [Primary, Secondary, Backup, Test], function `select` flags: [] [Broadcast, Receive, Monitor, Control]]
  - validity `group` [status `select` flags: [] [Active, Inactive, Pending, Deprecated], condition `select` flags: [] [Operational, Degraded, Failed, Maintenance], state `select` flags: [] [Enabled, Disabled, Locked]]

### CLASSIFICATIONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Technical, Performance, Safety, Regulatory, Historical, Sporting]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - definition `textarea` flags: [localized, advanced]
  - criteria `textarea` flags: [localized, advanced]

- CONTEXTS
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### FEATURES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Aesthetic, Performance, Mechanical, Electronic, Safety, Signature, Aerodynamic, Ergonomic, Innovation]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - functionality `textarea` flags: [localized, advanced]

- TRAITS
  - nature `group` [complexity `select` flags: [advanced] [Low, Medium, High, Extreme], visibility `select` flags: [advanced] [Visible, Concealed, Integrated, Prominent], impact `select` flags: [advanced] [Marginal, Moderate, Significant, Critical]]

- CONTEXTS
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### LOCATIONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - label `text` flags: [localized]
  - type `relationship: categories` (hasOne) flags: [required] [Circuit, Venue, Facility, Hotel, Factory, Area, Region, Landmark, Headquarters, Workshop, Showroom, Museum, Paddock, Garage, Hospitality, Office, Warehouse, TestFacility, MediaCenter, Other]

- BASICS
  - title `text` flags: [localized]
  - description `text` flags: [localized]

- DETAILS
  - address `textarea` flags: [localized]
  - geometry `group` flags: [advanced] [coordinates `point` flags: [], bounds `text` flags: [advanced], area `text` flags: [advanced]]

- TRAITS
  - geography `group` flags: [advanced] [terrain `text` flags: [advanced], climate `select` flags: [advanced] [Temperate, Tropical, Arid, Continental, Polar], features `text` flags: [advanced]]
  - infrastructure `group` flags: [advanced] [transport `text` flags: [advanced], facilities `text` flags: [advanced], amenities `text` flags: [advanced]]
  - accessibility `group` flags: [advanced] [approach `select` flags: [advanced] [PublicRoad, PrivateRoad, Air, Sea, Rail], facilities `select` flags: [advanced] [DisabledAccess, VIPEntry, ServiceEntry], capacity `select` flags: [advanced] [Small, Medium, Large, Massive]]

- CONTEXTS
  - entities `relationships: [organizations, individuals, leaders, drivers, members]` (hasMany) flags: [hasMany]

### PREFERENCES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Visual, Auditory, Technical, Driving, Lifestyle, Communication, Ergonomic, Environmental]

- BASICS
  - description `text` flags: [localized]

- TRAITS
  - conditions `array` (hasMany) flags: [hasMany, advanced] [trigger `text` flags: [advanced], prerequisite `text` flags: [advanced]]
  - reasons `array` (hasMany) flags: [hasMany, advanced] [reason `text` flags: [advanced], importance `select` flags: [advanced] [Low, Medium, High, Critical]]

- CONTEXTS
  - principles `relationship: principles` (hasMany) flags: [hasMany, advanced]
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### PRINCIPLES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Core, Ethical, Operational, Cultural, Technical, Competitive, Safety, Environmental]

- BASICS
  - description `text` flags: [localized]
  - statement `textarea` flags: [required, localized]

- DETAILS
  - application `textarea` flags: [localized, advanced]
  - rationale `textarea` flags: [localized, advanced]

- CONTEXTS
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### SKILLS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Technical, Engineering, Strategy, Leadership, Communication, Mechanical, Analytical, Creative, Physical, Mental, Administrative, Safety, Medical, Logistics, Digital, Driving]

- BASICS
  - description `textarea` flags: [localized]
  - scope `group` [significance `text` flags: [advanced], scale `select` flags: [advanced] [Narrow, Moderate, Broad, Comprehensive], depth `select` flags: [advanced] [Basic, Intermediate, Advanced, Expert], rarity `select` flags: [advanced] [Common, Uncommon, Rare, Unique]]

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
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### SPECIFICATIONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - identifier `group` [code `text` flags: [index, unique], version `text` flags: [], revision `text` flags: []]
  - type `relationship: categories` (hasOne) flags: [required] [Powertrain, Chassis, Aerodynamics, Dimensions, Weight, Electronics, Suspension, Performance, Component, Fluid, Software, Material]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - definition `textarea` flags: [localized, advanced]
  - conditions `group` flags: [advanced] [environment `text` flags: [advanced], constraints `text` flags: [advanced], compliance `select` flags: [advanced] [Mandatory, Optional, Recommended, NotApplicable]]

- METRICS
  - parameters `array` (hasMany) flags: [hasMany] [parameter `text` flags: [required], value `text` flags: [required], unit `text` flags: [required], tolerance `text` flags: [advanced]]
  - measurement `group` flags: [advanced] [method `text` flags: [advanced], frequency `select` flags: [advanced] [Once, Periodic, Continuous, OnDemand], accuracy `select` flags: [advanced] [Low, Medium, High, Precision]]

### TAGS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Keywords, Topic, Theme, Mood, Era, Place, Person]

- DETAILS
  - description `textarea` flags: [localized]
  - context `text` flags: [localized]

### TONES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alias `text` flags: [localized]
  - type `relationship: categories` (hasOne) flags: [required] [Magnitude, Quality, Emotion, Character, Essence, Spirit, Mood, Nuance]

- BASICS
  - description `text` flags: [localized]

- TRAITS
  - scope `group` [significance `text` flags: [advanced], scale `select` flags: [advanced] [Local, Regional, National, Global], depth `select` flags: [advanced] [Surface, Moderate, Deep, Profound]]
  - qualities `array` (hasMany) flags: [hasMany, advanced] [quality `select` flags: [advanced] [Positive, Neutral, Negative, Mixed], intensity `select` flags: [advanced] [Low, Medium, High, Extreme], mood `select` flags: [advanced] [Optimistic, Somber, Energetic, Calm, Tense, Celebratory], scale `select` flags: [advanced] [Minute, Moderate, Grand, Epic]]

## Competition

### ENTRIES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Works, Privateer, Wildcard, Guest, Factory, Customer, Independent, Development, Test, Historic, OneOff, Invitational, Trophy, ProAm, Rookie]

- BASICS
  - description `textarea` flags: [localized]
  - identifiers `group` [number `text` flags: [required, index], plate `text` flags: []]
  - status `select` flags: [required] [Entered, Confirmed, Withdrawn, Disqualified, DidNotStart, DidNotFinish, Classified, NotClassified, Provisional, Excluded]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: []
  - session `relationship: sessions` (hasOne) flags: [required]
  - drivers `relationship: drivers` (hasMany) flags: [hasMany, required]
  - crew `relationship: members` (hasMany) flags: [hasMany]
  - car `relationship: cars` (hasOne) flags: [required]
  - classification `relationship: classifications` (hasOne) flags: []

- TRAITS
  - role `select` flags: [] [Primary, Reserve, Test, Development, Rookie, Veteran, Guest]
  - eligibility `group` [license `text` flags: [], waiver `text` flags: [advanced], restriction `text` flags: [advanced]]
  - preferences `relationship: preferences` (hasMany) flags: [hasMany, advanced]
  - specifications `relationship: specifications` (hasMany) flags: [hasMany, advanced]

- METRICS
  - positions `group` [grid `number` flags: [], start `number` flags: [], finish `number` flags: [], laps `number` flags: []]
  - parameters `array` (hasMany) flags: [hasMany, advanced] [parameter `relationship: classifications` (hasOne) flags: [advanced], value `text` flags: [advanced], unit `text` flags: [advanced]]

- ASSETS
  - thumbnail `relationship: media` (hasOne) flags: []
  - livery `relationship: media` (hasOne) flags: []
  - gallery `relationship: galleries` (hasOne) flags: []
  - playlist `relationship: playlists` (hasOne) flags: []

- CONTEXTS
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### EVENTS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [GrandPrix, Rally, Race, Test, Show, Festival, Launch, Preview, Gala, Auction, Convention, Summit, Exhibition, Qualifying, Shootout, TimeAttack, HillClimb, Sprint, Endurance, Charity]

- BASICS
  - description `textarea` flags: [localized]
  - identifiers `group` [code `text` flags: [index, unique], round `text` flags: []]
  - status `select` flags: [required] [Scheduled, Confirmed, Completed, Cancelled, Postponed, Abandoned, Provisional]
  - access `select` flags: [required] [Public, Private, InviteOnly, MemberOnly, VIP]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: []
  - story `relationship: stories` (hasOne) flags: []
  - season `relationship: seasons` (hasOne) flags: [required]
  - location `relationship: locations` (hasOne) flags: [required]
  - classification `relationship: classifications` (hasMany) flags: [hasMany]
  - features `relationship: features` (hasMany) flags: [hasMany]
  - regulations `relationship: protocols` (hasMany) flags: [hasMany]

- TRAITS
  - chronology `group` [start `date` flags: [required], end `date` flags: [required], timezone `text` flags: [required]]
  - format `relationship: categories` (hasOne) flags: [required] [Weekend, OneDay, MultiDay, Evening, Night, DoubleHeader, TripleHeader]

- METRICS
  - specifications `relationship: specifications` (hasMany) flags: [hasMany]

- ASSETS
  - poster `relationship: media` (hasOne) flags: []
  - cover `relationship: media` (hasOne) flags: []
  - gallery `relationship: galleries` (hasOne) flags: []
  - playlist `relationship: playlists` (hasOne) flags: []
  - archive `relationship: archives` (hasMany) flags: [hasMany]

- CONTEXTS
  - highlights `relationship: highlights` (hasMany) flags: [hasMany]
  - insights `relationship: notes` (hasMany) flags: [hasMany]

### POINTS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Championship, Season, Event, Session, Bonus, Penalty, Withdrawal, Adjustment]

- BASICS
  - description `textarea` flags: [localized]
  - value `number` flags: [required]
  - scale `select` flags: [] [Standard, Inverse, Logarithmic, Custom, Multiplier, Fixed]

- DETAILS
  - result `relationship: results` (hasOne) flags: [required]
  - classification `relationship: classifications` (hasOne) flags: []
  - specification `relationship: specifications` (hasOne) flags: []

- TRAITS
  - ranking `group` [before `number` flags: [], after `number` flags: [], delta `number` flags: []]
  - modifiers `array` (hasMany) flags: [hasMany] [condition `text` flags: [required], adjustment `number` flags: [required], impact `text` flags: []]

- CONTEXTS
  - authorities `relationship: organizations` (hasMany) flags: [hasMany]
  - entries `relationship: entries` (hasMany) flags: [hasMany]
  - drivers `relationship: drivers` (hasMany) flags: [hasMany]
  - insights `relationship: notes` (hasMany) flags: [hasMany]

### RESULTS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Race, Qualifying, Practice, Sprint, Warmup, Heat, Final, Stage, Segment, Shootout]

- BASICS
  - description `textarea` flags: [localized]
  - status `select` flags: [required] [Official, Provisional, Corrected, Historic, Estimated, Certified, Void]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: []
  - classification `relationship: classifications` (hasOne) flags: []
  - highlights `relationship: highlights` (hasMany) flags: [hasMany]
  - incidents `relationship: incidents` (hasMany) flags: [hasMany]

- TRAITS
  - position `group` [overall `number` flags: [required], class `number` flags: [], order `number` flags: []]
  - achievement `group` [gap `text` flags: [], interval `text` flags: [], status `text` flags: []]

- METRICS
  - performance `group` [laps `number` flags: [], time `text` flags: [], speed `text` flags: [], distance `text` flags: []]
  - stoppages `array` (hasMany) flags: [hasMany] [reason `text` flags: [], duration `text` flags: [], lap `number` flags: []]

- ASSETS
  - visualization `relationship: visualizations` (hasOne) flags: []

- CONTEXTS
  - entry `relationship: entries` (hasOne) flags: [required]
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### SEASONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - series `relationship: series` (hasOne) flags: [required]
  - type `relationship: categories` (hasOne) flags: [required] [Championship, Test, Development, Exhibition, Anniversary, Farewell]

- BASICS
  - description `textarea` flags: [localized]
  - identifiers `group` [code `text` flags: [index, unique], abbreviation `text` flags: []]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: []
  - history `relationship: histories` (hasOne) flags: []
  - schedule `relationship: schedules` (hasOne) flags: [required]
  - classifications `relationship: classifications` (hasMany) flags: [hasMany]
  - regulations `relationship: protocols` (hasMany) flags: [hasMany]

- METRICS
  - counts `group` [entries `number` flags: [], events `number` flags: [], races `number` flags: []]

- ASSETS
  - cover `relationship: media` (hasOne) flags: []
  - gallery `relationship: galleries` (hasOne) flags: []
  - playlist `relationship: playlists` (hasOne) flags: []
  - archive `relationship: archives` (hasMany) flags: [hasMany]

- CONTEXTS
  - authorities `relationships: [organizations, individuals]` (hasMany) flags: [hasMany]
  - teams `relationship: organizations` (hasMany) flags: [hasMany]
  - participants `relationship: drivers` (hasMany) flags: [hasMany]
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### SERIES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alias `text` flags: [localized]
  - type `relationship: categories` (hasOne) flags: [required] [Championship, Trophy, Cup, Invitational, Support, Esports, Historic, Development, ProAm, Masters, Rookie, Endurance, Sprint, Winter, Summer]

- BASICS
  - description `textarea` flags: [localized]
  - identifiers `group` [code `text` flags: [index, unique], abbreviation `text` flags: []]
  - tagline `text` flags: [localized]
  - status `select` flags: [required] [Active, Inactive, Defunct, Upcoming, Rebranded, Merged, Sanctioned]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: []
  - history `relationship: histories` (hasOne) flags: []
  - organization `relationship: organizations` (hasMany) flags: [hasMany]
  - classification `relationship: classifications` (hasMany) flags: [hasMany]
  - features `relationship: features` (hasMany) flags: [hasMany]

- TRAITS
  - heritage `group` [predecessor `relationship: series` (hasOne) flags: [], successor `relationship: series` (hasOne) flags: []]
  - specifications `relationship: specifications` (hasMany) flags: [hasMany]
  - schedule `relationship: schedules` (hasOne) flags: [required]

- METRICS
  - counts `group` [seasons `number` flags: [], events `number` flags: [], participants `number` flags: []]

- ASSETS
  - logo `relationship: media` (hasOne) flags: []
  - cover `relationship: media` (hasOne) flags: []
  - archive `relationship: archives` (hasMany) flags: [hasMany]

- CONTEXTS
  - locations `relationship: locations` (hasMany) flags: [hasMany]
  - authorities `relationships: [organizations, individuals]` (hasMany) flags: [hasMany]
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### SESSIONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alias `text` flags: [localized]
  - code `text` flags: [index, unique]
  - type `relationship: categories` (hasOne) flags: [required] [Practice, Qualifying, Race, Sprint, Warmup, Test]

- BASICS
  - description `text` flags: [localized]
  - status `select` flags: [required] [Scheduled, Confirmed, Completed, Cancelled, Postponed, Abandoned, Provisional]
  - access `select` flags: [required] [Public, Private, InviteOnly, MemberOnly, VIP]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: []
  - event `relationship: events` (hasOne) flags: [required]
  - format `group` [segment `text` flags: [], duration `number` flags: [], interval `number` flags: [], specification `text` flags: [advanced]]
  - classifications `relationship: classifications` (hasMany) flags: [hasMany]
  - features `relationship: features` (hasMany) flags: [hasMany]
  - protocols `relationship: protocols` (hasMany) flags: [hasMany]
  - strategies `relationship: strategies` (hasMany) flags: [hasMany]

- TRAITS
  - constraints `array` (hasMany) flags: [hasMany, advanced] [type `relationship: classifications` (hasOne) flags: [advanced], limit `text` flags: [advanced], unit `text` flags: [advanced]]
  - parameters `array` (hasMany) flags: [hasMany, advanced] [parameter `relationship: classifications` (hasOne) flags: [advanced], value `text` flags: [advanced], unit `text` flags: [advanced]]
  - specifications `relationship: specifications` (hasMany) flags: [hasMany, advanced]

- METRICS
  - quantifiers `group` [laps `number` flags: [], distance `text` flags: [], duration `text` flags: []]

- ASSETS
  - gallery `relationship: galleries` (hasOne) flags: []
  - playlist `relationship: playlists` (hasOne) flags: []

- CONTEXTS
  - highlights `relationship: highlights` (hasMany) flags: [hasMany]
  - incidents `relationship: incidents` (hasMany) flags: [hasMany]
  - authorities `relationships: [organizations, individuals]` (hasMany) flags: [hasMany]
  - participants `relationships: drivers` (hasMany) flags: [hasMany]
  - crews `relationships: members` (hasMany) flags: [hasMany]
  - entities `relationships: [organizations, individuals]` (hasMany) flags: [hasMany]
  - insights `relationship: notes` (hasMany) flags: [hasMany]

## Content

### HISTORIES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alias `text` flags: [localized]
  - type `relationship: categories` (hasOne) flags: [required] [Founding, Evolution, Milestone, Archive, Legacy, Development]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]
  - stories `relationship: stories` (hasMany) flags: [hasMany]

- TRAITS
  - legacy `group` [impact `select` flags: [advanced] [Low, Medium, High, Monumental], memory `select` flags: [advanced] [Forgotten, Obscure, Celebrated, Legendary], legacy `text` flags: [advanced]]
  - evolution `group` [origin `text` flags: [advanced], development `text` flags: [advanced], lineage `text` flags: [advanced]]

- ASSETS
  - gallery `relationship: galleries` (hasOne) flags: []
  - playlist `relationship: playlists` (hasOne) flags: []

### JOURNEYS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Job, Project, Growth, Personal, Team, Transformation]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]
  - stories `relationship: stories` (hasMany) flags: [hasMany]

- TRAITS
  - lessons `array` (hasMany) flags: [hasMany] [lesson `text` flags: [required], significance `select` flags: [] [Minor, Notable, Significant, LifeChanging], application `text` flags: [], impact `select` flags: [] [Personal, Team, Organizational, Industry]]
  - decisions `relationship: decisions` (hasMany) flags: [hasMany]
  - impacts `relationship: impacts` (hasMany) flags: [hasMany]

- ASSETS
  - gallery `relationship: galleries` (hasOne) flags: []
  - playlist `relationship: playlists` (hasOne) flags: []

### NARRATIVES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alias `text` flags: [localized]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - content `richtext` flags: [required, localized]
  - scope `group` [significance `select` flags: [advanced] [Minor, Moderate, Major, Historic], scale `select` flags: [advanced] [Individual, Team, Organization, Sport], depth `select` flags: [advanced] [Surface, Detailed, Comprehensive, Exhaustive], level `text` flags: [advanced]]
  - context `group` [background `text` flags: [advanced], perspective `text` flags: [advanced], purpose `text` flags: [advanced]]
  - timeline `array` (hasMany) flags: [hasMany, advanced] [date `date` flags: [advanced], type `select` flags: [advanced] [Event, Milestone, Decision, Incident]]

- TRAITS
  - tone `relationship: tones` (hasOne) flags: []

- CONTEXTS
  - locations `relationship: locations` (hasMany) flags: [hasMany]
  - notes `relationship: notes` (hasMany) flags: [hasMany]
  - entities `relationships: [organizations, individuals, leaders, drivers, members]` (hasMany) flags: [hasMany]

### NOTES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alias `text` flags: [localized]
  - type `relationship: categories` (hasOne) flags: [required] [Insights, Observations, Remarks, Analysis, Commentary, Critique, Evaluation, Interpretation, Perspective, Summary]

- DETAILS
  - description `text` flags: [localized]

- TRAITS
  - intentions `array` (hasMany) flags: [hasMany] [type `select` flags: [] [Inform, Persuade, Clarify, Critique, Praise], impact `select` flags: [] [Positive, Neutral, Negative], remark `text` flags: []]

- ASSETS
  - archive `relationship: archives` (hasOne) flags: []

### STORIES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alias `text` flags: [localized]
  - type `relationship: categories` (hasOne) flags: [required] [Origin, Journey, Challenge, Victory, BehindTheScenes, Legacy]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]

- TRAITS
  - concerns `array` (hasMany) flags: [hasMany] [conflict `text` flags: [], stakes `text` flags: [], resolution `text` flags: []]
  - interactions `array` (hasMany) flags: [hasMany] [dynamics `select` flags: [] [Cooperative, Competitive, Adversarial, Mentorship], outcome `text` flags: []]

- ASSETS
  - gallery `relationship: galleries` (hasOne) flags: []
  - playlist `relationship: playlists` (hasOne) flags: []

- CONTEXTS
  - highlights `relationship: highlights` (hasMany) flags: [hasMany]
  - incidents `relationship: incidents` (hasMany) flags: [hasMany]

## Entities

### DRIVERS
- ESSENTIALS
  - names `group` [first `text` flags: [required, localized, index], middle `text` flags: [localized], last `text` flags: [required, localized, index]]
  - alias `text` flags: [localized]
  - type `relationship: categories` (hasOne) flags: [required] [Professional, Rookie, Veteran, Reserve, TestDriver, Champion, Legend, GuestDriver]

- BASICS
  - description `textarea` flags: [localized]
  - identifier `group` [number `text` flags: [index], nickname `text` flags: [localized], competition `text` flags: [], callsign `text` flags: []]
  - identity `group` [gender `select` flags: [] [Male, Female, NonBinary, Undisclosed], pronouns `text` flags: [], age `text` flags: [], nationality `text` flags: [index]]
  - chronology `group` [birth `date` flags: [], debut `date` flags: [], retirement `date` flags: [advanced]]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: []
  - biography `relationship: histories` (hasOne) flags: []
  - journeys `relationship: journeys` (hasMany) flags: [hasMany]

- TRAITS
  - channels `relationship: channels` (hasMany) flags: [hasMany, advanced]
  - experiences `relationship: experiences` (hasMany) flags: [hasMany]
  - skills `relationship: skills` (hasMany) flags: [hasMany]
  - trainings `relationship: trainings` (hasMany) flags: [hasMany]

- METRICS
  - results `relationship: results` (hasMany) flags: [hasMany]
  - points `relationship: points` (hasMany) flags: [hasMany]
  - awards `relationship: awards` (hasMany) flags: [hasMany]

- ASSETS
  - thumbnail `relationship: media` (hasOne) flags: []
  - cover `relationship: media` (hasOne) flags: []
  - helmet `relationship: media` (hasOne) flags: []
  - suit `relationship: media` (hasOne) flags: []
  - gallery `relationship: galleries` (hasMany) flags: [hasMany]

- CONTEXTS
  - teammates `relationship: drivers` (hasMany) flags: [hasMany]
  - crew `relationships: [members, leaders]` (hasMany) flags: [hasMany]
  - cars `relationship: cars` (hasMany) flags: [hasMany]
  - kits `relationship: kits` (hasMany) flags: [hasMany]

### INDIVIDUALS
- ESSENTIALS
  - names `group` [first `text` flags: [required, localized, index], middle `text` flags: [localized], last `text` flags: [required, localized, index]]
  - alias `text` flags: [localized]
  - type `relationship: categories` (hasOne) flags: [required] [Fan, Journalist, Influencer, Celebrity, Guest, Contact, Contributor, Collaborator, Observer, Enthusiast, VIP, Alumni]

- BASICS
  - identifier `group` [nickname `text` flags: [localized], code `text` flags: [], number `text` flags: []]
  - identity `group` [gender `select` flags: [] [Male, Female, NonBinary, Undisclosed], pronouns `text` flags: [], age `text` flags: [], nationality `text` flags: [index]]
  - description `textarea` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: []
  - background `textarea` flags: [localized]
  - interests `array` (hasMany) flags: [hasMany] [interest `text` flags: [required], level `select` flags: [] [Casual, Enthusiast, Expert, Professional], duration `text` flags: []]

- TRAITS
  - channels `relationship: channels` (hasMany) flags: [hasMany, advanced]
  - influence `group` [reach `select` flags: [advanced] [Local, Regional, National, Global], authority `select` flags: [advanced] [None, Low, Medium, High], network `select` flags: [advanced] [Small, Moderate, Extensive, Vast]]
  - benefits `array` (hasMany) flags: [hasMany, advanced] [benefit `text` flags: [advanced], type `select` flags: [advanced] [Access, Discount, Information, Collaboration], impact `select` flags: [advanced] [Minor, Moderate, Significant, Strategic]]

- ASSETS
  - avatar `relationship: media` (hasOne) flags: []
  - gallery `relationship: galleries` (hasOne) flags: []

- CONTEXTS
  - history `relationship: histories` (hasOne) flags: []
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### LEADERS
- ESSENTIALS
  - names `group` [first `text` flags: [required, localized, index], middle `text` flags: [localized], last `text` flags: [required, localized, index]]
  - alias `text` flags: [localized]
  - type `relationship: categories` (hasOne) flags: [required] [Principal, Director, Manager, Strategist, Advisor, Owner, Founder, Executive, DepartmentHead, TeamLeader, TechnicalDirector, SportingDirector]

- BASICS
  - identifier `group` [designation `text` flags: [], title `text` flags: [required, localized], code `text` flags: []]
  - description `textarea` flags: [localized]
  - identity `group` [gender `select` flags: [] [Male, Female, NonBinary, Undisclosed], pronouns `text` flags: [], age `text` flags: [], nationality `text` flags: [index]]
  - chronology `group` [birth `date` flags: [], debut `date` flags: [], retirement `date` flags: [advanced]]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: []
  - biography `relationship: histories` (hasOne) flags: []
  - vision `relationship: principles` (hasMany) flags: [hasMany, advanced]
  - departments `relationship: classifications` (hasMany) flags: [hasMany]

- TRAITS
  - channels `relationship: channels` (hasMany) flags: [hasMany, advanced]
  - personalities `relationship: features` (hasMany) flags: [hasMany]
  - achievements `relationship: experiences` (hasMany) flags: [hasMany]
  - strategies `relationship: strategies` (hasMany) flags: [hasMany]

- METRICS
  - impacts `relationship: impacts` (hasMany) flags: [hasMany]
  - awards `relationship: awards` (hasMany) flags: [hasMany]

- ASSETS
  - avatar `relationship: media` (hasOne) flags: []
  - cover `relationship: media` (hasOne) flags: []
  - gallery `relationship: galleries` (hasOne) flags: []

- CONTEXTS
  - peers `relationships: [leaders, individuals]` (hasMany) flags: [hasMany]
  - crew `relationships: [drivers, members]` (hasMany) flags: [hasMany]
  - anecdotes `relationship: notes` (hasMany) flags: [hasMany]

### MEMBERS
- ESSENTIALS
  - names `group` [first `text` flags: [required, localized, index], middle `text` flags: [localized], last `text` flags: [required, localized, index]]
  - alias `text` flags: [localized]
  - type `relationship: categories` (hasOne) flags: [required] [Engineer, Mechanic, PitCrew, Technician, Logistician, Analyst, Coordinator, Specialist, SupportStaff, Trainee, Electrician, Fabricator, DataEngineer, PerformanceEngineer, Strategist, Composites, Welder, Painter]

- BASICS
  - description `textarea` flags: [localized]
  - identifier `group` [number `text` flags: [index], nickname `text` flags: [localized], callsign `text` flags: [], badge `text` flags: []]
  - identity `group` [gender `select` flags: [] [Male, Female, NonBinary, Undisclosed], pronouns `text` flags: [], age `text` flags: [], nationality `text` flags: [index]]
  - chronology `group` [birth `date` flags: [], debut `date` flags: [], retirement `date` flags: [advanced]]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: []
  - background `textarea` flags: [localized]
  - departments `relationship: classifications` (hasMany) flags: [hasMany]

- TRAITS
  - channels `relationship: channels` (hasMany) flags: [hasMany, advanced]
  - personalities `relationship: features` (hasMany) flags: [hasMany]
  - duties `relationship: duties` (hasMany) flags: [hasMany]
  - skills `relationship: skills` (hasMany) flags: [hasMany]
  - trainings `relationship: trainings` (hasMany) flags: [hasMany]

- METRICS
  - impacts `relationship: impacts` (hasMany) flags: [hasMany]
  - awards `relationship: awards` (hasMany) flags: [hasMany]

- ASSETS
  - thumbnail `relationship: media` (hasOne) flags: []
  - cover `relationship: media` (hasOne) flags: []
  - gallery `relationship: galleries` (hasOne) flags: []
  - certifications `relationship: archives` (hasMany) flags: [hasMany]

- CONTEXTS
  - mentors `relationships: [leaders, members]` (hasMany) flags: [hasMany]
  - crew `relationships: drivers` (hasMany) flags: [hasMany]
  - cars `relationship: cars` (hasMany) flags: [hasMany]

### ORGANIZATIONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alias `text` flags: [localized]
  - type `relationship: categories` (hasOne) flags: [required] [RacingTeam, Manufacturer, Sponsor, Supplier, Federation, MediaOutlet, Partner, Institution, Association, Academy, Promoter, CircuitOwner]

- BASICS
  - identifier `group` [code `text` flags: [index, unique], abbreviation `text` flags: [], registration `text` flags: []]
  - description `textarea` flags: [localized]
  - tagline `text` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: []
  - background `textarea` flags: [localized]
  - parent `relationship: organizations` (hasOne) flags: []
  - evolution `group` [founded `date` flags: [], merged `date` flags: [advanced], rebranded `date` flags: [advanced], defunct `date` flags: [advanced]]

- TRAITS
  - channels `relationship: channels` (hasMany) flags: [hasMany, advanced]
  - reputation `group` [prestige `select` flags: [advanced] [Unknown, Emerging, Established, Prestigious, Iconic], reliability `select` flags: [advanced] [Unproven, Developing, Reliable, Exceptional], innovation `select` flags: [advanced] [Conservative, Adaptive, Innovative, Revolutionary]]
  - benefits `array` (hasMany) flags: [hasMany, advanced] [benefit `text` flags: [advanced], type `select` flags: [advanced] [Financial, Technical, Marketing, Operational], impact `select` flags: [advanced] [Minor, Moderate, Significant, Strategic]]

- ASSETS
  - logo `relationship: media` (hasOne) flags: []
  - gallery `relationship: galleries` (hasOne) flags: []

- CONTEXTS
  - headquarters `relationship: locations` (hasMany) flags: [hasMany]
  - history `relationship: histories` (hasOne) flags: []
  - notes `relationship: notes` (hasMany) flags: [hasMany]

## Outcomes

### AWARDS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Championship, RaceWin, Pole, FastestLap, ManOfTheMatch, DesignAward, InnovationPrize, SafetyAward, EnvironmentalAward, SpecialRecognition, HallOfFame, LifetimeAchievement, TeamOfTheYear, EmployeeOfTheYear, LongService, FanFavorite, MomentOfTheYear, OvertakeOfTheSeason, PhotographOfTheYear]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]

- ASSETS
  - thumbnail `relationship: media` (hasOne) flags: []
  - visualization `relationship: visualizations` (hasOne) flags: []

- CONTEXTS
  - entities `relationships: [leaders, organizations, individuals]` (hasOne) flags: [required]
  - story `relationship: stories` (hasOne) flags: []

### DECISIONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Strategic, Tactical, Operational, Technical, Personnel, Financial, Emergency, Regulatory]

- BASICS
  - description `text` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]

- TRAITS
  - features `relationship: features` (hasMany) flags: [hasMany]
  - specifications `relationship: specifications` (hasMany) flags: [hasMany]
  - expectations `relationship: expectations` (hasMany) flags: [hasMany]

- CONTEXTS
  - protocols `relationship: protocols` (hasMany) flags: [hasMany]
  - preferences `relationship: preferences` (hasMany) flags: [hasMany]
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### EXPERIENCES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Employment, Project, Role, Achievement, Milestone, Internship, Volunteer, Contract, Freelance, Research, Competition, Development, Crisis, Transition, Expedition]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]

- TRAITS
  - skills `array` (hasMany) flags: [hasMany] [skill `relationship: skills` (hasOne) flags: [required], proficiency `select` flags: [] [Beginner, Intermediate, Advanced, Expert]]

- ASSETS
  - evidence `relationship: media` (hasMany) flags: [hasMany]
  - gallery `relationship: galleries` (hasOne) flags: []

- CONTEXTS
  - entities `relationships: [organizations, drivers, members, leaders, individuals]` (hasMany) flags: [hasMany]
  - highlights `relationship: highlights` (hasMany) flags: [hasMany]
  - incidents `relationship: incidents` (hasMany) flags: [hasMany]
  - journey `relationship: journeys` (hasOne) flags: []

### HIGHLIGHTS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Performance, Maneuver, Strategy, Technical, Comeback, Record, Milestone, Overtake]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]

- TRAITS
  - specifications `relationship: specifications` (hasMany) flags: [hasMany]

- ASSETS
  - thumbnail `relationship: media` (hasOne) flags: []
  - gallery `relationship: galleries` (hasOne) flags: []
  - playlist `relationship: playlists` (hasOne) flags: []

- CONTEXTS
  - entities `relationships: [drivers, cars]` (hasMany) flags: [hasMany]
  - stories `relationship: stories` (hasMany) flags: [hasMany]

### IMPACTS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Technical, Sporting, Financial, Cultural, Regulatory, Safety, Structural, Environmental]

- BASICS
  - description `textarea` flags: [localized]
  - scope `group` [significance `text` flags: [advanced], scale `select` flags: [advanced] [Local, Regional, National, Global], depth `select` flags: [advanced] [Surface, Moderate, Deep, Fundamental]]

- TRAITS
  - tone `relationship: tones` (hasOne) flags: []
  - velocity `select` flags: [] [Immediate, Rapid, Gradual, Delayed]
  - gravity `select` flags: [] [Catastrophic, Severe, Moderate, Minor, Negligible]
  - permanence `select` flags: [] [Permanent, LongTerm, Temporary, Reversible]

- CONTEXTS
  - entities `relationships: [organizations, individuals, drivers, leaders, members, cars, kits]` (hasMany) flags: [hasMany]
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### INCIDENTS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Collision, Mechanical, Electronic, Operational, Medical, Weather, Regulatory, Security]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - decisions `relationship: decisions` (hasMany) flags: [hasMany]
  - specifications `relationship: specifications` (hasMany) flags: [hasMany]

- TRAITS
  - impacts `relationship: impacts` (hasMany) flags: [hasMany]

- ASSETS
  - gallery `relationship: galleries` (hasOne) flags: []
  - archive `relationship: archives` (hasOne) flags: []

- CONTEXTS
  - narrative `relationship: narratives` (hasOne) flags: [required]
  - entities `relationships: [drivers, members, leaders, organizations, kits]` (hasMany) flags: [hasMany]

### STRATEGIES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Competitive, Technical, Development, Marketing, Financial, LongTerm, Race, Qualifying, Testing]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - methodology `textarea` flags: [localized, advanced]
  - decisions `relationship: decisions` (hasMany) flags: [hasMany]
  - impacts `relationship: impacts` (hasMany) flags: [hasMany]

- TRAITS
  - directives `array` (hasMany) flags: [hasMany] [phase `text` flags: [], action `text` flags: [], owner `text` flags: [], deadline `date` flags: []]
  - contingencies `array` (hasMany) flags: [hasMany, advanced] [trigger `text` flags: [advanced], response `text` flags: [advanced], probability `select` flags: [advanced] [Low, Medium, High, Certain], impact `select` flags: [advanced] [Minor, Moderate, Major, Critical]]

- CONTEXTS
  - narrative `relationship: narratives` (hasOne) flags: []
  - entities `relationships: [drivers, members, leaders, organizations, kits]` (hasMany) flags: [hasMany]

## Resources

### ARCHIVES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Technical, Historical, Legal, Media, Personal, Research]

- DETAILS
  - samples `relationship: media` (hasMany) flags: [hasMany]
  - documents `relationship: media` (hasMany) flags: [hasMany]
  - narrative `relationship: narratives` (hasOne) flags: [required]

### CARS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - identifiers `group` [chassis `text` flags: [index, unique], model `text` flags: [required, localized], version `text` flags: [], code `text` flags: [index]]
  - type `relationship: categories` (hasOne) flags: [required] [Formula, Prototype, GT, Rally, Electric, Hybrid, Historic, Concept, Showcar, SafetyCar, PaceCar, Support, RoadCar, Retrofit]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - classifications `relationship: classifications` (hasMany) flags: [hasMany]

- TRAITS
  - status `select` flags: [required] [Active, Retired, Development, Museum, Prototype, Concept]
  - features `relationship: features` (hasMany) flags: [hasMany]
  - specifications `relationship: specifications` (hasMany) flags: [hasMany]

- ASSETS
  - primary `relationship: media` (hasOne) flags: []
  - cover `relationship: media` (hasOne) flags: []
  - gallery `relationship: galleries` (hasOne) flags: []
  - playlist `relationship: playlists` (hasOne) flags: []
  - visualization `relationship: visualizations` (hasOne) flags: []
  - documents `relationship: archives` (hasMany) flags: [hasMany]

- CONTEXTS
  - manufacturers `relationship: organizations` (hasMany) flags: [hasMany]
  - drivers `relationship: drivers` (hasMany) flags: [hasMany]
  - crew `relationship: members` (hasMany) flags: [hasMany]
  - associations `relationships: [organizations, individuals, leaders]` (hasMany) flags: [hasMany]
  - histories `relationship: histories` (hasOne) flags: []

### GALLERIES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Competition, Portrait, Action, BehindTheScenes, Historical, Promotional]

- DETAILS
  - images `relationship: media` (hasMany) flags: [hasMany, required]
  - narrative `relationship: narratives` (hasOne) flags: []

### KITS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Race, Practice, Casual, Formal, SpecialEdition, Heritage, Team, Technical, Safety, Promotion, Commemorative, Partnership]

- BASICS
  - description `textarea` flags: [localized]
  - purpose `group` [application `select` flags: [] [Track, Street, Show, Promotion], context `text` flags: [], conditions `text` flags: [advanced]]

- DETAILS
  - design `group` [concept `text` flags: [localized], inspiration `text` flags: [localized], designer `text` flags: [], year `date` flags: []]
  - functionality `group` [performance `select` flags: [] [Standard, Enhanced, Maximum], durability `select` flags: [] [Low, Medium, High, Extreme], comfort `select` flags: [] [Basic, Comfortable, Premium]]

- TRAITS
  - composition `group` [construction `select` flags: [advanced] [CutAndSew, Knitted, 3DPrinted, Molded], assembly `select` flags: [advanced] [Glued, Stitched, Welded, Bonded], finish `select` flags: [advanced] [Matte, Glossy, Textured, Coated]]
  - materials `array` (hasMany) flags: [hasMany, advanced] [type `select` flags: [advanced] [Cotton, Polyester, Nomex, Carbon, Leather, Synthetic], specification `text` flags: [advanced], origin `text` flags: [advanced]]
  - appearance `group` [colors `text` flags: [], branding `select` flags: [] [Minimal, Prominent, Full, Heritage], style `select` flags: [] [Classic, Modern, Futuristic, Retro]]

- ASSETS
  - thumbnail `relationship: media` (hasOne) flags: []
  - cover `relationship: media` (hasOne) flags: []
  - gallery `relationship: galleries` (hasOne) flags: []
  - visualizations `relationship: visualizations` (hasMany) flags: [hasMany]

- CONTEXTS
  - entities `relationships: [drivers, members, leaders]` (hasMany) flags: [hasMany]
  - associations `relationships: [individuals, organizations]` (hasMany) flags: [hasMany]
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### MEDIA
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - alt `text` flags: [required, localized]

- DETAILS
  - file `upload` flags: [required]

- TRAITS
  - tone `relationship: tones` (hasOne) flags: []
  - sources `array` (hasMany) flags: [hasMany] [url `text` flags: [required], type `select` flags: [] [Original, Cropped, Edited, Compressed]]

- CONTEXTS
  - notes `relationship: notes` (hasMany) flags: [hasMany]
  - entities `relationships: [organizations, individuals, leaders, drivers, members]` (hasMany) flags: [hasMany]

### PLAYLISTS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Onboard, Interview, Highlights, Documentary, BehindTheScenes, Promotional]

- DETAILS
  - clips `relationship: media` (hasMany) flags: [hasMany]
  - videos `relationship: media` (hasMany) flags: [hasMany]
  - narrative `relationship: narratives` (hasOne) flags: []

- TRAITS
  - quality `select` flags: [] [4K, HD, SD, Raw]
  - format `select` flags: [] [Wide, Vertical, Square]

### VISUALIZATIONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Chart, Graph, Map, Timeline, Model, Infographic]

- DETAILS
  - designs `relationship: media` (hasMany) flags: [hasMany, required]
  - narrative `relationship: narratives` (hasOne) flags: []

## Operations

### CAREERS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Driver, Engineer, Mechanic, Strategist, Manager, Leader, Principal, Founder, Executive, Specialist]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]
  - organization `relationship: organizations` (hasOne) flags: [required]
  - expectations `relationship: expectations` (hasMany) flags: [hasMany]
  - awards `relationship: awards` (hasMany) flags: [hasMany]

- TRAITS
  - positions `array` (hasMany) flags: [hasMany] [title `text` flags: [required], start `date` flags: [required], end `date` flags: []]
  - contract `select` flags: [] [FullTime, PartTime, Reserve, Test, Loan, Guest]

- CONTEXTS
  - entities `relationships: [leaders, drivers, members, individuals, cars]` (hasMany) flags: [hasMany]
  - highlights `relationship: highlights` (hasMany) flags: [hasMany]
  - stories `relationship: stories` (hasMany) flags: [hasMany]

### CELEBRATIONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Victory, Anniversary, Retirement, Launch, Award, Milestone, Achievement, Homecoming, Tribute, Induction]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]
  - expectations `relationship: expectations` (hasMany) flags: [hasMany]
  - stories `relationship: stories` (hasMany) flags: [hasMany]

- TRAITS
  - prestige `select` flags: [] [Intimate, Notable, Prestigious, Iconic]
  - exclusivity `select` flags: [] [Public, InviteOnly, Private, TeamOnly]

- ASSETS
  - primary `relationship: media` (hasOne) flags: []
  - gallery `relationship: galleries` (hasOne) flags: []
  - playlist `relationship: playlists` (hasOne) flags: []

- CONTEXTS
  - beneficiaries `relationships: [drivers, members, leaders, organizations, individuals]` (hasMany) flags: [hasMany]
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### DUTIES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Operational, Strategic, Administrative, Technical, Leadership, Compliance, Safety, Representative]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - obligation `group` [tasks `textarea` flags: [required, localized], reporting `text` flags: [], authority `text` flags: []]

- CONTEXTS
  - protocols `relationship: protocols` (hasMany) flags: [hasMany]
  - expectations `relationship: expectations` (hasMany) flags: [hasMany]
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### EXPECTATIONS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Performance, Behavioral, Professional, Contractual, Strategic, Cultural, Service, Reliability]

- BASICS
  - statement `textarea` flags: [required, localized]

- DETAILS
  - criteria `textarea` flags: [localized, advanced]

- TRAITS
  - direction `select` flags: [] [Required, Anticipated, Committed]
  - priority `select` flags: [] [Critical, High, Medium, Low]
  - flexibility `select` flags: [] [Strict, Negotiable, Guideline]

- CONTEXTS
  - specifications `relationship: specifications` (hasMany) flags: [hasMany]
  - protocols `relationship: protocols` (hasMany) flags: [hasMany]
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### INITIATIVES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Movement, Campaign, Fundraiser, Program, Action, Advocacy, Research, Expedition, Sustainability, Diversity, Innovation, Community, Safety, Environmental]

- BASICS
  - description `textarea` flags: [localized]
  - mission `textarea` flags: [required, localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]
  - strategies `relationship: strategies` (hasMany) flags: [hasMany]
  - expectations `relationship: expectations` (hasMany) flags: [hasMany]
  - insights `relationship: notes` (hasMany) flags: [hasMany]

- TRAITS
  - status `select` flags: [required] [Proposed, Active, Paused, Completed, Archived]

- ASSETS
  - primary `relationship: media` (hasOne) flags: []
  - gallery `relationship: galleries` (hasOne) flags: []
  - document `relationship: archives` (hasMany) flags: [hasMany]

- CONTEXTS
  - classifications `relationship: classifications` (hasOne) flags: []
  - entities `relationships: [organizations, leaders, individuals]` (hasMany) flags: [hasMany]
  - schedules `relationship: schedules` (hasMany) flags: [hasMany]
  - references `relationships: [incidents, celebrations]` (hasMany) flags: [hasMany]
  - histories `relationship: histories` (hasMany) flags: [hasMany]

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
  - features `relationship: features` (hasMany) flags: [hasMany]

- TRAITS
  - specifications `relationship: specifications` (hasMany) flags: [hasMany]
  - format `select` flags: [required] [InPerson, Virtual, Hybrid]
  - access `select` flags: [required] [Public, InviteOnly, Private, Exclusive]

- ASSETS
  - primary `relationship: media` (hasOne) flags: []
  - gallery `relationship: galleries` (hasOne) flags: []
  - playlist `relationship: playlists` (hasOne) flags: []
  - materials `relationship: archives` (hasMany) flags: [hasMany]

- CONTEXTS
  - hosts `relationships: [organizations, leaders, individuals]` (hasMany) flags: [hasMany]
  - attendees `relationships: [drivers, members, leaders, individuals, organizations]` (hasMany) flags: [hasMany]
  - schedules `relationship: schedules` (hasMany) flags: [hasMany]
  - references `relationships: [initiatives, celebrations]` (hasMany) flags: [hasMany]
  - notes `relationship: notes` (hasMany) flags: [hasMany]

### PROTOCOLS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - identifier `group` [code `text` flags: [index, unique], version `text` flags: [], revision `text` flags: []]
  - type `relationship: categories` (hasOne) flags: [required] [Technical, Operational, Safety, Communication, Quality, Compliance]

- BASICS
  - description `textarea` flags: [localized]
  - objective `textarea` flags: [required, localized]

- DETAILS
  - procedure `textarea` flags: [required, localized]
  - steps `array` (hasMany) flags: [hasMany] [step `text` flags: [required], instruction `text` flags: [required], requirement `text` flags: []]

- ASSETS
  - documentation `relationship: archives` (hasMany) flags: [hasMany]

- CONTEXTS
  - classifications `relationship: classifications` (hasMany) flags: [hasMany]

### SCHEDULES
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Competition, Testing, Maintenance, Travel, Media, Personal, Briefing, Debrief]

- BASICS
  - agenda `textarea` flags: [localized]
  - scope `group` [significance `select` flags: [advanced] [Minor, Moderate, Major, Critical], scale `select` flags: [advanced] [Individual, Team, Department, Organization], depth `select` flags: [advanced] [Overview, Detailed, Comprehensive]]

- DETAILS
  - chronology `group` [date `date` flags: [required], type `select` flags: [] [Single, Recurring, MultiDay]]
  - slots `array` (hasMany) flags: [hasMany] [activity `text` flags: [required], start `date` flags: [required], end `date` flags: [required], duration `text` flags: [], location `text` flags: []]

- TRAITS
  - constraints `array` (hasMany) flags: [hasMany, advanced] [constraint `text` flags: [advanced], type `select` flags: [advanced] [Time, Resource, Weather, Regulation], impact `select` flags: [advanced] [Low, Medium, High, Blocking]]

- CONTEXTS
  - occurrences `relationships: [trainings, meetups, initiatives, celebrations]` (hasMany) flags: [hasMany]
  - entities `relationships: [leaders, drivers, members, individuals, organizations]` (hasMany) flags: [hasMany]

### TRAININGS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Driving, Fitness, Technical, Strategy, Simulator, Classroom, Workshop, Seminar, Onboarding, Certification, Refresher, Emergency, Media, Leadership, TeamBuilding]

- BASICS
  - description `textarea` flags: [localized]

- DETAILS
  - narrative `relationship: narratives` (hasOne) flags: [required]

- TRAITS
  - intensity `select` flags: [] [Low, Medium, High, Extreme]
  - format `select` flags: [] [Individual, Group, Lecture, HandsOn, Simulated, Remote]
  - specifications `relationship: specifications` (hasMany) flags: [hasMany]

- ASSETS
  - gallery `relationship: galleries` (hasOne) flags: []
  - playlist `relationship: playlists` (hasOne) flags: []

- CONTEXTS
  - entities `relationships: [drivers, members, leaders, individuals, organizations]` (hasMany) flags: [hasMany]
  - strategies `relationship: strategies` (hasMany) flags: [hasMany]
  - skills `relationship: skills` (hasMany) flags: [hasMany]
  - stories `relationship: stories` (hasMany) flags: [hasMany]

- tags - `categories`
- categories - `categories`
- channels - `categories`
- locations - `categories`, `drivers`, `individuals`, `leaders`, `members`, `organizations`
- notes - `archives`, `categories`
- tones - `categories`
- narratives - `locations`, `notes`, `organizations`, `individuals`, `leaders`, `drivers`, `members`, `tones`
- media - `notes`, `organizations`, `individuals`, `leaders`, `drivers`, `members`, `tones`
- galleries - `categories`, `media`, `narratives`
- playlists - `categories`, `media`, `narratives`
- archives - `categories`, `media`, `narratives`
- visualizations - `categories`, `media`, `narratives`
- classifications - `categories`, `notes`
- features - `categories`, `notes`
- specifications - `categories`
- stories - `categories`, `galleries`, `highlights`, `incidents`, `narratives`, `playlists`
- histories - `categories`, `galleries`, `playlists`, `narratives`, `stories`
- journeys - `categories`, `decisions`, `galleries`, `impacts`, `narratives`, `playlists`, `stories`
- principles - `categories`, `notes`
- preferences - `categories`, `notes`, `principles`
- protocols - `archives`, `categories`, `classifications`
- expectations - `categories`, `notes`, `protocols`, `specifications`
- duties - `categories`, `expectations`, `notes`, `protocols`
- decisions - `categories`, `expectations`, `features`, `notes`, `narratives`, `preferences`, `protocols`, `specifications`, `tones`
- strategies - `categories`, `decisions`, `drivers`, `impacts`, `kits`, `leaders`, `members`, `narratives`, `organizations`
- impacts - `categories`, `cars`, `drivers`, `individuals`, `kits`, `leaders`, `members`, `notes`, `organizations`, `tones`
- highlights - `categories`, `drivers`, `galleries`, `kits`, `media`, `narratives`, `playlists`, `specifications`, `stories`
- incidents - `archives`, `categories`, `decisions`, `drivers`, `galleries`, `impacts`, `kits`, `leaders`, `members`, `narratives`, `organizations`, `specifications`
- celebrations - `categories`, `drivers`, `galleries`, `individuals`, `leaders`, `media`, `members`, `narratives`, `notes`, `organizations`, `playlists`, `stories`, `expectations`
- kits - `categories`, `drivers`, `galleries`, `leaders`, `media`, `members`, `notes`, `organizations`, `individuals`, `visualizations`
- cars - `archives`, `categories`, `classifications`, `drivers`, `features`, `galleries`, `histories`, `leaders`, `manufacturers`, `media`, `members`, `organizations`, `individuals`, `playlists`, `specifications`, `visualizations`
- skills - `categories`, `classifications`, `features`, `notes`, `specifications`, `skills`, `trainings`
- experiences - `categories`, `drivers`, `galleries`, `highlights`, `incidents`, `individuals`, `journey`, `leaders`, `members`, `organizations`, `narratives`
- awards - `categories`, `leaders`, `organizations`, `individuals`, `media`, `narratives`, `stories`, `visualizations`
- trainings - `categories`, `drivers`, `galleries`, `individuals`, `leaders`, `members`, `organizations`, `playlists`, `skills`, `specifications`, `strategies`, `stories`, `narratives`
- initiatives - `categories`, `archives`, `celebrations`, `classifications`, `galleries`, `histories`, `incidents`, `leaders`, `media`, `narratives`, `organizations`, `individuals`, `schedules`, `strategies`, `notes`
- meetups - `categories`, `archives`, `attendees`, `celebrations`, `drivers`, `features`, `galleries`, `hosts`, `individuals`, `initiatives`, `leaders`, `locations`, `media`, `members`, `organizations`, `playlists`, `schedules`, `specifications`, `narratives`, `notes`
- careers - `categories`, `awards`, `cars`, `drivers`, `expectations`, `highlights`, `individuals`, `leaders`, `members`, `narratives`, `organizations`, `stories`
- organizations - `archives`, `categories`, `channels`, `classifications`, `galleries`, `headquarters`, `histories`, `leaders`, `locations`, `media`, `notes`, `organizations`
- individuals - `categories`, `channels`, `galleries`, `histories`, `media`, `notes`
- leaders - `awards`, `cars`, `classifications`, `drivers`, `features`, `galleries`, `impacts`, `individuals`, `leaders`, `media`, `members`, `notes`, `organizations`, `principles`, `strategies`, `tones`, `narratives`, `histories`
- members - `awards`, `cars`, `certifications`, `classifications`, `drivers`, `duties`, `features`, `galleries`, `impacts`, `leaders`, `media`, `mentors`, `skills`, `trainings`, `tones`, `narratives`
- drivers - `awards`, `cars`, `classifications`, `crew`, `experiences`, `galleries`, `helmet`, `histories`, `impacts`, `journeys`, `kits`, `leaders`, `media`, `members`, `points`, `results`, `skills`, `suit`, `teammates`, `trainings`, `tones`, `narratives`
- schedules - `categories`, `drivers`, `individuals`, `leaders`, `members`, `organizations`, `trainings`, `meetups`, `initiatives`, `celebrations`
- series - `archives`, `categories`, `classifications`, `features`, `galleries`, `locations`, `media`, `notes`, `organizations`, `individuals`, `series`, `specifications`, `schedules`
- seasons - `archives`, `categories`, `classifications`, `drivers`, `galleries`, `media`, `notes`, `organizations`, `individuals`, `playlists`, `regulations`, `series`, `schedules`, `narratives`, `histories`
- events - `archives`, `categories`, `classifications`, `features`, `galleries`, `highlights`, `locations`, `media`, `notes`, `playlists`, `protocols`, `regulations`, `seasons`, `sessions`, `specifications`, `narratives`, `stories`
- sessions - `categories`, `classifications`, `crews`, `drivers`, `entities`, `events`, `features`, `galleries`, `incidents`, `insights`, `notes`, `organizations`, `individuals`, `parameters`, `playlists`, `protocols`, `specifications`, `strategies`, `classifications`
- entries - `categories`, `cars`, `classifications`, `crew`, `drivers`, `galleries`, `livery`, `media`, `notes`, `playlists`, `preferences`, `sessions`, `specifications`, `thumbnail`, `narratives`
- results - `categories`, `classifications`, `entries`, `incidents`, `notes`, `specifications`, `visualization`, `narratives`
- points - `categories`, `drivers`, `entries`, `insights`, `notes`, `organizations`, `results`, `specifications`, `narratives`