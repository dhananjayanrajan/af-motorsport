// FILE: src/collections/Resources/Cars/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { CAR_STATUS } from '../sources/constants'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        selectFieldFactory({
          name: 'status',
          options: CAR_STATUS,
          dictionary: dictionary.tabs.details.fields,
          width: 2,
          flags: ['advanced'],
        }),
        relationshipFieldFactory({
          name: 'classifications',
          relationTo: 'classifications',
          dictionary: dictionary.tabs.details.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    },
  )
]
