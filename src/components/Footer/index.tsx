import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import { CustomFooter } from '../Custom/layout/Footer'

const getFooter = getCachedGlobal('footer', 1)
const getSocials = getCachedGlobal('socials', 1)
const getQuestions = getCachedGlobal('questions', 1)
const getAnnouncements = getCachedGlobal('announcements', 1)

const getCachedProducts = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'products',
      limit: 4,
      depth: 1,
      sort: '-createdAt',
      where: {
        _status: {
          equals: 'published',
        },
      },
    })
    return result.docs
  },
  ['footer-latest-products'],
  { tags: ['products'] },
)

const getCachedOrganizations = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'organizations',
      limit: 10,
      depth: 1,
      where: {
        and: [
          { 'assets.logo': { exists: true } },
          { 'basics.type': { not_equals: 'Others' } },
        ],
      },
      sort: '-updatedAt',
    })
    return result.docs
  },
  ['footer-organizations'],
  { tags: ['organizations'] },
)

export async function Footer() {
  const [footer, socials, questions, announcements, organizations, latestProducts] = await Promise.all([
    getFooter(),
    getSocials(),
    getQuestions(),
    getAnnouncements(),
    getCachedOrganizations(),
    getCachedProducts(),
  ])

  return (
    <CustomFooter
      footer={footer}
      socials={socials}
      organizations={organizations}
      questions={questions}
      announcements={announcements}
      latestProducts={latestProducts}
    />
  )
}