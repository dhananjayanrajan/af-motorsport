// FILE: src/collections/Resources/Kits/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import { advanced } from '@/fields/factories/toggles/advanced'
import {
  KIT_COMPOSITION_CONSTRUCTION,
  KIT_COMPOSITION_ASSEMBLY,
  KIT_COMPOSITION_FINISH,
  KIT_MATERIAL_TYPES,
  KIT_APPEARANCE_BRANDING,
  KIT_APPEARANCE_STYLE,
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
    {
      name: 'materials',
      type: 'array',
      label: dictionary.tabs.traits.fields.materials.label,
      admin: {
        description: dictionary.tabs.traits.fields.materials.description,
      },
      fields: [
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
        },
      ],
    }
  ),
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.appearance,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'colors',
              dictionary: dictionary.tabs.traits.fields.appearance.fields,
              width: 1,
              flags: ['advanced'],
            }),
          ],
        },
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'branding',
              options: KIT_APPEARANCE_BRANDING,
              dictionary: dictionary.tabs.traits.fields.appearance.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'style',
              options: KIT_APPEARANCE_STYLE,
              dictionary: dictionary.tabs.traits.fields.appearance.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
]
