import { faker } from '@faker-js/faker';

const TONE_SCALE = ['Local', 'Regional', 'National', 'Global'] as const;
const TONE_DEPTH = ['Surface', 'Moderate', 'Deep', 'Profound'] as const;
const TONE_QUALITY = ['Positive', 'Neutral', 'Negative', 'Mixed'] as const;
const TONE_INTENSITY = ['Low', 'Medium', 'High', 'Extreme'] as const;
const TONE_MOOD = ['Optimistic', 'Somber', 'Energetic', 'Calm', 'Tense', 'Celebratory'] as const;
const TONE_QUALITY_SCALE = ['Minute', 'Moderate', 'Grand', 'Epic'] as const;

export async function generateTones(count: number) {
  return Array.from({ length: count }, () => ({
    toggle: faker.helpers.arrayElement(['simple', 'advanced', null]),
    name: faker.word.adjective() + ' ' + faker.word.noun(),
    alias: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase(),
    type: [],
    basics: {
      enable: true,
      description: faker.lorem.paragraph(),
      visibility: { show: faker.datatype.boolean() }
    },
    traits: {
      enable: true,
      scope: {
        significance: faker.lorem.words(3),
        scale: faker.helpers.arrayElement(TONE_SCALE),
        depth: faker.helpers.arrayElement(TONE_DEPTH)
      },
      qualities: {
        list: faker.helpers.multiple(
          () => ({
            quality: faker.helpers.arrayElement([null, ...TONE_QUALITY]),
            intensity: faker.helpers.arrayElement([null, ...TONE_INTENSITY]),
            mood: faker.helpers.arrayElement([null, ...TONE_MOOD]),
            scale: faker.helpers.arrayElement([null, ...TONE_QUALITY_SCALE]),
            settings: {
              show: true,
              featured: faker.datatype.boolean(),
              pinned: faker.datatype.boolean()
            },
            id: faker.string.uuid()
          }),
          { count: faker.number.int({ min: 0, max: 4 }) }
        )
      },
      visibility: { show: true }
    },
    seo: {
      title: faker.lorem.words(5),
      image: null,
      description: faker.lorem.paragraph()
    },
    generateSlug: true,
    slug: faker.helpers.slugify(faker.lorem.words(2)).toLowerCase(),
    categories: [],
    tags: [],
    visibility: {
      check_publish: faker.datatype.boolean(),
      check_featured: false,
      check_pinned: false
    }
  }));
}