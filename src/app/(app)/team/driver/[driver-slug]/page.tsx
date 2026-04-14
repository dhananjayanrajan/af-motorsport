// page.tsx
import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { notFound } from 'next/navigation';
import OrganizationsSection from '../../sections/Organizations';
import AutographSection from './sections/Autograph';
import AwardSection from './sections/Award';
import CarsSection from './sections/Cars';
import CelebrationsSection from './sections/Celebration';
import GallerySection from './sections/Gallery';
import InfoSection from './sections/Info';
import InterviewsSection from './sections/Interviews';
import MeetupsSection from './sections/Meetups';
import MembersSection from './sections/Members';
import QuoteSection from './sections/Quote';
import SkillsSection from './sections/Skills';
import StatSection from './sections/Stats';
import VideoSection from './sections/Video';

interface PageProps {
    params: Promise<{
        'driver-slug': string;
    }>;
}

export default async function DriverPage({ params }: PageProps) {
    const { 'driver-slug': driverSlug } = await params;
    const payload = await getPayloadHMR({ config: configPromise });

    const driverResult = await payload.find({
        collection: 'drivers',
        where: {
            slug: { equals: driverSlug },
        },
        depth: 3, // Increased depth to 3 to resolve Members inside Cars
    });

    const driver = driverResult.docs[0];
    if (!driver) notFound();

    // The cars associated with the driver
    const driverCars = (driver.details?.cars || []) as any[];

    const allMeetups = await payload.find({
        collection: 'meetups',
        limit: 100,
        depth: 2,
    });

    const filteredMeetups = allMeetups.docs.filter(meetup => {
        const attendeeIds = meetup.details.attendees?.drivers?.map(d =>
            typeof d === 'object' ? String(d.id) : String(d)
        );
        return attendeeIds?.includes(String(driver.id));
    });

    const orgsRes = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/organizations?limit=100`, { next: { revalidate: 3600 } });
    const orgsData = orgsRes.ok ? await orgsRes.json() : { docs: [] };

    return (
        <main className="min-h-screen">
            <section><VideoSection driver={driver} /></section>
            <section><QuoteSection driver={driver} /></section>
            <section><StatSection driver={driver} /></section>
            <section><InfoSection driver={driver} /></section>
            <section><CarsSection driver={driver} /></section>
            <section><MembersSection cars={driverCars} /></section>
            <section><AwardSection driver={driver} /></section>
            <section><SkillsSection driver={driver} /></section>
            <section><AutographSection driver={driver} /></section>
            <section><CelebrationsSection data={[]} /></section>
            <section><InterviewsSection data={[]} /></section>
            <section><MeetupsSection data={filteredMeetups} /></section>
            <section><OrganizationsSection organizations={orgsData.docs} /></section>
            <section><GallerySection driver={driver} /></section>
        </main>
    );
}