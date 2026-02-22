// FILE: src/seed/types.ts
export type SeedContext = Record<string, number[]>
export type PreloadItem = Record<string, any>
export type GeneratorFunction<T = any> = (
  ctx: SeedContext,
  count?: number
) => Promise<T[]>
export type CollectionSeeders = {
  preload?: PreloadItem[]
  generate?: GeneratorFunction
}
export type PreloadItemWithSlugRef = PreloadItem & { _categorySlug?: string };
