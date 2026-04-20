// /var/www/clients/afmotor/af-motorsport/src/app/(app)/competition/events/[event-slug]/page.tsx

import { notFound } from 'next/navigation';
import SlugHero from '../../sections/Slug/Hero';
import SlugList from '../../sections/Slug/List';
import SlugOverview from '../../sections/Slug/Overview';

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{
        'event-slug': string;
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

export default async function EventPage({ params }: PageProps) {
    const { 'event-slug': slug } = await params;
    const url = process.env.PAYLOAD_PUBLIC_SERVER_URL;

    const eventData = await safeFetch(`${url}/api/events?where[slug][equals]=${slug}&depth=2`);
    const event = eventData.docs?.[0];

    if (!event) {
        notFound();
    }

    const season = event.details?.season && typeof event.details.season !== 'number'
        ? event.details.season
        : null;

    const series = season?.details?.series && typeof season.details.series !== 'number'
        ? season.details.series
        : null;

    const sessionsData = await safeFetch(`${url}/api/sessions?where[details.event][equals]=${event.id}&sort=details.start_date&depth=2`);
    const sessions = sessionsData.docs || [];

    const entriesData = await safeFetch(`${url}/api/entries?where[details.session.event][equals]=${event.id}&depth=2&limit=100`);
    const entries = entriesData.docs || [];

    const coverImage = event.assets?.cover && typeof event.assets.cover !== 'number'
        ? event.assets.cover.url
        : null;

    const eventDate = event.details?.start_date
        ? new Date(event.details.start_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        : 'TBD';

    const sessionItems = sessions.map((session: any) => ({
        id: session.id,
        name: session.name,
        slug: session.slug,
        image: session.assets?.thumbnail && typeof session.assets.thumbnail !== 'number' ? session.assets.thumbnail.url : null,
        badge: session.basics?.identifiers?.code || session.basics?.segment || 'SES',
        year: session.details?.specification || session.metrics?.quantifiers?.duration ? `${session.metrics?.quantifiers?.duration || ''}min` : '--',
        tagline: session.basics?.segment || 'SESSION',
        description: session.basics?.description || `${session.name} session schedule and results.`,
        metrics: session.metrics?.quantifiers?.laps
            ? [{ label: 'LAPS', value: session.metrics.quantifiers.laps }]
            : []
    }));

    const entryItems = entries.slice(0, 12).map((entry: any) => {
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

    return (
        <main className="min-h-screen bg-white">
            <SlugHero
                title={event.name}
                alias={event.alias}
                identifier={event.basics?.identifiers?.code}
                establishedYear={eventDate}
                status={event.details?.status}
                access={event.details?.access}
                coverImage={coverImage || undefined}
                logoImage={series?.assets?.logo && typeof series.assets.logo !== 'number' ? series.assets.logo.url : undefined}
            />

            <SlugOverview
                title={event.name}
                description={event.basics?.description}
                identifier={event.basics?.identifiers?.code}
                alias={event.alias}
                status={event.details?.status}
                scope={season?.name || 'Season'}
                revision={event.details?.start_date ? new Date(event.details.start_date).getFullYear().toString() : 'Current'}
                recordDate={event.updatedAt?.split('T')[0]}
                coverImage={coverImage || undefined}
                regulationsLink={undefined}
            />

            {sessions.length > 0 && (
                <SlugList
                    items={sessionItems}
                    title="SESSIONS"
                    emptyMessage="No sessions found for this event"
                    basePath="competition/events"
                    parentSlug={event.slug}
                    entityKey="session"
                />
            )}

            {entries.length > 0 && (
                <SlugList
                    items={entryItems}
                    title="ENTRIES"
                    emptyMessage="No entries found for this event"
                    basePath="competition/events"
                    parentSlug={event.slug}
                    entityKey="entry"
                />
            )}
        </main>
    );
}