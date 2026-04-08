
async function getRacesArchive() {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    const [races, events, sessions, circuits, seasons, results, entries] = await Promise.all([
        fetch(`${url}/api/races`).then(res => res.json()),
        fetch(`${url}/api/events`).then(res => res.json()),
        fetch(`${url}/api/sessions`).then(res => res.json()),
        fetch(`${url}/api/circuits`).then(res => res.json()),
        fetch(`${url}/api/seasons`).then(res => res.json()),
        fetch(`${url}/api/results`).then(res => res.json()),
        fetch(`${url}/api/entries`).then(res => res.json())
    ]);

    return {
        calendar: { races: races.docs, events: events.docs, sessions: sessions.docs, circuits: circuits.docs, seasons: seasons.docs },
        performance: { events: events.docs, circuits: circuits.docs, results: results.docs },
        insights: { sessions: sessions.docs, entries: entries.docs, results: results.docs }
    };
}

export default async function Page() {
    const data = await getRacesArchive();
    return <main></main>;
}