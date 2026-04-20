// /var/www/clients/afmotor/af-motorsport/src/app/(app)/competition/seasons/[season-slug]/page.tsx

import { notFound } from 'next/navigation';
import SlugHero from '../../sections/Slug/Hero';
import SlugList from '../../sections/Slug/List';
import SlugOverview from '../../sections/Slug/Overview';
import SlugRegulations from '../../sections/Slug/Regulations';

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{
        'season-slug': string;
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

export default async function SeasonPage({ params }: PageProps) {
    const { 'season-slug': slug } = await params;
    const url = process.env.PAYLOAD_PUBLIC_SERVER_URL;

    const seasonData = await safeFetch(`${url}/api/seasons?where[slug][equals]=${slug}&depth=2`);
    const season = seasonData.docs?.[0];

    if (!season) {
        notFound();
    }

    const series = season.details?.series && typeof season.details.series !== 'number'
        ? season.details.series
        : null;

    const eventsData = await safeFetch(`${url}/api/events?where[details.season][equals]=${season.id}&sort=details.start_date&depth=2`);
    const events = eventsData.docs || [];

    const entriesData = await safeFetch(`${url}/api/entries?where[details.session.season][equals]=${season.id}&depth=2&limit=100`);
    const entries = entriesData.docs || [];

    const categoryIds = season.categories?.map((c: any) => (typeof c === 'object' ? c.id : c)) || [];
    let regulationsDocs: any[] = [];

    if (categoryIds.length > 0) {
        const regulationsData = await safeFetch(`${url}/api/regulations?where[categories][in]=${categoryIds.join(',')}&depth=1`);
        regulationsDocs = regulationsData.docs || [];
    }

    const coverImage = season.assets?.cover && typeof season.assets.cover !== 'number'
        ? season.assets.cover.url
        : null;

    const establishedYear = season.name?.match(/\d{4}/)?.[0] || '2026';

    const eventItems = events.map((event: any) => {
        const startDate = event.details?.start_date ? new Date(event.details.start_date) : null;
        const endDate = event.details?.end_date ? new Date(event.details.end_date) : null;
        const dateStr = startDate
            ? `${startDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}${endDate && endDate > startDate ? ` - ${endDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}` : ''}`
            : 'TBD';

        return {
            id: event.id,
            name: event.name,
            slug: event.slug,
            image: event.assets?.cover && typeof event.assets.cover !== 'number' ? event.assets.cover.url : null,
            badge: event.basics?.identifiers?.code || event.details?.status || 'EVE',
            year: dateStr,
            tagline: event.basics?.tagline || 'RACE EVENT',
            description: event.basics?.description || `${event.name} circuit information and race schedule.`,
            metrics: event.details?.location ? [{ label: 'LOCATION', value: event.details.location }] : [],
            footer: event.details?.status ? { label: 'STATUS', value: event.details.status } : undefined
        };
    });

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
                title={season.name}
                alias={season.alias}
                identifier={season.basics?.identifiers?.code || season.basics?.identifiers?.abbreviation}
                establishedYear={establishedYear}
                status="Completed"
                access={series?.details?.access || 'Public'}
                coverImage={coverImage || undefined}
                logoImage={series?.assets?.logo && typeof series.assets.logo !== 'number' ? series.assets.logo.url : undefined}
            />

            <SlugOverview
                title={season.name}
                description={season.basics?.description}
                identifier={season.basics?.identifiers?.code}
                alias={season.alias}
                status="Completed"
                scope={series?.name || 'Championship'}
                revision={`Season ${establishedYear}`}
                recordDate={season.updatedAt?.split('T')[0]}
                coverImage={coverImage || undefined}
                regulationsLink={categoryIds.length > 0 ? `/competition/seasons/${season.slug}/regulations` : undefined}
            />

            {events.length > 0 && (
                <SlugList
                    items={eventItems}
                    title="EVENTS"
                    emptyMessage="No events found for this season"
                    basePath="competition/seasons"
                    parentSlug={season.slug}
                    entityKey="event"
                />
            )}

            {entries.length > 0 && (
                <SlugList
                    items={entryItems}
                    title="ENTRIES"
                    emptyMessage="No entries found for this season"
                    basePath="competition/seasons"
                    parentSlug={season.slug}
                    entityKey="entry"
                />
            )}

            {regulationsDocs.length > 0 && (
                <SlugRegulations
                    regulations={regulationsDocs}
                    title="REGULATIONS"
                    emptyMessage="No regulations found for this season"
                />
            )}
        </main>
    );
}