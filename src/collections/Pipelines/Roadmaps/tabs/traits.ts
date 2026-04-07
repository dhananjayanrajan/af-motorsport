import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { RISK_IMPACT } from '../sources/constants'

export const traitsFields: Field[] = [
  groupFactory(
    {
      name: 'phases',
      label: { en: 'Phases', es: 'Fases', pt: 'Fases' },
      entity: { en: 'Phase', es: 'Fase', pt: 'Fase' },
      description: { en: 'Roadmap phases', es: 'Fases del roadmap', pt: 'Fases do roadmap' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      dateFieldFactory({ name: 'start_date', dictionary: undefined, width: 2, pickerAppearance: 'dayOnly' }),
      dateFieldFactory({ name: 'end_date', dictionary: undefined, width: 2, pickerAppearance: 'dayOnly' }),
      textareaFieldFactory({ name: 'objectives', dictionary: undefined, width: 3, minLength: 1, maxLength: 500, rows: 2 }),
      relationshipFieldFactory({ name: 'deliverables', relationTo: 'archives', dictionary: undefined, width: 3, hasMany: true, maxRows: 10 }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'risks',
      label: { en: 'Risks', es: 'Riesgos', pt: 'Riscos' },
      entity: { en: 'Risk', es: 'Riesgo', pt: 'Risco' },
      description: { en: 'Strategic risks', es: 'Riesgos estratégicos', pt: 'Riscos estratégicos' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      selectFieldFactory({ name: 'impact', options: RISK_IMPACT, dictionary: undefined, width: 2 }),
      textareaFieldFactory({ name: 'mitigation', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'success_metrics',
      label: { en: 'Success Metrics', es: 'Métricas de Éxito', pt: 'Métricas de Sucesso' },
      entity: { en: 'Metric', es: 'Métrica', pt: 'Métrica' },
      description: { en: 'Success indicators', es: 'Indicadores de éxito', pt: 'Indicadores de sucesso' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'metric', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textFieldFactory({ name: 'target', dictionary: undefined, width: 2, minLength: 1, maxLength: 50 }),
      textFieldFactory({ name: 'actual', dictionary: undefined, width: 2, minLength: 1, maxLength: 50 }),
    ],
    true
  ),
]
