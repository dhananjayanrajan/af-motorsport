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

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{
        'driver-slug': string;
    }>;
}

async function safeFetch(url: string) {
    try {
        const res = await fetch(url);
        if (!res.ok) return { docs: [] };
        const text = await res.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            return { docs: [] };
        }
    } catch (e) {
        return { docs: [] };
    }
}

export default async function DriverPage({ params }: PageProps) {
    const { 'driver-slug': driverSlug } = await params;
    const url = process.env.PAYLOAD_PUBLIC_SERVER_URL;

    const [driverData, meetupsData, orgsData] = await Promise.all([
        safeFetch(`${url}/api/drivers?where[slug][equals]=${driverSlug}&depth=3`),
        safeFetch(`${url}/api/meetups?limit=100&depth=2`),
        safeFetch(`${url}/api/organizations?limit=100`)
    ]);

    const driver = driverData.docs?.[0];
    if (!driver) notFound();

    const driverCars = (driver.details?.cars || []) as any[];

    const filteredMeetups = (meetupsData.docs || []).filter((meetup: any) => {
        const attendeeIds = meetup.details?.attendees?.drivers?.map((d: any) =>
            typeof d === 'object' ? String(d.id) : String(d)
        );
        return attendeeIds?.includes(String(driver.id));
    });

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
            <section><OrganizationsSection organizations={orgsData.docs || []} /></section>
            <section><GallerySection driver={driver} /></section>
        </main>
    );
}