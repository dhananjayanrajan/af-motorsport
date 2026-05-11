// app/(frontend)/contact/page.tsx
import HeroSection from '@/components/Section/Blocks/HeroSection'
import MapSection from '@/components/Section/Blocks/MapSection'
import PanelSection, { Panel } from '@/components/Section/Blocks/PanelSection'
import { Identity, Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
  if (!media) return undefined
  if (typeof media === 'object' && 'url' in media && media.url) return media.url
  return undefined
}

const getContactData = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    const identityGlobal = (await payload.findGlobal({
      slug: 'identity',
      select: {
        visual: {
          wordmark: true,
          logo: true,
          logoInverted: true,
        },
      },
    })) as Identity

    return { identity: identityGlobal }
  },
  ['contact-page-data'],
  { revalidate: 3600, tags: ['contact'] }
)

export default async function ContactPage() {
  const { identity } = await getContactData()

  const heroActions = [
    {
      label: 'Send Message',
      href: 'mailto:shiva@moraccle.com',
      variant: 'primary' as const,
    },
  ]

  const backgroundImageUrl =
    getMediaUrl(identity.visual?.logoInverted) ||
    getMediaUrl(identity.visual?.wordmark) ||
    getMediaUrl(identity.visual?.logo) ||
    undefined

  const contactPanels: Panel[] = [
    {
      id: 'general-support',
      title: 'Operations Support',
      summary:
        'Primary contact for general inquiries and operational support',
      content: (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold uppercase text-neutral-500">
              Network Address
            </span>
            <span className="text-xl font-bold text-primary-500 uppercase tracking-tight">
              shiva@moraccle.com
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold uppercase text-neutral-500">
              Availability
            </span>
            <span className="text-xl font-bold text-neutral-200 uppercase tracking-tight">
              09:00 - 18:00 EST
            </span>
          </div>
        </div>
      ),
      metadata: {
        Status: 'Online',
        'Response Time': '< 24 Hours',
        Priority: 'High',
      },
    },
    {
      id: 'technical-division',
      title: 'Technical Division',
      summary:
        'For engineering inquiries regarding the racing platform and data structures',
      content: (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold uppercase text-neutral-500">
              Engineering Protocol
            </span>
            <span className="text-xl font-bold text-primary-500 uppercase tracking-tight">
              dev@moraccle.com
            </span>
          </div>
        </div>
      ),
      metadata: {
        Domain: 'Engineering',
        Security: 'Encrypted',
        Level: 'L3 Support',
      },
    },
    {
      id: 'media-accreditation',
      title: 'Media Relations',
      summary: 'Accreditation requests for press and content creators',
      content: (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold uppercase text-neutral-500">
              Press Channel
            </span>
            <span className="text-xl font-bold text-primary-500 uppercase tracking-tight">
              media@moraccle.com
            </span>
          </div>
        </div>
      ),
      metadata: {
        Access: 'Public',
        Vetting: 'Required',
        Format: 'Digital',
      },
    },
  ]

  const locations = [
    {
      id: 'hq-01',
      name: 'Global Headquarters',
      lat: 40.7128,
      lng: -74.006,
      description:
        'Primary administrative and technical operations hub',
      address: '123 Racing Avenue, New York, NY 10001',
      slug: 'contact',
    },
  ]

  return (
    <main className="w-full bg-background">
      <HeroSection
        id="contact-init"
        title="Communication Hub"
        subtitle="Operational Interface"
        description="Establish a direct link with our administrative and technical divisions for rapid response coordination."
        actions={heroActions}
        alignment="center"
        badge="Live Status"
        backgroundImage={backgroundImageUrl}
      />

      <PanelSection
        id="department-selection"
        title="Inquiry Channels"
        subtitle="Select the appropriate department for coordination"
        panels={contactPanels}
        labels={{
          expansionState: {
            open: 'Active Interface',
            closed: 'Ready to Connect',
          },
          metadataTitle: 'Node Details',
        }}
        allowMultiple={false}
        headerVariant={1}
        footerVariant={1}
      />

      <MapSection
        id="physical-coordinates"
        title="Global Base"
        subtitle="Physical operational headquarters"
        locations={locations}
        labels={{
          hqLabel: 'Base',
          intelLabel: 'Info',
          routeLabel: 'Path',
          timeLabel: 'Local',
          distLabel: 'Range',
          recordLabel: 'Open',
          filterLabels: {
            all: 'View All',
            primary: 'Default',
            satellite: 'Orbital',
            pathing: 'Vectors',
          },
        }}
        zoom={14}
        headerVariant={2}
        footerVariant={1}
      />
    </main>
  )
}