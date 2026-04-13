import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { notFound } from 'next/navigation';
import EntryGrid from './sections/EntryGrid';
import PointsStandings from './sections/PointsStandings';
import RaceCalendar from './sections/RaceCalendar';
import SeasonHeader from './sections/SeasonHeader';

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

    const racesResult = await payload.find({
        collection: 'races',
        where: {
            season: {
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
            <SeasonHeader season={season} />

            <RaceCalendar races={racesResult.docs} />

            <PointsStandings
                races={racesResult.docs}
                entries={entriesResult.docs}
            />

            <EntryGrid entries={entriesResult.docs} />
        </main>
    );
}