import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import { IMPACT_SCALE, IMPACT_DEPTH } from './constants'

export const basicsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textareaFieldFactory({
        name: 'description',
        dictionary: dictionary.tabs.basics.fields,
        width: 1,
        flags: ['localized'],
      }),
    ],
  },
  groupFactory(
    dictionary.tabs.basics.fields.scope,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'significance',
            dictionary: dictionary.tabs.basics.fields.scope.fields,
            width: 3,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'scale',
            options: IMPACT_SCALE,
            dictionary: dictionary.tabs.basics.fields.scope.fields,
            width: 3,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'depth',
            options: IMPACT_DEPTH,
            dictionary: dictionary.tabs.basics.fields.scope.fields,
            width: 3,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    false
  ),
]
