import LightboxGallery from '@/app/(app)/competition/sections/Gallery';
import { notFound } from 'next/navigation';
import RaceCalendar from '../../../../sections/Calendar';
import EntryGrid from './sections/Grid';
import SeasonHero from './sections/Hero';
import EventsList from './sections/List';
import PointsStandings from './sections/Standings';

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{
        'series-slug': string;
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
    const { 'series-slug': seriesSlug, 'season-slug': seasonSlug } = await params;
    const url = process.env.PAYLOAD_PUBLIC_SERVER_URL;

    const seasonData = await safeFetch(
        `${url}/api/seasons?where[slug][equals]=${seasonSlug}&where[details.series.slug][equals]=${seriesSlug}&depth=2`
    );

    const season = seasonData.docs?.[0];

    if (!season) {
        notFound();
    }

    const [eventsData, racesData] = await Promise.all([
        safeFetch(`${url}/api/events?where[details.season][equals]=${season.id}&sort=details.start_date&depth=2`),
        safeFetch(`${url}/api/races?where[details.season][equals]=${season.id}&sort=details.start_date&depth=2`)
    ]);

    const raceIds = (racesData.docs || []).map((r: any) => r.id);
    let entriesDocs = [];

    if (raceIds.length > 0) {
        const entriesQuery = raceIds.map((id: string | number) => `where[details.session][in]=${id}`).join('&');
        const entriesData = await safeFetch(`${url}/api/entries?${entriesQuery}&depth=2`);
        entriesDocs = entriesData.docs || [];
    }

    return (
        <main className="min-h-screen bg-white">
            <SeasonHero season={season} />

            <RaceCalendar races={racesData.docs || []} />

            <PointsStandings
                races={racesData.docs || []}
                entries={entriesDocs}
            />

            <EventsList
                events={eventsData.docs || []}
                seriesSlug={seriesSlug}
                seasonSlug={seasonSlug}
            />

            <EntryGrid entries={entriesDocs} />

            <LightboxGallery
                items={eventsData.docs || []}
                title="Gallery"
                label="Media Assets"
            />
        </main>
    );
}