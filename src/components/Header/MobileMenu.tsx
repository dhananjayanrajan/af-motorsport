'use client'

import type { Header, Social } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useAuth } from '@/providers/Auth'
import { cn } from '@/utilities/cn'
import { ChevronDown, MenuIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import {
  Camera,
  Disc,
  Facebook,
  Github,
  Instagram,
  Link2,
  Linkedin,
  MessageCircle,
  Music,
  Phone,
  Send,
  Twitch,
  Twitter,
  Youtube,
} from 'lucide-react'

const socialIcons: Record<string, React.ElementType> = {
  instagram: Instagram,
  x: Twitter,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  tiktok: Music,
  threads: MessageCircle,
  snapchat: Camera,
  discord: Disc,
  twitch: Twitch,
  whatsapp: Phone,
  telegram: Send,
  github: Github,
  spotify: Music,
  other: Link2,
}

const diamondClip = 'polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)'

interface Props {
  menu: Header['navItems']
  socials: Social['accounts']
}

export function MobileMenu({ menu, socials }: Props) {
  const { user } = useAuth()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const validSocials = socials?.filter(s => s && s.url) || []

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger className="relative flex h-11 w-11 items-center justify-center rounded-none border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:bg-black dark:text-white">
        <MenuIcon className="h-4" />
      </SheetTrigger>

      <SheetContent side="left" className="px-0 overflow-y-auto flex flex-col h-full">
        <SheetHeader className="px-6 pt-6 pb-2">
          <SheetTitle className="text-left">AF Motorsport</SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <div className="flex-1 px-6">
          {menu?.length ? (
            <ul className="flex w-full flex-col">
              {menu.map(item => (
                <li className="py-3 border-b border-neutral-100 dark:border-neutral-800" key={item.id}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-light">{item.label}</span>
                    {item.subItems && item.subItems.length > 0 && (
                      <button onClick={() => toggleExpand(item.id!)} className="p-1">
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            expandedItems.includes(item.id!) && 'rotate-180'
                          )}
                        />
                      </button>
                    )}
                  </div>
                  {expandedItems.includes(item.id!) && item.subItems && (
                    <ul className="pl-4 mt-3 space-y-3">
                      {item.subItems.map(sub => (
                        <li key={sub.id}>
                          <CMSLink
                            {...sub.link}
                            label={sub.label || sub.link.label}
                            className="text-sm text-neutral-600 dark:text-neutral-400"
                          />
                          {sub.description && (
                            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-0.5">
                              {sub.description}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="px-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-black mb-4 text-neutral-400">My account</h3>
          <div className="space-y-4">
            {user ? (
              <>
                <Link href="/orders" className="block text-sm font-light">Orders</Link>
                <Link href="/account" className="block text-sm font-light">Manage account</Link>
                <div className="group relative">
                  <Button asChild size="lg" className="relative w-full h-12 bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white rounded-none overflow-hidden border-none" style={{ clipPath: diamondClip }}>
                    <Link href="/logout">
                      <span className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] bg-red-600" style={{ clipPath: diamondClip }} />
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300 group-hover:italic font-black uppercase tracking-widest text-[10px]">Log out</span>
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="group relative">
                  <Button asChild size="lg" className="relative w-full h-12 bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white rounded-none overflow-hidden border-none" style={{ clipPath: diamondClip }}>
                    <Link href="/login">
                      <span className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] bg-zinc-950" style={{ clipPath: diamondClip }} />
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300 group-hover:italic font-black uppercase tracking-widest text-[10px]">Log in</span>
                    </Link>
                  </Button>
                </div>
                <div className="group relative">
                  <Button asChild size="lg" className="relative w-full h-12 bg-red-600 text-white rounded-none overflow-hidden border-none" style={{ clipPath: diamondClip }}>
                    <Link href="/create-account">
                      <span className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] bg-zinc-950" style={{ clipPath: diamondClip }} />
                      <span className="relative z-10 group-hover:italic font-black uppercase tracking-widest text-[10px]">Create account</span>
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {validSocials.length > 0 && (
          <div className="px-6 py-6 mt-2 border-t border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xs uppercase tracking-wider font-light text-neutral-500 dark:text-neutral-500 mb-4">
              Follow us
            </h3>
            <div className="flex flex-wrap gap-4">
              {validSocials.map(account => {
                const Icon = socialIcons[account.platform] || Link2
                return (
                  <motion.a
                    key={account.id}
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 dark:text-neutral-500 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={account.label || account.handle || account.platform}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}