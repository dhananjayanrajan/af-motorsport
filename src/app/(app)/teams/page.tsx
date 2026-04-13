import { DESIGN_SYSTEM } from '@/lib/constants';

async function getTeamsPageData() {
  const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
  if (!url) throw new Error("PAYLOAD_URL is not defined");

  const [teams, drivers, organizations, leaders, members, individuals] = await Promise.all([
    fetch(`${url}/api/teams?limit=100`).then(res => res.json()),
    fetch(`${url}/api/drivers?limit=100`).then(res => res.json()),
    fetch(`${url}/api/organizations?limit=100`).then(res => res.json()),
    fetch(`${url}/api/leaders?limit=100`).then(res => res.json()),
    fetch(`${url}/api/members?limit=100`).then(res => res.json()),
    fetch(`${url}/api/individuals?limit=100`).then(res => res.json())
  ]);

  return {
    teams: teams.docs || [],
    drivers: drivers.docs || [],
    organizations: organizations.docs || [],
    leaders: leaders.docs || [],
    members: members.docs || [],
    individuals: individuals.docs || []
  };
}

export default async function TeamsPage() {
  const data = await getTeamsPageData();

  return (
    <main
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950 }}
      className="min-h-screen"
    >
      {/* <TeamsSection teams={data.teams} />
      
      <DriversSection drivers={data.drivers} />
      
      <OrganizationsSection organizations={data.organizations} />
      
      <LeadersSection leaders={data.leaders} />
      
      <MembersSection members={data.members} />
      
      <IndividualsSection individuals={data.individuals} /> */}
    </main>
  );
}