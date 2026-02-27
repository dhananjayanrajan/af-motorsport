// FILE: src/collections/Attributes/Skills/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import {
  NATURE_COMPLEXITY,
  NATURE_VISIBILITY,
  NATURE_IMPACT,
  SKILL_METHOD_TYPE,
  SKILL_DEPENDENCY_TYPE
} from '../sources/constants'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'


export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.traits.nature,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'complexity',
              options: NATURE_COMPLEXITY,
              dictionary: dictionary.tabs.traits.nature.fields,
              width: 3,
              flags: ['index', 'advanced'],
            }),
            selectFieldFactory({
              name: 'visibility',
              options: NATURE_VISIBILITY,
              dictionary: dictionary.tabs.traits.nature.fields,
              width: 3,
              flags: ['index', 'advanced'],
            }),
            selectFieldFactory({
              name: 'impact',
              options: NATURE_IMPACT,
              dictionary: dictionary.tabs.traits.nature.fields,
              width: 3,
              flags: ['index', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.traits.methods,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'method',
              dictionary: dictionary.tabs.traits.methods.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'type',
              options: SKILL_METHOD_TYPE,
              dictionary: dictionary.tabs.traits.methods.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textareaFieldFactory({
              name: 'description',
              dictionary: dictionary.tabs.traits.methods.fields,
              width: 1,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      true
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.traits.dependencies,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'skill',
              relationTo: 'skills',
              dictionary: dictionary.tabs.traits.dependencies.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'type',
              options: SKILL_DEPENDENCY_TYPE,
              dictionary: dictionary.tabs.traits.dependencies.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      true
    )
  )
]
