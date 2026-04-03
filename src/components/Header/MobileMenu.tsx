'use client'

import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  ChevronRight, LogIn, LogOut, MenuIcon, Shield, UserPlus,
  Camera, Disc, Facebook, Github, Instagram, Link2, Linkedin,
  MessageCircle, Music, Phone, Send, Twitch, Twitter, Youtube
} from 'lucide-react'

import { CMSLink } from '@/components/Link'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { useAuth } from '@/providers/Auth'
import { cn } from '@/utilities/cn'

import type { Header, Social } from '@/payload-types'

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

  const validSocials = useMemo(() => socials?.filter(s => s && s.url) || [], [socials])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger className="flex h-10 w-10 items-center justify-center bg-black border border-zinc-800 text-white transition-all active:scale-95 group">
        <MenuIcon className="h-4 w-4 transition-colors group-hover:text-zinc-400" />
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col bg-black border-r border-zinc-900 text-white w-[280px] p-0">
        <SheetHeader className="p-6 border-b border-zinc-900 bg-zinc-950/50">
          <div className="flex items-center gap-3">
            <Shield className="h-4 w-4" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <SheetTitle className={cn("text-[10px] font-black uppercase italic text-white", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>
              MAINFRAME_V1.0
            </SheetTitle>
          </div>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto">
          {menu?.length ? (
            <ul className="flex flex-col">
              {menu.map(item => (
                <li key={item.id} className="border-b border-zinc-900/50">
                  <CMSLink
                    url={item.link}
                    label={item.label}
                    className="flex items-center justify-between p-5 transition-all hover:bg-zinc-900/40 group"
                  >
                    <span className={cn("text-[10px] font-black uppercase italic text-zinc-400 group-hover:text-white transition-colors", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>
                      {item.label}
                    </span>
                    <ChevronRight className="h-3 w-3 text-zinc-800 group-hover:text-white transition-colors" />
                  </CMSLink>
                </li>
              ))}
            </ul>
          ) : null}
        </nav>

        <div className="p-6 bg-zinc-950 border-t border-zinc-900">
          <div className="grid gap-3 mb-8">
            {user ? (
              <>
                <Link href="/account" className="flex items-center justify-between py-2 group">
                  <span className="text-[9px] font-black uppercase italic text-zinc-500 group-hover:text-white">ACCOUNT_SESS</span>
                  <ChevronRight className="h-3 w-3 text-zinc-800" />
                </Link>
                <Link
                  href="/logout"
                  className="flex items-center justify-center w-full h-10 bg-zinc-900 border border-zinc-800 text-[9px] font-black uppercase italic text-white transition-all hover:bg-white hover:text-black"
                  style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                >
                  <LogOut className="h-3 w-3 mr-2" /> EXIT_SESS
                </Link>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  className="flex items-center justify-center h-10 bg-zinc-900 border border-zinc-800 text-[9px] font-black uppercase italic text-white transition-all hover:bg-zinc-800"
                  style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
                >
                  LOGIN
                </Link>
                <Link
                  href="/create-account"
                  className="flex items-center justify-center h-10 text-[9px] font-black uppercase italic text-black transition-all hover:opacity-90"
                  style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)', backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                >
                  JOIN
                </Link>
              </div>
            )}
          </div>

          {validSocials.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-6 border-t border-zinc-900/50 justify-center">
              {validSocials.map(account => {
                const Icon = socialIcons[account.platform] || Link2
                return (
                  <a
                    key={account.id}
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 transition-colors hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}