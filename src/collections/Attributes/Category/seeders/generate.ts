// FILE: src/collections/Attributes/Category/seeders/generate.ts
import { faker } from '@faker-js/faker';

export async function generateCategories(count: number) {
  return Array.from({ length: count }, () => ({
    toggle: faker.helpers.arrayElement(['simple', 'advanced', null]),
    name: faker.commerce.department() + ' ' + faker.lorem.word(),
    basics: {
      enable: true,
      description: faker.lorem.sentence(),
      visibility: { show: faker.datatype.boolean() }
    },
    details: {
      enable: true,
      type: faker.helpers.multiple(
        () => ({
          id: faker.string.uuid(),
          label: faker.lorem.words(2),
          value: faker.helpers.slugify(faker.lorem.words(2))
        }),
        { count: faker.number.int({ min: 0, max: 4 }) }
      ),
      visibility: { show: faker.datatype.boolean() }
    },
    seo: {
      title: faker.lorem.words(4),
      image: null,
      description: faker.lorem.paragraph()
    },
    generateSlug: true,
    slug: faker.helpers.slugify(faker.lorem.words(2)).toLowerCase(),
    categories: [],
    tags: [],
    visibility: {
      check_publish: true,
      check_featured: faker.datatype.boolean(),
      check_pinned: faker.datatype.boolean()
    }
  }));
}