import { notFound } from 'next/navigation';
import CelebrationsSection from '../../driver/[driver-slug]/sections/Celebration';
import MeetupsSection from '../../driver/[driver-slug]/sections/Meetups';
import OrganizationsSection from '../../sections/Organizations';
import AutographSection from './sections/Autograph';
import AwardSection from './sections/Award';
import GallerySection from './sections/Gallery';
import HeroSection from './sections/Hero';
import InterviewsSection from './sections/Interviews';
import QuoteSection from './sections/Quote';

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{
        slug: string;
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

export default async function LeaderPage({ params }: PageProps) {
    const { slug } = await params;
    const url = process.env.PAYLOAD_PUBLIC_SERVER_URL;

    const leaderData = await safeFetch(`${url}/api/leaders?where[slug][equals]=${slug}&depth=2`);
    const leader = leaderData.docs?.[0];

    if (!leader) {
        return notFound();
    }

    const [celebrationsData, interviewsData, meetupsData, orgsData] = await Promise.all([
        safeFetch(`${url}/api/celebrations?where[basics.leader][equals]=${leader.id}&depth=1`),
        safeFetch(`${url}/api/interviews?where[basics.leader][equals]=${leader.id}&depth=1`),
        safeFetch(`${url}/api/meetups?limit=100&depth=2`),
        safeFetch(`${url}/api/organizations?limit=100`)
    ]);

    const filteredMeetups = (meetupsData.docs || []).filter((meetup: any) => {
        const attendeeIds = meetup.details?.attendees?.leaders?.map((l: any) =>
            typeof l === 'object' ? String(l.id) : String(l)
        );
        return attendeeIds?.includes(String(leader.id));
    });

    return (
        <main className="w-full">
            <section><HeroSection leader={leader} /></section>
            <section><QuoteSection leader={leader} /></section>
            <section><AwardSection leader={leader} /></section>
            <section><AutographSection leader={leader} /></section>
            <section><CelebrationsSection data={celebrationsData.docs || []} /></section>
            <section><InterviewsSection data={interviewsData.docs || []} /></section>
            <section><MeetupsSection data={filteredMeetups} /></section>
            <section><OrganizationsSection organizations={orgsData.docs || []} /></section>
            <section><GallerySection leader={leader} /></section>
        </main>
    );
}