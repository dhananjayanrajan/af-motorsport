import { faker } from '@faker-js/faker';
import type { Tag } from './types';

export async function generateTags(count: number): Promise<Partial<Tag>[]> {
  const tags: Partial<Tag>[] = [];

  for (let i = 0; i < count; i++) {
    tags.push({
      toggle: faker.helpers.arrayElement(['simple', 'advanced']),
      name: faker.lorem.words(2),
      basics: {
        enable: true,
        description: faker.lorem.sentence(),
        context: faker.lorem.words(3),
        visibility: { show: faker.datatype.boolean() },
      },
      seo: {
        title: faker.lorem.words(4),
        image: null,
        description: faker.lorem.paragraph(),
      },
      generateSlug: true,
      slug: faker.helpers.slugify(faker.lorem.words(2)).toLowerCase(),
      categories: [],
      tags: [],
      visibility: {
        check_publish: faker.datatype.boolean(),
        check_featured: faker.datatype.boolean(),
        check_pinned: faker.datatype.boolean(),
      },
    });
  }

  return tags;
}