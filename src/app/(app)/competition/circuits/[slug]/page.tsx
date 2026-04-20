import { notFound } from 'next/navigation';
import CircuitDocuments from './sections/Documents';
import CircuitStatGrid from './sections/Grid';
import CircuitHero from './sections/Hero';
import TopographicHistory from './sections/History';
import LapRecordArchive from './sections/Record';
import PhysicalSpecs from './sections/Specs';
import CircuitStatement from './sections/Statement';

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

export default async function CircuitPage({ params }: PageProps) {
    const { slug } = await params;
    const url = process.env.PAYLOAD_PUBLIC_SERVER_URL;

    const circuitData = await safeFetch(`${url}/api/circuits?where[slug][equals]=${slug}&depth=2`);
    const circuit = circuitData.docs?.[0];

    if (!circuit) {
        notFound();
    }

    const historyData = await safeFetch(`${url}/api/races?where[details.circuit][equals]=${circuit.id}&sort=-details.start_date&depth=1`);

    return (
        <main className="min-h-screen bg-white">
            <CircuitHero circuit={circuit} />
            <PhysicalSpecs circuit={circuit} />
            <TopographicHistory circuit={circuit} />
            <CircuitDocuments circuit={circuit} />
            <LapRecordArchive circuit={circuit} />
            <CircuitStatement circuit={circuit} />
            <CircuitStatGrid circuit={circuit} />
        </main>
    );
}