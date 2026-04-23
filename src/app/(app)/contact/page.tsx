// app/(frontend)/contact/page.tsx
import HeroSection from '@/components/Section/Blocks/HeroSection'
import MapSection from '@/components/Section/Blocks/MapSection'
import PanelSection from '@/components/Section/Blocks/PanelSection'

export default function ContactPage() {
  const heroActions = [{ label: 'Email Us', href: 'mailto:contact@example.com', variant: 'primary' as const }]

  const contactPanels = [
    {
      id: 'general',
      title: 'General Inquiries',
      summary: 'For general questions and information',
      content: <p>Email: info@example.com<br />Phone: +1 (555) 123-4567</p>,
    },
    {
      id: 'media',
      title: 'Media & Press',
      summary: 'For press releases and media accreditation',
      content: <p>Email: media@example.com<br />Phone: +1 (555) 123-4568</p>,
    },
    {
      id: 'partnership',
      title: 'Partnerships',
      summary: 'For sponsorship and partnership opportunities',
      content: <p>Email: partners@example.com<br />Phone: +1 (555) 123-4569</p>,
    },
  ]

  const locations = [
    {
      id: 'headquarters',
      name: 'Headquarters',
      lat: 40.7128,
      lng: -74.006,
      description: 'Main office location',
      address: '123 Racing Ave, New York, NY 10001',
    },
  ]

  return (
    <main className="w-full">
      <HeroSection
        id="contact-hero"
        title="Contact Us"
        subtitle="Get in touch with our team"
        description="We're here to help with any questions or inquiries."
        actions={heroActions}
        alignment="center"
      />
      <PanelSection
        id="contact-form"
        title="Send a Message"
        subtitle="Choose a department"
        panels={contactPanels}
        labels={{
          expansionState: { open: 'OPEN', closed: 'CLOSED' },
          metadataTitle: 'DETAILS',
        }}
        allowMultiple={false}
        headerVariant={1}
        footerVariant={1}
      />
      <MapSection
        id="contact-map"
        title="Our Location"
        subtitle="Visit us in person"
        locations={locations}
        labels={{
          hqLabel: 'HQ',
          intelLabel: 'INTEL',
          routeLabel: 'ROUTE',
          timeLabel: 'TIME',
          distLabel: 'DIST',
          recordLabel: 'VIEW',
          filterLabels: {
            all: 'ALL',
            primary: 'PRIMARY',
            satellite: 'SATELLITE',
            pathing: 'ROUTES',
          },
        }}
        zoom={14}
        headerVariant={2}
        footerVariant={1}
      />
    </main>
  )
}