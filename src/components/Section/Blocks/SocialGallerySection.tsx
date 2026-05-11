'use client'

import DotGridBackground from '@/components/Section/Backgrounds/DotGridBackground'
import SectionHeader from '@/components/Section/Components/SectionHeader'
import { ArrowUpRight, Heart, Instagram, MessageCircle } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface InstagramPost {
    id: string
    imageUrl?: string
    caption?: string
    likes?: string
    comments?: string
    permalink?: string
    aspectRatio?: string
}

interface SocialGalleryProps {
    initialPosts?: InstagramPost[]
    handle: string
}

const generatePlaceholderPosts = (count: number, startIndex: number = 0): InstagramPost[] => {
    return Array.from({ length: count }).map((_, i) => {
        const seed = startIndex + i
        return {
            id: `ITEM-${seed.toString().padStart(3, '0')}`,
            imageUrl: `https://picsum.photos/seed/${seed + 200}/800/${seed % 3 === 0 ? 1200 : 800}`,
            caption: "POST CONTENT DATA UNIT",
            likes: Math.floor(Math.random() * 999).toString(),
            comments: Math.floor(Math.random() * 80).toString(),
            permalink: "https://instagram.com",
            aspectRatio: seed % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'
        }
    })
}

export function SocialGallery({ initialPosts = [], handle }: SocialGalleryProps) {
    const [posts, setPosts] = useState<InstagramPost[]>([])
    const [loading, setLoading] = useState(false)
    const loaderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!initialPosts || initialPosts.length === 0) {
            setPosts(generatePlaceholderPosts(30))
        } else {
            setPosts(initialPosts)
        }
    }, [initialPosts])

    const fetchMorePosts = async () => {
        if (loading) return
        setLoading(true)
        await new Promise((res) => setTimeout(res, 800))
        const nextSet = generatePlaceholderPosts(20, posts.length)
        setPosts((prev) => [...prev, ...nextSet])
        setLoading(false)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && posts.length > 0) {
                    fetchMorePosts()
                }
            },
            { threshold: 0.1 }
        )
        if (loaderRef.current) observer.observe(loaderRef.current)
        return () => observer.disconnect()
    }, [loading, posts.length])

    return (
        <section className="relative w-full bg-white-pure border-t-2 border-black-pure overflow-hidden">
            <DotGridBackground />

            <SectionHeader
                title="SOCIAL FEED"
                subtitle={`@${handle.toUpperCase()}`}
                variant={1}
                metadata={String(posts.length).padStart(2, '0')}
            />

            <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
                <div className="block w-full columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-5 gap-6 space-y-6">
                    {posts.map((post, idx) => (
                        <motion.div
                            key={`${post.id}-${idx}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="break-inside-avoid-column mb-6 w-full inline-block"
                        >
                            <Link
                                href={post.permalink || '#'}
                                target="_blank"
                                className="group relative flex flex-col border-2 border-black-pure bg-white-pure transition-all hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                            >
                                <div className="flex items-center justify-between p-4 border-b-2 border-black-pure bg-white-pure">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 border-2 border-black-pure bg-primary-500 flex items-center justify-center shrink-0">
                                            <Instagram className="size-4 text-black-pure stroke-[2.5px]" />
                                        </div>
                                        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure truncate">
                                            {handle}
                                        </span>
                                    </div>
                                    <ArrowUpRight className="size-4 stroke-[3px] text-black-pure shrink-0" />
                                </div>

                                <div className={`${post.aspectRatio || 'aspect-square'} relative overflow-hidden bg-black-pure`}>
                                    <img
                                        src={post.imageUrl}
                                        alt={post.caption}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4 z-20 pointer-events-none bg-primary-500/90">
                                        <div className="flex gap-8">
                                            <div className="flex flex-col items-center gap-1">
                                                <Heart className="size-7 fill-black-pure stroke-black-pure stroke-[2px]" />
                                                <span className="font-mono font-black text-black-pure text-sm">{post.likes}</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <MessageCircle className="size-7 fill-white-pure stroke-black-pure stroke-[2px]" />
                                                <span className="font-mono font-black text-black-pure text-sm">{post.comments}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-white-pure border-t-2 border-black-pure">
                                    <p className="text-xs font-black leading-snug uppercase tracking-tight text-black-pure line-clamp-3">
                                        {post.caption}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div
                    ref={loaderRef}
                    className="w-full py-24 flex flex-col items-center justify-center"
                >
                    {loading && (
                        <div className="flex flex-col items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="size-3 bg-black-pure animate-pulse" />
                                <div className="size-3 bg-primary-500 animate-pulse delay-75" />
                                <div className="size-3 bg-black-pure animate-pulse delay-150" />
                            </div>
                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-black-pure">
                                SYNCHRONIZING
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}