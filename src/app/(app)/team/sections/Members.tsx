"use client"

import SectionDescription from '@/components/Section/Description'
import SectionFooter from '@/components/Section/Footer'
import SectionHeader from '@/components/Section/Header'
import SectionTitle from '@/components/Section/Title'
import { Country, Media, Member } from '@/payload-types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

interface MembersDirectoryProps {
    members: Member[]
}

const MembersDirectory: React.FC<MembersDirectoryProps> = ({ members = [] }) => {
    return (
        <section className="bg-white-pure min-h-screen flex flex-col">
            <SectionHeader
                variant={2}
                title="Personnel"
                subtitle="Global Network"
                totalEntriesLabel="Active Members"
                officialLabel="Verified"
                seasonLabel="Status"
                categoryLabel="Operations"
            />

            <div className="px-6 md:px-10 py-8 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-center">
                <div className="lg:col-span-8">
                    <SectionTitle
                        variant={1}
                        label="Member Index"
                        highlight="Community"
                        lineOne="Operational"
                        lineTwo="Directory"
                    />
                </div>
                <div className="lg:col-span-4">
                    <SectionDescription
                        variant={1}
                        text="The official roster of our global community members and specialists currently active within the network."
                    />
                </div>
            </div>

            <div className="flex flex-wrap border-t-2 border-black-pure">
                {members.map((member, index) => (
                    <MemberCard key={member.id} member={member} index={index} />
                ))}
            </div>

            <SectionFooter
                variant={5}
                navigateLabel="Navigation"
                entryPointsLabel="Quick Access"
            />
        </section>
    )
}

function MemberCard({ member, index }: { member: Member; index: number }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const avatarUrl = (member.assets?.avatar as Media)?.url || `https://picsum.photos/seed/${member.id}/800/800`
    const nationality = (member.basics?.nationality as Country)?.name || 'Global'

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 flex flex-col border-b-2 border-r-2 border-black-pure bg-white-pure transition-all duration-300 hover:z-10 hover:shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/team/member/${member.slug}`} className="flex flex-col h-full group focus:outline-none">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.div
                        animate={{ scale: isHovered ? 1.08 : 1 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full"
                    >
                        <Image
                            src={avatarUrl}
                            alt={member.last_name}
                            fill
                            sizes="(min-width: 1536px) 20vw, (min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: isHovered ? 0 : -20, opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-3 left-3 z-10"
                    >
                        <div className="bg-secondary-500 px-2 md:px-3 py-0.5 md:py-1 border border-black-pure rotate-[-2deg] hover:rotate-0 transition-transform">
                            <span className="text-[7px] md:text-[8px] font-black uppercase text-black-pure">
                                {nationality}
                            </span>
                        </div>
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black-pure/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-4 md:p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 md:gap-3 mb-4 md:mb-5">
                        <div className="space-y-0.5">
                            <motion.h3
                                animate={{ x: isHovered ? 4 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-sm md:text-base lg:text-lg font-race font-black text-black-pure uppercase leading-none tracking-tight group-hover:text-primary-600 transition-colors"
                            >
                                {member.first_name}
                            </motion.h3>
                            <motion.h3
                                animate={{ x: isHovered ? 4 : 0 }}
                                transition={{ duration: 0.2, delay: 0.05 }}
                                className="text-sm md:text-base lg:text-lg font-race font-black text-secondary-600 uppercase leading-none tracking-tight group-hover:text-black-pure transition-colors"
                            >
                                {member.last_name}
                            </motion.h3>
                        </div>
                        {member.basics?.nickname && (
                            <motion.div
                                animate={{
                                    rotate: isHovered ? 0 : 3,
                                    scale: isHovered ? 1.05 : 1
                                }}
                                transition={{ duration: 0.3 }}
                                className="bg-black-pure px-1.5 md:px-2 py-0.5 md:py-1"
                            >
                                <span className="text-white-pure text-[6px] md:text-[7px] font-black uppercase tracking-wider">
                                    {member.basics.nickname}
                                </span>
                            </motion.div>
                        )}
                    </div>

                    <p className="text-[9px] md:text-[10px] font-bold text-black-pure/60 uppercase leading-relaxed mb-4 md:mb-5 line-clamp-2">
                        {member.basics?.description || "Active member specializing in regional operations."}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-2 md:gap-3">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 h-10 md:h-11 border border-black-pure flex items-center px-3 md:px-4 bg-white-pure hover:bg-tertiary-500 transition-all duration-300 group/date cursor-default"
                        >
                            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-wider text-black-pure group-hover/date:text-white-pure transition-colors">
                                Joined {member.basics?.joining_date ? new Date(member.basics.joining_date).getFullYear() : '2026'}
                            </span>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 0 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{ rotate: isFocused ? 0 : (isHovered ? 0 : -2) }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="size-9 md:size-10 bg-primary-500 border border-black-pure flex items-center justify-center text-black-pure hover:bg-black-pure hover:text-white-pure focus:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 active:scale-95 cursor-pointer"
                        >
                            <motion.span
                                animate={{ x: isHovered ? 4 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-lg md:text-xl font-black leading-none"
                            >
                                →
                            </motion.span>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="h-0.5 bg-primary-500 origin-left"
                />
            </Link>
        </motion.div>
    )
}

export default MembersDirectory