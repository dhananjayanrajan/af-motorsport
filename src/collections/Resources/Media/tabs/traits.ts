// FILE: src/collections/Resources/Media/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'

export const traitsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'tone',
        relationTo: 'tones',
        dictionary: dictionary.tabs.traits.fields,
        width: 1,
        flags: ['advanced'],
      }),
    ],
  },
  {
    name: 'sources',
    type: 'array',
    label: dictionary.tabs.traits.fields.sources.label,
    admin: {
      description: dictionary.tabs.traits.fields.sources.description,
      condition: (data: any) => data?.toggle === 'advanced',
    },
    fields: [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'url',
            dictionary: dictionary.tabs.traits.fields.sources.fields,
            width: 2,
            flags: ['required', 'advanced'],
          }),
          selectFieldFactory({
            name: 'type',
            options: ['Original', 'Cropped', 'Edited', 'Compressed'],
            dictionary: dictionary.tabs.traits.fields.sources.fields,
            width: 2,
            flags: ['advanced'],
          }),
        ],
      },
    ],
  },
]
