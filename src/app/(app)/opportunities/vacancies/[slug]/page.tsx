import InfoGrid from '@/components/Section/InfoGrid'
import { Vacancy } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getVacancy(slug: string): Promise<Vacancy | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'vacancies',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function VacancyPage({ params }: PageProps) {
    const { slug } = await params
    const vacancy = await getVacancy(slug)

    if (!vacancy) {
        return notFound()
    }

    const infoBlocks = [
        {
            id: 'position',
            label: 'POSITION',
            title: vacancy.basics.title,
            description: vacancy.basics.description || undefined,
            metadata: [
                { key: 'DEPARTMENT', value: vacancy.details?.department || 'TBD' },
                { key: 'CONTRACT', value: vacancy.details?.contract?.toUpperCase()?.replace(/_/g, ' ') || 'FULL_TIME' },
            ]
        },
        {
            id: 'location',
            label: 'LOCATION',
            title: vacancy.details?.locations ? 'ON-SITE' : 'REMOTE',
            description: 'Work location',
            metadata: [
                { key: 'COORDINATES', value: vacancy.details?.locations ? `${vacancy.details.locations[1]}, ${vacancy.details.locations[0]}` : 'VARIES' },
            ]
        },
    ]

    return (
        <main className="w-full">
            <InfoGrid
                id="VAC_SPECS"
                title="Position Details"
                blocks={infoBlocks}
                columns={2}
            />

            <section className="w-full py-20 flex justify-center border-b border-black-pure bg-white-pure">
                <div className="max-w-2xl w-full px-8">
                    <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure mb-8">
                        <div className="flex items-center gap-4">
                            <span className="text-[11px] font-bold tracking-tight text-black-pure">VAC_FORM</span>
                            <div className="h-4 w-[1px] bg-neutral-200" />
                            <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">Application Form</h2>
                        </div>
                    </div>
                    <div className="bg-neutral-50 border-2 border-black-pure p-12 text-center">
                        <p className="font-mono text-sm font-black uppercase text-black-pure">
                            APPLICATION FORM COMPONENT
                        </p>
                        <p className="font-mono text-[10px] text-neutral-400 uppercase mt-4">
                            Submit your application for {vacancy.basics.title}
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full py-20 flex justify-center border-b border-black-pure">
                <Link
                    href={`/opportunities/vacancies/${slug}/details`}
                    className="px-12 py-6 bg-black-pure text-white-pure font-mono text-sm font-bold uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-2 border-black-pure"
                >
                    View Full Details →
                </Link>
            </section>
        </main>
    )
}