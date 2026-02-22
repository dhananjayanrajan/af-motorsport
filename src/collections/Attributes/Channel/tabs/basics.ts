// FILE: src/collections/Attributes/Channels/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { PROTOCOL_FORMAT, PROTOCOL_SCHEME } from '../sources/constants'

export const basicsFields: Field[] = [
  // Identifier Group
  groupFactory(
    dictionary.tabs.basics.identifier,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'label',
            dictionary: dictionary.tabs.basics.identifier.fields,
            width: 2,
            flags: ['localized'],
          }),
          textFieldFactory({
            name: 'title',
            dictionary: dictionary.tabs.basics.identifier.fields,
            width: 2,
            flags: ['localized'],
          }),
        ],
      },
    ],
    false
  ),

  // Address Group
  groupFactory(
    dictionary.tabs.basics.address,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'value',
            dictionary: dictionary.tabs.basics.address.fields,
            width: 2,
            flags: ['localized'],
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'locator',
            dictionary: dictionary.tabs.basics.address.fields,
            width: 2,
            flags: ['localized', 'advanced'],
          }),
          textFieldFactory({
            name: 'endpoint',
            dictionary: dictionary.tabs.basics.address.fields,
            width: 2,
            flags: ['localized', 'advanced'],
          }),
        ],
      },
    ],
    false
  ),

  // Protocol Group
  groupFactory(
    dictionary.tabs.basics.protocol,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          selectFieldFactory({
            name: 'format',
            options: PROTOCOL_FORMAT,
            dictionary: dictionary.tabs.basics.protocol.fields,
            width: 2,
            flags: ['required'],
          }),
          selectFieldFactory({
            name: 'scheme',
            options: PROTOCOL_SCHEME,
            dictionary: dictionary.tabs.basics.protocol.fields,
            width: 2,
            flags: ['advanced'],
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'specification',
            dictionary: dictionary.tabs.basics.protocol.fields,
            width: 4,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    false
  ),
]