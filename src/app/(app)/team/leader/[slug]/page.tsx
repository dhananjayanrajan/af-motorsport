// app/(app)/leaders/[slug]/page.tsx
import { Celebration, Interview, Leader, Meetup } from '@/payload-types';
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

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function LeaderPage({ params }: PageProps) {
    const { slug } = await params;
    const leader = await fetchLeaderBySlug(slug);

    if (!leader) {
        return notFound();
    }

    const [celebrations, interviews, meetups] = await Promise.all([
        fetchCelebrations(leader.id),
        fetchInterviews(leader.id),
        fetchMeetups(leader.id),
    ]);

    const orgsRes = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/organizations?limit=100`, { next: { revalidate: 3600 } });
    const orgsData = orgsRes.ok ? await orgsRes.json() : { docs: [] };

    return (
        <main className="w-full">
            <section><HeroSection leader={leader} /></section>
            <section><QuoteSection leader={leader} /></section>
            <section><AwardSection leader={leader} /></section>
            <section><AutographSection leader={leader} /></section>
            <section><CelebrationsSection data={celebrations} /></section>
            <section><InterviewsSection data={interviews} /></section>
            <section><MeetupsSection data={meetups} /></section>
            <section><OrganizationsSection organizations={orgsData.docs} /></section>
            <section><GallerySection leader={leader} /></section>
        </main>
    );
}

async function fetchLeaderBySlug(slug: string): Promise<Leader | null> {
    const res = await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/leaders?where[slug][equals]=${slug}&depth=2`,
        { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.docs[0] || null;
}

async function fetchCelebrations(leaderId: number): Promise<Celebration[]> {
    const res = await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/celebrations?where[basics.leader][equals]=${leaderId}&depth=1`,
        { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.docs;
}

async function fetchInterviews(leaderId: number): Promise<Interview[]> {
    const res = await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/interviews?where[basics.leader][equals]=${leaderId}&depth=1`,
        { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.docs;
}

async function fetchMeetups(leaderId: number): Promise<Meetup[]> {
    const res = await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/meetups?limit=100&depth=2`,
        { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();

    return data.docs.filter((meetup: Meetup) => {
        const attendeeIds = meetup.details?.attendees?.leaders?.map((l: any) =>
            typeof l === 'object' ? String(l.id) : String(l)
        );
        return attendeeIds?.includes(String(leaderId));
    });
}