import { Celebration, Driver, Interview, Leader, Member, Organization } from '@/payload-types'
import CelebrationsSection from './sections/Celebration'
import DriverWall from './sections/DriverWall'
import InterviewsSection from './sections/Interviews'
import LeaderStrip from './sections/LeaderStrip'
import MembersGrid from './sections/MembersGrid'
import OrganizationsSection from './sections/Organizations'

export const dynamic = 'force-dynamic'

interface TeamPageProps {
    searchParams: Promise<{
        tag?: string
        category?: string
    }>
}

async function safeFetch(endpoint: string): Promise<any[]> {
    const url = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${endpoint}`
    try {
        const res = await fetch(url, { next: { revalidate: 3600 } })
        if (!res.ok) return []
        const data = await res.json()
        return data.docs || []
    } catch {
        return []
    }
}

async function fetchDrivers(): Promise<Driver[]> {
    return safeFetch('drivers?depth=2&limit=100&sort=last_name')
}

async function fetchLeaders(): Promise<Leader[]> {
    return safeFetch('leaders?depth=2&limit=100&sort=last_name')
}

async function fetchMembers(): Promise<Member[]> {
    return safeFetch('members?depth=2&limit=500&sort=last_name')
}

async function fetchCelebrations(): Promise<Celebration[]> {
    return safeFetch('celebrations?depth=2&limit=50&sort=-details.date_time')
}

async function fetchInterviews(): Promise<Interview[]> {
    return safeFetch('interviews?depth=2&limit=50&sort=-details.recorded_date')
}

async function fetchOrganizations(): Promise<Organization[]> {
    return safeFetch('organizations?depth=2&limit=100')
}

export default async function TeamPage({ searchParams }: TeamPageProps) {
    const params = await searchParams

    const [drivers, leaders, allMembers, celebrations, interviews, organizations] = await Promise.all([
        fetchDrivers(),
        fetchLeaders(),
        fetchMembers(),
        fetchCelebrations(),
        fetchInterviews(),
        fetchOrganizations()
    ])

    const filteredMembers = params.tag
        ? allMembers.filter((m) => m.tags?.some((t: any) => t.slug === params.tag))
        : allMembers

    return (
        <main className="min-h-screen bg-white">
            <section><DriverWall drivers={drivers} /></section>
            <section><LeaderStrip leaders={leaders} /></section>
            <section><MembersGrid members={filteredMembers} /></section>
            <section><CelebrationsSection data={celebrations} /></section>
            <section><InterviewsSection data={interviews} /></section>
            <section><OrganizationsSection organizations={organizations} /></section>
        </main>
    )
}