import CareerStatistics from './sections/CareerStatistics'
import CarsDriven from './sections/CarsDriven'
import PerformanceProgression from './sections/PerformanceProgression'

async function getDriverData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL
    const driverRes = await fetch(`${url}/api/drivers?where[slug][equals]=${slug}&limit=1`).then((res) => res.json())

    if (!driverRes.docs.length) return null

    const driver = driverRes.docs[0]
    const dId = driver.id

    const [results, points, awards, seasons, cars, entries] = await Promise.all([
        fetch(`${url}/api/results?where[categories][in]=${dId}&limit=100`).then((res) => res.json()),
        fetch(`${url}/api/points?where[categories][in]=${dId}&limit=100`).then((res) => res.json()),
        fetch(`${url}/api/awards?where[categories][in]=${dId}&limit=100`).then((res) => res.json()),
        fetch(`${url}/api/seasons?limit=100`).then((res) => res.json()),
        fetch(`${url}/api/cars?limit=100`).then((res) => res.json()),
        fetch(`${url}/api/entries?where[categories][in]=${dId}&limit=100`).then((res) => res.json()),
    ])

    return {
        driver,
        stats: {
            results: results.docs,
            points: points.docs,
            awards: awards.docs
        },
        progression: {
            seasons: seasons.docs,
            results: results.docs,
            points: points.docs
        },
        machines: {
            cars: cars.docs,
            entries: entries.docs,
            results: results.docs
        },
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const data = await getDriverData(params.slug)

    if (!data) return null

    return (
        <main className="bg-black min-h-screen">
            <CareerStatistics
                results={data.stats.results}
                points={data.stats.points}
                awards={data.stats.awards}
            />
            <PerformanceProgression
                seasons={data.progression.seasons}
                results={data.progression.results}
                points={data.progression.points}
            />
            <CarsDriven
                cars={data.machines.cars}
                results={data.machines.results}
            />
        </main>
    )
}