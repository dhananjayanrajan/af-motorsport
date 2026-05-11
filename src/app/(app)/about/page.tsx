// app/(frontend)/about/page.tsx
import CarouselSection, { CarouselSlide } from '@/components/Section/Blocks/CarouselSection'
import ExpandSection, { ScrollItem } from '@/components/Section/Blocks/ExpandSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import TextRevealSection from '@/components/Section/Blocks/TextRevealSection'
import TimelineSection from '@/components/Section/Blocks/TimelineSection'
import { Identity, Leader, Media, Statement, Tag, Timeline } from '@/payload-types'
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

    const [identityGlobal, timelines, statements] = await Promise.all([
      payload.findGlobal({
        slug: 'identity',
        select: {
          mission: true,
          vision: true,
          story: true,
          visual: {
            wordmark: true,
            logo: true,
            logoInverted: true,
          },
          leadership: true,
        },
      }) as unknown as Promise<Identity>,
      payload.find({
        collection: 'timelines',
        where: {
          'details.status': { equals: 'active' },
        },
        limit: 8,
        sort: 'details.start_date',
        depth: 1,
        select: {
          id: true,
          name: true,
          slug: true,
          basics: {
            description: true,
          },
          details: {
            start_date: true,
            end_date: true,
            scope: true,
            color_scheme: true,
          },
          assets: {
            thumbnail: true,
            cover: true,
          },
        },
      }),
      payload.find({
        collection: 'statements',
        limit: 8,
        depth: 1,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: {
            description: true,
            status: true,
            statement: true,
          },
          seo: {
            image: true,
          },
          tags: true,
        },
      }),
    ])

    return {
      identity: identityGlobal,
      timelines: timelines.docs as Timeline[],
      statements: statements.docs as Statement[],
    }
  },
  ['about-page-data'],
  { revalidate: 3600, tags: ['about'] }
)

export default async function AboutPage() {
  const { identity, timelines, statements } = await getAboutData()

  const backgroundImageUrl =
    getMediaUrl(identity.visual?.logoInverted) ||
    getMediaUrl(identity.visual?.wordmark) ||
    getMediaUrl(identity.visual?.logo) ||
    undefined

  const manifestContent = [identity.mission, identity.vision]
    .filter(Boolean)
    .join('\n\n')

  const leadershipItems: ScrollItem[] = (identity.leadership || [])
    .filter((leader): leader is Leader => typeof leader === 'object' && leader !== null)
    .map((leader) => ({
      id: `leader-${leader.id}`,
      title: `${leader.first_name} ${leader.last_name}`,
      description: leader.basics?.title || leader.details?.vision || '',
      image:
        getMediaUrl(leader.assets?.avatar) ||
        getMediaUrl(leader.assets?.cover) ||
        '',
    }))

  const statementSlides: CarouselSlide[] = statements.map((statement) => {
    const tagNames = (statement.tags || [])
      .filter((tag): tag is Tag => typeof tag === 'object' && tag !== null)
      .map((tag) => tag.name)

    return {
      id: `statement-${statement.id}`,
      title: statement.name,
      description: statement.basics?.description || '',
      image: getMediaUrl(statement.seo?.image) || '',
      ctaLabel: 'READ',
      ctaHref: statement.slug ? `/about/statements/${statement.slug}` : undefined,
      meta: statement.basics?.status || 'PUBLISHED',
      tags: tagNames,
    }
  })

  const timelineEvents = timelines.map((timeline) => {
    const startDate = timeline.details?.start_date
    const dateStr = startDate
      ? new Date(startDate).toISOString().split('T')[0]
      : 'TBD'
    return {
      id: `timeline-${timeline.id}`,
      date: dateStr,
      title: timeline.name,
      description:
        timeline.basics?.description || timeline.details?.scope || undefined,
      status: 'active' as const,
      slug: `calendar/timelines/${timeline.slug}`,
      image: resolveAssetUrl(timeline.assets, 'thumbnail', 'cover'),
    }
  })

  return (
    <main className="w-full">
      <HeroSection
        id="about-hero"
        title="About"
        subtitle="AF MOTORSPORT"
        description={
          identity.mission ||
          'Advancing the standards of professional competition.'
        }
        badge="EST. 2026"
        alignment="left"
        backgroundImage={backgroundImageUrl}
      />
      {manifestContent.length > 0 && (
        <TextRevealSection
          id="about-manifest"
          title="MANIFEST"
          subtitle="our mission and vision"
          content={manifestContent}
          headerVariant={1}
        />
      )}
      {leadershipItems.length > 0 && (
        <ExpandSection
          id="about-leadership"
          title="LEADERSHIP"
          subtitle="The visionaries behind the organization"
          items={leadershipItems}
          labels={{
            indexPrefix: 'EXEC',
            progressLabel: 'Progress',
            statusComplete: 'COMMAND',
          }}
          variant="sticky"
          headerVariant={1}
          footerVariant={1}
        />
      )}
      {statementSlides.length > 0 && (
        <CarouselSection
          id="about-statements"
          slides={statementSlides}
          ctaLabel="ALL STATEMENTS"
          ctaPath="/about/statements"
          itemsToScroll={3}
        />
      )}
      {timelineEvents.length > 0 && (
        <TimelineSection
          id="about-timelines"
          title="TIMELINES"
          subtitle="Active event timelines and milestones"
          events={timelineEvents}
          labels={{
            statusPrefix: 'STATUS',
            eventIndexLabel: 'TIMELINE',
            deploymentStatus: {
              completed: 'ARCHIVED',
              active: 'ACTIVE',
              upcoming: 'PLANNED',
            },
          }}
          headerVariant={1}
          footerVariant={1}
        />
      )}
    </main>
  )
}