import CarsSection from './sections/Cars'
import GaragesSection from './sections/Garages'
import SuitsSection from './sections/Suits'

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
    const [
        carsRes,
        garagesRes,
        helmetsRes,
        suitsRes,
        driversRes
    ] = await Promise.all([
        safeFetch('cars?limit=100&depth=2'),
        safeFetch('garages?limit=100&depth=2'),
        safeFetch('helmets?limit=100&depth=2'),
        safeFetch('suits?limit=100&depth=2'),
        safeFetch('drivers?limit=100&depth=2'),
    ])

    const cars = carsRes?.docs || []
    const garages = garagesRes?.docs || []
    const helmets = helmetsRes?.docs || []
    const suits = suitsRes?.docs || []
    const drivers = driversRes?.docs || []

    return (
        <main className="min-h-screen bg-white">
            <CarsSection cars={cars} />
            <GaragesSection garages={garages} />
            {/* <HelmetsSection helmets={helmets} drivers={drivers} /> */}
            <SuitsSection suits={suits} drivers={drivers} />
        </main>
    )
}