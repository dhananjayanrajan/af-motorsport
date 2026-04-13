import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { notFound } from 'next/navigation';
import Regulations from './sections/Regulations';
import SeasonsList from './sections/SeasonsLIst';
import SeriesIdentity from './sections/SeriesIdentity';

interface PageProps {
    params: Promise<{
        'series-slug': string;
    }>;
}

export default async function SeriesPage({ params }: PageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams['series-slug'];
    const payload = await getPayloadHMR({ config: configPromise });

    const seriesResult = await payload.find({
        collection: 'series',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    });

    const series = seriesResult.docs[0];

    if (!series) {
        notFound();
    }

    const seasonsResult = await payload.find({
        collection: 'seasons',
        where: {
            'details.series': {
                equals: series.id,
            },
        },
        sort: '-name',
        depth: 1,
    });

    const categoryIds = series.categories?.map((c: any) => (typeof c === 'object' ? c.id : c)) || [];

    const regulationsResult = await payload.find({
        collection: 'regulations',
        where: {
            categories: {
                in: categoryIds,
            },
        },
        depth: 1,
    });

    return (
        <main className="min-h-screen bg-white">
            <SeriesIdentity series={series} />

            {seasonsResult.docs.length > 0 && (
                <>
                    <SeasonsList seasons={seasonsResult.docs} seriesSlug={slug} />
                </>
            )}

            {regulationsResult.docs.length > 0 && (
                <Regulations regulations={regulationsResult.docs} />
            )}
        </main>
    );
}