// /var/www/clients/afmotor/af-motorsport/src/app/(app)/competition/series/[series-slug]/page.tsx

import { notFound } from 'next/navigation';
import SlugHero from '../../sections/Slug/Hero';
import SlugList from '../../sections/Slug/List';
import SlugOverview from '../../sections/Slug/Overview';
import SlugRegulations from '../../sections/Slug/Regulations';

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{
        'series-slug': string;
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

export default async function SeriesPage({ params }: PageProps) {
    const { 'series-slug': slug } = await params;
    const url = process.env.PAYLOAD_PUBLIC_SERVER_URL;

    const seriesData = await safeFetch(`${url}/api/series?where[slug][equals]=${slug}&depth=2`);
    const series = seriesData.docs?.[0];

    if (!series) {
        notFound();
    }

    const seasonsData = await safeFetch(`${url}/api/seasons?where[details.series][equals]=${series.id}&sort=-name&depth=2`);
    const seasons = seasonsData.docs || [];

    const categoryIds = series.categories?.map((c: any) => (typeof c === 'object' ? c.id : c)) || [];
    let regulationsDocs: any[] = [];

    if (categoryIds.length > 0) {
        const regulationsData = await safeFetch(`${url}/api/regulations?where[categories][in]=${categoryIds.join(',')}&depth=1`);
        regulationsDocs = regulationsData.docs || [];
    }

    const coverImage = series.assets?.cover && typeof series.assets.cover !== 'number'
        ? series.assets.cover.url
        : null;

    const logoImage = series.assets?.logo && typeof series.assets.logo !== 'number'
        ? series.assets.logo.url
        : null;

    const establishedYear = series.details?.start_date
        ? new Date(series.details.start_date).getFullYear().toString()
        : undefined;

    const seasonItems = seasons.map((season: any) => {
        const champion = season.details?.winner;
        const championName = champion?.name ||
            (champion ? `${champion.basics?.first_name || ''} ${champion.basics?.last_name || ''}`.trim() : null);

        return {
            id: season.id,
            name: season.name,
            slug: season.slug,
            image: season.assets?.cover && typeof season.assets.cover !== 'number' ? season.assets.cover.url : null,
            badge: season.basics?.identifiers?.abbreviation || season.basics?.identifiers?.code || 'SEA',
            year: season.name.match(/\d{4}/)?.[0] || '0000',
            tagline: season.basics?.tagline || 'SYSTEM LOG',
            description: season.basics?.description || `${season.name} technical parameters and race event logs.`,
            metrics: [
                { label: 'RACES', value: season.details?.races?.toString().padStart(2, '0') || '00' },
                { label: 'ENTRIES', value: season.details?.entries?.toString().padStart(2, '0') || '00' }
            ],
            footer: championName ? { label: 'CHAMPION', value: championName } : undefined
        };
    });

    return (
        <main className="min-h-screen bg-white">
            <SlugHero
                title={series.name}
                alias={series.alias}
                identifier={series.basics?.identifiers?.code || series.basics?.identifiers?.abbreviation}
                establishedYear={establishedYear}
                status={series.details?.status}
                access={series.details?.access}
                coverImage={coverImage || undefined}
                logoImage={logoImage || undefined}
            />

            <SlugOverview
                title={series.name}
                description={series.basics?.description}
                identifier={series.basics?.identifiers?.code}
                alias={series.alias}
                status={series.details?.status}
                scope="Global"
                revision="Current"
                recordDate={series.updatedAt?.split('T')[0]}
                coverImage={coverImage || undefined}
                regulationsLink={categoryIds.length > 0 ? `/competition/series/${series.slug}/regulations` : undefined}
            />

            <SlugList
                items={seasonItems}
                title="SEASONS"
                emptyMessage="No seasons found for this series"
                basePath="competition/series"
                parentSlug={series.slug}
                entityKey="season"
            />

            {regulationsDocs.length > 0 && (
                <SlugRegulations
                    regulations={regulationsDocs}
                    title="REGULATIONS"
                    emptyMessage="No regulations found for this series"
                />
            )}
        </main>
    );
}