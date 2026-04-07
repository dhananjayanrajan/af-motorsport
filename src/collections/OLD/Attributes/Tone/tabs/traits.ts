// FILE: src/collections/Attributes/Tones/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import {
  TONE_SCALE,
  TONE_DEPTH,
  TONE_QUALITY,
  TONE_INTENSITY,
  TONE_MOOD,
  TONE_QUALITY_SCALE,
} from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.traits.scope,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'significance',
              dictionary: dictionary.tabs.traits.scope.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'scale',
              options: TONE_SCALE,
              dictionary: dictionary.tabs.traits.scope.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'depth',
              options: TONE_DEPTH,
              dictionary: dictionary.tabs.traits.scope.fields,
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
      dictionary.tabs.traits.qualities,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'quality',
              options: TONE_QUALITY,
              dictionary: dictionary.tabs.traits.qualities.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'intensity',
              options: TONE_INTENSITY,
              dictionary: dictionary.tabs.traits.qualities.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'mood',
              options: TONE_MOOD,
              dictionary: dictionary.tabs.traits.qualities.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'scale',
              options: TONE_QUALITY_SCALE,
              dictionary: dictionary.tabs.traits.qualities.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ]
        }
      ],
      true
    )
  )
]
