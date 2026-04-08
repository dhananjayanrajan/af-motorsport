import ChampionshipHistory from './sections/ChampionshipHistory'
import RegulationsFormat from './sections/RegulationsFormat'
import SeasonListSection from './sections/SeasonListSection'

async function getChampionshipData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL
    const champRes = await fetch(`${url}/api/championships?where[slug][equals]=${slug}&limit=1`).then((res) => res.json())

    if (!champRes.docs.length) return null

    const championship = champRes.docs[0]

    const seasons = await fetch(`${url}/api/seasons?where[categories][in]=${championship.id}&limit=100`).then((res) => res.json())

    return {
        championship,
        seasons: seasons.docs
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const data = await getChampionshipData(params.slug)

    if (!data) return null

    return (
        <main className="bg-black min-h-screen">
            <RegulationsFormat
                championship={data.championship}
            />

            <SeasonListSection
                seasons={data.seasons}
            />

            <ChampionshipHistory
                championship={data.championship}
            />
        </main>
    )
}