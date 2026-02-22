// FILE: src/collections/Attributes/Category/seeders/preload.ts
export const PRELOAD_CATEGORY = [
  {
    id: 1,
    name: "Performance Engineering",
    type: [{ label: "Technical Discipline", value: "technical_discipline", id: "cat_tech_001" }],
    basics: { enable: true, description: "Categories focused on vehicle performance optimization, powertrain efficiency, and competitive advantage through advanced engineering solutions.", visibility: { show: true } },
    details: { enable: true, parent: null, visibility: { show: true } },
    seo: { title: "Performance Engineering Categories | AF Motorsport", description: "Explore technical categories driving performance innovation in motorsport", image: null },
    generateSlug: false,
    slug: "performance-engineering",
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
    updatedAt: "2026-02-22T10:00:00.000Z",
    createdAt: "2026-01-15T08:30:00.000Z"
  },
  {
    id: 2,
    name: "Safety Compliance",
    type: [{ label: "Regulatory Standard", value: "regulatory_standard", id: "cat_reg_002" }],
    basics: { enable: true, description: "Mandatory safety standards, FIA regulations, and compliance frameworks ensuring driver protection and operational integrity across all competitive environments.", visibility: { show: true } },
    details: { enable: true, parent: null, visibility: { show: true } },
    seo: { title: "Safety & Regulatory Compliance | AF Motorsport", description: "Official safety standards and regulatory categories for professional motorsport competition", image: null },
    generateSlug: false,
    slug: "safety-compliance",
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: false, check_pinned: true },
    updatedAt: "2026-02-20T14:22:00.000Z",
    createdAt: "2026-01-18T11:45:00.000Z"
  },
  {
    id: 3,
    name: "Heritage & Legacy",
    type: [{ label: "Historical Archive", value: "historical_archive", id: "cat_hist_003" }],
    basics: { enable: true, description: "Celebrating the storied history, iconic moments, and legendary achievements that define the AF Motorsport brand identity and racing heritage.", visibility: { show: true } },
    details: { enable: true, parent: null, visibility: { show: true } },
    seo: { title: "Heritage & Legacy Collections | AF Motorsport", description: "Discover the historical categories preserving motorsport tradition and brand legacy", image: null },
    generateSlug: false,
    slug: "heritage-legacy",
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: true, check_pinned: true },
    updatedAt: "2026-02-21T16:10:00.000Z",
    createdAt: "2026-01-20T09:15:00.000Z"
  }
] as const
