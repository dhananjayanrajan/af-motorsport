// FILE: src/collections/Attributes/Channels/tabs/details.ts
import type { Field } from 'payload'
import { PROTOCOL_FORMAT, PROTOCOL_SCHEME } from '../sources/constants'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  groupFactory(
    dictionary.tabs.details.identifier,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'label',
            dictionary: dictionary.tabs.details.identifier.fields,
            width: 2,
            flags: ['localized', 'index'],
          }),
          textFieldFactory({
            name: 'title',
            dictionary: dictionary.tabs.details.identifier.fields,
            width: 2,
            flags: ['localized', 'index'],
          }),
        ],
      },
    ],
    false
  ),
  advanced(
    groupFactory(
      dictionary.tabs.details.address,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'value',
              dictionary: dictionary.tabs.details.address.fields,
              width: 3,
              flags: ['localized', 'advanced'],
            }),
            textFieldFactory({
              name: 'locator',
              dictionary: dictionary.tabs.details.address.fields,
              width: 3,
              flags: ['localized', 'advanced'],
            }),
            textFieldFactory({
              name: 'endpoint',
              dictionary: dictionary.tabs.details.address.fields,
              width: 3,
              flags: ['localized', 'advanced'],
            }),
          ],
        },
      ],
      false
    ),
  ),
  advanced(
    groupFactory(
      dictionary.tabs.details.protocol,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'format',
              options: PROTOCOL_FORMAT,
              dictionary: dictionary.tabs.details.protocol.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'scheme',
              options: PROTOCOL_SCHEME,
              dictionary: dictionary.tabs.details.protocol.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textareaFieldFactory({
              name: 'specification',
              dictionary: dictionary.tabs.details.protocol.fields,
              width: 1,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  )
]
