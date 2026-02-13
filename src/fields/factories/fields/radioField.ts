// fields/factories/fields/radioField.ts
import type { RadioField, Field, StaticLabel, RadioFieldValidation, OptionObject } from 'payload'
import { advanced } from '../toggles/advanced'

type DictLeaf = {
  label?: StaticLabel
  description?: StaticLabel
  required?: boolean
  defaultValue?: string
  localized?: boolean
}

type Flag =
  | 'required'
  | 'localized'
  | 'index'
  | 'advanced'
  | 'readonly'
  | 'disabled'
  | 'hidden'

interface RadioFactoryOptions {
  name: string
  options: string[] | OptionObject[]
  dictionary?: Record<string, any>
  width?: 1 | 2 | 3 | 4 | 5
  flags?: Flag[]
  defaultValue?: string
  validate?: RadioFieldValidation
  layout?: 'horizontal' | 'vertical'
  enumName?: string
  interfaceName?: string
}

const WIDTH_MAP = {
  1: '100%',
  2: '50%',
  3: '33.334%',
  4: '25%',
  5: '20%',
} as const

const DEFAULT_DESCRIPTION: StaticLabel = {
  en: 'Select one option.',
  es: 'Seleccione una opción.',
  pt: 'Selecione uma opção.',
}

const DEFAULTS = {
  required: false,
  localized: false,
  index: false,
  layout: 'horizontal' as const,
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

export const radioFieldFactory = (opts: RadioFactoryOptions): Field => {
  const flags = new Set(opts.flags || [])
  const dictNode = findDictNode(opts.dictionary, opts.name)

  const label: StaticLabel =
    dictNode?.label ?? { en: opts.name, es: opts.name, pt: opts.name }

  const description: StaticLabel =
    dictNode?.description ?? DEFAULT_DESCRIPTION

  const width = WIDTH_MAP[opts.width ?? 1]

  const required = flags.has('required') || dictNode?.required || DEFAULTS.required
  const localized = flags.has('localized') || dictNode?.localized || DEFAULTS.localized
  const index = flags.has('index') || DEFAULTS.index

  const field: RadioField = {
    name: opts.name,
    type: 'radio',
    options: opts.options,
    label,
    required,
    localized,
    index,
    admin: {
      description,
      readOnly: flags.has('readonly') || false,
      disabled: flags.has('disabled') || false,
      hidden: flags.has('hidden') || false,
      width,
      layout: opts.layout ?? DEFAULTS.layout,
    },
  }

  if (opts.defaultValue !== undefined) {
    field.defaultValue = opts.defaultValue
  } else if (dictNode?.defaultValue !== undefined) {
    field.defaultValue = dictNode.defaultValue
  }

  if (opts.enumName !== undefined) field.enumName = opts.enumName
  if (opts.interfaceName !== undefined) field.interfaceName = opts.interfaceName
  if (opts.validate !== undefined) field.validate = opts.validate

  return flags.has('advanced') ? advanced(field) : field
}