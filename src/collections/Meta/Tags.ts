import type { CollectionConfig } from 'payload'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import { adminOnly } from '@/access/adminOnly'

export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: 'Tag',
    plural: 'Tags',
  },
  access: {
    read: adminOrPublishedStatus,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
    unlock: adminOnly,
    readVersions: adminOnly,
  },
  admin: {
    group: 'Meta',
    useAsTitle: 'title',
    defaultColumns: ['title'],
    description: 'Defines flexible keywords used to label content, enabling discovery, filtering, and contextual grouping without rigid structure.',
    hidden: true,
    pagination: {
      defaultLimit: 10,
      limits: [10, 20, 50],
    }
  },
  defaultPopulate: {
    title: true
  },
  fields: [
    {
      label: 'Title',
      name: 'title',
      type: 'text',
      minLength: 5,
      maxLength: 100,
      required: false,
      unique: true,
      index: false,
      admin: {
        description: 'Identifiable item name/title.',
        placeholder: 'Add a simple title'
      },
    }
  ],
}
