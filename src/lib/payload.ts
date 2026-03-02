import configPromise from '@/payload.config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

let cached = (global as any).__payload_instance

if (!cached) {
    cached = (global as any).__payload_instance = { client: null, promise: null }
}

export async function getPayloadClient() {
    if (cached.client) return cached.client
    if (!cached.promise) {
        cached.promise = getPayload({ config: configPromise })
    }
    try {
        cached.client = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }
    return cached.client
}

export const getCachedDoc = async (collection: string, slug: string, depth: number = 2) => {
    return unstable_cache(
        async () => {
            const payload = await getPayloadClient()
            const { docs } = await payload.find({
                collection: collection as any,
                where: { slug: { equals: slug } },
                depth,
                overrideAccess: true,
            })
            return docs[0] || null
        },
        [collection, slug],
        {
            tags: [collection, `${collection}-${slug}`],
        }
    )()
}

export const getCachedGlobal = async (slug: string, depth: number = 1) => {
    return unstable_cache(
        async () => {
            const payload = await getPayloadClient()
            return await payload.findGlobal({
                slug: slug as any,
                depth,
                overrideAccess: true,
            })
        },
        [slug],
        {
            tags: [`global_${slug}`],
        }
    )()
}