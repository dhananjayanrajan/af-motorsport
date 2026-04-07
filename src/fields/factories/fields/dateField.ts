// FILE: src/fields/factories/fields/dateField.ts
import type { DateField, DateFieldValidation, Field, StaticLabel } from 'payload'

type DictLeaf = {
  label?: StaticLabel
  placeholder?: string
  description?: StaticLabel
  required?: boolean
  defaultValue?: string
  localized?: boolean
}

type Flag =
  | 'required'
  | 'localized'
  | 'index'
  | 'readonly'
  | 'disabled'
  | 'hidden'

interface DateFactoryOptions {
  name: string
  dictionary?: Record<string, any>
  width?: 1 | 2 | 3 | 4 | 5
  flags?: Flag[]
  defaultValue?: string
  placeholder?: string
  validate?: DateFieldValidation
  pickerAppearance?: 'dayOnly' | 'timeOnly' | 'dayAndTime' | 'monthOnly'
  displayFormat?: string
  monthsToShow?: 1 | 2
  minDate?: Date
  maxDate?: Date
  minTime?: Date
  maxTime?: Date
  timeIntervals?: number
  timeFormat?: string
  overrides?: Record<string, any>
}

const WIDTH_MAP = {
  1: '100%',
  2: '50%',
  3: '33.334%',
  4: '25%',
  5: '20%',
} as const

const DEFAULT_DESCRIPTION: StaticLabel = {
  en: 'Select a date and/or time.',
  es: 'Seleccione una fecha y/o hora.',
  pt: 'Selecione uma data e/ou hora.',
}

const DEFAULTS = {
  required: false,
  localized: false,
  index: false,
  pickerAppearance: 'dayOnly' as const,
  monthsToShow: 1 as const,
  timeIntervals: 30,
  timeFormat: 'h:mm aa',
} as const

const findDictNode = (dict: Record<string, any> | undefined, name: string): DictLeaf | undefined => {
  if (!dict) return
  const stack: any[] = [dict]
  while (stack.length) {
    const node = stack.pop()
    if (!node || typeof node !== 'object') continue
    if (name in node && typeof node[name] === 'object') return node[name]
    for (const v of Object.values(node)) {
      if (v && typeof v === 'object') stack.push(v)
    }
  }
}

export const dateFieldFactory = (opts: DateFactoryOptions): Field => {
  const flags = new Set(opts.flags || [])
  const dictNode = findDictNode(opts.dictionary, opts.name)

  const label: StaticLabel =
    dictNode?.label ?? { en: opts.name, es: opts.name, pt: opts.name }

  const placeholder =
    opts.placeholder ??
    dictNode?.placeholder ??
    `Select ${opts.name}`

  const description: StaticLabel =
    dictNode?.description ?? DEFAULT_DESCRIPTION

  const width = WIDTH_MAP[opts.width ?? 1]

  const required = flags.has('required') || dictNode?.required || DEFAULTS.required
  const localized = flags.has('localized') || dictNode?.localized || DEFAULTS.localized
  const index = flags.has('index') || DEFAULTS.index

  const field: DateField = {
    name: opts.name,
    type: 'date',
    label,
    required,
    localized,
    index,
    defaultValue: opts.defaultValue ?? dictNode?.defaultValue ?? undefined,
    admin: {
      description,
      placeholder,
      readOnly: flags.has('readonly') || false,
      disabled: flags.has('disabled') || false,
      hidden: flags.has('hidden') || false,
      width,
    },
  }

  const dateAdminConfig: any = {}

  if (opts.pickerAppearance) dateAdminConfig.pickerAppearance = opts.pickerAppearance
  if (opts.displayFormat) dateAdminConfig.displayFormat = opts.displayFormat
  if (opts.monthsToShow) dateAdminConfig.monthsToShow = opts.monthsToShow
  if (opts.minDate) dateAdminConfig.minDate = opts.minDate
  if (opts.maxDate) dateAdminConfig.maxDate = opts.maxDate
  if (opts.minTime) dateAdminConfig.minTime = opts.minTime
  if (opts.maxTime) dateAdminConfig.maxTime = opts.maxTime
  if (opts.timeIntervals) dateAdminConfig.timeIntervals = opts.timeIntervals
  if (opts.timeFormat) dateAdminConfig.timeFormat = opts.timeFormat
  if (opts.overrides) dateAdminConfig.overrides = opts.overrides

  if (Object.keys(dateAdminConfig).length > 0) {
    field.admin = {
      ...field.admin,
      date: dateAdminConfig,
    }
  }

  if (opts.validate) field.validate = opts.validate

  return field
}