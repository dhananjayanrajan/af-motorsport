import { faker } from '@faker-js/faker';
import { PRELOAD_CHANNELS } from './preload';

const PROTOCOL_FORMATS = ['HTTP', 'HTTPS', 'FTP', 'SFTP', 'SMTP', 'Custom'] as const;
const PROTOCOL_SCHEMES = ['Standard', 'Secure', 'Legacy'] as const;
const TOGGLES = ['simple', 'advanced'] as const;

const generateChannel = (id: number) => {
  const format = faker.helpers.arrayElement(PROTOCOL_FORMATS);
  const scheme = faker.helpers.arrayElement(PROTOCOL_SCHEMES);

  const name = `AF Motorsport ${faker.word.adjective()} ${faker.word.noun()} ${faker.helpers.arrayElement(['Link', 'Hub', 'Gateway', 'Exchange', 'Uplink'])} ${faker.string.numeric(2)}`;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return {
    id,
    name,
    toggle: faker.helpers.arrayElement(TOGGLES),
    type: faker.number.int({ min: 1, max: 5 }),
    basics: {
      enable: true,
      protocol: {
        format,
        scheme,
        specification: `Protocol Spec v${faker.system.semver()}`
      },
      visibility: { show: true }
      // NOTE: identifier and address are OMITTED because the seeder ignores them
    },
    traits: {
      enable: false,
      // NOTE: usage and validity are OMITTED because the seeder ignores them
      visibility: { show: false }
    },
    seo: {
      title: `${name} | AF Motorsport`,
      description: faker.lorem.sentence(),
      image: null
    },
    generateSlug: false,
    slug,
    categories: null,
    tags: null,
    visibility: {
      check_publish: faker.datatype.boolean(),
      check_featured: faker.datatype.boolean(),
      check_pinned: faker.datatype.boolean()
    },
    updatedAt: faker.date.recent().toISOString(),
    createdAt: faker.date.past({ years: 2 }).toISOString()
  };
};

export const GENERATED_CHANNELS = [
  ...PRELOAD_CHANNELS,
  ...Array.from({ length: 10 }, (_, i) => generateChannel(PRELOAD_CHANNELS.length + i + 1))
] as const;
