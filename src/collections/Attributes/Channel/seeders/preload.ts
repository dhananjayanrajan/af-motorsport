// FILE: src/collections/Attributes/Channel/seeders/preload.ts
export const PRELOAD_CHANNEL = (categoriesIds: number[]) => [
  {
    id: 1,
    name: 'Official Website',
    type: categoriesIds[185],
    basics: {
      enable: true,
      identifier: { label: 'AF Motorsport Official', title: 'Corporate Website' },
      address: { value: 'https://www.afmotorsport.com', locator: '203.0.113.10', endpoint: '/' },
      protocol: { format: 'HTTPS', scheme: 'Secure', specification: 'TLS 1.3' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Public information and e-commerce', role: 'Primary', function: 'Broadcast', settings: { show: true, featured: true, pinned: true }, id: 'usage_web_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_web_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport Official Website', description: 'Explore the latest in performance engineering, safety compliance, and heritage collections.', image: null },
    generateSlug: false,
    slug: 'official-website',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: true, check_pinned: true },
    updatedAt: '2026-02-22T09:00:00.000Z',
    createdAt: '2026-01-10T11:20:00.000Z'
  },
  {
    id: 2,
    name: 'Instagram',
    type: categoriesIds[53],
    basics: {
      enable: true,
      identifier: { label: '@afmotorsport', title: 'Official Instagram' },
      address: { value: 'https://www.instagram.com/afmotorsport', locator: 'instagram.com/afmotorsport', endpoint: '/' },
      protocol: { format: 'HTTPS', scheme: 'Secure', specification: 'Graph API v18.0' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Brand storytelling and fan engagement', role: 'Primary', function: 'Broadcast', settings: { show: true, featured: true, pinned: true }, id: 'usage_ig_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_ig_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport on Instagram', description: 'Follow us for behind-the-scenes content, heritage moments, and race day action.', image: null },
    generateSlug: false,
    slug: 'instagram',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
    updatedAt: '2026-02-21T14:30:00.000Z',
    createdAt: '2026-01-15T09:45:00.000Z'
  },
  {
    id: 3,
    name: 'General Inquiries Email',
    type: categoriesIds[146],
    basics: {
      enable: true,
      identifier: { label: 'Info Address', title: 'General Inquiries' },
      address: { value: 'info@afmotorsport.com', locator: 'mail.afmotorsport.com', endpoint: 'SMTP' },
      protocol: { format: 'SMTP', scheme: 'Secure', specification: 'STARTTLS' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Customer and partner inquiries', role: 'Primary', function: 'Receive', settings: { show: true, featured: true, pinned: true }, id: 'usage_email_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_email_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'Contact AF Motorsport', description: 'Reach out to our team for general inquiries, partnership opportunities, and support.', image: null },
    generateSlug: false,
    slug: 'general-inquiries-email',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
    updatedAt: '2026-02-20T10:15:00.000Z',
    createdAt: '2026-01-18T13:20:00.000Z'
  },
  {
    id: 4,
    name: 'X (Twitter)',
    type: categoriesIds[123],
    basics: {
      enable: true,
      identifier: { label: '@AFMotorsport', title: 'Official X Account' },
      address: { value: 'https://x.com/AFMotorsport', locator: 'x.com/AFMotorsport', endpoint: '/' },
      protocol: { format: 'HTTPS', scheme: 'Secure', specification: 'API v2' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Real-time race updates and news', role: 'Primary', function: 'Broadcast', settings: { show: true, featured: true, pinned: true }, id: 'usage_x_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_x_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport on X', description: 'Follow for live race commentary, technical insights, and championship updates.', image: null },
    generateSlug: false,
    slug: 'x-twitter',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
    updatedAt: '2026-02-21T15:00:00.000Z',
    createdAt: '2026-01-16T10:30:00.000Z'
  },
  {
    id: 5,
    name: 'YouTube',
    type: categoriesIds[38],
    basics: {
      enable: true,
      identifier: { label: 'AF Motorsport', title: 'Official YouTube Channel' },
      address: { value: 'https://www.youtube.com/c/AFMotorsport', locator: 'youtube.com/c/AFMotorsport', endpoint: '/' },
      protocol: { format: 'HTTPS', scheme: 'Secure', specification: 'Data API v3' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Video content, documentaries, and highlights', role: 'Primary', function: 'Broadcast', settings: { show: true, featured: true, pinned: true }, id: 'usage_yt_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_yt_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport on YouTube', description: 'Watch exclusive documentaries, race highlights, and technical deep dives.', image: null },
    generateSlug: false,
    slug: 'youtube',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
    updatedAt: '2026-02-21T16:00:00.000Z',
    createdAt: '2026-01-17T11:00:00.000Z'
  },
  {
    id: 6,
    name: 'Press Office Email',
    type: categoriesIds[122],
    basics: {
      enable: true,
      identifier: { label: 'Press Contact', title: 'Media Relations' },
      address: { value: 'press@afmotorsport.com', locator: 'mail.afmotorsport.com', endpoint: 'SMTP' },
      protocol: { format: 'SMTP', scheme: 'Secure', specification: 'STARTTLS' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Media inquiries and press releases', role: 'Primary', function: 'Receive', settings: { show: true, featured: true, pinned: true }, id: 'usage_press_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_press_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport Press Office', description: 'Contact our media relations team for press inquiries, interview requests, and official statements.', image: null },
    generateSlug: false,
    slug: 'press-office-email',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: false, check_pinned: true },
    updatedAt: '2026-02-20T11:00:00.000Z',
    createdAt: '2026-01-19T14:00:00.000Z'
  },
  {
    id: 7,
    name: 'LinkedIn',
    type: categoriesIds[17],
    basics: {
      enable: true,
      identifier: { label: 'AF Motorsport', title: 'Official LinkedIn Page' },
      address: { value: 'https://www.linkedin.com/company/afmotorsport', locator: 'linkedin.com/company/afmotorsport', endpoint: '/' },
      protocol: { format: 'HTTPS', scheme: 'Secure', specification: 'REST API v2' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Corporate communications and recruitment', role: 'Primary', function: 'Broadcast', settings: { show: true, featured: true, pinned: true }, id: 'usage_li_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_li_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport on LinkedIn', description: 'Connect with us for career opportunities, corporate news, and industry insights.', image: null },
    generateSlug: false,
    slug: 'linkedin',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
    updatedAt: '2026-02-21T17:00:00.000Z',
    createdAt: '2026-01-20T12:00:00.000Z'
  },
  {
    id: 8,
    name: 'Facebook',
    type: categoriesIds[245],
    basics: {
      enable: true,
      identifier: { label: 'AF Motorsport', title: 'Official Facebook Page' },
      address: { value: 'https://www.facebook.com/AFMotorsport', locator: 'facebook.com/AFMotorsport', endpoint: '/' },
      protocol: { format: 'HTTPS', scheme: 'Secure', specification: 'Graph API v18.0' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Community engagement and event promotion', role: 'Primary', function: 'Broadcast', settings: { show: true, featured: true, pinned: true }, id: 'usage_fb_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_fb_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport on Facebook', description: 'Join our community for fan discussions, event announcements, and exclusive content.', image: null },
    generateSlug: false,
    slug: 'facebook',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
    updatedAt: '2026-02-21T18:00:00.000Z',
    createdAt: '2026-01-21T13:00:00.000Z'
  },
  {
    id: 9,
    name: 'Partnerships Email',
    type: categoriesIds[243],
    basics: {
      enable: true,
      identifier: { label: 'Partnerships Team', title: 'Commercial Inquiries' },
      address: { value: 'partnerships@afmotorsport.com', locator: 'mail.afmotorsport.com', endpoint: 'SMTP' },
      protocol: { format: 'SMTP', scheme: 'Secure', specification: 'STARTTLS' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Sponsorship and commercial partnership opportunities', role: 'Primary', function: 'Receive', settings: { show: true, featured: true, pinned: true }, id: 'usage_partnerships_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_partnerships_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport Partnerships', description: 'Explore collaboration opportunities with AF Motorsport for sponsorship and commercial partnerships.', image: null },
    generateSlug: false,
    slug: 'partnerships-email',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
    updatedAt: '2026-02-20T12:00:00.000Z',
    createdAt: '2026-01-22T14:30:00.000Z'
  },
  {
    id: 10,
    name: 'Technical Support Email',
    type: categoriesIds[52],
    basics: {
      enable: true,
      identifier: { label: 'Technical Support', title: 'Engineering Inquiries' },
      address: { value: 'technical@afmotorsport.com', locator: 'mail.afmotorsport.com', endpoint: 'SMTP' },
      protocol: { format: 'SMTP', scheme: 'Secure', specification: 'STARTTLS' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Technical inquiries and engineering collaboration', role: 'Primary', function: 'Receive', settings: { show: true, featured: true, pinned: true }, id: 'usage_tech_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_tech_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport Technical Support', description: 'Contact our engineering team for technical inquiries, specification requests, and collaboration opportunities.', image: null },
    generateSlug: false,
    slug: 'technical-support-email',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
    updatedAt: '2026-02-20T13:00:00.000Z',
    createdAt: '2026-01-23T15:00:00.000Z'
  },
  {
    id: 11,
    name: 'Headquarters Main Line',
    type: categoriesIds[215],
    basics: {
      enable: true,
      identifier: { label: 'Silverstone HQ', title: 'Main Reception' },
      address: { value: '+44 1327 320320', locator: 'Silverstone Circuit, UK', endpoint: 'Reception' },
      protocol: { format: 'Custom', scheme: 'Standard', specification: 'PSTN' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'General inquiries and visitor coordination', role: 'Primary', function: 'Receive', settings: { show: true, featured: true, pinned: true }, id: 'usage_phone_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_phone_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport Headquarters Contact', description: 'Contact our Silverstone headquarters for general inquiries, visitor information, and reception services.', image: null },
    generateSlug: false,
    slug: 'headquarters-main-line',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
    updatedAt: '2026-02-20T14:00:00.000Z',
    createdAt: '2026-01-24T16:00:00.000Z'
  },
  {
    id: 12,
    name: 'Media Hotline',
    type: categoriesIds[232],
    basics: {
      enable: true,
      identifier: { label: 'Press Hotline', title: '24/7 Media Contact' },
      address: { value: '+44 1327 320999', locator: 'Silverstone Circuit, UK', endpoint: 'Press Office' },
      protocol: { format: 'Custom', scheme: 'Standard', specification: 'PSTN' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Urgent media inquiries and race day press coordination', role: 'Primary', function: 'Receive', settings: { show: true, featured: true, pinned: true }, id: 'usage_media_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_media_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport Media Hotline', description: '24/7 contact for urgent media inquiries, race day press coordination, and official statements.', image: null },
    generateSlug: false,
    slug: 'media-hotline',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: false, check_pinned: true },
    updatedAt: '2026-02-20T15:00:00.000Z',
    createdAt: '2026-01-25T17:00:00.000Z'
  },
  {
    id: 13,
    name: 'Careers Portal',
    type: categoriesIds[107],
    basics: {
      enable: true,
      identifier: { label: 'AF Careers', title: 'Career Opportunities' },
      address: { value: 'https://careers.afmotorsport.com', locator: '203.0.113.11', endpoint: '/apply' },
      protocol: { format: 'HTTPS', scheme: 'Secure', specification: 'TLS 1.3' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Job applications and talent recruitment', role: 'Primary', function: 'Receive', settings: { show: true, featured: true, pinned: true }, id: 'usage_careers_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_careers_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport Careers', description: 'Explore career opportunities with AF Motorsport and join our championship-winning team.', image: null },
    generateSlug: false,
    slug: 'careers-portal',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
    updatedAt: '2026-02-21T19:00:00.000Z',
    createdAt: '2026-01-26T18:00:00.000Z'
  },
  {
    id: 14,
    name: 'TikTok',
    type: categoriesIds[126],
    basics: {
      enable: true,
      identifier: { label: '@afmotorsport', title: 'Official TikTok' },
      address: { value: 'https://www.tiktok.com/@afmotorsport', locator: 'tiktok.com/@afmotorsport', endpoint: '/' },
      protocol: { format: 'HTTPS', scheme: 'Secure', specification: 'API v1.0' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Short-form content and youth engagement', role: 'Primary', function: 'Broadcast', settings: { show: true, featured: true, pinned: true }, id: 'usage_tt_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_tt_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport on TikTok', description: 'Follow for quick highlights, driver moments, and behind-the-scenes content.', image: null },
    generateSlug: false,
    slug: 'tiktok',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
    updatedAt: '2026-02-21T20:00:00.000Z',
    createdAt: '2026-01-27T19:00:00.000Z'
  },
  {
    id: 15,
    name: 'Customer Support Line',
    type: categoriesIds[41],
    basics: {
      enable: true,
      identifier: { label: 'Support Team', title: 'Customer Service' },
      address: { value: '+44 1327 320555', locator: 'Silverstone Circuit, UK', endpoint: 'Support Desk' },
      protocol: { format: 'Custom', scheme: 'Standard', specification: 'PSTN' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Customer service and merchandise support', role: 'Primary', function: 'Receive', settings: { show: true, featured: true, pinned: true }, id: 'usage_support_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_support_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport Customer Support', description: 'Contact our support team for merchandise inquiries, order assistance, and customer service.', image: null },
    generateSlug: false,
    slug: 'customer-support-line',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
    updatedAt: '2026-02-20T16:00:00.000Z',
    createdAt: '2026-01-28T20:00:00.000Z'
  },
  {
    id: 16,
    name: 'Emergency Operations Line',
    type: categoriesIds[9],
    basics: {
      enable: true,
      identifier: { label: 'Emergency Ops', title: '24/7 Emergency Contact' },
      address: { value: '+44 1327 320911', locator: 'Silverstone Circuit, UK', endpoint: 'Emergency Control' },
      protocol: { format: 'Custom', scheme: 'Secure', specification: 'Encrypted PSTN' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Emergency response coordination and safety incidents', role: 'Primary', function: 'Receive', settings: { show: true, featured: true, pinned: true }, id: 'usage_emergency_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_emergency_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport Emergency Contact', description: '24/7 emergency contact for safety incidents, medical emergencies, and urgent operational coordination.', image: null },
    generateSlug: false,
    slug: 'emergency-operations-line',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: false, check_pinned: true },
    updatedAt: '2026-02-20T17:00:00.000Z',
    createdAt: '2026-01-29T21:00:00.000Z'
  },
  {
    id: 17,
    name: 'E-Commerce Store',
    type: categoriesIds[105],
    basics: {
      enable: true,
      identifier: { label: 'AF Store', title: 'Official Merchandise' },
      address: { value: 'https://store.afmotorsport.com', locator: '203.0.113.12', endpoint: '/shop' },
      protocol: { format: 'HTTPS', scheme: 'Secure', specification: 'TLS 1.3' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Official merchandise sales and fan products', role: 'Primary', function: 'Broadcast', settings: { show: true, featured: true, pinned: true }, id: 'usage_store_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_store_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport Official Store', description: 'Shop official AF Motorsport merchandise, apparel, and exclusive fan products.', image: null },
    generateSlug: false,
    slug: 'e-commerce-store',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: true, check_pinned: false },
    updatedAt: '2026-02-21T21:00:00.000Z',
    createdAt: '2026-01-30T22:00:00.000Z'
  },
  {
    id: 18,
    name: 'Media Center Portal',
    type: categoriesIds[118],
    basics: {
      enable: true,
      identifier: { label: 'AF Media Center', title: 'Press Resources' },
      address: { value: 'https://media.afmotorsport.com', locator: '203.0.113.13', endpoint: '/press' },
      protocol: { format: 'HTTPS', scheme: 'Secure', specification: 'TLS 1.3' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Press resources, media assets, and official statements', role: 'Primary', function: 'Broadcast', settings: { show: true, featured: true, pinned: true }, id: 'usage_media_center_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_media_center_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport Media Center', description: 'Access press resources, official images, videos, and statements for media professionals.', image: null },
    generateSlug: false,
    slug: 'media-center-portal',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: false, check_pinned: true },
    updatedAt: '2026-02-20T18:00:00.000Z',
    createdAt: '2026-01-31T23:00:00.000Z'
  },
  {
    id: 19,
    name: 'Twitch',
    type: categoriesIds[27],
    basics: {
      enable: true,
      identifier: { label: 'AFMotorsportLive', title: 'Official Twitch Channel' },
      address: { value: 'https://www.twitch.tv/AFMotorsportLive', locator: 'twitch.tv/AFMotorsportLive', endpoint: '/' },
      protocol: { format: 'HTTPS', scheme: 'Secure', specification: 'Helix API' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Live streaming and interactive fan experiences', role: 'Primary', function: 'Broadcast', settings: { show: true, featured: true, pinned: true }, id: 'usage_twitch_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_twitch_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport on Twitch', description: 'Watch live streams, driver Q&As, and interactive fan experiences.', image: null },
    generateSlug: false,
    slug: 'twitch',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
    updatedAt: '2026-02-21T22:00:00.000Z',
    createdAt: '2026-02-01T00:00:00.000Z'
  },
  {
    id: 20,
    name: 'Careers Email',
    type: categoriesIds[166],
    basics: {
      enable: true,
      identifier: { label: 'Talent Acquisition', title: 'Recruitment Contact' },
      address: { value: 'careers@afmotorsport.com', locator: 'mail.afmotorsport.com', endpoint: 'SMTP' },
      protocol: { format: 'SMTP', scheme: 'Secure', specification: 'STARTTLS' },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: { list: [{ purpose: 'Job applications and talent inquiries', role: 'Primary', function: 'Receive', settings: { show: true, featured: true, pinned: true }, id: 'usage_careers_email_001' }] },
      validity: { list: [{ status: 'Active', condition: 'Operational', state: 'Enabled', settings: { show: true, featured: true, pinned: true }, id: 'validity_careers_email_001' }] },
      visibility: { show: true }
    },
    seo: { title: 'AF Motorsport Careers Contact', description: 'Submit your application or inquire about career opportunities with AF Motorsport.', image: null },
    generateSlug: false,
    slug: 'careers-email',
    categories: null,
    tags: null,
    visibility: { check_publish: true, check_featured: false, check_pinned: false },
    updatedAt: '2026-02-20T19:00:00.000Z',
    createdAt: '2026-02-02T01:00:00.000Z'
  }
] as const
