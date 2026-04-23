// app/(frontend)/about/page.tsx
import CarouselSection from '@/components/Section/Blocks/CarouselSection'
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import { Hospitality, Identity, Initiative, Media, Plan, Statement } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
  if (!media) return undefined
  if (typeof media === 'object' && 'url' in media && media.url) return media.url
  return undefined
}

const getAboutData = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    const [identityGlobal, statements, plans, initiatives, hospitalities] = await Promise.all([
      payload.findGlobal({ slug: 'identity' }) as Promise<Identity>,
      payload.find({
        collection: 'statements',
        limit: 10,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: true,
          seo: true,
          updatedAt: true,
          createdAt: true,
        },
      }),
      payload.find({
        collection: 'plans',
        limit: 10,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: true,
          details: true,
          assets: true,
          updatedAt: true,
          createdAt: true,
        },
      }),
      payload.find({
        collection: 'initiatives',
        limit: 10,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: true,
          details: true,
          assets: true,
          updatedAt: true,
          createdAt: true,
        },
      }),
      payload.find({
        collection: 'hospitalities',
        limit: 10,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: true,
          details: true,
          assets: true,
          updatedAt: true,
          createdAt: true,
        },
      }),
    ])

    return {
      identity: identityGlobal,
      statements: statements.docs as Statement[],
      plans: plans.docs as Plan[],
      initiatives: initiatives.docs as Initiative[],
      hospitalities: hospitalities.docs as Hospitality[],
    }
  },
  ['about-page-data'],
  { revalidate: 3600, tags: ['about'] }
)

export default async function AboutPage() {
  const { identity, statements, plans, initiatives, hospitalities } = await getAboutData()

  const identityFeatures = [
    {
      id: 'identity-mission',
      title: 'Our Mission',
      description: identity.mission || 'Driving excellence in motorsport through innovation and integrity.',
      stats: [
        { label: 'Vision', value: identity.vision || 'To be the global leader in racing excellence.' },
      ],
    },
  ]

  const statementSlides = statements.map((statement: Statement) => {
    const imageUrl = statement.seo?.image
      ? getMediaUrl(statement.seo.image)
      : `https://picsum.photos/seed/${statement.slug}/800/600`
    return {
      id: String(statement.id),
      title: statement.name,
      description: statement.basics?.description || undefined,
      image: imageUrl,
      meta: statement.basics?.status || undefined,
      tags: statement.tags ? statement.tags.map((tag: any) => typeof tag === 'object' ? tag.name : String(tag)) : undefined,
      ctaLabel: 'Read Statement',
      ctaHref: `/about/statements/${statement.slug}`,
    }
  })

  const planEntries = plans.map((plan: Plan) => ({
    id: String(plan.id),
    title: plan.name,
    subtitle: plan.basics?.tagline || plan.basics?.description || undefined,
    status: plan.details?.status || undefined,
    tag: plan.details?.scope || plan.basics?.identifiers?.code || undefined,
    href: `/about/plans/${plan.slug}`,
    timestamp: plan.details?.start_date || undefined,
  }))

  const initiativeItems = initiatives.map((initiative: Initiative) => {
    const imageUrl = initiative.assets?.thumbnail
      ? getMediaUrl(initiative.assets.thumbnail)
      : initiative.assets?.cover
        ? getMediaUrl(initiative.assets.cover)
        : `https://picsum.photos/seed/${initiative.slug}/400/300`
    return {
      id: String(initiative.id),
      title: initiative.name,
      subtitle: initiative.basics?.mission || initiative.basics?.tagline || undefined,
      image: imageUrl,
      href: `/about/initiatives/${initiative.slug}`,
    }
  })

  const hospitalityEntries = hospitalities.map((hospitality: Hospitality) => ({
    id: String(hospitality.id),
    title: hospitality.name,
    subtitle: hospitality.basics?.tagline || hospitality.basics?.description || undefined,
    status: hospitality.details?.status || undefined,
    tag: hospitality.details?.type || hospitality.basics?.identifiers?.code || undefined,
    href: `/about/hospitalities/${hospitality.slug}`,
    timestamp: hospitality.details?.start_date || undefined,
  }))

  return (
    <main className="w-full">
      {identityFeatures.length > 0 && (
        <FeatureSection
          id="about-identity"
          title="Our Identity"
          subtitle="Who we are and what we stand for"
          features={identityFeatures}
          labels={{
            specIndex: 'ID',
            statsLabel: 'INFO',
            ctaLabel: 'LEARN',
          }}
          columns={2}
          headerVariant={1}
          footerVariant={1}
        />
      )}
      {statementSlides.length > 0 && (
        <CarouselSection
          id="about-statements"
          slides={statementSlides}
          autoplayDelay={5000}
        />
      )}
      {planEntries.length > 0 && (
        <ListSection
          id="about-plans"
          title="Strategic Plans"
          subtitle="Our roadmap for the future"
          entries={planEntries}
          labels={{
            statusPrefix: 'STAT',
            timePrefix: 'DATE',
            indexPrefix: 'PLN',
          }}
          showStatus={true}
          showTimestamp={true}
          headerVariant={1}
          footerVariant={1}
          ctaLabel="View All Plans"
          ctaPath="/about/plans"
        />
      )}
      {initiativeItems.length > 0 && (
        <GridSection
          id="about-initiatives"
          title="Initiatives"
          subtitle="Programs we support and champion"
          items={initiativeItems}
          labels={{
            unitsCount: 'INIT',
            viewProject: 'VIEW',
            sectionIndex: 'INI',
            fallbackAlt: 'Initiative',
          }}
          columns={3}
        />
      )}
      {hospitalityEntries.length > 0 && (
        <ListSection
          id="about-hospitalities"
          title="Hospitality Experiences"
          subtitle="Premium trackside experiences"
          entries={hospitalityEntries}
          labels={{
            statusPrefix: 'STAT',
            timePrefix: 'DATE',
            indexPrefix: 'HSP',
          }}
          showStatus={true}
          showTimestamp={true}
          headerVariant={1}
          footerVariant={1}
          ctaLabel="Explore Hospitality"
          ctaPath="/about/hospitalities"
        />
      )}
    </main>
  )
}