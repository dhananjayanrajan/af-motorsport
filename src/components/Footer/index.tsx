import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { CustomFooter } from '../Custom/layout/Footer'

export async function Footer() {
  const footer = await getCachedGlobal('footer', 1)()
  const socials = await getCachedGlobal('socials', 1)()
  const questions = await getCachedGlobal('questions', 1)()
  const announcements = await getCachedGlobal('announcements', 1)()

  const payload = await getPayload({ config: configPromise })

  const organizations = await payload.find({
    collection: 'organizations',
    limit: 10,
    depth: 1,
    where: {
      and: [
        {
          'assets.logo': {
            exists: true,
          },
        },
        {
          'basics.type': {
            not_equals: 'Others',
          },
        },
      ],
    },
    sort: '-updatedAt',
  })

  return (
    <CustomFooter
      footer={footer}
      socials={socials}
      organizations={organizations.docs}
      questions={questions}
      announcements={announcements}
    />
  )
}