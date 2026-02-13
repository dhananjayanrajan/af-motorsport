// collections/attributes/locations/traits.ts
import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import {
  LOCATION_CLIMATE,
  LOCATION_APPROACH,
  LOCATION_FACILITIES,
  LOCATION_CAPACITY,
} from './constants'

export const traitsFields: Field[] = [
  groupFactory(
    dictionary.tabs.traits.geography,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'terrain',
            dictionary: dictionary.tabs.traits.geography.fields,
            width: 3,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'climate',
            options: LOCATION_CLIMATE,
            dictionary: dictionary.tabs.traits.geography.fields,
            width: 3,
            flags: ['advanced'],
          }),
          textFieldFactory({
            name: 'features',
            dictionary: dictionary.tabs.traits.geography.fields,
            width: 3,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    true
  ),
  groupFactory(
    dictionary.tabs.traits.infrastructure,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'transport',
            dictionary: dictionary.tabs.traits.infrastructure.fields,
            width: 3,
            flags: ['advanced'],
          }),
          textFieldFactory({
            name: 'facilities',
            dictionary: dictionary.tabs.traits.infrastructure.fields,
            width: 3,
            flags: ['advanced'],
          }),
          textFieldFactory({
            name: 'amenities',
            dictionary: dictionary.tabs.traits.infrastructure.fields,
            width: 3,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    true
  ),
  groupFactory(
    dictionary.tabs.traits.accessibility,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          selectFieldFactory({
            name: 'approach',
            options: LOCATION_APPROACH,
            dictionary: dictionary.tabs.traits.accessibility.fields,
            width: 3,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'facilities',
            options: LOCATION_FACILITIES,
            dictionary: dictionary.tabs.traits.accessibility.fields,
            width: 3,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'capacity',
            options: LOCATION_CAPACITY,
            dictionary: dictionary.tabs.traits.accessibility.fields,
            width: 3,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    true
  ),
]
