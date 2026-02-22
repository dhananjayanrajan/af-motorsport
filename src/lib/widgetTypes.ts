import type { PayloadRequest, CollectionSlug } from 'payload'

export type WidgetConfig<T extends CollectionSlug = CollectionSlug> = {
  collectionSlug: T
  title?: string
  limit?: number
  depth?: 0 | 1 | 2
  cacheTTL?: number
  requiredRoles?: string[]
}

export type WidgetServerProps = {
  req: PayloadRequest
}

export type RecordSummary = {
  id: string | number
  name?: string
  type?: any
  updatedAt: string
  createdAt: string
  visibility?: {
    check_publish?: boolean
    check_featured?: boolean
    check_pinned?: boolean
  }
  toggle?: 'simple' | 'advanced'
  slug?: string
  generateSlug?: boolean
  tags?: (string | { id: string | number; name: string })[]
  categories?: (string | { id: string | number; name: string })[]
  names?: {
    first?: string
    last?: string
  }
  alias?: string
  title?: string
  [key: string]: any
}

export type SectionName = 'basics' | 'details' | 'traits' | 'metrics' | 'assets' | 'contexts'

export type RelationFieldScan = {
  filled: number
  total: number
}

export type PipelineStage = 'Draft' | 'Published' | 'Featured' | 'Pinned'

export type SlugHealthResult = {
  missing: { id: any; name: string }[]
  autoGen: { id: any; name: string }[]
  duplicates: { id: any; name: string }[]
}