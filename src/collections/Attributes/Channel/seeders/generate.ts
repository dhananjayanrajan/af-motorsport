import { faker } from '@faker-js/faker';

export async function generateChannels(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    toggle: 'advanced',
    name: faker.helpers.arrayElement([
      'Official Website',
      'Mobile App',
      'Social Media',
      'Email Newsletter',
      'Customer Portal',
      'Support Chat',
      'API Endpoint',
      'Partner Portal'
    ]) + ' ' + faker.word.adjective(),
    type: [],
    basics: {
      enable: true,
      description: faker.lorem.sentence({ min: 8, max: 14 }),
      visibility: { show: true }
    },
    details: {
      enable: true,
      identifier: {
        label: faker.helpers.arrayElement(['Work', 'Personal', 'Support', 'Marketing']),
        title: faker.company.name() + ' ' + faker.word.noun()
      },
      address: {
        value: faker.internet.url(),
        locator: faker.internet.ip(),
        endpoint: '/' + faker.word.noun() + '/v' + faker.number.int({ min: 1, max: 3 })
      },
      protocol: {
        format: faker.helpers.arrayElement(['HTTPS', 'HTTP', 'WebSocket', 'gRPC']),
        scheme: faker.helpers.arrayElement(['Secure', 'Standard', 'Encrypted']),
        specification: 'RFC ' + faker.number.int({ min: 1000, max: 9999 })
      },
      visibility: { show: true }
    },
    traits: {
      enable: true,
      usage: {
        list: [{
          purpose: faker.helpers.arrayElement(['Customer support', 'Marketing', 'Data sync', 'Notifications']),
          role: faker.helpers.arrayElement(['Primary', 'Secondary', 'Backup']),
          function: faker.helpers.arrayElement(['Receive', 'Send', 'Both']),
          settings: { show: true, featured: false, pinned: false }
        }]
      },
      validity: {
        list: [{
          status: faker.helpers.arrayElement(['Active', 'Inactive', 'Pending']),
          condition: faker.helpers.arrayElement(['Operational', 'Degraded', 'Down']),
          state: faker.helpers.arrayElement(['Enabled', 'Disabled', 'Paused']),
          settings: { show: true, featured: false, pinned: false }
        }]
      },
      visibility: { show: true }
    },
    seo: {
      title: faker.lorem.words(4) + ' – Channel',
      image: null,
      description: faker.lorem.sentence({ min: 12, max: 20 })
    },
    generateSlug: true,
    slug: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase(),
    categories: [],
    tags: [],
    visibility: {
      check_publish: true,
      check_featured: false,
      check_pinned: false
    },
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  }));
}