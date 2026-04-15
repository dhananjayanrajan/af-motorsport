import { notFound } from 'next/navigation';
import EntryStackedGrid from './sections/Grid';
import RaceHero from './sections/Hero';
import ClassificationTable from './sections/Table';

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{
        'series-slug': string;
        'season-slug': string;
        'event-slug': string;
        'race-slug': string;
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

export default async function RacePage({ params }: PageProps) {
    const { 'event-slug': eventSlug, 'race-slug': raceSlug } = await params;
    const url = process.env.PAYLOAD_PUBLIC_SERVER_URL;

    const raceData = await safeFetch(
        `${url}/api/races?where[slug][equals]=${raceSlug}&where[details.event.slug][equals]=${eventSlug}&depth=2`
    );

    const race = raceData.docs?.[0];
    if (!race) notFound();

    const sessionsData = await safeFetch(`${url}/api/sessions?where[details.race][equals]=${race.id}&depth=1`);
    const sessions = sessionsData.docs || [];
    const sessionIds = sessions.map((s: any) => s.id);

    let entriesDocs: any[] = [];
    if (sessionIds.length > 0) {
        const entriesData = await safeFetch(`${url}/api/entries?where[details.session][in]=${sessionIds.join(',')}&sort=details.finish_position&depth=2`);
        entriesDocs = entriesData.docs || [];
    }

    const resultsData = await safeFetch(`${url}/api/results?where[race][equals]=${race.id}&sort=details.overall&depth=1`);

    return (
        <main className="min-h-screen bg-white">
            <RaceHero race={race} />

            {(resultsData.docs || []).length > 0 && (
                <ClassificationTable results={resultsData.docs} />
            )}

            {entriesDocs.length > 0 && (
                <EntryStackedGrid entries={entriesDocs} />
            )}
        </main>
    );
}