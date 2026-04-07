import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'

export const metricsFields: Field[] = [
  groupFactory(
    {
      name: 'quantifiers',
      label: dictionary.tabs.metrics.fields.quantifiers.label,
      entity: dictionary.tabs.metrics.fields.quantifiers.entity,
      description: dictionary.tabs.metrics.fields.quantifiers.description,
    },
    dictionary.host,
    [
      numberFieldFactory({
        name: 'laps',
        dictionary: dictionary.tabs.metrics.fields.quantifiers.fields,
        width: 2,
        flags: [],
        min: 0,
        max: 500,
        step: 1,
      }),
      numberFieldFactory({
        name: 'distance',
        dictionary: dictionary.tabs.metrics.fields.quantifiers.fields,
        width: 2,
        flags: [],
        min: 0,
        max: 1000,
        step: 0.1,
      }),
      numberFieldFactory({
        name: 'duration',
        dictionary: dictionary.tabs.metrics.fields.quantifiers.fields,
        width: 2,
        flags: [],
        min: 0,
        max: 720,
        step: 1,
      }),
      numberFieldFactory({
        name: 'interval',
        dictionary: dictionary.tabs.metrics.fields.quantifiers.fields,
        width: 2,
        flags: [],
        min: 0,
        max: 60,
        step: 0.1,
      }),
      textareaFieldFactory({
        name: 'specification',
        dictionary: dictionary.tabs.metrics.fields.quantifiers.fields,
        width: 1,
        flags: [],
        minLength: 1,
        maxLength: 500,
        rows: 2,
      }),
    ],
    false
  ),
]
