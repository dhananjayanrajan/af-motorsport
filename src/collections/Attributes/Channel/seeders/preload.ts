// FILE: src/collections/Attributes/Channel/seeders/preload.ts
export const PRELOAD_CHANNEL = [
  {
    id: 1,
    name: 'Official Website',
    type: 1,
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
    type: 3,
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
    type: 2,
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
  }
] as const
