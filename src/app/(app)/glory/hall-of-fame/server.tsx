import { getCachedDoc } from '@/lib/payload'
import { PageClient } from './PageClient'

export async function Server() {
  const pageData = await getCachedDoc('pages', 'glory/hall-of-fame', 2)
  
  return <PageClient pageData={pageData} />
}
