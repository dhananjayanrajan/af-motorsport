// fields/factories/fields/selectField.ts
import type { SelectField, Field, StaticLabel, SelectFieldValidation, OptionObject } from 'payload'
import { advanced } from '../toggles/advanced'
type DictLeaf = {
  label?: StaticLabel
  placeholder?: string
  description?: StaticLabel
  required?: boolean
  defaultValue?: string | string[]
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
interface SelectFactoryOptions {
  name: string
  // Accept readonly arrays to support const assertions in constants files
  options: readonly string[] | readonly OptionObject[] | string[] | OptionObject[]
  dictionary?: Record<string, any>
  width?: 1 | 2 | 3 | 4 | 5
  flags?: Flag[]
  hasMany?: boolean
  defaultValue?: string | string[]
  placeholder?: string
  validate?: SelectFieldValidation
  filterOptions?: (args: {
    options: string[] | OptionObject[]
    data: Record<string, any>
    siblingData?: Record<string, any>
    user?: Record<string, any>
    id?: string | number
  }) => string[] | OptionObject[]
  isClearable?: boolean
  isSortable?: boolean
  enumName?: string
  dbName?: string
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
  en: 'Select one or more options.',
  es: 'Seleccione una o más opciones.',
  pt: 'Selecione uma ou mais opções.',
}
const DEFAULTS = {
  required: false,
  localized: false,
  unique: false,
  index: false,
  hasMany: false,
  isClearable: false,
  isSortable: false,
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
export const selectFieldFactory = (opts: SelectFactoryOptions): Field => {
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
  const unique = flags.has('unique') || DEFAULTS.unique
  const index = flags.has('index') || DEFAULTS.index
  const hasMany = opts.hasMany ?? DEFAULTS.hasMany
  const field: SelectField = {
    name: opts.name,
    type: 'select',
    options: opts.options as any, // Cast to satisfy internal Payload typing which expects mutable
    label,
    required,
    localized,
    unique,
    index,
    hasMany,
    admin: {
      description,
      placeholder,
      readOnly: flags.has('readonly') || false,
      disabled: flags.has('disabled') || false,
      hidden: flags.has('hidden') || false,
      width,
      isClearable: opts.isClearable ?? DEFAULTS.isClearable,
      isSortable: opts.isSortable ?? DEFAULTS.isSortable,
    },
  }
  if (opts.defaultValue !== undefined) {
    field.defaultValue = opts.defaultValue
  } else if (dictNode?.defaultValue !== undefined) {
    field.defaultValue = dictNode.defaultValue
  }
  if (opts.filterOptions !== undefined) field.filterOptions = opts.filterOptions as any
  if (opts.enumName !== undefined) field.enumName = opts.enumName
  if (opts.dbName !== undefined) field.dbName = opts.dbName
  if (opts.interfaceName !== undefined) field.interfaceName = opts.interfaceName
  if (opts.validate !== undefined) field.validate = opts.validate
  return flags.has('advanced') ? advanced(field) : field
}
