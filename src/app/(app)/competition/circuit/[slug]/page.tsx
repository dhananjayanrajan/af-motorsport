import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { notFound } from 'next/navigation';
import RaceCalendar from '../../sections/Calendar';
import LightboxGallery from '../../sections/Gallery';
import CircuitStatGrid from './sections/Grid';
import CircuitHero from './sections/Hero';
import CircuitStatement from './sections/Statement';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function CircuitPage({ params }: PageProps) {
    const { slug } = await params;
    const payload = await getPayloadHMR({ config: configPromise });

    const circuitResult = await payload.find({
        collection: 'circuits',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    });

    const circuit = circuitResult.docs[0];

    if (!circuit) {
        notFound();
    }

    const historyResult = await payload.find({
        collection: 'races',
        where: {
            'details.circuit': {
                equals: circuit.id,
            },
        },
        sort: '-details.start_date',
        depth: 1,
    });

    return (
        <main className="min-h-screen bg-white">
            <CircuitHero circuit={circuit} />
            <RaceCalendar races={historyResult.docs} />
            <CircuitStatement circuit={circuit} />
            <CircuitStatGrid circuit={circuit} />
            <LightboxGallery items={historyResult.docs} title="Gallery" label="Media Assets" />
        </main>
    );
}