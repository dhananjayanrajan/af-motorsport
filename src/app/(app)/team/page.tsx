import { Celebration, Driver, Interview, Leader, Member } from '@/payload-types'
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

export default async function TeamPage({ searchParams }: TeamPageProps) {
    const params = await searchParams
    const drivers = await fetchDrivers()
    const leaders = await fetchLeaders()
    const allMembers = await fetchMembers()
    const celebrations = await fetchCelebrations()
    const interviews = await fetchInterviews()

    const filteredMembers = params.tag
        ? allMembers.filter((m) => m.tags?.some((t: any) => t.slug === params.tag))
        : allMembers

    const orgsUrl = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/organizations?limit=100`
    let orgsDocs = []
    try {
        const orgsRes = await fetch(orgsUrl, { next: { revalidate: 3600 } })
        if (orgsRes.ok) {
            const orgsData = await orgsRes.json()
            orgsDocs = orgsData.docs || []
        }
    } catch (e) {
        orgsDocs = []
    }

    return (
        <main className="min-h-screen bg-white">
            <section><DriverWall drivers={drivers} /></section>
            <section><LeaderStrip leaders={leaders} /></section>
            <section><MembersGrid members={filteredMembers} /></section>
            <section><CelebrationsSection data={celebrations} /></section>
            <section><InterviewsSection data={interviews} /></section>
            <section><OrganizationsSection organizations={orgsDocs} /></section>
        </main>
    )
}

async function safeFetch(endpoint: string): Promise<any[]> {
    const url = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${endpoint}`
    try {
        const res = await fetch(url, { next: { revalidate: 3600 } })
        if (!res.ok) return []
        const data = await res.json()
        return data.docs || []
    } catch (e) {
        return []
    }
}

async function fetchDrivers(): Promise<Driver[]> {
    return safeFetch('drivers?limit=100&sort=last_name')
}

async function fetchLeaders(): Promise<Leader[]> {
    return safeFetch('leaders?limit=100&sort=last_name')
}

async function fetchMembers(): Promise<Member[]> {
    return safeFetch('members?limit=500&sort=last_name')
}

async function fetchCelebrations(): Promise<Celebration[]> {
    return safeFetch('celebrations?limit=50&sort=-date')
}

async function fetchInterviews(): Promise<Interview[]> {
    return safeFetch('interviews?limit=50&sort=-published_at')
}