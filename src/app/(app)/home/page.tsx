import { DESIGN_SYSTEM } from '@/lib/constants';

export const dynamic = 'force-dynamic'

async function safeFetch(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) return { docs: [] };
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      return { docs: [] };
    }
  } catch (e) {
    return { docs: [] };
  }
}

async function getHomeData() {
  const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
  const [seasons, races, results, drivers, orgs] = await Promise.all([
    safeFetch(`${url}/api/seasons?limit=1`),
    safeFetch(`${url}/api/races?limit=1`),
    safeFetch(`${url}/api/results?limit=1`),
    safeFetch(`${url}/api/drivers?limit=1`),
    safeFetch(`${url}/api/organizations?limit=20`)
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
    <main style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[950] }}>
      HOME PAGE
    </main>
  );
}