# Complete Page Structure: 

## Page Paths:
/

/legal
/legal/policies
/legal/policies/[slug]
/legal/regulations/[slug]

/contact

/about

/about/plans
/about/plans/[slug]
/about/plans/[slug]/details

/about/initiatives
/about/initiatives/[slug]

/about/hospitalities
/about/hospitalities/[slug]
/about/hospitalities/[slug]/details

/calendar
/calendar/timelines
/calendar/timelines/[slug]

/calendar/championships
/calendar/championships/[slug]
/calendar/championships/[slug]/details

/calendar/races
/calendar/races/[slug]
/calendar/races/[slug]/details

/competition

/competition/series
/competition/series/[slug]
/competition/series/[slug]/details

/competition/seasons
/competition/seasons/[slug]
/competition/seasons/[slug]/details

/competition/events
/competition/events/[slug]

/competition/sessions
/competition/sessions/[slug]

/competition/circuits
/competition/circuits/[slug]
/competition/circuits/[slug]/details

/teams
/teams/[slug]

/teams/[slug]/drivers
/teams/[slug]/drivers/[slug]
/teams/[slug]/drivers/[slug]/details

/teams/[slug]/leaders
/teams/[slug]/leaders/[slug]
/teams/[slug]/leaders/[slug]/details

/individuals
/individuals/[slug]

/organizations
/organizations/[slug]

/opportunities

/opportunities/programs
/opportunities/programs/[slug]
/opportunities/programs/[slug]/details

/opportunities/onboardings
/opportunities/onboardings/[slug]
/opportunities/onboardings/[slug]/details

/opportunities/vacancies
/opportunities/vacancies/[slug]
/opportunities/vacancies/[slug]/details

/opportunities/meetups
/opportunities/meetups/[slug]
/opportunities/meetups/[slug]/details

/resources
/resources/cars
/resources/cars/[slug]
/resources/cars/[slug]/details

/resources/garages
/resources/garages/[slug]
/resources/garages/[slug]/details

/resources/helmets
/resources/helmets/[slug]
/resources/helmets/[slug]/details

/resources/suits
/resources/suits/[slug]
/resources/suits/[slug]/details

## Page Format with Sections:

### Page: (All collections to fetch)
    - Collections: Collection data used either completely or only specific fields
    - Section: Universal Section Block

## Page List:

### / (Home): (Events, Sessions, Onboardings, Slides, Series, Races, Drivers)
- Videos:
    - Collections: Events, Sessions, Onboardings 
    - Section: CarouselSection
- Slides:
    - Collections: Slides
    - Section: CarouselSection
- Competition:
    - Collections: Series, Sessions, Events
    - Section: GridSection
- Races:
    - Collections: Races
    - Section: FeatureSection
- Drivers:
    - Collections: Drivers
    - Section: FeatureSection

### /legal: (Policies, Regulations)
- Policies:
    - Collections: Policies
    - Section: ListSection
- Regulations:
    - Collections: Regulations
    - Section: ListSection

### /legal/policies/[slug]: (Policies)
- Content:
    - Collections: Policies
    - Section: FeatureSection
- Download:
    - Collections: Policies
    - Section: GridSection

### /legal/regulations/[slug]: (Regulations)
- Content:
    - Collections: Regulations
    - Section: FeatureSection
- Download:
    - Collections: Regulations
    - Section: GridSection

### /contact: (None)
- Hero:
    - Collections: None
    - Section: HeroSection
- Form:
    - Collections: None
    - Section: PanelSection
- Map:
    - Collections: None
    - Section: MapSection

### /about: (Identity, Statements, Plans, Initiatives, Hospitalities)
- Identity:
    - Globals: Identity
    - Section: FeatureSection
- Statements:
    - Collections: Statements
    - Section: CarouselSection
- Plans:
    - Collections: Plans
    - Section: ListSection
- Initiatives:
    - Collections: Initiatives
    - Section: GridSection
- Hospitalities:
    - Collections: Hospitalities
    - Section: ListSection

### /about/plans/[slug]: (Plans)
- Cover:
    - Collections: Plans
    - Section: HeroSection
- Details:
    - Collections: Plans
    - Section: StudySection
- Quote:
    - Collections: Plans
    - Section: QuoteSection
- Timeline:
    - Collections: Plans
    - Section: TimelineSection

### /about/plans/[slug]/details: (Plans)
- Milestones:
    - Collections: Plans
    - Section: TimelineSection
- Deliverables:
    - Collections: Plans
    - Section: ListSection
- Risks:
    - Collections: Plans
    - Section: ListSection
- KPIs:
    - Collections: Plans
    - Section: GridSection
- Documents:
    - Collections: Plans
    - Section: GridSection

### /about/initiatives/[slug]: (Initiatives)
- Cover:
    - Collections: Initiatives
    - Section: HeroSection
- Details:
    - Collections: Initiatives
    - Section: StudySection
- Quote:
    - Collections: Initiatives
    - Section: QuoteSection
- Map:
    - Collections: Initiatives
    - Section: MapSection
- Expectations:
    - Collections: Initiatives
    - Section: ListSection
- Documents:
    - Collections: Initiatives
    - Section: GridSection

### /about/hospitalities/[slug]: (Hospitalities)
- Cover:
    - Collections: Hospitalities
    - Section: HeroSection
- Details:
    - Collections: Hospitalities
    - Section: StudySection
- Quote:
    - Collections: Hospitalities
    - Section: QuoteSection
- History:
    - Collections: Hospitalities
    - Section: ScrollSection
- Timeline:
    - Collections: Hospitalities
    - Section: TimelineSection
- Gallery:
    - Collections: Hospitalities
    - Section: MasonrySection

### /about/hospitalities/[slug]/details: (Hospitalities)
- Map:
    - Collections: Hospitalities
    - Section: MapSection
- Inclusions:
    - Collections: Hospitalities
    - Section: GridSection
- Exclusions:
    - Collections: Hospitalities
    - Section: GridSection
- Requirements:
    - Collections: Hospitalities
    - Section: ListSection
- Documents:
    - Collections: Hospitalities
    - Section: GridSection

### /calendar: (Championships, Races)
- Upcoming Championships:
    - Collections: Championships
    - Section: TimelineSection
- Upcoming Races:
    - Collections: Races
    - Section: GridSection

### /calendar/timelines/[slug]: (Timelines)
- Cover:
    - Collections: Timelines
    - Section: HeroSection
- Details:
    - Collections: Timelines
    - Section: StudySection
- Milestones:
    - Collections: Timelines
    - Section: TimelineSection
- Events:
    - Collections: Timelines
    - Section: GridSection
- Documents:
    - Collections: Timelines
    - Section: GridSection

### /calendar/championships/[slug]: (Championships)
- Video:
    - Collections: Championships
    - Section: VideoSection
- Details:
    - Collections: Championships
    - Section: StudySection
- Trophy:
    - Collections: Championships
    - Section: FeatureSection
- History:
    - Collections: Championships
    - Section: ScrollSection
- Gallery:
    - Collections: Championships
    - Section: MasonrySection

### /calendar/championships/[slug]/details: (Championships)
- Cover:
    - Collections: Championships
    - Section: HeroSection
- Specifications:
    - Collections: Championships
    - Section: GridSection
- Podium:
    - Collections: Championships
    - Section: FeatureSection
- Timeline:
    - Collections: Championships
    - Section: TimelineSection
- Regulations:
    - Collections: Championships
    - Section: ListSection
- Documents:
    - Collections: Championships
    - Section: GridSection

### /calendar/races/[slug]: (Races)
- Video:
    - Collections: Races
    - Section: VideoSection
- Details:
    - Collections: Races
    - Section: StudySection
- History:
    - Collections: Races
    - Section: ScrollSection
- Gallery:
    - Collections: Races
    - Section: MasonrySection

### /calendar/races/[slug]/details: (Races)
- Cover:
    - Collections: Races
    - Section: HeroSection
- Specifications:
    - Collections: Races
    - Section: GridSection
- Competition:
    - Collections: Races
    - Section: StudySection
- Highlights & Documents:
    - Collections: Races
    - Section: MasonrySection

### /competition: (Series, Seasons, Events, Sessions, Circuits)
- Series:
    - Collections: Series
    - Section: GridSection
- Seasons:
    - Collections: Seasons
    - Section: ListSection
- Events:
    - Collections: Events
    - Section: GridSection
- Sessions:
    - Collections: Sessions
    - Section: ListSection
- Circuits:
    - Collections: Circuits
    - Section: MapSection

### /competition/series/[slug]: (Series)
- Hero:
    - Collections: Series
    - Section: HeroSection
- Details:
    - Collections: Series
    - Section: StudySection
- History:
    - Collections: Series
    - Section: ScrollSection
- Gallery:
    - Collections: Series
    - Section: MasonrySection

### /competition/series/[slug]/details: (Series)
- Cover:
    - Collections: Series
    - Section: HeroSection
- Timeline:
    - Collections: Series
    - Section: TimelineSection
- Seasons:
    - Collections: Series
    - Section: GridSection
- Map:
    - Collections: Series
    - Section: MapSection
- Documents:
    - Collections: Series
    - Section: GridSection

### /competition/seasons/[slug]: (Seasons)
- Video:
    - Collections: Seasons
    - Section: VideoSection
- Details:
    - Collections: Seasons
    - Section: StudySection
- History:
    - Collections: Seasons
    - Section: ScrollSection
- Gallery:
    - Collections: Seasons
    - Section: MasonrySection

### /competition/seasons/[slug]/details: (Seasons)
- Cover:
    - Collections: Seasons
    - Section: HeroSection
- Specifications:
    - Collections: Seasons
    - Section: GridSection
- Series:
    - Collections: Seasons
    - Section: GridSection
- Documents:
    - Collections: Seasons
    - Section: GridSection

### /competition/events/[slug]: (Events)
- Videos:
    - Collections: Events
    - Section: CarouselSection
- Details:
    - Collections: Events
    - Section: StudySection
- History:
    - Collections: Events
    - Section: ScrollSection
- Cover:
    - Collections: Events
    - Section: HeroSection
- Specifications:
    - Collections: Events
    - Section: GridSection
- Season:
    - Collections: Events
    - Section: ListSection

### /competition/sessions/[slug]: (Sessions)
- Videos:
    - Collections: Sessions
    - Section: CarouselSection
- History:
    - Collections: Sessions
    - Section: ScrollSection
- Cover:
    - Collections: Sessions
    - Section: HeroSection
- Specifications:
    - Collections: Sessions
    - Section: GridSection
- Entries:
    - Collections: Sessions
    - Section: CarouselSection
- Gallery:
    - Collections: Sessions
    - Section: MasonrySection

### /competition/circuits/[slug]: (Circuits)
- Video:
    - Collections: Circuits
    - Section: VideoSection
- Details:
    - Collections: Circuits
    - Section: StudySection
- Statement:
    - Collections: Circuits
    - Section: QuoteSection
- History:
    - Collections: Circuits
    - Section: ScrollSection
- Gallery:
    - Collections: Circuits
    - Section: MasonrySection

### /competition/circuits/[slug]/details: (Circuits)
- Map:
    - Collections: Circuits
    - Section: MapSection
- Cover:
    - Collections: Circuits
    - Section: HeroSection
- Specifications:
    - Collections: Circuits
    - Section: GridSection
- Renovations:
    - Collections: Circuits
    - Section: ListSection
- Documents:
    - Collections: Circuits
    - Section: GridSection

### /teams: (Teams, Individuals, Organizations)
- Teams:
    - Collections: Teams
    - Section: GridSection
- Individuals:
    - Collections: Teams
    - Section: GridSection
- Organizations:
    - Collections: Teams
    - Section: GridSection

### /teams/[slug]: (Teams, Drivers, Leaders)
- Tagline:
    - Collections: Teams
    - Section: QuoteSection
- Details:
    - Collections: Teams
    - Section: StudySection
- History:
    - Collections: Teams
    - Section: ScrollSection
- Drivers:
    - Collections: Drivers
    - Section: GridSection
- Leaders:
    - Collections: Leaders
    - Section: GridSection
- Gallery:
    - Collections: Teams
    - Section: MasonrySection

### /teams/[slug]/drivers/[slug]: (Drivers, Crew Members)
- Video:
    - Collections: Drivers
    - Section: VideoSection
- Details:
    - Collections: Drivers
    - Section: StudySection
- Autograph:
    - Collections: Drivers
    - Section: FeatureSection
- History:
    - Collections: Drivers
    - Section: ScrollSection
- Crew Members:
    - Collections: Members
    - Section: GridSection
- Gallery:
    - Collections: Drivers
    - Section: MasonrySection
- Celebrations:
    - Collections: Celebrations
    - Section: GridSection
- Incidents:
    - Collections: Incidents
    - Section: ListSection

### /teams/[slug]/drivers/[slug]/details: (Drivers, Skills, Awards, Points, Results)
- Cover:
    - Collections: Drivers
    - Section: HeroSection
- Catchphrase:
    - Collections: Drivers
    - Section: QuoteSection
- Specifications:
    - Collections: Drivers
    - Section: GridSection
- Skills:
    - Collections: Skills
    - Section: GridSection
- Awards:
    - Collections: Awards
    - Section: GridSection
- Points & Results:
    - Collections: Points, Results
    - Section: TableSection
- Socials:
    - Collections: Drivers
    - Section: GridSection

### /teams/[slug]/leaders/[slug]: (Leaders, Celebrations, Interviews)
- Video:
    - Collections: Leaders
    - Section: VideoSection
- Details:
    - Collections: Leaders
    - Section: StudySection
- Autograph:
    - Collections: Leaders
    - Section: FeatureSection
- History:
    - Collections: Leaders
    - Section: ScrollSection
- Gallery:
    - Collections: Leaders
    - Section: MasonrySection
- Celebrations:
    - Collections: Celebrations
    - Section: GridSection
- Interviews:
    - Collections: Interviews
    - Section: GridSection

### /teams/[slug]/leaders/[slug]/details: (Leaders, Awards)
- Quote:
    - Collections: Leaders
    - Section: QuoteSection
- Principles:
    - Collections: Leaders
    - Section: ListSection
- Awards:
    - Collections: Awards
    - Section: GridSection
- Socials:
    - Collections: Leaders
    - Section: GridSection

### /opportunities: (Programs, Onboardings, Vacancies, Meetups)
- Programs:
    - Collections: Programs
    - Section: GridSection
- Onboardings:
    - Collections: Onboardings
    - Section: ListSection
- Vacancies:
    - Collections: Vacancies
    - Section: ListSection
- Meetups:
    - Collections: Meetups
    - Section: GridSection

### /opportunities/programs/[slug]: (Programs, Organizations)
- Hero:
    - Collections: Programs
    - Section: HeroSection
- Details:
    - Collections: Programs
    - Section: StudySection
- Partners & Sponsors:
    - Collections: Organizations
    - Section: CarouselSection
- Gallery:
    - Collections: Programs
    - Section: MasonrySection

### /opportunities/programs/[slug]/details: (Programs, Individuals, Drivers)
- Cover:
    - Collections: Programs
    - Section: HeroSection
- Eligibility:
    - Collections: Programs
    - Section: ListSection
- Curriculum:
    - Collections: Programs
    - Section: ListSection
- Mentors:
    - Collections: Individuals
    - Section: GridSection
- Participants:
    - Collections: Drivers
    - Section: GridSection
- Documents:
    - Collections: Programs
    - Section: GridSection

### /opportunities/onboardings/[slug]: (Onboardings)
- Videos:
    - Collections: Onboardings
    - Section: CarouselSection
- Details:
    - Collections: Onboardings
    - Section: StudySection
- Certificate:
    - Collections: Onboardings
    - Section: FeatureSection
- Gallery:
    - Collections: Onboardings
    - Section: MasonrySection

### /opportunities/onboardings/[slug]/details: (Onboardings, Individuals)
- Cover:
    - Collections: Onboardings
    - Section: HeroSection
- Tasks:
    - Collections: Onboardings
    - Section: ListSection
- Modules:
    - Collections: Onboardings
    - Section: ListSection
- Quizzes:
    - Collections: Onboardings
    - Section: ListSection
- Documents:
    - Collections: Programs
    - Section: GridSection

### /opportunities/vacancies/[slug]: (Vacancies)
- Details:
    - Collections: Vacancies
    - Section: StudySection
- Form:
    - Collections: Vacancies
    - Section: PanelSection

### /opportunities/vacancies/[slug]/details: (Vacancies)
- Thumbnail:
    - Collections: Vacancies
    - Section: HeroSection
- Positions:
    - Collections: Vacancies
    - Section: TimelineSection
- Specifications:
    - Collections: Vacancies
    - Section: GridSection
- Expectations:
    - Collections: Vacancies
    - Section: ListSection

### /opportunities/meetups/[slug]: (Meetups)
- Video:
    - Collections: Meetups
    - Section: VideoSection
- Details:
    - Collections: Meetups
    - Section: StudySection
- Gallery:
    - Collections: Meetups
    - Section: MasonrySection

### /opportunities/meetups/[slug]/details: (Meetups, Drivers, Members, Leaders, Individuals, Organizations)
- Cover:
    - Collections: Meetups
    - Section: HeroSection
- Hosts:
    - Collections: Leaders, Individuals, Organizations
    - Section: GridSection
- Attendees:
    - Collections: Drivers, Members, Leaders, Individuals, Organizations
    - Section: TabSection
- Documents:
    - Collections: Meetups
    - Section: GridSection

### /resources: (Cars, Garages, Helmets, Suits)
- Cars:
    - Collections: Cars
    - Section: GridSection
- Garages:
    - Collections: Garages
    - Section: GridSection
- Helmets:
    - Collections: Helmets
    - Section: GridSection
- Suits:
    - Collections: Suits
    - Section: GridSection

### /resources/cars/[slug]: (Cars)
- Video:
    - Collections: Cars
    - Section: VideoSection
- Details:
    - Collections: Cars
    - Section: StudySection
- History:
    - Collections: Cars
    - Section: ScrollSection
- Gallery:
    - Collections: Cars
    - Section: MasonrySection

### /resources/cars/[slug]/details: (Cars)
- Cover:
    - Collections: Cars
    - Section: HeroSection
- Manufacturers:
    - Collections: Organizations
    - Section: ListSection
- Classifications:
    - Collections: Categories
    - Section: ListSection
- Specifications:
    - Collections: Cars
    - Section: GridSection
- Documents:
    - Collections: Programs
    - Section: GridSection

### /resources/garages/[slug]: (Garages)
- Hero:
    - Collections: Garages
    - Section: HeroSection
- Details:
    - Collections: Garages
    - Section: StudySection
- History:
    - Collections: Garages
    - Section: ScrollSection
- Gallery:
    - Collections: Garages
    - Section: MasonrySection

### /resources/garages/[slug]/details: (Garages, Organizations)
- Cover:
    - Collections: Garages
    - Section: HeroSection
- Amenities:
    - Collections: Garages
    - Section: GridSection
- Operators:
    - Collections: Organizations
    - Section: ListSection
- Documents:
    - Collections: Garages
    - Section: GridSection

### /resources/helmets/[slug]: (Helmets)
- Video:
    - Collections: Helmets
    - Section: VideoSection
- Details:
    - Collections: Helmets
    - Section: StudySection
- Gallery:
    - Collections: Helmets
    - Section: MasonrySection

### /resources/helmets/[slug]/details: (Helmets)
- Cover:
    - Collections: Helmets
    - Section: HeroSection
- Manufacturers:
    - Collections: Helmets
    - Section: ListSection
- Classifications:
    - Collections: Helmets
    - Section: ListSection

### /resources/suits/[slug]: (Suits)
- Video:
    - Collections: Suits
    - Section: VideoSection
- Details:
    - Collections: Suits
    - Section: StudySection
- Manufacturers:
    - Collections: Suits
    - Section: ListSection
- Gallery:
    - Collections: Suits
    - Section: MasonrySection

### /shop: (Products)
- Products:
    - Collections: Products
    - Section: GridSection

### /auth
- Login: PanelSection
- Register: PanelSection
- Account: PanelSection