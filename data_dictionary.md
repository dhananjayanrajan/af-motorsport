# AF Motorsport Data Dictionary

## Purpose
This document provides the semantic definitions and purpose for each collection and major section within the AF Motorsport platform. Every collection exists SOLELY to provide structured data for frontend visual presentation and brand storytelling. No data is collected for internal operations, statistical analysis, or administrative purposes—only for creating emotionally resonant digital brand experiences.

---

## Mental Model:

Imagine building LEGO for storytelling:
- Collections are LEGO brick types (each with subtypes for variations)
- Relationships are the connectors that snap bricks together
- Fields are the printed details on each brick
- Workflows are the instruction manuals for building specific models
- The frontend is the display shelf where completed models tell stories

---

## GLOBALS

### Configurations
-   **Header:** Defines the primary navigation, branding, and global actions available at the top of every page. This global controls the persistent top bar, ensuring users always have access to key areas like Store, Live Timing, or user account settings regardless of their location on the site.
    *Context: This exists purely to create a consistent, branded navigation experience that immerses users in the AF Motorsport visual identity from their first interaction.*

-   **Footer:** Defines the secondary navigation, legal links, and social connections available at the bottom of every page. It serves as the comprehensive sitemap anchor, containing essential but less-frequently accessed links like Privacy Policy, Terms, and detailed category maps.
    *Context: The footer provides visual continuity and trust signals at the end of every page, reinforcing brand professionalism and completeness of the digital experience.*

-   **Social:** Defines the official social media links and integration settings for the brand's external presence. These settings populate icons and feeds throughout the site, ensuring that all external links are managed from a single source of truth.
    *Context: This transforms social proof into visual brand extensions—turning follower counts into credibility displays and social feeds into dynamic content streams that showcase community engagement.*

### Identity
-   **Sustainability:** Defines the organization’s commitment, goals, and reports regarding environmental and social responsibility. This global manages content related to carbon neutrality, green initiatives, and community impact reports, central to the modern brand narrative.
    *Context: This data fuels visual sustainability reports, interactive impact dashboards, and storytelling elements that position AF Motorsport as a forward-thinking, responsible brand.*

-   **Identity:** Defines the core brand elements including logos, color palettes, and usage guidelines. It acts as a central repository for the brand system, ensuring that frontend components can dynamically reference the correct assets and hex codes.
    *Context: This is the visual DNA of the entire digital experience—every color, logo variation, and typographic choice exists to create immediate brand recognition and emotional resonance.*

-   **Values:** Defines the guiding principles and ethical standards that drive the organization. This content is typically featured on "About Us" or "Culture" pages to communicate the team's ethos to fans and partners.
    *Context: These principles become visual manifestos—animated text, illustrated core values, and interactive elements that transform abstract values into memorable brand moments.*

-   **Vision:** Defines the long-term aspirations and strategic direction of the organization. Used to articulate the roadmap and future goals of the team, often presented in investor relations or fan engagement contexts.
    *Context: Vision statements become visionary visual experiences—timeline animations, future concept art displays, and aspirational video backgrounds that make the brand's future feel tangible.*

-   **Leadership:** Defines the global executive message or board-level representation. Unlike individual leader profiles, this global section manages the collective statement and high-level structure of the organization's governance.
    *Context: This creates the visual "boardroom" experience—animated organizational charts, executive video messages, and leadership collage displays that build institutional credibility.*

### Connectivity
-   **Communities:** Defines the various sub-groups, fan clubs, or membership tiers associated with the brand. This manages the data for things like "The Paddock Club" or "Junior Fans," detailing benefits and access levels.
    *Context: Community data becomes visual membership cards, interactive club interfaces, and social wall displays that make fans feel part of an exclusive visual tribe.*

-   **Channels:** Defines the official communication platforms (e.g., Discord, WhatsApp, Telegram, Broadcast) used for direct engagement. It helps organize and display where fans can interact in real-time.
    *Context: Channel information transforms into visually engaging "connect with us" interfaces—animated platform icons, live chat previews, and integrated feed displays.*

-   **Feeds:** Defines external data streams or RSS aggregations that populate content areas. This might include a Twitter/X feed, an Instagram wall, or a news ticker from a parent racing series.
    *Context: External feeds become curated visual content streams—animated social walls, news tickers, and integrated media displays that create a sense of real-time brand vitality.*

-   **Announcements:** Defines high-priority global messages or alerts broadcasted across the platform. This is used for urgent updates like "Race Delayed," "Tickets Sold Out," or "Stream Starting Now," often displayed as a banner.
    *Context: Announcements become dramatic visual interruptions—animated banners, full-screen takeover modals, and attention-grabbing notifications that create urgency and excitement.*

-   **Questions:** Defines commonly asked or context-specific questions (FAQ) presented to inform, guide, or clarify understanding for users. These are reusable snippets that can be embedded on Support, Store, or Event pages.
    *Context: FAQs transform into interactive visual Q&A interfaces—animated accordions, conversational UI elements, and contextual help displays that enhance user experience through design.*

### Policies
-   **Terms:** Defines the master Terms of Service for the platform. It establishes the legal agreement between the user and the brand.
    *Context: Even legal documents become part of the brand experience—presented with brand-consistent typography, subtle animations, and visual hierarchy that maintains professionalism while reducing friction.*

-   **Legal:** Defines general legal disclaimers and regulatory compliance documents not covered by Terms or Privacy.
    *Context: Legal content is visually integrated to maintain trust without disrupting the aesthetic experience—modal displays, branded PDF viewers, and elegantly formatted text blocks.*

-   **Privacy:** Defines the comprehensive Privacy Policy, detailing how user data is collected, stored, and used in compliance with data protection laws.
    *Context: Privacy information becomes a transparent visual narrative—flowcharts of data usage, animated explanations, and clean layouts that turn compliance into a brand trust statement.*

-   **Cookies:** Defines the distinct policy regarding browser cookies and tracking technologies, managing the consent banner and detailed explanations of cookie usage.
    *Context: Cookie consent becomes a designed interaction—animated banners, preference visualizers, and educational tooltips that make compliance feel like thoughtful user consideration.*

-   **Transactions:** Defines the specific policies governing payments, billing, and financial conduct. This is critical for the e-commerce section, outlining currency acceptance and payment security.
    *Context: Transaction policies become visual trust signals in the store—security badge animations, payment method visualizations, and process flow illustrations that build checkout confidence.*

-   **Returns:** Defines the detailed conditions and processes for returning purchased merchandise, including timeframes and condition requirements.
    *Context: Return policies transform into visual process guides—animated timelines, condition illustration libraries, and step-by-step visual workflows that reduce anxiety around purchases.*

-   **Refunds:** Defines the eligibility criteria and processing timelines for financial refunds, distinct from the physical return of goods.
    *Context: Refund information becomes transparent visual trackers—progress animations, timeline visualizations, and status indicators that turn administrative processes into reassuring experiences.*

---

## COLLECTIONS

### Race
-   **Series:** Defines the high-level competitive frameworks that persist across multiple years (e.g., F1, WEC, Porsche Cup). This entity establishes the permanent identity of a championship, including its history, regulations, and prestige. It serves as the parent container for tracking the team's involvement in different categories over time.
    *Context: Series data creates the visual "universe" in which the brand exists—championship hero sections, interactive timeline navigators, and prestige displays that position AF Motorsport within racing's elite.*

-   **Seasons:** Defines a specific annual campaign within a Series (e.g., "2026 F1 Season"). It acts as the temporal container for Events, and Results capturing the team's journey, car used, and specific livery for that year.
    *Context: Season information becomes annual visual themes—color schemes, typographic treatments, and animated year-in-review experiences that make each campaign feel like a distinct chapter in the brand story.*

-   **Events:** Defines time-bound occurrences such as race weekends, fan days, launches, or tests. An Event serves as the main anchor for a specific date range, aggregating all related Sessions, News, and Media into one context.
    *Context: Event data structures complete visual weekend experiences—countdown timers, circuit maps, session schedules, and post-event highlight reels that turn race weekends into immersive digital festivals.*

-   **Sessions:** Defines the granular, individual track activities within an Event (e.g., "Free Practice 1," "Qualifying," "Main Race"). This is where specific start times, weather conditions, and direct results are logged.
    *Context: Session details power real-time visual interfaces—live timing screens, weather visualization widgets, and session-specific media galleries that make users feel trackside.*

-   **Entries:** Defines the official participation records for a specific Session. An Entry links a Driver and a Car to a Session, appearing on the visual starting grid or entry list. It is the fundamental unit of participation.
    *Context: Entry information creates visual grid displays—animated starting lineups, car/driver pairing visualizations, and participation history charts that showcase the brand's competitive presence.*

### Performances
-   **Positions:** Defines the granular tracking of dynamic placements and movements during a competitive session. It enables a precise reconstruction of the race narrative by recording Laps completed, Stops made, Gaps to intervals, and Leads held.
    *Context: Position data fuels animated race replays, interactive lap charts, and real-time gap visualizations that transform raw numbers into thrilling visual narratives of competition.*

-   **Strategies:** Defines the intellectual and tactical approach deployed for a session. It differentiates between the planned Assessments and Previews before the event, and the analytical Reviews of the actual execution afterwards.
    *Context: Strategy information becomes visual tactical displays—interactive pit stop planners, tire strategy visualizers, and animated decision trees that reveal the intellectual drama behind the racing.*

### Occurrences
-   **Turnings:** Defines the pivotal inflection points that fundamentally alter the course of an event or narrative. These are high-impact moments—such as a sudden weather Shift or a crucial strategic Impact—that define the "story" of the race beyond simple lap charts.
    *Context: Turning moments become dramatic visual highlights—slow-motion video focuses, animated impact indicators, and narrative breakpoints in race stories that emphasize key brand-defining moments.*

-   **Incidents:** Defines the disruptive or negative events that puncture the flow of a session. This collection captures driver Mistakes, mechanical Issues, or on-track Accidents, providing the necessary context for penalties, retirements, or safety car periods.
    *Context: Incident data creates visual storytelling tension—animated incident replays, safety car visualization, and comeback story setups that highlight resilience and drama in the brand narrative.*

### Statistics
-   **Points:** Defines the quantitative scoring mechanism used to calculate championship standing. It records the precise Gains from race results, Losses from poor performance, and any Penalties applied by governing bodies.
    *Context: Point data becomes animated championship progress bars, interactive point calculators, and visual penalty explanations that make abstract scoring feel immediate and dramatic.*

-   **Schedules:** Defines the structured temporal logic of activities. It manages the detailed Timings of sessions and the operational Statuses (e.g., "Delayed", "Red Flagged", "Confirmed") of events.
    *Context: Schedule information powers visual countdown timers, animated calendar interfaces, and status indicator systems that create anticipation and keep users engaged with brand activities.*

-   **Timelines:** Defines the linear progression of significant phases over a long duration. It tracks the macro Progressions of projects, seasons, or initiatives, marking key Milestones to visualize growth or completion.
    *Context: Timeline data creates scrolling visual histories, interactive milestone explorers, and animated progression visualizations that turn time into a navigable brand story.*

### Outcomes
-   **Results:** Defines the objective, finalized performance data from a Session. This includes quantitative metrics like P1 positioning, lap times, gap to leader, and any penalties. It is the source of truth for "How did we do?".
    *Context: Result data fuels victory/performance visualizations—animated podium displays, lap time comparisons, and result breakdowns that celebrate or analyze brand achievements.*

### Directives
-   **Decisions:** Defines the formal rulings, executive choices, or official judgments made by leadership or officials. This includes strategic Changes to team policy and official Amendments to race results or classifications.
    *Context: Decision records become visual governance displays—animated policy change logs, official ruling presentations, and strategic pivot visualizations that showcase decisive brand leadership.*

### Moments
-   **Celebrations:** Defines emotional brand milestones and commemorative moments (e.g., "100th Victory," "50 Years of Racing"). Unlike a simple news article, a Celebration is a specialized visual presentation designed to evoke pride and nostalgia.
    *Context: Celebration content becomes immersive visual experiences—full-screen video montages, interactive milestone explorers, and nostalgic photo galleries that emotionally connect users to brand heritage.*

-   **Highlights:** Defines the most prominent, high-impact media moments worth showcasing (e.g., "Overtake of the Year," "Pole Position Lap"). These are curated video/image snippets selected from the broader Media library for maximizing frontend engagement.
    *Context: Highlight data creates visual "best-of" reels—auto-playing highlight carousels, interactive moment selectors, and social-ready clip generators that showcase peak brand excitement.*

-   **Awards:** Defines the formal recognitions and honors bestowed upon individuals or the organization. It catalogs the specific trophies, titles, and accolades won, distinct from the raw statistical data of Results.
    *Context: Award information becomes visual trophy rooms—3D award displays, interactive honor walls, and achievement galleries that physically manifest brand prestige and success.*

### Feedback
-   **Forms:** Defines the structure of input interfaces (e.g., "Newsletter Signup," "Job Application"). This builder allows admins to create custom data collection points without code changes.
    *Context: Forms become visually integrated interaction points—animated form fields, progressive disclosure interfaces, and branded submission experiences that make data collection feel like natural brand conversation.*

-   **Form Submissions:** Defines the received data records from filled-out Forms. This collection stores the actual user responses for review and export.
    *Context: Submission data powers visual confirmation experiences—animated thank-you screens, submission status trackers, and data receipt visualizations that reassure users their engagement matters.*

### Team
-   **Drivers:** Defines the complex profiles of the racing athletes who compete for the team. This collection captures their Skills, Educations, and Experiences, wrapped in the compelling Narratives of their career Journeys and personal Aspirations.
    *Context: Driver profiles become interactive digital personas—animated biography timelines, 3D helmet viewers, career path visualizations, and personal philosophy displays that turn athletes into relatable brand heroes.*

-   **Leaders:** Defines the strategic executives and board-level authority figures. Their profiles focus on their Aspirations (Vision), specific Duties (Accountabilities), and the key Decisions they have influenced.
    *Context: Leader profiles create visual leadership narratives—executive video messages, decision timeline visualizations, and strategic influence maps that build institutional confidence and humanize management.*

-   **Members:** Defines the operational staff executing day-to-day work (e.g., Race Engineers, Mechanics). This collection humanizes the team by tracking their Classifications (Roles), Trainings, and operational Duties.
    *Context: Member data builds visual "meet the team" experiences—interactive role explorers, behind-the-scenes photo galleries, and team structure visualizations that showcase the human machinery behind brand success.*

-   **Users:** Defines authenticated individuals who manage, operate, or administer the platform (Admins, Editors). This is the system-level user collection controlling access to the Payload CMS panel.
    *Context: User management enables personalized visual experiences—role-based content displays, personalized dashboards, and contributor credit systems that power dynamic, multi-contributor brand storytelling.*

### Network
-   **Organizations:** Defines the external corporate entities associated with the brand. It establishes their Histories, details their Expectations (Partnership goals) and Compliances, and serves as the parent container for associated Individuals.
    *Context: Organization data creates visual partnership showcases—interactive sponsor walls, partnership timeline visualizations, and corporate integration displays that demonstrate brand ecosystem strength.*

-   **Individuals:** Defines the specific external points of contact within the network. They are defined by their Channels (Contact info) and Endpoints (Links), anchored by their specific Demographics (Location) and host Organization.
    *Context: Individual contacts become visual network nodes—interactive contact directories, relationship mapping visualizations, and connection displays that illustrate the human web supporting the brand.*

### Opportunities
-   **Careers:** Defines active job postings and recruitment opportunities. It outlines the specific Classifications (Department), Expectations (Requirements), and Duties (Responsibilities) for a potential hire.
    *Context: Career listings become visual recruitment experiences—animated job previews, interactive role explorers, and team culture showcases that attract talent through brand presentation, not just job descriptions.*

-   **Meetups:** Defines informal or community-driven gatherings (e.g., "Fan Club Breakfast"). These are distinct from official Events, managing specific Schedules and Demographics (Venues) for direct social engagement.
    *Context: Meetup information creates visual community calendars—interactive event maps, animated invitation displays, and social gathering previews that turn logistics into excitement for brand community participation.*

-   **Initiatives:** Defines purpose-driven, ongoing brand programs such as "Net Zero 2030" or "Youth Driver Academy." It houses the Stories of impact, the Timelines of progress, and the Engagements of the community.
    *Context: Initiative data fuels visual impact reports—animated progress dashboards, interactive program explorers, and outcome visualizations that transform corporate responsibility into compelling brand narratives.*

### Competencies
-   **Skills:** Defines the specific, measurable Capabilities, Talents, and Aptitudes possessed by an individual, allowing for granular talent mapping across the team.
    *Context: Skill data creates visual talent showcases—interactive skill radars, competency comparison tools, and capability visualizations that demonstrate team expertise in engaging, graphical formats.*

-   **Educations:** Defines the formal academic and professional background. It records Qualifications, Certifications, and *Languages acquired, validating the expertise of team members.
    *Context: Education information becomes visual credential displays—animated certificate walls, qualification timelines, and language skill indicators that build credibility through elegant visual presentation.*

-   **Preferences:** Defines the personal inclinations that humanize a profile. It captures Interests and Hobbies, providing depth to the public persona of drivers and staff.
    *Context: Preference data adds visual personality layers—interactive interest displays, hobby visualization widgets, and personal passion showcases that transform team members from roles into relatable characters.*

-   **Trainings:** Defines the developmental activities undertaken by the team. It identifies current Strengths to leverage and Weaknesses being addressed through specific coaching or practice.
    *Context: Training information creates visual development narratives—animated progress trackers, strength/weakness visualizations, and improvement timelines that showcase commitment to excellence as a brand value.*

-   **Experiences:** Defines the historical track record of an individual. It catalogs the specific Challenges faced and Achievements unlocked, building a resume of proven capability.
    *Context: Experience data fuels visual career journeys—interactive achievement timelines, challenge visualization stories, and accomplishment galleries that turn CVs into engaging digital biographies.*

### Obligations
-   **Expectations:** Defines the mutual understanding of required output. It clarifies the specific Requirements for a role or the Commitments agreed upon in a partnership.
    *Context: Expectation data becomes visual agreement displays—animated contract summaries, commitment visualizers, and requirement checklists that present professional standards as part of brand integrity storytelling.*

-   **Duties:** Defines the specific, actionable tasks performed. It lists the daily Responsibilities and strict Accountabilities attached to a role or initiative.
    *Context: Duty information creates visual role explorers—interactive responsibility maps, accountability visualizations, and task breakdown displays that showcase organizational structure through engaging design.*

-   **Protocols:** Defines the qualitative benchmarks for excellence. It establishes the Protocols, Guidelines, and cultural Norms that define "how we do things".
    *Context: Standard information becomes visual excellence manifests—animated quality charts, protocol visualization flows, and benchmark displays that present brand standards as aspirational visual targets.*

-   **Technicals:** Defines the hardware and software configuration details. It covers specific Questions of legality, physical Configurations of cars, and the Setups used for race weekends.
    *Context: Technical information fuels visual engineering showcases—interactive car configurators, animated setup explorers, and technical specification visualizations that turn mechanical details into engaging brand storytelling.*

### Specifications
-   **Medicals:** Defines biological and health-related data. It records critical Conditions, Allergies, and Fitness levels, essential for driver safety and team welfare.
    *Context: Medical data enables visual athlete wellness stories—animated fitness trackers, health milestone visualizations, and recovery journey narratives that humanize competitors through their physical dedication.*

-   **Classifications:** Defines the taxonomical sorting logic. It assigns individuals and assets to specific Departments and functional Roles to organize the internal hierarchy.
    *Context: Classification data creates visual organizational charts—interactive department explorers, role relationship maps, and hierarchy visualizations that present structure as elegant design rather than bureaucracy.*

-   **Features:** Defines the inherent descriptive qualities of an entity. It captures the unique Attributes, Properties, and Characteristics that distinguish one item (or event) from another.
    *Context: Feature information becomes visual differentiation displays—animated characteristic comparisons, property visualization tools, and unique attribute showcases that highlight what makes each brand element special.*

### Contacts
-   **Channels:** Defines the valid mediums for communication. It stores verified Phones, Emails, and Social Handles, ensuring distinct separation between professional and public contact methods.
    *Context: Channel data becomes visual contact interfaces—animated communication hubs, interactive contact selectors, and social media integration displays that make connecting with the brand an engaging experience.*

-   **Endpoints:** Defines the digital destinations associated with an entity. It stores Websites and external Links (e.g., portfolio URLs, sponsor landing pages).
    *Context: Endpoint information creates visual link ecosystems—animated webring displays, interactive resource hubs, and external connection visualizations that position the brand within a broader digital landscape.*

-   **Locations:** Defines physical presence and location data. It locates specific Locations, precise Addresses, and host Venues for events and meetings.
    *Context: Location data fuels visual location experiences—interactive venue maps, animated address displays, and geographic connection visualizations that ground the brand in physical space through digital design.*

### Editorial
-   **Articles:** Defines the primary written narrative content. This covers Race Reports, Press Releases, Feature Stories, and Interviews. It is the core engine for the "News" or "Latest" sections of the website.
    *Context: Article data structures immersive visual storytelling—animated text reveals, integrated media experiences, and interactive narrative layouts that transform written content into visually captivating brand moments.*

-   **Pages:** Defines the standalone narrative surfaces of the website (e.g., "Home," "About Us," "Contact"). These records control the layout, SEO metadata, and primary content structure for static routes.
    *Context: Page information creates cohesive visual experiences—consistent layout systems, animated page transitions, and structured content presentations that make every website view a deliberate brand expression.*

### Descriptions
-   **Tones:** Defines the emotional quality or "vibe" of a piece of content. It measures the Magnitudes of an event, the Qualities of a performance, and the unique Personalities involved.
    *Context: Tone information enables visual mood setting—animated emotional indicators, quality visualization scales, and personality representation tools that communicate subjective experience through objective design.*

-   **Notes:** Defines the added layer of intellectual value. It adds editorial Insights, distinct Observations, critical Remarks, and deep Analysis to existing content, often used for "Editor's Notes" or tactical breakdowns.
    *Context: Note data creates visual commentary layers—animated annotation systems, interactive insight popovers, and analysis visualization tools that add depth and authority to primary content through design.*

-   **Stories:** Defines the emotional and subjective retelling of events. It captures specific Interactions between people and the colorful Anecdotes that add flavor to the factual history.
    *Context: Story information creates visual narrative moments—animated anecdote displays, interactive story webs, and character-driven visualizations that humanize the brand through personal experiences.*

### Narratives
-   **Histories:** Defines the factual record of the past. It constructs the Biographies of people and the chronological Chronicles of events, serving as the official memory of the organization.
    *Context: History data fuels visual time travel experiences—scrolling historical timelines, interactive archive explorers, and animated chronicle displays that turn past achievements into living brand heritage.*

-   **Journeys:** Defines the path taken through space or time. It describes the physical Landscapes navigated, the Routes chosen, and the metaphorical Paths of a career trajectory.
    *Context: Journey data enables visual path tracking—animated route visualizers, career progression maps, and interactive landscape explorers that metaphorically illustrate brand and personal development.*

-   **Principles:** Defines the future intent and internal drive. It articulates the Philosophies, Ideologies, internal Motivations, and core Principles that guide drivers and leaders.
    *Context: Aspiration information becomes visual manifesto displays—animated philosophy statements, interactive principle explorers, and motivation visualization tools that present inner drive as external brand inspiration.*

### Resources
-   **Cars:** Defines the specific competition vehicles campaigned by the team. They are defined not just by model, but by their specific Technicals (Specs), current Kits (Livery), and competitive Histories.
    *Context: Car data fuels visual machine storytelling—interactive 3D model viewers, animated specification explorers, and livery customization tools that transform vehicles into central characters in the brand narrative.*

-   **Kits:** Defines the visual equipment and branding assets. It encompasses the artistic Designs of Helmets, Suits, and Car Liveries, managing the visual identity on track.
    *Context: Kit information creates visual identity playgrounds—interactive livery designers, animated helmet viewers, and uniform customization tools that make brand aesthetics an engaging user experience.*

-   **Galleries:** Defines the organized collections of still imagery. It groups Photos of action, formal Ceremonies, and candid emotional Reactions into consumable albums.
    *Context: Gallery data structures visual storytelling through photography—animated photo grids, interactive album explorers, and emotion-driven image sequences that use stillness to capture brand motion.*

-   **Footages:** Defines the organized collections of moving image. It groups Showreels, raw Onboards, broadcast Commentaries, and exclusive Interviews for video content.
    *Context: Footage information creates visual motion narratives—interactive video players, animated clip compilations, and interview highlight reels that bring brand energy to life through moving image.*

-   **Archives:** Defines the repository for non-media documentation. It stores official Documents, technical Reports, and historical Records, preserving the bureaucratic legacy of the team.
    *Context: Archive data enables visual historical exploration—animated document viewers, interactive report explorers, and record visualization tools that transform administrative paperwork into accessible brand heritage.*

-   **Visualizations:** Defines the complex data-driven graphics. It renders Animations, 3D models, Maps, Charts, and Graphs to explain data visually to the user.
    *Context: Visualization content IS the frontend experience—these are the animated graphs, interactive 3D models, dynamic maps, and data-driven animations that transform information into visual brand storytelling magic.*

### Ecommerce
-   **Products:** Defines the commercial merchandise items available for purchase. It captures pricing, variants (size/color), inventory levels, and descriptive marketing copy.
    *Context: Product data structures visual shopping experiences—interactive product viewers, animated merchandise showcases, and immersive store interfaces that transform commerce into brand extension storytelling.*

-   **Carts:** Defines the temporary persistence of user selections. It represents the "shopping basket" state before a transaction is finalized.
    *Context: Cart information enables visual shopping journeys—animated cart interfaces, interactive basket previews, and seamless checkout transitions that make purchasing feel like natural brand participation.*

-   **Orders:** Defines the finalized records of a successful checkout. It captures the customer details, line items purchased, and the fulfillment status.
    *Context: Order data creates visual purchase confidence—animated order confirmations, interactive tracking interfaces, and purchase history visualizations that transform transactions into relationship-building moments.*

-   **Transactions:** Defines the financial ledger entries for payments. It documents the payment gateway response, authorization codes, and monetary status (Paid, Failed, Refunded).
    *Context: Transaction information enables visual trust experiences—animated payment confirmations, secure checkout indicators, and financial status visualizations that make monetary exchanges feel safe and premium.*

### Meta
-   **Categories:** Defines the hierarchical organization logic. A Category like "Technical" or "Lifestyle" helps users filter Articles, Initiatives, and Products into meaningful buckets.
    *Context: Category data structures visual content discovery—animated filtering interfaces, interactive category explorers, and content organization systems that help users navigate brand stories through intuitive design.*

-   **Tags:** Defines flexible, non-hierarchical keywords. Tags allow for "fuzzy" grouping of content (e.g., tagging disparate content with #MonacoGP or #RainRace) to enable discovery across different Collections.
    *Context: Tag information creates visual content connections—animated tag clouds, cross-collection linking visualizations, and serendipitous discovery tools that reveal unexpected brand narrative relationships.*

-   **Media:** Defines the central repository for all raw asset files (Images, Videos, Documents, Audio). It enables organized storage, reuse, tagging, and credit management for assets used across all other collections.
    *Context: The Media library is the visual asset engine—providing optimized, organized, ready-to-display multimedia that powers every visual experience on the site, from hero images to interactive background elements.*
