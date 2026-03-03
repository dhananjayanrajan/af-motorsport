import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeaderClient } from './index.client'

export async function Header() {
  const header = await getCachedGlobal('header', 1)()
  const socials = await getCachedGlobal('socials', 1)()

  // Debug: log to server console to verify data is being fetched
  console.log('Header data:', header)
  console.log('Socials data:', socials)

  return <HeaderClient header={header} socials={socials} />
}