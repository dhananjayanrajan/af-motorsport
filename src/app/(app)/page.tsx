import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

export default async function HomePage() {
    const payload = await getPayload({ config: configPromise })

    const pages = await payload.find({
        collection: 'pages',
        limit: 1,
        where: {
            slug: {
                equals: 'home'
            }
        },
        overrideAccess: true,
    })

    const page = pages.docs[0]

    if (!page) {
        return notFound()
    }

    // @ts-ignore
    const { hero, layout } = page

    return (
        <article className="pt-16 pb-24">
            <RenderHero {...hero} />
            <RenderBlocks blocks={layout} />
        </article>
    )
}

export async function generateMetadata() {
    const payload = await getPayload({ config: configPromise })

    const pages = await payload.find({
        collection: 'pages',
        limit: 1,
        where: {
            slug: {
                equals: 'home'
            }
        },
        overrideAccess: true,
    })

    const page = pages.docs[0]
    return generateMeta({ doc: page })
}