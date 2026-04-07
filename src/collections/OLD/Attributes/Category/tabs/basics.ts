// FILE: src/collections/Attributes/Category/tabs/basics.ts
import type { Field } from 'payload';
import { dictionary } from '../sources/dictionary';
import { advanced } from '@/fields/factories/toggles/advanced';
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField';

export const basicsFields: Field[] = [
  advanced(
    textareaFieldFactory({
      name: 'description',
      dictionary: dictionary.tabs.basics.fields,
      width: 1,
      flags: ['localized', 'advanced'],
    }),
  )
];
