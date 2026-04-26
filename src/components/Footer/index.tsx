import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import { CustomFooter } from '../Custom/layout/Footer'

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
  { tags: ['organizations'] }
)

export async function Footer() {
  const [footer, socials, questions, announcements, organizations] = await Promise.all([
    getCachedGlobal('footer', 1)(),
    getCachedGlobal('socials', 1)(),
    getCachedGlobal('questions', 1)(),
    getCachedGlobal('announcements', 1)(),
    getCachedOrganizations(),
  ])

  return (
    <CustomFooter
      footer={footer}
      socials={socials}
      organizations={organizations}
      questions={questions}
      announcements={announcements}
    />
  )
}