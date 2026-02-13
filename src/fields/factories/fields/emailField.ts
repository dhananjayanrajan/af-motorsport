// fields/factories/fields/emailField.ts
import type { EmailField, Field, StaticLabel, EmailFieldValidation } from 'payload'
import { advanced } from '../toggles/advanced'

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
  | 'unique'
  | 'advanced'
  | 'readonly'
  | 'disabled'
  | 'hidden'

interface EmailFactoryOptions {
  name: string
  dictionary?: Record<string, any>
  width?: 1 | 2 | 3 | 4 | 5
  flags?: Flag[]
  defaultValue?: string
  placeholder?: string
  autocomplete?: string
  validate?: EmailFieldValidation
}

const WIDTH_MAP = {
  1: '100%',
  2: '50%',
  3: '33.334%',
  4: '25%',
  5: '20%',
} as const

const DEFAULT_DESCRIPTION: StaticLabel = {
  en: 'Enter a valid email address.',
  es: 'Ingrese una dirección de correo válida.',
  pt: 'Insira um endereço de e-mail válido.',
}

const DEFAULTS = {
  required: false,
  localized: false,
  unique: false,
  index: false,
  autocomplete: 'email',
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

export const emailFieldFactory = (opts: EmailFactoryOptions): Field => {
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

  const required = flags.has('required') || dictNode?.required || DEFAULTS.required
  const localized = flags.has('localized') || dictNode?.localized || DEFAULTS.localized
  const unique = flags.has('unique') || DEFAULTS.unique
  const index = flags.has('index') || DEFAULTS.index

  const field: EmailField = {
    name: opts.name,
    type: 'email',
    label,
    required,
    localized,
    unique,
    index,
    defaultValue: opts.defaultValue ?? dictNode?.defaultValue ?? '',
    admin: {
      description,
      placeholder,
      autoComplete: opts.autocomplete ?? DEFAULTS.autocomplete,
      readOnly: flags.has('readonly') || false,
      disabled: flags.has('disabled') || false,
      hidden: flags.has('hidden') || false,
      width,
    },
  }

  if (opts.validate) field.validate = opts.validate

  return flags.has('advanced') ? advanced(field) : field
}