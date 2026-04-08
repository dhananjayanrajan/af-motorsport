import FeaturedChampionships from './sections/FeaturedChampionships';
import HeroSlideshow from './sections/HeroSlideshow';
import LatestRaceReport from './sections/LatestRaceReport';

async function getHomeData() {
  const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
  if (!url) throw new Error("PAYLOAD_URL is not defined");

  const [slides, championships, series, seasons, races, results, drivers, circuits] = await Promise.all([
    fetch(`${url}/api/slides`).then(res => res.json()),
    fetch(`${url}/api/championships`).then(res => res.json()),
    fetch(`${url}/api/series`).then(res => res.json()),
    fetch(`${url}/api/seasons`).then(res => res.json()),
    fetch(`${url}/api/races?sort=-details.start_date&limit=1`).then(res => res.json()),
    fetch(`${url}/api/results`).then(res => res.json()),
    fetch(`${url}/api/drivers`).then(res => res.json()),
    fetch(`${url}/api/circuits`).then(res => res.json())
  ]);

  return {
    hero: slides.docs || [],
    featured: {
      championships: championships.docs || [],
      series: series.docs || [],
      seasons: seasons.docs || []
    },
    latestRace: {
      race: races.docs?.[0] || null,
      results: results.docs || [],
      drivers: drivers.docs || [],
      circuits: circuits.docs || []
    }
  };
}

export default async function Page() {
  const data = await getHomeData();

  return (
    <main className="bg-black min-h-screen">
      <HeroSlideshow slides={data.hero} />

      <FeaturedChampionships
        championships={data.featured.championships}
        series={data.featured.series}
        seasons={data.featured.seasons}
      />

      {data.latestRace.race && (
        <LatestRaceReport
          race={data.latestRace.race}
          results={data.latestRace.results}
          drivers={data.latestRace.drivers}
          circuits={data.latestRace.circuits}
        />
      )}
    </main>
  );
}