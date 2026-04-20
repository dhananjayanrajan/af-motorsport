import { Celebration, Driver, Interview, Leader, Member } from '@/payload-types'
import CelebrationsGallery from './sections/Celebration'
import DriversDirectory from './sections/Drivers'
import InterviewsSection from './sections/Interviews'
import LeadersDirectory from './sections/Leaders'
import MembersDirectory from './sections/Members'

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

export default async function TeamPage({ searchParams }: TeamPageProps) {
    const params = await searchParams

    const [drivers, leaders, allMembers, celebrations, interviews] = await Promise.all([
        fetchDrivers(),
        fetchLeaders(),
        fetchMembers(),
        fetchCelebrations(),
        fetchInterviews()
    ])

    const filteredMembers = params.tag
        ? allMembers.filter((m) => m.tags?.some((t: any) => t.slug === params.tag))
        : allMembers

    return (
        <main className="min-h-screen bg-white">
            <section><DriversDirectory drivers={drivers} /></section>
            <section><LeadersDirectory leaders={leaders} /></section>
            <section><MembersDirectory members={filteredMembers} /></section>
            <section><CelebrationsGallery celebrations={celebrations} /></section>
            <section><InterviewsSection data={interviews} /></section>
        </main>
    )
}