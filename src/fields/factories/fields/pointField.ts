// fields/factories/fields/pointField.ts
import type { Field, StaticLabel, PointField as PointFieldType, PointFieldValidation } from 'payload'
import { advanced } from '../toggles/advanced'

type DictLeaf = {
  label?: StaticLabel
  description?: StaticLabel
  required?: boolean
  defaultValue?: [number, number]
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

interface PointFactoryOptions {
  name: string
  dictionary?: Record<string, any>
  width?: 1 | 2 | 3 | 4 | 5
  flags?: Flag[]
  defaultValue?: [number, number]
  validate?: PointFieldValidation
  minLongitude?: number
  maxLongitude?: number
  minLatitude?: number
  maxLatitude?: number
  index?: boolean
}

const WIDTH_MAP = {
  1: '100%',
  2: '50%',
  3: '33.334%',
  4: '25%',
  5: '20%',
} as const

const DEFAULT_DESCRIPTION: StaticLabel = {
  en: 'Enter coordinates as [longitude, latitude].',
  es: 'Ingrese coordenadas como [longitud, latitud].',
  pt: 'Insira coordenadas como [longitude, latitude].',
}

const DEFAULTS = {
  required: false,
  localized: false,
  unique: false,
  index: true,
  defaultValue: [0, 0] as [number, number],
  minLongitude: -180,
  maxLongitude: 180,
  minLatitude: -90,
  maxLatitude: 90,
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

export const pointFieldFactory = (opts: PointFactoryOptions): Field => {
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
  const index = opts.index ?? DEFAULTS.index

  const field: PointFieldType = {
    name: opts.name,
    type: 'point',
    label,
    required,
    localized,
    unique,
    index,
    defaultValue: opts.defaultValue ?? dictNode?.defaultValue ?? DEFAULTS.defaultValue,
    admin: {
      description,
      readOnly: flags.has('readonly') || false,
      disabled: flags.has('disabled') || false,
      hidden: flags.has('hidden') || false,
      width,
    },
  }

  if (opts.validate) {
    field.validate = opts.validate
  } else {
    field.validate = (value, ctx) => {
      if (required && (!value || !Array.isArray(value))) {
        return 'Coordinates are required.'
      }

      if (value && Array.isArray(value)) {
        const [longitude, latitude] = value
        if (typeof longitude !== 'number' || typeof latitude !== 'number') {
          return 'Coordinates must be numbers.'
        }

        const minLng = opts.minLongitude ?? DEFAULTS.minLongitude
        const maxLng = opts.maxLongitude ?? DEFAULTS.maxLongitude
        const minLat = opts.minLatitude ?? DEFAULTS.minLatitude
        const maxLat = opts.maxLatitude ?? DEFAULTS.maxLatitude

        if (longitude < minLng || longitude > maxLng) {
          return `Longitude must be between ${minLng} and ${maxLng}.`
        }

        if (latitude < minLat || latitude > maxLat) {
          return `Latitude must be between ${minLat} and ${maxLat}.`
        }
      }

      return true
    }
  }

  const out = field as Field
  return flags.has('advanced') ? advanced(out) : out
}