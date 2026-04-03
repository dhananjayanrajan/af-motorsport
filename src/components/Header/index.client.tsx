'use client'

import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import { ClippedButton } from '@/components/Custom/ui/ClippedButton'
import { CMSLink } from '@/components/Link'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { User } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import React, { Suspense, useRef, useState } from 'react'

import type { Header, Social } from 'src/payload-types'
import { MobileMenu } from './MobileMenu'

import { LogoIcon } from '@/components/icons/logo'
import { useAuth } from '@/providers/Auth'
import { cn } from '@/utilities/cn'
import { usePathname } from 'next/navigation'

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

type Props = {
  header: Header
  socials: Social
}

const NavItem = ({ item }: { item: any }) => {
  const pathname = usePathname()
  const isActive = item.link && item.link !== '/' ? pathname.startsWith(item.link) : pathname === item.link

  return (
    <Link
      href={item.link}
      className={cn(
        'relative h-full px-6 transition-all active:scale-95 flex items-center border-none outline-none',
        isActive ? 'text-white' : 'text-zinc-500 hover:text-white',
      )}
    >
      <span className={cn(
        `relative z-10 text-[9px] font-black uppercase italic transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_SLOW}`,
        DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL,
      )}>
        {item.label}
      </span>

      <div className={cn(
        `absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}] transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_SLOW}`,
        isActive ? "w-1/2 opacity-100" : "w-0 opacity-0 group-hover:w-1/3 group-hover:opacity-50"
      )} />
    </Link>
  )
}

const AuthComboButton = () => {
  const { user, logout } = useAuth()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="hidden md:flex items-center h-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="group relative flex items-center h-8 min-w-[130px] bg-zinc-950 border border-zinc-800 transition-all overflow-hidden"
        style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
        <div className="flex w-full items-center justify-center gap-3 px-4 z-10">
          <User className={cn(`h-3 w-3 transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_SLOW}`, isHovered ? `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}] scale-110` : 'text-zinc-600')} />
          <span className="text-[9px] font-black uppercase tracking-widest italic text-zinc-500 group-hover:text-zinc-300 transition-colors">Auth_Link</span>
        </div>
        <motion.div initial={false} animate={{ y: isHovered ? 0 : '100%' }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 flex items-center bg-zinc-900 z-20">
          {user ? (
            <>
              <Link href="/account" className="flex-1 flex items-center justify-center h-full hover:bg-zinc-800 transition-colors border-r border-zinc-800">
                <span className="text-[8px] font-black uppercase italic text-white">PROFILE</span>
              </Link>
              <button onClick={logout} className={`flex-1 flex items-center justify-center h-full hover:bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}] transition-colors group/exit`}>
                <span className="text-[8px] font-black uppercase italic text-white group-hover/exit:text-black">EXIT</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="flex-1 flex items-center justify-center h-full hover:bg-zinc-800 transition-colors border-r border-zinc-800">
                <span className="text-[8px] font-black uppercase italic text-white">LOGIN</span>
              </Link>
              <Link href="/create-account" className={`flex-1 flex items-center justify-center h-full hover:bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}] transition-colors group/reg`}>
                <span className="text-[8px] font-black uppercase italic text-white group-hover/reg:text-black">REGISTER</span>
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export function HeaderClient({ header, socials }: Props) {
  const { user } = useAuth()
  const navItems = header.navItems?.filter((item: any) => item.visible !== false) || []
  const utilityNav = header.utilityNav?.filter((item: any) => item.visible !== false) || []
  const cta = header.cta
  const pathname = usePathname()
  const socialAccounts = socials?.accounts?.filter((acc: any) => acc.visible !== false) || []

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-zinc-900">
      <div className="container relative flex items-stretch min-h-[85px]">
        <div
          className="flex items-center pr-12 bg-black z-10"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)', borderRight: '1px solid #18181b' }}
        >
          <Link href="/" className="group relative">
            <LogoIcon className="h-8 w-auto md:h-10 group-hover:scale-105 transition-transform duration-500" />
            <div className={`absolute -inset-2 bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
          </Link>
        </div>

        <div className="flex-1 flex flex-col -ml-4">
          <div className="flex justify-between items-center py-2 ml-8 mr-16 border-b border-zinc-900 bg-zinc-950/30">
            <div className="hidden md:flex items-center gap-6">
              {socialAccounts.map((account: any) => {
                const Icon = socialIcons[account.platform] || Link2
                return (
                  <a key={account.id} href={account.url} target="_blank" rel="noopener noreferrer" className={`text-zinc-700 hover:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}] transition-all hover:scale-110`}>
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                )
              })}
            </div>

            <div className="flex items-center gap-8 ml-auto h-full">
              {utilityNav.map((item: any) => {
                const isActive = item.link?.url && (pathname === item.link.url || (item.link.url !== '/' && pathname.startsWith(item.link.url)))
                return (
                  <CMSLink key={item.id} {...item.link} className={cn(`text-[8px] font-black uppercase italic transition-all relative`, DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL, isActive ? `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]` : 'text-zinc-600 hover:text-white')} />
                )
              })}
              <div
                className="flex items-center gap-8 pl-12 h-full bg-zinc-900/20"
                style={{ clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)', borderLeft: '1px solid #18181b' }}
              >
                {user && (
                  <Suspense fallback={<OpenCartButton />}>
                    <Cart />
                  </Suspense>
                )}
                <AuthComboButton />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pr-8 flex-1">
            <ul className="hidden md:flex items-center h-full">
              {navItems.map((item: any) => (
                <li key={item.id} className="relative h-full flex items-center">
                  <NavItem item={item} />
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-6">
              {cta?.enable && cta.link && (
                <ClippedButton size="sm" label={cta.label || cta.link.label}>
                  <CMSLink {...cta.link} label={cta.label || cta.link.label} />
                </ClippedButton>
              )}
              <div className="md:hidden">
                <Suspense fallback={null}>
                  <MobileMenu menu={navItems} socials={socialAccounts} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}