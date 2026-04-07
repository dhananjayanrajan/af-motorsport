// FILE: src/collections/Attributes/Category/tabs/details.ts
import type { Field } from 'payload';
import { dictionary } from '../sources/dictionary';
import { advanced } from '@/fields/factories/toggles/advanced';
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const detailsFields: Field[] = [
  advanced(
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
              dictionary: dictionary.tabs.details.fields.label,
              width: 1,
              flags: ['localized'],
            }),
            textFieldFactory({
              name: 'value',
              dictionary: dictionary.tabs.details.fields.value,
              width: 1,
              flags: [],
            }),
          ],
        },
      ],
    }
  ),
];
