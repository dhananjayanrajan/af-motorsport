import { RenderBlocks } from '@/blocks/RenderBlocks'
import { homeStaticData } from '@/endpoints/seed/home-static'
import { RenderHero } from '@/heros/RenderHero'
import type { Page as PageType } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1000,
      overrideAccess: true,
      pagination: false,
      select: {
        slug: true,
      },
    })

    if (!pages?.docs) return []

    return pages.docs
      .filter((doc) => doc.slug !== 'home')
      .map(({ slug }) => ({ slug }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params }: Args) {
  const { slug = 'home' } = await params
  const { isEnabled: draft } = await draftMode()

  const page = await queryPageBySlug({
    slug,
    draft,
  })

  const finalPage = page || (slug === 'home' ? (homeStaticData() as PageType) : null)

  if (!finalPage) {
    return notFound()
  }

  return (
    <article className="pt-16 pb-24">
      <RenderHero {...(finalPage as any).hero} />
      <RenderBlocks blocks={(finalPage as any).layout} />
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home' } = await params
  const { isEnabled: draft } = await draftMode()

  const page = await queryPageBySlug({
    slug,
    draft,
  })

  if (!page) {
    return {}
  }

  return generateMeta({ doc: page })
}

const queryPageBySlug = async ({ slug, draft }: { slug: string; draft: boolean }): Promise<PageType | null> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs?.[0] as PageType) || null
}