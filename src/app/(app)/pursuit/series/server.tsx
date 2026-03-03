import { getCachedDoc } from '@/lib/payload'
import { PageClient } from './PageClient'

export async function Server() {
  const pageData = await getCachedDoc('pages', 'pursuit/series', 2)
  
  return <PageClient pageData={pageData} />
}
