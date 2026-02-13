import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'narrative',
        relationTo: 'narratives',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: [],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      textareaFieldFactory({
        name: 'background',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['localized'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'parent',
        relationTo: 'organizations',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: [],
      }),
    ],
  },
  groupFactory(
    dictionary.tabs.details.fields.evolution,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          dateFieldFactory({
            name: 'founded',
            dictionary: dictionary.tabs.details.fields.evolution.fields,
            width: 2,
            flags: [],
          }),
          dateFieldFactory({
            name: 'merged',
            dictionary: dictionary.tabs.details.fields.evolution.fields,
            width: 2,
            flags: ['advanced'],
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          dateFieldFactory({
            name: 'rebranded',
            dictionary: dictionary.tabs.details.fields.evolution.fields,
            width: 2,
            flags: ['advanced'],
          }),
          dateFieldFactory({
            name: 'defunct',
            dictionary: dictionary.tabs.details.fields.evolution.fields,
            width: 2,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    false
  ),
]
