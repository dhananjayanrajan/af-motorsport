// FILE: src/collections/Competition/Sessions/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'

export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.format,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'segment',
              dictionary: dictionary.tabs.traits.fields.format.fields,
              width: 2,
              flags: ['advanced'],
            }),
            numberFieldFactory({
              name: 'duration',
              dictionary: dictionary.tabs.traits.fields.format.fields,
              width: 2,
              flags: ['advanced'],
            }),
            numberFieldFactory({
              name: 'interval',
              dictionary: dictionary.tabs.traits.fields.format.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'specification',
              dictionary: dictionary.tabs.traits.fields.format.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.constraints,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'type',
              relationTo: 'classifications',
              dictionary: dictionary.tabs.traits.fields.constraints.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'limit',
              dictionary: dictionary.tabs.traits.fields.constraints.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'unit',
              dictionary: dictionary.tabs.traits.fields.constraints.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.parameters,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'parameter',
              relationTo: 'classifications',
              dictionary: dictionary.tabs.traits.fields.parameters.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'value',
              dictionary: dictionary.tabs.traits.fields.parameters.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'unit',
              dictionary: dictionary.tabs.traits.fields.parameters.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      true
    )
  ),
  advanced(
    relationshipFieldFactory({
      name: 'specifications',
      relationTo: 'specifications',
      dictionary: dictionary.tabs.traits.fields,
      width: 1,
      flags: ['hasMany', 'advanced'],
    }),
  )
]
