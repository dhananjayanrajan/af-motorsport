import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import { CustomFooter } from '../Custom/layout/Footer'

const getFooter = getCachedGlobal('footer', 1)
const getSocials = getCachedGlobal('socials', 1)
const getQuestions = getCachedGlobal('questions', 1)
const getAnnouncements = getCachedGlobal('announcements', 1)

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
    getFooter(),
    getSocials(),
    getQuestions(),
    getAnnouncements(),
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