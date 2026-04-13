import AwardsArchive from '../OLD/sections/AwardsArchive';
import CelebrationGallery from '../OLD/sections/CelebrationGallery';
import IncidentLog from '../OLD/sections/IncidentLog';

async function getOutcomesData() {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    const [awards, celebrations, leaders, drivers, incidents, cars] = await Promise.all([
        fetch(`${url}/api/awards`).then(res => res.json()),
        fetch(`${url}/api/celebrations`).then(res => res.json()),
        fetch(`${url}/api/leaders`).then(res => res.json()),
        fetch(`${url}/api/drivers`).then(res => res.json()),
        fetch(`${url}/api/incidents`).then(res => res.json()),
        fetch(`${url}/api/cars`).then(res => res.json())
    ]);

    return {
        recognition: awards.docs,
        gallery: { celebrations: celebrations.docs, leaders: leaders.docs, drivers: drivers.docs },
        safetyLog: { incidents: incidents.docs, cars: cars.docs, drivers: drivers.docs }
    };
}

export default async function Page() {
    const data = await getOutcomesData();

    return (
        <main className="bg-black min-h-screen">
            <AwardsArchive
                awards={data.recognition}
            />

            <CelebrationGallery
                celebrations={data.gallery.celebrations}
            />

            <IncidentLog
                incidents={data.safetyLog.incidents}
            />
        </main>
    );
}