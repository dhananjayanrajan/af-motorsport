// FILE: src/collections/Operations/Meetups/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const contextsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'hosts',
        relationTo: ['organizations', 'leaders', 'individuals'],
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'attendees',
        relationTo: ['drivers', 'members', 'leaders', 'individuals', 'organizations'],
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: ['hasMany'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'schedules',
        relationTo: 'schedules',
        dictionary: dictionary.tabs.contexts.fields,
        width: 3,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'references',
        relationTo: ['initiatives', 'celebrations'],
        dictionary: dictionary.tabs.contexts.fields,
        width: 3,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'notes',
        relationTo: 'notes',
        dictionary: dictionary.tabs.contexts.fields,
        width: 3,
        flags: ['hasMany'],
      }),
    ],
  },
]
