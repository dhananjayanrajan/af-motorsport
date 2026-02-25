// FILE: src/collections/Attributes/Skills/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { SKILL_METHOD_TYPE, SKILL_DEPENDENCY_TYPE } from '../sources/constants'

export const detailsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        textareaFieldFactory({
          name: 'definition',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['localized', 'advanced'],
        }),
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
  ),
  advanced(
    groupFactory(
      dictionary.tabs.details.methods,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'method',
              dictionary: dictionary.tabs.details.methods.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'type',
              options: SKILL_METHOD_TYPE,
              dictionary: dictionary.tabs.details.methods.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textareaFieldFactory({
              name: 'description',
              dictionary: dictionary.tabs.details.methods.fields,
              width: 1,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      true
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.details.dependencies,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'skill',
              relationTo: 'skills',
              dictionary: dictionary.tabs.details.dependencies.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'type',
              options: SKILL_DEPENDENCY_TYPE,
              dictionary: dictionary.tabs.details.dependencies.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      true
    )
  )
]
