# Project Overview: AF Motorsport

## 1. Executive Summary
**AF Motorsport** is a high-performance content and ecommerce platform built with **Next.js 15**, **Payload CMS 3.0**, and **Tailwind CSS**. It serves as a digital hub for a motorsport entity.

### Project Philosophy: The Hybrid Approach
**This project is NOT** a pure race data statistics website, nor is it an internal backend ERP/management system.
**This project IS** a hybrid platform where the end goal is purely **Visual Brand Presentation**.

-   **Purpose**: The backend exists solely to power the visual content of the frontend "brand identity" website.
-   **Content Strategy**: Data is maintained and scaled via the backend, but its primary purpose is frontend display.
-   **Field Selection Criteria**: explicit "Useful for Display" rule. We do not add fields for purely taxonomical or organizational reasons. Every field added must be:
    1.  Visually useful for the frontend.
    2.  Toggleable/decidable by the end client.
    3.  Focused on "wowing" the user, rather than just storing data.

## 2. Technical Constraints & Rules
> [!IMPORTANT]
> **Strict Adherence Required**

1.  **NO Blocks Feature**: We will **NOT** utilize the Blocks feature provided by Payload CMS. Content structure is handled via fixed, semantic fields/tabs, not flexible content blocks.
2.  **Protect E-commerce**: We will **NOT** disturb any features, operational logic, or collections provided by the PayloadCMS E-commerce plugin/template. These must remain intact and functional.

## 3. Technology Stack

### Backend
-   **Core**: Payload CMS 3.73 (Headless Typescript CMS)
-   **Dependencies**: Relies entirely on the tech stack provided by PayloadCMS.
-   **Database**: PostgreSQL (via `@payloadcms/db-postgres`)

### Frontend (Current vs. Future)
-   **Current**: Next.js 15 (App Router) using Payload's default stack.
-   **Future (Post-Backend Completion)**: The frontend will be completely rebuilt using a custom, high-performance stack:
    -   **Base Components**: ShadCn UI (and related specialized libraries).
    -   **Special Components**: React Bits, MagicUI, Aceternity UI.
    -   **Animations**: Framer Motion, GSAP, Lenis, Anime JS, React Spring.
    -   **3D Effects**: Three.js, React Three Fiber.
    -   **State/Validation**: Zustand, Zod, React Hook Forms (as required).