import { collectionFactory, tabFactory, groupFactory } from '@/fields/factories/blueprint'
import { dictionary } from './dictionary'
import { essentialFields } from './essentials'
import { skillsFields } from './tabs/traits/skills'

export const Drivers = collectionFactory(
  {
    slug: 'drivers',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    admin: {
      group: 'Team',
      useAsTitle: 'lastName',
      defaultColumns: ['lastName', 'firstName', 'updatedAt'],
    },
  },
  essentialFields,
  [
    tabFactory('basics', dictionary.host, []),
    tabFactory('details', dictionary.host, []),
    tabFactory('traits', dictionary.host, [
      groupFactory(dictionary.tabs.traits.skills, dictionary.host, skillsFields, true),
    ]),
    tabFactory('metrics', dictionary.host, []),
    tabFactory('assets', dictionary.host, []),
    tabFactory('contexts', dictionary.host, []),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)