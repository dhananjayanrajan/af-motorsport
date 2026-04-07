import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'

export const metricsFields: Field[] = [
  {
    name: 'record_lap_time',
    type: 'text',
    label: dictionary.tabs.metrics.record_lap_time.label,
    admin: {
      width: '33.334%',
      description: dictionary.tabs.metrics.record_lap_time.description,
      placeholder: 'MM:SS.mmm',
    },
  },
  relationshipFieldFactory({
    name: 'record_lap_driver',
    relationTo: 'drivers',
    dictionary: dictionary.tabs.metrics,
    width: 2,
    flags: [],
  }),
  dateFieldFactory({
    name: 'record_lap_year',
    dictionary: dictionary.tabs.metrics,
    width: 2,
    pickerAppearance: 'monthOnly',
    flags: [],
  }),
]
