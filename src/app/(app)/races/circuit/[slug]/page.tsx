import CircuitMapLayout from './sections/CircuitMapLayout';
import HistoryRecordsSection from './sections/HistoryRecordsSection';
import RaceWinnersHistory from './sections/RaceWinnersHistory';

async function getCircuitData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    const circuitRes = await fetch(`${url}/api/circuits?where[alias][equals]=${slug}&limit=1`).then(res => res.json());
    const circuit = circuitRes.docs[0];

    const [races, results] = await Promise.all([
        fetch(`${url}/api/races?where[details.circuit][equals]=${circuit.id}&limit=100`).then(res => res.json()),
        fetch(`${url}/api/results?limit=1000`).then(res => res.json())
    ]);

    return {
        circuit,
        history: {
            races: races.docs,
            results: results.docs
        }
    };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { circuit, history } = await getCircuitData(params.slug);

    return (
        <main className="bg-black min-h-screen">
            <CircuitMapLayout
                circuit={circuit}
            />

            <HistoryRecordsSection
                circuit={circuit}
            />

            <RaceWinnersHistory
                races={history.races}
                results={history.results}
            />
        </main>
    );
}