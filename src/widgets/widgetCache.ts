type CacheEntry<T> = {
  data: T
  expiresAt: number
}

const memoryCache = new Map<string, CacheEntry<any>>()
const WIDGET_CACHE_VERSION = 'v2'

function memoryGet<T>(key: string): T | null {
  const entry = memoryCache.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key)
    return null
  }
  return entry.data as T
}

function memorySet<T>(key: string, data: T, ttlSeconds: number): void {
  memoryCache.set(key, { data, expiresAt: Date.now() + ttlSeconds * 1000 })
}

function memoryClear(prefix?: string): void {
  if (!prefix) { memoryCache.clear(); return }
  for (const key of memoryCache.keys()) {
    if (key.startsWith(prefix)) memoryCache.delete(key)
  }
}

let redisClient: any = null

async function getRedisClient(): Promise<any> {
  if (redisClient) return redisClient
  try {
    const { default: Redis } = await import('ioredis')
    redisClient = new Redis(process.env.REDIS_URL!)
    redisClient.on('error', (err: any) => {
      console.warn('[WidgetCache] Redis error, falling back to memory:', err.message)
      redisClient = null
    })
    return redisClient
  } catch {
    console.warn('[WidgetCache] ioredis not installed or REDIS_URL invalid. Using memory cache.')
    return null
  }
}

const useRedis = !!process.env.REDIS_URL

export async function getWidgetCache<T>(key: string): Promise<T | null> {
  if (useRedis) {
    try {
      const client = await getRedisClient()
      if (client) {
        const raw = await client.get(key)
        return raw ? (JSON.parse(raw) as T) : null
      }
    } catch {
    }
  }
  return memoryGet<T>(key)
}

export async function setWidgetCache<T>(key: string, data: T, ttlSeconds: number = 60): Promise<void> {
  if (useRedis) {
    try {
      const client = await getRedisClient()
      if (client) {
        await client.setex(key, ttlSeconds, JSON.stringify(data))
        return
      }
    } catch {
    }
  }
  memorySet(key, data, ttlSeconds)
}

export async function clearWidgetCache(prefix?: string): Promise<void> {
  if (useRedis) {
    try {
      const client = await getRedisClient()
      if (client) {
        if (!prefix) {
          const keys = await client.keys('widget:*')
          if (keys.length > 0) await client.del(...keys)
        } else {
          const keys = await client.keys(`${prefix}*`)
          if (keys.length > 0) await client.del(...keys)
        }
        return
      }
    } catch {
    }
  }
  memoryClear(prefix)
}

export function buildCacheKey(
  collectionSlug: string,
  widgetName: string,
  params: Record<string, any> = {}
): string {
  const paramString = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${JSON.stringify(v)}`)
    .join('|')
  return `widget:${WIDGET_CACHE_VERSION}:${collectionSlug}:${widgetName}${paramString ? `|${paramString}` : ''}`
}