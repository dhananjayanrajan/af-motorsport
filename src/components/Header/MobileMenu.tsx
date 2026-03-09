'use client'

import type { Header, Social } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { useAuth } from '@/providers/Auth'
import { cn } from '@/utilities/cn'
import { ChevronDown, ChevronRight, LogIn, LogOut, MenuIcon, Shield, UserPlus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
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
      <SheetTrigger className="relative flex h-10 w-10 items-center justify-center bg-black border border-zinc-800 text-white transition-all active:scale-95 group">
        <MenuIcon className={cn("h-4 w-4 transition-colors duration-200", `group-hover:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)} />
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col bg-zinc-950 border-r border-zinc-800 text-white w-full max-w-[300px] p-0">
        <SheetHeader className="p-8 border-b border-zinc-900 bg-black/50">
          <div className="flex items-center gap-3 mb-2">
            <Shield className={cn("h-4 w-4 animate-pulse", `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)} />
            <SheetTitle className={cn("text-xs font-black uppercase text-white", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Mainframe</SheetTitle>
          </div>
          <SheetDescription className={cn("text-[9px] uppercase font-bold text-zinc-500 leading-relaxed", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>
            Navigation interface active. Select a sector to engage.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {menu?.length ? (
            <ul className="flex flex-col divide-y divide-zinc-900/50">
              {menu.map(item => (
                <li key={item.id} className="group">
                  <div className="flex items-center justify-between p-6 transition-colors hover:bg-zinc-900/30">
                    <span className={cn("text-[11px] font-black uppercase italic transition-colors duration-200", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT, `group-hover:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}>
                      {item.label}
                    </span>
                    {item.subItems && item.subItems.length > 0 && (
                      <button
                        onClick={() => toggleExpand(item.id!)}
                        className="p-2 bg-zinc-900 border border-zinc-800 active:scale-90 transition-transform"
                      >
                        <ChevronDown
                          className={cn(
                            'h-3 w-3 text-zinc-500 transition-transform duration-200',
                            expandedItems.includes(item.id!) && `rotate-180 text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`
                          )}
                        />
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {expandedItems.includes(item.id!) && item.subItems && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-black/40 border-t border-zinc-900/50"
                      >
                        {item.subItems.map(sub => (
                          <li key={sub.id} className="border-b border-zinc-900/30 last:border-none">
                            <CMSLink
                              {...sub.link}
                              label={sub.label || sub.link.label}
                              className="flex flex-col px-8 py-4 hover:bg-zinc-900/50 transition-colors duration-200"
                            >
                              <span className="text-[10px] font-bold text-white uppercase tracking-wider">{sub.label || sub.link.label}</span>
                              {sub.description && (
                                <span className="text-[8px] text-zinc-600 uppercase font-medium tracking-widest mt-1">{sub.description}</span>
                              )}
                            </CMSLink>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="p-8 bg-black/80 border-t border-zinc-900 space-y-8">
          <div>
            <span className={cn("text-[8px] font-black uppercase text-zinc-700 block mb-6", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Identity Systems</span>
            <div className="flex flex-col gap-4">
              {user ? (
                <>
                  <Link
                    href="/account"
                    className="flex items-center justify-between group py-2"
                  >
                    <span className={cn("text-[10px] font-black uppercase text-zinc-400 group-hover:text-white transition-colors duration-200", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>Manage Profile</span>
                    <ChevronRight className={cn("h-3 w-3 text-zinc-800 transition-colors duration-200", `group-hover:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)} />
                  </Link>
                  <Link
                    href="/logout"
                    className="relative group flex items-center justify-center w-full h-12 bg-zinc-900 text-white overflow-hidden transition-all active:scale-95 border border-zinc-800"
                    style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                  >
                    <div className={cn(`absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-200`, `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)} />
                    <span className={cn(`relative z-10 text-[9px] font-black uppercase italic flex items-center gap-2 group-hover:text-black transition-colors duration-200`, DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>
                      <LogOut className="h-3 w-3" /> Terminate Session
                    </span>
                  </Link>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link
                    href="/login"
                    className="relative group flex items-center justify-center w-full h-12 bg-white text-black overflow-hidden transition-all active:scale-95"
                    style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                  >
                    <div className="absolute inset-0 bg-zinc-800 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-200" />
                    <span className={cn(`relative z-10 text-[9px] font-black uppercase italic flex items-center gap-2 group-hover:text-white transition-colors duration-200`, DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>
                      <LogIn className="h-3 w-3" /> Authorize
                    </span>
                  </Link>
                  <Link
                    href="/create-account"
                    className={cn(`relative group flex items-center justify-center w-full h-12 text-black overflow-hidden transition-all active:scale-95`, `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}
                    style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                  >
                    <div className="absolute inset-0 bg-black translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-200" />
                    <span className={cn(`relative z-10 text-[9px] font-black uppercase italic flex items-center gap-2 transition-colors duration-200`, DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL, `group-hover:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}>
                      <UserPlus className="h-3 w-3" /> Join Initiative
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {validSocials.length > 0 && (
            <div className="pt-6 border-t border-zinc-900/50">
              <div className="flex flex-wrap gap-5 justify-center">
                {validSocials.map(account => {
                  const Icon = socialIcons[account.platform] || Link2
                  return (
                    <motion.a
                      key={account.id}
                      href={account.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn("text-zinc-600 transition-colors duration-200", `hover:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}