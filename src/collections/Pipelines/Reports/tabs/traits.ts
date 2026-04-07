import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { CHART_TYPES } from '../sources/constants'

export const traitsFields: Field[] = [
  groupFactory(
    {
      name: 'data_sources',
      label: { en: 'Data Sources', es: 'Fuentes de Datos', pt: 'Fontes de Dados' },
      entity: { en: 'Source', es: 'Fuente', pt: 'Fonte' },
      description: { en: 'Report data sources', es: 'Fuentes de datos del informe', pt: 'Fontes de dados do relatório' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textFieldFactory({ name: 'path', dictionary: undefined, width: 3, minLength: 1, maxLength: 255 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'charts',
      label: { en: 'Charts', es: 'Gráficos', pt: 'Gráficos' },
      entity: { en: 'Chart', es: 'Gráfico', pt: 'Gráfico' },
      description: { en: 'Visual charts', es: 'Gráficos visuales', pt: 'Gráficos visuais' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'title', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      selectFieldFactory({ name: 'type', options: CHART_TYPES, dictionary: undefined, width: 2 }),
      textFieldFactory({ name: 'data_reference', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      uploadFieldFactory({ name: 'thumbnail', relationTo: 'media', dictionary: undefined, width: 2 }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'tables',
      label: { en: 'Tables', es: 'Tablas', pt: 'Tabelas' },
      entity: { en: 'Table', es: 'Tabla', pt: 'Tabela' },
      description: { en: 'Data tables (JSON format)', es: 'Tablas de datos (formato JSON)', pt: 'Tabelas de dados (formato JSON)' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'title', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textareaFieldFactory({ name: 'columns', dictionary: undefined, width: 2, minLength: 1, maxLength: 5000, rows: 5, placeholder: 'Paste JSON columns array here' }),
      textareaFieldFactory({ name: 'rows', dictionary: undefined, width: 2, minLength: 1, maxLength: 5000, rows: 5, placeholder: 'Paste JSON rows array here' }),
    ],
    true
  ),
]
