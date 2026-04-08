import PeopleSection from './sections/PeopleSection'
import SkillsSection from './sections/SkillsSection'
import TeamSpiritSection from './sections/TeamSpiritSection'

async function getTeamsData() {
  const url = process.env.NEXT_PUBLIC_PAYLOAD_URL
  const [drivers, leaders, members, skills, trainings, incidents, celebrations] = await Promise.all([
    fetch(`${url}/api/drivers?limit=100`).then((res) => res.json()),
    fetch(`${url}/api/leaders?limit=100`).then((res) => res.json()),
    fetch(`${url}/api/members?limit=100`).then((res) => res.json()),
    fetch(`${url}/api/skills?limit=100`).then((res) => res.json()),
    fetch(`${url}/api/trainings?limit=100`).then((res) => res.json()),
    fetch(`${url}/api/incidents?limit=100`).then((res) => res.json()),
    fetch(`${url}/api/celebrations?limit=100`).then((res) => res.json()),
  ])

  return {
    directory: {
      drivers: drivers.docs,
      leaders: leaders.docs,
      members: members.docs,
    },
    skills: {
      skills: skills.docs,
      trainings: trainings.docs,
    },
    culture: {
      incidents: incidents.docs,
      celebrations: celebrations.docs,
    },
  }
}

export default async function Page() {
  const data = await getTeamsData()

  return (
    <main className="bg-black">
      <PeopleSection
        drivers={data.directory.drivers}
        leaders={data.directory.leaders}
        members={data.directory.members}
      />
      <SkillsSection
        skills={data.skills.skills}
        trainings={data.skills.trainings}
      />
      <TeamSpiritSection
        celebrations={data.culture.celebrations}
        incidents={data.culture.incidents}
      />
    </main>
  )
}