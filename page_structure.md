# AF Motorsport — Cinematic Universe Page Structure

## Core Hierarchy

| Level | Analogy | Definition |
|---|---|---|
| Navigation | The Universe | AF Motorsport — one, singular |
| Menu Item | The Movie Series | A complete narrative world that beckons the visitor |
| Page | The Cinema | A fixed route delivering a complete immersive universe |
| Section | The Episode / Meal | Draws from multiple collection chains simultaneously |
| Block | The Act / Recipe | Specific collection chains assembled together |
| Component | The Collection Entity | The character — never a page |
| Information | The Relation | The point of interest connecting characters |

**Rules:**
1. No collection is ever a page or a menu item.
2. A dynamic `[slug]` is a key that unlocks a complete cinematic universe assembled from everything connected to that slug across the entire data engine.
3. Pages are fixed templates. Sections are fixed. Content within sections is infinite because the backend engine expands it.
4. The cinematic pull comes from the actual depth of the universe — not from fancy titles or names.
5. Standard pages (Home, About, Contact, Store, Blog, Forms, Opportunities, Legal) are outside this architecture. Store, Blog and Forms are Payload plugin-driven.
6. The client adds content to the backend. The universe expands automatically. The frontend never changes.

---

## GLORY — Triumph, Recognition, Heroism & Legacy

> The lens is achievement. Every cinema here should make the visitor feel the weight of what was won, what it cost, and why it endures.

---

### `/glory/[driver-slug]` — The Heroic Legend

*Context Collection: `drivers`*

| Section | Block |
|---|---|
| The Legend | Driver + Awards + Highlights + Points — the achievement headline |
| The Conquests | Driver + Events + Sessions + Entries — the races that defined the legend |
| The Glory Numbers | Driver + Points + Results + Championships — the statistical monument |
| The Rivals Overcome | Driver + Teammates + Incidents + Decisions — who stood in the way |
| The Machines That Carried Them | Driver + Cars + Kits — the tools of triumph |
| The Team Behind the Glory | Driver + Crew + Leaders + Organizations — who made it possible |
| The Defining Strategy | Driver + Strategies + Decisions + Impacts — the thinking that won |
| The Celebrations | Driver + Awards + Celebrations + Stories — the moments of recognition |
| The Voice of a Champion | Driver + Narratives + Notes — in their own words about winning |
| The Visual Monument | Driver + Galleries + Playlists + Archives — the glory captured |

---

### `/glory/[event-slug]` — The Battle as Legend

*Context Collection: `events`*

| Section | Block |
|---|---|
| The Stage Set | Event + Location + Season + Series — where and what was at stake |
| The Atmosphere | Event + Narrative + Tones + Stories — what it felt like to be there |
| The Turning Point | Event + Incidents + Decisions + Impacts — the moment that decided everything |
| The Strategy War | Event + Strategies + Protocols + Classifications — how it was fought tactically |
| The Machines in Battle | Event + Cars + Specifications + Features — what was fielded and why |
| The Podium | Event + Results + Awards + Celebrations — the outcome and its recognition |
| The Aftermath | Event + Impacts + Decisions + Strategies — what changed because of this |
| The Legend It Built | Event + Narratives + Stories + Histories — why this event endures |
| The Visual Evidence | Event + Galleries + Playlists + Archives — the battle captured |

---

### `/glory/[award-slug]` — The Trophy as a Living Story

*Context Collection: `awards`*

| Section | Block |
|---|---|
| The Prize | Award + Narrative + History — what this award is and what it represents |
| The Weight of It | Award + Principles + Tones + Stories — why this award matters beyond the trophy |
| The Roll of Honour | Award + Drivers + Leaders + Members — every person who earned it |
| What It Took | Award + Events + Sessions + Strategies — the journeys that led to winning it |
| The Machines That Won It | Award + Cars + Specifications — the vehicles behind the victories |
| The Decisions That Earned It | Award + Decisions + Impacts — the pivotal choices that secured it |
| The Celebrations It Sparked | Award + Celebrations + Notes + Stories — the joy it created |
| The Partners Who Believed | Award + Organizations + Initiatives — those who enabled the winning |
| The Visual Legacy | Award + Galleries + Playlists + Archives — the trophy across time |

---

### `/glory/hall-of-fame` — The Eternal Record

*Context Collection: Multiple — aggregated across all collections*

| Section | Block |
|---|---|
| The Greatest Moments | Highlights + Stories + Narratives — the moments that defined AF Motorsport |
| The Record Breakers | Results + Points + Specifications — the numbers no one else reached |
| The Inducted Legends | Drivers + Leaders + Members + Organizations — the greatest people |
| The Greatest Races | Events + Sessions + Strategies + Incidents — the races that became myth |
| The Greatest Machines | Cars + Features + Specifications + Visualizations — the iconic builds |
| The Greatest Seasons | Seasons + Points + Awards + Narratives — the championship arcs for the ages |
| The Greatest Decisions | Decisions + Impacts + Strategies + Protocols — the choices that changed history |
| The Greatest Rivalries | Drivers + Incidents + Results + Stories — the battles that defined eras |
| The Greatest Partnerships | Organizations + Initiatives + Awards — the alliances that built glory |
| The Visual Archive | Galleries + Playlists + Visualizations + Archives — the monument in images |

---

## PURSUIT — The Competition Engine, Hierarchy & The Grind

> The lens is competition as a living system. The relentless machinery of racing — rules, hierarchy, the season as a year-long battle, the race weekend as operational reality.

---

### `/pursuit/[series-slug]` — The Championship Organism

*Context Collection: `series`*

| Section | Block |
|---|---|
| The Origin and Power | Series + History + Narrative — how this championship came to be and what it means |
| The Governance Structure | Series + Protocols + Classifications + Decisions — the rules that govern it |
| The Battlegrounds | Series + Locations + Events + Schedules — where it is fought |
| The Power Hierarchy | Series + Organizations + Leaders + Drivers — who runs it and who competes |
| The Machines It Demands | Series + Specifications + Features + Cars — what it takes to compete |
| The Championship History | Series + Seasons + Points + Awards — how the title has been won |
| The Rivalries It Produced | Series + Drivers + Incidents + Strategies — the great battles within it |
| The Evolution of Rules | Series + Protocols + Histories + Decisions — how the championship changed |
| The Inside Story | Series + Notes + Narratives + Stories — what those inside the series know |
| The Visual Chronicle | Series + Galleries + Playlists + Archives — the championship on film |

---

### `/pursuit/[season-slug]` — The Year's Dramatic Arc

*Context Collection: `seasons`*

| Section | Block |
|---|---|
| The Championship Story | Season + Narrative + Series — the arc of this specific year |
| The Calendar | Season + Events + Locations + Schedules — every round and where |
| The Championship Fight | Season + Points + Drivers + Organizations — how the title unfolded round by round |
| The Technical Landscape | Season + Specifications + Protocols + Classifications — the rules of this year |
| The Key Turning Points | Season + Incidents + Decisions + Impacts — what shifted the championship |
| The Machines of This Year | Season + Cars + Specifications + Features — what was raced |
| The Inside Story | Season + Notes + Narratives + Stories — what the season felt like from within |
| The Visual Chronicle | Season + Galleries + Playlists + Archives — the year captured |

---

### `/pursuit/[season-slug]/[event-slug]` — The Race Weekend

*Context Collection: `events` — filtered by season*

| Section | Block |
|---|---|
| The Weekend Brief | Event + Location + Schedule + Season — what, where, when, and what was at stake |
| The Entry List | Event + Entries + Drivers + Cars — who started and in what |
| The Session Breakdown | Event + Sessions + Results + Incidents — what happened in each session |
| The Weather and Conditions | Event + Location + Specifications + Classifications — the environment |
| The Operational Decisions | Event + Strategies + Protocols + Decisions — how teams approached it |
| The Crew on the Ground | Event + Members + Leaders + Duties — who operated the weekend |
| The Results | Event + Results + Points + Awards — the definitive outcomes |
| The Visual Record | Event + Galleries + Playlists + Archives — the weekend documented |

---

### `/pursuit/[season-slug]/[event-slug]/[session-slug]` — The Moment

*Context Collection: `sessions`*

| Section | Block |
|---|---|
| The Session | Session + Narrative + Event + Schedule — what this session was and when |
| The Parameters | Session + Specifications + Protocols + Classifications — the rules governing this session |
| The Entries | Session + Entries + Drivers + Cars — who competed and in what machine |
| The Lap Data | Session + Results + Points + Metrics — the granular competitive data |
| The Incidents | Session + Incidents + Decisions + Impacts — what happened and what it caused |
| The Strategy Employed | Session + Strategies + Protocols + Decisions — how each entry approached it |
| The Crew Operation | Session + Members + Leaders + Duties — who ran the session from the pit wall |
| The Highlights | Session + Highlights + Notes + Narratives — the moments within the moment |
| The Visual Record | Session + Galleries + Playlists + Archives — the session captured |

---

## CRAFT — Engineering, Design, Technology & Innovation

> The lens is obsession with making things. The how behind everything AF Motorsport builds, designs, and evolves. Technical precision as a form of artistry.

---

### `/craft/[car-slug]` — The Machine as Masterpiece

*Context Collection: `cars`*

| Section | Block |
|---|---|
| The Blueprint | Car + Specifications + Features + Classifications — the technical anatomy |
| The Engineering Philosophy | Car + Narrative + Principles + Tones — the thinking behind the design |
| The Development Log | Car + History + Decisions + Impacts — how it evolved and why |
| The Crew Who Built It | Car + Members + Duties + Skills — the hands and minds that made it |
| The Battle Scars | Car + Events + Sessions + Incidents — what it survived and conquered |
| The Drivers Who Trusted It | Car + Drivers + Results + Entries — the relationship between machine and human |
| The Technical Partnerships | Car + Organizations + Initiatives + Benefits — who contributed to building it |
| The Performance Record | Car + Results + Specifications + Metrics — what it achieved technically |
| The Technical Visual Archive | Car + Visualizations + Galleries + Archives — blueprints, renders, documentation |

---

### `/craft/[kit-slug]` — The Equipment as Precision Instrument

*Context Collection: `kits`*

| Section | Block |
|---|---|
| The Material Science | Kit + Specifications + Features + Classifications — composition and construction |
| The Design Intent | Kit + Narrative + Principles + Tones — why it was designed this way |
| The Performance Data | Kit + Metrics + Classifications + Results — what it delivers under real conditions |
| The Development History | Kit + History + Decisions + Impacts — how the design evolved |
| The Makers | Kit + Members + Organizations + Leaders — who designed and built it |
| In Action | Kit + Drivers + Events + Sessions — how it performs in competition |
| The Technical Partners | Kit + Organizations + Initiatives + Benefits — who enabled it |
| The Technical Visual Archive | Kit + Visualizations + Galleries + Archives — the kit documented in detail |

---

### `/craft/[initiative-slug]` — The R&D Project

*Context Collection: `initiatives`*

| Section | Block |
|---|---|
| The Technical Mission | Initiative + Narrative + Principles — what engineering problem is being solved |
| The Innovation Being Pursued | Initiative + Features + Specifications + Classifications — what is being built or discovered |
| The Engineering Roadmap | Initiative + Schedules + Strategies + Milestones — the technical plan |
| The Engineering Team | Initiative + Members + Leaders + Skills — who is doing the work |
| The Machines It Will Shape | Initiative + Cars + Specifications + Features — what this changes |
| The Technical Partners | Initiative + Organizations + Benefits + Channels — who is contributing |
| The Progress and Results | Initiative + Outcomes + Impacts + Metrics — what has been achieved so far |
| The Technical Visual Record | Initiative + Galleries + Visualizations + Archives — the work documented |

---

### `/craft/engineering-philosophy` — The Belief System Behind Everything

*Context Collection: Multiple — Principles, Features, Specifications, Histories*

| Section | Block |
|---|---|
| The Engineering Creed | Principles + Narratives + Tones — the beliefs that drive every technical decision |
| The Evolution of Thinking | Histories + Decisions + Impacts + Strategies — how the philosophy developed |
| The Machines It Produced | Cars + Specifications + Features + Visualizations — the proof of the philosophy |
| The People Who Embody It | Members + Skills + Trainings + Experiences — the engineers who live it |
| The Innovations It Generated | Features + Initiatives + Classifications — what the philosophy created |
| The Testing Ground | Trainings + Protocols + Schedules + Specifications — where the philosophy is proven |
| The Failures That Refined It | Incidents + Decisions + Impacts + Stories — what went wrong and what was learned |
| The Partners Who Extend It | Organizations + Benefits + Initiatives + Channels — who helps push the philosophy forward |
| The Technical Visual World | Visualizations + Galleries + Archives + Playlists — the philosophy made visible |

---

## TRIBE — People, Culture, Identity & Human Connection

> The lens is human. Not what people achieved or built — who they are, how they relate, what they believe, what the culture of this team feels like from inside.

---

### `/tribe/[driver-slug]` — The Person Behind the Racing Number

*Context Collection: `drivers`*

| Section | Block |
|---|---|
| The Human Being | Driver + Traits + Identity + Nationality + Pronouns — who this person is |
| The Inner World | Driver + Principles + Preferences + Tones — what they believe and value |
| The Journey That Shaped Them | Driver + Journeys + Histories + Narratives — how they became who they are |
| The Relationships That Define Them | Driver + Teammates + Crew + Leaders + Individuals — who matters to them |
| The Skills They Carry | Driver + Skills + Trainings + Experiences — what they have built in themselves |
| The Voice | Driver + Notes + Narratives + Channels — how they communicate and what they say |
| The Human Side of the Numbers | Driver + Points + Results — the emotional weight behind the data |
| The Visual Human Story | Driver + Galleries + Playlists — the person captured beyond the race suit |

---

### `/tribe/[leader-slug]` — The Human Being Who Leads

*Context Collection: `leaders`*

| Section | Block |
|---|---|
| The Person | Leader + Traits + Identity + Nationality — who this human being is |
| The Inner World | Leader + Principles + Preferences + Tones — what drives their decisions and beliefs |
| The Journey That Made Them | Leader + Journeys + Histories + Experiences — how they became a leader |
| The Command as Relationship | Leader + Members + Duties + Organizations — how they lead through people |
| The Decisions as Character | Leader + Decisions + Impacts + Strategies — what their choices reveal about them |
| The Relationships They Cultivate | Leader + Drivers + Individuals + Partners — who they choose to be around |
| The Initiatives They Champion | Leader + Initiatives + Strategies + Schedules — what they care enough to build |
| The Voice | Leader + Notes + Narratives + Channels — how they think out loud |
| The Visual Human Story | Leader + Galleries + Playlists — the person beyond the role |

---

### `/tribe/[member-slug]` — The Specialist's Complete Human Story

*Context Collection: `members`*

| Section | Block |
|---|---|
| The Person | Member + Traits + Identity + Nationality — who this human being is |
| The Craft as Identity | Member + Duties + Skills + Expectations — what they do and how it defines them |
| The Journey Into Their Craft | Member + Journeys + Histories + Experiences — how they arrived at this mastery |
| The Training That Built Them | Member + Trainings + Certifications + Protocols — the work they put in |
| The Relationships in the Pit Lane | Member + Leaders + Drivers + Peers — who they work alongside and trust |
| The Assignments That Shaped Them | Member + Cars + Sessions + Events — the work that tested and grew them |
| The Voice | Member + Notes + Narratives + Channels — what they think and how they express it |
| The Visual Human Story | Member + Galleries + Playlists — the specialist as a complete person |

---

### `/tribe/culture-code` — The Soul of the Organization

*Context Collection: Multiple — Principles, Duties, Protocols, Celebrations, Skills*

| Section | Block |
|---|---|
| The Belief System | Principles + Narratives + Tones + Stories — what AF Motorsport fundamentally believes |
| The Daily Reality | Protocols + Duties + Expectations + Schedules — what life inside actually looks like |
| The People Who Embody the Culture | Drivers + Leaders + Members + Individuals — the humans who make the culture real |
| The Rituals and Rhythms | Celebrations + Meetups + Schedules + Notes — the recurring moments that reinforce identity |
| The Milestones That Define Us | Awards + Highlights + Stories + Histories — the moments that shaped who we are |
| The Decisions That Reveal Character | Decisions + Impacts + Strategies + Incidents — what hard choices revealed about the culture |
| The Skills the Culture Values | Skills + Trainings + Experiences + Principles — what this team develops in its people |
| The Partnerships the Culture Chooses | Organizations + Benefits + Channels + Initiatives — who we choose to work with and why |
| The Visual Culture | Galleries + Visualizations + Archives + Playlists — the culture made visible |

---

## ALLIANCE — Partnerships, Ecosystem & External Relations

> The lens is relationship. Not just who AF Motorsport works with — but why, what was built together, and the complete web of external connections that make this team possible.

---

### `/alliance/[organization-slug]` — The Partnership as Complete Story

*Context Collection: `organizations`*

| Section | Block |
|---|---|
| The Organization's Identity | Organization + Narrative + History + Tones — who they are independent of AF Motorsport |
| The Origin of the Partnership | Organization + Initiatives + Decisions + Narratives — why and how they came together |
| The People Who Bridge the Two Worlds | Organization + Leaders + Individuals + Members — the humans behind the alliance |
| The Shared Work | Organization + Initiatives + Strategies + Schedules — what they built and did together |
| The Technical Contribution | Organization + Cars + Specifications + Features — what the partner enabled technically |
| The Shared Victories | Organization + Awards + Highlights + Celebrations — what they won together |
| The Impact of the Alliance | Organization + Impacts + Decisions + Stories — what this partnership changed |
| The Evolution Together | Organization + Histories + Strategies + Classifications — how the relationship grew |
| The Partnership Voice | Organization + Notes + Narratives + Channels — how they communicate about each other |
| The Visual Partnership Story | Organization + Galleries + Playlists + Archives — the alliance captured |

---

### `/alliance/network` — The Complete Ecosystem Map

*Context Collection: Multiple — Organizations, Individuals, Initiatives, Locations*

| Section | Block |
|---|---|
| The Ecosystem Overview | Organizations + Classifications + Channels + Locations — the complete picture |
| Strategic Partners | Organizations + Benefits + Initiatives + Strategies — those who shape direction |
| Technical Partners | Organizations + Specifications + Features + Cars — those who enable engineering |
| Operational Partners | Organizations + Locations + Schedules + Protocols — those who enable logistics |
| The Human Connective Tissue | Individuals + Leaders + Channels + Preferences — the people who bridge worlds |
| The Shared Wins Across the Ecosystem | Organizations + Awards + Highlights + Celebrations — collective achievements |
| The Initiatives Born from Alliance | Initiatives + Schedules + Outcomes + Impacts — what partnerships produced |
| The Ecosystem's Evolution | Histories + Decisions + Strategies + Classifications — how the network grew |
| The Visual Network | Galleries + Visualizations + Archives + Playlists — the ecosystem made visible |

---

## CHRONICLE — Storytelling, Narratives, Media & History

> The lens is authorship. These are the told stories — where the narrative itself is the experience, not the data behind it. Every cinema here is a piece of authored journalism or literature powered by the engine.

---

### `/chronicle/[story-slug]` — The Complete Authored Story

*Context Collection: `stories`*

| Section | Block |
|---|---|
| The Opening | Story + Narrative + Tones — the authored entry into the story |
| The Characters | Story + Drivers + Leaders + Members + Organizations — who the story is about |
| The World It Inhabits | Story + Events + Locations + Seasons — where and when the story lives |
| The Conflict | Story + Incidents + Decisions + Strategies — what the tension is |
| The Stakes | Story + Concerns + Impacts + Points — what was at risk |
| The Resolution | Story + Impacts + Awards + Celebrations — how it concluded |
| The Machines in the Story | Story + Cars + Kits + Specifications — the hardware that played a role |
| The Story's Place in History | Story + Histories + Narratives + Impacts — where this story sits in the larger arc |
| The Related Stories | Story + Stories + Journeys + Histories — what to read next |
| The Visual Narrative | Story + Galleries + Playlists + Archives — the story told in images |

---

### `/chronicle/[journey-slug]` — The Career or Personal Arc

*Context Collection: `journeys`*

| Section | Block |
|---|---|
| The Beginning | Journey + Narrative + History + Tones — where this arc started and why |
| The People Who Shaped It | Journey + Drivers + Leaders + Members — who influenced this journey |
| The Machines That Were Part of It | Journey + Cars + Kits + Specifications — the hardware of the arc |
| The Battles Along the Way | Journey + Events + Sessions + Incidents — what was faced |
| The Turning Points | Journey + Decisions + Incidents + Impacts — the moments that changed direction |
| The Growth | Journey + Skills + Trainings + Experiences — what was learned and built |
| The Achievements | Journey + Awards + Highlights + Celebrations — what the journey produced |
| The Relationships It Built | Journey + Organizations + Individuals + Partners — the connections formed |
| The Legacy | Journey + Impacts + Histories + Stories — what this journey left behind |
| The Visual Arc | Journey + Galleries + Playlists + Archives — the journey in images |

---

### `/chronicle/[history-slug]` — The Historical Record

*Context Collection: `histories`*

| Section | Block |
|---|---|
| The Origin | History + Narrative + Evolution + Tones — where this history begins |
| The Lineage | History + Histories + Classifications + Stories — how it connects to what came before |
| The People Who Made It | History + Drivers + Leaders + Members — the humans at the centre of this history |
| The Machines Involved | History + Cars + Specifications + Features — the hardware of the era |
| The Events That Defined It | History + Events + Sessions + Incidents — the competitive moments |
| The Decisions That Shaped It | History + Decisions + Impacts + Strategies — the choices that made history |
| The Memory and Legacy | History + Impacts + Awards + Celebrations — how this history is regarded and remembered |
| The Echo in the Present | History + Initiatives + Strategies + Principles — how this history influences today |
| The Artifact Record | History + Galleries + Playlists + Archives — the documented evidence |

---

## AMBITION — Future, Opportunities, Growth & Community

> The lens is forward motion. What AF Motorsport is building toward, who they want alongside them, and how a visitor can enter the world themselves.

---

### `/ambition/[initiative-slug]` — The Future-Facing Project

*Context Collection: `initiatives`*

| Section | Block |
|---|---|
| The Mission | Initiative + Narrative + Principles + Goals — what is being built and why it matters |
| The Opportunity It Creates | Initiative + Impacts + Strategies + Classifications — what this will change |
| The Roadmap | Initiative + Schedules + Strategies + Milestones — how it will be achieved |
| The Team Building It | Initiative + Leaders + Members + Organizations — who is doing the work |
| The Future Machines | Initiative + Cars + Specifications + Features — what this initiative will produce technically |
| The Partners Making It Possible | Initiative + Organizations + Benefits + Channels — who is enabling it |
| The Progress So Far | Initiative + Outcomes + Impacts + Expectations — how far it has come |
| How to Be Part of It | Initiative + Notes + Narratives + Channels — the invitation to engage |
| The Visual Story of the Initiative | Initiative + Galleries + Visualizations + Archives — the work in progress |

---

### `/ambition/[celebration-slug]` — The Moment of Recognition

*Context Collection: `celebrations`*

| Section | Block |
|---|---|
| The Occasion | Celebration + Narrative + Story + Tones — what is being celebrated and why |
| The People Being Celebrated | Celebration + Drivers + Leaders + Members + Individuals — who this moment honours |
| The Achievement Behind It | Celebration + Awards + Highlights + Results — what was accomplished |
| The Journey That Led Here | Celebration + Events + Sessions + Decisions — what it took to get to this moment |
| The Community That Celebrated | Celebration + Organizations + Individuals + Notes — who shared in the moment |
| What This Celebration Signals | Celebration + Impacts + Strategies + Initiatives — what this moment means for the future |
| The Visual Memory | Celebration + Galleries + Playlists + Archives — the celebration captured |

---

### `/ambition/[meetup-slug]` — The Invitation to Enter the World

*Context Collection: `meetups`*

| Section | Block |
|---|---|
| The Event | Meetup + Narrative + Schedule + Tones — what this gathering is |
| The Location | Meetup + Location + Facilities + Classifications — where it happens and what it offers |
| Who Will Be There | Meetup + Drivers + Leaders + Members + Individuals — the people a visitor will encounter |
| The Agenda | Meetup + Protocols + Expectations + Schedules — what will happen |
| The Machines on Show | Meetup + Cars + Kits + Specifications — what will be displayed |
| The Initiatives Connected to It | Meetup + Initiatives + Strategies + Outcomes — what this meetup is building toward |
| The Partners Involved | Meetup + Organizations + Benefits + Channels — who else is part of it |
| How to Be Part of It | Meetup + Notes + Channels + Forms — the practical invitation |
| The Visual Atmosphere | Meetup + Galleries + Playlists + Archives — what past gatherings felt like |

---

### `/ambition/[career-slug]` — The Role Opportunity

*Context Collection: `careers` / `duties` / `expectations`*

| Section | Block |
|---|---|
| Why This Role Exists | Career + Narrative + Principles — the purpose behind the position |
| What It Demands | Career + Duties + Expectations + Skills — the real requirements |
| The Growth This Role Offers | Career + Journeys + Experiences + Trainings — where this role can take someone |
| The People You Will Work With | Career + Leaders + Members + Drivers — the team around this role |
| The Machines You Will Work On | Career + Cars + Specifications + Features — what this role touches technically |
| The Initiatives You Will Drive | Career + Initiatives + Strategies + Impacts — what this role contributes to |
| Life Inside AF Motorsport | Career + Principles + Celebrations + Schedules — the culture of working here |
| The Partners Around You | Career + Organizations + Benefits + Channels — the wider ecosystem |
| Apply | Career + Forms + Protocols + Channels — the practical step |

---

### `/ambition/[training-slug]` — The Development Program

*Context Collection: `trainings`*

| Section | Block |
|---|---|
| The Program | Training + Narrative + Principles + Goals — what this program is and what it is trying to produce |
| The Skills It Builds | Training + Skills + Experiences + Classifications — the specific capabilities developed |
| The Methods | Training + Protocols + Strategies + Specifications — how the program operates |
| The Machines Used | Training + Cars + Kits + Features — the hardware involved in training |
| The People Who Deliver It | Training + Leaders + Members + Organizations — who runs the program |
| The Cohort | Training + Drivers + Members + Individuals — who is currently in the program |
| The Schedule | Training + Schedules + Expectations + Locations — the practical reality |
| The Success Stories | Training + Journeys + Awards + Highlights + Stories — what past participants went on to achieve |
| How to Join | Training + Forms + Channels + Protocols — the invitation and application |
| The Visual World of the Program | Training + Galleries + Playlists + Archives — the program in action |

---

This structure transforms normalized architecture into a cohesive fan experience. Every page consumes multiple abstract collections to assemble emotional narratives — never exposing raw data. The backend complexity serves frontend simplicity.