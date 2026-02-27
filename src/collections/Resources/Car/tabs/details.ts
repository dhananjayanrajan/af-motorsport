// FILE: src/collections/Resources/Cars/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { CAR_STATUS } from '../sources/constants'
import { advanced } from '@/fields/factories/toggles/advanced'
import { radioFieldFactory } from '@/fields/factories/fields/radioField'

export const detailsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        radioFieldFactory({
          name: 'status',
          options: CAR_STATUS,
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['advanced'],
        }),
        relationshipFieldFactory({
          name: 'classifications',
          relationTo: 'classifications',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    },
  )
]
