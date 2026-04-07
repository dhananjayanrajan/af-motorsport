import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { RISK_LIKELIHOOD, RISK_IMPACT } from '../sources/constants'

export const traitsFields: Field[] = [
  groupFactory(
    {
      name: 'milestones',
      label: { en: 'Milestones', es: 'Hitos', pt: 'Marcos' },
      entity: { en: 'Milestone', es: 'Hito', pt: 'Marco' },
      description: { en: 'Key milestones', es: 'Hitos clave', pt: 'Marcos chave' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      dateFieldFactory({ name: 'due_date', dictionary: undefined, width: 2, pickerAppearance: 'dayOnly' }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'deliverables',
      label: { en: 'Deliverables', es: 'Entregables', pt: 'Entregáveis' },
      entity: { en: 'Deliverable', es: 'Entregable', pt: 'Entregável' },
      description: { en: 'Project deliverables', es: 'Entregables del proyecto', pt: 'Entregáveis do projeto' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textFieldFactory({ name: 'type', dictionary: undefined, width: 2, minLength: 1, maxLength: 50 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'risks',
      label: { en: 'Risks', es: 'Riesgos', pt: 'Riscos' },
      entity: { en: 'Risk', es: 'Riesgo', pt: 'Risco' },
      description: { en: 'Potential risks', es: 'Riesgos potenciales', pt: 'Riscos potenciais' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      selectFieldFactory({ name: 'likelihood', options: RISK_LIKELIHOOD, dictionary: undefined, width: 2 }),
      selectFieldFactory({ name: 'impact', options: RISK_IMPACT, dictionary: undefined, width: 2 }),
      textareaFieldFactory({ name: 'mitigation', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'kpis',
      label: { en: 'KPIs', es: 'KPIs', pt: 'KPIs' },
      entity: { en: 'KPI', es: 'KPI', pt: 'KPI' },
      description: { en: 'Key performance indicators', es: 'Indicadores clave', pt: 'Indicadores chave' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textFieldFactory({ name: 'target', dictionary: undefined, width: 2, minLength: 1, maxLength: 50 }),
      textFieldFactory({ name: 'unit', dictionary: undefined, width: 2, minLength: 1, maxLength: 20 }),
    ],
    true
  ),
]
