import { DESIGN_SYSTEM } from '@/lib/constants';

async function getDriverDetailData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    if (!url) throw new Error("PAYLOAD_URL is not defined");

    const driverRes = await fetch(
        `${url}/api/drivers?where[slug][equals]=${slug}&depth=2`
    ).then((res) => res.json());

    const driver = driverRes.docs?.[0];

    if (!driver) return null;

    const driverId = driver.id;

    const [history, awards] = await Promise.all([
        fetch(`${url}/api/entries?where[driver][equals]=${driverId}&limit=100&sort=-createdAt`).then((res) => res.json()),
        fetch(`${url}/api/awards?where[recipients.drivers][contains]=${driverId}&limit=100`).then((res) => res.json()),
    ]);

    return {
        driver,
        history: history.docs || [],
        awards: awards.docs || [],
    };
}

export default async function DriverDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const data = await getDriverDetailData(slug);

    if (!data) return null;

    return (
        <main
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950 }}
            className="min-h-screen"
        >
            {/* <IdentitySection driver={data.driver} />

      <BiographySection driver={data.driver} />

      <StatsSection driver={data.driver} />

      <RaceHistorySection entries={data.history} />

      <SkillsSection skills={data.driver.skills} />

      <AwardsSection awards={data.awards} />

      <GallerySection media={data.driver.assets?.gallery} /> */}
        </main>
    );
}