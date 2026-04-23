import VacancyPositionHistory from './sections/VacancyPositionHistory';
import VacancyRoleDescription from './sections/VacancyRoleDescription';
import VacancySpecsExpectations from './sections/VacancySpecsExpectations';

async function getVacancyData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    const res = await fetch(`${url}/api/vacancies?where[alias][equals]=${slug}&limit=1`).then(res => res.json());
    return { vacancy: res.docs[0] };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const data = await getVacancyData(params.slug);

    if (!data.vacancy) return null;

    return (
        <main className="bg-black min-h-screen">
            <VacancyRoleDescription
                vacancy={data.vacancy}
            />

            <VacancySpecsExpectations
                vacancy={data.vacancy}
            />

            <VacancyPositionHistory
                vacancy={data.vacancy}
            />
        </main>
    );
}