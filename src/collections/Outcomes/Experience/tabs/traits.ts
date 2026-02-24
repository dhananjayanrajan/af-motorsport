// FILE: src/collections/Outcomes/Experiences/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { EXPERIENCE_SKILL_PROFICIENCY } from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    {
      name: 'skills',
      type: 'array',
      label: dictionary.tabs.traits.fields.skills.label,
      admin: {
        description: dictionary.tabs.traits.fields.skills.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'skill',
              relationTo: 'skills',
              dictionary: dictionary.tabs.traits.fields.skills.fields,
              width: 2,
              flags: [],
            }),
            selectFieldFactory({
              name: 'proficiency',
              options: EXPERIENCE_SKILL_PROFICIENCY,
              dictionary: dictionary.tabs.traits.fields.skills.fields,
              width: 2,
              flags: [],
            }),
          ],
        },
      ],
    }
  ),
]
