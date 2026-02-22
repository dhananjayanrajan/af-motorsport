import type { Field } from 'payload';
import { dictionary } from '../sources/dictionary';
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField';
import { advanced } from '@/fields/factories/toggles/advanced';

export const detailsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'parent',
          relationTo: 'categories',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: [],
        }),
      ],
    }
  ),
];