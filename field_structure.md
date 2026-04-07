Competition:

Series
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   ├── code (text)
│   │   └── abbreviation (text)
│   ├── tagline (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── agenda (textarea)
│   ├── history (richtext)
│   ├── predecessor (json)
│   ├── successor (json)
│   ├── start_date (date)
│   ├── end_date (date)
│   └── location (map)
│
└── Tab: assets
    ├── logo (upload → media)
    ├── thumbnail (upload → media)
    ├── cover (upload → media)
    └── documents (Files → alias)

Seasons
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   ├── code (text)
│   │   └── abbreviation (text)
│   ├── tagline (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── series (relationship → series)
│   ├── history (richtext)
│   ├── entries (number)
│   ├── races (number)
│   └── notes (textarea)
│
└── Tab: assets
    ├── cover (upload → media)
    ├── trailer (upload → media)
    ├── gallery (Files → alias)
    └── highlights (Files → alias)

Events
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   └── code (text)
│   ├── tagline (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── status (dropdown: Scheduled, Confirmed, Completed, Cancelled, Postponed, Abandoned)
│   ├── access (dropdown: Public, Private, InviteOnly, MemberOnly, VIP)
│   ├── season (relationship → seasons)
│   ├── location (map)
│   ├── history (richtext)
│   ├── start_date (date)
│   ├── end_date (date)
│   └── notes (textarea)
│
└── Tab: assets
    ├── thumbnail (upload → media)
    ├── poster (upload → media)
    ├── cover (upload → media)
    └── videos (relationship → playlists)

Sessions
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   └── code (text)
│   ├── segment (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── access (radio: public, private, exclusive)
│   ├── specification (textarea)
│   ├── history (richtext)
│   └── notes (textarea)
│
├── Tab: metrics
│   └── quantifiers (group)
│       ├── laps (number)
│       ├── distance (number)
│       ├── duration (number)
│       ├── interval (number)
│       └── specification (textarea)
│
└── Tab: assets
    ├── thumbnail (upload → media)
    ├── gallery (Files → alias)
    └── videos (relationship → playlists)

Entries
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   ├── number (text)
│   │   └── plate (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── session (relationship → sessions)
│   ├── status (dropdown: Entered, Confirmed, Withdrawn, Disqualified, DidNotStart, DidNotFinish, Classified, NotClassified, Provisional, Excluded)
│   ├── grid_position (number)
│   ├── start_position (number)
│   ├── finish_position (number)
│   └── laps_position (number)
│
└── Tab: assets
    ├── thumbnail (upload → media)
    └── gallery (Files → alias)

Results
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   └── description (textarea)
│
└── Tab: details
    ├── status (dropdown: Official, Provisional, Corrected, Historic, Estimated, Certified, Void)
    ├── overall (number)
    ├── class (number)
    ├── order (number)
    ├── interval (number)
    ├── gap (number)
    ├── state (number)
    ├── laps (number)
    ├── time (time)
    ├── speed (number)
    ├── distance (number)
    └── notes (textarea)

Points
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   └── description (textarea)
│
└── Tab: details
    ├── scale (dropdown: standard, inverse, logarithmic, multiplier, fixed)
    ├── value (number)
    ├── before (number)
    ├── after (number)
    ├── delta (number)
    ├── condition (number)
    ├── adjustment (number)
    ├── impact (textarea)
    └── notes (textarea)

Circuits
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   ├── code (text)
│   │   └── abbreviation (text)
│   ├── tagline (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── type (dropdown: permanent, street, temporary, roval, mixed)
│   ├── length_km (number)
│   ├── length_miles (number)
│   ├── turns (number)
│   ├── drs_zones (number)
│   ├── direction (dropdown: clockwise, anticlockwise)
│   ├── fia_grade (dropdown: 1, 1T, 2, 3, 4)
│   ├── elevation_change (number)
│   ├── capacity (number)
│   ├── location (map)
│   ├── address (textarea)
│   ├── country (country selector)
│   ├── opened (date)
│   ├── closed (date)
│   ├── renovated (array)
│   │   └── each item:
│   │       ├── year (date)
│   │       └── description (textarea)
│   ├── owner (relationship → organizations)
│   ├── operator (relationship → organizations)
│   ├── website (url)
│   ├── history (richtext)
│   └── notes (textarea)
│
├── Tab: metrics
│   ├── record_lap_time (time)
│   ├── record_lap_driver (relationship → drivers)
│   └── record_lap_year (date)
│
└── Tab: assets
    ├── thumbnail (upload → media)
    ├── cover (upload → media)
    ├── gallery (Files → alias)
    ├── circuit_map (upload → media)
    ├── video (upload → media)
    └── documents (Files → alias)

Championships
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   ├── code (text)
│   │   └── abbreviation (text)
│   ├── tagline (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── history (richtext)
│   ├── regulations (relationship → regulations)
│   ├── format (textarea)
│   ├── points_system (relationship → points)
│   ├── standings_scope (dropdown: season_only, rolling, cumulative)
│   ├── start_date (date)
│   ├── end_date (date)
│   ├── season (relationship → seasons)
│   ├── series (relationship → series)
│   ├── winner (relationship → drivers)
│   ├── runner_up (relationship → drivers)
│   ├── third_place (relationship → drivers)
│   └── notes (textarea)
│
└── Tab: assets
    ├── trophy (upload → media)
    ├── thumbnail (upload → media)
    ├── cover (upload → media)
    ├── gallery (Files → alias)
    ├── video (upload → media)
    └── documents (Files → alias)

Races
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   ├── code (text)
│   │   └── abbreviation (text)
│   ├── tagline (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── history (richtext)
│   ├── type (dropdown: sprint, feature, qualifying_race, heat, final, knockout)
│   ├── status (dropdown: scheduled, ongoing, completed, cancelled, postponed)
│   ├── start_date (datetime)
│   ├── end_date (datetime)
│   ├── event (relationship → events)
│   ├── season (relationship → seasons)
│   ├── series (relationship → series)
│   ├── circuit (relationship → circuits)
│   ├── laps (number)
│   ├── distance_km (number)
│   ├── winner (relationship → drivers)
│   ├── pole_position (relationship → entries)
│   ├── fastest_lap (relationship → entries)
│   ├── fastest_lap_time (time)
│   ├── weather (textarea)
│   ├── safety_car_periods (number)
│   ├── red_flags (number)
│   └── notes (textarea)
│
└── Tab: assets
    ├── thumbnail (upload → media)
    ├── poster (upload → media)
    ├── cover (upload → media)
    ├── gallery (Files → alias)
    ├── video (upload → media)
    ├── highlights (Files → alias)
    └── documents (Files → alias)

Entities:

Teams
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── tagline (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── history (richtext)
│   ├── country (country selector)
│   ├── start_date (date)
│   ├── end_date (date)
│   └── website (url)
│
└── Tab: assets
    ├── logo (upload → media)
    ├── cover (upload → media)
    └── gallery (Files → alias)

Drivers
├── name (text, required) — constructed from first + last
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   ├── racing_number (number)
│   │   ├── nickname (text)
│   │   ├── competition_name (text)
│   │   └── callsign (text)
│   ├── catchphrase (textarea)
│   ├── first_name (text, required)
│   ├── middle_name (text)
│   ├── last_name (text, required)
│   ├── birth_date (date)
│   ├── debut_date (date)
│   ├── retirement_date (date)
│   ├── nationality (country selector)
│   ├── gender (dropdown: Male, Female, NonBinary, Undisclosed)
│   └── pronouns (text)
│
├── Tab: details
│   ├── story (richtext)
│   ├── biography (richtext)
│   ├── addresses (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── label (text)
│   │       ├── description (textarea)
│   │       └── location (map)
│   ├── websites (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── path (url)
│   │       └── description (textarea)
│   ├── socials (array)
│   │   └── each item:
│   │       ├── platform (dropdown)
│   │       ├── username (text)
│   │       └── description (textarea)
│   ├── skills (relationship → skills[])
│   ├── points (relationship → points[])
│   ├── results (relationship → results[])
│   ├── awards (relationship → awards[])
│   └── cars (relationship → cars[])
│
└── Tab: assets
    ├── avatar (upload → media)
    ├── autograph (upload → media)
    ├── cover (upload → media)
    └── gallery (Files → alias)

Leaders
├── name (text, required) — constructed from first + last
├── alias (text, optional)
│
├── Tab: basics
│   ├── first_name (text, required)
│   ├── middle_name (text)
│   ├── last_name (text, required)
│   ├── nickname (text)
│   ├── title (text)
│   ├── gender (dropdown: Male, Female, NonBinary, Undisclosed)
│   ├── nationality (country selector)
│   ├── birth_date (date)
│   ├── debut_date (date)
│   └── retirement_date (date)
│
├── Tab: details
│   ├── vision (textarea)
│   ├── mission (textarea)
│   ├── quote (textarea)
│   ├── designations (relationship → designations[])
│   ├── biography (richtext)
│   ├── history (textarea)
│   ├── awards (relationship → awards[])
│   ├── principles (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── description (textarea)
│   │       ├── statement (textarea)
│   │       ├── application (textarea)
│   │       └── rationale (textarea)
│   ├── websites (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── path (url)
│   │       └── description (textarea)
│   └── socials (array)
│       └── each item:
│           ├── platform (dropdown)
│           ├── username (text)
│           └── description (textarea)
│
└── Tab: assets
    ├── avatar (upload → media)
    ├── cover (upload → media)
    └── gallery (Files → alias)

Members
├── name (text, required) — constructed from first + last
├── alias (text, optional)
│
├── Tab: basics
│   ├── first_name (text, required)
│   ├── middle_name (text)
│   ├── last_name (text, required)
│   ├── nickname (text)
│   ├── description (textarea)
│   ├── gender (dropdown: Male, Female, NonBinary, Undisclosed)
│   ├── pronouns (text)
│   ├── nationality (country selector)
│   ├── birth_date (date)
│   ├── joining_date (date)
│   └── retirement_date (date)
│
├── Tab: details
│   ├── duties (textarea)
│   ├── skills (relationship → skills[])
│   ├── trainings (relationship → trainings[])
│   └── addresses (array)
│       └── each item:
│           ├── name (text)
│           ├── label (text)
│           ├── description (textarea)
│           └── location (map)
│
└── Tab: assets
    ├── avatar (upload → media)
    └── cover (upload → media)

Individuals
├── name (text, required) — constructed from first + last
├── alias (text, optional)
│
├── Tab: basics
│   ├── type (radio: mentor, trainee, intern, advisor, consultant, guest)
│   ├── first_name (text, required)
│   ├── last_name (text, required)
│   ├── description (textarea)
│   ├── is_contact (boolean)
│   ├── gender (dropdown: Male, Female, NonBinary, Undisclosed)
│   └── pronouns (text)
│
└── Tab: assets
    ├── avatar (upload → media)
    └── thumbnail (upload → media)

Organizations
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   └── code (text)
│   ├── tagline (text)
│   ├── description (textarea)
│   └── type (dropdown: sponsors, investors, partners, supporters, promoters, organizers, media, government, NGO, developers, distributors, retailers, manufacturers, suppliers)
│
├── Tab: details
│   ├── history (richtext)
│   ├── founded (date)
│   ├── merged (date)
│   ├── rebranded (date)
│   ├── defunct (date)
│   ├── prestige (dropdown: unknown, emerging, established, prestigious, iconic)
│   ├── impact (dropdown: low, medium, deep, heavy, profound, rare, catastrophic, moderate, minor, negligible, major, severe, permanent, temporary)
│   ├── benefits (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── description (textarea)
│   │       └── type (dropdown)
│   ├── websites (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── path (url)
│   │       └── description (textarea)
│   └── socials (array)
│       └── each item:
│           ├── platform (dropdown)
│           ├── username (text)
│           └── description (textarea)
│
└── Tab: assets
    ├── logo (upload → media)
    └── alt_logo (upload → media)

Operations:

Meetups
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   └── description (textarea)
│
├── Tab: details
│   ├── format (radio: in_person, virtual, hybrid)
│   ├── access (radio: public, invite_only, private, exclusive)
│   ├── start_date (datetime)
│   ├── end_date (datetime)
│   ├── locations (map)
│   ├── notes (textarea)
│   ├── hosts (group)
│   │   ├── organizations (relationship → organizations[])
│   │   ├── leaders (relationship → leaders[])
│   │   └── individuals (relationship → individuals[])
│   └── attendees (group)
│       ├── drivers (relationship → drivers[])
│       ├── members (relationship → members[])
│       ├── leaders (relationship → leaders[])
│       ├── individuals (relationship → individuals[])
│       └── organizations (relationship → organizations[])
│
└── Tab: assets
    ├── thumbnail (upload → media)
    ├── cover (upload → media)
    ├── video (upload → media)
    ├── gallery (Files → alias)
    └── documents (Files → alias)

Initiatives
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── tagline (textarea)
│   ├── mission (textarea)
│   └── description (textarea)
│
├── Tab: details
│   ├── start_date (date)
│   ├── end_date (date)
│   ├── locations (map)
│   └── expectations (array)
│       └── each item:
│           ├── name (text)
│           ├── type (dropdown)
│           ├── criteria (textarea)
│           └── statement (textarea)
│
└── Tab: assets
    ├── thumbnail (upload → media)
    ├── candid (upload → media)
    ├── cover (upload → media)
    └── documents (Files → alias)

Trainings
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── description (richtext)
│   ├── intensity (radio: low, medium, high, extreme)
│   └── format (radio: individual, group, lecture, hands_on, simulated, remote, classroom)
│
├── Tab: details
│   ├── start_date (date)
│   ├── end_date (date)
│   ├── specifications (array)
│   │   └── each item:
│   │       ├── parameter (text)
│   │       ├── value (text)
│   │       └── description (textarea)
│   └── expectations (array)
│       └── each item:
│           ├── name (text)
│           ├── type (dropdown)
│           ├── criteria (textarea)
│           └── statement (textarea)
│
└── Tab: assets
    └── gallery (Files → alias)

Vacancies
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── title (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── department (text)
│   ├── contract (dropdown: full_time, part_time, reserve, test)
│   ├── locations (map)
│   ├── specifications (array)
│   │   └── each item:
│   │       ├── parameter (text)
│   │       ├── value (text)
│   │       └── description (textarea)
│   ├── expectations (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── type (dropdown)
│   │       ├── criteria (textarea)
│   │       └── statement (textarea)
│   └── positions (array)
│       └── each item:
│           ├── title (text)
│           ├── start (date)
│           └── end (date)
│
└── Tab: assets
    └── thumbnail (upload → media)

Onboardings
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   └── code (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── type (dropdown: driver, member, leader, partner, volunteer)
│   ├── format (dropdown: in_person, virtual, hybrid, self_paced)
│   ├── status (dropdown: draft, active, completed, archived)
│   ├── start_date (date)
│   ├── end_date (date)
│   ├── assigned_to (relationship → individuals)
│   ├── assigned_by (relationship → members)
│   ├── feedback (textarea)
│   └── notes (textarea)
│
├── Tab: traits
│   ├── checklist (array)
│   │   └── each item:
│   │       ├── task (text)
│   │       ├── required (boolean)
│   │       ├── completed (boolean)
│   │       └── due_date (date)
│   ├── modules (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── duration (text)
│   │       ├── type (dropdown)
│   │       └── content (textarea)
│   └── quizzes (array)
│       └── each item:
│           ├── question (text)
│           ├── answer (text)
│           └── explanation (textarea)
│
└── Tab: assets
    ├── documents (Files → alias)
    ├── videos (Files → alias)
    ├── completion_certificate (upload → media)
    ├── thumbnail (upload → media)
    └── cover (upload → media)

Outcomes:

Awards
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   └── description (textarea)
│
├── Tab: details
│   ├── story (richtext)
│   ├── awarded_date (date)
│   └── awarded_location (json)
│
└── Tab: assets
    ├── thumbnail (upload → media)
    ├── candid (upload → media)
    └── video (upload → media)

Celebrations
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   └── description (textarea)
│
├── Tab: details
│   ├── exclusivity (radio: public, private)
│   ├── date_time (datetime)
│   ├── location (map)
│   ├── story (richtext)
│   ├── leaders (relationship → leaders[])
│   └── drivers (relationship → drivers[])
│
└── Tab: assets
    ├── thumbnail (upload → media)
    ├── video (upload → media)
    └── gallery (Files → alias)

Interviews
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   └── code (text)
│   ├── tagline (text)
│   ├── description (textarea)
│   └── summary (textarea)
│
├── Tab: details
│   ├── format (dropdown: one_on_one, panel, press_conference, remote, pit_lane, podium)
│   ├── language (text)
│   ├── duration (number)
│   ├── recorded_date (datetime)
│   ├── published_date (datetime)
│   ├── status (dropdown: draft, scheduled, recorded, published, archived)
│   ├── access (radio: public, exclusive, team_only, media_only)
│   ├── interviewer (relationship → individuals)
│   ├── interviewee (relationship → individuals)
│   ├── session (relationship → sessions)
│   ├── location (map)
│   ├── tags (array)
│   │   └── each item:
│   │       └── name (text)
│   └── notes (textarea)
│
└── Tab: assets
    ├── thumbnail (upload → media)
    ├── cover (upload → media)
    ├── video (upload → media)
    ├── audio (alias -> files)
    ├── gallery (Files → alias)
    └── documents (Files → alias)

Incidents
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   └── description (textarea)
│
├── Tab: details
│   ├── date_time (datetime)
│   ├── story (richtext)
│   ├── location (map)
│   ├── cars (relationship → cars[])
│   └── drivers (relationship → drivers[])
│
└── Tab: assets
    ├── thumbnail (upload → media)
    ├── video (upload → media)
    └── gallery (Files → alias)

Resources:

Cars
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   ├── chassis (text)
│   │   ├── model (text)
│   │   └── version (text)
│   ├── tagline (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── status (dropdown: Active, Retired, Development, Museum, Prototype, Concept)
│   ├── history (richtext)
│   ├── manufacturers (relationship → organizations)
│   ├── members (relationship → members[])
│   ├── classifications (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── criteria (textarea)
│   │       ├── definition (textarea)
│   │       └── description (textarea)
│   └── specifications (array)
│       └── each item:
│           ├── parameter (text)
│           ├── value (text)
│           └── description (textarea)
│
└── Tab: assets
    ├── avatar (upload → media)
    ├── thumbnail (upload → media)
    ├── cover (upload → media)
    ├── gallery (Files → alias)
    ├── video (upload → media)
    └── documents (Files → alias)

Helmets
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── tagline (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── usage (dropdown: track, street, show, performance)
│   ├── concept (text)
│   ├── designer (permalink)
│   ├── inspiration (textarea)
│   ├── color (color)
│   ├── branding (dropdown: minimal, prominent, full, heritage)
│   ├── style (dropdown: classic, modern, futuristic, retro)
│   ├── material (dropdown: matte, glossy, textured, coated)
│   ├── year (date)
│   ├── classifications (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── criteria (textarea)
│   │       ├── definition (textarea)
│   │       └── description (textarea)
│   └── manufacturers (array)
│       └── each item:
│           ├── name (text)
│           └── description (textarea)
│
└── Tab: assets
    ├── avatar (upload → media)
    ├── thumbnail (upload → media)
    ├── video (upload → media)
    └── images (upload → media)

Suits
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── tagline (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── usage (dropdown: track, street, show, performance)
│   ├── durability (dropdown: low, medium, high, extreme)
│   ├── material (dropdown: cotton, polyester, nomex, carbon, leather, synthetic)
│   ├── appearance (dropdown: classic, modern, futuristic, retro)
│   └── manufacturers (array)
│       └── each item:
│           ├── name (text)
│           └── description (textarea)
│
└── Tab: assets
    ├── thumbnail (upload → media)
    ├── video (upload → media)
    └── images (upload → media)

Garages
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   └── code (text)
│   ├── tagline (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── type (dropdown: permanent, temporary, mobile, popup, shared)
│   ├── capacity (number)
│   ├── size_sq_m (number)
│   ├── accessibility (dropdown: restricted, team_only, paddock, public)
│   ├── start_date (date)
│   ├── end_date (date)
│   ├── location (map)
│   ├── ownership (relationship → organizations)
│   ├── operators (relationship → organizations)
│   ├── amenities (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       └── description (textarea)
│   ├── history (richtext)
│   └── notes (textarea)
│
└── Tab: assets
    ├── thumbnail (upload → media)
    ├── cover (upload → media)
    ├── gallery (Files → alias)
    └── documents (Files → alias)

Metadata:

Designations
├── name (text, required)
├── alias (text, optional)
│
└── Tab: basics
    └── description (textarea)

Skills
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   └── description (textarea)
│
└── Tab: details
    ├── scale (dropdown: narrow, moderate, broad, comprehensive)
    ├── depth (dropdown: basic, intermediate, advanced, expert)
    ├── rarity (dropdown: common, uncommon, rare, unique)
    ├── complexity (dropdown: low, medium, high, extreme)
    ├── specifications (array)
    │   └── each item:
    │       ├── parameter (text)
    │       ├── value (text)
    │       └── description (textarea)
    └── features (array)
        └── each item:
            ├── name (text)
            └── description (textarea)

Statuses
├── name (text, required)
├── alias (text, optional)
│
└── Tab: basics
    └── description (textarea)

Regulations
├── name (text, required)
├── alias (text, optional)
│
└── Tab: basics
    ├── description (textarea)
    ├── status (dropdown: published, draft, archived)
    ├── code (text)
    ├── version (text)
    ├── effective_date (date)
    └── document (alias (C) -> files)

Policies
├── name (text, required)
├── alias (text, optional)
│
└── Tab: basics
    ├── description (textarea)
    ├── privacy (richtext)
    ├── cookies (richtext)
    ├── version (text)
    ├── effective_date (date)
    ├── last_reviewed (date)
    └── document (alias (C) -> files)

Statements
├── name (text, required)
├── alias (text, optional)
│
└── Tab: basics
    ├── description (textarea)
    ├── status (dropdown: published, draft, archived)
    ├── statement (richtext)
    ├── issued_date (date)
    └── authority (relationship → organizations)

Slides
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   └── code (text)
│   ├── description (textarea)
│   └── story (richtext)
│
├── Tab: details
│   ├── type (dropdown: intro, overview, highlight, summary, statistical, congratulatory)
│   ├── orientation (dropdown: landscape, portrait, square)
│   ├── template (dropdown: minimal, corporate, sporty, bold, data_driven)
│   ├── transition (dropdown: fade, slide, zoom, none)
│   ├── duration (number)
│   ├── order (number)
│   └── notes (textarea)
│
├── Tab: traits
│   ├── tags (array)
│   │   └── each item:
│   │       └── name (text)
│   └── notes (textarea)
│
└── Tab: assets
    ├── background (upload → media)
    ├── thumbnail (upload → media)
    └── foreground (upload → media)

Pipelines:

Plans
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   └── code (text)
│   ├── tagline (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── vision (textarea)
│   ├── mission (textarea)
│   ├── scope (dropdown: personal, team, departmental, organizational, championship)
│   ├── status (dropdown: draft, approved, in_progress, completed, on_hold, cancelled)
│   ├── priority (dropdown: low, medium, high, critical)
│   ├── start_date (date)
│   ├── end_date (date)
│   ├── budget (number)
│   ├── currency (dropdown: USD, EUR, GBP, INR)
│   ├── assigned_to (relationship → members)
│   ├── dependencies (relationship → plans)
│   └── notes (textarea)
│
├── Tab: traits
│   ├── milestones (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── due_date (date)
│   │       └── description (textarea)
│   ├── deliverables (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── type (dropdown)
│   │       └── description (textarea)
│   ├── risks (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── likelihood (dropdown)
│   │       ├── impact (dropdown)
│   │       └── mitigation (textarea)
│   └── kpis (array)
│       └── each item:
│           ├── name (text)
│           ├── target (text)
│           └── unit (text)
│
└── Tab: assets
    ├── thumbnail (upload → media)
    ├── cover (upload → media)
    └── documents (Files → alias)

Timelines
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   └── description (textarea)
│
├── Tab: details
│   ├── scope (dropdown: personal, team, project, championship, organizational)
│   ├── status (dropdown: draft, active, archived)
│   ├── start_date (date)
│   ├── end_date (date)
│   ├── color_scheme (dropdown: light, dark, vibrant, monochrome)
│   ├── orientation (dropdown: horizontal, vertical, zigzag)
│   └── notes (textarea)
│
├── Tab: traits
│   ├── milestones (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── date (date)
│   │       ├── description (textarea)
│   │       └── icon (upload → media)
│   └── events (array)
│       └── each item:
│           ├── name (text)
│           ├── date (datetime)
│           ├── description (textarea)
│           └── location (map)
│
└── Tab: assets
    ├── thumbnail (upload → media)
    ├── cover (upload → media)
    └── documents (Files → alias)

Programs
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   └── code (text)
│   ├── tagline (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── objective (textarea)
│   ├── type (dropdown: development, training, outreach, competitive, grassroots, elite, academy)
│   ├── status (dropdown: proposed, approved, active, suspended, completed, cancelled)
│   ├── duration (dropdown: days, weeks, months, years, ongoing)
│   ├── start_date (date)
│   ├── end_date (date)
│   ├── budget (number)
│   ├── outcomes (textarea)
│   ├── mentors (relationship → leaders)
│   ├── participants (relationship → drivers)
│   ├── partners (relationship → organizations)
│   ├── sponsors (relationship → organizations)
│   └── notes (textarea)
│
├── Tab: traits
│   ├── eligibility (array)
│   │   └── each item:
│   │       ├── criteria (text)
│   │       ├── value (text)
│   │       └── description (textarea)
│   └── curriculum (array)
│       └── each item:
│           ├── module_name (text)
│           ├── duration (text)
│           └── deliverable (textarea)
│
└── Tab: assets
    ├── thumbnail (upload → media)
    ├── cover (upload → media)
    ├── gallery (Files → alias)
    └── documents (Files → alias)

Roadmaps
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   └── code (text)
│   ├── tagline (text)
│   └── description (textarea)
│
├── Tab: details
│   ├── vision (textarea)
│   ├── strategy (textarea)
│   ├── scope (dropdown: technical, commercial, sporting, organizational, ecosystem)
│   ├── status (dropdown: draft, published, in_progress, paused, completed, deprecated)
│   ├── start_date (date)
│   ├── end_date (date)
│   ├── dependencies (relationship → roadmaps)
│   ├── stakeholders (relationship → organizations)
│   └── notes (textarea)
│
├── Tab: traits
│   ├── phases (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── start_date (date)
│   │       ├── end_date (date)
│   │       ├── objectives (textarea)
│   │       └── deliverables (relationship → archives)
│   ├── risks (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── impact (dropdown)
│   │       └── mitigation (textarea)
│   └── success_metrics (array)
│       └── each item:
│           ├── metric (text)
│           ├── target (text)
│           └── actual (text)
│
└── Tab: assets
    ├── thumbnail (upload → media)
    ├── cover (upload → media)
    └── documents (Files → alias)

Reports
├── name (text, required)
├── alias (text, optional)
│
├── Tab: basics
│   ├── identifiers (group)
│   │   └── code (text)
│   ├── tagline (text)
│   ├── description (textarea)
│   └── executive_summary (textarea)
│
├── Tab: details
│   ├── type (dropdown: financial, technical, sporting, incident, performance, attendance, media, annual)
│   ├── format (dropdown: pdf, doc, spreadsheet, presentation, interactive)
│   ├── status (dropdown: draft, under_review, approved, published, archived)
│   ├── generated_by (relationship → members)
│   ├── generated_on (datetime)
│   ├── period_start (date)
│   ├── period_end (date)
│   ├── scope (relationship → series)
│   ├── approved_by (relationship → leaders)
│   ├── approved_on (datetime)
│   └── notes (textarea)
│
├── Tab: traits
│   ├── data_sources (array)
│   │   └── each item:
│   │       ├── name (text)
│   │       ├── path (url)
│   │       └── description (textarea)
│   ├── charts (array)
│   │   └── each item:
│   │       ├── title (text)
│   │       ├── type (dropdown)
│   │       ├── data_reference (text)
│   │       └── thumbnail (upload → media)
│   └── tables (array)
│       └── each item:
│           ├── title (text)
│           ├── columns (json)
│           └── rows (json)
│
└── Tab: assets
    ├── attachments (Files → alias)
    ├── thumbnail (upload → media)
    ├── cover (upload → media)
    └── documents (Files → alias)