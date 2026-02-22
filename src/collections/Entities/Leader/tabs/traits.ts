// FILE: src/collections/Entities/Leaders/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const traitsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'channels',
        relationTo: 'channels',
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
      relationshipFieldFactory({
        name: 'personalities',
        relationTo: 'features',
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: ['hasMany'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'achievements',
        relationTo: 'experiences',
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'strategies',
        relationTo: 'strategies',
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: ['hasMany'],
      }),
    ],
  },
]
