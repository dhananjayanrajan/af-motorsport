import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import { adminOnly } from '@/access/adminOnly'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Category',
    plural: 'Categories',
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
    defaultColumns: ['title', 'subtitle'],
    description: 'Defines broad thematic groupings used to organize content into meaningful sections, helping users and administrators navigate and structure information logically.',
    pagination: {
      defaultLimit: 10,
      limits: [10, 20, 50],
    }
  },
  lockDocuments: {
    duration: 600,
  },
  defaultPopulate: {
    title: true,
    slug: true
  },
  folders: true,
  trash: true,
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
        description: 'Identifiable record name/title.',
        placeholder: 'Add a simple title'
      },
    },
    {
      label: 'Subtitle',
      name: 'subtitle',
      type: 'text',
      minLength: 5,
      maxLength: 100,
      required: false,
      unique: false,
      index: false,
      admin: {
        description: 'Short tagline or secondary description.',
        placeholder: 'Add a simple subtitle'
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          name: 'details',
          description: 'Provides the essential identity of the entity, explaining what it is and its primary purpose in the system. Helps the admin quickly understand the nature of the record before managing any other properties.',
          fields: [
            {
              label: '',
              type: 'group',
              fields: [
                {
                  label: 'Summary',
                  name: 'summary',
                  type: 'textarea',
                  required: false,
                  maxLength: 500,
                  minLength: 10,
                  admin: {
                    description: 'Optional short summary to appear in lists & previews.',
                    placeholder: 'Short one or two sentence summary...',
                  },
                }
              ]
            },
          ],
        },
        {
          label: 'Attributes',
          name: 'attributes',
          description: 'Holds optional settings or descriptive traits that slightly change how the entity behaves or appears. Provides a place to fine-tune the entity without changing its core purpose.',
          fields: [
            {
              label: '',
              type: 'group',
              admin: {
                hideGutter: true
              },
              fields: [
                {
                  label: 'Does this have any questions?',
                  name: 'questions_visibility',
                  type: 'checkbox',
                  required: false,
                  defaultValue: false,
                  localized: false,
                  index: false,
                  admin: {
                    description: 'Require questions visibility.'
                  },
                },
                {
                  name: 'questions',
                  label: 'Frequently asked questions',
                  labels: {
                    singular: 'Question',
                    plural: 'Questions'
                  },
                  type: 'array',
                  minRows: 1,
                  maxRows: 50,
                  required: false,
                  admin: {
                    description: 'Defines commonly asked or context-specific questions presented to inform, guide, or clarify user understanding.',
                    isSortable: true,
                    components: {},
                    condition: (data) => data?.attributes?.questions_visibility === true,
                  },
                  fields: [
                    {
                      label: 'Question',
                      name: 'question',
                      type: 'text',
                      required: false,
                      minLength: 5,
                      maxLength: 200,
                      admin: {
                        placeholder: 'Add a question for the record',
                        description: 'Optional question to add more context to the record.',
                        autoComplete: 'off',
                      }
                    },
                    {
                      label: 'Answer',
                      name: 'answer',
                      type: 'text',
                      required: false,
                      minLength: 5,
                      maxLength: 200,
                      admin: {
                        placeholder: 'Add a answer for the question',
                        description: 'Provide a clear answer for the question.',
                        autoComplete: 'off',
                      }
                    },
                    {
                      label: 'Optional Media',
                      name: 'media',
                      type: 'upload',
                      relationTo: 'media',
                      required: false,
                      localized: false,
                      displayPreview: true,
                      hasMany: true,
                      admin: {
                        description: 'Media content related to the record. (Images, Videos, Audios, Documents, Files, etc.,)'
                      }
                    },
                  ],
                }
              ]
            }
          ]
        },
        {
          label: 'Assets',
          name: 'assets',
          description: 'Defines the media and files that belong to an entity, such as images, audio, video, or documents, enabling admins to attach and manage supporting materials.',
          fields: [
            {
              label: '',
              type: 'group',
              admin: {
                hideGutter: true
              },
              fields: [
                {
                  label: 'Thumbnail',
                  name: 'thumbnail',
                  type: 'upload',
                  relationTo: 'media',
                  required: false,
                  localized: false,
                  admin: {
                    description: 'Small preview image used in lists and cards.'
                  },
                  filterOptions: {
                    mimeType: { contains: 'image' },
                  },
                }
              ]
            }
          ],
        },
        {
          label: 'SEO',
          name: 'seo',
          description: 'Controls search and share information like titles, descriptions and preview images. Helps the admin shape how the entity appears on Google and social platforms.',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
              hasGenerateFn: true,
            }),
            MetaDescriptionField({
              hasGenerateFn: true,
            }),
            PreviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              hasGenerateFn: true,
            }),
          ],
        },
      ]
    },
    slugField(),
    {
      label: '',
      type: 'group',
      admin: {
        position: 'sidebar'
      },
      fields: [
        {
          label: 'Tags',
          name: 'tags',
          type: 'relationship',
          relationTo: 'tags',
          minRows: 1,
          maxRows: 1,
          maxDepth: 20,
          hasMany: true,
          required: false,
          unique: true,
          index: true,
          admin: {
            description: 'Associated tags for this item',
            placeholder: 'Create/Select a tag',
            appearance: 'select',
            isSortable: true,
            allowCreate: true,
            allowEdit: true,
          },
        }
      ]
    },
    {
      label: 'Visibility',
      name: 'visibility',
      type: 'group',
      admin: {
        position: 'sidebar',
        description: 'Controls who can see this record and under what conditions it becomes visible.'
      },
      fields: [
        {
          label: 'Is this published?',
          name: 'check_publish',
          type: 'checkbox',
          required: false,
          localized: false,
          index: false,
          defaultValue: false,
          admin: {
            description: 'Publish as a live record.'
          },
        },
        {
          label: 'Is this featured?',
          name: 'check_featured',
          type: 'checkbox',
          required: false,
          localized: false,
          index: false,
          defaultValue: false,
          admin: {
            description: 'Highlights as a featured record.'
          },
        },
        {
          label: 'Is this pinned?',
          name: 'check_pinned',
          type: 'checkbox',
          required: false,
          localized: false,
          index: false,
          defaultValue: false,
          admin: {
            description: 'Pins the record on the top.'
          },
        },
      ]
    },
  ],
}
