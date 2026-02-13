// fields/factories/fields/numberField.ts
import type { Field, StaticLabel } from 'payload'
import { advanced } from '../toggles/advanced'

type DictLeaf = {
  label?: StaticLabel
  placeholder?: string
  description?: StaticLabel
  required?: boolean
  min?: number
  max?: number
  defaultValue?: number | number[]
  localized?: boolean
}

type Flag =
  | 'required'
  | 'localized'
  | 'index'
  | 'unique'
  | 'hasMany'
  | 'advanced'
  | 'readonly'
  | 'disabled'
  | 'hidden'
  | 'rtl'

interface NumberFactoryOptions {
  name: string
  dictionary?: Record<string, any>
  width?: 1 | 2 | 3 | 4 | 5
  flags?: Flag[]
  min?: number
  max?: number
  minRows?: number
  maxRows?: number
  defaultValue?: number | number[]
  placeholder?: string
  autocomplete?: string
  step?: number
}

const WIDTH_MAP = {
  1: '100%',
  2: '50%',
  3: '33.334%',
  4: '25%',
  5: '20%',
} as const

const DEFAULT_DESCRIPTION: StaticLabel = {
  en: 'Enter numeric value.',
  es: 'Ingrese valor numérico.',
  pt: 'Insira valor numérico.',
}

const DEFAULTS = {
  required: false,
  localized: false,
  unique: false,
  index: false,
  hasMany: false,
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  step: 1,
  minRows: 0,
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

export const numberFieldFactory = (opts: NumberFactoryOptions): Field => {
  const flags = new Set(opts.flags || [])
  const dictNode = findDictNode(opts.dictionary, opts.name)

  const label: StaticLabel =
    dictNode?.label ?? { en: opts.name, es: opts.name, pt: opts.name }

  const placeholder =
    opts.placeholder ??
    dictNode?.placeholder ??
    `Enter ${opts.name}`

  const description: StaticLabel =
    dictNode?.description ?? DEFAULT_DESCRIPTION

  const width = WIDTH_MAP[opts.width ?? 1]

  const hasMany = flags.has('hasMany') || DEFAULTS.hasMany

  const field: any = {
    name: opts.name,
    type: 'number',
    label,
    required: flags.has('required') || dictNode?.required || DEFAULTS.required,
    localized: flags.has('localized') || dictNode?.localized || DEFAULTS.localized,
    unique: flags.has('unique') || DEFAULTS.unique,
    index: flags.has('index') || DEFAULTS.index,
    min: opts.min ?? dictNode?.min ?? DEFAULTS.min,
    max: opts.max ?? dictNode?.max ?? DEFAULTS.max,
    admin: {
      description,
      placeholder,
      autoComplete: opts.autocomplete ?? 'off',
      step: opts.step ?? DEFAULTS.step,
      rtl: flags.has('rtl') || false,
      readOnly: flags.has('readonly') || false,
      disabled: flags.has('disabled') || false,
      hidden: flags.has('hidden') || false,
      width,
    },
  }

  if (hasMany) {
    field.hasMany = true
    field.minRows = opts.minRows ?? DEFAULTS.minRows
    if (opts.maxRows !== undefined) field.maxRows = opts.maxRows
    field.defaultValue = Array.isArray(opts.defaultValue) ? opts.defaultValue : []
  } else {
    field.hasMany = false
    field.defaultValue =
      typeof opts.defaultValue === 'number'
        ? opts.defaultValue
        : typeof dictNode?.defaultValue === 'number'
          ? dictNode.defaultValue
          : 0
  }

  const out = field as Field
  return flags.has('advanced') ? advanced(out) : out
}
