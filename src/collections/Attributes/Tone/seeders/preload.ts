// FILE: src/collections/Attributes/Tone/seeders/preload.ts
export const PRELOAD_TONE = [
  {
    name: 'Authoritative',
    alias: 'Expert Voice',
    type: 1,
    toggle: 'advanced',
    basics: { enable: true, description: 'Commanding confidence through expertise', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Establishes credibility', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Energetic', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Authoritative Tone', description: 'Commanding brand voice establishing expertise and confidence' },
    generateSlug: false,
    slug: 'authoritative',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Passionate',
    alias: 'Enthusiast',
    type: 2,
    toggle: 'advanced',
    basics: { enable: true, description: 'Genuine excitement and love for the sport', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Connects emotionally with fans', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'Extreme', mood: 'Celebratory', scale: 'Epic' }],
      visibility: { show: true }
    },
    seo: { title: 'Passionate Tone', description: 'Genuine excitement and emotional connection with motorsport' },
    generateSlug: false,
    slug: 'passionate',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Technical Precision',
    alias: 'Engineering',
    type: 3,
    toggle: 'advanced',
    basics: { enable: true, description: 'Accurate, detailed technical communication', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Demonstrates engineering excellence', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Neutral', intensity: 'Medium', mood: 'Calm', scale: 'Moderate' }],
      visibility: { show: true }
    },
    seo: { title: 'Technical Precision Tone', description: 'Accurate and detailed engineering communication style' },
    generateSlug: false,
    slug: 'technical-precision',
    visibility: { check_publish: true, check_featured: false, check_pinned: true }
  }
] as const
