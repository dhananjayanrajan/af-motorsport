import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import type { Config } from 'src/payload-types'

type Global = keyof Config['globals']

const globalCache: Partial<Record<string, () => Promise<any>>> = {}

export const getCachedGlobal = <T extends Global>(slug: T, depth = 0) => {
  const key = `${slug}_${depth}`
  if (!globalCache[key]) {
    globalCache[key] = unstable_cache(
      async () => {
        const payload = await getPayload({ config: configPromise })
        return payload.findGlobal({ slug, depth })
      },
      [key],
      { tags: [`global_${slug}`], revalidate: 60 }
    )
  }
  return globalCache[key] as () => Promise<Config['globals'][T]>
}