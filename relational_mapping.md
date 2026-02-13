  # COLLECTION RELATIONAL MAPPING ANALYSIS

## ASSETS COLLECTIONS
- Galleries (Visual Collections)
  - **Purpose**: Curated image sets for visual storytelling
  - **Used by**: Stories, Histories, Journeys, Organizations, Drivers, Kits, Cars
  - **Why**: Any entity that needs visual narrative enhancement
  - **Connects from**: Stories (gallery), Histories (gallery), Journeys (gallery), Organizations (gallery), Drivers (gallery), Kits (gallery)

- Playlists (Video Collections)
  - **Purpose**: Curated video sets for dynamic storytelling
  - **Used by**: Stories, Histories, Journeys, Organizations, Drivers
  - **Why**: Any entity that needs video narrative enhancement
  - **Connects from**: Stories (playlist), Histories (playlist), Journeys (playlist), Organizations (playlist), Drivers (playlist)

- Archives (Document Repositories)
  - **Purpose**: Stored records for preservation and reference
  - **Used by**: Protocols, Technicals, Histories, Organizations, Members
  - **Why**: Documents that need preservation and authoritative reference
  - **Connects from**: Protocols (documentation), Technicals (documentation), Members (certifications)

- Visualizations (Data Representations)
  - **Purpose**: Graphical displays of data and information
  - **Used by**: Technicals, Classifications, Features, Results, Kits
  - **Why**: Data that needs graphical interpretation and presentation
  - **Connects from**: Technicals (data), Classifications (visual), Features (visualizations), Kits (visualizations)

## PRIMITIVE COLLECTIONS (Brand Vocabulary)
- Classifications (Categorization Systems)
  - **Purpose**: Universal categorization framework
  - **Applied to**: Everything (Organizations, Drivers, Stories, Events, etc.)
  - **Why**: Every entity needs consistent categorization for discovery
  - **Connects from**: Organizations, Drivers, Stories, Events, Series, etc.

- Features (Distinctive Properties)
  - **Purpose**: Identify unique characteristics
  - **Applied to**: Cars, Kits, Drivers, Organizations, Locations
  - **Why**: Highlight what makes each entity special and memorable
  - **Connects from**: Cars, Kits, Drivers, Organizations, Locations

- Technicals (Specification Details)
  - **Purpose**: Provide measurable properties and specifications
  - **Applied to**: Cars, Kits, Equipment, Protocols
  - **Why**: Technical credibility and detailed specifications
  - **Connects from**: Cars, Kits, Equipment, Protocols

- Tones (Emotional/Mood Qualities)
  - **Purpose**: Define emotional atmosphere and brand voice
  - **Applied to**: Stories, Notes, Galleries, Playlists, Kits, Organizations, Drivers, Leaders, Members
  - **Why**: Consistent emotional branding across all content
  - **Connects from**: Stories, Notes, Organizations, Drivers, Leaders, Members, Kits

## PEOPLE COLLECTIONS (Entities)
- `Organizations` (Groups/Institutions)
  - **Purpose**: Represent teams, sponsors, companies
  - **Has**: Histories, Journeys, Stories, Galleries, Principles, Protocols, Cars, Kits, Initiatives, Careers
  - **Connects to**: Drivers, Leaders, Members, Individuals (people)
  - **Why**: Organizations need origin stories, visual identity, governance, and people connections

- `Individuals` (External Contacts)
  - **Purpose**: Fans, journalists, external relationships
  - **Has**: Notes, Stories, Preferences, Channels
  - **Connects to**: Organizations, Meetups
  - **Why**: External engagement tracking and relationship management

- `Leaders` (Decision Makers)
  - **Purpose**: Strategic direction and management
  - **Has**: Decisions, Principles, Strategies, Protocols
  - **Connects to**: Organizations, Teams (drivers/members)
  - **Why**: Leaders make decisions that shape the organization

- `Drivers` (Racing Athletes)
  - **Purpose**: Primary competitors with career narratives
  - **Has**: Stories, Journeys, Results, Entries, Kits, Skills, Educations, Experiences, Awards
  - **Connects to**: Organizations (teams), Cars, Mentors (other drivers/leaders)
  - **Why**: Drivers need career progression, achievements, and team relationships

- `Members` (Support Staff)
  - **Purpose**: Operations and technical support
  - **Has**: Duties, Skills, Trainings, Protocols, Expectations
  - **Connects to**: Organizations, Teams, Protocols, Trainings
  - **Why**: Members have specific responsibilities and need development

## NARRATIVE COLLECTIONS (Content)
- Stories (Anecdotal Accounts)
  - **Purpose**: Narrative episodes and anecdotes
  - **Uses**: Incidents, Highlights, Galleries, Playlists, Tones
  - **Connects to**: Any entity (people, organizations, events, cars)
  - **Why**: Capture memorable moments and shareable narratives

- Journeys (Transformation Narratives)
  - **Purpose**: Evolution and growth stories
  - **Uses**: Decisions, Impacts, Stories, Notes, Lessons
  - **Connects to**: People, Organizations, Projects
  - **Why**: Document transformation and learning over time

- Histories (Chronological Records)
  - **Purpose**: Historical development documentation
  - **Uses**: Stories, Galleries, Archives, Anecdotes (Notes)
  - **Connects to**: Organizations, People, Locations
  - **Why**: Establish legacy and historical context

- Notes (Basic Observations)
  - **Purpose**: Quick insights and annotations
  - **Uses**: Tones, Attachments, Contexts
  - **Connects to**: Everything (universal observation tool)
  - **Why**: Capture spontaneous insights and references

## GOVERNANCE COLLECTIONS (Systems)
- Protocols (Standard Procedures)
  - **Purpose**: Define how things are done
  - **Uses**: Archives, Documentation
  - **Connects from**: Organizations, Leaders
  - **Connects to**: Duties, Expectations, Members
  - **Why**: Standardized processes and compliance

- Expectations (Performance Standards)
  - **Purpose**: Set standards and requirements
  - **Uses**: Protocols, Conditions
  - **Connects from**: Organizations, Leaders
  - **Connects to**: Initiatives, Meetups, Careers, Members
  - **Why**: Clear standards for engagement and performance

- Duties (Assigned Tasks)
  - **Purpose**: Define responsibilities
  - **Uses**: Protocols, Frameworks
  - **Connects from**: Organizations, Leaders
  - **Connects to**: Members, Teams
  - **Why**: Clear role definitions and accountability

## SYSTEMS COLLECTIONS (Organization)
- Categories (Hierarchical Groupings)
  - **Purpose**: Structured taxonomies
  - **Applied to**: Everything
  - **Why**: Hierarchical organization of all content

- Tags (Keyword Labels)
  - **Purpose**: Free-form descriptors
  - **Applied to**: Everything
  - **Why**: Flexible keyword organization

- Media (Individual Files)
  - **Purpose**: File storage and management
  - **Used by**: Everything
  - **Why**: Centralized media management

- Channels (Communication Paths)
  - **Purpose**: Contact methods and platforms
  - **Used by**: Individuals, Organizations, Communications
  - **Why**: Manage communication touchpoints

- Locations (Physical Places)
  - **Purpose**: Venues and addresses
  - **Used by**: Galleries, Stories, Journeys, Events, Organizations
  - **Why**: Geographic context and venue management

## RACING STRUCTURE COLLECTIONS (Future)
- Results (Competition Outcomes)
  - **Will connect to**: Drivers, Entries, Sessions, Points
  - **Why**: Document competitive performance

- Impacts (Major Effects)
  - **Will connect to**: Decisions, Journeys, Stories
  - **Why**: Track significant consequences and changes

- Decisions (Choice Records)
  - **Will connect to**: Leaders, Strategies, Journeys
  - **Why**: Document strategic choices and reasoning

- Skills (Learned Abilities)
  - **Will connect to**: People, Trainings, Careers
  - **Why**: Track capabilities and development

## RELATIONAL PHILOSOPHY
  1. **Purpose-Driven Connections**: Only connect when it serves the narrative
  2. **Narrative Over Technical**: Connections create stories, not just data relationships
  3. **Multi-Directional Applicability**: Abstract collections connect to multiple concrete ones
  4. **Brand Consistency**: Primitives (Classifications, Features, Technicals, Tones) ensure consistent brand language
  5. **Story Arcs Over Data Points**: Each relationship serves a narrative function