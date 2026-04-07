// FILE: src/fields/factories/fields/richTextField.ts
import type { Field, RichTextAdapter, RichTextField, RichTextFieldValidation, StaticLabel } from 'payload'

type DictLeaf = {
  label?: StaticLabel
  description?: StaticLabel
  required?: boolean
  defaultValue?: any
  localized?: boolean
}

type Flag =
  | 'required'
  | 'localized'
  | 'readonly'
  | 'disabled'
  | 'hidden'

interface RichTextFactoryOptions {
  name: string
  dictionary?: Record<string, any>
  width?: 1 | 2 | 3 | 4 | 5
  flags?: Flag[]
  defaultValue?: any
  editor?: RichTextAdapter
  validate?: RichTextFieldValidation
}

const WIDTH_MAP = {
  1: '100%',
  2: '50%',
  3: '33.334%',
  4: '25%',
  5: '20%',
} as const

const DEFAULT_DESCRIPTION: StaticLabel = {
  en: 'Enter rich text content.',
  es: 'Ingrese contenido de texto enriquecido.',
  pt: 'Insira conteúdo de texto rico.',
}

const DEFAULTS = {
  required: false,
  localized: false,
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

export const richtextFieldFactory = (opts: RichTextFactoryOptions): Field => {
  const flags = new Set(opts.flags || [])
  const dictNode = findDictNode(opts.dictionary, opts.name)

  const label: StaticLabel =
    dictNode?.label ?? { en: opts.name, es: opts.name, pt: opts.name }

  const description: StaticLabel =
    dictNode?.description ?? DEFAULT_DESCRIPTION

  const width = WIDTH_MAP[opts.width ?? 1]

  const required = flags.has('required') || dictNode?.required || DEFAULTS.required
  const localized = flags.has('localized') || dictNode?.localized || DEFAULTS.localized

  const field: RichTextField = {
    name: opts.name,
    type: 'richText',
    label,
    required,
    localized,
    admin: {
      description,
      readOnly: flags.has('readonly') || false,
      disabled: flags.has('disabled') || false,
      hidden: flags.has('hidden') || false,
      width,
    },
  }

  if (opts.defaultValue !== undefined) {
    field.defaultValue = opts.defaultValue
  } else if (dictNode?.defaultValue !== undefined) {
    field.defaultValue = dictNode.defaultValue
  }

  if (opts.editor !== undefined) field.editor = opts.editor
  if (opts.validate !== undefined) field.validate = opts.validate

  return field
}