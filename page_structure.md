# Page Structure with Sections (Collections being used) each with the Universal Section used

## / (Home)
- Videos: VideoCarousel
- Slides: ImageCarousel
- Competition: DirectoryGrid
- Races: Podium: Latest: Podium
- Drivers: Podium: Top: Podium

## /legal
- Policies: DirectoryList
- Regulations: DirectoryList

## /legal/policies/[slug]
- Content: RichText
- Download: DocumentGrid

## /legal/regulations/[slug]
- Content: RichText
- Download: DocumentGrid

## /contact
- Hero: HeroMedia
- Form: Form
- Map: MapGrid

## /about
- Identity: RichText
- Statements: TestimonialCarousel
- Plans: DirectoryList
- Initiatives: DirectoryGrid
- Hospitalities: DirectoryList

## /about/plans/[slug]
- Cover: HeroMedia
- Details: InfoGrid
- Quote: PullQuote
- Timeline: TimelineScroller

## /about/plans/[slug]/details
- Milestones: TimelineScroller
- Deliverables: ExpandableList
- Risks: ExpandableList
- KPIs: StatsGrid
- Documents: CollapsibleGrid

## /about/initiatives/[slug]
- Cover: HeroMedia
- Details: InfoGrid
- Quote: PullQuote
- Map: MapGrid
- Expectations: ExpandableList
- Documents: CollapsibleGrid

## /about/hospitalities/[slug]
- Cover: HeroMedia
- Details: InfoGrid
- Quote: PullQuote
- History: ProgressScroller
- Timeline: TimelineScroller
- Gallery: GalleryGrid

## /about/hospitalities/[slug]/details
- Map: MapGrid
- Inclusions: CollapsibleGrid
- Exclusions: CollapsibleGrid
- Requirements: ExpandableList
- Documents: CollapsibleGrid

## /calendar
- Upcoming Championships: TimelineScroller
- Upcoming Races: DirectoryCarouselGrid

## /calendar/timelines/[slug]
- Cover: HeroMedia
- Details: InfoGrid
- Milestones: TimelineScroller
- Events: DirectoryCarouselGrid
- Documents: CollapsibleGrid

## /calendar/championships/[slug]
- Video: VideoPlayer
- Details: InfoGrid
- Trophy: CentralMedia
- History: ProgressScroller
- Gallery: GalleryGrid

## /calendar/championships/[slug]/details
- Cover: HeroMedia
- Specifications: StatsGrid
- Podium: Podium
- Timeline: TimelineScroller
- Regulations: ExpandableList
- Documents: CollapsibleGrid

## /calendar/races/[slug]
- Video: VideoPlayer
- Details: InfoGrid
- History: ProgressScroller
- Gallery: GalleryGrid

## /calendar/races/[slug]/details
- Cover: HeroMedia
- Specifications: StatsGrid
- Competition: InfoGrid
- Highlights & Documents: GalleryGrid

## /competition
- Series: DirectoryGrid
- Seasons: DirectoryList
- Events: DirectoryGrid
- Sessions: DirectoryList
- Circuits: MapGrid

## /competition/series/[slug]
- Hero: HeroMedia
- Details: InfoGrid
- History: ProgressScroller
- Gallery: GalleryGrid

## /competition/series/[slug]/details
- Cover: HeroMedia
- Timeline: TimelineScroller
- Seasons: DirectoryGrid
- Map: MapGrid
- Documents: CollapsibleGrid

## /competition/seasons/[slug]
- Video: VideoPlayer
- Details: InfoGrid
- History: ProgressScroller
- Gallery: GalleryGrid

## /competition/seasons/[slug]/details
- Cover: HeroMedia
- Specifications: StatsGrid
- Series: DirectoryGrid
- Documents: CollapsibleGrid

## /competition/events/[slug]
- Videos: VideoCarousel
- Details: InfoGrid
- History: ProgressScroller
- Cover: HeroMedia
- Specifications: StatsGrid
- Season: DirectoryList

## /competition/sessions/[slug]
- Videos: VideoCarousel
- History: ProgressScroller
- Cover: HeroMedia
- Specifications: StatsGrid
- Entries: CardCarousel
- Gallery: GalleryGrid

## /competition/circuits/[slug]
- Video: VideoPlayer
- Details: InfoGrid
- Statement: PullQuote
- History: ProgressScroller
- Gallery: GalleryGrid

## /competition/circuits/[slug]/details
- Map: MapGrid
- Cover: HeroMedia
- Specifications: StatsGrid
- Renovations: ExpandableList
- Documents: CollapsibleGrid

## /teams
- Teams: DirectoryGrid
- Individuals: DirectoryGrid
- Organizations: DirectoryGrid

## /teams/[slug]
- Tagline: PullQuote
- Details: InfoGrid
- History: ProgressScroller
- Drivers: DirectoryGrid
- Leaders: DirectoryGrid
- Gallery: GalleryGrid

## /teams/[slug]/drivers/[slug]
- Video: VideoPlayer
- Details: InfoGrid
- Autograph: CentralMedia
- History: ProgressScroller
- Crew Members: DirectoryGrid
- Gallery: GalleryGrid
- Celebrations: DirectoryGrid
- Incidents: DirectoryList

## /teams/[slug]/drivers/[slug]/details
- Cover: HeroMedia
- Catchphrase: PullQuote
- Specifications: StatsGrid
- Skills: StatsGrid
- Awards: DirectoryGrid
- Points & Results: ChartTable
- Socials: DirectoryGrid

## /teams/[slug]/leaders/[slug]
- Video: VideoPlayer
- Details: InfoGrid
- Autograph: CentralMedia
- History: ProgressScroller
- Gallery: GalleryGrid
- Celebrations: DirectoryGrid
- Interviews: DirectoryGrid

## /teams/[slug]/leaders/[slug]/details
- Quote: PullQuote
- Principles: ExpandableList
- Awards: DirectoryGrid
- Socials: DirectoryGrid

## /opportunities
- Programs: DirectoryGrid
- Onboardings: DirectoryList
- Vacancies: DirectoryList
- Meetups: DirectoryGrid

## /opportunities/programs/[slug]
- Hero: HeroMedia
- Details: InfoGrid
- Partners & Sponsors: DirectoryStrip
- Gallery: GalleryGrid

## /opportunities/programs/[slug]/details
- Cover: HeroMedia
- Eligibility: ExpandableList
- Curriculum: ExpandableList
- Mentors: DirectoryGrid
- Participants: DirectoryGrid
- Documents: CollapsibleGrid

## /opportunities/onboardings/[slug]
- Videos: VideoCarousel
- Details: InfoGrid
- Certificate: CentralMedia
- Gallery: GalleryGrid

## /opportunities/onboardings/[slug]/details
- Cover: HeroMedia
- Tasks: ExpandableList
- Modules: ExpandableList
- Quizzes: ExpandableList
- Documents: CollapsibleGrid

## /opportunities/vacancies/[slug]
- Details: InfoGrid
- Form: Form

## /opportunities/vacancies/[slug]/details
- Thumbnail: HeroMedia
- Positions: TimelineScroller
- Specifications: StatsGrid
- Expectations: ExpandableList

## /opportunities/meetups/[slug]
- Video: VideoPlayer
- Details: InfoGrid
- Gallery: GalleryGrid

## /opportunities/meetups/[slug]/details
- Cover: HeroMedia
- Hosts: DirectoryGrid
- Attendees: DirectoryTabs
- Documents: CollapsibleGrid

## /resources
- Cars: DirectoryGrid
- Garages: DirectoryGrid
- Helmets: DirectoryGrid
- Suits: DirectoryGrid

## /resources/cars/[slug]
- Video: VideoPlayer
- Details: InfoGrid
- History: ProgressScroller
- Gallery: GalleryGrid

## /resources/cars/[slug]/details
- Cover: HeroMedia
- Manufacturers: DirectoryList
- Classifications: ExpandableList
- Specifications: StatsGrid
- Documents: CollapsibleGrid

## /resources/garages/[slug]
- Hero: HeroMedia
- Details: InfoGrid
- History: ProgressScroller
- Gallery: GalleryGrid

## /resources/garages/[slug]/details
- Cover: HeroMedia
- Amenities: CollapsibleGrid
- Operators: DirectoryList
- Documents: CollapsibleGrid

## /resources/helmets/[slug]
- Video: VideoPlayer
- Details: InfoGrid
- Gallery: GalleryGrid

## /resources/helmets/[slug]/details
- Cover: HeroMedia
- Manufacturers: DirectoryList
- Classifications: ExpandableList

## /resources/suits/[slug]
- Video: VideoPlayer
- Details: InfoGrid
- Manufacturers: DirectoryList
- Gallery: GalleryGrid

## /shop
- Products: DirectoryGrid

## /auth
- Login: Form
- Register: Form
- Account: Dashboard