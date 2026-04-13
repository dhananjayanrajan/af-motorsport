import { DESIGN_SYSTEM } from '@/lib/constants';

async function getHomeData() {
  const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
  const [seasons, races, results, drivers, orgs] = await Promise.all([
    fetch(`${url}/api/seasons?limit=1`).then(res => res.json()),
    fetch(`${url}/api/races?limit=1`).then(res => res.json()),
    fetch(`${url}/api/results?limit=1`).then(res => res.json()),
    fetch(`${url}/api/drivers?limit=1`).then(res => res.json()),
    fetch(`${url}/api/organizations?limit=20`).then(res => res.json())
  ]);

  return {
    hero: seasons.docs?.[0],
    pulse: races.docs?.[0],
    latestResult: results.docs?.[0],
    spotlight: drivers.docs?.[0],
    partners: orgs.docs || []
  };
}

export default async function Page() {
  const data = await getHomeData();

  return (
    <main style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950 }}>
      {/* <Hero season={data.hero} />
      <SeasonPulse race={data.pulse} />
      <LatestResult result={data.latestResult} />
      <DriverSpotlight driver={data.spotlight} />
      <Partners organizations={data.partners} /> */}
    </main>
  );
}