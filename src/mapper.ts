import { faker } from '@faker-js/faker';
import payload from 'payload';

export async function mapRelationships() {
  payload.logger.info('STARTING RELATIONSHIP MAPPING');

  // Fetch all documents
  const categories = await payload.find({ collection: 'categories', limit: 1000 });
  const tags = await payload.find({ collection: 'tags', limit: 1000 });
  const media = await payload.find({ collection: 'media', limit: 1000 });
  const channels = await payload.find({ collection: 'channels', limit: 1000 });

  const categoryIds = categories.docs.map(c => c.id);
  const tagIds = tags.docs.map(t => t.id);
  const mediaIds = media.docs.map(m => m.id);

  // Map Category relationships
  for (const category of categories.docs) {
    const updates: any = {};

    if (mediaIds.length) {
      updates.seo = { ...category.seo, image: faker.helpers.arrayElement(mediaIds) };
    }

    const otherCategoryIds = categoryIds.filter(id => id !== category.id);
    if (otherCategoryIds.length) {
      updates.categories = faker.helpers.arrayElements(otherCategoryIds, { min: 0, max: 2 });
    }

    if (tagIds.length) {
      updates.tags = faker.helpers.arrayElements(tagIds, { min: 0, max: 3 });
    }

    await payload.update({ collection: 'categories', id: category.id, data: updates });
  }

  // Map Tag relationships
  for (const tag of tags.docs) {
    const updates: any = {};

    if (categoryIds.length) {
      updates.type = faker.helpers.arrayElements(categoryIds, { min: 0, max: 2 });
      updates.categories = faker.helpers.arrayElements(categoryIds, { min: 0, max: 2 });
    }

    if (mediaIds.length) {
      updates.seo = { ...tag.seo, image: faker.helpers.arrayElement(mediaIds) };
    }

    const otherTagIds = tagIds.filter(id => id !== tag.id);
    if (otherTagIds.length) {
      updates.tags = faker.helpers.arrayElements(otherTagIds, { min: 0, max: 3 });
    }

    await payload.update({ collection: 'tags', id: tag.id, data: updates });
  }

  // Map Channel relationships
  for (const channel of channels.docs) {
    const updates: any = {};

    if (categoryIds.length) {
      updates.type = faker.helpers.arrayElements(categoryIds, { min: 1, max: 3 });
      updates.categories = faker.helpers.arrayElements(categoryIds, { min: 0, max: 2 });
    }

    if (mediaIds.length) {
      updates.seo = { ...channel.seo, image: faker.helpers.arrayElement(mediaIds) };
    }

    if (tagIds.length) {
      updates.tags = faker.helpers.arrayElements(tagIds, { min: 0, max: 3 });
    }

    await payload.update({ collection: 'channels', id: channel.id, data: updates });
  }

  payload.logger.info('RELATIONSHIP MAPPING COMPLETE');
}