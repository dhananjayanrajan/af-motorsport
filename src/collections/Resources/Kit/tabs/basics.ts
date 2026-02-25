// FILE: src/collections/Resources/Kits/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import { advanced } from '@/fields/factories/toggles/advanced'
import { KIT_PURPOSE_APPLICATION } from '../sources/constants'

export const basicsFields: Field[] = [
  advanced(
    textareaFieldFactory({
      name: 'description',
      dictionary: dictionary.tabs.basics.fields,
      width: 1,
      flags: ['localized', 'index', 'advanced'],
    }),
  ),
  advanced(
    groupFactory(
      dictionary.tabs.basics.fields.purpose,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'application',
              options: KIT_PURPOSE_APPLICATION,
              dictionary: dictionary.tabs.basics.fields.purpose.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'context',
              dictionary: dictionary.tabs.basics.fields.purpose.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'conditions',
              dictionary: dictionary.tabs.basics.fields.purpose.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
]
