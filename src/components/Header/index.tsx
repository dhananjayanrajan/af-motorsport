import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import { HeaderClient } from './index.client'

const getHeader = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    return payload.findGlobal({ slug: 'header', depth: 1 })
  },
  ['global_header'],
  { tags: ['global_header'] }
)

const getSocials = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    return payload.findGlobal({ slug: 'socials', depth: 1 })
  },
  ['global_socials'],
  { tags: ['global_socials'] }
)

export async function Header() {
  const [header, socials] = await Promise.all([getHeader(), getSocials()])
  return <HeaderClient header={header} socials={socials} />
}