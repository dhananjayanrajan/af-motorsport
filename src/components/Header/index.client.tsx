'use client'

import React, { Suspense, useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import {
  User, Link2, Instagram, Twitter, Facebook, Youtube, Linkedin,
  MessageCircle, Camera, Disc, Twitch, Phone, Send, Github, Music
} from 'lucide-react'

import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import { ClippedButton } from '@/components/Custom/ui/ClippedButton'
import { CMSLink } from '@/components/Link'
import { LogoIcon } from '@/components/icons/logo'
import { MobileMenu } from './MobileMenu'

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

const checkActive = (link: string | undefined, pathname: string) =>
  link && link !== '/' ? pathname.startsWith(link) : pathname === link

const NavItem = ({ item }: { item: any }) => {
  const pathname = usePathname()
  const isActive = checkActive(item.link, pathname)

  return (
    <Link
      href={item.link || '#'}
      className={cn(
        'relative h-full px-6 flex items-center transition-all active:scale-95 group',
        isActive ? 'text-white' : 'text-zinc-500 hover:text-white',
      )}
    >
      <span className={cn(
        'relative z-10 text-[9px] font-black uppercase italic transition-all',
        DESIGN_SYSTEM.ANIMATION.DURATION_SLOW,
        DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL,
      )}>
        {item.label}
      </span>
      <div
        className={cn(
          'absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] transition-all',
          DESIGN_SYSTEM.ANIMATION.DURATION_SLOW,
          isActive ? "w-1/2 opacity-100" : "w-0 opacity-0 group-hover:w-1/3 group-hover:opacity-50"
        )}
        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
      />
    </Link>
  )
}

const AuthComboButton = () => {
  const { user, logout } = useAuth()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="hidden md:flex items-center h-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div
        className="group relative flex items-center h-8 min-w-[130px] bg-zinc-950 border border-zinc-800 transition-all overflow-hidden"
        style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
      >
        <div className="flex w-full items-center justify-center gap-3 px-4 z-10">
          <User className="h-3 w-3 transition-colors" style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY : '#52525b' }} />
          <span className="text-[9px] font-black uppercase tracking-widest italic text-zinc-500 group-hover:text-zinc-300">Auth_Link</span>
        </div>
        <motion.div
          initial={false}
          animate={{ y: isHovered ? 0 : '100%' }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center bg-zinc-900 z-20"
        >
          {user ? (
            <>
              <Link href="/account" className="flex-1 flex items-center justify-center h-full hover:bg-zinc-800 border-r border-zinc-800 text-[8px] font-black uppercase italic text-white">PROFILE</Link>
              <button onClick={logout} className="flex-1 flex items-center justify-center h-full transition-colors hover:bg-zinc-100 group/exit">
                <span className="text-[8px] font-black uppercase italic text-white group-hover/exit:text-black">EXIT</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="flex-1 flex items-center justify-center h-full hover:bg-zinc-800 border-r border-zinc-800 text-[8px] font-black uppercase italic text-white">LOGIN</Link>
              <Link href="/create-account" className="flex-1 flex items-center justify-center h-full transition-colors group/reg" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                <span className="text-[8px] font-black uppercase italic text-white group-hover/reg:text-black">JOIN</span>
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export function HeaderClient({ header, socials }: { header: Header; socials: Social }) {
  const { user } = useAuth()
  const pathname = usePathname()

  const navItems = useMemo(() => header.navItems?.filter((i: any) => i.visible !== false) || [], [header.navItems])
  const utilityNav = useMemo(() => header.utilityNav?.filter((i: any) => i.visible !== false) || [], [header.utilityNav])
  const socialAccounts = useMemo(() => socials?.accounts?.filter((a: any) => a.visible !== false) || [], [socials?.accounts])

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-zinc-900">
      <div className="container flex items-stretch min-h-[85px]">
        <div className="flex items-center pr-12 bg-black border-r border-zinc-900" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)' }}>
          <Link href="/" className="group relative">
            <LogoIcon className="h-8 w-auto md:h-10 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute -inset-2 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.PRIMARY}1A` }} />
          </Link>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center py-2 px-8 border-b border-zinc-900 bg-zinc-950/30">
            <div className="hidden md:flex items-center gap-6">
              {socialAccounts.map((acc: any) => {
                const Icon = socialIcons[acc.platform] || Link2
                return (
                  <a key={acc.id} href={acc.url} target="_blank" rel="noopener noreferrer" className="text-zinc-700 transition-all hover:scale-110 group">
                    <Icon className="h-3.5 w-3.5 group-hover:text-white" />
                  </a>
                )
              })}
            </div>

            <div className="flex items-center gap-8 ml-auto h-full">
              {utilityNav.map((item: any) => {
                const isActive = checkActive(item.link, pathname)
                return (
                  <Link
                    key={item.id}
                    href={item.link || '#'}
                    className={cn(
                      'text-[8px] font-black uppercase italic transition-all relative',
                      DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL,
                      isActive ? 'text-white' : 'text-zinc-600 hover:text-white'
                    )}
                    style={isActive ? { color: DESIGN_SYSTEM.COLORS.PRIMARY } : {}}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <div className="flex items-center gap-6 pl-8 border-l border-zinc-900 h-full" style={{ clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
                {user && <Suspense fallback={<OpenCartButton />}><Cart /></Suspense>}
                <AuthComboButton />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-8 flex-1">
            <ul className="hidden md:flex items-center h-full">
              {navItems.map((item: any) => (
                <li key={item.id} className="h-full flex items-center">
                  <NavItem item={item} />
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-6">
              {header.cta?.enable && header.cta.link && (
                <ClippedButton size="sm" label={header.cta.label || header.cta.link.label}>
                  <CMSLink {...header.cta.link} label={header.cta.label || header.cta.link.label} />
                </ClippedButton>
              )}
              <div className="md:hidden">
                <Suspense fallback={null}><MobileMenu menu={navItems} socials={socialAccounts} /></Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}