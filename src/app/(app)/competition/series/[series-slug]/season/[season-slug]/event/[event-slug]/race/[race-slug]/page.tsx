import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { notFound } from 'next/navigation';
import EntryStackedGrid from './sections/Grid';
import RaceHero from './sections/Hero';
import ClassificationTable from './sections/Table';

interface PageProps {
    params: Promise<{
        'series-slug': string;
        'season-slug': string;
        'event-slug': string;
        'race-slug': string;
    }>;
}

export default async function RacePage({ params }: PageProps) {
    const { 'event-slug': eventSlug, 'race-slug': raceSlug } = await params;
    const payload = await getPayloadHMR({ config: configPromise });

    const raceResult = await payload.find({
        collection: 'races',
        where: {
            and: [
                { slug: { equals: raceSlug } },
                { 'details.event.slug': { equals: eventSlug } },
            ],
        },
        depth: 2,
    });

    const race = raceResult.docs[0];
    if (!race) notFound();

    const [entriesResult, resultsResult] = await Promise.all([
        payload.find({
            collection: 'entries',
            where: {
                'details.session': {
                    equals: race.id,
                },
            },
            sort: 'details.finish_position',
            depth: 2,
        }),
        payload.find({
            collection: 'results',
            where: {
                'categories.slug': {
                    equals: race.slug,
                },
            },
            sort: 'details.overall',
            depth: 1,
        }),
    ]);

    return (
        <main className="min-h-screen bg-white">
            <RaceHero race={race} />

            {resultsResult.docs.length > 0 && (
                <ClassificationTable results={resultsResult.docs} />
            )}

            {entriesResult.docs.length > 0 && (
                <EntryStackedGrid entries={entriesResult.docs} />
            )}
        </main>
    );
}