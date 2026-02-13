# AF Motorsport

**AF Motorsport** is a high-performance content and ecommerce platform built with **Next.js 15**, **Payload CMS 3.0**, and **Tailwind CSS**. It serves as a digital hub for a motorsport entity, designed specifically to prioritize visual brand presentation and storytelling over raw statistical data or internal management.

---

## 🏎️ Project Philosophy: The Hybrid Approach

**This project is NOT:**
*   A pure race data statistics website (like Wikipedia or a timing screen).
*   An internal backend ERP or management system for the team.

**This project IS:**
*   A hybrid platform where the end goal is purely **Visual Brand Presentation**.
*   The backend exists **solely** to power the visual content of the frontend "brand identity" website.

### Core Principles
1.  **Visual First**: Data is collected only if it fuels a frontend visual experience.
2.  **Client Control**: Fields should be toggleable and decidable by the end client for display purposes.
3.  **"Wow" Factor**: The priority is user engagement and emotional resonance, not just archival storage.

---

## ⚠️ Technical Constraints & Rules

1.  **NO Blocks Feature**: We do **not** utilize the Blocks feature provided by Payload CMS. Content structure is handled via fixed, semantic fields and tabs to ensure strict data shape and maintainability.
2.  **Protect E-commerce**: We do **not** disturb any features, operational logic, or collections provided by the PayloadCMS E-commerce plugin/template. These functionalities (Products, Carts, Orders, Transactions) are kept intact and secure.

---

## 🛠️ Technology Stack

### Backend
*   **Core**: Payload CMS 3.73 (Headless TypeScript CMS)
*   **Database**: PostgreSQL (via `@payloadcms/db-postgres`)
*   **Dependencies**: Relies entirely on the tech stack provided by PayloadCMS.

### Frontend
*   **Current State**: Next.js 15 (App Router) using Payload's default stack.
*   **Future Vision**: A completely rebuilt high-performance frontend featuring:
    *   **UI Components**: ShadCn UI, React Bits, MagicUI, Aceternity UI.
    *   **Animations**: Framer Motion, GSAP, Lenis, Anime JS, React Spring.
    *   **3D Experiences**: Three.js, React Three Fiber.
    *   **State & Validation**: Zustand, Zod, React Hook Forms.

---

## 🏗️ Data Architecture

The project data is structured to support rich storytelling and detailed brand narratives. Use the `data_dictionary.md` for deep semantic definitions of every field.

### Globals
*   **Configurations**: Header, Footer, Social (Brand assets & navigation)
*   **Identity**: Sustainability, Identity, Values, Vision, Leadership (Brand DNA)
*   **Connectivity**: Communities, Channels, Feeds, Announcements, Questions (Engagement)
*   **Policies**: Terms, Legal, Privacy, Cookies, Transactions, Returns, Refunds (Compliance)

### Collections Strategy
Collections are grouped by their semantic role in the racing narrative, not just alphabetical order:

*   **Race**: The competitive structure (`Series`, `Seasons`, `Events`, `Sessions`, `Entries`).
*   **Performances**: The dynamic action (`Positions`, `Strategies`).
*   **Occurrences**: The key race moments (`Turnings`, `Incidents`).
*   **Statistics**: The numbers behind the sport (`Points`, `Schedules`, `Timelines`, `Engagements`).
*   **Outcomes**: The finalized results (`Results`, `Standings`).
*   **Directives**: The official governance (`Decisions`, `References`).
*   **Moments**: The emotional highlights (`Celebrations`, `Highlights`, `Awards`).
*   **Feedback**: User interaction (`Forms`, `Form Submissions`).
*   **Team**: The human element (`Drivers`, `Leaders`, `Members`, `Users`).
*   **Network**: External relationships (`Organizations`, `Individuals`).
*   **Opportunities**: Growth & participation (`Careers`, `Meetups`, `Initiatives`).
*   **Competencies**: Skills & background (`Skills`, `Educations`, `Preferences`, `Trainings`, `Experiences`).
*   **Obligations**: Rules & requirements (`Expectations`, `Duties`, `Rules`, `Standards`, `Compliances`, `Technicals`).
*   **Specifications**: Details & distinctions (`Medicals`, `Classifications`, `Features`, `Rivalries`).
*   **Contacts**: Connection points (`Channels`, `Endpoints`, `Demographics`).
*   **Editorial**: Written content (`Articles`, `Pages`).
*   **Narratives**: The story layers (`Histories`, `Stories`, `Journeys`, `Aspirations`).
*   **Descriptions**: Editorial depth (`Notes`, `Tones`).
*   **Resources**: Assets & machines (`Cars`, `Kits`, `Galleries`, `Footages`, `Archives`, `Visualizations`).
*   **Ecommerce**: Commercial operations (`Products`, `Carts`, `Orders`, `Transactions`).
*   **Meta**: Organization & assets (`Categories`, `Tags`, `Media`).

---

## 📚 Documentation
For detailed development guidelines and definitions, refer to the internal documentation artifacts:
*   **Project Overview**: Detailed breakdown of workflows and relational mappings.
*   **Data Dictionary**: Comprehensive semantic definitions for every collection and global.
*   **Implementation Plan**: Roadmap for codebase changes.

---
*Created for AF Motorsport.*
