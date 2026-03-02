import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { CustomFooter } from '../Custom/layout/Footer'

export async function Footer() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const footer = await payload.findGlobal({
    slug: 'footer',
    draft,
  })

  return <CustomFooter footer={footer} />
}
