// FILE: src/collections/Attributes/Categories/tabs/essentials.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const essentialFields: Field[] = [
  {
    type: 'group',
    fields: [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'name',
            dictionary: dictionary.essential,
            width: 2,
            flags: ['localized', 'index'],
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'array',
            label: 'Types',
            admin: {
              description: 'Category types with label and value pairs',
            },
            fields: [
              {
                type: 'row',
                fields: [
                  textFieldFactory({
                    name: 'label',
                    dictionary: dictionary.essential.fields,
                    width: 1,
                    flags: ['localized'],
                  }),
                  textFieldFactory({
                    name: 'value',
                    dictionary: dictionary.essential.fields,
                    width: 1,
                    flags: [],
                  }),
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
