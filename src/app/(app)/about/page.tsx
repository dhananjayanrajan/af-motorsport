import IdentitySection from './sections/Identity'
import IndividualsSection from './sections/Individuals'
import InitiativesSection from './sections/Initiatives'
import OrganizationsSection from './sections/Organizations'
import PlansSection from './sections/Plans'
import ProgramsSection from './sections/Programs'
import StatementsSection from './sections/Statements'
import TimelinesSection from './sections/Timelines'

export const dynamic = 'force-dynamic'

async function safeFetch(endpoint: string) {
  const url = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${endpoint}`
  const isGlobal = endpoint.includes('globals/')

  try {
    const res = await fetch(url, {
      next: { revalidate: 0 },
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!res.ok) {
      return isGlobal ? null : { docs: [] }
    }

    const data = await res.json()
    return data
  } catch (e) {
    return isGlobal ? null : { docs: [] }
  }
}

export default async function AboutPage() {
  const [
    initiativesRes,
    programsRes,
    plansRes,
    timelinesRes,
    statementsRes,
    individualsRes,
    organizationsRes,
    identityRes
  ] = await Promise.all([
    safeFetch('initiatives?limit=100'),
    safeFetch('programs?limit=100'),
    safeFetch('plans?limit=100'),
    safeFetch('timelines?limit=100'),
    safeFetch('statements?limit=100'),
    safeFetch('individuals?limit=100'),
    safeFetch('organizations?limit=100'),
    safeFetch('globals/identity?draft=false&depth=1'),
  ])

  const initiatives = initiativesRes?.docs || []
  const programs = programsRes?.docs || []
  const plans = plansRes?.docs || []
  const timelines = timelinesRes?.docs || []
  const statements = statementsRes?.docs || []
  const individuals = individualsRes?.docs || []
  const organizations = organizationsRes?.docs || []
  const identity = identityRes?.docs ? identityRes.docs[0] : identityRes

  return (
    <main className="min-h-screen bg-white">
      {identity && <IdentitySection identity={identity} />}
      <InitiativesSection initiatives={initiatives} />
      <ProgramsSection programs={programs} />
      <PlansSection plans={plans} />
      <TimelinesSection timelines={timelines} />
      <StatementsSection statements={statements} />
      <IndividualsSection individuals={individuals} />
      <OrganizationsSection organizations={organizations} />
    </main>
  )
}