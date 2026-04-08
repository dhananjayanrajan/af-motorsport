import InitiativeDashboard from './sections/InitiativeDashboard';
import MeetupHubSection from './sections/MeetupHubSection';
import TrainingCatalog from './sections/TrainingCatalog';

async function getOpsData() {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    const [meetups, initiatives, plans, roadmaps, trainings, skills] = await Promise.all([
        fetch(`${url}/api/meetups?limit=100`).then(res => res.json()),
        fetch(`${url}/api/initiatives?limit=100`).then(res => res.json()),
        fetch(`${url}/api/plans?limit=100`).then(res => res.json()),
        fetch(`${url}/api/roadmaps?limit=100`).then(res => res.json()),
        fetch(`${url}/api/trainings?limit=100`).then(res => res.json()),
        fetch(`${url}/api/skills?limit=100`).then(res => res.json())
    ]);

    return {
        meetups: meetups.docs,
        strategy: {
            initiatives: initiatives.docs,
            plans: plans.docs,
            roadmaps: roadmaps.docs
        },
        development: {
            trainings: trainings.docs,
            skills: skills.docs
        }
    };
}

export default async function Page() {
    const data = await getOpsData();

    return (
        <main className="bg-black min-h-screen">
            <InitiativeDashboard
                initiatives={data.strategy.initiatives}
                plans={data.strategy.plans}
            />

            <MeetupHubSection
                meetups={data.meetups}
            />

            <TrainingCatalog
                trainings={data.development.trainings}
            />
        </main>
    );
}