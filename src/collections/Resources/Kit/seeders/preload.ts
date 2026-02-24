export const PRELOAD_KIT = (categoriesIds: number[]) => [
  {
    name: 'FIA Homologated Race Suit - 2024 Championship Specification',
    toggle: 'advanced',
    type: categoriesIds[185],
    basics: {
      enable: true,
      description: 'FIA 8856-2018 homologated multi-layer Nomex race suit featuring advanced fire-resistant construction, ergonomic seam placement, and integrated HANS device compatibility for professional Formula 1 competition.',
      purpose: {
        application: 'Track',
        context: 'Official FIA-sanctioned championship events requiring maximum safety certification',
        conditions: 'Extreme temperature environments, high-G force exposure, prolonged wear during race weekends',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Aerodynamic fit with minimal drag profile while maintaining full range of motion for cockpit operation',
        inspiration: 'Military flight suit ergonomics adapted for single-seater racing cockpit constraints',
        designer: 'AF Motorsport Technical Apparel Division',
        year: '2024-01-15',
      },
      functionality: {
        performance: 'Maximum',
        durability: 'Extreme',
        comfort: 'Premium',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: '3DPrinted',
        assembly: 'Bonded',
        finish: 'Matte',
      },
      materials: [
        { type: 'Nomex', specification: 'FIA 8856-2018 Level 3 fire-resistant fabric with moisture-wicking inner layer', origin: 'France' },
        { type: 'Carbon', specification: 'Reinforced shoulder and knee panels for abrasion resistance', origin: 'Germany' },
        { type: 'Synthetic', specification: 'Breathable mesh ventilation zones with antimicrobial treatment', origin: 'Italy' },
      ],
      appearance: {
        colors: 'Team livery primary colors with reflective FIA compliance striping',
        branding: 'Full',
        style: 'Modern',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'fia-homologated-race-suit-2024-championship-specification',
    visibility: { check_publish: true, check_featured: true, check_pinned: true },
  },
  {
    name: 'Practice Session Technical Polo - Team Issue',
    toggle: 'advanced',
    type: categoriesIds[53],
    basics: {
      enable: true,
      description: 'Moisture-wicking technical polo shirt designed for garage and paddock operations during practice sessions, featuring breathable fabric construction and team branding elements.',
      purpose: {
        application: 'Track',
        context: 'Non-competitive team operations requiring professional appearance with functional comfort',
        conditions: 'Variable weather paddock environments, extended wear during multi-day events',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Professional team uniform balancing brand visibility with operational practicality',
        inspiration: 'Aviation crew uniforms adapted for motorsport paddock workflow',
        designer: 'AF Motorsport Apparel Studio',
        year: '2024-02-01',
      },
      functionality: {
        performance: 'Enhanced',
        durability: 'High',
        comfort: 'Premium',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'Knitted',
        assembly: 'Stitched',
        finish: 'Textured',
      },
      materials: [
        { type: 'Polyester', specification: 'Quick-dry technical fabric with UV protection and odor control', origin: 'Japan' },
        { type: 'Cotton', specification: 'Blended inner collar for comfort against skin contact', origin: 'Egypt' },
      ],
      appearance: {
        colors: 'Team primary color with contrasting collar and sleeve accents',
        branding: 'Prominent',
        style: 'Modern',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'practice-session-technical-polo-team-issue',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Heritage Collection Vintage Racing Jacket',
    toggle: 'advanced',
    type: categoriesIds[146],
    basics: {
      enable: true,
      description: 'Limited edition heritage racing jacket celebrating championship-winning era, featuring authentic period-correct design elements with modern comfort enhancements for collector and fan appeal.',
      purpose: {
        application: 'Show',
        context: 'Brand heritage promotion, fan merchandise, and commemorative collector items',
        conditions: 'Casual wear environments, display purposes, special event appearances',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Authentic recreation of 1990s championship team jacket with contemporary fit and materials',
        inspiration: 'Original team archive photographs and period racing apparel documentation',
        designer: 'AF Motorsport Heritage Design Team',
        year: '2024-03-10',
      },
      functionality: {
        performance: 'Standard',
        durability: 'High',
        comfort: 'Premium',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'CutAndSew',
        assembly: 'Stitched',
        finish: 'Glossy',
      },
      materials: [
        { type: 'Cotton', specification: 'Premium heavyweight twill with vintage wash treatment', origin: 'United Kingdom' },
        { type: 'Leather', specification: 'Genuine leather collar and cuff accents with protective coating', origin: 'Italy' },
      ],
      appearance: {
        colors: 'Period-accurate team livery with distressed vintage finish',
        branding: 'Heritage',
        style: 'Retro',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'heritage-collection-vintage-racing-jacket',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'Pit Crew Fire-Resistant Overalls - FIA Certified',
    toggle: 'advanced',
    type: categoriesIds[123],
    basics: {
      enable: true,
      description: 'FIA 8856-2018 certified fire-resistant overalls designed for pit crew members, featuring reinforced knee and elbow panels, rapid-release fasteners, and integrated communication system compatibility.',
      purpose: {
        application: 'Track',
        context: 'Pit lane operations requiring maximum fire protection and unrestricted movement for sub-2.5 second stops',
        conditions: 'High-temperature pit lane environments, fuel exposure risk, rapid movement requirements',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Maximum protection with minimum weight for optimal pit crew performance and safety',
        inspiration: 'Formula 1 pit stop choreography analysis and crew movement biomechanics',
        designer: 'AF Motorsport Safety Equipment Division',
        year: '2024-01-20',
      },
      functionality: {
        performance: 'Maximum',
        durability: 'Extreme',
        comfort: 'Comfortable',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: '3DPrinted',
        assembly: 'Bonded',
        finish: 'Matte',
      },
      materials: [
        { type: 'Nomex', specification: 'Triple-layer fire-resistant fabric with thermal barrier technology', origin: 'France' },
        { type: 'Carbon', specification: 'Reinforced impact zones at knees, elbows, and shoulders', origin: 'Germany' },
      ],
      appearance: {
        colors: 'Team livery with high-visibility safety striping and crew role identification',
        branding: 'Full',
        style: 'Modern',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'pit-crew-fire-resistant-overalls-fia-certified',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'Executive Formal Blazer - Paddock Business Attire',
    toggle: 'advanced',
    type: categoriesIds[38],
    basics: {
      enable: true,
      description: 'Tailored formal blazer for executive team members during paddock business meetings, sponsor engagements, and media appearances, combining professional aesthetics with subtle motorsport branding.',
      purpose: {
        application: 'Show',
        context: 'Professional business environments requiring formal attire with brand representation',
        conditions: 'Indoor paddock hospitality, press conferences, sponsor dinner events',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Contemporary tailoring with discreet motorsport heritage elements for executive presence',
        inspiration: 'Classic British tailoring adapted for international motorsport business culture',
        designer: 'AF Motorsport Executive Apparel Consultant',
        year: '2024-02-15',
      },
      functionality: {
        performance: 'Standard',
        durability: 'High',
        comfort: 'Premium',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'CutAndSew',
        assembly: 'Stitched',
        finish: 'Glossy',
      },
      materials: [
        { type: 'Cotton', specification: 'Premium wool-blend fabric with wrinkle-resistant treatment', origin: 'United Kingdom' },
        { type: 'Synthetic', specification: 'Stretch lining for enhanced mobility during extended wear', origin: 'Italy' },
      ],
      appearance: {
        colors: 'Navy team color with subtle embroidered logo and championship insignia',
        branding: 'Minimal',
        style: 'Classic',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'executive-formal-blazer-paddock-business-attire',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Sponsor Partnership Promotional T-Shirt Collection',
    toggle: 'advanced',
    type: categoriesIds[122],
    basics: {
      enable: true,
      description: 'Co-branded promotional t-shirt series developed with title sponsor, featuring collaborative design elements, limited edition numbering, and fan engagement activation components.',
      purpose: {
        application: 'Promotion',
        context: 'Sponsor activation events, fan merchandise distribution, and brand partnership visibility',
        conditions: 'Casual wear environments, outdoor event exposure, high-volume distribution',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Collaborative brand storytelling through apparel with balanced sponsor and team identity',
        inspiration: 'Sponsor brand guidelines integrated with team visual identity system',
        designer: 'AF Motorsport x Sponsor Creative Partnership',
        year: '2024-03-01',
      },
      functionality: {
        performance: 'Standard',
        durability: 'Medium',
        comfort: 'Comfortable',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'Knitted',
        assembly: 'Stitched',
        finish: 'Matte',
      },
      materials: [
        { type: 'Cotton', specification: 'Organic cotton blend with eco-friendly dye process', origin: 'India' },
        { type: 'Polyester', specification: 'Recycled polyester accents for sustainability messaging', origin: 'Taiwan' },
      ],
      appearance: {
        colors: 'Sponsor primary colors with team accent highlights and co-branding layout',
        branding: 'Full',
        style: 'Modern',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'sponsor-partnership-promotional-t-shirt-collection',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Championship Commemorative Limited Edition Hoodie',
    toggle: 'advanced',
    type: categoriesIds[17],
    basics: {
      enable: true,
      description: 'Limited edition commemorative hoodie celebrating championship title victory, featuring embroidered championship insignia, victory date detailing, and numbered collector certification.',
      purpose: {
        application: 'Show',
        context: 'Championship celebration merchandise, fan collector items, and victory commemoration',
        conditions: 'Casual wear, display purposes, special edition collector market',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Premium commemorative apparel capturing championship achievement with collector-grade details',
        inspiration: 'Trophy design elements and victory ceremony imagery translated to wearable format',
        designer: 'AF Motorsport Commemorative Design Studio',
        year: '2024-12-01',
      },
      functionality: {
        performance: 'Standard',
        durability: 'High',
        comfort: 'Premium',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'CutAndSew',
        assembly: 'Stitched',
        finish: 'Textured',
      },
      materials: [
        { type: 'Cotton', specification: 'Premium heavyweight fleece with brushed inner lining', origin: 'Portugal' },
        { type: 'Polyester', specification: 'Reinforced drawstring and pocket construction for longevity', origin: 'Turkey' },
      ],
      appearance: {
        colors: 'Championship gold accents on team primary color with metallic embroidery',
        branding: 'Heritage',
        style: 'Modern',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'championship-commemorative-limited-edition-hoodie',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'Technical Engineer Workshop Coveralls',
    toggle: 'advanced',
    type: categoriesIds[245],
    basics: {
      enable: true,
      description: 'Durable workshop coveralls for engineering and technical staff, featuring multiple tool pockets, reinforced stress points, and stain-resistant fabric treatment for garage environment operations.',
      purpose: {
        application: 'Track',
        context: 'Technical workshop and garage operations requiring functional durability and professional appearance',
        conditions: 'Oil, grease, and chemical exposure environments, extended wear during maintenance sessions',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Maximum utility with professional appearance for technical team workshop environments',
        inspiration: 'Aerospace technician uniforms adapted for motorsport garage workflow',
        designer: 'AF Motorsport Technical Apparel Division',
        year: '2024-01-10',
      },
      functionality: {
        performance: 'Enhanced',
        durability: 'Extreme',
        comfort: 'Comfortable',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'CutAndSew',
        assembly: 'Stitched',
        finish: 'Matte',
      },
      materials: [
        { type: 'Polyester', specification: 'Heavy-duty ripstop fabric with stain-resistant and flame-retardant treatment', origin: 'United States' },
        { type: 'Cotton', specification: 'Blended inner lining for comfort during extended wear', origin: 'United States' },
      ],
      appearance: {
        colors: 'Team technical color scheme with high-visibility safety accents and role identification',
        branding: 'Prominent',
        style: 'Modern',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'technical-engineer-workshop-coveralls',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Fan Engagement Casual Polo - Global Retail',
    toggle: 'advanced',
    type: categoriesIds[243],
    basics: {
      enable: true,
      description: 'Global retail casual polo designed for fan engagement, featuring accessible price point, comfortable fit, and prominent team branding for supporter identification and brand loyalty.',
      purpose: {
        application: 'Street',
        context: 'Fan merchandise retail, casual wear, and brand supporter identification',
        conditions: 'Everyday casual environments, global climate variations, high-volume retail distribution',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Accessible fan apparel balancing brand visibility with everyday wearability and retail pricing',
        inspiration: 'Global fan feedback and retail market analysis for optimal supporter engagement',
        designer: 'AF Motorsport Retail Design Team',
        year: '2024-02-20',
      },
      functionality: {
        performance: 'Standard',
        durability: 'Medium',
        comfort: 'Comfortable',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'Knitted',
        assembly: 'Stitched',
        finish: 'Matte',
      },
      materials: [
        { type: 'Cotton', specification: 'Soft-touch cotton blend with pre-shrunk treatment for fit consistency', origin: 'Bangladesh' },
        { type: 'Polyester', specification: 'Moisture-wicking inner layer for comfort in varied climates', origin: 'Vietnam' },
      ],
      appearance: {
        colors: 'Team primary colors with bold logo placement and fan-appeal graphic elements',
        branding: 'Full',
        style: 'Modern',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'fan-engagement-casual-polo-global-retail',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Safety Equipment Integrated Fireproof Balaclava',
    toggle: 'advanced',
    type: categoriesIds[52],
    basics: {
      enable: true,
      description: 'FIA-certified fireproof balaclava designed for integration with helmet and HANS device, providing maximum head and neck protection while maintaining visibility and communication compatibility.',
      purpose: {
        application: 'Track',
        context: 'Mandatory safety equipment for drivers requiring FIA certification and helmet integration',
        conditions: 'Extreme temperature cockpit environments, prolonged wear during race sessions, communication system compatibility',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Maximum protection with minimal bulk for optimal helmet fit and driver comfort during competition',
        inspiration: 'Military aviation head protection systems adapted for motorsport cockpit constraints',
        designer: 'AF Motorsport Safety Equipment Division',
        year: '2024-01-05',
      },
      functionality: {
        performance: 'Maximum',
        durability: 'Extreme',
        comfort: 'Comfortable',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'Knitted',
        assembly: 'Bonded',
        finish: 'Matte',
      },
      materials: [
        { type: 'Nomex', specification: 'FIA 8856-2018 certified fire-resistant knit with moisture management', origin: 'France' },
        { type: 'Synthetic', specification: 'Antimicrobial treatment for hygiene during extended wear', origin: 'Switzerland' },
      ],
      appearance: {
        colors: 'Team color accents on black base with reflective safety elements',
        branding: 'Minimal',
        style: 'Modern',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'safety-equipment-integrated-fireproof-balaclava',
    visibility: { check_publish: true, check_featured: true, check_pinned: true },
  },
  {
    name: 'Media Day Promotional Windbreaker Jacket',
    toggle: 'advanced',
    type: categoriesIds[215],
    basics: {
      enable: true,
      description: 'Lightweight promotional windbreaker for media appearances and fan events, featuring water-resistant fabric, packable design, and prominent brand visibility for maximum marketing impact.',
      purpose: {
        application: 'Promotion',
        context: 'Media engagements, fan meet-and-greets, and outdoor promotional events requiring weather protection',
        conditions: 'Variable outdoor weather, high-visibility brand exposure, compact storage requirements',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Versatile promotional outerwear balancing weather protection with brand visibility and packability',
        inspiration: 'Outdoor adventure apparel adapted for motorsport promotional requirements',
        designer: 'AF Motorsport Promotional Design Studio',
        year: '2024-03-15',
      },
      functionality: {
        performance: 'Enhanced',
        durability: 'Medium',
        comfort: 'Comfortable',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'CutAndSew',
        assembly: 'Bonded',
        finish: 'Glossy',
      },
      materials: [
        { type: 'Polyester', specification: 'Water-resistant ripstop fabric with breathable membrane technology', origin: 'South Korea' },
        { type: 'Synthetic', specification: 'Reflective trim for visibility in low-light conditions', origin: 'Germany' },
      ],
      appearance: {
        colors: 'High-visibility team colors with bold logo placement and sponsor integration',
        branding: 'Full',
        style: 'Modern',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'media-day-promotional-windbreaker-jacket',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Driver Pre-Race Compression Base Layer',
    toggle: 'advanced',
    type: categoriesIds[232],
    basics: {
      enable: true,
      description: 'Performance compression base layer designed for pre-race preparation, featuring moisture-wicking technology, muscle support zones, and seamless construction for optimal comfort under race suit.',
      purpose: {
        application: 'Track',
        context: 'Pre-race preparation and in-cockpit wear requiring moisture management and muscle support',
        conditions: 'High-temperature cockpit environments, prolonged wear during race sessions, layering under fire-resistant suit',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Performance-enhancing compression with seamless integration under race suit for optimal driver comfort',
        inspiration: 'Athletic compression technology adapted for motorsport cockpit ergonomics',
        designer: 'AF Motorsport Performance Apparel Division',
        year: '2024-01-25',
      },
      functionality: {
        performance: 'Maximum',
        durability: 'High',
        comfort: 'Premium',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'Knitted',
        assembly: 'Bonded',
        finish: 'Matte',
      },
      materials: [
        { type: 'Polyester', specification: 'Four-way stretch compression fabric with moisture-wicking and odor-control treatment', origin: 'Italy' },
        { type: 'Synthetic', specification: 'Seamless construction zones for reduced friction under race suit', origin: 'Germany' },
      ],
      appearance: {
        colors: 'Team color accents on black base with subtle branding elements',
        branding: 'Minimal',
        style: 'Modern',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'driver-pre-race-compression-base-layer',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'Team Travel Casual Jogger Set',
    toggle: 'advanced',
    type: categoriesIds[107],
    basics: {
      enable: true,
      description: 'Comfortable casual jogger set for team travel and downtime, featuring relaxed fit, premium fabric, and subtle team branding for professional appearance during non-competitive periods.',
      purpose: {
        application: 'Street',
        context: 'Team travel, hotel downtime, and casual team appearances requiring comfortable professional attire',
        conditions: 'Extended wear during travel, variable climate conditions, casual professional environments',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Premium casual comfort with professional team identity for travel and downtime wear',
        inspiration: 'Luxury athleisure trends adapted for professional motorsport team requirements',
        designer: 'AF Motorsport Lifestyle Design Team',
        year: '2024-02-28',
      },
      functionality: {
        performance: 'Standard',
        durability: 'High',
        comfort: 'Premium',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'CutAndSew',
        assembly: 'Stitched',
        finish: 'Textured',
      },
      materials: [
        { type: 'Cotton', specification: 'Premium French terry fabric with brushed inner lining for comfort', origin: 'Portugal' },
        { type: 'Polyester', specification: 'Elastane blend for stretch recovery and shape retention', origin: 'Turkey' },
      ],
      appearance: {
        colors: 'Team primary color with tonal logo embroidery and subtle accent detailing',
        branding: 'Minimal',
        style: 'Modern',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'team-travel-casual-jogger-set',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'VIP Hospitality Premium Knit Sweater',
    toggle: 'advanced',
    type: categoriesIds[126],
    basics: {
      enable: true,
      description: 'Premium knit sweater for VIP hospitality environments, featuring luxury materials, refined tailoring, and discreet team branding for executive-level brand representation.',
      purpose: {
        application: 'Show',
        context: 'VIP hospitality suites, sponsor dinners, and executive engagements requiring luxury attire with brand identity',
        conditions: 'Indoor climate-controlled environments, formal social settings, high-profile brand representation',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Luxury knitwear with subtle motorsport heritage elements for executive brand representation',
        inspiration: 'Premium European knitwear traditions adapted for international motorsport business culture',
        designer: 'AF Motorsport Luxury Apparel Consultant',
        year: '2024-03-05',
      },
      functionality: {
        performance: 'Standard',
        durability: 'High',
        comfort: 'Premium',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'Knitted',
        assembly: 'Stitched',
        finish: 'Textured',
      },
      materials: [
        { type: 'Cotton', specification: 'Premium merino wool blend with cashmere accent for luxury hand feel', origin: 'Scotland' },
        { type: 'Synthetic', specification: 'Reinforced elbow and cuff construction for longevity', origin: 'Italy' },
      ],
      appearance: {
        colors: 'Sophisticated team color palette with tonal embroidery and luxury finish details',
        branding: 'Minimal',
        style: 'Classic',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'vip-hospitality-premium-knit-sweater',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'Youth Academy Training Kit - Development Program',
    toggle: 'advanced',
    type: categoriesIds[41],
    basics: {
      enable: true,
      description: 'Specialized training kit for youth academy drivers, featuring performance fabrics, growth-accommodating design, and educational branding elements to support emerging talent development.',
      purpose: {
        application: 'Track',
        context: 'Youth academy training sessions requiring performance apparel with developmental branding',
        conditions: 'Active training environments, growing body considerations, educational brand messaging',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Performance training apparel with educational branding to support youth driver development pathway',
        inspiration: 'Professional driver kit design scaled and adapted for youth academy requirements',
        designer: 'AF Motorsport Youth Development Design Team',
        year: '2024-02-10',
      },
      functionality: {
        performance: 'Enhanced',
        durability: 'High',
        comfort: 'Premium',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'CutAndSew',
        assembly: 'Stitched',
        finish: 'Matte',
      },
      materials: [
        { type: 'Polyester', specification: 'Moisture-wicking performance fabric with stretch recovery for active movement', origin: 'Japan' },
        { type: 'Cotton', specification: 'Soft-touch inner lining for comfort during extended training sessions', origin: 'India' },
      ],
      appearance: {
        colors: 'Academy color scheme with developmental branding elements and inspirational messaging',
        branding: 'Prominent',
        style: 'Modern',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'youth-academy-training-kit-development-program',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Rain Gear Technical Waterproof Jacket',
    toggle: 'advanced',
    type: categoriesIds[9],
    basics: {
      enable: true,
      description: 'Technical waterproof jacket for wet weather track operations, featuring fully sealed seams, breathable membrane, and helmet-compatible hood for maximum weather protection during adverse conditions.',
      purpose: {
        application: 'Track',
        context: 'Wet weather track operations requiring maximum weather protection with mobility for garage and paddock activities',
        conditions: 'Heavy rain exposure, wind resistance requirements, extended outdoor wear during variable weather',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Maximum weather protection with unrestricted mobility for trackside operations in adverse conditions',
        inspiration: 'Marine and mountaineering technical apparel adapted for motorsport trackside requirements',
        designer: 'AF Motorsport Technical Apparel Division',
        year: '2024-01-30',
      },
      functionality: {
        performance: 'Maximum',
        durability: 'Extreme',
        comfort: 'Comfortable',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'CutAndSew',
        assembly: 'Bonded',
        finish: 'Matte',
      },
      materials: [
        { type: 'Polyester', specification: '3-layer waterproof breathable membrane with fully taped seams', origin: 'Germany' },
        { type: 'Synthetic', specification: 'Reinforced high-wear zones with abrasion-resistant coating', origin: 'Switzerland' },
      ],
      appearance: {
        colors: 'High-visibility team colors with reflective safety elements for low-light conditions',
        branding: 'Prominent',
        style: 'Modern',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'rain-gear-technical-waterproof-jacket',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'Championship Victory Limited Edition Cap',
    toggle: 'advanced',
    type: categoriesIds[105],
    basics: {
      enable: true,
      description: 'Limited edition commemorative cap celebrating championship victory, featuring embroidered championship insignia, victory date detailing, and numbered collector certification for fan engagement.',
      purpose: {
        application: 'Promotion',
        context: 'Championship celebration merchandise, fan collector items, and victory commemoration',
        conditions: 'Casual wear, outdoor event exposure, collector market distribution',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Premium commemorative headwear capturing championship achievement with collector-grade details',
        inspiration: 'Trophy design elements and victory ceremony imagery translated to wearable format',
        designer: 'AF Motorsport Commemorative Design Studio',
        year: '2024-12-05',
      },
      functionality: {
        performance: 'Standard',
        durability: 'High',
        comfort: 'Comfortable',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'CutAndSew',
        assembly: 'Stitched',
        finish: 'Textured',
      },
      materials: [
        { type: 'Cotton', specification: 'Premium twill fabric with structured crown construction', origin: 'United States' },
        { type: 'Synthetic', specification: 'Adjustable closure with embroidered team branding', origin: 'China' },
      ],
      appearance: {
        colors: 'Championship gold accents on team primary color with metallic embroidery detailing',
        branding: 'Heritage',
        style: 'Classic',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'championship-victory-limited-edition-cap',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
  {
    name: 'Mechanic Tool Belt Integrated Work Vest',
    toggle: 'advanced',
    type: categoriesIds[118],
    basics: {
      enable: true,
      description: 'Specialized work vest with integrated tool belt system for mechanics, featuring multiple tool pockets, reinforced stress points, and ergonomic design for optimal garage workflow efficiency.',
      purpose: {
        application: 'Track',
        context: 'Mechanic operations requiring tool accessibility, durability, and professional appearance during pit stop and garage activities',
        conditions: 'High-movement garage environments, tool exposure, extended wear during maintenance sessions',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Maximum utility with ergonomic design for optimal mechanic workflow during pit stop and garage operations',
        inspiration: 'Professional tradesman vests adapted for motorsport pit crew choreography requirements',
        designer: 'AF Motorsport Technical Apparel Division',
        year: '2024-01-12',
      },
      functionality: {
        performance: 'Enhanced',
        durability: 'Extreme',
        comfort: 'Comfortable',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'CutAndSew',
        assembly: 'Stitched',
        finish: 'Matte',
      },
      materials: [
        { type: 'Polyester', specification: 'Heavy-duty Cordura fabric with abrasion-resistant coating', origin: 'United States' },
        { type: 'Synthetic', specification: 'Reinforced webbing and buckle system for tool attachment security', origin: 'Germany' },
      ],
      appearance: {
        colors: 'Team technical color scheme with high-visibility safety accents and role identification',
        branding: 'Prominent',
        style: 'Modern',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'mechanic-tool-belt-integrated-work-vest',
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
  },
  {
    name: 'Sustainability Initiative Eco-Friendly Fan Tee',
    toggle: 'advanced',
    type: categoriesIds[27],
    basics: {
      enable: true,
      description: 'Eco-friendly fan t-shirt developed as part of sustainability initiative, featuring organic materials, recycled components, and environmental messaging to promote brand commitment to ecological responsibility.',
      purpose: {
        application: 'Promotion',
        context: 'Sustainability initiative promotion, eco-conscious fan merchandise, and environmental brand messaging',
        conditions: 'Casual wear environments, global retail distribution, environmental education messaging',
      },
      visibility: { show: true },
    },
    details: {
      enable: true,
      design: {
        concept: 'Sustainable fan apparel demonstrating brand commitment to environmental responsibility through material choices and messaging',
        inspiration: 'Circular economy principles and eco-friendly fashion trends adapted for motorsport fan engagement',
        designer: 'AF Motorsport Sustainability Design Team',
        year: '2024-04-22',
      },
      functionality: {
        performance: 'Standard',
        durability: 'Medium',
        comfort: 'Comfortable',
      },
      visibility: { show: true },
    },
    traits: {
      enable: true,
      composition: {
        construction: 'Knitted',
        assembly: 'Stitched',
        finish: 'Matte',
      },
      materials: [
        { type: 'Cotton', specification: '100% organic cotton with GOTS certification and low-impact dye process', origin: 'Turkey' },
        { type: 'Polyester', specification: 'Recycled polyester from post-consumer plastic bottles for sustainability messaging', origin: 'Taiwan' },
      ],
      appearance: {
        colors: 'Earth-tone palette with environmental messaging graphics and subtle team branding',
        branding: 'Minimal',
        style: 'Modern',
      },
      visibility: { show: true },
    },
    assets: {
      enable: true,
      visibility: { show: true },
    },
    contexts: {
      enable: true,
      visibility: { show: true },
    },
    generateSlug: false,
    slug: 'sustainability-initiative-eco-friendly-fan-tee',
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
  },
] as const
