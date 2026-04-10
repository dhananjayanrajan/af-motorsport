'use client'

import {
  Camera,
  ChevronRight,
  Disc, Facebook, Github, Instagram, Link2, Linkedin,
  LogOut, MenuIcon,
  MessageCircle, Music, Phone, Send, Twitch, Twitter,
  User,
  Youtube
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

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

import type { Header, Social } from 'src/payload-types'

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
  const { user, logout } = useAuth()
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

  const validSocials = useMemo(() => socials?.filter((s: any) => s && s.url) || [], [socials])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger className="flex h-10 w-10 items-center justify-center bg-white border border-zinc-200 text-zinc-950 transition-all active:scale-95 group skew-x-[-15deg]">
        <MenuIcon className="h-4 w-4 transition-colors group-hover:text-primary skew-x-[15deg]" />
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col bg-white border-r border-zinc-200 text-zinc-950 w-[300px] p-0 gap-0">
        <SheetHeader className="p-8 border-b border-zinc-100 bg-zinc-50/50 text-left">
          <div className="flex flex-col gap-1">
            <SheetTitle className={cn("text-[11px] font-black uppercase italic text-zinc-950", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>
              NAVIGATION_MENU
            </SheetTitle>
            <div className="h-1 w-12 bg-primary" />
          </div>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto py-6 overflow-x-hidden">
          {menu?.length ? (
            <ul className="flex flex-col gap-3 px-8">
              {menu.map((item: any) => {
                const isActive = item.link && (item.link === '/' ? pathname === '/' : pathname.startsWith(item.link))
                return (
                  <li key={item.id} className="relative group">
                    <Link
                      href={item.link || '#'}
                      className={cn(
                        "flex items-center justify-between p-4 transition-all skew-x-[-15deg] border border-zinc-200 relative overflow-hidden",
                        isActive ? "bg-black text-white border-black" : "bg-white text-zinc-950 hover:border-primary"
                      )}
                    >
                      {!isActive && (
                        <div
                          className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 bg-primary"
                        />
                      )}

                      <div className="flex items-center gap-4 skew-x-[15deg] relative z-10">
                        <span className={cn("text-[11px] font-black uppercase italic transition-all group-hover:translate-x-1", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>
                          {item.label}
                        </span>
                      </div>

                      <ChevronRight className={cn("h-3 w-3 skew-x-[15deg] transition-transform group-hover:translate-x-1 relative z-10", isActive ? "text-primary" : "text-zinc-300 group-hover:text-black")} />
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </nav>

        <div className="p-8 bg-zinc-50 border-t border-zinc-200">
          <div className="grid gap-3 mb-8 px-2">
            {user ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/account"
                  className="flex items-center justify-center w-full h-12 bg-white border border-zinc-200 text-[10px] font-black uppercase italic text-zinc-950 transition-all hover:bg-zinc-100 skew-x-[-15deg]"
                >
                  <span className="skew-x-[15deg] flex items-center gap-2">
                    <User className="h-3 w-3" /> ACCOUNT
                  </span>
                </Link>
                <button
                  onClick={() => logout()}
                  className="flex items-center justify-center w-full h-12 bg-black text-[10px] font-black uppercase italic text-white transition-all hover:bg-zinc-800 skew-x-[-15deg]"
                >
                  <span className="skew-x-[15deg] flex items-center gap-2">
                    <LogOut className="h-3 w-3" /> SIGN_OUT
                  </span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  className="flex items-center justify-center h-12 bg-white border border-zinc-200 text-[10px] font-black uppercase italic text-zinc-950 transition-all hover:bg-zinc-100 skew-x-[-15deg]"
                >
                  <span className="skew-x-[15deg]">LOGIN</span>
                </Link>
                <Link
                  href="/create-account"
                  className="flex items-center justify-center h-12 text-[10px] font-black uppercase italic text-black transition-all hover:opacity-90 skew-x-[-15deg]"
                  style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                >
                  <span className="skew-x-[15deg]">JOIN</span>
                </Link>
              </div>
            )}
          </div>

          {validSocials.length > 0 && (
            <div className="flex flex-wrap gap-6 justify-center py-4 border-t border-zinc-200">
              {validSocials.map((account: any) => {
                const Icon = socialIcons[account.platform] || Link2
                return (
                  <a
                    key={account.id}
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 transition-all hover:text-primary hover:scale-110"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          )}

          <div className="mt-4 text-center">
            <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
              VER_2026.04.05
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}