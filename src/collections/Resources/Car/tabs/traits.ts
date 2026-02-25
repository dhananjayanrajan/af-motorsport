// FILE: src/collections/Resources/Cars/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const traitsFields: Field[] = [
  advanced(
    relationshipFieldFactory({
      name: 'features',
      relationTo: 'features',
      dictionary: dictionary.tabs.traits.fields,
      width: 1,
      flags: ['hasMany', 'advanced'],
    }),
  ),
  advanced(
    relationshipFieldFactory({
      name: 'specifications',
      relationTo: 'specifications',
      dictionary: dictionary.tabs.traits.fields,
      width: 1,
      flags: ['hasMany', 'advanced'],
    }),
  ),
]
