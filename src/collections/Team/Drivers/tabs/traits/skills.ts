// collections/team/drivers/tabs/traits/skills.ts
import type { Field } from 'payload'
import { dictionary } from '../../dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const skillsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textFieldFactory({
        name: 'name',
        dictionary,
        width: 2,
      }),
      textFieldFactory({
        name: 'level',
        dictionary,
        width: 3,
        flags: ['advanced'],
      }),
    ],
  },
]
