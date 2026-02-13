import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { ENTRY_ROLE } from './constants'

export const traitsFields: Field[] = [
  {
    type: 'row',
    fields: [
      selectFieldFactory({
        name: 'role',
        options: ENTRY_ROLE,
        dictionary: dictionary.tabs.traits.fields,
        width: 1,
        flags: ['advanced'],
      }),
    ],
  },
  groupFactory(
    dictionary.tabs.traits.fields.eligibility,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'license',
            dictionary: dictionary.tabs.traits.fields.eligibility.fields,
            width: 3,
            flags: [],
          }),
          textFieldFactory({
            name: 'waiver',
            dictionary: dictionary.tabs.traits.fields.eligibility.fields,
            width: 3,
            flags: ['advanced'],
          }),
          textFieldFactory({
            name: 'restriction',
            dictionary: dictionary.tabs.traits.fields.eligibility.fields,
            width: 3,
            flags: [],
          }),
        ],
      },
    ],
    true
  ),
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'preferences',
        relationTo: 'preferences',
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
      relationshipFieldFactory({
        name: 'specifications',
        relationTo: 'specifications',
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
