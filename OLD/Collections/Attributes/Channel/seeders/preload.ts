// FILE: src/collections/Attributes/Channel/seeders/preload.ts
export const PRELOAD_CHANNEL = () => [
  {
    id: 1,
    toggle: 'advanced',   // ✅ changed from 'simple'
    name: 'Official Website',
    type: [],
    basics: {
      enable: true,
      description: 'Main communication channel for public inquiries.',
      visibility: { show: true }
    },
    details: {
      enable: true,
      identifier: {
        label: 'Work',
        title: 'Corporate Website'
      },
      address: {
        value: 'https://example.com',
        locator: '192.168.1.1',
        endpoint: '/api/v1'
      },
      protocol: {
        format: 'HTTPS',
        scheme: 'Secure',
        specification: 'RFC 2818'
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: {
        list: [
          {
            purpose: 'Customer support',
            role: 'Primary',
            function: 'Receive',
            settings: { show: true, featured: false, pinned: false }
          }
        ]
      },
      validity: {
        list: [
          {
            status: 'Active',
            condition: 'Operational',
            state: 'Enabled',
            settings: { show: true, featured: false, pinned: false }
          }
        ]
      },
      visibility: { show: true }
    },
    seo: {
      title: 'Official Website – Channel SEO Title',
      image: null,
      description: 'This is the main channel used for public communication and support.'
    },
    generateSlug: true,
    slug: 'official-website',
    categories: [],
    tags: [],
    visibility: {
      check_publish: true,
      check_featured: false,
      check_pinned: false
    },
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  }
] as const