import { notFound } from 'next/navigation';
import CelebrationsSection from '../../driver/[driver-slug]/sections/Celebration';
import AutographSection from './sections/Autograph';
import AwardSection from './sections/Award';
import GallerySection from './sections/Gallery';
import HeroSection from './sections/Hero';
import InfoSection from './sections/Info';
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

    const [celebrationsData] = await Promise.all([
        safeFetch(`${url}/api/celebrations?where[basics.leader][equals]=${leader.id}&depth=1`),
    ]);

    return (
        <main className="w-full">
            <section><HeroSection leader={leader} /></section>
            <section><QuoteSection leader={leader} /></section>
            <section><InfoSection leader={leader} /></section>
            <section><AutographSection leader={leader} /></section>
            <section><AwardSection leader={leader} /></section>
            <section><CelebrationsSection data={celebrationsData.docs || []} /></section>
            <section><GallerySection leader={leader} /></section>
        </main>
    );
}