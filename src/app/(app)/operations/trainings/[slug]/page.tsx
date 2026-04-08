import TrainingExpectations from './sections/TrainingExpectations';
import TrainingSchedule from './sections/TrainingSchedule';
import TrainingSpecsSkills from './sections/TrainingSpecsSkills';

async function getTrainingDetail(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    const trainRes = await fetch(`${url}/api/trainings?where[alias][equals]=${slug}&limit=1`).then(res => res.json());
    const training = trainRes.docs[0];

    const skills = await fetch(`${url}/api/skills`).then(res => res.json());

    return { training, skills: skills.docs };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const data = await getTrainingDetail(params.slug);

    if (!data.training) return null;

    return (
        <main className="bg-black min-h-screen">
            <TrainingSchedule
                training={data.training}
            />

            <TrainingSpecsSkills
                training={data.training}
            />

            <TrainingExpectations
                training={data.training}
            />
        </main>
    );
}