import CarsDirectory from './sections/Cars'
import GarageDirectory from './sections/Garages'
import HelmetsSection from './sections/Helmets'

export const dynamic = 'force-dynamic'

async function safeFetch(endpoint: string) {
    const url = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${endpoint}`
    try {
        const res = await fetch(url, {
            next: { revalidate: 3600 },
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!res.ok) {
            return { docs: [] }
        }

        const data = await res.json()
        return data || { docs: [] }
    } catch (e) {
        return { docs: [] }
    }
}

export default async function ResourcesPage() {
    const [carsRes, garagesRes, helmetsRes, suitsRes, driversRes] = await Promise.all([
        safeFetch('cars?depth=2&limit=100'),
        safeFetch('garages?depth=2&limit=100'),
        safeFetch('helmets?depth=2&limit=100'),
        safeFetch('suits?depth=2&limit=100'),
        safeFetch('drivers?depth=2&limit=100'),
    ])

    const cars = carsRes?.docs || []
    const garages = garagesRes?.docs || []
    const helmets = helmetsRes?.docs || []
    const suits = suitsRes?.docs || []
    const drivers = driversRes?.docs || []

    return (
        <main className="min-h-screen bg-white">
            <CarsDirectory cars={cars} />
            <GarageDirectory garages={garages} />
            <HelmetsSection helmets={helmets} title='HELMETS' subtitle='DIRECTORY' />
            {/* <SuitsSection suits={suits} drivers={drivers} /> */}
        </main>
    )
}