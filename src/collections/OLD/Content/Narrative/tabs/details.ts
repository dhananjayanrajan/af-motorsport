// FILE: src/collections/Content/Narratives/tabs/details.ts
import { groupFactory } from '@/fields/factories/blueprint'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'
import type { Field } from 'payload'
import {
  NARRATIVE_SCOPE_DEPTH,
  NARRATIVE_SCOPE_SCALE,
  NARRATIVE_SCOPE_SIGNIFICANCE,
} from '../sources/constants'
import { dictionary } from '../sources/dictionary'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      richtextFieldFactory({
        name: 'content',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['localized'],
      }),
    ],
  },
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.scope,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'significance',
              options: NARRATIVE_SCOPE_SIGNIFICANCE,
              dictionary: dictionary.tabs.details.fields.scope.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'scale',
              options: NARRATIVE_SCOPE_SCALE,
              dictionary: dictionary.tabs.details.fields.scope.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'depth',
              options: NARRATIVE_SCOPE_DEPTH,
              dictionary: dictionary.tabs.details.fields.scope.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'level',
              dictionary: dictionary.tabs.details.fields.scope.fields,
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
      dictionary.tabs.details.fields.context,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'background',
              dictionary: dictionary.tabs.details.fields.context.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'perspective',
              dictionary: dictionary.tabs.details.fields.context.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'purpose',
              dictionary: dictionary.tabs.details.fields.context.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  )
]
