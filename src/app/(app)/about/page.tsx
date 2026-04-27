// app/(frontend)/about/page.tsx
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

function resolveAssetUrl(assets: any, ...keys: string[]): string | undefined {
  if (!assets) return undefined
  for (const key of keys) {
    const url = getMediaUrl(assets[key])
    if (url) return url
  }
  return undefined
}

const getAboutData = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    const [identityGlobal, statements, plans, initiatives, hospitalities] = await Promise.all([
      payload.findGlobal({
        slug: 'identity',
        select: {
          mission: true,
          vision: true,
        },
      }) as Promise<Identity>,
      payload.find({
        collection: 'statements',
        limit: 10,
        depth: 1,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: {
            description: true,
            status: true,
          },
          seo: {
            image: true,
          },
          tags: true,
        },
      }),
      payload.find({
        collection: 'plans',
        limit: 10,
        depth: 1,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: {
            description: true,
            tagline: true,
            identifiers: { code: true },
          },
          details: {
            status: true,
            scope: true,
            start_date: true,
          },
        },
      }),
      payload.find({
        collection: 'initiatives',
        limit: 10,
        depth: 1,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: {
            mission: true,
            tagline: true,
          },
          assets: {
            thumbnail: true,
            cover: true,
          },
        },
      }),
      payload.find({
        collection: 'hospitalities',
        limit: 10,
        depth: 1,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: {
            description: true,
            tagline: true,
            identifiers: { code: true },
          },
          details: {
            status: true,
            type: true,
            start_date: true,
          },
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
      title: 'MISSION',
      description: identity.mission || 'Advancing the standards of professional competition through technical precision.',
      slug: 'about',
      stats: [
        { label: 'VISION', value: identity.vision || 'Global leadership in motorsport infrastructure.' },
      ],
    },
  ]

  const statementFeatures = statements.map((statement: Statement) => {
    const imageUrl = getMediaUrl(statement.seo?.image)
    return {
      id: String(statement.id),
      title: statement.name,
      description: statement.basics?.description || '',
      image: imageUrl || '',
      slug: `about/statements/${statement.slug}`,
      stats: [
        { label: 'Status', value: statement.basics?.status || 'Active' },
      ],
    }
  })

  const planEntries = plans.map((plan: Plan) => ({
    id: String(plan.id),
    title: plan.name,
    subtitle: plan.basics?.tagline || plan.basics?.description || undefined,
    status: plan.details?.status || 'ACTIVE',
    tag: plan.details?.scope || plan.basics?.identifiers?.code || 'PLAN',
    href: `/about/plans/${plan.slug}`,
    timestamp: plan.details?.start_date ? new Date(plan.details.start_date).toISOString().split('T')[0] : undefined,
  }))

  const initiativeItems = initiatives.map((initiative: Initiative) => {
    const imageUrl = resolveAssetUrl(initiative.assets, 'thumbnail', 'cover')
    return {
      id: String(initiative.id),
      title: initiative.name,
      subtitle: initiative.basics?.mission || initiative.basics?.tagline || undefined,
      image: imageUrl || '',
      href: `/about/initiatives/${initiative.slug}`,
    }
  })

  const hospitalityEntries = hospitalities.map((hospitality: Hospitality) => ({
    id: String(hospitality.id),
    title: hospitality.name,
    subtitle: hospitality.basics?.tagline || hospitality.basics?.description || undefined,
    status: hospitality.details?.status || 'OPEN',
    tag: hospitality.details?.type || hospitality.basics?.identifiers?.code || 'HSP',
    href: `/about/hospitalities/${hospitality.slug}`,
    timestamp: hospitality.details?.start_date ? new Date(hospitality.details.start_date).toISOString().split('T')[0] : undefined,
  }))

  return (
    <main className="w-full">
      {identityFeatures.length > 0 && (
        <FeatureSection
          id="about-identity"
          title="IDENTITY"
          subtitle="Core values and organizational objectives"
          features={identityFeatures}
          labels={{
            specIndex: 'ID',
            statsLabel: 'DATA',
            ctaLabel: 'VIEW',
          }}
          columns={2}
          headerVariant={1}
          footerVariant={1}
        />
      )}
      {statementFeatures.length > 0 && (
        <FeatureSection
          id="about-statements"
          title="STATEMENTS"
          subtitle="Official communications and declarations"
          features={statementFeatures}
          labels={{
            specIndex: 'STMT',
            statsLabel: 'DATA',
            ctaLabel: 'READ',
          }}
          columns={3}
          headerVariant={2}
          footerVariant={1}
        />
      )}
      {planEntries.length > 0 && (
        <ListSection
          id="about-plans"
          title="STRATEGY"
          subtitle="Long-term operational roadmap"
          entries={planEntries}
          labels={{
            statusPrefix: 'SYSTEM',
            timePrefix: 'RELEASE',
            indexPrefix: 'PLN',
          }}
          showStatus={true}
          showTimestamp={true}
          ctaLabel="VIEW ALL PLANS"
          ctaPath="/about/plans"
        />
      )}
      {initiativeItems.length > 0 && (
        <GridSection
          id="about-initiatives"
          title="PROGRAMS"
          subtitle="Active developmental initiatives"
          items={initiativeItems}
          labels={{
            unitsCount: 'INIT',
            viewProject: 'OPEN',
            sectionIndex: 'PRG',
            fallbackAlt: 'Initiative',
          }}
          columns={3}
        />
      )}
      {hospitalityEntries.length > 0 && (
        <ListSection
          id="about-hospitalities"
          title="HOSPITALITY"
          subtitle="Exclusive trackside environment network"
          entries={hospitalityEntries}
          labels={{
            statusPrefix: 'STATUS',
            timePrefix: 'UPCOMING',
            indexPrefix: 'HSP',
          }}
          showStatus={true}
          showTimestamp={true}
          ctaLabel="EXPLORE ACCESS"
          ctaPath="/about/hospitalities"
        />
      )}
    </main>
  )
}