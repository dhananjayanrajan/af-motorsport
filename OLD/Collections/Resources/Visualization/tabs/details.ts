// FILE: src/collections/Resources/Visualizations/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      uploadFieldFactory({
        name: 'designs',
        relationTo: 'media',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['required', 'hasMany'],
      })
    ],
  }
]
