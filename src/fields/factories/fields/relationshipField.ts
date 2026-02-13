// fields/factories/fields/relationshipField.ts
import type { RelationshipField, Field, StaticLabel, RelationshipFieldValidation, CollectionSlug, Where, FilterOptions } from 'payload'
import { advanced } from '../toggles/advanced'

type DictLeaf = {
  label?: StaticLabel
  placeholder?: string
  description?: StaticLabel
  required?: boolean
  defaultValue?: string | string[] | { relationTo: string; value: string } | Array<{ relationTo: string; value: string }>
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

interface RelationshipFactoryOptions {
  name: string
  relationTo: CollectionSlug | CollectionSlug[]
  dictionary?: Record<string, any>
  width?: 1 | 2 | 3 | 4 | 5
  flags?: Flag[]
  hasMany?: boolean
  minRows?: number
  maxRows?: number
  maxDepth?: number
  defaultValue?: string | string[] | { relationTo: string; value: string } | Array<{ relationTo: string; value: string }>
  placeholder?: string
  validate?: RelationshipFieldValidation
  filterOptions?: Where | FilterOptions<RelationshipField>
  isSortable?: boolean
  allowCreate?: boolean
  allowEdit?: boolean
  sortOptions?: string | Record<string, string>
  appearance?: 'select' | 'drawer'
}

const WIDTH_MAP = {
  1: '100%',
  2: '50%',
  3: '33.334%',
  4: '25%',
  5: '20%',
} as const

const DEFAULT_DESCRIPTION: StaticLabel = {
  en: 'Select related document(s).',
  es: 'Seleccione documento(s) relacionado(s).',
  pt: 'Selecione documento(s) relacionado(s).',
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
  isSortable: false,
  allowCreate: true,
  allowEdit: true,
  appearance: 'select' as const,
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

export const relationshipFieldFactory = (opts: RelationshipFactoryOptions): Field => {
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

  // Build the field with proper typing
  const field: any = {
    name: opts.name,
    type: 'relationship',
    relationTo: opts.relationTo,
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
      isSortable: opts.isSortable ?? DEFAULTS.isSortable,
      allowCreate: opts.allowCreate ?? DEFAULTS.allowCreate,
      allowEdit: opts.allowEdit ?? DEFAULTS.allowEdit,
      appearance: opts.appearance ?? DEFAULTS.appearance,
    },
  }

  // Add optional properties if they are defined
  if (opts.minRows !== undefined) field.minRows = opts.minRows
  if (opts.maxRows !== undefined) field.maxRows = opts.maxRows
  if (opts.maxDepth !== undefined) field.maxDepth = opts.maxDepth
  if (opts.defaultValue !== undefined) {
    field.defaultValue = opts.defaultValue
  } else if (dictNode?.defaultValue !== undefined) {
    field.defaultValue = dictNode.defaultValue
  }
  if (opts.filterOptions !== undefined) field.filterOptions = opts.filterOptions
  if (opts.sortOptions !== undefined) field.admin.sortOptions = opts.sortOptions
  if (opts.validate !== undefined) field.validate = opts.validate

  return flags.has('advanced') ? advanced(field as Field) : field as Field
}