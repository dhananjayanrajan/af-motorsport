import LightboxGallery from '@/app/(app)/competition/sections/Gallery';
import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { notFound } from 'next/navigation';
import RaceCalendar from '../../../../sections/Calendar';
import EntryGrid from './sections/Grid';
import SeasonHero from './sections/Hero';
import EventsList from './sections/List';
import PointsStandings from './sections/Standings';

interface PageProps {
    params: Promise<{
        'series-slug': string;
        'season-slug': string;
    }>;
}

export default async function SeasonPage({ params }: PageProps) {
    const { 'series-slug': seriesSlug, 'season-slug': seasonSlug } = await params;
    const payload = await getPayloadHMR({ config: configPromise });

    const seasonResult = await payload.find({
        collection: 'seasons',
        where: {
            and: [
                {
                    slug: {
                        equals: seasonSlug,
                    },
                },
                {
                    'details.series.slug': {
                        equals: seriesSlug,
                    },
                },
            ],
        },
        depth: 2,
    });

    const season = seasonResult.docs[0];

    if (!season) {
        notFound();
    }

    const eventsResult = await payload.find({
        collection: 'events',
        where: {
            'details.season': {
                equals: season.id,
            },
        },
        sort: 'details.start_date',
        depth: 2,
    });

    const racesResult = await payload.find({
        collection: 'races',
        where: {
            'details.season': {
                equals: season.id,
            },
        },
        sort: 'details.start_date',
        depth: 2,
    });

    const entriesResult = await payload.find({
        collection: 'entries',
        where: {
            'details.session': {
                in: racesResult.docs.map((r) => r.id),
            },
        },
        depth: 2,
    });

    return (
        <main className="min-h-screen bg-white">
            <SeasonHero season={season} />

            <RaceCalendar races={racesResult.docs} />

            <PointsStandings
                races={racesResult.docs}
                entries={entriesResult.docs}
            />

            <EventsList events={eventsResult.docs} seriesSlug={seriesSlug} seasonSlug={seasonSlug} />

            <EntryGrid entries={entriesResult.docs} />

            <LightboxGallery
                items={eventsResult.docs}
                title="Gallery"
                label="Media Assets"
            />
        </main>
    );
}