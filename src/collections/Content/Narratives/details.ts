import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { groupFactory } from '@/fields/factories/blueprint'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import {
  NARRATIVE_SCOPE_SIGNIFICANCE,
  NARRATIVE_SCOPE_SCALE,
  NARRATIVE_SCOPE_DEPTH,
  NARRATIVE_TIMELINE_TYPE,
} from './constants'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      richtextFieldFactory({
        name: 'content',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['required', 'localized'],
      }),
    ],
  },
  groupFactory(
    dictionary.tabs.details.fields.scope,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          selectFieldFactory({
            name: 'significance',
            options: NARRATIVE_SCOPE_SIGNIFICANCE,
            dictionary: dictionary.tabs.details.fields.scope.fields,
            width: 2,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'scale',
            options: NARRATIVE_SCOPE_SCALE,
            dictionary: dictionary.tabs.details.fields.scope.fields,
            width: 2,
            flags: ['advanced'],
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          selectFieldFactory({
            name: 'depth',
            options: NARRATIVE_SCOPE_DEPTH,
            dictionary: dictionary.tabs.details.fields.scope.fields,
            width: 2,
            flags: ['advanced'],
          }),
          textFieldFactory({
            name: 'level',
            dictionary: dictionary.tabs.details.fields.scope.fields,
            width: 2,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    false
  ),
  groupFactory(
    dictionary.tabs.details.fields.context,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'background',
            dictionary: dictionary.tabs.details.fields.context.fields,
            width: 3,
            flags: ['advanced'],
          }),
          textFieldFactory({
            name: 'perspective',
            dictionary: dictionary.tabs.details.fields.context.fields,
            width: 3,
            flags: ['advanced'],
          }),
          textFieldFactory({
            name: 'purpose',
            dictionary: dictionary.tabs.details.fields.context.fields,
            width: 3,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    false
  ),
  {
    name: 'timeline',
    type: 'array',
    label: dictionary.tabs.details.fields.timeline.label,
    admin: {
      description: dictionary.tabs.details.fields.timeline.description,
      condition: (data: any) => data?.toggle === 'advanced',
    },
    fields: [
      {
        type: 'row',
        fields: [
          dateFieldFactory({
            name: 'date',
            dictionary: dictionary.tabs.details.fields.timeline.fields,
            width: 2,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'type',
            options: NARRATIVE_TIMELINE_TYPE,
            dictionary: dictionary.tabs.details.fields.timeline.fields,
            width: 2,
            flags: ['advanced'],
          }),
        ],
      },
    ],
  },
]
