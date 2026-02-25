// FILE: src/collections/Attributes/Locations/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const contextsFields: Field[] = [
  advanced(
    relationshipFieldFactory({
      name: 'entities',
      relationTo: ['organizations', 'individuals', 'leaders', 'drivers', 'members'],
      dictionary: dictionary.tabs.contexts.fields,
      width: 1,
      flags: ['hasMany', 'advanced'],
    }),
  )
]
