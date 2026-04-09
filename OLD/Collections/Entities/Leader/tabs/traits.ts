// FILE: src/collections/Entities/Leaders/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'
import { LEADER_GENDER } from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.identity,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'gender',
              options: LEADER_GENDER,
              dictionary: dictionary.tabs.traits.fields.identity.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'pronouns',
              dictionary: dictionary.tabs.traits.fields.identity.fields,
              width: 2,
              flags: ['advanced'],
            }),
            numberFieldFactory({
              name: 'age',
              dictionary: dictionary.tabs.traits.fields.identity.fields,
              width: 2,
              min: 18,
              max: 100,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'nationality',
              dictionary: dictionary.tabs.traits.fields.identity.fields,
              width: 2,
              flags: ['index', 'advanced'],
            }),
          ],
        },
      ],
      false
    ),
  ),
  advanced(
    relationshipFieldFactory({
      name: 'personalities',
      relationTo: 'features',
      dictionary: dictionary.tabs.traits.fields,
      width: 1,
      flags: ['hasMany'],
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
