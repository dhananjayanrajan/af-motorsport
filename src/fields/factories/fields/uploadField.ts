// fields/factories/fields/uploadField.ts
import type { UploadField, Field, StaticLabel, UploadFieldValidation, FilterOptions, CollectionSlug } from 'payload'
import { advanced } from '../toggles/advanced'

type DictLeaf = {
  label?: StaticLabel
  description?: StaticLabel
  required?: boolean
  defaultValue?: string | string[] | number | number[]
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

interface UploadFactoryOptions {
  name: string
  relationTo: CollectionSlug | CollectionSlug[]
  dictionary?: Record<string, any>
  width?: 1 | 2 | 3 | 4 | 5
  flags?: Flag[]
  hasMany?: boolean
  minRows?: number
  maxRows?: number
  maxDepth?: number
  displayPreview?: boolean
  defaultValue?: string | string[] | number | number[]
  filterOptions?: FilterOptions<UploadField>
  validate?: UploadFieldValidation
}

const WIDTH_MAP = {
  1: '100%',
  2: '50%',
  3: '33.334%',
  4: '25%',
  5: '20%',
} as const

const DEFAULT_DESCRIPTION: StaticLabel = {
  en: 'Select an uploaded file.',
  es: 'Seleccione un archivo subido.',
  pt: 'Selecione um arquivo carregado.',
}

const DEFAULTS = {
  required: false,
  localized: false,
  unique: false,
  index: false,
  hasMany: false,
  minRows: undefined as number | undefined,
  maxRows: undefined as number | undefined,
  maxDepth: undefined as number | undefined,
  displayPreview: undefined as boolean | undefined,
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

export const uploadFieldFactory = (opts: UploadFactoryOptions): Field => {
  const flags = new Set(opts.flags || [])
  const dictNode = findDictNode(opts.dictionary, opts.name)

  const label: StaticLabel =
    dictNode?.label ?? { en: opts.name, es: opts.name, pt: opts.name }

  const description: StaticLabel =
    dictNode?.description ?? DEFAULT_DESCRIPTION

  const width = WIDTH_MAP[opts.width ?? 1]

  const required = flags.has('required') || dictNode?.required || DEFAULTS.required
  const localized = flags.has('localized') || dictNode?.localized || DEFAULTS.localized
  const unique = flags.has('unique') || DEFAULTS.unique
  const index = flags.has('index') || DEFAULTS.index
  const hasMany = flags.has('hasMany') || (opts.hasMany ?? DEFAULTS.hasMany)

  const field: UploadField = {
    name: opts.name,
    type: 'upload',
    relationTo: opts.relationTo as any,
    label,
    required,
    localized,
    unique,
    index,
    hasMany,
    admin: {
      description,
      readOnly: flags.has('readonly') || false,
      disabled: flags.has('disabled') || false,
      hidden: flags.has('hidden') || false,
      width,
    },
  }

  // Add optional properties if they are defined
  if (opts.minRows !== undefined) field.minRows = opts.minRows
  if (opts.maxRows !== undefined) field.maxRows = opts.maxRows
  if (opts.maxDepth !== undefined) field.maxDepth = opts.maxDepth
  if (opts.displayPreview !== undefined) field.displayPreview = opts.displayPreview
  if (opts.defaultValue !== undefined) {
    field.defaultValue = opts.defaultValue
  } else if (dictNode?.defaultValue !== undefined) {
    field.defaultValue = dictNode.defaultValue
  }
  if (opts.filterOptions !== undefined) field.filterOptions = opts.filterOptions
  if (opts.validate !== undefined) field.validate = opts.validate

  return flags.has('advanced') ? advanced(field) : field
}