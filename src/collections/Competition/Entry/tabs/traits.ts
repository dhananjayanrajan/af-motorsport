// FILE: src/collections/Competition/Entries/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { ENTRY_ROLE } from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    selectFieldFactory({
      name: 'role',
      options: ENTRY_ROLE,
      dictionary: dictionary.tabs.traits.fields,
      width: 1,
      flags: ['advanced'],
    }),
  ),
  advanced(
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
              flags: ['advanced'],
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
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  )
]
