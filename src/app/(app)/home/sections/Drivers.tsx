import { Driver, Media, Team } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export interface TopDriversProps {
    drivers: (Driver & {
        team?: Team | null
    })[] | null
}

const TopDrivers: React.FC<TopDriversProps> = ({ drivers }) => {
    const fallbackImage = 'https://picsum.photos/seed/motorsport/1280/720'

    return (
        <section className="relative w-full min-h-screen bg-white flex flex-col border-b-8 border-black overflow-hidden">
            <div className="flex-1 flex flex-col md:flex-row">
                <div className="w-full md:w-32 bg-black flex flex-row md:flex-col items-center justify-between p-8 border-b-8 md:border-b-0 md:border-r-8 border-black shrink-0">
                    <div className="flex flex-col gap-2">
                        <div className="w-12 h-12 bg-red-600 border-4 border-white" />
                        <div className="w-12 h-12 bg-blue-600 border-4 border-white" />
                    </div>
                    <div className="md:[writing-mode:vertical-lr] md:rotate-180">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase m-0 leading-none tracking-normal">
                            Top Drivers
                        </h2>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="w-12 h-12 bg-yellow-400 border-4 border-white" />
                        <div className="w-12 h-12 bg-white" />
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-black gap-2">
                    {drivers?.slice(0, 4).map((driver, index) => {
                        const teamObj = driver.team && typeof driver.team === 'object' ? driver.team : null
                        const teamSlug = teamObj?.slug || 'unattached'
                        const driverPath = `/teams/${teamSlug}/drivers/${driver.slug}`
                        const avatarUrl = (driver.assets?.avatar as Media)?.url || fallbackImage
                        const teamName = teamObj?.name || 'Independent'

                        return (
                            <div
                                key={driver.id || index}
                                className="group relative flex flex-col bg-white overflow-hidden transition-all duration-300"
                            >
                                <div className="absolute top-0 right-0 z-20 flex flex-col">
                                    <div className="bg-black text-white px-6 py-4 border-l-4 border-b-4 border-black group-hover:bg-red-600 transition-colors">
                                        <span className="text-4xl font-black leading-none">
                                            {String(driver.basics?.racing_number || index + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>

                                <div className="relative h-2/3 w-full bg-black">
                                    <Image
                                        src={avatarUrl}
                                        alt={driver.last_name || 'Driver'}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                                        sizes="(max-width: 1024px) 100vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-blue-600/20 mix-blend-multiply group-hover:bg-transparent transition-all" />
                                </div>

                                <div className="relative flex-1 flex flex-col p-8 z-10 transition-transform duration-300 group-hover:-translate-y-4">
                                    <div className="mb-8 border-l-8 border-red-600 pl-4">
                                        <span className="block text-sm font-black text-gray-500 uppercase leading-none mb-2">
                                            {teamName}
                                        </span>
                                        <h3 className="text-3xl font-black text-black uppercase leading-none m-0 truncate">
                                            {driver.last_name}
                                        </h3>
                                        <span className="text-lg font-black text-black uppercase opacity-60">
                                            {driver.first_name}
                                        </span>
                                    </div>

                                    <div className="mt-auto flex flex-col gap-2">
                                        <Link
                                            href={driverPath}
                                            className="w-full bg-black text-white py-4 flex items-center justify-center gap-4 text-sm font-black uppercase hover:bg-blue-600 focus:bg-yellow-400 focus:text-black transition-all"
                                        >
                                            View Profile
                                            <div className="w-4 h-4 bg-white group-hover:bg-yellow-400" />
                                        </Link>
                                        <Link
                                            href={`${driverPath}/details`}
                                            className="w-full border-4 border-black bg-white text-black py-3 text-center text-sm font-black uppercase hover:bg-yellow-400 focus:bg-red-600 focus:text-white transition-all"
                                        >
                                            Telemetry
                                        </Link>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full h-2 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform" />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="h-32 bg-white border-t-8 border-black flex items-stretch overflow-hidden">
                <Link
                    href="/teams"
                    className="flex-1 flex items-center justify-between px-12 bg-white hover:bg-yellow-400 transition-all group"
                >
                    <div className="flex flex-col">
                        <span className="text-sm font-black uppercase text-gray-400 group-hover:text-black">Directory</span>
                        <span className="text-3xl md:text-4xl font-black uppercase text-black">All Athletes</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-black flex items-center justify-center text-white group-hover:translate-x-4 transition-transform">
                            <div className="w-8 h-8 border-r-4 border-t-4 border-white rotate-45 -translate-x-2 translate-y-2" />
                        </div>
                    </div>
                </Link>
                <div className="hidden lg:flex w-1/3 border-l-8 border-black">
                    <div className="flex-1 bg-red-600 flex items-center justify-center border-r-8 border-black">
                        <div className="w-12 h-12 bg-white rounded-none" />
                    </div>
                    <div className="flex-1 bg-blue-600 flex items-center justify-center">
                        <div className="w-12 h-12 bg-yellow-400 rounded-none" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TopDrivers