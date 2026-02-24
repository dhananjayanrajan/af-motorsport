// FILE: src/collections/Content/Journey/seeders/preload.ts
export const PRELOAD_JOURNEY = (categoriesIds: number[], narrativesIds: number[]) => [
  {
    name: 'Rookie Development Journey',
    toggle: 'advanced',
    type: categoriesIds[185],
    details: { enable: true, narrative: narrativesIds[1], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Adapting to professional racing pace and pressure', significance: 'Significant', application: 'Mental preparation and racecraft refinement', impact: 'Personal' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Rookie Development Journey | AF Motorsport', description: 'Documentation of emerging driver progression through professional racing' },
    generateSlug: false, slug: 'rookie-development-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Championship Title Campaign Journey',
    toggle: 'advanced',
    type: categoriesIds[53],
    details: { enable: true, narrative: narrativesIds[2], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Consistency under pressure defines championship outcomes', significance: 'LifeChanging', application: 'Strategic patience and performance optimization', impact: 'Organizational' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Championship Campaign Journey | AF Motorsport', description: 'Documentation of title-winning season progression and strategic execution' },
    generateSlug: false, slug: 'championship-title-campaign-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Career Resilience Comeback Journey',
    toggle: 'advanced',
    type: categoriesIds[146],
    details: { enable: true, narrative: narrativesIds[3], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Setbacks are opportunities for strategic reinvention', significance: 'LifeChanging', application: 'Mental conditioning and performance recalibration', impact: 'Personal' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Career Comeback Journey | AF Motorsport', description: 'Documentation of professional recovery and competitive resurgence' },
    generateSlug: false, slug: 'career-resilience-comeback-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Technical Mastery Progression Journey',
    toggle: 'advanced',
    type: categoriesIds[123],
    details: { enable: true, narrative: narrativesIds[4], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Incremental technical improvements compound into competitive advantage', significance: 'Significant', application: 'Continuous learning and iterative development', impact: 'Team' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Technical Mastery Journey | AF Motorsport', description: 'Documentation of engineering skill development and technical expertise growth' },
    generateSlug: false, slug: 'technical-mastery-progression-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Team Transformation Journey',
    toggle: 'advanced',
    type: categoriesIds[38],
    details: { enable: true, narrative: narrativesIds[5], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Cultural alignment accelerates organizational performance', significance: 'Significant', application: 'Leadership communication and shared vision development', impact: 'Organizational' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Team Transformation Journey | AF Motorsport', description: 'Documentation of organizational evolution and performance culture development' },
    generateSlug: false, slug: 'team-transformation-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Innovation Adoption Journey',
    toggle: 'advanced',
    type: categoriesIds[122],
    details: { enable: true, narrative: narrativesIds[6], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Calculated risk-taking enables breakthrough performance gains', significance: 'Notable', application: 'Technology evaluation and implementation protocols', impact: 'Industry' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Innovation Adoption Journey | AF Motorsport', description: 'Documentation of technological advancement and competitive innovation integration' },
    generateSlug: false, slug: 'innovation-adoption-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Safety Culture Evolution Journey',
    toggle: 'advanced',
    type: categoriesIds[17],
    details: { enable: true, narrative: narrativesIds[7], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Proactive safety investment prevents catastrophic outcomes', significance: 'LifeChanging', application: 'Risk assessment and preventive protocol development', impact: 'Industry' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Safety Culture Journey | AF Motorsport', description: 'Documentation of safety protocol development and risk mitigation evolution' },
    generateSlug: false, slug: 'safety-culture-evolution-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Sustainability Integration Journey',
    toggle: 'advanced',
    type: categoriesIds[245],
    details: { enable: true, narrative: narrativesIds[8], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Environmental responsibility enhances long-term competitive viability', significance: 'Significant', application: 'Sustainable practice adoption and carbon reduction strategies', impact: 'Organizational' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Sustainability Integration Journey | AF Motorsport', description: 'Documentation of environmental responsibility adoption in motorsport operations' },
    generateSlug: false, slug: 'sustainability-integration-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Global Expansion Journey',
    toggle: 'advanced',
    type: categoriesIds[243],
    details: { enable: true, narrative: narrativesIds[9], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Cultural adaptation enables successful international competition', significance: 'Significant', application: 'Market research and localized engagement strategies', impact: 'Organizational' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Global Expansion Journey | AF Motorsport', description: 'Documentation of international growth and cultural adaptation in motorsport' },
    generateSlug: false, slug: 'global-expansion-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Digital Transformation Journey',
    toggle: 'advanced',
    type: categoriesIds[52],
    details: { enable: true, narrative: narrativesIds[10], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Data-driven decision making accelerates performance optimization', significance: 'Significant', application: 'Analytics integration and real-time monitoring systems', impact: 'Industry' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Digital Transformation Journey | AF Motorsport', description: 'Documentation of technology adoption and digital capability development' },
    generateSlug: false, slug: 'digital-transformation-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Leadership Development Journey',
    toggle: 'advanced',
    type: categoriesIds[215],
    details: { enable: true, narrative: narrativesIds[11], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Effective leadership balances vision with operational execution', significance: 'LifeChanging', application: 'Strategic communication and team empowerment practices', impact: 'Organizational' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Leadership Development Journey | AF Motorsport', description: 'Documentation of leadership skill development and management capability growth' },
    generateSlug: false, slug: 'leadership-development-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Performance Optimization Journey',
    toggle: 'advanced',
    type: categoriesIds[232],
    details: { enable: true, narrative: narrativesIds[12], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Marginal gains accumulate into decisive competitive advantage', significance: 'Significant', application: 'Continuous improvement methodologies and performance tracking', impact: 'Team' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Performance Optimization Journey | AF Motorsport', description: 'Documentation of performance enhancement strategies and competitive improvement' },
    generateSlug: false, slug: 'performance-optimization-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Crisis Management Journey',
    toggle: 'advanced',
    type: categoriesIds[107],
    details: { enable: true, narrative: narrativesIds[13], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Preparedness and adaptability determine crisis outcome quality', significance: 'LifeChanging', application: 'Contingency planning and rapid response protocols', impact: 'Organizational' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Crisis Management Journey | AF Motorsport', description: 'Documentation of challenge navigation and organizational resilience development' },
    generateSlug: false, slug: 'crisis-management-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Partnership Development Journey',
    toggle: 'advanced',
    type: categoriesIds[126],
    details: { enable: true, narrative: narrativesIds[14], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Value-aligned partnerships amplify competitive and commercial success', significance: 'Notable', application: 'Stakeholder engagement and mutual benefit frameworks', impact: 'Organizational' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Partnership Development Journey | AF Motorsport', description: 'Documentation of strategic alliance building and collaborative value creation' },
    generateSlug: false, slug: 'partnership-development-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Fan Engagement Evolution Journey',
    toggle: 'advanced',
    type: categoriesIds[41],
    details: { enable: true, narrative: narrativesIds[15], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Authentic connection builds enduring fan loyalty and brand advocacy', significance: 'Significant', application: 'Community building and interactive experience design', impact: 'Organizational' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Fan Engagement Journey | AF Motorsport', description: 'Documentation of audience connection strategies and community development' },
    generateSlug: false, slug: 'fan-engagement-evolution-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Regulatory Compliance Journey',
    toggle: 'advanced',
    type: categoriesIds[9],
    details: { enable: true, narrative: narrativesIds[16], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Proactive compliance enables competitive innovation within boundaries', significance: 'Notable', application: 'Regulatory monitoring and adaptive development processes', impact: 'Industry' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Regulatory Compliance Journey | AF Motorsport', description: 'Documentation of governance adherence and regulatory adaptation strategies' },
    generateSlug: false, slug: 'regulatory-compliance-journey',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Heritage Preservation Journey',
    toggle: 'advanced',
    type: categoriesIds[105],
    details: { enable: true, narrative: narrativesIds[17], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Honoring legacy inspires future innovation and cultural continuity', significance: 'Notable', application: 'Archival practices and heritage storytelling integration', impact: 'Organizational' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Heritage Preservation Journey | AF Motorsport', description: 'Documentation of historical conservation and legacy celebration initiatives' },
    generateSlug: false, slug: 'heritage-preservation-journey',
    visibility: { check_publish: true, check_featured: false, check_pinned: true }
  },
  {
    name: 'Talent Development Journey',
    toggle: 'advanced',
    type: categoriesIds[118],
    details: { enable: true, narrative: narrativesIds[18], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Structured development pathways accelerate emerging potential', significance: 'Significant', application: 'Mentorship programs and skill progression frameworks', impact: 'Industry' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Talent Development Journey | AF Motorsport', description: 'Documentation of emerging talent nurturing and career pathway development' },
    generateSlug: false, slug: 'talent-development-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Operational Excellence Journey',
    toggle: 'advanced',
    type: categoriesIds[27],
    details: { enable: true, narrative: narrativesIds[19], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Process discipline enables consistent high-performance delivery', significance: 'Significant', application: 'Standardization and continuous improvement methodologies', impact: 'Team' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Operational Excellence Journey | AF Motorsport', description: 'Documentation of process optimization and operational efficiency development' },
    generateSlug: false, slug: 'operational-excellence-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Legacy Building Journey',
    toggle: 'advanced',
    type: categoriesIds[166],
    details: { enable: true, narrative: narrativesIds[20], stories: [], visibility: { show: true } },
    traits: { enable: true, lessons: [{ lesson: 'Intentional legacy creation ensures enduring impact beyond competitive cycles', significance: 'LifeChanging', application: 'Strategic planning and values-based decision frameworks', impact: 'Industry' }], decisions: [], impacts: [], visibility: { show: true } },
    assets: { enable: true, gallery: null, playlist: null, visibility: { show: true } },
    seo: { title: 'Legacy Building Journey | AF Motorsport', description: 'Documentation of enduring impact creation and long-term value development' },
    generateSlug: false, slug: 'legacy-building-journey',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  }
] as const;
