// FILE: src/collections/Entities/Members/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { MEMBER_GENDER } from '../sources/constants'
import { groupFactory } from '@/fields/factories/blueprint'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'

export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.identity,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'gender',
              options: MEMBER_GENDER,
              dictionary: dictionary.tabs.details.fields.identity.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'pronouns',
              dictionary: dictionary.tabs.details.fields.identity.fields,
              width: 2,
              flags: ['advanced'],
            }),
            numberFieldFactory({
              name: 'age',
              dictionary: dictionary.tabs.details.fields.identity.fields,
              width: 2,
              min: 18,
              max: 100,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'nationality',
              dictionary: dictionary.tabs.details.fields.identity.fields,
              width: 2,
              flags: ['index', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    relationshipFieldFactory({
      name: 'personalities',
      relationTo: 'features',
      dictionary: dictionary.tabs.traits.fields,
      width: 1,
      flags: ['hasMany', 'advanced'],
    }),
  ),
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.communication,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'channels',
              relationTo: 'channels',
              dictionary: dictionary.tabs.traits.fields.communication.fields,
              width: 1,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
]
