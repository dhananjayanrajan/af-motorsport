import LifeAtMotorsport from './sections/LifeAtMotorsport';
import TrainingCatalog from './sections/TrainingCatalog';
import VacancyBoard from './sections/VacancyBoard';

async function getCareersData() {
  const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
  const [vacancies, trainings, programs, celebrations, meetups, interviews] = await Promise.all([
    fetch(`${url}/api/vacancies`).then(res => res.json()),
    fetch(`${url}/api/trainings`).then(res => res.json()),
    fetch(`${url}/api/programs`).then(res => res.json()),
    fetch(`${url}/api/celebrations`).then(res => res.json()),
    fetch(`${url}/api/meetups`).then(res => res.json()),
    fetch(`${url}/api/interviews`).then(res => res.json())
  ]);

  return {
    board: vacancies.docs,
    catalog: { trainings: trainings.docs, programs: programs.docs },
    culture: { celebrations: celebrations.docs, meetups: meetups.docs, interviews: interviews.docs }
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