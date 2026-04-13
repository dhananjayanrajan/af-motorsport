import { DESIGN_SYSTEM } from '@/lib/constants';

async function getSeriesDetailData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    if (!url) throw new Error("PAYLOAD_URL is not defined");

    const seriesRes = await fetch(
        `${url}/api/series?where[slug][equals]=${slug}&depth=2`
    ).then((res) => res.json());

    const series = seriesRes.docs?.[0];

    if (!series) return null;

    const seriesId = series.id;

    const [seasons, championships, races, results, circuits, regulations] = await Promise.all([
        fetch(`${url}/api/seasons?where[details.series][equals]=${seriesId}&limit=100`).then((res) => res.json()),
        fetch(`${url}/api/championships?where[details.series][equals]=${seriesId}&limit=100`).then((res) => res.json()),
        fetch(`${url}/api/races?where[details.series][equals]=${seriesId}&sort=-details.start_date&limit=100`).then((res) => res.json()),
        fetch(`${url}/api/results?where[details.race.details.series][equals]=${seriesId}&limit=100`).then((res) => res.json()),
        fetch(`${url}/api/circuits?where[series][contains]=${seriesId}&limit=100`).then((res) => res.json()),
        fetch(`${url}/api/regulations?where[series][equals]=${seriesId}&limit=100`).then((res) => res.json()),
    ]);

    return {
        series,
        seasons: seasons.docs || [],
        championships: championships.docs || [],
        races: races.docs || [],
        results: results.docs || [],
        circuits: circuits.docs || [],
        regulations: regulations.docs || [],
    };
}

export default async function SeriesDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const data = await getSeriesDetailData(slug);

    if (!data) return null;

    return (
        <main
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950 }}
            className="min-h-screen"
        >
            {/* <IdentitySection series={data.series} />

      <SeasonsSection seasons={data.seasons} />

      <ChampionshipsSection championships={data.championships} />

      <RacesSection races={data.races} />

      <ResultsSection results={data.results} />

      <CircuitsSection circuits={data.circuits} />

      <RegulationsSection regulations={data.regulations} />

      <GallerySection media={data.series.assets?.gallery} /> */}
        </main>
    );
}