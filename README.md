# AF Motorsport

AF Motorsport is a domain-driven content architecture built on Payload CMS.  
It models the complete motorsport ecosystem of a brand as a structured, relational content graph rather than a traditional page-based CMS.

This project is designed to power a cinematic brand presence, competitive archives, team identity, and ecommerce operations from a single, unified source of truth.

---

## Overview

AF Motorsport is not built around pages.  
It is built around domain entities.

Drivers, Cars, Events, Organizations, Strategies, Stories, and Results are treated as first-class concepts with explicit relationships between them. Pages simply render these connected entities.

The result is a system where every piece of content exists as part of a larger, interconnected narrative structure.

---

## Domain Structure

The backend is organized into seven logical domains:

**Attributes**  
Reusable descriptors such as Categories, Tags, Features, Specifications, Skills, Principles, Classifications, Preferences, Channels, and Locations.

**Competition**  
Series, Seasons, Events, Sessions, Entries, Results, and Points. This models the full racing hierarchy.

**Entities**  
Drivers, Leaders, Members, Individuals, Organizations, and Users.

**Content**  
Narratives, Stories, Histories, Journeys, Notes, and Pages.

**Operations**  
Schedules, Trainings, Careers, Initiatives, Meetups, Celebrations, Protocols, Duties, and Expectations.

**Outcomes**  
Strategies, Decisions, Highlights, Incidents, Impacts, Awards, and Experiences.

**Resources**  
Cars, Kits, Media, Galleries, Playlists, Archives, and Visualizations.

In addition, the system includes site-wide Globals and a full Ecommerce layer.

---

## Core Philosophy

The system follows three core principles:

**Semantic clarity**  
Collections are named after real motorsport concepts, not UI components.

**Relational completeness**  
Connections between drivers, cars, teams, events, and outcomes are explicitly modeled.

**Context-first rendering**  
Pages retrieve a complete entity and its relationships rather than assembling scattered fragments.

This ensures consistency, reusability, and long-term scalability.

---

## Narrative Architecture

Storytelling is structured, not improvised.

The system separates:

- Narrative prose
- Structured stories
- Historical records
- Career journeys
- Contextual notes

This allows brand storytelling, competitive documentation, and institutional memory to coexist within a coherent framework.

---

## Competition Model

The racing structure is hierarchical:

Series → Season → Event → Session → Entry

Entries connect Drivers and Cars to Sessions and Results, forming the backbone of competitive data.

This enables complete driver profiles, event histories, and performance summaries to be generated from structured relationships.

---

## Commerce Integration

The ecommerce layer supports:

- Products
- Variants
- Orders
- Carts
- Transactions
- Customer accounts

Commerce remains structurally separate from brand narrative while sharing taxonomy for consistent categorization.

---

## Localization

The platform supports:

- English
- Spanish
- Portuguese

All content is localizable with fallback support.

---

## Editorial Experience

The admin interface is organized by domain rather than by raw collection list.  
Each collection includes structured sections and editorial controls to manage complexity.

The system is designed for domain experts in motorsport, not just developers.

---

## AI Compatibility

The entire content graph is structured and machine-queryable.  
This enables AI-assisted workflows and structured data access without bypassing the domain model.

---

## Purpose

AF Motorsport is more than a marketing website backend.

It is a structured motorsport knowledge system capable of supporting:

- Brand storytelling
- Competitive archives
- Sponsorship narratives
- Team operations
- Ecommerce
- AI-assisted content management

It provides a single, scalable foundation for both narrative and operational intelligence.

---

## Summary

AF Motorsport is a domain-driven relational content architecture that models the full ecosystem of a motorsport brand.  

It prioritizes structure over pages, relationships over fragments, and long-term semantic integrity over short-term layout convenience.

---

*Created for AF Motorsport.*
