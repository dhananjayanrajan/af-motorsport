// src/lib/widgetCache.ts
import type { PayloadRequest } from 'payload'

type CacheEntry<T> = {
  data: T
  expiresAt: number
}

const cache = new Map<string, CacheEntry<any>>()

export function getWidgetCache<T>(key: string): T | null {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    cache.delete(key)
    return null
  }
  return entry.data as T
}

export function setWidgetCache<T>(key: string, data: T, ttlSeconds: number = 60): void {
  cache.set(key, {
    data,
    expiresAt: Date.now() + (ttlSeconds * 1000)
  })
}

export function clearWidgetCache(prefix: string): void {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key)
    }
  }
}

export function buildCacheKey(collectionSlug: string, widgetName: string, params: Record<string, any> = {}): string {
  const paramString = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${JSON.stringify(v)}`)
    .join('|')
  return `widget:${collectionSlug}:${widgetName}${paramString ? `|${paramString}` : ''}`
}

// ✅ FIXED: Proper null/undefined handling for user.roles
export function hasRequiredRoles(req: PayloadRequest, requiredRoles?: string[]): boolean {
  // No role restrictions = allow everyone
  if (!requiredRoles || requiredRoles.length === 0) return true

  const user = req.user
  if (!user) return false

  // Type guard: Check if this is a User (has roles) vs PayloadMcpApiKey (no roles)
  if (!('roles' in user)) return false

  // ✅ Explicit null/undefined + array check for roles
  const roles = user.roles
  if (!roles || !Array.isArray(roles)) return false

  // Now TypeScript knows `roles` is a valid string[]
  return requiredRoles.some(role => roles.includes(role as any))
}