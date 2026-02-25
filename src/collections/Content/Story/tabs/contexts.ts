// FILE: src/collections/Content/Stories/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const contextsFields: Field[] = [
  advanced(
    relationshipFieldFactory({
      name: 'highlights',
      relationTo: 'highlights',
      dictionary: dictionary.tabs.contexts.fields,
      width: 1,
      flags: ['hasMany', 'advanced'],
    }),
  ),
  advanced(
    relationshipFieldFactory({
      name: 'incidents',
      relationTo: 'incidents',
      dictionary: dictionary.tabs.contexts.fields,
      width: 1,
      flags: ['hasMany', 'advanced'],
    }),
  )
]
