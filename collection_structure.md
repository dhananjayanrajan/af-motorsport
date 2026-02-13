# AF Motorsport Collection Structure

## Purpose
This document outlines the semantic grouping for all the collections 

## Standardized Sidebar Structure (All Collections)
All collections are seperated with "---" for better semantic understanding across the project.

### Globals
-   **Configurations**: `Header`, `Footer`, `Social`
-   **Identity**: `Sustainability`, `Identity`, `Values`, `Vision`, `Leadership`
-   **Connectivity**: `Communities`, `Channels`, `Feeds`, `Announcements`, `Questions`
-   **Policies**: `Terms`, `Legal`, `Privacy`, `Cookies`, `Transactions`, `Returns`, `Refunds`

# Collections
- Competition: Series, Seasons, Events, Sessions, Entries, Results, Points
- Entities: Drivers, Leaders, Members, Individuals, Organizations
- Content: Narratives, Stories, Histories, Journeys, Notes
- Resources: Cars, Kits, Media, Galleries, Playlists, Archives, Visualizations
- Operations: Schedules, Trainings, Careers, Initiatives, Meetups, Celebrations, Protocols, Duties, Expectations
- Outcomes: Highlights, Incidents, Impacts, Decisions, Strategies, Awards, Experiences
- Attributes: Categories, Tags, Tones, Features, Specifications, Classifications, Skills, Principles, Preferences, Channels, Locations

- `Classifications`, `Features`, `Technicals`
- `Decisions`, `Principles`, `Preferences`, `Strategies`
- `Protocols`, `Expectations`, `Duties`
- `Highlights`, `Celebrations`, `Impacts`, `Incidents`

- `Organizations`, `Individuals`, `Leaders`, `Drivers`, `Members`
- `Skills`, `Educations`, `Experiences`, `Awards`
- `Trainings`, `Careers`, `Initiatives`, `Meetups`

- `Series`, `Seasons`, `Events`, `Sessions`
- `Entries`, `Schedules`, `Results`, `Points`
- `Cars`, `Kits`

- `Notes`, `Stories`, `Histories`, `Journeys`, `Tones`
- `Media`, `Galleries`, `Playlists`, `Archives`, `Visualizations`
- `Categories`, `Tags`, `Channels`, `Locations`

- `Users`, `Articles`, `Pages`
- `Products`, `Carts`, `Orders`, `Transactions`
- `Forms`, `Form Submissions`

---

# PRINCIPLED COLLECTION DEFINITIONS

## RACING & COMPETITION STRUCTURE
- **Series**: A championship framework (F1, WEC) - the "universe" of competition
- **Seasons**: A specific year/cycle within a Series - the annual narrative arc  
- **Events**: Individual race weekends - the "episodes" of the season
- **Sessions**: Discrete competition units (practice, qualifying, race) - the "scenes"
- **Entries**: Participation records - who competed where/when
- **Schedules**: Time arrangements - when things happen
- **Results**: Outcome documentation - what happened in competitions
- **Points**: Scoring system tracking - how performance is quantified

## ATTRIBUTES & CHARACTERISTICS
- **Classifications**: Categorization systems - how things are grouped/classified
- **Features**: Distinctive properties - what makes something unique
- **Technicals**: Specification details - the measurable properties
- **Tones**: Emotional/mood qualities - the "feel" of content/experiences

## ENTITIES & PEOPLE
- **Organizations**: Groups/institutions - companies, teams, sponsors
- **Individuals**: Single persons outside core team - external contacts, fans
- **Drivers**: Racing athletes - the primary competitors
- **Leaders**: Strategic decision-makers - management, directors
- **Members**: Support/operations staff - engineers, mechanics, crew
- **Users**: System administrators - content managers (backstage only)

## CAPABILITIES & ACHIEVEMENTS
- **Skills**: Learned abilities - what people can do
- **Experiences**: Past activities - career history, past roles
- **Awards**: Formal recognitions - trophies, titles, honors

## STRATEGY & PLANNING
- **Decisions**: Choice records - what was decided and why
- **Principles**: Guiding beliefs - core values, philosophies
- **Preferences**: Individual likes/dislikes - personal tastes, styles
- **Strategies**: Planned approaches - how goals will be achieved

## GOVERNANCE & RESPONSIBILITIES
- **Protocols**: Standard procedures - how things are done
- **Expectations**: Performance standards - what is required/anticipated
- **Duties**: Assigned tasks - who does what

## CONTENT & NARRATIVES
- **Notes**: Basic observations - quick thoughts, annotations
- **Stories**: Anecdotal accounts - narrative episodes
- **Histories**: Chronological records - past developments
- **Journeys**: Transformation narratives - personal/team evolution

## PHYSICAL & DIGITAL ASSETS
- **Cars**: Racing vehicles - the primary equipment
- **Kits**: Uniforms/gear - team apparel, equipment sets
- **Galleries**: Image collections - curated visual sets
- **Playlists**: Video collections - curated video sets
- **Archives**: Document repositories - stored records
- **Visualizations**: Data representations - graphical displays

## ORGANIZATIONAL SYSTEMS
- **Categories**: Hierarchical groupings - structured taxonomies
- **Tags**: Keyword labels - free-form descriptors
- **Media**: Individual files - images, videos, documents
- **Channels**: Communication paths - contact methods, platforms
- **Locations**: Physical places - venues, addresses, coordinates

## ENGAGEMENT & DEVELOPMENT
- **Trainings**: Skill development - practice sessions, drills
- **Careers**: Employment opportunities - job postings, roles
- **Initiatives**: Organized projects - campaigns, programs
- **Meetups**: Social gatherings - community events

## SIGNIFICANT OCCURRENCES
- **Impacts**: Major effects - game-changing moments
- **Incidents**: Accidents/problems - unexpected occurrences
- **Highlights**: Best moments - peak performances
- **Celebrations**: Achievement markers - victory commemorations

## PUBLISHED CONTENT
- **Articles**: Written pieces - reports, features, news
- **Pages**: Website sections - static content pages

## COMMERCE
- **Products**: Sellable items - merchandise, goods
- **Carts**: Purchase selections - shopping containers
- **Orders**: Sales transactions - purchase records
- **Transactions**: Financial exchanges - payment records

## INTERACTIONS
- **Forms**: Data collection tools - questionnaires, applications
- **Form Submissions**: User responses - submitted form data

---

# COLLECTION SEGREGATION ANALYSIS

## GROUP 1: RACING TIMELINE & PERFORMANCE NEXUS
**Collections**: `Series`, `Seasons`, `Events`, `Sessions`, `Entries`, `Results`, `Points`

### INTERCONNECTION PATTERN: Linear Dependency Chain
Series → Seasons → Events → Sessions → Entries → Results → Points

- **Series** defines the championship universe
- **Seasons** are temporal containers within a series  
- **Events** are location-bound race weekends
- **Sessions** are discrete competition units
- **Entries** record participation in sessions
- **Results** document competitive outcomes
- **Points** quantify performance metrics

### RELATIONSHIP DENSITY: Very High
Each collection directly depends on the previous one. This group forms the **backbone of competitive narrative** - a strictly chronological, hierarchical structure where lower levels cannot exist without upper levels.

## GROUP 2: GOVERNANCE & MOMENTS COMPLEX
**Collections**: `Decisions`, `Principles`, `Preferences`, `Strategies`, `Schedules`, `Protocols`, `Expectations`, `Duties`, `Impacts`, `Incidents`, `Highlights`, `Celebrations`

### INTERCONNECTION PATTERN: Causal Network
Decision System → Governance Framework → Resulting Moments

- **Decision System**: `Decisions`, `Principles`, `Preferences`, `Strategies`, `Schedules`
- **Governance Framework**: `Protocols`, `Expectations`, `Duties`
- **Resulting Moments**: `Impacts`, `Incidents`, `Highlights`, `Celebrations`

### RELATIONSHIP DENSITY: High (Internal Causality)
This group represents **cause-and-effect relationships** in brand storytelling. Decisions and governance create the conditions for memorable moments. Every "moment" collection connects back to multiple governance collections.

## GROUP 3: ATTRIBUTES & ENTITIES NETWORK
**Collections**: `Classifications`, `Features`, `Tones`, `Technicals`, `Medicals`, `Organizations`, `Individuals`, `Drivers`, `Leaders`, `Members`, `Users`, `Skills`, `Educations`, `Experiences`, `Awards`, `Trainings`, `Careers`, `Initiatives`, `Meetups`

### INTERCONNECTION PATTERN: Hub-and-Spoke with Entity Core
Attributes → Describe → Entities → Have → Capabilities → Participate in → Activities

- **Attributes**: `Classifications`, `Features`, `Tones`, `Technicals`, `Medicals`
- **Entities**: `Organizations`, `Individuals`, `Drivers`, `Leaders`, `Members`, `Users`
- **Capabilities**: `Skills`, `Educations`, `Experiences`, `Awards`
- **Activities**: `Trainings`, `Careers`, `Initiatives`, `Meetups`

### RELATIONSHIP DENSITY: Extremely High (Central Hub)
This is the **central relational database** of the project. Every entity can have multiple attributes, capabilities, and participate in activities. All other groups connect here for character/story depth.

## GROUP 4: CONTENT & ASSETS PIPELINE
**Collections**: `Notes`, `Stories`, `Histories`, `Journeys`, `Cars`, `Kits`, `Galleries`, `Playlists`, `Archives`, `Visualizations`, `Categories`, `Tags`, `Media`, `Channels`, `Locations`, `Articles`, `Pages`

### INTERCONNECTION PATTERN: Manufacturing Pipeline
Raw Materials → Production → Organization → Publication

- **Raw Materials**: `Notes`, `Stories`, `Histories`, `Journeys`, `Cars`, `Kits`
- **Media Production**: `Galleries`, `Playlists`, `Archives`, `Visualizations`
- **Organization**: `Categories`, `Tags`, `Media`, `Channels`, `Locations`
- **Publication**: `Articles`, `Pages`

### RELATIONSHIP DENSITY: Moderate (Linear Flow)
This group represents the **content creation workflow** - from raw narrative elements and physical assets to organized media and final published content. It connects to all other groups as both consumer and producer.

## GROUP 5: E-COMMERCE MODULE
**Collections**: `Products`, `Carts`, `Orders`, `Transactions`

### INTERCONNECTION PATTERN: Transactional Sequence
Products → Carts → Orders → Transactions

- **Relationship Density**: Very High (but isolated)
- **Integration Point**: Only with `Products` potentially connecting to `Kits`, `Cars`, or `Organizations`

This is a **self-contained commercial system** with minimal external dependencies. Must remain intact per technical constraints.

## GROUP 6: INTERACTION MODULE
**Collections**: `Forms`, `Form Submissions`

### INTERCONNECTION PATTERN: Input-Response Pair
Forms → Form Submissions

- **Relationship Density**: Very High (but isolated)
- **Integration Point**: Can connect to any collection needing user input

This is a **utility system** for audience engagement, designed to plug into any context requiring user feedback or data collection.

## ARCHITECTURAL IMPLICATIONS

### BUILD PRIORITY ORDER:
1. **Group 3 (Attributes & Entities)** - Central reference system
2. **Group 4 (Content & Assets)** - Display material foundation  
3. **Group 1 (Racing Timeline)** - Primary narrative engine
4. **Group 2 (Governance & Moments)** - Dramatic enhancement layer
5. **Groups 5 & 6** - Functional modules

### INTER-GROUP INTERFACES:
- **Group 1 ↔ Group 3**: Entries connect Drivers/Teams to Sessions
- **Group 2 ↔ Group 1**: Moments connect to Events/Sessions/Results
- **Group 2 ↔ Group 3**: Decisions connect to Leaders/Organizations
- **Group 4 ↔ All**: Assets and Stories enrich everything
- **Group 5 ↔ Group 3**: Products connect to Organizations/Brands
- **Group 6 ↔ All**: Forms can collect data for any context

### RELATIONSHIP PHILOSOPHY:
- **Groups 1-4**: Deep, meaningful, content-rich connections
- **Groups 5-6**: Functional, transactional, utility connections

This segregation reveals a **modular architecture** where each group serves a distinct narrative function while maintaining clean interfaces for brand storytelling.

---

- RACING STRUCTURE:
  - Series:
    - definition: A championship framework (F1, WEC) - the "universe" of competition
    - subtypes: Premier, Continental, National, Endurance, Sprint, Formula, Prototype, GT, Rally
  - Seasons:
    - definition: A specific year/cycle within a Series - the annual narrative arc
    - subtypes: Current, Upcoming, Completed, Historic, Inaugural, ChampionshipDecider
  - Events:
    - definition: Individual race weekends - the "episodes" of the season
    - subtypes: Standard, Feature, Final, Exhibition, Preseason, Postseason
  - Sessions:
    - definition: Discrete competition units (practice, qualifying, race) - the "scenes"
    - subtypes: Practice, Qualifying, Race, Sprint, Warmup, Test

- COMPETITION RESULTS:
  - Entries:
    - definition: Participation records - who competed where/when
    - subtypes: FullSeason, PartialSeason, OneOff, Guest, Reserve, Wildcard
  - Results:
    - definition: Outcome documentation - what happened in competitions
    - subtypes: Victory, Podium, Classified, Retirement, Disqualification, FastestLap, Pole
  - Points:
    - definition: Scoring system tracking - how performance is quantified
    - subtypes: Finish, SprintAward, QualifyingAward, LapRecord, PositionBonus, SpecialAchievement

- ATTRIBUTES & CHARACTERISTICS:
  - Classifications:
    - definition: Categorization systems - how things are grouped/classified
    - subtypes: Technical, Performance, Safety, Regulatory, Historical, Sporting
  - Features:
    - definition: Distinctive properties - what makes something unique
    - subtypes: Aesthetic, Performance, Mechanical, Electronic, Safety, Signature
  - Tones:
    - definition: Emotional/mood qualities - the "feel" of content/experiences
    - subtypes: Magnitudes, Qualities, Emotion, Character, Essence, Spirit, Mood, Nuance
  - Technicals:
    - definition: Specification details - the measurable properties
    - subtypes: Powertrain, Chassis, Aerodynamics, Dimensions, Weight, Electronics, Suspension

- ENTITIES & PEOPLE:
  - Organizations:
    - definition: Groups/institutions - companies, teams, sponsors
    - subtypes: RacingTeam, Manufacturer, Sponsor, Supplier, Federation, MediaOutlet
  - Individuals:
    - definition: Single persons outside core team - external contacts, fans
    - subtypes: Fan, Journalist, Influencer, Celebrity, Guest, Contact
  - Drivers:
    - definition: Racing athletes - the primary competitors
    - subtypes: Professional, Amateur, Rookie, Veteran, Reserve, TestDriver
  - Leaders:
    - definition: Strategic decision-makers - management, directors
    - subtypes: Principal, Director, Manager, Strategist, Advisor, Owner
  - Members:
    - definition: Support/operations staff - engineers, mechanics, crew
    - subtypes: Engineer, Mechanic, PitCrew, Technician, Logistician, Analyst
  - Users:
    - definition: System administrators - content managers (backstage only)
    - subtypes: Administrator, Editor, Contributor, Developer, SupportSpecialist, Viewer

- CAPABILITIES & ACHIEVEMENTS:
  - Skills:
    - definition: Learned abilities - what people can do
    - subtypes: Racing, Engineering, Strategy, Leadership, Communication, Mechanical
  - Educations:
    - definition: Formal training - academic/professional qualifications
    - subtypes: Academic, Professional, Certification, License, Workshop, Degree
  - Experiences:
    - definition: Past activities - career history, past roles
    - subtypes: Employment, Project, Role, Achievement, Milestone, Internship
  - Awards:
    - definition: Formal recognitions - trophies, titles, honors
    - subtypes: Title, Trophy, Medal, Certificate, Honor, Achievement

- STRATEGY & PLANNING:
  - Decisions:
    - definition: Choice records - what was decided and why
    - subtypes: Strategic, Tactical, Operational, Technical, Personnel, Financial
  - Principles:
    - definition: Guiding beliefs - core values, philosophies
    - subtypes: Core, Ethical, Operational, Cultural, Technical, Competitive
  - Preferences:
    - definition: Individual likes/dislikes - personal tastes, styles
    - subtypes: Visual, Auditory, Technical, Driving, Lifestyle, Communication
  - Strategies:
    - definition: Planned approaches - how goals will be achieved
    - subtypes: Competitive, Technical, Development, Marketing, Financial, LongTerm
  - Schedules:
    - definition: Time arrangements - when things happen
    - subtypes: Competition, Testing, Maintenance, Travel, Media, Personal

- GOVERNANCE & RESPONSIBILITIES:
  - Protocols:
    - definition: Standard procedures - how things are done
    - subtypes: Safety, Operational, Technical, Communication, Emergency, Quality
  - Expectations:
    - definition: Performance standards - what is required/anticipated
    - subtypes: Personnel, Team, Technical, Safety, Conduct, Performance
  - Duties:
    - definition: Assigned tasks - who does what
    - subtypes: Engineering, Mechanical, Strategic, Administrative, Operational, Support

- SIGNIFICANT OCCURRENCES:
  - Impacts:
    - definition: Major effects - game-changing moments
    - subtypes: Technical, Strategic, Personnel, Regulatory, Financial, Historical
  - Incidents:
    - definition: Accidents/problems - unexpected occurrences
    - subtypes: Collision, Mechanical, Weather, Safety, Controversy, Retirement
  - Highlights:
    - definition: Best moments - peak performances
    - subtypes: Overtake, LapRecord, Battle, Victory, Record, Comeback
  - Celebrations:
    - definition: Achievement markers - victory commemorations
    - subtypes: Podium, TrophyCeremony, Champagne, TeamGathering, FanEvent, Championship

- CONTENT & NARRATIVES:
  - Notes:
    - definition: Basic observations - quick thoughts, annotations
    - subtypes: Insights, Observations, Remarks, Analysis, Commentary, Critique, Evaluation, Interpretation, Perspective, Summary
  - Stories:
    - definition: Anecdotal accounts - narrative episodes
    - subtypes: Origin, Journey, Challenge, Victory, BehindTheScenes, Legacy
  - Histories:
    - definition: Chronological records - past developments
    - subtypes: Founding, Evolution, Milestone, Archive, Legacy, Development
  - Journeys:
    - definition: Transformation narratives - personal/team evolution
    - subtypes: Career, Project, Growth, Personal, Team, Transformation

- PHYSICAL & DIGITAL ASSETS:
  - Cars:
    - definition: Racing vehicles - the primary equipment
    - subtypes: Formula, Prototype, Touring, GT, Rally, Electric
  - Kits:
    - definition: Uniforms/gear - team apparel, equipment sets
    - subtypes: Race, Practice, Casual, Formal, SpecialEdition, Heritage
  - Galleries:
    - definition: Image collections - curated visual sets
    - subtypes: Competition, Portrait, Action, BehindTheScenes, Historical, Promotional
  - Playlists:
    - definition: Video collections - curated video sets
    - subtypes: Onboard, Interview, Highlights, Documentary, BehindTheScenes, Promotional
  - Archives:
    - definition: Document repositories - stored records
    - subtypes: Technical, Historical, Legal, Media, Personal, Research
  - Visualizations:
    - definition: Data representations - graphical displays
    - subtypes: Chart, Graph, Map, Timeline, Model, Infographic

- ORGANIZATIONAL SYSTEMS:
  - Categories:
    - definition: Hierarchical groupings - structured taxonomies
    - subtypes: Primary, Secondary, Featured, Archive, Navigation, Filter
  - Tags:
    - definition: Keyword labels - free-form descriptors
    - subtypes: Topic, Theme, Mood, Era, Place, Person
  - Media:
    - definition: Individual files - images, videos, documents
    - subtypes: Image, Video, Document, Audio, ThreeD, Graphic
  - Channels:
    - definition: Communication paths - contact methods, platforms
    - subtypes: SocialMedia, Email, Phone, Website, InPerson, Press
  - Locations:
    - definition: Physical places - venues, addresses, coordinates
    - subtypes: Circuit, Office, Factory, Hotel, Venue, Landmark

- ENGAGEMENT & DEVELOPMENT:
  - Trainings:
    - definition: Skill development - practice sessions, drills
    - subtypes: Driving, Fitness, Technical, Strategy, Simulator, Classroom
  - Careers:
    - definition: Employment opportunities - job postings, roles
    - subtypes: FullTime, PartTime, Contract, Internship, Volunteer, Apprenticeship
  - Initiatives:
    - definition: Organized projects - campaigns, programs
    - subtypes: Marketing, Community, Technical, Sustainability, Diversity, Safety
  - Meetups:
    - definition: Social gatherings - community events
    - subtypes: FanEvent, TeamGathering, Industry, Charity, Launch, Anniversary

- PUBLISHED CONTENT:
  - Articles:
    - definition: Written pieces - reports, features, news
    - subtypes: News, Feature, Interview, Report, Opinion, Review
  - Pages:
    - definition: Website sections - static content pages
    - subtypes: Homepage, About, Contact, Services, FAQ, Legal

---

### Standardized Tab Structure (All Collections)
All custom collections follow this standardized field tab structure:

#### STANDARD
-   **Toggle** (Simple vs Advanced)
-   **Essentials**: Essential Information

#### TABS
*(Every tab contains: is this enabled? is this public? and fields)*
-   **Basics**: Simple, human-readable information
-   **Details**: Complex, narrative-rich content
-   **Traits**: Configurable properties for frontend theming
-   **Metrics**: Quantifiable data, measurements & Stats (when relevant to narrative)
-   **Assets**: Media relationships
-   **Contexts**: Pure contextual connections

#### SUPPORTIVE
-   **Forms**: Workflow assistive forms

#### SEO
-   **Meta Title**
-   **Meta Description**
-   **Meta Image**

#### SIDEBAR (Admin Panel)
-   **Slug**
-   **Categories**
-   **Tags**
-   **Visibility** (Is this public?, Is this featured?, Is this pinned?)

---