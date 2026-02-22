// FILE: src/collections/Attributes/Skills/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { SKILL_METHOD_TYPE, SKILL_DEPENDENCY_TYPE } from '../sources/constants'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textareaFieldFactory({
        name: 'definition',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['localized', 'advanced'],
      }),
    ],
  },
  advanced(
    {
      name: 'methods',
      type: 'array',
      label: dictionary.tabs.details.fields.methods.label,
      admin: {
        description: dictionary.tabs.details.fields.methods.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'method',
              dictionary: dictionary.tabs.details.fields.methods.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'type',
              options: SKILL_METHOD_TYPE,
              dictionary: dictionary.tabs.details.fields.methods.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textareaFieldFactory({
              name: 'description',
              dictionary: dictionary.tabs.details.fields.methods.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
    }
  ),
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'features',
        relationTo: 'features',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
      relationshipFieldFactory({
        name: 'specifications',
        relationTo: 'specifications',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
  advanced(
    {
      name: 'dependencies',
      type: 'array',
      label: dictionary.tabs.details.fields.dependencies.label,
      admin: {
        description: dictionary.tabs.details.fields.dependencies.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'skill',
              relationTo: 'skills',
              dictionary: dictionary.tabs.details.fields.dependencies.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'type',
              options: SKILL_DEPENDENCY_TYPE,
              dictionary: dictionary.tabs.details.fields.dependencies.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
    }
  ),
]
