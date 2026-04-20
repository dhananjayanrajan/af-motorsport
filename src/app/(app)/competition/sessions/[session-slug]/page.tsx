// /var/www/clients/afmotor/af-motorsport/src/app/(app)/competition/sessions/[session-slug]/page.tsx

import { notFound } from 'next/navigation';
import SlugHero from '../../sections/Slug/Hero';
import SlugList from '../../sections/Slug/List';
import SlugOverview from '../../sections/Slug/Overview';

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{
        'session-slug': string;
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

export default async function SessionPage({ params }: PageProps) {
    const { 'session-slug': slug } = await params;
    const url = process.env.PAYLOAD_PUBLIC_SERVER_URL;

    const sessionData = await safeFetch(`${url}/api/sessions?where[slug][equals]=${slug}&depth=3`);
    const session = sessionData.docs?.[0];

    if (!session) {
        notFound();
    }

    const event = session.details?.event && typeof session.details.event !== 'number'
        ? session.details.event
        : null;

    const season = event?.details?.season && typeof event.details.season !== 'number'
        ? event.details.season
        : null;

    const series = season?.details?.series && typeof season.details.series !== 'number'
        ? season.details.series
        : null;

    const entriesData = await safeFetch(`${url}/api/entries?where[details.session][equals]=${session.id}&sort=details.finish_position&depth=2`);
    const entries = entriesData.docs || [];

    const coverImage = session.assets?.thumbnail && typeof session.assets.thumbnail !== 'number'
        ? session.assets.thumbnail.url
        : event?.assets?.cover && typeof event.assets.cover !== 'number'
            ? event.assets.cover.url
            : null;

    const sessionDate = session.updatedAt?.split('T')[0] || 'TBD';
    const laps = session.metrics?.quantifiers?.laps;
    const duration = session.metrics?.quantifiers?.duration;
    const distance = session.metrics?.quantifiers?.distance;

    const entryItems = entries.map((entry: any) => {
        const entryNumber = entry.basics?.identifiers?.number || entry.basics?.identifiers?.plate || '00';

        return {
            id: entry.id,
            name: entry.name,
            slug: entry.slug,
            image: entry.assets?.thumbnail && typeof entry.assets.thumbnail !== 'number' ? entry.assets.thumbnail.url : null,
            badge: `#${entryNumber}`,
            year: entry.details?.grid_position?.toString() || entry.details?.start_position?.toString() || '--',
            tagline: entry.basics?.description || 'COMPETITOR',
            description: `${entry.name} entry details and performance metrics.`,
            metrics: [
                { label: 'POS', value: entry.details?.finish_position?.toString() || entry.details?.laps_position?.toString() || 'TBD' },
                { label: 'STATUS', value: entry.details?.status || 'Entered' }
            ]
        };
    });

    const metrics = [];
    if (laps) metrics.push({ label: 'LAPS', value: laps });
    if (duration) metrics.push({ label: 'DURATION', value: `${duration}min` });
    if (distance) metrics.push({ label: 'DISTANCE', value: `${distance}km` });

    return (
        <main className="min-h-screen bg-white">
            <SlugHero
                title={session.name}
                alias={session.alias}
                identifier={session.basics?.identifiers?.code || session.basics?.segment}
                establishedYear={sessionDate}
                status={session.details?.access || 'Public'}
                access={session.details?.access}
                coverImage={coverImage || undefined}
                logoImage={series?.assets?.logo && typeof series.assets.logo !== 'number' ? series.assets.logo.url : undefined}
            />

            <SlugOverview
                title={session.name}
                description={session.basics?.description}
                identifier={session.basics?.identifiers?.code}
                alias={session.alias}
                status={session.details?.access || 'Public'}
                scope={event?.name || 'Event'}
                revision={session.basics?.segment || 'Session'}
                recordDate={session.updatedAt?.split('T')[0]}
                coverImage={coverImage || undefined}
                stats={metrics.length > 0 ? metrics : undefined}
            />

            {entries.length > 0 && (
                <SlugList
                    items={entryItems}
                    title="ENTRIES"
                    emptyMessage="No entries found for this session"
                    basePath="competition/sessions"
                    parentSlug={session.slug}
                    entityKey="entry"
                />
            )}
        </main>
    );
}