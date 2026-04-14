import { notFound } from 'next/navigation';
import LightboxGallery from '../../sections/Gallery';
import SeriesHero from './sections/Hero';
import SeasonsList from './sections/List';
import Regulations from './sections/Regulations';

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

    const seasonsData = await safeFetch(`${url}/api/seasons?where[details.series][equals]=${series.id}&sort=-name&depth=1`);

    const categoryIds = series.categories?.map((c: any) => (typeof c === 'object' ? c.id : c)) || [];
    let regulationsDocs: any[] = [];

    if (categoryIds.length > 0) {
        const categoryQuery = categoryIds.map((id: string | number) => `where[categories][in]=${id}`).join('&');
        const regulationsData = await safeFetch(`${url}/api/regulations?${categoryQuery}&depth=1`);
        regulationsDocs = regulationsData.docs || [];
    }

    return (
        <main className="min-h-screen bg-white">
            <SeriesHero series={series} />

            {(seasonsData.docs || []).length > 0 && (
                <SeasonsList seasons={seasonsData.docs} seriesSlug={slug} />
            )}

            {regulationsDocs.length > 0 && (
                <Regulations regulations={regulationsDocs} />
            )}

            <LightboxGallery
                items={seasonsData.docs || []}
                title="Gallery"
                label="Media Assets"
            />
        </main>
    );
}