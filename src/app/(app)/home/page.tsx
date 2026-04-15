import { DESIGN_SYSTEM } from '@/lib/constants';
import HomeGallery from './sections/Gallery';
import HeroSection from './sections/Hero';
import NextRaceSection from './sections/NextRace';
import LatestResults from './sections/Results';
import DriverSpotlight from './sections/Spotlight';
import ChampionshipTicker from './sections/Ticker';

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
  const [championships, races, drivers] = await Promise.all([
    safeFetch(`${url}/api/championships?limit=10`),
    safeFetch(`${url}/api/races?limit=5&sort=-details.start_date`),
    safeFetch(`${url}/api/drivers?limit=5`)
  ]);

  const championshipDocs = championships.docs || [];
  const raceDocs = races.docs || [];
  const driverDocs = drivers.docs || [];

  const combinedGalleryItems = [
    ...championshipDocs.map((item: any) => ({
      ...item,
      code: item.basics?.identifiers?.code || 'CHMP',
      type: 'Championship'
    })),
    ...raceDocs.map((item: any) => ({
      ...item,
      code: item.basics?.identifiers?.code || 'RACE',
      type: 'Race'
    })),
    ...driverDocs.map((item: any) => ({
      ...item,
      name: `${item.first_name} ${item.last_name}`,
      code: item.basics?.callsign || 'DRVR',
      type: 'Driver'
    }))
  ].filter(item => item.assets?.thumbnail || item.assets?.cover || item.assets?.avatar);

  return {
    championships: championshipDocs,
    nextRace: raceDocs[0] || null,
    races: raceDocs,
    drivers: driverDocs,
    galleryItems: combinedGalleryItems
  };
}

export default async function Page() {
  const data = await getHomeData();

  return (
    <main style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
      <HeroSection />
      <ChampionshipTicker championships={data.championships} />
      {data.nextRace && <NextRaceSection race={data.nextRace} />}
      <LatestResults races={data.races} />
      <DriverSpotlight drivers={data.drivers} />
      <HomeGallery items={data.galleryItems} />
    </main>
  );
}