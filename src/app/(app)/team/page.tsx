import { Celebration, Driver, Interview, Leader, Member } from '@/payload-types'
import CelebrationsSection from './sections/Celebration'
import DriverWall from './sections/DriverWall'
import InterviewsSection from './sections/Interviews'
import LeaderStrip from './sections/LeaderStrip'
import MembersGrid from './sections/MembersGrid'
import OrganizationsSection from './sections/Organizations'

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

    const orgsRes = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/organizations?limit=100`, { next: { revalidate: 3600 } });
    const orgsData = orgsRes.ok ? await orgsRes.json() : { docs: [] };

    return (
        <main className="min-h-screen bg-white">
            <section><DriverWall drivers={drivers} /></section>
            <section><LeaderStrip leaders={leaders} /></section>
            <section><MembersGrid members={filteredMembers} /></section>
            <section><CelebrationsSection data={celebrations} /></section>
            <section><InterviewsSection data={interviews} /></section>
            <section><OrganizationsSection organizations={orgsData.docs} /></section>
        </main>
    )
}

async function fetchDrivers(): Promise<Driver[]> {
    const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/drivers?limit=100&sort=last_name`, {
        next: { revalidate: 3600 },
    })
    const data = await res.json()
    return data.docs
}

async function fetchLeaders(): Promise<Leader[]> {
    const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/leaders?limit=100&sort=last_name`, {
        next: { revalidate: 3600 },
    })
    const data = await res.json()
    return data.docs
}

async function fetchMembers(): Promise<Member[]> {
    const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/members?limit=500&sort=last_name`, {
        next: { revalidate: 3600 },
    })
    const data = await res.json()
    return data.docs
}

async function fetchCelebrations(): Promise<Celebration[]> {
    const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/celebrations?limit=50&sort=-date`, {
        next: { revalidate: 3600 },
    })
    const data = await res.json()
    return data.docs
}

async function fetchInterviews(): Promise<Interview[]> {
    const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/interviews?limit=50&sort=-published_at`, {
        next: { revalidate: 3600 },
    })
    const data = await res.json()
    return data.docs
}