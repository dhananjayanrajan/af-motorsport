import ProgramCurriculumMentors from './sections/ProgramCurriculumMentors';
import ProgramObjectiveEligibility from './sections/ProgramObjectiveEligibility';
import ProgramParticipantsPartners from './sections/ProgramParticipantsPartners';

async function getProgramData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    const res = await fetch(`${url}/api/programs?where[alias][equals]=${slug}&limit=1`).then(res => res.json());
    const program = res.docs[0];

    const [leaders, drivers, orgs] = await Promise.all([
        fetch(`${url}/api/leaders`).then(res => res.json()),
        fetch(`${url}/api/drivers`).then(res => res.json()),
        fetch(`${url}/api/organizations`).then(res => res.json())
    ]);

    return {
        program,
        curriculum: { mentors: leaders.docs },
        partners: { participants: drivers.docs, partners: orgs.docs, sponsors: orgs.docs }
    };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const data = await getProgramData(params.slug);

    if (!data.program) return null;

    return (
        <main className="bg-black min-h-screen">
            <ProgramObjectiveEligibility
                program={data.program}
            />

            <ProgramCurriculumMentors
                program={data.program}
            />

            <ProgramParticipantsPartners
                program={data.program}
            />
        </main>
    );
}