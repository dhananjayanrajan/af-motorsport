import HeroSection from '@/components/Section/Blocks/HeroSection'
import MapSection from '@/components/Section/Blocks/MapSection'
import PanelSection from '@/components/Section/Blocks/PanelSection'

export default function ContactPage() {
  const heroActions = [{ label: 'Send Message', href: 'mailto:shiva@moraccle.com', variant: 'primary' as const }]

  const contactPanels = [
    {
      id: 'general-support',
      title: 'Operations Support',
      summary: 'Primary contact for general inquiries and operational support',
      content: (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-mono uppercase text-white-pure/40">Network Address</span>
            <span className="text-lg font-mono text-white-pure">shiva@moraccle.com</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono uppercase text-white-pure/40">Availability</span>
            <span className="text-lg font-mono text-white-pure">09:00 - 18:00 EST</span>
          </div>
        </div>
      ),
    },
    {
      id: 'technical-division',
      title: 'Technical Division',
      summary: 'For engineering inquiries regarding the racing platform and data structures',
      content: (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-mono uppercase text-white-pure/40">Engineering Protocol</span>
            <span className="text-lg font-mono text-white-pure">dev@moraccle.com</span>
          </div>
        </div>
      ),
    },
    {
      id: 'media-accreditation',
      title: 'Media Relations',
      summary: 'Accreditation requests for press and content creators',
      content: (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-mono uppercase text-white-pure/40">Press Channel</span>
            <span className="text-lg font-mono text-white-pure">media@moraccle.com</span>
          </div>
        </div>
      ),
    },
  ]

  const locations = [
    {
      id: 'hq-01',
      name: 'Global Headquarters',
      lat: 40.7128,
      lng: -74.006,
      description: 'Primary administrative and technical operations hub',
      address: '123 Racing Avenue, New York, NY 10001',
    },
  ]

  return (
    <main className="w-full bg-black-pure">
      <HeroSection
        id="contact-init"
        title="Communication Hub"
        subtitle="Operational Interface"
        description="Establish a direct link with our administrative and technical divisions for rapid response coordination."
        actions={heroActions}
        alignment="center"
        badge="Live Status"
      />
      <PanelSection
        id="department-selection"
        title="Inquiry Channels"
        subtitle="Select the appropriate department for coordination"
        panels={contactPanels}
        labels={{
          expansionState: { open: 'Active', closed: 'Idle' },
          metadataTitle: 'Interface',
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