export const PRELOAD_TONE = (categoriesIds: number[]) => [
  {
    name: 'Authoritative',
    alias: 'Expert Voice',
    type: categoriesIds[185],
    toggle: 'advanced',
    basics: { enable: true, description: 'Commanding confidence through technical expertise and racing heritage', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Establishes brand credibility in competitive motorsport', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Energetic', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Authoritative Tone | AF Motorsport', description: 'Commanding brand voice establishing expertise and confidence in racing' },
    generateSlug: false, slug: 'authoritative',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Passionate',
    alias: 'Enthusiast',
    type: categoriesIds[53],
    toggle: 'advanced',
    basics: { enable: true, description: 'Genuine excitement and emotional connection to racing culture', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Forges deep emotional bonds with global fanbase', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'Extreme', mood: 'Celebratory', scale: 'Epic' }],
      visibility: { show: true }
    },
    seo: { title: 'Passionate Tone | AF Motorsport', description: 'Genuine excitement and emotional connection with motorsport community' },
    generateSlug: false, slug: 'passionate',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Technical Precision',
    alias: 'Engineering',
    type: categoriesIds[146],
    toggle: 'advanced',
    basics: { enable: true, description: 'Accurate, detailed communication of engineering and performance data', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Demonstrates engineering excellence and innovation leadership', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Neutral', intensity: 'Medium', mood: 'Calm', scale: 'Moderate' }],
      visibility: { show: true }
    },
    seo: { title: 'Technical Precision Tone | AF Motorsport', description: 'Accurate and detailed engineering communication for technical audiences' },
    generateSlug: false, slug: 'technical-precision',
    visibility: { check_publish: true, check_featured: false, check_pinned: true }
  },
  {
    name: 'Inspirational',
    alias: 'Motivational',
    type: categoriesIds[123],
    toggle: 'advanced',
    basics: { enable: true, description: 'Uplifting messaging that drives ambition and perseverance', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Motivates drivers, teams, and fans to exceed limits', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Optimistic', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Inspirational Tone | AF Motorsport', description: 'Uplifting brand voice that drives ambition and racing excellence' },
    generateSlug: false, slug: 'inspirational',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Competitive Edge',
    alias: 'Victory Mindset',
    type: categoriesIds[38],
    toggle: 'advanced',
    basics: { enable: true, description: 'Relentless focus on performance advantage and championship pursuit', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Reinforces winning culture and strategic aggression', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'Extreme', mood: 'Energetic', scale: 'Epic' }],
      visibility: { show: true }
    },
    seo: { title: 'Competitive Edge Tone | AF Motorsport', description: 'Relentless brand voice focused on performance and championship success' },
    generateSlug: false, slug: 'competitive-edge',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Heritage Reverence',
    alias: 'Legacy Voice',
    type: categoriesIds[122],
    toggle: 'advanced',
    basics: { enable: true, description: 'Respectful acknowledgment of racing history and iconic moments', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Connects present achievements to legendary heritage', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'Medium', mood: 'Somber', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Heritage Reverence Tone | AF Motorsport', description: 'Respectful brand voice honoring motorsport history and legendary achievements' },
    generateSlug: false, slug: 'heritage-reverence',
    visibility: { check_publish: true, check_featured: false, check_pinned: true }
  },
  {
    name: 'Innovative Forward',
    alias: 'Future Focus',
    type: categoriesIds[17],
    toggle: 'advanced',
    basics: { enable: true, description: 'Progressive messaging emphasizing technological advancement and sustainability', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Positions brand as leader in next-generation motorsport', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Optimistic', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Innovative Forward Tone | AF Motorsport', description: 'Progressive brand voice emphasizing technological advancement and sustainability' },
    generateSlug: false, slug: 'innovative-forward',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Safety First',
    alias: 'Protective',
    type: categoriesIds[245],
    toggle: 'advanced',
    basics: { enable: true, description: 'Serious commitment to driver protection and risk mitigation', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Reinforces non-negotiable safety standards across all operations', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Calm', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Safety First Tone | AF Motorsport', description: 'Serious brand voice emphasizing driver safety and risk mitigation protocols' },
    generateSlug: false, slug: 'safety-first',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Fan-Centric',
    alias: 'Community Voice',
    type: categoriesIds[243],
    toggle: 'advanced',
    basics: { enable: true, description: 'Accessible, engaging communication that prioritizes audience connection', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Builds loyal global community through inclusive messaging', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Celebratory', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Fan-Centric Tone | AF Motorsport', description: 'Accessible brand voice that prioritizes audience engagement and community building' },
    generateSlug: false, slug: 'fan-centric',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Strategic Clarity',
    alias: 'Tactical',
    type: categoriesIds[52],
    toggle: 'advanced',
    basics: { enable: true, description: 'Clear, concise communication of race strategy and decision rationale', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Enables transparent understanding of competitive decisions', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Neutral', intensity: 'Medium', mood: 'Calm', scale: 'Moderate' }],
      visibility: { show: true }
    },
    seo: { title: 'Strategic Clarity Tone | AF Motorsport', description: 'Clear brand voice for transparent race strategy and decision communication' },
    generateSlug: false, slug: 'strategic-clarity',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Dramatic Tension',
    alias: 'Suspense',
    type: categoriesIds[215],
    toggle: 'advanced',
    basics: { enable: true, description: 'Heightened narrative style for critical race moments and championships', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Amplifies emotional impact of pivotal competitive moments', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Mixed', intensity: 'Extreme', mood: 'Tense', scale: 'Epic' }],
      visibility: { show: true }
    },
    seo: { title: 'Dramatic Tension Tone | AF Motorsport', description: 'Heightened brand voice for critical race moments and championship drama' },
    generateSlug: false, slug: 'dramatic-tension',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Celebratory Triumph',
    alias: 'Victory Lap',
    type: categoriesIds[232],
    toggle: 'advanced',
    basics: { enable: true, description: 'Exuberant expression of achievement and championship success', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Amplifies joy of victory and shared accomplishment', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'Extreme', mood: 'Celebratory', scale: 'Epic' }],
      visibility: { show: true }
    },
    seo: { title: 'Celebratory Triumph Tone | AF Motorsport', description: 'Exuberant brand voice expressing achievement and championship celebration' },
    generateSlug: false, slug: 'celebratory-triumph',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Resilient Determination',
    alias: 'Comeback Spirit',
    type: categoriesIds[107],
    toggle: 'advanced',
    basics: { enable: true, description: 'Unwavering commitment to recovery and performance under adversity', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Inspires perseverance through challenging race conditions', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Energetic', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Resilient Determination Tone | AF Motorsport', description: 'Unwavering brand voice inspiring perseverance through racing adversity' },
    generateSlug: false, slug: 'resilient-determination',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Analytical Insight',
    alias: 'Data Voice',
    type: categoriesIds[126],
    toggle: 'advanced',
    basics: { enable: true, description: 'Objective interpretation of performance metrics and competitive analysis', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Supports data-driven decision making and strategic optimization', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Neutral', intensity: 'Medium', mood: 'Calm', scale: 'Moderate' }],
      visibility: { show: true }
    },
    seo: { title: 'Analytical Insight Tone | AF Motorsport', description: 'Objective brand voice for performance metrics and competitive analysis' },
    generateSlug: false, slug: 'analytical-insight',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Collaborative Unity',
    alias: 'Team Spirit',
    type: categoriesIds[41],
    toggle: 'advanced',
    basics: { enable: true, description: 'Emphasis on collective effort and shared championship goals', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Reinforces organizational cohesion and mutual accountability', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Optimistic', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Collaborative Unity Tone | AF Motorsport', description: 'Brand voice emphasizing collective effort and shared racing success' },
    generateSlug: false, slug: 'collaborative-unity',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Urgent Action',
    alias: 'Race Control',
    type: categoriesIds[9],
    toggle: 'advanced',
    basics: { enable: true, description: 'Immediate, directive communication for time-critical situations', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Ensures rapid response during dynamic race scenarios', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Neutral', intensity: 'Extreme', mood: 'Tense', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Urgent Action Tone | AF Motorsport', description: 'Immediate brand voice for time-critical racing communications and decisions' },
    generateSlug: false, slug: 'urgent-action',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Reflective Wisdom',
    alias: 'Post-Race',
    type: categoriesIds[105],
    toggle: 'advanced',
    basics: { enable: true, description: 'Thoughtful analysis and lessons learned from competitive experience', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Transforms race outcomes into strategic knowledge for future advantage', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Neutral', intensity: 'Medium', mood: 'Somber', scale: 'Moderate' }],
      visibility: { show: true }
    },
    seo: { title: 'Reflective Wisdom Tone | AF Motorsport', description: 'Thoughtful brand voice for post-race analysis and strategic learning' },
    generateSlug: false, slug: 'reflective-wisdom',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Elite Exclusivity',
    alias: 'Premium',
    type: categoriesIds[118],
    toggle: 'advanced',
    basics: { enable: true, description: 'Sophisticated messaging reflecting championship-level standards and access', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Reinforces premium brand positioning and aspirational value', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'Medium', mood: 'Calm', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Elite Exclusivity Tone | AF Motorsport', description: 'Sophisticated brand voice reflecting championship standards and premium positioning' },
    generateSlug: false, slug: 'elite-exclusivity',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Transparent Honesty',
    alias: 'Open Book',
    type: categoriesIds[27],
    toggle: 'advanced',
    basics: { enable: true, description: 'Candid communication about challenges, setbacks, and realistic expectations', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Builds trust through authentic acknowledgment of competitive realities', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Neutral', intensity: 'Medium', mood: 'Calm', scale: 'Moderate' }],
      visibility: { show: true }
    },
    seo: { title: 'Transparent Honesty Tone | AF Motorsport', description: 'Candid brand voice building trust through authentic racing communication' },
    generateSlug: false, slug: 'transparent-honesty',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Dynamic Energy',
    alias: 'Adrenaline',
    type: categoriesIds[166],
    toggle: 'advanced',
    basics: { enable: true, description: 'High-intensity messaging matching the pace and excitement of racing', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Captures visceral thrill of wheel-to-wheel competition', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'Extreme', mood: 'Energetic', scale: 'Epic' }],
      visibility: { show: true }
    },
    seo: { title: 'Dynamic Energy Tone | AF Motorsport', description: 'High-intensity brand voice matching the pace and excitement of motorsport' },
    generateSlug: false, slug: 'dynamic-energy',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Respectful Rivalry',
    alias: 'Sportsmanship',
    type: categoriesIds[84],
    toggle: 'advanced',
    basics: { enable: true, description: 'Acknowledgment of competitor excellence while pursuing victory', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Promotes healthy competition and sporting integrity', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'Medium', mood: 'Calm', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Respectful Rivalry Tone | AF Motorsport', description: 'Brand voice acknowledging competitor excellence while pursuing racing victory' },
    generateSlug: false, slug: 'respectful-rivalry',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Sustainable Responsibility',
    alias: 'Eco-Conscious',
    type: categoriesIds[48],
    toggle: 'advanced',
    basics: { enable: true, description: 'Commitment messaging to environmental stewardship and green innovation', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Aligns brand with global sustainability goals and future racing', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Optimistic', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Sustainable Responsibility Tone | AF Motorsport', description: 'Brand voice committing to environmental stewardship and green racing innovation' },
    generateSlug: false, slug: 'sustainable-responsibility',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Precision Focus',
    alias: 'Laser Sharp',
    type: categoriesIds[109],
    toggle: 'advanced',
    basics: { enable: true, description: 'Unwavering attention to detail in execution and performance optimization', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Reinforces millisecond-level performance standards', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Neutral', intensity: 'High', mood: 'Calm', scale: 'Moderate' }],
      visibility: { show: true }
    },
    seo: { title: 'Precision Focus Tone | AF Motorsport', description: 'Brand voice emphasizing unwavering attention to detail and performance optimization' },
    generateSlug: false, slug: 'precision-focus',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Global Perspective',
    alias: 'World Stage',
    type: categoriesIds[110],
    toggle: 'advanced',
    basics: { enable: true, description: 'Inclusive messaging acknowledging diverse international racing culture', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Connects brand to worldwide motorsport community and values', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'Medium', mood: 'Optimistic', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Global Perspective Tone | AF Motorsport', description: 'Inclusive brand voice acknowledging diverse international racing culture and community' },
    generateSlug: false, slug: 'global-perspective',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Adaptive Agility',
    alias: 'Flexible Response',
    type: categoriesIds[147],
    toggle: 'advanced',
    basics: { enable: true, description: 'Messaging that embraces change and rapid strategic adjustment', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Supports dynamic decision-making in unpredictable race conditions', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Energetic', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Adaptive Agility Tone | AF Motorsport', description: 'Brand voice embracing change and rapid strategic adjustment in racing' },
    generateSlug: false, slug: 'adaptive-agility',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Legacy Building',
    alias: 'Future Heritage',
    type: categoriesIds[211],
    toggle: 'advanced',
    basics: { enable: true, description: 'Forward-looking messaging that honors tradition while shaping tomorrow', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Bridges historic achievement with next-generation innovation', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Optimistic', scale: 'Epic' }],
      visibility: { show: true }
    },
    seo: { title: 'Legacy Building Tone | AF Motorsport', description: 'Forward-looking brand voice honoring tradition while shaping motorsport future' },
    generateSlug: false, slug: 'legacy-building',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Minimalist Clarity',
    alias: 'Essential',
    type: categoriesIds[34],
    toggle: 'advanced',
    basics: { enable: true, description: 'Streamlined communication removing noise to highlight critical information', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Enhances comprehension during high-pressure racing scenarios', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Neutral', intensity: 'Medium', mood: 'Calm', scale: 'Moderate' }],
      visibility: { show: true }
    },
    seo: { title: 'Minimalist Clarity Tone | AF Motorsport', description: 'Streamlined brand voice removing noise to highlight critical racing information' },
    generateSlug: false, slug: 'minimalist-clarity',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Bold Disruption',
    alias: 'Game Changer',
    type: categoriesIds[97],
    toggle: 'advanced',
    basics: { enable: true, description: 'Confident messaging challenging conventions and redefining standards', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Positions brand as catalyst for industry transformation', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'Extreme', mood: 'Energetic', scale: 'Epic' }],
      visibility: { show: true }
    },
    seo: { title: 'Bold Disruption Tone | AF Motorsport', description: 'Confident brand voice challenging conventions and redefining motorsport standards' },
    generateSlug: false, slug: 'bold-disruption',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Empathetic Connection',
    alias: 'Human Touch',
    type: categoriesIds[121],
    toggle: 'advanced',
    basics: { enable: true, description: 'Understanding communication acknowledging driver and fan experiences', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Deepens emotional resonance and brand loyalty', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'Medium', mood: 'Calm', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Empathetic Connection Tone | AF Motorsport', description: 'Understanding brand voice acknowledging driver and fan experiences in racing' },
    generateSlug: false, slug: 'empathetic-connection',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Uncompromising Excellence',
    alias: 'Perfection Standard',
    type: categoriesIds[247],
    toggle: 'advanced',
    basics: { enable: true, description: 'Relentless pursuit of the highest performance and quality benchmarks', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Defines brand commitment to championship-level standards', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'Extreme', mood: 'Energetic', scale: 'Epic' }],
      visibility: { show: true }
    },
    seo: { title: 'Uncompromising Excellence Tone | AF Motorsport', description: 'Relentless brand voice pursuing highest performance and quality in motorsport' },
    generateSlug: false, slug: 'uncompromising-excellence',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Strategic Patience',
    alias: 'Long Game',
    type: categoriesIds[170],
    toggle: 'advanced',
    basics: { enable: true, description: 'Measured communication emphasizing long-term vision over short-term gains', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Supports sustainable growth and strategic championship planning', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Neutral', intensity: 'Medium', mood: 'Calm', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Strategic Patience Tone | AF Motorsport', description: 'Measured brand voice emphasizing long-term vision and sustainable racing success' },
    generateSlug: false, slug: 'strategic-patience',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Inclusive Welcome',
    alias: 'Open Door',
    type: categoriesIds[228],
    toggle: 'advanced',
    basics: { enable: true, description: 'Welcoming messaging that invites diverse participation in motorsport', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Expands brand appeal across demographics and cultures', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Optimistic', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Inclusive Welcome Tone | AF Motorsport', description: 'Welcoming brand voice inviting diverse participation in motorsport community' },
    generateSlug: false, slug: 'inclusive-welcome',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Technical Curiosity',
    alias: 'Explorer Mindset',
    type: categoriesIds[229],
    toggle: 'advanced',
    basics: { enable: true, description: 'Inquisitive communication encouraging innovation and problem-solving', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Fosters culture of continuous learning and technical advancement', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'Medium', mood: 'Optimistic', scale: 'Moderate' }],
      visibility: { show: true }
    },
    seo: { title: 'Technical Curiosity Tone | AF Motorsport', description: 'Inquisitive brand voice encouraging innovation and technical problem-solving' },
    generateSlug: false, slug: 'technical-curiosity',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Crisis Composure',
    alias: 'Steady Hand',
    type: categoriesIds[230],
    toggle: 'advanced',
    basics: { enable: true, description: 'Calm, authoritative communication during challenging or uncertain situations', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Maintains stakeholder confidence during operational disruptions', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Neutral', intensity: 'High', mood: 'Calm', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Crisis Composure Tone | AF Motorsport', description: 'Calm authoritative brand voice for challenging racing situations and uncertainty' },
    generateSlug: false, slug: 'crisis-composure',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Celebratory Gratitude',
    alias: 'Thank You',
    type: categoriesIds[216],
    toggle: 'advanced',
    basics: { enable: true, description: 'Appreciative messaging acknowledging contributions of team, partners, and fans', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Strengthens relationships and reinforces collaborative success', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Celebratory', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Celebratory Gratitude Tone | AF Motorsport', description: 'Appreciative brand voice acknowledging team, partners, and fan contributions' },
    generateSlug: false, slug: 'celebratory-gratitude',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Educational Clarity',
    alias: 'Knowledge Share',
    type: categoriesIds[241],
    toggle: 'advanced',
    basics: { enable: true, description: 'Clear, accessible explanation of complex racing concepts and technologies', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Demystifies motorsport for broader audience understanding and engagement', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Neutral', intensity: 'Medium', mood: 'Calm', scale: 'Moderate' }],
      visibility: { show: true }
    },
    seo: { title: 'Educational Clarity Tone | AF Motorsport', description: 'Clear brand voice explaining complex racing concepts for broader audience understanding' },
    generateSlug: false, slug: 'educational-clarity',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Playful Engagement',
    alias: 'Fun First',
    type: categoriesIds[249],
    toggle: 'advanced',
    basics: { enable: true, description: 'Lighthearted, entertaining communication that celebrates racing joy', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Enhances fan enjoyment and social media engagement', scale: 'Global', depth: 'Moderate' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Celebratory', scale: 'Moderate' }],
      visibility: { show: true }
    },
    seo: { title: 'Playful Engagement Tone | AF Motorsport', description: 'Lighthearted brand voice celebrating racing joy and enhancing fan enjoyment' },
    generateSlug: false, slug: 'playful-engagement',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Sober Reflection',
    alias: 'Thoughtful Pause',
    type: categoriesIds[217],
    toggle: 'advanced',
    basics: { enable: true, description: 'Respectful, measured communication acknowledging serious moments in racing', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Demonstrates organizational maturity and respect for sport gravity', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Neutral', intensity: 'Medium', mood: 'Somber', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Sober Reflection Tone | AF Motorsport', description: 'Respectful measured brand voice for serious moments in motorsport' },
    generateSlug: false, slug: 'sober-reflection',
    visibility: { check_publish: true, check_featured: false, check_pinned: true }
  },
  {
    name: 'Aspirational Vision',
    alias: 'Dream Big',
    type: categoriesIds[240],
    toggle: 'advanced',
    basics: { enable: true, description: 'Forward-looking messaging inspiring ambition and future achievement', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Motivates organizational and fan alignment toward shared future goals', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Optimistic', scale: 'Epic' }],
      visibility: { show: true }
    },
    seo: { title: 'Aspirational Vision Tone | AF Motorsport', description: 'Forward-looking brand voice inspiring ambition and future racing achievement' },
    generateSlug: false, slug: 'aspirational-vision',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Pragmatic Realism',
    alias: 'Grounded',
    type: categoriesIds[149],
    toggle: 'advanced',
    basics: { enable: true, description: 'Honest, practical communication acknowledging racing realities and constraints', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Builds credibility through authentic acknowledgment of competitive challenges', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Neutral', intensity: 'Medium', mood: 'Calm', scale: 'Moderate' }],
      visibility: { show: true }
    },
    seo: { title: 'Pragmatic Realism Tone | AF Motorsport', description: 'Honest practical brand voice acknowledging racing realities and constraints' },
    generateSlug: false, slug: 'pragmatic-realism',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Mystical Allure',
    alias: 'Magic of Racing',
    type: categoriesIds[218],
    toggle: 'advanced',
    basics: { enable: true, description: 'Evocative messaging capturing the intangible magic and emotion of motorsport', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Creates emotional connection through poetic expression of racing passion', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Somber', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Mystical Allure Tone | AF Motorsport', description: 'Evocative brand voice capturing intangible magic and emotion of motorsport' },
    generateSlug: false, slug: 'mystical-allure',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Confident Restraint',
    alias: 'Quiet Power',
    type: categoriesIds[164],
    toggle: 'advanced',
    basics: { enable: true, description: 'Understated messaging that conveys strength through measured confidence', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Projects maturity and self-assurance without overt boasting', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'Medium', mood: 'Calm', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Confident Restraint Tone | AF Motorsport', description: 'Understated brand voice conveying strength through measured confidence' },
    generateSlug: false, slug: 'confident-restraint',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Energetic Momentum',
    alias: 'Forward Drive',
    type: categoriesIds[161],
    toggle: 'advanced',
    basics: { enable: true, description: 'Propulsive messaging emphasizing progress, speed, and continuous advancement', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Reinforces brand association with speed and forward motion', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'Extreme', mood: 'Energetic', scale: 'Epic' }],
      visibility: { show: true }
    },
    seo: { title: 'Energetic Momentum Tone | AF Motorsport', description: 'Propulsive brand voice emphasizing progress, speed, and continuous racing advancement' },
    generateSlug: false, slug: 'energetic-momentum',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Intimate Connection',
    alias: 'Close Up',
    type: categoriesIds[229],
    toggle: 'advanced',
    basics: { enable: true, description: 'Personal, direct communication creating sense of individual relationship', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Deepens individual fan loyalty through personalized engagement', scale: 'Regional', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'Medium', mood: 'Calm', scale: 'Moderate' }],
      visibility: { show: true }
    },
    seo: { title: 'Intimate Connection Tone | AF Motorsport', description: 'Personal direct brand voice creating sense of individual relationship with fans' },
    generateSlug: false, slug: 'intimate-connection',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Bold Simplicity',
    alias: 'Pure Essence',
    type: categoriesIds[226],
    toggle: 'advanced',
    basics: { enable: true, description: 'Direct, uncluttered messaging that cuts through noise to core message', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Ensures message clarity in fast-paced racing communications', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Neutral', intensity: 'High', mood: 'Calm', scale: 'Moderate' }],
      visibility: { show: true }
    },
    seo: { title: 'Bold Simplicity Tone | AF Motorsport', description: 'Direct uncluttered brand voice cutting through noise to core racing message' },
    generateSlug: false, slug: 'bold-simplicity',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Poetic Expression',
    alias: 'Art of Speed',
    type: categoriesIds[218],
    toggle: 'advanced',
    basics: { enable: true, description: 'Lyrical, artistic communication celebrating racing as creative pursuit', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Elevates racing discourse through artistic expression and emotional depth', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'Medium', mood: 'Somber', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Poetic Expression Tone | AF Motorsport', description: 'Lyrical artistic brand voice celebrating racing as creative pursuit and emotional experience' },
    generateSlug: false, slug: 'poetic-expression',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Authoritative Calm',
    alias: 'Steady Command',
    type: categoriesIds[237],
    toggle: 'advanced',
    basics: { enable: true, description: 'Composed, confident communication projecting control in high-pressure scenarios', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Reassures stakeholders during critical race moments and operational challenges', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Calm', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Authoritative Calm Tone | AF Motorsport', description: 'Composed confident brand voice projecting control in high-pressure racing scenarios' },
    generateSlug: false, slug: 'authoritative-calm',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Joyful Celebration',
    alias: 'Pure Joy',
    type: categoriesIds[215],
    toggle: 'advanced',
    basics: { enable: true, description: 'Uninhibited expression of happiness and shared success in racing achievement', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Amplifies positive emotional connection with fans and team members', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'Extreme', mood: 'Celebratory', scale: 'Epic' }],
      visibility: { show: true }
    },
    seo: { title: 'Joyful Celebration Tone | AF Motorsport', description: 'Uninhibited brand voice expressing happiness and shared success in racing achievement' },
    generateSlug: false, slug: 'joyful-celebration',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Measured Optimism',
    alias: 'Hopeful Realist',
    type: categoriesIds[224],
    toggle: 'advanced',
    basics: { enable: true, description: 'Balanced messaging acknowledging challenges while maintaining positive outlook', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Maintains stakeholder confidence through realistic yet hopeful communication', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'Medium', mood: 'Optimistic', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Measured Optimism Tone | AF Motorsport', description: 'Balanced brand voice acknowledging challenges while maintaining positive racing outlook' },
    generateSlug: false, slug: 'measured-optimism',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Unapologetic Ambition',
    alias: 'No Limits',
    type: categoriesIds[247],
    toggle: 'advanced',
    basics: { enable: true, description: 'Bold, direct messaging declaring championship intent and competitive drive', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Signals unwavering commitment to victory and performance excellence', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'Extreme', mood: 'Energetic', scale: 'Epic' }],
      visibility: { show: true }
    },
    seo: { title: 'Unapologetic Ambition Tone | AF Motorsport', description: 'Bold direct brand voice declaring championship intent and competitive racing drive' },
    generateSlug: false, slug: 'unapologetic-ambition',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Thoughtful Inquiry',
    alias: 'Curious Mind',
    type: categoriesIds[229],
    toggle: 'advanced',
    basics: { enable: true, description: 'Questioning, exploratory communication encouraging learning and discovery', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Fosters culture of continuous improvement and technical curiosity', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Neutral', intensity: 'Medium', mood: 'Calm', scale: 'Moderate' }],
      visibility: { show: true }
    },
    seo: { title: 'Thoughtful Inquiry Tone | AF Motorsport', description: 'Questioning exploratory brand voice encouraging learning and technical discovery' },
    generateSlug: false, slug: 'thoughtful-inquiry',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Warm Welcome',
    alias: 'Open Arms',
    type: categoriesIds[228],
    toggle: 'advanced',
    basics: { enable: true, description: 'Friendly, inviting communication that makes newcomers feel valued', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Expands brand appeal by lowering barriers to fan engagement', scale: 'Global', depth: 'Moderate' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Optimistic', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Warm Welcome Tone | AF Motorsport', description: 'Friendly inviting brand voice making newcomers feel valued in motorsport community' },
    generateSlug: false, slug: 'warm-welcome',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Stoic Resolve',
    alias: 'Iron Will',
    type: categoriesIds[107],
    toggle: 'advanced',
    basics: { enable: true, description: 'Unwavering, disciplined communication reflecting mental fortitude', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Demonstrates psychological resilience and championship mentality', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Neutral', intensity: 'High', mood: 'Somber', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Stoic Resolve Tone | AF Motorsport', description: 'Unwavering disciplined brand voice reflecting mental fortitude and racing resilience' },
    generateSlug: false, slug: 'stoic-resolve',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Playful Wit',
    alias: 'Clever Fun',
    type: categoriesIds[249],
    toggle: 'advanced',
    basics: { enable: true, description: 'Witty, humorous communication that entertains while engaging', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Enhances social media engagement and fan enjoyment through humor', scale: 'Global', depth: 'Moderate' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Celebratory', scale: 'Moderate' }],
      visibility: { show: true }
    },
    seo: { title: 'Playful Wit Tone | AF Motorsport', description: 'Witty humorous brand voice entertaining while engaging racing fans' },
    generateSlug: false, slug: 'playful-wit',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Serious Dedication',
    alias: 'All In',
    type: categoriesIds[247],
    toggle: 'advanced',
    basics: { enable: true, description: 'Earnest, committed communication reflecting total focus on racing excellence', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Reinforces organizational commitment to championship pursuit', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'Extreme', mood: 'Energetic', scale: 'Epic' }],
      visibility: { show: true }
    },
    seo: { title: 'Serious Dedication Tone | AF Motorsport', description: 'Earnest committed brand voice reflecting total focus on racing excellence' },
    generateSlug: false, slug: 'serious-dedication',
    visibility: { check_publish: true, check_featured: true, check_pinned: true }
  },
  {
    name: 'Gentle Encouragement',
    alias: 'Supportive Voice',
    type: categoriesIds[240],
    toggle: 'advanced',
    basics: { enable: true, description: 'Kind, motivating communication that builds confidence and resilience', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Supports driver development and team morale through positive reinforcement', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'Medium', mood: 'Optimistic', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Gentle Encouragement Tone | AF Motorsport', description: 'Kind motivating brand voice building confidence and resilience in racing' },
    generateSlug: false, slug: 'gentle-encouragement',
    visibility: { check_publish: true, check_featured: false, check_pinned: false }
  },
  {
    name: 'Bold Authenticity',
    alias: 'Real Talk',
    type: categoriesIds[27],
    toggle: 'advanced',
    basics: { enable: true, description: 'Unfiltered, genuine communication that builds trust through honesty', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Strengthens brand credibility through transparent, authentic messaging', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Neutral', intensity: 'High', mood: 'Calm', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Bold Authenticity Tone | AF Motorsport', description: 'Unfiltered genuine brand voice building trust through transparent racing communication' },
    generateSlug: false, slug: 'bold-authenticity',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Elegant Precision',
    alias: 'Refined Edge',
    type: categoriesIds[109],
    toggle: 'advanced',
    basics: { enable: true, description: 'Sophisticated, meticulous communication reflecting attention to detail', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Reinforces premium brand positioning through refined expression', scale: 'Global', depth: 'Profound' },
      qualities: [{ quality: 'Positive', intensity: 'Medium', mood: 'Calm', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Elegant Precision Tone | AF Motorsport', description: 'Sophisticated meticulous brand voice reflecting attention to detail in racing' },
    generateSlug: false, slug: 'elegant-precision',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  },
  {
    name: 'Dynamic Optimism',
    alias: 'Bright Future',
    type: categoriesIds[240],
    toggle: 'advanced',
    basics: { enable: true, description: 'Energetic, forward-looking communication celebrating potential and progress', visibility: { show: true } },
    traits: {
      enable: true,
      scope: { significance: 'Inspires organizational and fan alignment toward positive future outcomes', scale: 'Global', depth: 'Deep' },
      qualities: [{ quality: 'Positive', intensity: 'High', mood: 'Optimistic', scale: 'Grand' }],
      visibility: { show: true }
    },
    seo: { title: 'Dynamic Optimism Tone | AF Motorsport', description: 'Energetic forward-looking brand voice celebrating potential and racing progress' },
    generateSlug: false, slug: 'dynamic-optimism',
    visibility: { check_publish: true, check_featured: true, check_pinned: false }
  }
] as const;
