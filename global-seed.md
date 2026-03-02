# AF Motorsport — Globals Seed Data

Complete baseline data for all 7 globals. This is the starting content to be entered into the admin panel once globals are live.

---

## IDENTITY

**Vision Statement**
We race to prove what is possible — on track, in the workshop, and in everything we build.

**Mission Statement**
AF Motorsport competes at the highest level of Porsche racing while building a team, a culture, and a body of work that outlasts any single result. We develop drivers, engineer remarkable machines, and document everything with the honesty and depth it deserves.

**Founding Story**
→ Relationship: link to the `narratives` record titled "The Origin of AF Motorsport" once created.

**Brand Values**

| Value | Description | Linked Principle |
|---|---|---|
| Precision | We do not cut corners — in engineering, in storytelling, or in how we treat people. | Link: Precision principle |
| Relentlessness | Every setback is a data point. We keep going. | Link: Relentlessness principle |
| Honesty | We document the failures as clearly as the victories. | Link: Honesty principle |
| Craft | We believe that how you build something is as important as what you build. | Link: Craft principle |
| Community | Racing is nothing without the people who live it with you. | Link: Community principle |

**Brand Voice**

Tones → link: Intense, Precise, Human, Cinematic (from `tones` collection once populated)

Voice Description:
AF Motorsport speaks with the confidence of a team that knows exactly what it is doing and the humility of one that never stops learning. The voice is cinematic but never theatrical. Precise but never cold. Human before anything else.

**Leadership**
→ Relationship: link to leader records once created.

**Sustainability**

Stance:
AF Motorsport is committed to reducing the environmental footprint of competitive motorsport without compromising performance. We invest in sustainable materials, responsible logistics, and long-term technical programs that push the boundaries of what clean racing can look like.

Initiatives → link: relevant initiative records once created.

**Visual Identity**

| Field | Value |
|---|---|
| Primary Logo | Upload: AF Motorsport primary logo (light background variant) |
| Inverted Logo | Upload: AF Motorsport inverted logo (dark background variant) |
| Wordmark | Upload: AF Motorsport wordmark |
| Favicon | Upload: AF Motorsport favicon |
| Primary Colour | #C0392B |
| Secondary Colour | #1A1A1A |
| Brand Guidelines | Upload: AF Motorsport Brand Guidelines PDF |

---

## POLICIES

**Privacy Policy**
- Type: Privacy Policy
- Title: Privacy Policy
- Version: v1.0
- Last Updated: 2025-01-01
- Visible: Yes
- Body: [To be written by legal counsel. Covers: data collection, data usage, data storage, third-party sharing, user rights, contact for data requests.]

**Terms of Use**
- Type: Terms of Use
- Title: Terms of Use
- Version: v1.0
- Last Updated: 2025-01-01
- Visible: Yes
- Body: [To be written by legal counsel. Covers: acceptable use, intellectual property, limitation of liability, governing law.]

**Cookie Policy**
- Type: Cookie Policy
- Title: Cookie Policy
- Version: v1.0
- Last Updated: 2025-01-01
- Visible: Yes
- Body: [To be written by legal counsel. Covers: what cookies are used, why, how to opt out.]

**Returns Policy**
- Type: Returns Policy
- Title: Returns & Exchanges
- Version: v1.0
- Last Updated: 2025-01-01
- Visible: Yes
- Body: [To be written by operations. Covers: return window, condition requirements, how to initiate a return, refund timeline.]

**Refunds Policy**
- Type: Refunds Policy
- Title: Refunds Policy
- Version: v1.0
- Last Updated: 2025-01-01
- Visible: Yes
- Body: [To be written by operations. Covers: refund eligibility, processing time, exceptions.]

**Transaction Policy**
- Type: Transaction Policy
- Title: Payment & Transactions
- Version: v1.0
- Last Updated: 2025-01-01
- Visible: Yes
- Body: [To be written by operations. Covers: accepted payment methods, transaction security, failed payments, currency.]

**Legal Notice**
- Type: Legal Notice
- Title: Legal Notice
- Version: v1.0
- Last Updated: 2025-01-01
- Visible: Yes
- Body: [To be written by legal counsel. Covers: company registration details, registered address, VAT number if applicable.]

---

## HEADER

### Navigation Items

---

**Item 1 — Glory**
- Label: Glory
- Tagline: The victories that define us.
- Description: Every triumph, every trophy, every moment that became legend — this is where glory lives.
- Visible: Yes

Sub Items:

| Label | Description | URL | Featured |
|---|---|---|---|
| The Legends | Every driver who carried the flag | `/glory/[driver-slug]` | Yes |
| The Battles | Races that became history | `/glory/[event-slug]` | No |
| The Trophies | Awards and the stories behind them | `/glory/[award-slug]` | No |
| Hall of Fame | The eternal record of AF Motorsport | `/glory/hall-of-fame` | Yes |

Spotlight:
- Enable: Yes
- Label: Current Champion
- Entity: link to featured driver record
- Override URL: —

---

**Item 2 — Pursuit**
- Label: Pursuit
- Tagline: The championship engine.
- Description: The relentless machinery of racing — championships, seasons, race weekends, and the sessions that decided everything.
- Visible: Yes

Sub Items:

| Label | Description | URL | Featured |
|---|---|---|---|
| The Championships | Series we compete in | `/pursuit/[series-slug]` | Yes |
| The Seasons | Every year's complete arc | `/pursuit/[season-slug]` | Yes |
| Race Weekends | Round by round, event by event | `/pursuit/[season-slug]/[event-slug]` | No |
| The Sessions | The moments within the moments | `/pursuit/[season-slug]/[event-slug]/[session-slug]` | No |

Spotlight:
- Enable: Yes
- Label: Current Season
- Entity: link to current season record
- Override URL: —

---

**Item 3 — Craft**
- Label: Craft
- Tagline: The machines and the minds.
- Description: Every car built, every kit designed, every engineering decision made — the technical obsession that drives everything.
- Visible: Yes

Sub Items:

| Label | Description | URL | Featured |
|---|---|---|---|
| The Machines | Every car we have ever fielded | `/craft/[car-slug]` | Yes |
| The Equipment | Precision instruments, meticulously designed | `/craft/[kit-slug]` | No |
| R&D Projects | The innovations we are building | `/craft/[initiative-slug]` | No |
| Engineering Philosophy | The belief system behind it all | `/craft/engineering-philosophy` | Yes |

Spotlight:
- Enable: Yes
- Label: Current Machine
- Entity: link to current race car record
- Override URL: —

---

**Item 4 — Tribe**
- Label: Tribe
- Tagline: The people behind the numbers.
- Description: Not who won — who they are. The drivers, leaders, specialists, and the culture that connects them all.
- Visible: Yes

Sub Items:

| Label | Description | URL | Featured |
|---|---|---|---|
| The Drivers | The people behind the racing numbers | `/tribe/[driver-slug]` | Yes |
| The Leaders | The humans who lead | `/tribe/[leader-slug]` | No |
| The Specialists | The crew who make it possible | `/tribe/[member-slug]` | No |
| Culture Code | The soul of AF Motorsport | `/tribe/culture-code` | Yes |

Spotlight:
- Enable: Yes
- Label: Spotlight: The Team
- Entity: link to a featured member record
- Override URL: —

---

**Item 5 — Alliance**
- Label: Alliance
- Tagline: The partnerships that power us.
- Description: No team races alone. The organizations, people, and ecosystem that make AF Motorsport possible.
- Visible: Yes

Sub Items:

| Label | Description | URL | Featured |
|---|---|---|---|
| Our Partners | The organizations we work with | `/alliance/[organization-slug]` | Yes |
| The Network | The complete ecosystem map | `/alliance/network` | Yes |

Spotlight:
- Enable: Yes
- Label: Strategic Partner
- Entity: link to a featured organization record
- Override URL: —

---

**Item 6 — Chronicle**
- Label: Chronicle
- Tagline: The stories we carry.
- Description: Authored journalism, career arcs, and historical records — the universe told in full narrative form.
- Visible: Yes

Sub Items:

| Label | Description | URL | Featured |
|---|---|---|---|
| Stories | Authored features and deep dives | `/chronicle/[story-slug]` | Yes |
| Journeys | Career arcs and personal chapters | `/chronicle/[journey-slug]` | No |
| Histories | The documented historical record | `/chronicle/[history-slug]` | No |

Spotlight:
- Enable: Yes
- Label: Latest Story
- Entity: link to the most recent published story record
- Override URL: —

---

**Item 7 — Ambition**
- Label: Ambition
- Tagline: What we are building next.
- Description: The future in motion — projects, celebrations, gatherings, roles, and programs. How to be part of what comes next.
- Visible: Yes

Sub Items:

| Label | Description | URL | Featured |
|---|---|---|---|
| Initiatives | Projects shaping the future | `/ambition/[initiative-slug]` | No |
| Celebrations | Moments of recognition | `/ambition/[celebration-slug]` | No |
| Meetups | Events and gatherings | `/ambition/[meetup-slug]` | Yes |
| Careers | Open roles at AF Motorsport | `/ambition/[career-slug]` | Yes |
| Training Programs | Development programs we run | `/ambition/[training-slug]` | No |

Spotlight:
- Enable: Yes
- Label: We're Hiring
- Entity: link to a featured career record
- Override URL: —

---

### Utility Navigation

| Label | URL | Visible |
|---|---|---|
| Store | `/store` | Yes |
| About | `/about` | Yes |
| Contact | `/contact` | Yes |

### Primary CTA

- Enable: Yes
- Label: Join the Team
- URL: `/ambition`

---

## FOOTER

### Brand Block

- Enable: Yes
- Logo: Upload inverted/white logo variant
- Tagline: Built to race. Built to last.
- Description: AF Motorsport is a competitive racing team with an obsession for craft, culture, and the pursuit of glory. We build machines, develop people, and tell the stories that endure.

---

### Navigation Columns

---

**Column 1 — Universe**
- Visible: Yes

| Label | URL | Visible |
|---|---|---|
| Glory | `/glory/hall-of-fame` | Yes |
| Pursuit | `/pursuit` | Yes |
| Craft | `/craft/engineering-philosophy` | Yes |
| Tribe | `/tribe/culture-code` | Yes |
| Alliance | `/alliance/network` | Yes |
| Chronicle | `/chronicle` | Yes |
| Ambition | `/ambition` | Yes |

---

**Column 2 — The Team**
- Visible: Yes

| Label | URL | Visible |
|---|---|---|
| Drivers | `/tribe` | Yes |
| Leaders | `/tribe` | Yes |
| Specialists | `/tribe` | Yes |
| Culture Code | `/tribe/culture-code` | Yes |
| Hall of Fame | `/glory/hall-of-fame` | Yes |

---

**Column 3 — The Machines**
- Visible: Yes

| Label | URL | Visible |
|---|---|---|
| Our Cars | `/craft` | Yes |
| Our Equipment | `/craft` | Yes |
| Engineering Philosophy | `/craft/engineering-philosophy` | Yes |
| R&D Projects | `/craft` | Yes |
| Technical Partnerships | `/alliance/network` | Yes |

---

**Column 4 — Join Us**
- Visible: Yes

| Label | URL | Visible |
|---|---|---|
| Open Careers | `/ambition` | Yes |
| Training Programs | `/ambition` | Yes |
| Upcoming Meetups | `/ambition` | Yes |
| Current Initiatives | `/ambition` | Yes |
| Partner With Us | `/contact` | Yes |

---

**Column 5 — Company**
- Visible: Yes

| Label | URL | Visible |
|---|---|---|
| About AF Motorsport | `/about` | Yes |
| Contact | `/contact` | Yes |
| Store | `/store` | Yes |
| Opportunities | `/opportunities` | Yes |
| The Network | `/alliance/network` | Yes |

---

### Bottom CTA

- Enable: Yes
- Headline: Ready to be part of the story?
- Subtext: Whether you race, engineer, design, or simply believe in what we build — there is a place for you inside AF Motorsport.
- Button Label: Explore Ambition
- URL: `/ambition`

---

### Legal Links

| Label | URL | Visible |
|---|---|---|
| Privacy Policy | `/legal` | Yes |
| Terms of Use | `/legal` | Yes |
| Cookie Policy | `/legal` | Yes |
| Returns & Exchanges | `/legal` | Yes |
| Legal Notice | `/legal` | Yes |

### Copyright

© 2025 AF Motorsport. All rights reserved.

---

## ANNOUNCEMENTS

**Announcement 1 — Launch**
- Type: Celebration
- Title: Welcome to the new AF Motorsport universe.
- Message: We have rebuilt everything from the ground up — the team, the machines, the stories. Explore what we have been building.
- Link: Enable — Label: Explore Now — URL: `/glory/hall-of-fame`
- Show From: Site launch date
- Show Until: 30 days after launch
- Audience: Everyone
- Dismissible: Yes
- Active: Yes

**Announcement 2 — Season**
- Type: Info
- Title: The new season has begun.
- Message: Follow every round, every session, and every turning point as the championship unfolds.
- Link: Enable — Label: Follow the Season — URL: `/pursuit`
- Show From: Season start date
- Show Until: Season end date
- Audience: Everyone
- Dismissible: Yes
- Active: Yes

**Announcement 3 — Hiring**
- Type: Info
- Title: We are growing the team.
- Message: AF Motorsport is looking for exceptional people to join us. Explore open roles and training programs.
- Link: Enable — Label: See Opportunities — URL: `/ambition`
- Show From: —
- Show Until: —
- Audience: Everyone
- Dismissible: Yes
- Active: No

---

## QUESTIONS

**Category 1 — About AF Motorsport**
- Visible: Yes

| Question | Answer | Related Page |
|---|---|---|
| What is AF Motorsport? | AF Motorsport is a competitive racing team that participates primarily in Porsche championship series. Beyond the racing, we document the team, the machines, and the stories that define us. | `/about` |
| Which championships do you compete in? | We compete primarily in Porsche racing series. Visit the Pursuit section to follow our championships, seasons, and race results in full. | `/pursuit` |
| Where is AF Motorsport based? | — | `/contact` |
| How do I contact the team? | Use our contact page to reach the team directly. | `/contact` |

---

**Category 2 — The Team**
- Visible: Yes

| Question | Answer | Related Page |
|---|---|---|
| How can I learn about the drivers? | Visit the Tribe section to explore every driver as a complete human story — not just a racing CV. | `/tribe` |
| Who leads AF Motorsport? | Meet the leaders who build and direct the team in the Tribe section. | `/tribe` |
| What is the Culture Code? | The Culture Code is the soul of AF Motorsport — the values, rituals, and human identity of the team. | `/tribe/culture-code` |

---

**Category 3 — The Machines**
- Visible: Yes

| Question | Answer | Related Page |
|---|---|---|
| What cars does AF Motorsport race? | Visit the Craft section to explore every machine we have ever fielded — full specifications, history, and the stories behind each build. | `/craft` |
| What is your engineering philosophy? | Our engineering philosophy is documented in full in the Craft section. | `/craft/engineering-philosophy` |

---

**Category 4 — Join Us**
- Visible: Yes

| Question | Answer | Related Page |
|---|---|---|
| How do I join the AF Motorsport team? | Explore open roles, training programs, and upcoming meetups in the Ambition section. | `/ambition` |
| Do you offer training programs? | Yes. Visit the Ambition section to see all current development programs and how to apply. | `/ambition` |
| How can my company partner with AF Motorsport? | Contact us directly to discuss partnership opportunities. | `/contact` |

---

**Category 5 — Store & Orders**
- Visible: Yes

| Question | Answer | Related Page |
|---|---|---|
| How do I place an order? | Browse the store and add items to your cart. Checkout is handled securely via the store. | `/store` |
| What is your returns policy? | Please review our Returns & Exchanges policy on the legal page. | `/legal` |
| How long does delivery take? | Delivery times vary by location. Details are provided at checkout. | `/store` |
| What payment methods do you accept? | We accept all major payment methods. Details are available in our Transaction Policy. | `/legal` |

---

## SOCIALS

| Platform | Label | Handle | URL | Linked Channel | Visible |
|---|---|---|---|---|---|
| Instagram | Instagram | @afmotorsport | https://instagram.com/afmotorsport | Link once channels populated | Yes |
| X / Twitter | X | @afmotorsport | https://x.com/afmotorsport | Link once channels populated | Yes |
| YouTube | YouTube | AF Motorsport | https://youtube.com/@afmotorsport | Link once channels populated | Yes |
| Facebook | Facebook | AF Motorsport | https://facebook.com/afmotorsport | Link once channels populated | Yes |
| LinkedIn | LinkedIn | AF Motorsport | https://linkedin.com/company/afmotorsport | Link once channels populated | Yes |
| TikTok | TikTok | @afmotorsport | https://tiktok.com/@afmotorsport | Link once channels populated | No |