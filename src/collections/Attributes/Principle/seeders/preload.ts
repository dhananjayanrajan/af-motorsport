// FILE: src/collections/Attributes/Principle/seeders/preload.ts
export const PRELOAD_PRINCIPLE = [
  {
    name: 'Driver Safety First',
    type: 2,          // Safety Compliance
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Primary consideration for all decisions',
      statement: 'No competitive advantage justifies compromising driver safety.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      application: 'All vehicle designs, race procedures, and equipment must prioritize driver protection.',
      rationale: 'Historical incidents demonstrate that safety innovations save lives without diminishing competition.',
      visibility: { show: true }
    },
    contexts: { enable: false, visibility: { show: false } },
    seo: { title: 'Driver Safety First | AF Motorsport Principles', description: 'Core principle prioritizing driver protection in all motorsport activities' },
    generateSlug: false,
    slug: 'driver-safety-first',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Continuous Innovation',
    type: 1,
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Relentless pursuit of improvement',
      statement: 'Complacency is the enemy of progress. We must continuously evolve.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      application: 'R&D investment, process improvement, and embracing new technologies.',
      rationale: 'Motorsport history shows that those who stop innovating fall behind permanently.',
      visibility: { show: true }
    },
    contexts: { enable: false, visibility: { show: false } },
    seo: { title: 'Continuous Innovation | AF Motorsport Principles', description: 'Core principle driving relentless improvement and technological advancement' },
    generateSlug: false,
    slug: 'continuous-innovation',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Respect Heritage',
    type: 3,
    toggle: 'advanced',
    basics: {
      enable: true,
      description: 'Honoring motorsport history and traditions',
      statement: 'We build upon the foundations laid by those who came before us.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      application: 'Preserving historical vehicles, documenting achievements, and learning from the past.',
      rationale: 'Understanding our heritage provides perspective and inspiration for future generations.',
      visibility: { show: true }
    },
    contexts: { enable: false, visibility: { show: false } },
    seo: { title: 'Respect Heritage | AF Motorsport Principles', description: 'Core principle honoring motorsport history and traditions' },
    generateSlug: false,
    slug: 'respect-heritage',
    visibility: { check_publish: true, check_featured: false, check_pinned: true }
  }
] as const
