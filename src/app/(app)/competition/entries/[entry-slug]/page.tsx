// /var/www/clients/afmotor/af-motorsport/src/app/(app)/competition/entries/[entry-slug]/page.tsx

import { notFound } from 'next/navigation';
import SlugHero from '../../sections/Slug/Hero';
import SlugOverview from '../../sections/Slug/Overview';

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{
        'entry-slug': string;
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

export default async function EntryPage({ params }: PageProps) {
    const { 'entry-slug': slug } = await params;
    const url = process.env.PAYLOAD_PUBLIC_SERVER_URL;

    const entryData = await safeFetch(`${url}/api/entries?where[slug][equals]=${slug}&depth=3`);
    const entry = entryData.docs?.[0];

    if (!entry) {
        notFound();
    }

    const session = entry.details?.session && typeof entry.details.session !== 'number'
        ? entry.details.session
        : null;

    const event = session?.details?.event && typeof session.details.event !== 'number'
        ? session.details.event
        : null;

    const season = event?.details?.season && typeof event.details.season !== 'number'
        ? event.details.season
        : null;

    const series = season?.details?.series && typeof season.details.series !== 'number'
        ? season.details.series
        : null;

    const coverImage = entry.assets?.thumbnail && typeof entry.assets.thumbnail !== 'number'
        ? entry.assets.thumbnail.url
        : session?.assets?.thumbnail && typeof session.assets.thumbnail !== 'number'
            ? session.assets.thumbnail.url
            : null;

    const entryNumber = entry.basics?.identifiers?.number || entry.basics?.identifiers?.plate || '00';
    const gridPos = entry.details?.grid_position;
    const startPos = entry.details?.start_position;
    const finishPos = entry.details?.finish_position;
    const lapsPos = entry.details?.laps_position;

    const stats = [
        { label: 'NUMBER', value: `#${entryNumber}` },
        { label: 'STATUS', value: entry.details?.status || 'Entered' },
        { label: 'GRID', value: gridPos ? gridPos.toString() : '--' },
        { label: 'START', value: startPos ? startPos.toString() : '--' },
    ];

    if (finishPos) stats.push({ label: 'FINISH', value: finishPos.toString() });
    if (lapsPos) stats.push({ label: 'LAPS POS', value: lapsPos.toString() });

    return (
        <main className="min-h-screen bg-white">
            <SlugHero
                title={entry.name}
                alias={entry.alias}
                identifier={entryNumber}
                establishedYear={entry.updatedAt?.split('T')[0] || '2026'}
                status={entry.details?.status || 'Entered'}
                access={session?.details?.access || 'Public'}
                coverImage={coverImage || undefined}
                logoImage={series?.assets?.logo && typeof series.assets.logo !== 'number' ? series.assets.logo.url : undefined}
            />

            <SlugOverview
                title={entry.name}
                description={entry.basics?.description}
                identifier={entryNumber}
                alias={entry.alias}
                status={entry.details?.status || 'Entered'}
                scope={session?.name || 'Session'}
                revision={event?.name || 'Event'}
                recordDate={entry.updatedAt?.split('T')[0]}
                coverImage={coverImage || undefined}
                stats={stats}
            />
        </main>
    );
}