// FILE: src/collections/Resources/Kits/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import { advanced } from '@/fields/factories/toggles/advanced'
import {
  KIT_MATERIAL_TYPES,
  KIT_FUNCTION_PERFORMANCE,
  KIT_FUNCTION_DURABILITY,
  KIT_FUNCTION_COMFORT,
  KIT_COMPOSITION_CONSTRUCTION,
  KIT_COMPOSITION_ASSEMBLY,
  KIT_COMPOSITION_FINISH,
} from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.composition,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'construction',
              options: KIT_COMPOSITION_CONSTRUCTION,
              dictionary: dictionary.tabs.traits.fields.composition.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'assembly',
              options: KIT_COMPOSITION_ASSEMBLY,
              dictionary: dictionary.tabs.traits.fields.composition.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'finish',
              options: KIT_COMPOSITION_FINISH,
              dictionary: dictionary.tabs.traits.fields.composition.fields,
              width: 3,
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
      dictionary.tabs.traits.fields.functionality,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'performance',
              options: KIT_FUNCTION_PERFORMANCE,
              dictionary: dictionary.tabs.traits.fields.functionality.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'durability',
              options: KIT_FUNCTION_DURABILITY,
              dictionary: dictionary.tabs.traits.fields.functionality.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'comfort',
              options: KIT_FUNCTION_COMFORT,
              dictionary: dictionary.tabs.traits.fields.functionality.fields,
              width: 3,
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
      dictionary.tabs.traits.fields.materials,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'type',
              options: KIT_MATERIAL_TYPES,
              dictionary: dictionary.tabs.traits.fields.materials.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'specification',
              dictionary: dictionary.tabs.traits.fields.materials.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'origin',
              dictionary: dictionary.tabs.traits.fields.materials.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        }
      ],
      true
    )
  ),
]
