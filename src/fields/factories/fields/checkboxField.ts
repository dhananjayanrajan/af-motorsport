// FILE: src/fields/factories/fields/checkboxField.ts
import type { CheckboxField, CheckboxFieldValidation, Field, StaticLabel } from 'payload'

type DictLeaf = {
  label?: StaticLabel
  description?: StaticLabel
  required?: boolean
  defaultValue?: boolean
  localized?: boolean
}

type Flag =
  | 'required'
  | 'localized'
  | 'index'
  | 'readonly'
  | 'disabled'
  | 'hidden'

interface CheckboxFactoryOptions {
  name: string
  dictionary?: Record<string, any>
  width?: 1 | 2 | 3 | 4 | 5
  flags?: Flag[]
  defaultValue?: boolean
  validate?: CheckboxFieldValidation
}

const WIDTH_MAP = {
  1: '100%',
  2: '50%',
  3: '33.334%',
  4: '25%',
  5: '20%',
} as const

const DEFAULT_DESCRIPTION: StaticLabel = {
  en: 'Toggle on or off.',
  es: 'Activar o desactivar.',
  pt: 'Ativar ou desativar.',
}

const DEFAULTS = {
  required: false,
  localized: false,
  index: false,
  defaultValue: false,
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

export const checkboxFieldFactory = (opts: CheckboxFactoryOptions): Field => {
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

  // Determine default value: required fields default to false unless specified
  let defaultValue: boolean
  if (opts.defaultValue !== undefined) {
    defaultValue = opts.defaultValue
  } else if (dictNode?.defaultValue !== undefined) {
    defaultValue = dictNode.defaultValue
  } else {
    defaultValue = DEFAULTS.defaultValue
  }

  const field: CheckboxField = {
    name: opts.name,
    type: 'checkbox',
    label,
    required,
    localized,
    index,
    defaultValue,
    admin: {
      description,
      readOnly: flags.has('readonly') || false,
      disabled: flags.has('disabled') || false,
      hidden: flags.has('hidden') || false,
      width,
    },
  }

  if (opts.validate) field.validate = opts.validate

  return field
}