import LifeAtMotorsport from './sections/LifeAtMotorsport';
import TrainingCatalog from './sections/TrainingCatalog';
import VacancyBoard from './sections/VacancyBoard';

export const dynamic = 'force-dynamic'

async function getCareersData() {
  const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;

  const fetcher = async (endpoint: string) => {
    try {
      const res = await fetch(`${url}/api/${endpoint}`);
      if (!res.ok) return { docs: [] };
      const data = await res.json();
      return data;
    } catch (err) {
      return { docs: [] };
    }
  };

  const [vacancies, trainings, programs, celebrations, meetups, interviews] = await Promise.all([
    fetcher('vacancies'),
    fetcher('trainings'),
    fetcher('programs'),
    fetcher('celebrations'),
    fetcher('meetups'),
    fetcher('interviews')
  ]);

  return {
    board: vacancies.docs || [],
    catalog: {
      trainings: trainings.docs || [],
      programs: programs.docs || []
    },
    culture: {
      celebrations: celebrations.docs || [],
      meetups: meetups.docs || [],
      interviews: interviews.docs || []
    }
  };
}

export default async function Page() {
  const data = await getCareersData();

  return (
    <main className="bg-black min-h-screen">
      <VacancyBoard
        vacancies={data.board}
      />

      <TrainingCatalog
        trainings={data.catalog.trainings}
        programs={data.catalog.programs}
      />

      <LifeAtMotorsport
        celebrations={data.culture.celebrations}
        meetups={data.culture.meetups}
        interviews={data.culture.interviews}
      />
    </main>
  );
}