// FILE: src/fields/factories/fields/textareaField.ts
import type { Field, StaticLabel, TextareaField } from 'payload'

type DictLeaf = {
  label?: StaticLabel
  placeholder?: string
  description?: StaticLabel
  required?: boolean
  minLength?: number
  maxLength?: number
  defaultValue?: string
  localized?: boolean
  rows?: number
}

type Flag =
  | 'required'
  | 'localized'
  | 'index'
  | 'unique'
  | 'readonly'
  | 'disabled'
  | 'hidden'
  | 'rtl'

interface TextareaFactoryOptions {
  name: string
  dictionary?: Record<string, any>
  width?: 1 | 2 | 3 | 4 | 5
  flags?: Flag[]
  minLength?: number
  maxLength?: number
  rows?: number
  defaultValue?: string
  placeholder?: string
}

const WIDTH_MAP = {
  1: '100%',
  2: '50%',
  3: '33.334%',
  4: '25%',
  5: '20%',
} as const

const DEFAULT_DESCRIPTION: StaticLabel = {
  en: 'Enter text value.',
  es: 'Ingrese valor de texto.',
  pt: 'Insira valor de texto.',
}

const DEFAULTS = {
  required: false,
  localized: false,
  unique: false,
  index: false,
  minLength: 0,
  maxLength: 2000,
  rows: 4,
} as const

const findDictNode = (
  dict: Record<string, any> | undefined,
  name: string,
): DictLeaf | undefined => {
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

export const textareaFieldFactory = (
  opts: TextareaFactoryOptions,
): Field => {
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

  const required =
    flags.has('required') || dictNode?.required || DEFAULTS.required

  const localized =
    flags.has('localized') || dictNode?.localized || DEFAULTS.localized

  const unique = flags.has('unique') || DEFAULTS.unique
  const index = flags.has('index') || DEFAULTS.index

  const minLength =
    opts.minLength ?? dictNode?.minLength ?? DEFAULTS.minLength

  const maxLength =
    opts.maxLength ?? dictNode?.maxLength ?? DEFAULTS.maxLength

  const rows =
    opts.rows ?? dictNode?.rows ?? DEFAULTS.rows

  const field: TextareaField = {
    name: opts.name,
    type: 'textarea',
    label,
    required,
    localized,
    unique,
    index,
    minLength,
    maxLength,
    defaultValue: opts.defaultValue ?? dictNode?.defaultValue ?? '',
    admin: {
      description,
      placeholder,
      rtl: flags.has('rtl') || false,
      readOnly: flags.has('readonly') || false,
      disabled: flags.has('disabled') || false,
      hidden: flags.has('hidden') || false,
      width,
      rows,
    },
  }

  return field
}