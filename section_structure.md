# DATA MAP: PAYLOAD CMS FRONTEND PAGES

## Home Page (/)

### Hero Slideshow

- **Collections Used:**
  - `Slides`
    - `name` (text, required)
    - `alias` (text, optional)
    - `identifiers.code` (text)
    - `description` (textarea)
    - `story` (richtext)
    - `type` (dropdown: intro, overview, highlight, summary, statistical, congratulatory)
    - `orientation` (dropdown: landscape, portrait, square)
    - `template` (dropdown: minimal, corporate, sporty, bold, data_driven)
    - `transition` (dropdown: fade, slide, zoom, none)
    - `duration` (number)
    - `order` (number)
    - `background` (upload → media)
    - `thumbnail` (upload → media)
    - `foreground` (upload → media)

- **Final Data Fields:**
  - `name` (text, required)
  - `alias` (text, optional)
  - `identifiers.code` (text)
  - `description` (textarea)
  - `story` (richtext)
  - `type` (dropdown: intro, overview, highlight, summary, statistical, congratulatory)
  - `orientation` (dropdown: landscape, portrait, square)
  - `template` (dropdown: minimal, corporate, sporty, bold, data_driven)
  - `transition` (dropdown: fade, slide, zoom, none)
  - `duration` (number)
  - `order` (number)
  - `background` (upload → media)
  - `thumbnail` (upload → media)
  - `foreground` (upload → media)

- **Purpose:** Establish brand identity and create immediate emotional impact through cinematic visual storytelling.

- **Explanation:** This section consumes the `Slides` collection exclusively. Each slide is rendered as a full-width, full-bleed visual container with layered media assets. The `type` field dictates the contextual category of the slide, while `template` and `orientation` enforce layout consistency across devices. The `transition` field defines the animation between slides, and `duration` controls the auto-advance timing. The `order` field ensures slides appear in the intended narrative sequence. Media fields provide the visual foundation: `background` serves as the primary full-screen image, `foreground` overlays supplementary graphics or typography, and `thumbnail` enables efficient lazy-loading or preview states. The `story` richtext field contains the headline, subheadline, and optional call-to-action text, completing the immersive hero experience.

---

### Featured Championships

- **Collections Used:**
  - `Championships`
    - `name` (text, required)
    - `alias` (text, optional)
    - `identifiers.code` (text)
    - `identifiers.abbreviation` (text)
    - `thumbnail` (upload → media)
    - `winner` (relationship → `Drivers`)
    - `points_system` (relationship → `Points`)
  - `Series`
    - `name` (text, required)
    - `alias` (text, optional)
    - `identifiers.code` (text)
    - `identifiers.abbreviation` (text)
    - `logo` (upload → media)
  - `Seasons`
    - `name` (text, required)
    - `alias` (text, optional)
    - `series` (relationship → `Series`)
    - `start_date` (date)
    - `end_date` (date)
  - `Drivers` (via `Championships.winner`)
    - `name` (text, required)
    - `first_name` (text, required)
    - `last_name` (text, required)
    - `avatar` (upload → media)
  - `Points` (via `Championships.points_system`)
    - `value` (number)
    - `delta` (number)

- **Final Data Fields:**
  - Championship: `name` (text, required), `alias` (text, optional), `identifiers.code` (text), `identifiers.abbreviation` (text), `thumbnail` (upload → media)
  - Series (via `Championships.series` or `Seasons.series`): `name` (text, required), `alias` (text, optional), `identifiers.code` (text), `identifiers.abbreviation` (text), `logo` (upload → media)
  - Season (current/active): `name` (text, required), `alias` (text, optional), `start_date` (date), `end_date` (date)
  - Winner Driver: `name` (text, required), `first_name` (text, required), `last_name` (text, required), `avatar` (upload → media)
  - Points Margin: derived from `Points.delta` (number) for championship victory

- **Purpose:** Showcase active and recently completed competitions, highlighting reigning champions and points differentials to encourage deep exploration of standings.

- **Explanation:** This section aggregates data from five collections to render a grid of championship cards. Each card displays the championship name and abbreviation from `Championships`, contextualized by the parent `Series` branding (logo and name) and the current `Season` timeframe (`start_date`, `end_date`). The `winner` relationship fetches the champion driver's full name and avatar. The `points_system` relationship to `Points` enables retrieval of the final points delta (`delta` field) to present a "Winning Margin" statistic. The `alias` field from each relevant collection constructs the destination URL for the "Standings" call-to-action button. Grid ordering prioritizes championships with active seasons (`Seasons.end_date` >= current date) followed by most recently concluded seasons.

---

### Latest Race Report

- **Collections Used:**
  - `Races`
    - `name` (text, required)
    - `alias` (text, optional)
    - `start_date` (datetime)
    - `winner` (relationship → `Drivers`)
    - `pole_position` (relationship → `Entries`)
    - `fastest_lap` (relationship → `Entries`)
    - `fastest_lap_time` (time)
    - `notes` (textarea)
  - `Results` (populated via `Entries` or direct relationship from `Races`)
    - `overall` (number)
    - `class` (number)
    - `order` (number)
    - `gap` (number)
    - `status` (dropdown: Official, Provisional, Corrected, Historic, Estimated, Certified, Void)
  - `Drivers` (via `Races.winner`)
    - `name` (text, required)
    - `first_name` (text, required)
    - `last_name` (text, required)
    - `nationality` (country selector)
    - `avatar` (upload → media)
  - `Circuits` (via `Races.circuit`)
    - `name` (text, required)
    - `alias` (text, optional)
    - `location` (map)
    - `thumbnail` (upload → media)

- **Final Data Fields:**
  - Race: `name` (text, required), `alias` (text, optional), `start_date` (datetime), `fastest_lap_time` (time), `notes` (textarea)
  - Circuit: `name` (text, required), `alias` (text, optional), `location` (map), `thumbnail` (upload → media)
  - Winner Driver: `name` (text, required), `first_name` (text, required), `last_name` (text, required), `nationality` (country selector), `avatar` (upload → media)
  - Pole Position Entry: via `Entries` relationship → Driver `name`, Car `name`
  - Fastest Lap Entry: via `Entries` relationship → Driver `name`, `fastest_lap_time` (time)
  - Podium Drivers (derived from `Results.overall` = 1,2,3 for the race)

- **Purpose:** Deliver immediate and comprehensive race results in a visually engaging summary card, emphasizing key achievements and narrative context.

- **Explanation:** This section constructs a race report card using data from four primary collections. The `Races` collection provides the event name, date, and the `notes` field containing the "key moment narrative." The `winner` relationship fetches the winning driver's details and avatar. The `pole_position` and `fastest_lap` relationships to `Entries` supply the corresponding driver and car information, with `fastest_lap_time` from `Races` displaying the actual lap time. Podium finishers are derived by querying `Results` where `overall` = 2 and 3 for the given race. The `circuit` relationship populates the circuit name, location map, and thumbnail image. The `alias` field from `Races` generates the link to the full race report page.

---

## Teams Page (/teams)

### PeopleSection

- **Collections Used:**
  - `Drivers`
    - `name` (text, required)
    - `first_name` (text, required)
    - `last_name` (text, required)
    - `nickname` (text)
    - `competition_name` (text)
    - `identifiers.racing_number` (number)
    - `avatar` (upload → media)
    - `alias` (text, optional)
  - `Leaders`
    - `name` (text, required)
    - `first_name` (text, required)
    - `last_name` (text, required)
    - `title` (text)
    - `avatar` (upload → media)
    - `alias` (text, optional)
  - `Members`
    - `name` (text, required)
    - `first_name` (text, required)
    - `last_name` (text, required)
    - `description` (textarea)
    - `avatar` (upload → media)
    - `alias` (text, optional)

- **Final Data Fields:**
  - Person (union of Driver, Leader, Member):
    - `name` (text, required)
    - `first_name` (text, required)
    - `last_name` (text, required)
    - `displayName` (derived from `nickname` or `competition_name` or `title` or `first_name + last_name`)
    - `role` (derived: 'Driver', 'Leader', 'Member')
    - `avatar` (upload → media)
    - `alias` (text, optional) — used for slug URL
    - Additional Driver-specific: `identifiers.racing_number` (number)
    - Additional Leader-specific: `title` (text)
    - Additional Member-specific: `description` (textarea) — truncated for card

- **Purpose:** Provide a unified, filterable directory of all team personnel with consistent presentation across different roles.

- **Explanation:** This section merges three distinct collections (`Drivers`, `Leaders`, `Members`) into a single unified grid. Each person card displays a primary display name determined by priority logic: `nickname` (Drivers), `competition_name` (Drivers), `title + last_name` (Leaders), or `first_name + last_name` (fallback). The `avatar` field supplies the profile image. The `alias` field is critical for generating the individual slug page URL (e.g., `/teams/driver/[alias]`). Filter controls allow users to toggle visibility by collection type. Sorting options include alphabetical and role-based ordering. The grid is fully responsive and supports lazy loading of avatar images.

---

### SkillsSection

- **Collections Used:**
  - `Skills`
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (textarea)
    - `scale` (dropdown: narrow, moderate, broad, comprehensive)
    - `depth` (dropdown: basic, intermediate, advanced, expert)
    - `rarity` (dropdown: common, uncommon, rare, unique)
    - `complexity` (dropdown: low, medium, high, extreme)
  - `Trainings`
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (richtext)
    - `intensity` (radio: low, medium, high, extreme)
    - `format` (radio: individual, group, lecture, hands_on, simulated, remote, classroom)

- **Final Data Fields:**
  - Skill: `name` (text, required), `alias` (text, optional), `description` (textarea), `scale` (dropdown), `depth` (dropdown), `rarity` (dropdown), `complexity` (dropdown)
  - Associated Trainings (array): `name` (text, required), `alias` (text, optional), `intensity` (radio), `format` (radio)

- **Purpose:** Present a comprehensive overview of organizational capabilities, linking skills to development pathways.

- **Explanation:** This section renders a categorized grid of `Skills` entries. Each skill card prominently displays the skill `name`, with visual indicators for `scale` (breadth of application) and `depth` (mastery level) using iconography or color coding. The `rarity` and `complexity` fields provide additional context that can be revealed on hover or click. The `description` field offers a concise definition. The section also queries `Trainings` that are related to each skill (via a hypothetical join table or explicit relationship not shown in original schema—assumed here as a manual curation or embedded relationship), displaying associated training names, formats, and intensity levels. Each skill and training links to its respective detail page via `alias`.

---

### TeamSpiritSection

- **Collections Used:**
  - `Incidents`
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (textarea)
    - `date_time` (datetime)
    - `location` (map)
    - `thumbnail` (upload → media)
    - `video` (upload → media)
    - `gallery` (Files → alias)
  - `Celebrations`
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (textarea)
    - `date_time` (datetime)
    - `location` (map)
    - `thumbnail` (upload → media)
    - `video` (upload → media)
    - `gallery` (Files → alias)

- **Final Data Fields:**
  - Item (union of Incident and Celebration):
    - `type` (derived: 'Incident' or 'Celebration')
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (textarea)
    - `date_time` (datetime)
    - `location` (map)
    - `thumbnail` (upload → media)
    - `video` (upload → media)
    - `gallery` (Files → alias) — used for masonry grid images

- **Purpose:** Document and celebrate team culture through behind-the-scenes moments, humorous incidents, and shared achievements.

- **Explanation:** This section creates a masonry grid layout by combining entries from `Incidents` and `Celebrations` collections. The `type` field (derived from the collection origin) applies a visual badge (e.g., "Celebration" or "Incident") to each card. The `thumbnail` image serves as the primary grid item visual. Hovering reveals the `name`, `date_time`, and a short excerpt from `description`. Clicking a card navigates to the detail page via `alias`. The `gallery` field (Files collection) provides additional images that can be displayed in a lightbox when the grid item is expanded. The `video` field, if populated, replaces the static thumbnail with a video player preview. The `location` map data enables a future "Moments Map" view.

---

## Teams / Driver [slug] Page

### Career Statistics

- **Collections Used:**
  - `Results`
    - `overall` (number)
    - `class` (number)
    - `order` (number)
    - `laps` (number)
    - `time` (time)
    - `speed` (number)
    - `status` (dropdown: Official, Provisional, Corrected, Historic, Estimated, Certified, Void)
  - `Points`
    - `value` (number)
    - `scale` (dropdown: standard, inverse, logarithmic, multiplier, fixed)
    - `delta` (number)
  - `Awards`
    - `name` (text, required)
    - `description` (textarea)
    - `awarded_date` (date)

- **Final Data Fields:**
  - Career Totals (derived from `Results` aggregation):
    - `total_races` (count of Results records with `status` not DNF/DNS/DSQ)
    - `total_wins` (count of Results where `overall` = 1)
    - `total_podiums` (count of Results where `overall` <= 3)
    - `total_poles` (count of Entries where `grid_position` = 1)
    - `total_championships` (count of Championships where `winner` = this Driver)
    - `total_points` (sum of `Points.value`)
  - Awards Count: `total_awards` (count of `Awards` records)
  - Recent Performance Metrics: `avg_finish` (average of `Results.overall`), `best_finish` (minimum `overall`), `laps_led` (sum of relevant data, if tracked)

- **Purpose:** Quantify the driver's career achievements in a scannable statistics dashboard.

- **Explanation:** This section performs aggregations across `Results` and `Points` collections filtered to the current driver. The dashboard displays key metrics as large numerical cards with labels. `Results.overall` is used to calculate wins (position = 1) and podiums (position <= 3). `Results.status` filters out non-classified results for accurate race count. `Points.value` from all related point entries sums to the career points total. `Awards` count is derived from the relationship. Each statistic is clickable, navigating to a filtered view of the corresponding records (e.g., clicking "Wins" shows all race-winning results). The dashboard is updated in real-time as new results are added.

---

### Season-by-Season Results

- **Collections Used:**
  - `Seasons`
    - `name` (text, required)
    - `alias` (text, optional)
    - `series` (relationship → `Series`)
    - `entries` (number)
    - `races` (number)
  - `Results`
    - `overall` (number)
    - `class` (number)
    - `order` (number)
    - `laps` (number)
    - `time` (time)
    - `status` (dropdown: Official, Provisional, Corrected, Historic, Estimated, Certified, Void)
  - `Points`
    - `value` (number)
    - `before` (number)
    - `after` (number)
    - `delta` (number)

- **Final Data Fields:**
  - Season Row:
    - Season: `name` (text, required), `alias` (text, optional)
    - Series: `name` (text, required) via `Seasons.series`
    - Team: via `Entries` relationship to `Teams` (not explicitly in schema but implied through `Entries` context)
    - `races_entered` (number) from `Seasons.entries`
    - `wins` (derived count of `Results.overall` = 1 in this season)
    - `podiums` (derived count of `Results.overall` <= 3)
    - `points` (sum of `Points.value` for this season)
    - `final_position` (derived from `Points.after` or `Results` ranking)

- **Purpose:** Illustrate the driver's career progression year by year in a sortable, filterable table format.

- **Explanation:** This section renders a table where each row represents a single season of competition. Data is gathered by joining `Seasons`, `Results`, and `Points`. The `Seasons.name` identifies the year or season identifier. `Seasons.series` provides the championship context. For each season, `Results` are aggregated to count wins and podiums. `Points` are summed to show total points scored, and the `after` field from the final points entry for the driver yields their championship standing. The table supports sorting by any column (year, wins, points, etc.) and includes a detail expansion to show race-by-race results within that season. The `alias` field on `Seasons` creates a link to the season detail page.

---

### Cars Driven

- **Collections Used:**
  - `Cars`
    - `name` (text, required)
    - `alias` (text, optional)
    - `identifiers.chassis` (text)
    - `identifiers.model` (text)
    - `identifiers.version` (text)
    - `thumbnail` (upload → media)
    - `manufacturers` (relationship → `Organizations`)
  - `Entries`
    - `name` (text, required)
    - `session` (relationship → `Sessions`)
    - `status` (dropdown: Entered, Confirmed, Withdrawn, Disqualified, DidNotStart, DidNotFinish, Classified, NotClassified, Provisional, Excluded)
  - `Results`
    - `overall` (number)

- **Final Data Fields:**
  - Car Card:
    - `name` (text, required)
    - `alias` (text, optional)
    - `chassis` (text) from `identifiers.chassis`
    - `model` (text) from `identifiers.model`
    - `thumbnail` (upload → media)
    - `manufacturer_name` (text) via `manufacturers.name`
    - `years_driven` (derived from `Entries` date range via `Sessions` or `Events`)
    - `wins_in_car` (count of `Results.overall` = 1 where `Entries.car` = this Car)

- **Purpose:** Showcase the machinery the driver has competed with, emphasizing successful partnerships.

- **Explanation:** This grid displays each car the driver has entered with, using the `Entries` collection as the bridge. The `Cars` fields provide the car name, chassis/model identifiers, and thumbnail image. The `manufacturers` relationship fetches the constructor name. The date range of usage is inferred from the associated `Sessions` (via `Entries.session`) and their parent `Events.start_date`. The number of wins achieved in each car is calculated by counting `Results` where `overall` = 1 and the `Entries` record matches both driver and car. Clicking a car card navigates to the car detail page using `Cars.alias`. The grid is sorted chronologically by first usage.

---

## Teams / Leader [slug] Page

### Vision & Mission

- **Collections Used:**
  - `Leaders`
    - `vision` (textarea)
    - `mission` (textarea)

- **Final Data Fields:**
  - `vision` (textarea)
  - `mission` (textarea)

- **Purpose:** Articulate the leader's strategic direction and purpose in their own words.

- **Explanation:** This section presents two distinct cards side by side. The left card displays the `vision` statement—an aspirational, long-term description of what the leader aims to achieve. The right card displays the `mission` statement—a concrete, actionable declaration of how that vision will be pursued. Both fields are rich text (textarea) and support basic formatting (line breaks). The design uses distinct visual treatments (e.g., Vision with a subtle gradient, Mission with a solid background) to differentiate the concepts. The content is directly editable in the CMS and does not rely on any relationships.

---

### Guiding Principles

- **Collections Used:**
  - `Leaders`
    - `principles` (array)
      - `name` (text)
      - `description` (textarea)
      - `statement` (textarea)
      - `application` (textarea)
      - `rationale` (textarea)

- **Final Data Fields:**
  - Principles Array:
    - `name` (text)
    - `description` (textarea)
    - `statement` (textarea)
    - `application` (textarea)
    - `rationale` (textarea)

- **Purpose:** Communicate the core values and decision-making framework that guide the leader's actions.

- **Explanation:** This section iterates over the `principles` array field within the `Leaders` collection. Each principle is rendered as a card or accordion item. The `name` serves as the heading. The `statement` is displayed prominently as a short, memorable quote. The `description` provides a brief overview, while `application` explains how the principle is put into practice. The `rationale` field offers deeper insight into why the principle matters. The layout uses a grid (two or three columns) on larger screens, stacking vertically on mobile. This structured approach ensures consistent presentation of leadership philosophy.

---

### Skills & Awards

- **Collections Used:**
  - `Skills`
    - `name` (text, required)
    - `scale` (dropdown: narrow, moderate, broad, comprehensive)
    - `depth` (dropdown: basic, intermediate, advanced, expert)
    - `complexity` (dropdown: low, medium, high, extreme)
  - `Awards`
    - `name` (text, required)
    - `description` (textarea)
    - `awarded_date` (date)

- **Final Data Fields:**
  - Skills List (array):
    - `name` (text, required)
    - `scale` (dropdown)
    - `depth` (dropdown)
    - `complexity` (dropdown)
  - Awards List (array):
    - `name` (text, required)
    - `description` (textarea)
    - `awarded_date` (date)

- **Purpose:** Highlight the leader's professional capabilities and external recognition.

- **Explanation:** This section uses a two-column layout. The left column displays a list of related `Skills` entries (via a relationship from `Leaders` to `Skills`, assumed). Each skill shows the `name` with visual indicators (e.g., progress bars or icons) for `scale` and `depth`. The right column lists related `Awards` entries, showing the `name`, `awarded_date`, and a truncated `description`. Both lists are sorted with the most relevant items first. The skills link to the Skills detail page, and awards link to the Awards archive.

---

## Teams / Member [slug] Page

### Duties & Responsibilities

- **Collections Used:**
  - `Members`
    - `duties` (textarea)

- **Final Data Fields:**
  - `duties` (textarea)

- **Purpose:** Clearly define the member's role, tasks, and reporting structure within the organization.

- **Explanation:** This section renders the `duties` textarea content as rich text. It may include formatted lists, headings, and links. The field is expected to contain a structured breakdown of daily responsibilities, key projects, and team interactions. The design uses a clean, readable typography with ample white space to emphasize the content. Since it is a single field, the CMS editor has full control over the narrative and formatting.

---

### Skills & Training

- **Collections Used:**
  - `Skills`
    - `name` (text, required)
    - `scale` (dropdown: narrow, moderate, broad, comprehensive)
    - `depth` (dropdown: basic, intermediate, advanced, expert)
    - `complexity` (dropdown: low, medium, high, extreme)
  - `Trainings`
    - `name` (text, required)
    - `description` (richtext)
    - `intensity` (radio: low, medium, high, extreme)
    - `format` (radio: individual, group, lecture, hands_on, simulated, remote, classroom)

- **Final Data Fields:**
  - Skills List (array):
    - `name` (text, required)
    - `scale` (dropdown)
    - `depth` (dropdown)
    - `complexity` (dropdown)
  - Trainings List (array):
    - `name` (text, required)
    - `intensity` (radio)
    - `format` (radio)
    - `completion_status` (derived, if tracked separately)

- **Purpose:** Showcase the member's competencies and completed professional development programs.

- **Explanation:** Similar to the Leader page, this two-column layout displays `Skills` on the left and `Trainings` on the right. The skills are pulled from the `skills` relationship field on `Members` (defined in schema). Each skill is displayed with its `name` and visual representations of `scale` and `depth`. Trainings are pulled from the `trainings` relationship field, showing `name`, `intensity` badge, and `format` icon. If training completion status is tracked (e.g., via a join collection), a completion date or certificate indicator is shown. Both lists are linked to their respective detail pages via `alias`.

---

### Biography

- **Collections Used:**
  - `Members`
    - `description` (textarea)
    - `joining_date` (date)

- **Final Data Fields:**
  - `joining_date` (date)
  - `description` (textarea)

- **Purpose:** Provide a narrative professional history and background of the member.

- **Explanation:** This section displays the `joining_date` prominently near the top as a "Member Since" badge. The main content is the `description` field, rendered as rich text. The editor can include career highlights, previous roles, and personal anecdotes. The design uses a long-form reading layout with comfortable line height and font size. If the description is very long, it may be truncated with a "Read More" expander on mobile devices.

---

## Championships Page (/championships)

### Standings Table

- **Collections Used:**
  - `Seasons`
    - `name` (text, required)
    - `alias` (text, optional)
  - `Points`
    - `value` (number)
    - `after` (number)
  - `Results`
    - `overall` (number)
    - `class` (number)
    - `order` (number)
  - `Drivers`
    - `name` (text, required)
    - `first_name` (text, required)
    - `last_name` (text, required)
    - `identifiers.racing_number` (number)
  - `Teams`
    - `name` (text, required)
    - `alias` (text, optional)
    - `logo` (upload → media)

- **Final Data Fields:**
  - Driver Standings Row:
    - `position` (derived from `Points.after` sorting)
    - Driver: `name` (text, required), `first_name` (text, required), `last_name` (text, required), `identifiers.racing_number` (number)
    - Team: `name` (text, required) via current `Entries`
    - `points` (`Points.value` total)
    - `wins` (count of `Results.overall` = 1)
  - Team Standings Row:
    - `position` (derived from team points aggregation)
    - Team: `name` (text, required), `logo` (upload → media)
    - `points` (sum of `Points.value` for team's drivers)
    - `wins` (sum of wins by team's drivers)

- **Purpose:** Display the current competition standings for the active season with toggle between driver and team views.

- **Explanation:** This section features two tabbed tables: "Driver Standings" and "Team Standings." The active season is determined by the most recent `Season` with `end_date` >= today or the currently selected season via a dropdown. Data is aggregated from `Points` and `Results`. For drivers, `Points.value` is summed, and `after` determines ranking order. Wins are counted from `Results` where `overall` = 1. The driver's current team is fetched via the most recent `Entries` record. For teams, points from all their drivers are summed to create the team standings. The table includes visual indicators for position changes (using `Points.delta` if available) and links to driver/team detail pages via `alias`. The design is responsive, with a horizontal scroll on mobile.

---

### SeasonRecapSection

- **Collections Used:**
  - `Seasons`
    - `name` (text, required)
    - `alias` (text, optional)
    - `races` (number)
    - `entries` (number)
  - `Results`
    - `overall` (number)
  - `Points`
    - `value` (number)
    - `delta` (number)
  - `Awards`
    - `name` (text, required)
    - `description` (textarea)

- **Final Data Fields:**
  - Season Recap:
    - Season: `name` (text, required), `alias` (text, optional)
    - Champion Driver: `name`, `first_name`, `last_name`, `avatar` (via relationship from `Championships.winner` or points ranking)
    - Runner-up Driver: same as above
    - Points Margin: `Points.delta` (number) between 1st and 2nd
    - Total Races: `Seasons.races` (number)
    - Total Entries: `Seasons.entries` (number)
    - Key Statistic: e.g., most wins, most poles (derived from `Results`)
    - Highlight Reel: video URL or media (not explicitly in schema, could be from `Seasons.highlights` Files field)

- **Purpose:** Provide a retrospective summary of a completed season, celebrating the champion and key statistics.

- **Explanation:** This section appears when viewing a past season or as a featured block on the championships landing page. It pulls data from the selected `Season`. The champion and runner-up are determined by final points standings (`Points.after`). The points margin (`delta`) is displayed prominently. Basic season statistics like total races and entries are shown from the `Seasons` fields. Additional derived stats (e.g., driver with most wins) add depth. The "Highlight Reel" can be populated from `Seasons.highlights` (Files alias) or a related video. The champion's name and image link to their driver page.

---

### Championship Timeline

- **Collections Used:**
  - `Championships`
    - `name` (text, required)
    - `alias` (text, optional)
  - `Seasons`
    - `name` (text, required)
    - `alias` (text, optional)
    - `start_date` (date)
    - `end_date` (date)
  - `Results` (via season winner)
    - `overall` (number)

- **Final Data Fields:**
  - Timeline Item:
    - `year` (derived from `Seasons.name` or `start_date`)
    - `champion_driver_name` (text) via points/winner
    - `runner_up_driver_name` (text)
    - `points_gap` (number) derived from `Points.delta`

- **Purpose:** Visualize the historical lineage of the championship, showcasing past champions and competitive margins.

- **Explanation:** This horizontal scrollable timeline presents each season of the championship as a node. The `Seasons` collection provides the list, sorted chronologically by `start_date`. For each season, the champion and runner-up are identified from the final points standings. The `points_gap` is the difference in points between first and second. Each node displays the season year, champion name, and gap. Clicking a node navigates to that season's detail page using `Seasons.alias`. The timeline design is interactive, with hover effects and a progress indicator showing the current position in the championship's history.

---

## Championships / Championship [slug] Page

### Regulations & Format

- **Collections Used:**
  - `Championships`
    - `regulations` (relationship → `Regulations`)
    - `format` (textarea)
    - `points_system` (relationship → `Points`)
  - `Regulations`
    - `name` (text, required)
    - `description` (textarea)
    - `code` (text)
    - `version` (text)
    - `document` (alias → files)
  - `Points` (via `points_system`)
    - `scale` (dropdown: standard, inverse, logarithmic, multiplier, fixed)
    - `value` (number) — used to display points table structure

- **Final Data Fields:**
  - Regulations: `name` (text, required), `description` (textarea), `code` (text), `version` (text), `document` (file)
  - Championship Format: `format` (textarea)
  - Points System Summary: derived from `Points` collection (e.g., 1st = 25 pts, 2nd = 18 pts, etc.)
  - Special Rules: extracted from `Regulations.description` or separate field

- **Purpose:** Provide a clear, accessible overview of the championship's competitive framework and governing rules.

- **Explanation:** This section is divided into subsections. The "Points System" subsection uses the related `Points` records to build a visual table showing points awarded for each finishing position. The `scale` field indicates if the system is standard, inverse, etc. The "Qualifying & Race Format" subsection renders the `format` textarea content. The "Regulations" subsection displays the linked `Regulations` document name, version, and effective date, with a download button for the `document` file. All information is presented in an easy-to-digest format with collapsible sections for mobile.

---

### Season List

- **Collections Used:**
  - `Seasons`
    - `name` (text, required)
    - `alias` (text, optional)
    - `races` (number)
    - `series` (relationship → `Series`)
    - `cover` (upload → media)

- **Final Data Fields:**
  - Season Card:
    - `name` (text, required)
    - `alias` (text, optional)
    - `races` (number)
    - `cover` (upload → media)
    - Champion Driver: derived from points (via relationship or separate query)
    - Champion Team: derived from points

- **Purpose:** Serve as an index of all seasons within the championship, enabling navigation to historical data.

- **Explanation:** This grid displays all `Seasons` related to the current championship. Each card features the season `name` (e.g., "2024 Season"), a `cover` image, and the number of races (`races`). The champion driver and team are queried from the points standings and displayed as text. The `alias` field generates the link to the individual season page. The grid is sorted reverse-chronologically (`start_date` descending) to show recent seasons first.

---

### Championship History

- **Collections Used:**
  - `Championships`
    - `history` (richtext)

- **Final Data Fields:**
  - `history` (richtext)

- **Purpose:** Narrate the rich heritage and evolution of the championship.

- **Explanation:** This section renders the `history` richtext field in its entirety. The content may include embedded images, videos, and formatted text. It covers the founding story, notable eras, dominant teams/drivers, and significant rule changes. The design uses a long-form article layout with drop caps, pull quotes, and inline media. This is a static content block managed directly in the championship's CMS entry.

---

## Championships / Season [slug] Page

### Calendar

- **Collections Used:**
  - `Races`
    - `name` (text, required)
    - `alias` (text, optional)
    - `start_date` (datetime)
    - `circuit` (relationship → `Circuits`)
    - `winner` (relationship → `Drivers`)
    - `status` (dropdown: scheduled, ongoing, completed, cancelled, postponed)
  - `Events`
    - `name` (text, required)
    - `alias` (text, optional)
    - `start_date` (date)
    - `end_date` (date)
  - `Circuits`
    - `name` (text, required)
    - `alias` (text, optional)
    - `location` (map)
    - `thumbnail` (upload → media)

- **Final Data Fields:**
  - Race Row:
    - `round` (number, derived from order)
    - `race_name` (text) from `Races.name`
    - `circuit_name` (text) from `Circuits.name`
    - `circuit_location` (map) from `Circuits.location`
    - `date` (datetime) from `Races.start_date`
    - `winner_driver_name` (text) from `Drivers` (if `status` = completed)
    - `status` (dropdown)

- **Purpose:** Present the complete race schedule for the season with results where available.

- **Explanation:** This vertical list displays each race in round order. Data is primarily from `Races`, enriched with `Circuits` information. For completed races (`status` = 'completed'), the `winner` relationship fetches the driver name. For upcoming races, the `status` badge indicates 'Scheduled' or 'Postponed'. The `alias` fields on `Races` and `Circuits` create links to their respective detail pages. The `location` map field can be used to render a small inline map preview. The list is highly scannable and includes visual separators between race weekends.

---

### Standings

- **Collections Used:**
  - `Points`
    - `value` (number)
    - `after` (number)
    - `delta` (number)
  - `Results`
    - `overall` (number)
    - `class` (number)
    - `order` (number)
    - `status` (dropdown: Official, Provisional, Corrected, Historic, Estimated, Certified, Void)
  - `Drivers`
    - `name` (text, required)
    - `first_name` (text, required)
    - `last_name` (text, required)
    - `identifiers.racing_number` (number)
    - `nationality` (country selector)
  - `Teams`
    - `name` (text, required)
    - `alias` (text, optional)
    - `logo` (upload → media)

- **Final Data Fields:**
  - Driver Standings Row:
    - `position` (derived from `Points.after` sorting)
    - `driver_name` (text) from `Drivers`
    - `racing_number` (number)
    - `nationality` (country)
    - `team_name` (text) via current `Entries`
    - `points` (`Points.value` total)
    - `wins` (count of `Results.overall` = 1)
  - Team Standings Row:
    - `position` (derived from team points aggregation)
    - `team_name` (text), `logo` (media)
    - `points` (sum of `Points.value` for team's drivers)
    - `wins` (sum of wins by team's drivers)

- **Purpose:** Display the final (or current) championship standings for both drivers and teams.

- **Explanation:** Identical in structure to the Championships page standings table, but filtered to the specific season. Tabs toggle between driver and team views. The table includes columns for position, driver/team name, points, and wins. Position change indicators may be shown if `Points.delta` or historical comparison data is available. The table is sortable by column (though default is position order). Each driver/team row links to their respective slug page.

---

### Race Results

- **Collections Used:**
  - `Races`
    - `name` (text, required)
    - `alias` (text, optional)
    - `start_date` (datetime)
    - `winner` (relationship → `Drivers`)
    - `pole_position` (relationship → `Entries`)
    - `fastest_lap` (relationship → `Entries`)
    - `fastest_lap_time` (time)
  - `Results`
    - `overall` (number)
    - `class` (number)
    - `order` (number)
    - `laps` (number)
    - `time` (time)
    - `interval` (number)
    - `gap` (number)

- **Final Data Fields:**
  - Race Results Row:
    - `round` (number, derived from order)
    - `race_name` (text) from `Races.name`
    - `winner_driver` (text) from `Drivers`
    - `winner_team` (text) from `Teams` via `Entries`
    - `pole_driver` (text) from `Entries` relationship
    - `fastest_lap_driver` (text) from `Entries` relationship
    - `fastest_lap_time` (time)

- **Purpose:** Provide a race-by-race summary of outcomes within the season.

- **Explanation:** This sortable table lists every race in the season with key result highlights. The `Races` collection provides the race name and date. The `winner` relationship yields the winning driver, and through that driver's `Entries` record, the winning team is derived. The `pole_position` and `fastest_lap` relationships provide the respective driver names. The `fastest_lap_time` is displayed directly. The table is compact yet informative, with each race name linking to the full race report page via `Races.alias`.

---

## Races Page (/races)

### CalendarSection

- **Collections Used:**
  - `Races`
    - `name` (text, required)
    - `alias` (text, optional)
    - `start_date` (datetime)
    - `end_date` (datetime)
    - `status` (dropdown: scheduled, ongoing, completed, cancelled, postponed)
    - `type` (dropdown: sprint, feature, qualifying_race, heat, final, knockout)
    - `circuit` (relationship → `Circuits`)
  - `Events`
    - `name` (text, required)
    - `alias` (text, optional)
    - `start_date` (date)
    - `end_date` (date)
    - `status` (dropdown: Scheduled, Confirmed, Completed, Cancelled, Postponed, Abandoned)
    - `location` (map)
  - `Sessions`
    - `name` (text, required)
    - `alias` (text, optional)
    - `segment` (text)
  - `Circuits`
    - `name` (text, required)
    - `alias` (text, optional)
    - `location` (map)
    - `thumbnail` (upload → media)

- **Final Data Fields:**
  - Calendar Event Card:
    - `event_name` (text) from `Events.name`
    - `race_name` (text) from `Races.name`
    - `circuit_name` (text) from `Circuits.name`
    - `circuit_location` (map)
    - `start_date` (datetime) from `Races.start_date`
    - `end_date` (datetime) from `Races.end_date`
    - `status` (dropdown)
    - `session_times` (list of `Sessions` with `segment` and start times — assumed available via date/time fields not shown, but inferred)
    - `thumbnail` (media) from `Circuits.thumbnail`

- **Purpose:** Provide an interactive calendar view of upcoming and past race weekends with session schedules.

- **Explanation:** This section renders a calendar or chronological list of race events. Data is aggregated from `Events`, `Races`, and `Circuits`. The `Events` collection groups race weekends, while `Races` provides the specific race details. `Sessions` linked to the event/race supply practice, qualifying, and race times. The `status` field determines visual styling (e.g., green for completed, blue for scheduled). The `location` map field can be used to show a mini-map. Clicking an event expands it to reveal the full session schedule. The `alias` fields generate links to event/race detail pages.

---

### ConquestsSection

- **Collections Used:**
  - `Events`
    - `location` (map)
  - `Circuits`
    - `name` (text, required)
    - `location` (map)
  - `Results`
    - `overall` (number)
    - `status` (dropdown: Official, Provisional, Corrected, Historic, Estimated, Certified, Void)

- **Final Data Fields:**
  - Map Marker:
    - `circuit_name` (text) from `Circuits.name`
    - `coordinates` (from `Circuits.location` or `Events.location`)
    - `best_result` (derived: 'Win', 'Podium', 'Points', etc. from `Results` aggregated by team/driver)
    - `win_loss_record` (derived: wins vs total races at this circuit)

- **Purpose:** Visualize the team's performance across different circuits on an interactive map.

- **Explanation:** This interactive map plots circuits where the team has competed. Data is pulled from `Circuits.location` (or `Events.location` if circuit-specific). Each marker's color or icon represents the best result achieved (e.g., gold for win). Hovering a marker displays the circuit name and a summary of results (wins/podiums). The map is built using a mapping library (e.g., Mapbox) and consumes GeoJSON data derived from the `location` field. The map supports zoom, pan, and filtering by championship or year.

---

### SessionHighlightsSection

- **Collections Used:**
  - `Sessions`
    - `name` (text, required)
    - `alias` (text, optional)
    - `segment` (text)
  - `Entries`
    - `name` (text, required)
    - `grid_position` (number)
    - `finish_position` (number)
  - `Results`
    - `overall` (number)
    - `time` (time)
    - `gap` (number)

- **Final Data Fields:**
  - Highlight Card:
    - `session_type` (text) from `Sessions.segment`
    - `circuit_name` (text) via `Sessions` parent `Event` → `Circuit`
    - `key_metric` (text/number) e.g., "Pole time: 1:23.456" from `Entries`/`Results`
    - `thumbnail` (media) from `Sessions.thumbnail` (if available) or fallback

- **Purpose:** Capture and display critical moments from practice, qualifying, and race sessions.

- **Explanation:** This filterable feed displays session highlights. Each card represents a `Session` and displays its `segment` type (e.g., "Qualifying"). The key metric is derived from the session's `Entries` or `Results`: for qualifying, it's the pole position time; for race, it's the winner's margin or fastest lap. The `thumbnail` field from `Sessions` provides a visual. The feed can be filtered by session type or event. Clicking a card opens a detailed session view with full results.

---

## Races / Race [slug] Page

### Session Breakdown

- **Collections Used:**
  - `Sessions`
    - `name` (text, required)
    - `alias` (text, optional)
    - `segment` (text)
  - `Entries`
    - `name` (text, required)
    - `grid_position` (number)
    - `finish_position` (number)
    - `status` (dropdown: Entered, Confirmed, Withdrawn, Disqualified, DidNotStart, DidNotFinish, Classified, NotClassified, Provisional, Excluded)
  - `Results`
    - `overall` (number)
    - `class` (number)
    - `order` (number)
    - `time` (time)
    - `gap` (number)
    - `interval` (number)

- **Final Data Fields:**
  - Qualifying Tab Table:
    - `grid_position` (number) from `Entries`
    - `driver_name` (text) via `Entries` → `Drivers`
    - `team_name` (text) via `Entries` → `Teams`
    - `lap_time` (time) from `Results.time` for qualifying session
    - `gap` (number)
  - Race Tab Table:
    - `position` (number) from `Results.overall`
    - `driver_name` (text)
    - `team_name` (text)
    - `gap` (number) / `interval` (number)
    - `laps` (number) from `Results.laps`
    - `status` (dropdown) from `Entries.status`

- **Purpose:** Provide detailed session results with tabs for Practice, Qualifying, and Race.

- **Explanation:** This tabbed interface segregates results by session type. The "Qualifying" tab displays the grid order using `Entries.grid_position` and the corresponding lap time from `Results` for that session. The "Race" tab shows the final classification with columns for position, driver, team, gap, and status (e.g., DNF, +1 Lap). Data is aggregated from `Sessions`, `Entries`, and `Results`, joined on the current race. Tabs are only shown if the corresponding session data exists.

---

### Entry List

- **Collections Used:**
  - `Entries`
    - `name` (text, required)
    - `identifiers.number` (text)
    - `identifiers.plate` (text)
    - `status` (dropdown: Entered, Confirmed, Withdrawn, Disqualified, DidNotStart, DidNotFinish, Classified, NotClassified, Provisional, Excluded)
  - `Drivers` (via `Entries` relationship)
    - `name` (text, required)
    - `first_name` (text, required)
    - `last_name` (text, required)
  - `Cars` (via `Entries` relationship)
    - `name` (text, required)
    - `identifiers.chassis` (text)
    - `identifiers.model` (text)
  - `Teams` (via `Entries` relationship)
    - `name` (text, required)

- **Final Data Fields:**
  - Entry Row:
    - `car_number` (text) from `Entries.identifiers.number`
    - `driver_name` (text) from `Drivers`
    - `car_name` (text) from `Cars.name` (or chassis/model)
    - `team_name` (text) from `Teams.name`
    - `entry_status` (dropdown) from `Entries.status`

- **Purpose:** List all participants entered for the race weekend with their car numbers and status.

- **Explanation:** This table displays all `Entries` records for the race. The `identifiers.number` field provides the car number. The `driver` relationship fetches the driver name. The `car` relationship provides the car model. The `team` relationship (inferred through `Entries` or `Cars`) shows the team name. The `status` field indicates if the entry is confirmed, withdrawn, etc. The table is sortable and includes a search input.

---

### Incident Report

- **Collections Used:**
  - `Incidents`
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (textarea)
    - `story` (richtext)
    - `cars` (relationship → `Cars[]`)
    - `drivers` (relationship → `Drivers[]`)
  - `Cars` (via `Incidents.cars`)
    - `name` (text, required)
  - `Drivers` (via `Incidents.drivers`)
    - `name` (text, required)
    - `first_name` (text, required)
    - `last_name` (text, required)

- **Final Data Fields:**
  - Incident Row:
    - `lap` (number, if stored in `Incidents` story/description — not explicitly in schema, so assumed from text)
    - `type` (derived from `Incidents.name` or categorization)
    - `involved_drivers` (array of `Drivers` names)
    - `description` (textarea)
    - `outcome` (extracted from `story` richtext)

- **Purpose:** Document on-track incidents involving multiple cars/drivers during the race.

- **Explanation:** This list displays all `Incidents` records linked to the current race (relationship implied). Each row shows the lap number (if parsed from description), the type/category of incident, the involved drivers (via the `drivers` relationship), and a brief description. Clicking an incident opens a modal or navigates to the incident detail page (`alias`) to show the full `story` richtext. The `cars` relationship can provide additional context about damage or mechanical issues.

---

## Races / Circuit [slug] Page

### History & Records

- **Collections Used:**
  - `Circuits`
    - `history` (richtext)
    - `record_lap_time` (time)
    - `record_lap_driver` (relationship → `Drivers`)
    - `record_lap_year` (date)
  - `Drivers` (via `record_lap_driver`)
    - `name` (text, required)
    - `first_name` (text, required)
    - `last_name` (text, required)

- **Final Data Fields:**
  - Circuit History: `history` (richtext)
  - Lap Record Box:
    - `record_lap_time` (time)
    - `driver_name` (text) from `Drivers`
    - `record_lap_year` (date)

- **Purpose:** Highlight the circuit's heritage and its ultimate performance benchmark.

- **Explanation:** This section splits into two parts. The left (or top) displays the `history` richtext, narrating the circuit's opening, major events, and modifications. The right (or bottom) features a prominent "Lap Record" box displaying the `record_lap_time`, the `driver_name` via the relationship, and the `record_lap_year`. The driver name links to their profile. The design uses a card with a contrasting background to make the record stand out.

---

### Race Winners History

- **Collections Used:**
  - `Races`
    - `name` (text, required)
    - `start_date` (datetime)
    - `winner` (relationship → `Drivers`)
  - `Results`
    - `overall` (number)
    - `gap` (number)
  - `Drivers` (via `Races.winner`)
    - `name` (text, required)
    - `first_name` (text, required)
    - `last_name` (text, required)

- **Final Data Fields:**
  - Winner Row:
    - `year` (derived from `Races.start_date`)
    - `race_name` (text) from `Races.name`
    - `winner_driver_name` (text) from `Drivers`
    - `winner_team_name` (text) via `Entries` relationship
    - `winning_margin` (number) from `Results.gap` (if winner's result)

- **Purpose:** Provide a historical list of all race winners at this circuit.

- **Explanation:** This sortable table lists every `Race` held at the circuit. The `Races` collection provides the event name and date. The `winner` relationship fetches the driver name. The winning team is retrieved via the driver's `Entries` record for that race. The winning margin (`gap` from `Results` where `overall` = 1) is displayed. The table can be filtered by championship/series. Each row links to the respective race report page.

---

### Circuit Map & Layout

- **Collections Used:**
  - `Circuits`
    - `circuit_map` (upload → media)
    - `length_km` (number)
    - `length_miles` (number)
    - `turns` (number)
    - `drs_zones` (number)
    - `elevation_change` (number)
    - `direction` (dropdown: clockwise, anticlockwise)

- **Final Data Fields:**
  - `circuit_map` (media)
  - `length_km` (number)
  - `length_miles` (number)
  - `turns` (number)
  - `drs_zones` (number)
  - `elevation_change` (number)
  - `direction` (dropdown)

- **Purpose:** Visualize the circuit layout and communicate its physical characteristics.

- **Explanation:** This section centers on the `circuit_map` image, which may be an interactive SVG or a static image with numbered corners. Overlaid or adjacent text displays key metrics: total length (in km and miles), number of turns, DRS zones count, elevation change, and direction. The layout is designed for quick reference, with icons accompanying each metric. The map image can be expanded to a full-screen lightbox.

---

## Operations Page (/operations)

### Meetup Hub

- **Collections Used:**
  - `Meetups`
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (textarea)
    - `format` (radio: in_person, virtual, hybrid)
    - `access` (radio: public, invite_only, private, exclusive)
    - `start_date` (datetime)
    - `end_date` (datetime)
    - `locations` (map)
    - `thumbnail` (upload → media)

- **Final Data Fields:**
  - Meetup Card:
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (textarea) — truncated
    - `format` (radio)
    - `access` (radio)
    - `start_date` (datetime)
    - `location_summary` (derived from `locations` map)
    - `thumbnail` (upload → media)

- **Purpose:** Showcase community gatherings and provide registration information.

- **Explanation:** This grid displays all upcoming and past `Meetups`. Each card features the `name`, date/time, `format` badge (in-person/virtual/hybrid), and `access` level. The `description` is truncated to two lines. The `thumbnail` provides visual interest. The `locations` map field can be used to display a city/country string. Clicking a card navigates to the meetup detail page using `alias`. A filter bar allows toggling between upcoming and past events.

---

### Initiative Dashboard

- **Collections Used:**
  - `Initiatives`
    - `name` (text, required)
    - `alias` (text, optional)
    - `tagline` (textarea)
    - `mission` (textarea)
    - `description` (textarea)
    - `start_date` (date)
    - `end_date` (date)
    - `thumbnail` (upload → media)

- **Final Data Fields:**
  - Initiative Card:
    - `name` (text, required)
    - `alias` (text, optional)
    - `tagline` (textarea)
    - `mission` (textarea)
    - `start_date` (date)
    - `end_date` (date)
    - `progress` (derived from completion of linked `Plans` or manual status)
    - `thumbnail` (upload → media)

- **Purpose:** Provide visibility into strategic projects and their current status.

- **Explanation:** This grid displays active `Initiatives`. Each card shows the initiative `name`, `tagline`, and date range. A progress bar (if status/progress is tracked via related `Plans` or a separate field) indicates completion. The `mission` field can be shown on hover or in an expanded state. Clicking a card navigates to the initiative detail page. The grid can be filtered by status or department.

---

### Training Catalog

- **Collections Used:**
  - `Trainings`
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (richtext)
    - `intensity` (radio: low, medium, high, extreme)
    - `format` (radio: individual, group, lecture, hands_on, simulated, remote, classroom)
  - `Skills` (via relationship, assumed)
    - `name` (text, required)

- **Final Data Fields:**
  - Training Card:
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (richtext) — excerpt
    - `intensity` (radio)
    - `format` (radio)
    - `associated_skills` (array of `Skills.name`)

- **Purpose:** Present available development programs and their associated competencies.

- **Explanation:** This grid lists all `Trainings` available. Each card highlights the training `name`, `intensity` badge, `format` icon, and a short description excerpt. The `associated_skills` (via a relationship field not explicitly defined in the original `Trainings` schema but logical) are displayed as tags. The `alias` field links to the full training detail page. The grid includes search and filter by intensity, format, or skill.

---

## Operations / Meetup [slug] Page

### Hosts & Attendees

- **Collections Used:**
  - `Meetups`
    - `hosts` (group)
      - `organizations` (relationship → `Organizations[]`)
      - `leaders` (relationship → `Leaders[]`)
      - `individuals` (relationship → `Individuals[]`)
    - `attendees` (group)
      - `drivers` (relationship → `Drivers[]`)
      - `members` (relationship → `Members[]`)
      - `leaders` (relationship → `Leaders[]`)
      - `individuals` (relationship → `Individuals[]`)
      - `organizations` (relationship → `Organizations[]`)

- **Final Data Fields:**
  - Hosts Grid:
    - Organizations: `name` (text), `logo` (media)
    - Leaders: `name` (text), `title` (text), `avatar` (media)
    - Individuals: `name` (text), `type` (radio), `avatar` (media)
  - Attendees Grid:
    - Drivers: `name` (text), `avatar` (media)
    - Members: `name` (text), `avatar` (media)
    - Leaders: `name` (text), `avatar` (media)
    - Individuals: `name` (text), `avatar` (media)
    - Organizations: `name` (text), `logo` (media)

- **Purpose:** Display all organizers and participants involved in the meetup.

- **Explanation:** This section splits into two sub-sections: "Hosts" and "Attendees." Each sub-section renders a grid of avatars/logos with names and roles. Data is pulled directly from the `hosts` and `attendees` group fields within the `Meetups` collection. The `Organizations` entries show the `logo`; all person types show the `avatar`. Hovering reveals the full name and role/type. Clicking navigates to the respective entity's detail page.

---

### Schedule

- **Collections Used:**
  - `Meetups`
    - `start_date` (datetime)
    - `end_date` (datetime)
    - `notes` (textarea) — possibly containing agenda details

- **Final Data Fields:**
  - Schedule Timeline:
    - `start_date` (datetime)
    - `end_date` (datetime)
    - `agenda_items` (derived from `notes` or separate array not in schema, so assumed parsed)

- **Purpose:** Outline the event's agenda and timing.

- **Explanation:** This section presents a timeline of activities during the meetup. The `start_date` and `end_date` provide the overall timeframe. If agenda details are stored in `notes` or a structured array, they are rendered as a vertical timeline with time slots and descriptions. Otherwise, the `notes` field is displayed as rich text. The design uses a clean, chronological layout with icons for different activity types.

---

### Media Gallery

- **Collections Used:**
  - `Meetups`
    - `gallery` (Files → alias)
    - `video` (upload → media)
    - `cover` (upload → media)

- **Final Data Fields:**
  - Gallery Images: array from `gallery` Files
  - Featured Video: `video` (media)
  - Cover Image: `cover` (media)

- **Purpose:** Document the meetup through photos and videos.

- **Explanation:** This masonry grid displays images from the `gallery` Files field. If a `video` is uploaded, it is featured prominently at the top. The `cover` image may serve as the first item or a hero. The grid supports lightbox expansion for full-size viewing. The design is responsive and prioritizes visual storytelling.

---

## Operations / Initiative [slug] Page

### Expectations

- **Collections Used:**
  - `Initiatives`
    - `expectations` (array)
      - `name` (text)
      - `type` (dropdown)
      - `criteria` (textarea)
      - `statement` (textarea)

- **Final Data Fields:**
  - Expectations List:
    - `name` (text)
    - `type` (dropdown)
    - `criteria` (textarea)
    - `statement` (textarea)

- **Purpose:** Define the success criteria and expected outcomes of the initiative.

- **Explanation:** This section iterates over the `expectations` array field. Each expectation is displayed as a card with the `name` as heading, a `type` badge, the `statement` as a quote, and the `criteria` as bullet points or a paragraph. The layout uses a grid, with each card having a distinct visual treatment based on `type`. This clarity helps stakeholders understand what the initiative aims to achieve.

---

### Timeline

- **Collections Used:**
  - `Initiatives`
    - `start_date` (date)
    - `end_date` (date)

- **Final Data Fields:**
  - `start_date` (date)
  - `end_date` (date)

- **Purpose:** Show the project's duration and key milestones.

- **Explanation:** A horizontal timeline bar shows the overall project span from `start_date` to `end_date`. Key milestones (if stored in a related collection like `Plans.milestones` or a separate array) are plotted along the timeline. If no milestones are directly linked, only the date range is displayed with a progress indicator based on current date. The design is minimal and provides at-a-glance temporal context.

---

### Stakeholders

- **Collections Used:**
  - `Initiatives`
    - (Implied relationships to `Organizations`, `Leaders`, `Individuals` not explicitly in original schema for Initiatives, but logical to include; if not present, section may be omitted or use `partners` from `Programs` style)

- **Final Data Fields:**
  - Stakeholder Grid: (if relationships exist)
    - Organizations: `name`, `logo`
    - Leaders: `name`, `title`, `avatar`
    - Individuals: `name`, `type`, `avatar`

- **Purpose:** Highlight the people and organizations driving the initiative.

- **Explanation:** This grid displays avatars/logos of key stakeholders involved in the initiative. The data source depends on the schema—if `Initiatives` has relationship fields for stakeholders, those are used. Otherwise, this section may be static or manually curated. Each stakeholder links to their respective detail page.

---

## Operations / Training [slug] Page

### Specifications & Skills

- **Collections Used:**
  - `Trainings`
    - `specifications` (array)
      - `parameter` (text)
      - `value` (text)
      - `description` (textarea)
  - `Skills` (via relationship, assumed)
    - `name` (text, required)
    - `scale` (dropdown: narrow, moderate, broad, comprehensive)
    - `depth` (dropdown: basic, intermediate, advanced, expert)

- **Final Data Fields:**
  - Specifications List:
    - `parameter` (text)
    - `value` (text)
    - `description` (textarea)
  - Skills List:
    - `name` (text)
    - `scale` (dropdown)
    - `depth` (dropdown)

- **Purpose:** Detail the technical parameters of the training and the skills it develops.

- **Explanation:** This section uses a two-column layout. The left column lists the `specifications` array as a definition list (parameter: value), with optional `description` expanding on each. The right column displays related `Skills` with visual indicators for `scale` and `depth`. This structured format helps participants understand the training's focus and requirements.

---

### Expectations

- **Collections Used:**
  - `Trainings`
    - `expectations` (array)
      - `name` (text)
      - `type` (dropdown)
      - `criteria` (textarea)
      - `statement` (textarea)

- **Final Data Fields:**
  - Expectations List:
    - `name` (text)
    - `type` (dropdown)
    - `criteria` (textarea)
    - `statement` (textarea)

- **Purpose:** Outline what participants will achieve or be assessed on.

- **Explanation:** Similar to Initiatives, this section iterates over the `expectations` array. Each expectation is rendered as a card with clear `type` categorization. The `criteria` field provides measurable outcomes, while the `statement` gives a broader description. The design uses icons and color coding to differentiate expectation types.

---

### Schedule

- **Collections Used:**
  - `Trainings`
    - `start_date` (date)
    - `end_date` (date)
    - `intensity` (radio: low, medium, high, extreme)
    - `format` (radio: individual, group, lecture, hands_on, simulated, remote, classroom)

- **Final Data Fields:**
  - `start_date` (date)
  - `end_date` (date)
  - `duration` (derived from start/end)
  - `intensity` (radio)
  - `format` (radio)

- **Purpose:** Communicate the timing, duration, and delivery method of the training.

- **Explanation:** This section displays the training's `start_date` and `end_date`, the calculated duration, and the `format` and `intensity` badges. If the training is self-paced, the date range may be optional. The information is presented in a compact card or sidebar, making it easy for participants to plan their schedule.

---

## Outcomes Page (/outcomes)

### Awards Archive

- **Collections Used:**
  - `Awards`
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (textarea)
    - `awarded_date` (date)
    - `awarded_location` (json)
    - `thumbnail` (upload → media)

- **Final Data Fields:**
  - Award Card:
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (textarea) — excerpt
    - `awarded_date` (date)
    - `recipient_name` (derived from relationship to recipient, e.g., Driver/Team — not explicitly in Award schema, so maybe from context)
    - `thumbnail` (upload → media)

- **Purpose:** Create a searchable archive of all team and individual accolades.

- **Explanation:** This sortable grid displays all `Awards`. Each card shows the award `name`, `awarded_date`, recipient (if relationship exists), and a `thumbnail`. The `description` is truncated. Filters allow sorting by date, type, or recipient. Clicking a card navigates to the award detail page via `alias`. The `awarded_location` JSON can be used to display a location string.

---

### Celebration Gallery

- **Collections Used:**
  - `Celebrations`
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (textarea)
    - `date_time` (datetime)
    - `location` (map)
    - `thumbnail` (upload → media)
    - `video` (upload → media)
    - `gallery` (Files → alias)
  - `Leaders` (via `celebrations.leaders` relationship)
    - `name` (text)
  - `Drivers` (via `celebrations.drivers` relationship)
    - `name` (text)

- **Final Data Fields:**
  - Celebration Card:
    - `name` (text, required)
    - `alias` (text, optional)
    - `date_time` (datetime)
    - `location_summary` (from `location` map)
    - `thumbnail` (upload → media)
    - `featured_people` (derived from `leaders` and `drivers` relationships)

- **Purpose:** Showcase team celebrations and morale events in a visually rich gallery.

- **Explanation:** This masonry grid highlights `Celebrations` with large, engaging images. Each card displays the celebration `name`, date, and a few featured participants' names (from the `leaders` and `drivers` relationships). Hovering reveals a longer `description` excerpt. The `gallery` field provides additional images for a lightbox view. The `video` field, if present, plays inline or in a modal. The grid is filterable by year or event type.

---

### Incident Log

- **Collections Used:**
  - `Incidents`
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (textarea)
    - `date_time` (datetime)
    - `location` (map)
    - `cars` (relationship → `Cars[]`)
    - `drivers` (relationship → `Drivers[]`)
    - `thumbnail` (upload → media)

- **Final Data Fields:**
  - Incident Row:
    - `name` (text, required)
    - `date_time` (datetime)
    - `circuit` (derived from `location` or related race)
    - `involved_drivers` (array of `Drivers.name`)
    - `description` (textarea) — truncated
    - `thumbnail` (upload → media)

- **Purpose:** Maintain a log of all on-track incidents for reference and analysis.

- **Explanation:** This sortable list displays all `Incidents` records. Each row includes the incident `name`, date, circuit, involved drivers (via relationship), and a brief `description`. The `thumbnail` can be used as a small preview icon. Filters allow narrowing by driver, circuit, or date range. Clicking a row navigates to the incident detail page (`alias`).

---

## Outcomes / Award [slug] Page

### Story & Citation

- **Collections Used:**
  - `Awards`
    - `story` (richtext)
    - `description` (textarea)

- **Final Data Fields:**
  - `story` (richtext)
  - `description` (textarea) — possibly used as official citation

- **Purpose:** Provide the narrative context and official wording of the award.

- **Explanation:** This section renders the `story` richtext field as the main content, telling the background of the award, the achievement that earned it, and any ceremony details. The `description` field may be styled as a pull quote or official citation. The design uses a long-form article layout with appropriate typography.

---

### Media Gallery

- **Collections Used:**
  - `Awards`
    - `thumbnail` (upload → media)
    - `candid` (upload → media)
    - `video` (upload → media)

- **Final Data Fields:**
  - `thumbnail` (media)
  - `candid` (media)
  - `video` (media)

- **Purpose:** Visual documentation of the award ceremony or related moments.

- **Explanation:** This gallery displays the available media from the award. The `video` is featured if present. The `candid` and `thumbnail` images are shown in a grid. Clicking any media opens a lightbox viewer. The layout is simple and focused on the visual assets.

---

## Outcomes / Celebration [slug] Page

### Story & Participants

- **Collections Used:**
  - `Celebrations`
    - `story` (richtext)
    - `leaders` (relationship → `Leaders[]`)
    - `drivers` (relationship → `Drivers[]`)
  - `Leaders`
    - `name` (text)
    - `title` (text)
    - `avatar` (media)
  - `Drivers`
    - `name` (text)
    - `avatar` (media)

- **Final Data Fields:**
  - `story` (richtext)
  - Participants Grid:
    - Leaders: `name`, `title`, `avatar`
    - Drivers: `name`, `avatar`

- **Purpose:** Share the narrative of the celebration and highlight key attendees.

- **Explanation:** The `story` richtext provides a detailed account of the event. Below it, a grid displays the `leaders` and `drivers` who participated, showing avatars and names. Clicking a participant navigates to their profile. The design creates a personal connection by showcasing the people involved.

---

### Media Gallery

- **Collections Used:**
  - `Celebrations`
    - `thumbnail` (upload → media)
    - `video` (upload → media)
    - `gallery` (Files → alias)

- **Final Data Fields:**
  - `thumbnail` (media)
  - `video` (media)
  - `gallery` (Files array)

- **Purpose:** Immortalize the celebration through photos and videos.

- **Explanation:** A masonry grid of images from `gallery`, with the `video` featured at the top or in a prominent position. The `thumbnail` may serve as the hero image. The grid supports lightbox expansion and lazy loading. This section is the visual heart of the celebration page.

---

## Outcomes / Incident [slug] Page

### Narrative

- **Collections Used:**
  - `Incidents`
    - `story` (richtext)
    - `description` (textarea)

- **Final Data Fields:**
  - `story` (richtext)
  - `description` (textarea)

- **Purpose:** Provide a comprehensive, detailed account of the incident.

- **Explanation:** The `story` richtext is the primary content, offering a full narrative including cause, sequence of events, and outcome. The `description` may be used as a summary or sidebar. The design uses a clean, readable layout with support for embedded media (if included in richtext). This page serves as the official record.

---

### Media Gallery

- **Collections Used:**
  - `Incidents`
    - `thumbnail` (upload → media)
    - `video` (upload → media)
    - `gallery` (Files → alias)

- **Final Data Fields:**
  - `thumbnail` (media)
  - `video` (media)
  - `gallery` (Files array)

- **Purpose:** Provide visual evidence and documentation of the incident.

- **Explanation:** Similar to other media galleries, this section displays photos and videos from the incident. The `video` may show onboard or trackside footage. The `gallery` can include still frames or damage assessment images. The content is presented in a grid with lightbox functionality. The visual nature of this section is crucial for analysis and transparency.

---

## Careers Page (/careers)

### Vacancy Board

- **Collections Used:**
  - `Vacancies`
    - `name` (text, required)
    - `alias` (text, optional)
    - `title` (text)
    - `description` (textarea)
    - `department` (text)
    - `contract` (dropdown: full_time, part_time, reserve, test)
    - `locations` (map)
    - `thumbnail` (upload → media)

- **Final Data Fields:**
  - Vacancy Card:
    - `title` (text)
    - `alias` (text, optional)
    - `department` (text)
    - `contract` (dropdown)
    - `location_summary` (from `locations` map)
    - `description` (textarea) — excerpt
    - `thumbnail` (upload → media)

- **Purpose:** List open positions and encourage applications.

- **Explanation:** This filterable grid displays all active `Vacancies`. Each card shows the job `title`, `department`, `contract` type, location, and a brief description excerpt. The `thumbnail` (e.g., department icon) adds visual appeal. Filters allow sorting by department, contract type, or location. The `alias` links to the full vacancy description page. A prominent "Apply" button is included.

---

### Training Catalog

- **Collections Used:**
  - `Trainings`
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (richtext)
    - `intensity` (radio: low, medium, high, extreme)
    - `format` (radio: individual, group, lecture, hands_on, simulated, remote, classroom)
  - `Programs` (similar purpose)
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (textarea)
    - `type` (dropdown: development, training, outreach, competitive, grassroots, elite, academy)
    - `duration` (dropdown: days, weeks, months, years, ongoing)

- **Final Data Fields:**
  - Training/Program Card:
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (excerpt)
    - `intensity` or `type` badge
    - `format` or `duration` badge

- **Purpose:** Showcase professional development opportunities available within the organization.

- **Explanation:** This combined grid displays both `Trainings` and `Programs` as development pathways. Each card highlights the name, a type/intensity badge, and a short description. The `alias` links to the detail page. The grid can be filtered by type or duration. This section complements the Vacancy Board by showing the growth potential within the team.

---

### Life at AF Motorsport

- **Collections Used:**
  - `Celebrations`
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (textarea)
    - `thumbnail` (upload → media)
  - `Meetups`
    - `name` (text, required)
    - `alias` (text, optional)
    - `description` (textarea)
    - `thumbnail` (upload → media)
  - `Interviews`
    - `name` (text, required)
    - `alias` (text, optional)
    - `tagline` (text)
    - `summary` (textarea)
    - `thumbnail` (upload → media)

- **Final Data Fields:**
  - Culture Item (union):
    - `type` (derived: 'Celebration', 'Meetup', 'Interview')
    - `name` (text)
    - `alias` (text)
    - `description` or `summary` (text)
    - `thumbnail` (media)

- **Purpose:** Convey the team culture and work environment through authentic content.

- **Explanation:** This section uses a masonry grid or carousel to feature behind-the-scenes content from `Celebrations`, `Meetups`, and `Interviews`. Employee testimonials can be pulled from `Interviews.summary` or `tagline`. The goal is to humanize the organization and attract like-minded candidates. Each item links to its respective detail page for a deeper dive.

---

## Careers / Vacancy [slug] Page

### Role Description

- **Collections Used:**
  - `Vacancies`
    - `title` (text)
    - `description` (textarea)
    - `department` (text)
    - `contract` (dropdown: full_time, part_time, reserve, test)
    - `locations` (map)

- **Final Data Fields:**
  - `title` (text)
  - `department` (text)
  - `contract` (dropdown)
  - `location_string` (from `locations` map)
  - `description` (textarea) — full rich text

- **Purpose:** Provide comprehensive details about the job role and responsibilities.

- **Explanation:** This section renders the full `description` field as rich text, which includes the role summary, key responsibilities, and reporting structure. The job metadata (`title`, `department`, `contract`, location) is displayed in a sidebar or header for quick reference. The design ensures readability and may include a sticky "Apply" button.

---

### Specifications & Expectations

- **Collections Used:**
  - `Vacancies`
    - `specifications` (array)
      - `parameter` (text)
      - `value` (text)
      - `description` (textarea)
    - `expectations` (array)
      - `name` (text)
      - `type` (dropdown)
      - `criteria` (textarea)
      - `statement` (textarea)

- **Final Data Fields:**
  - Specifications List:
    - `parameter` (text)
    - `value` (text)
    - `description` (textarea)
  - Expectations List:
    - `name` (text)
    - `type` (dropdown)
    - `criteria` (textarea)
    - `statement` (textarea)

- **Purpose:** Clearly outline the required qualifications and success criteria for the role.

- **Explanation:** This two-column layout presents the `specifications` (e.g., "Experience: 5+ years") as a structured list, and the `expectations` as goal-oriented statements. The `type` field on expectations allows for categorization (e.g., "Performance," "Behavioral"). This format helps candidates self-assess their fit and understand what will be expected of them.

---

### Position History

- **Collections Used:**
  - `Vacancies`
    - `positions` (array)
      - `title` (text)
      - `start` (date)
      - `end` (date)

- **Final Data Fields:**
  - Position History List:
    - `title` (text)
    - `start` (date)
    - `end` (date)
    - `duration` (derived)

- **Purpose:** Show the tenure of previous incumbents in this role, providing career progression context.

- **Explanation:** This section lists previous holders of the vacancy (the `positions` array). Each entry shows the person's `title` (or name, if stored), the `start` and `end` dates, and the calculated duration. This transparency can help candidates understand typical tenure and career path from this role. The data is presented in a simple timeline or table.

---

## Careers / Program [slug] Page

### Objective & Eligibility

- **Collections Used:**
  - `Programs`
    - `objective` (textarea)
    - `type` (dropdown: development, training, outreach, competitive, grassroots, elite, academy)
    - `duration` (dropdown: days, weeks, months, years, ongoing)
    - `eligibility` (array)
      - `criteria` (text)
      - `value` (text)
      - `description` (textarea)

- **Final Data Fields:**
  - `objective` (textarea)
  - `type` (dropdown)
  - `duration` (dropdown)
  - Eligibility List:
    - `criteria` (text)
    - `value` (text)
    - `description` (textarea)

- **Purpose:** Define the program's goals and participant requirements.

- **Explanation:** The `objective` textarea provides a high-level description of what the program aims to achieve. The `type` and `duration` badges give quick context. The `eligibility` array is rendered as a checklist or table, detailing each requirement (`criteria`), the expected `value` (e.g., "Age: 18-25"), and a clarifying `description`. This section helps prospective participants determine if they qualify.

---

### Curriculum & Mentors

- **Collections Used:**
  - `Programs`
    - `curriculum` (array)
      - `module_name` (text)
      - `duration` (text)
      - `deliverable` (textarea)
    - `mentors` (relationship → `Leaders`)
  - `Leaders`
    - `name` (text, required)
    - `title` (text)
    - `avatar` (upload → media)

- **Final Data Fields:**
  - Curriculum List:
    - `module_name` (text)
    - `duration` (text)
    - `deliverable` (textarea)
  - Mentors Grid:
    - `name` (text)
    - `title` (text)
    - `avatar` (media)

- **Purpose:** Detail the learning modules and the experienced leaders guiding participants.

- **Explanation:** The `curriculum` array is displayed as a structured list of modules, each with a name, duration, and expected deliverable. The `mentors` relationship fetches a grid of `Leaders` who serve as mentors, showing their names, titles, and avatars. This section builds confidence in the program's structure and support system.

---

### Participants & Partners

- **Collections Used:**
  - `Programs`
    - `participants` (relationship → `Drivers`)
    - `partners` (relationship → `Organizations`)
    - `sponsors` (relationship → `Organizations`)
  - `Drivers`
    - `name` (text)
    - `avatar` (media)
  - `Organizations`
    - `name` (text)
    - `logo` (media)

- **Final Data Fields:**
  - Participants Grid: `Drivers` with `name`, `avatar`
  - Partners Grid: `Organizations` with `name`, `logo`
  - Sponsors Grid: `Organizations` with `name`, `logo`

- **Purpose:** Showcase current program participants and the network of supporting organizations.

- **Explanation:** This section is divided into subsections for Participants, Partners, and Sponsors. Each displays a grid of avatars/logos with names. The `Drivers` in `participants` are current or past program members. `Partners` and `Sponsors` from `Organizations` highlight the collaborative and financial backing of the program. This transparency adds credibility and showcases the program's reach.