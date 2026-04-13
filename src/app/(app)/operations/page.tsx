import { DESIGN_SYSTEM } from '@/lib/constants';

async function getOperationsPageData() {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    if (!url) throw new Error("PAYLOAD_URL is not defined");

    const [hospitalities, initiatives, meetups, onboardings, trainings, vacancies] = await Promise.all([
        fetch(`${url}/api/hospitalities?limit=100`).then(res => res.json()),
        fetch(`${url}/api/initiatives?limit=100`).then(res => res.json()),
        fetch(`${url}/api/meetups?limit=100`).then(res => res.json()),
        fetch(`${url}/api/onboardings?limit=100`).then(res => res.json()),
        fetch(`${url}/api/trainings?limit=100`).then(res => res.json()),
        fetch(`${url}/api/vacancies?limit=100`).then(res => res.json())
    ]);

    return {
        hospitalities: hospitalities.docs || [],
        initiatives: initiatives.docs || [],
        meetups: meetups.docs || [],
        onboardings: onboardings.docs || [],
        trainings: trainings.docs || [],
        vacancies: vacancies.docs || []
    };
}

export default async function OperationsPage() {
    const data = await getOperationsPageData();

    return (
        <main style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950 }} className="min-h-screen">
            {/* <HospitalitiesSection hospitalities={data.hospitalities} />
      <InitiativesSection initiatives={data.initiatives} />
      <MeetupsSection meetups={data.meetups} />
      <OnboardingsSection onboardings={data.onboardings} />
      <TrainingsSection trainings={data.trainings} />
      <VacanciesSection vacancies={data.vacancies} /> */}
        </main>
    );
}