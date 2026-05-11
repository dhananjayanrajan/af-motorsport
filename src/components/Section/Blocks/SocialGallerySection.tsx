'use client'

import DotGridBackground from '@/components/Section/Backgrounds/DotGridBackground'
import SectionHeader from '@/components/Section/Components/SectionHeader'
import { cn } from '@/utilities/cn'
import {
    ArrowUpRight,
    ExternalLink,
    Facebook,
    Gamepad2,
    Ghost,
    Github,
    Hash,
    Heart,
    Instagram,
    Linkedin,
    MessageCircle,
    Music2,
    Twitter,
    Youtube
} from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export interface Social {
    id: number;
    accounts?:
    | {
        platform:
        | 'instagram'
        | 'x'
        | 'facebook'
        | 'youtube'
        | 'linkedin'
        | 'tiktok'
        | 'threads'
        | 'snapchat'
        | 'pinterest'
        | 'discord'
        | 'twitch'
        | 'whatsapp'
        | 'telegram'
        | 'github'
        | 'spotify'
        | 'other';
        label: string;
        handle?: string | null;
        url: string;
        visible?: boolean | null;
        id?: string | null;
    }[]
    | null;
    updatedAt?: string | null;
    createdAt?: string | null;
}

interface InstagramPost {
    id: string
    imageUrl?: string
    caption?: string
    likes?: string
    comments?: string
    permalink?: string
    aspectRatio?: 'aspect-[3/4]' | 'aspect-square' | 'aspect-[4/5]'
}

interface SocialGalleryProps {
    initialPosts?: InstagramPost[]
    handle: string
    socialData?: Social | null
}

const getPlatformIcon = (platform: string) => {
    switch (platform) {
        case 'instagram': return <Instagram className="size-4" />
        case 'x': return <Twitter className="size-4" />
        case 'youtube': return <Youtube className="size-4" />
        case 'facebook': return <Facebook className="size-4" />
        case 'linkedin': return <Linkedin className="size-4" />
        case 'tiktok': return <Music2 className="size-4" />
        case 'snapchat': return <Ghost className="size-4" />
        case 'threads': return <Hash className="size-4" />
        case 'discord':
        case 'twitch': return <Gamepad2 className="size-4" />
        case 'github': return <Github className="size-4" />
        default: return <ExternalLink className="size-4" />
    }
}

const generatePlaceholderPosts = (count: number, startIndex: number = 0): InstagramPost[] => {
    return Array.from({ length: count }).map((_, i) => {
        const seed = startIndex + i
        return {
            id: `ITEM-${seed.toString().padStart(3, '0')}`,
            imageUrl: `https://picsum.photos/seed/${seed + 124}/800/${seed % 3 === 0 ? 1000 : 800}`,
            caption: "Capturing the intersection of structural form and light within the current collection.",
            likes: Math.floor(Math.random() * 999).toString(),
            comments: Math.floor(Math.random() * 80).toString(),
            permalink: "https://instagram.com",
            aspectRatio: seed % 4 === 0 ? 'aspect-[3/4]' : seed % 3 === 0 ? 'aspect-[4/5]' : 'aspect-square'
        }
    })
}

export function SocialGallery({ initialPosts = [], handle, socialData }: SocialGalleryProps) {
    const [posts, setPosts] = useState<InstagramPost[]>([])

    useEffect(() => {
        if (!initialPosts || initialPosts.length === 0) {
            setPosts(generatePlaceholderPosts(12))
        } else {
            setPosts(initialPosts.slice(0, 12))
        }
    }, [initialPosts])

    const visibleAccounts = socialData?.accounts?.filter(acc => acc.visible !== false) || []

    return (
        <section className="relative w-full bg-white-pure border-t-2 border-black-pure overflow-hidden">
            <DotGridBackground />

            <SectionHeader
                title="SOCIAL"
                subtitle={`@${handle.toUpperCase()}`}
                variant={1}
                metadata={String(posts.length).padStart(2, '0')}
            />

            <div className="w-full border-b-2 border-black-pure bg-white-pure relative z-20">
                <div className="container max-w-full lg:max-w-[1600px] mx-auto flex flex-wrap divide-x-2 divide-black-pure border-x-2 border-black-pure">
                    {visibleAccounts.length > 0 ? (
                        visibleAccounts.map((account, idx) => (
                            <Link
                                key={account.id || idx}
                                href={account.url}
                                target="_blank"
                                className="flex-1 min-w-[120px] p-4 flex flex-col items-center justify-center gap-1 group transition-colors hover:bg-primary-500"
                            >
                                <span className="text-black-pure">
                                    {getPlatformIcon(account.platform)}
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-tighter">
                                    {account.label}
                                </span>
                                <span className="text-sm font-black tracking-widest">
                                    -
                                </span>
                            </Link>
                        ))
                    ) : (
                        <div className="w-full p-4 flex items-center justify-center text-[10px] font-black uppercase tracking-widest">
                            No Social Accounts Connected
                        </div>
                    )}
                </div>
            </div>

            <div className="container py-8 sm:py-12 lg:py-16 max-w-full lg:max-w-[1600px] mx-auto relative z-10">
                <div className="border-2 border-black-pure bg-white-pure p-6 sm:p-8 lg:p-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">

                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
                        {posts.map((post, idx) => (
                            <motion.div
                                key={`${post.id}-${idx}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                className="break-inside-avoid"
                            >
                                <Link
                                    href={post.permalink || '#'}
                                    target="_blank"
                                    className="group relative flex flex-col border-2 border-black-pure bg-white-pure transition-all duration-300 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
                                >
                                    <div className="h-12 px-4 flex items-center justify-between border-b-2 border-black-pure bg-white-pure">
                                        <div className="flex items-center gap-3">
                                            <span className="text-black-pure"><Instagram className="size-4 stroke-[2.5px]" /></span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-black-pure">
                                                {handle}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <ArrowUpRight className="size-4 stroke-[3px] text-black-pure transition-transform duration-300 group-hover:translate-x-5" />
                                            <ArrowUpRight className="size-4 stroke-[3px] text-primary-500 absolute translate-x-[-20px] transition-transform duration-300 group-hover:translate-x-0" />
                                        </div>
                                    </div>

                                    <div className={cn("relative overflow-hidden bg-black-pure", post.aspectRatio)}>
                                        <img
                                            src={post.imageUrl}
                                            alt={post.caption}
                                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-black-pure/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 z-20">
                                            <div className="flex items-center gap-8">
                                                <div className="flex flex-col items-center gap-1 transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                                                    <Heart className="size-6 fill-primary-500 stroke-primary-500" />
                                                    <span className="font-black text-white-pure text-xs">{post.likes}</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-1 transition-transform duration-300 translate-y-4 group-hover:translate-y-0 delay-75">
                                                    <MessageCircle className="size-6 fill-white-pure stroke-white-pure" />
                                                    <span className="font-black text-white-pure text-xs">{post.comments}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-white-pure border-t-2 border-black-pure transition-colors duration-300 group-hover:bg-primary-500">
                                        <p className="text-[11px] font-black leading-tight uppercase tracking-tight text-black-pure line-clamp-2">
                                            {post.caption}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}