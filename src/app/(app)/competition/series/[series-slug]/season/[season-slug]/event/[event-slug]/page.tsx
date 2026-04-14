import LightboxGallery from '@/app/(app)/competition/sections/Gallery';
import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { notFound } from 'next/navigation';
import EntryGrid from '../../sections/Grid';
import EventHero from './sections/Hero';
import SessionStack from './sections/Stack';

interface PageProps {
    params: Promise<{
        'series-slug': string;
        'season-slug': string;
        'event-slug': string;
    }>;
}

export default async function EventPage({ params }: PageProps) {
    const {
        'series-slug': seriesSlug,
        'season-slug': seasonSlug,
        'event-slug': eventSlug
    } = await params;

    const payload = await getPayloadHMR({ config: configPromise });

    const eventResult = await payload.find({
        collection: 'events',
        where: {
            and: [
                {
                    slug: {
                        equals: eventSlug,
                    },
                },
                {
                    'details.season.slug': {
                        equals: seasonSlug,
                    },
                },
            ],
        },
        depth: 2,
    });

    const event = eventResult.docs[0];

    if (!event) {
        notFound();
    }

    const siblingEventsResult = await payload.find({
        collection: 'events',
        where: {
            'details.season': {
                equals: (event.details.season as any).id || event.details.season,
            },
        },
        sort: 'details.start_date',
        depth: 1,
    });

    const currentIndex = siblingEventsResult.docs.findIndex((e) => e.id === event.id);
    const previousEvent = currentIndex > 0 ? siblingEventsResult.docs[currentIndex - 1] : null;
    const nextEvent = currentIndex < siblingEventsResult.docs.length - 1 ? siblingEventsResult.docs[currentIndex + 1] : null;

    const racesResult = await payload.find({
        collection: 'races',
        where: {
            'details.event': {
                equals: event.id,
            },
        },
        sort: 'details.start_date',
        depth: 1,
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
            <EventHero
                event={event}
                seriesSlug={seriesSlug}
                seasonSlug={seasonSlug}
                previousEvent={previousEvent ? { slug: previousEvent.slug!, name: previousEvent.name } : null}
                nextEvent={nextEvent ? { slug: nextEvent.slug!, name: nextEvent.name } : null}
            />

            <SessionStack sessions={racesResult.docs} />

            <EntryGrid entries={entriesResult.docs} />

            <LightboxGallery
                items={siblingEventsResult.docs}
                title="Gallery"
                label="Media Assets"
            />
        </main>
    );
}