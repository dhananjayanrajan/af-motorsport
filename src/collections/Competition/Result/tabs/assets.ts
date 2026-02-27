// FILE: src/collections/Competition/Results/tabs/assets.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const assetsFields: Field[] = [
  advanced(
    relationshipFieldFactory({
      name: 'visualization',
      relationTo: 'visualizations',
      dictionary: dictionary.tabs.assets.fields,
      width: 1,
      flags: ['advanced'],
    }),
  )
]
