import EntryListSection from '../../OLD/sections/EntryListSection';
import IncidentReportSection from '../../OLD/sections/IncidentReportSection';
import SessionBreakdown from '../../OLD/sections/SessionBreakdown';

async function getRaceDetail(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    const raceRes = await fetch(`${url}/api/races?where[alias][equals]=${slug}&limit=1`).then(res => res.json());
    const race = raceRes.docs[0];

    const [sessions, entries, results, drivers, cars, teams, incidents] = await Promise.all([
        fetch(`${url}/api/sessions?where[details.race][equals]=${race.id}&limit=100`).then(res => res.json()),
        fetch(`${url}/api/entries?where[race][equals]=${race.id}&limit=100`).then(res => res.json()),
        fetch(`${url}/api/results?limit=1000`).then(res => res.json()),
        fetch(`${url}/api/drivers?limit=100`).then(res => res.json()),
        fetch(`${url}/api/cars?limit=100`).then(res => res.json()),
        fetch(`${url}/api/organizations?limit=100`).then(res => res.json()),
        fetch(`${url}/api/incidents?where[details.race][equals]=${race.id}&limit=100`).then(res => res.json())
    ]);

    return {
        breakdown: {
            sessions: sessions.docs,
            entries: entries.docs,
            results: results.docs
        },
        participants: {
            entries: entries.docs,
            drivers: drivers.docs,
            cars: cars.docs,
            teams: teams.docs
        },
        safety: {
            incidents: incidents.docs,
            cars: cars.docs,
            drivers: drivers.docs
        }
    };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { breakdown, participants, safety } = await getRaceDetail(params.slug);

    return (
        <main className="bg-black min-h-screen">
            <SessionBreakdown
                sessions={breakdown.sessions}
                entries={breakdown.entries}
                results={breakdown.results}
            />

            <EntryListSection
                entries={participants.entries}
            />

            <IncidentReportSection
                incidents={safety.incidents}
            />
        </main>
    );
}