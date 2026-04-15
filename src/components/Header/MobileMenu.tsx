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
      <SheetTrigger className="flex h-10 w-10 items-center justify-center bg-white border border-zinc-200 text-zinc-950 transition-all active:scale-95 group skew-x-[-12deg]">
        <MenuIcon className="h-4 w-4 transition-colors group-hover:text-black skew-x-[12deg]" />
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col bg-white border-r border-zinc-200 text-zinc-950 w-[300px] p-0 gap-0 z-[120]">
        <SheetHeader className="p-8 border-b border-zinc-100 bg-white text-left relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
          />
          <div className="flex flex-col gap-1 relative z-10">
            <SheetTitle
              className="text-[14px] font-black uppercase italic text-zinc-950 tracking-tight"
              style={{ textShadow: `0 0 10px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}` }}
            >
              Menu
            </SheetTitle>
            <div className="h-0.5 w-8" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
          </div>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto py-6 overflow-x-hidden bg-zinc-50/30">
          {menu?.length ? (
            <ul className="flex flex-col gap-3 px-6">
              {menu.map((item: any) => {
                const isActive = item.link && (item.link === '/' ? pathname === '/' : pathname.startsWith(item.link))
                return (
                  <li key={item.id} className="relative group">
                    <Link
                      href={item.link || '#'}
                      className={cn(
                        "flex items-center justify-between p-4 transition-all duration-300 skew-x-[-12deg] border relative overflow-hidden",
                        isActive ? "bg-black text-white border-black" : "bg-white text-zinc-950 border-zinc-200 hover:border-black"
                      )}
                    >
                      {!isActive && (
                        <div
                          className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out"
                          style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        />
                      )}

                      <div className="flex items-center gap-4 skew-x-[12deg] relative z-10">
                        <span className="text-[13px] font-black uppercase italic transition-all group-hover:translate-x-1 tracking-tight">
                          {item.label}
                        </span>
                      </div>

                      <ChevronRight className={cn("h-4 w-4 skew-x-[12deg] transition-transform group-hover:translate-x-1 relative z-10", isActive ? "text-primary" : "text-zinc-300 group-hover:text-black")} />
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </nav>

        <div className="p-8 bg-white border-t border-zinc-200">
          <div className="grid gap-3 mb-8">
            {user ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/account"
                  className="flex items-center justify-center w-full h-12 bg-white border border-zinc-200 text-[11px] font-black uppercase italic text-zinc-950 transition-all hover:border-black skew-x-[-12deg]"
                >
                  <span className="skew-x-[12deg] flex items-center gap-2">
                    <User className="h-3 w-3" /> Account
                  </span>
                </Link>
                <button
                  onClick={() => logout()}
                  className="flex items-center justify-center w-full h-12 bg-black text-[11px] font-black uppercase italic text-white transition-all hover:bg-zinc-800 skew-x-[-12deg]"
                >
                  <span className="skew-x-[12deg] flex items-center gap-2">
                    <LogOut className="h-3 w-3" /> Logout
                  </span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  className="flex items-center justify-center h-12 bg-white border border-zinc-200 text-[11px] font-black uppercase italic text-zinc-950 transition-all hover:border-black skew-x-[-12deg]"
                >
                  <span className="skew-x-[12deg]">Login</span>
                </Link>
                <Link
                  href="/create-account"
                  className="flex items-center justify-center h-12 text-[11px] font-black uppercase italic text-black transition-all hover:opacity-90 skew-x-[-12deg]"
                  style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                >
                  <span className="skew-x-[12deg]">Join</span>
                </Link>
              </div>
            )}
          </div>

          {validSocials.length > 0 && (
            <div className="flex flex-wrap gap-5 justify-center py-6 border-t border-zinc-100">
              {validSocials.map((account: any) => {
                const platformKey = account.platform as string
                const Icon = socialIcons[platformKey] || Link2
                return (
                  <a
                    key={account.id}
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 transition-all hover:text-black hover:scale-110"
                  >
                    <Icon className="h-5 w-5" />
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