## DRIVERS DIRECTORY: /teams/[slug]/drivers

- **Hero**: (Team branding using SEO title and description)
- **Grid**: (Active drivers; displays `assets.avatar`, `first_name`, `last_name`, and `basics.racing_number`)
- **List**: (Retired drivers; filtered by `basics.retirement_date`)
- **Carousel**: (Aggregated `assets.thumbnail` from **Celebrations** referencing these drivers)
- **Masonry**: (Aggregated `assets.gallery.list` from all drivers in the team)

---

## DRIVER PROFILE: /teams/[slug]/drivers/[driverSlug]

- **Hero**: (`assets.avatar`; paired with `basics.nickname`, `basics.callsign` and button to details)
- **Quote**: (`basics.catchphrase`; paired with `basics.callsign` or `basics.nickname`)
- **Feature**: (`assets.autograph`; highlight graphic with `basics.competition_name`)
- **Leaderboard**: (Metrics calculated from `details.results`, `details.points`, and `details.awards`)
- **Gallery**: (`assets.gallery.list`; dedicated driver media)
- **Panel**: (`details.socials.list` and `details.websites.list`; external connectivity)
- **Shorts**: (`assets.video` or highlights from associated **Race** collections)

---

## DRIVER DETAILS: /teams/[slug]/drivers/[driverSlug]/details

- **Cover**: (`assets.cover`; overlays `first_name`, `middle_name`, `last_name`, and `alias`)
- **Info**: (Table of basics: Nationality, Gender, Pronouns, Birth Date, Debut Date, Retirement Date)
- **Study**: (`details.biography`; rich text/Lexical rendering)
- **Text Reveal**: (`details.story`; rich text/Lexical rendering)
- **Table**: (`details.results` and `details.points`; structured competitive data)
- **List**: (`details.awards` and `details.skills`; career milestones and technical competencies)
- **Timeline**: (Chronological merge of **Race** history, Championship standings, and **Incident** logs)
- **Carousel**: (`details.cars`; displays related **Car** collection assets)
- **Scroll**: (**Member** collection; horizontal scroll of personnel linked to the driver)
- **Map**: (`details.addresses.list`; plots location coordinates)
- **Documents**: (`assets.documents`; pulled from associated **Onboarding** or **Program** collections)
- **Videos**: (`assets.video`; curated from related **Meetup**, **Race**, or **Incident** collections)
- **Tab**: (`traits.eligibility` or `traits.curriculum`; if driver is currently in a **Program**)

## LEADERS DIRECTORY: /teams/[slug]/leaders

- **Hero**: (Global Data; collective leadership title and mission statement from team context)
- **Marquee**: (`first_name` and `alias`; a high-energy "Name Wall" establishing the roster)
- **Grid**: (`assets.avatar` and `basics.title`; the current active leadership roster)
- **Table**: (`basics.retirement_date`; archive of retired leaders sortable by tenure and debut dates)
- **Carousel**: (`assets.thumbnail` from **Celebration**; highlights of leadership-specific honors)
- **Masonry**: (`assets.gallery` aggregated from **Meetup**; action wall of leadership-led events)

---

## LEADER PROFILE: /teams/[slug]/leaders/[leaderSlug]

- **Cover**: (`assets.cover`; the primary professional portrait)
- **Quote**: (`details.quote`; high-impact pull-out of the leader's core philosophy)
- **Feature**: (`details.mission` and `details.vision`; side-by-side presentation of core objectives)
- **List**: (`details.awards`; a clean, prestigious bulleted list of career honors)
- **Info**: (`details.designations`; accordions for definitions and descriptions of formal titles)
- **Panel**: (`details.socials.list` and `details.websites.list`; external connectivity drawer)
- **Gallery**: (`assets.gallery`; the individual leader's professional photo and video reel)
- **Shorts**: (`assets.video` from **Celebration**; short-form highlight clips of speeches or milestones)

---

## LEADER DETAILS: /teams/[slug]/leaders/[leaderSlug]/details

- **Hero**: (`assets.avatar` and `basics.nickname`; a personal, informal profile header)
- **Info**: (Table of basics: `nationality`, `gender`, `birth_date`, `debut_date`, and `retirement_date`)
- **Study**: (`details.biography`; specialized Lexical JSON rendering for deep biography)
- **Text Reveal**: (`details.history`; narrative scroll for the long-form career journey)
- **Tab**: (`details.principles.list`; interactive toggle between Name, Statement, and Rationale)
- **Timeline**: (Chronological merge of `basics.debut` and **Meetup** `details.start_date` hosting history)
- **Scroll**: (**Program** collection; horizontal cards of initiatives where the leader is a mentor)
- **Table**: (**Onboarding** collection; technical tracker of `traits.checklist` tasks managed or assigned)
- **Map**: (`details.locations` from **Meetup** and **Celebration**; geospatial plot of active influence)
- **Documents**: (`assets.documents` pulled from associated **Onboarding** or **Program** collections)
- **Videos**: (`assets.video` curated from long-form **Meetup** or **Program** educational footage)

---

## RESOURCES DIRECTORY: /resources

- **Hero**: (Global Resource overview; hardcoded inventory title and description)
- **Marquee**: (Scroll of collection names: Cars, Garages, Helmets, Suits; picsum fallback logos)
- **Grid**: (`assets.thumbnail` from first item of each collection; category cards linking to subdirectories)
- **Carousel**: (Shuffled `assets.thumbnail`/`assets.avatar` from 8 random items across all 4 collections)
- **Masonry**: (`assets.gallery`/`assets.images` from Cars and Garages only)

---

## CARS DIRECTORY: /resources/cars

- **Hero**: (Hardcoded fleet branding; badge and meta)
- **Grid**: (`assets.avatar`, `name`, `basics.identifiers.model` for cars with `details.status === 'Active'`)
- **Table**: (All cars; columns: name, model, status, technicalCategories)
- **List**: (`details.status === 'Retired' || 'Museum'`; subtitle from model, status tag)
- **Carousel**: (`assets.thumbnail`/`assets.highlights[0]` from latest 12 races)

---

## CAR PROFILE: /resources/cars/[slug]

- **Hero**: (`assets.avatar`, `basics.identifiers.chassis`, `alias`, `details.status`, `basics.identifiers.model`; actions to details)
- **Quote**: (`basics.tagline`, author from car name)
- **Feature**: (`assets.cover`, `basics.identifiers.version`; single feature with stats: chassis, status; cta to details)
- **Gallery**: (`assets.gallery` array mapped to GallerySection items)
- **Panel**: (`details.manufacturers` as Organization objects; title, summary from type, content from description)
- **Shorts**: (`assets.video`; single short if url exists, poster from cover)

---

## CAR DETAILS: /resources/cars/[slug]/details

- **Cover**: (`assets.cover`; picsum fallback)
- **Info**: (Cards: status, technicalCategories, chassis, model; from car.details and car.basics.identifiers)
- **Study**: (`details.history` Lexical; single study item with cover image)
- **Table**: (`details.specifications.list`; columns: parameter, value, description)
- **Expand**: (`details.classifications.list`; title from name, description from definition/description)
- **Scroll**: (`details.members` as populated Member objects; title from name, description from duties)
- **Documents**: (`assets.documents` array; filename, mimeType, filesize, url)
- **Videos**: (`assets.video`; single video item if url exists)

---

## GARAGES DIRECTORY: /resources/garages

- **Hero**: (Hardcoded facilities branding)
- **Grid**: (`assets.thumbnail`, `name`, `details.type` for all garages)
- **Map**: (`details.location` coordinates; type primary, description from garage type)
- **List**: (All garages sorted by capacity descending; subtitle from description/tagline, status from accessibility, tag from capacity, metadata with type/size/code)

---

## GARAGE PROFILE: /resources/garages/[slug]

- **Hero**: (`assets.thumbnail`, `basics.identifiers.code`, `details.type`; actions to details)
- **Feature**: (`assets.cover`, `details.type`; single feature with stats: code; cta to details)
- **Info**: (Cards: size_sq_m, capacity, accessibility, type)
- **Gallery**: (`assets.gallery` array)
- **Panel**: (`details.ownership` and `details.operators` as Organization objects; title, summary from role, content from description)

---

## GARAGE DETAILS: /resources/garages/[slug]/details

- **Study**: (`details.history` Lexical; single study item with picsum fallback)
- **Tab**: (`details.amenities.list`; label from name, content from description)
- **Timeline**: (Events: start_date as opened, end_date as closed if present)
- **Map**: (`details.location`; single primary marker)
- **Text Reveal**: (`details.notes`; only if present)
- **Documents**: (`assets.documents` array)

---

## HELMETS DIRECTORY: /resources/helmets

- **Hero**: (Hardcoded design/safety branding)
- **Grid**: (`assets.avatar`, `name`, `details.year`, `details.style`)
- **Marquee**: (Unique `details.designer` and `details.style` values; picsum fallback logos)

---

## HELMET PROFILE: /resources/helmets/[slug]

- **Hero**: (`assets.avatar`, `details.year`, `details.usage`; actions to details)
- **Quote**: (`basics.tagline`, author from helmet name)
- **Feature**: (`assets.thumbnail`, `details.inspiration`; single feature with stats: designer; cta to details)
- **Info**: (Cards: color, material, branding, style)
- **Gallery**: (`assets.images` array)
- **Shorts**: (`assets.video`; single short if url exists)

---

## HELMET DETAILS: /resources/helmets/[slug]/details

- **Hero**: (`assets.avatar`, `details.year`, `details.designer`, `details.usage`; badge from usage)
- **Info**: (Cards: color, material, branding, style; headerVariant 2, no footer)
- **Expand**: (`details.classifications.list`; no header/footer variants)
- **List**: (`details.manufacturers.list`; tag MFR)
- **Text Reveal**: (`details.concept`; only if present)
- **Timeline**: (`details.year` as debut event + 10 related races sorted chronologically; no header/footer variants)
- **Carousel**: (12 celebrations; ctaHref undefined)
- **Table**: (20 drivers; columns: name, number, nationality; headerVariant 2, no footer)
- **Shorts**: (`assets.video`; single short if url exists; no header/footer variants)

---

## SUITS DIRECTORY: /resources/suits

- **Hero**: (Hardcoded durability/aesthetics branding)
- **Grid**: (`assets.thumbnail`, `name`, `details.appearance`)

---

## SUIT PROFILE: /resources/suits/[slug]

- **Hero**: (`assets.thumbnail`, `details.material`, `details.usage`; badge SUIT, meta durability; no actions)
- **Feature**: (`assets.thumbnail`, `details.durability`; single feature with stats: material)
- **List**: (`details.manufacturers.list`; tag MFR)
- **Gallery**: (`assets.images` array)
- **Shorts**: (`assets.video`; single short if url exists)
- **Tab**: (Empty array for now; driver collection query removed due to missing details.suits field)