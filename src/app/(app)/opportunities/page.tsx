import MeetupsSection from './sections/Meetups'
import VacanciesSection from './sections/Vacancies'

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

export default async function OpportunitiesPage() {
    const [
        vacanciesRes,
        meetupsRes
    ] = await Promise.all([
        safeFetch('vacancies?limit=100&depth=2'),
        safeFetch('meetups?limit=100&depth=2'),
    ])

    const vacancies = vacanciesRes?.docs || []
    const meetups = meetupsRes?.docs || []

    return (
        <main className="min-h-screen bg-white">
            <VacanciesSection vacancies={vacancies} />
            <MeetupsSection meetups={meetups} />
        </main>
    )
}