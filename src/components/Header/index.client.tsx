'use client'

import {
  ArrowRight,
  Facebook,
  Github,
  Instagram,
  Link2,
  Linkedin,
  LogOut,
  Twitter,
  User,
  Youtube
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { Suspense, useMemo, useState } from 'react'

import { Cart } from '@/components/Cart'
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
  github: Github,
  other: Link2,
}

const NavItem = ({ item }: { item: any }) => {
  const pathname = usePathname()
  const isActive = item.link && (item.link === '/' ? pathname === '/' : pathname.startsWith(item.link))

  return (
    <Link
      href={item.link || '#'}
      className={cn(
        'relative h-full px-10 flex items-center justify-center transition-all duration-300 group skew-x-[-15deg] border-r border-zinc-200 pointer-events-auto overflow-hidden',
        isActive ? 'text-white bg-black' : 'text-zinc-950 hover:text-black hover:italic'
      )}
      style={{
        borderColor: DESIGN_SYSTEM.COLORS.ZINC_200,
      }}
    >
      <span
        className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out -z-10"
        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
      />

      <div className="skew-x-[15deg] flex items-center justify-center relative z-10">
        <span className="font-black uppercase italic tracking-[0.1em] text-[11px] whitespace-nowrap transition-all duration-300 group-hover:[text-shadow:0_0_12px_rgba(0,255,65,0.5)]">
          {item.label}
        </span>
      </div>
    </Link>
  )
}

const AuthComboButton = () => {
  const { user, logout } = useAuth()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="hidden md:flex items-center h-10 relative z-[100] pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="group relative flex items-center h-full min-w-[130px] border skew-x-[-15deg] overflow-hidden transition-all duration-200 bg-white"
        style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_300 }}
      >
        <div className="flex w-full items-center justify-center gap-2 px-4 z-10 skew-x-[15deg]">
          {user ? <User className="h-3 w-3 text-zinc-950" /> : <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />}
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-950">
            {user ? 'ACCOUNT' : 'LOGIN'}
          </span>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ x: '-101%' }}
              animate={{ x: 0 }}
              exit={{ x: '101%' }}
              transition={{ type: 'tween', ease: 'circOut', duration: 0.15 }}
              className="absolute inset-0 z-[110] flex"
              style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
            >
              {user ? (
                <div className="flex w-full h-full">
                  <Link
                    href="/account"
                    className="flex-1 flex items-center justify-center h-full hover:bg-black/10 transition-colors border-r border-black/10"
                  >
                    <span className="skew-x-[15deg] text-[9px] font-black text-black italic">PROFILE</span>
                  </Link>
                  <button
                    onClick={(e) => { e.preventDefault(); logout(); }}
                    className="flex-1 flex items-center justify-center h-full hover:bg-black transition-colors group/exit"
                  >
                    <LogOut className="skew-x-[15deg] h-3 w-3 text-black group-hover/exit:text-white" />
                  </button>
                </div>
              ) : (
                <div className="flex w-full h-full">
                  <Link
                    href="/login"
                    className="flex-1 flex items-center justify-center h-full hover:bg-black/10 transition-colors border-r border-black/10"
                  >
                    <span className="skew-x-[15deg] text-[9px] font-black text-black italic">IN</span>
                  </Link>
                  <Link
                    href="/create-account"
                    className="flex-1 flex items-center justify-center h-full transition-all hover:bg-black/10"
                  >
                    <span className="skew-x-[15deg] text-[9px] font-black text-black italic">JOIN</span>
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function HeaderClient({ header, socials }: { header: Header; socials: Social }) {
  const navItems = useMemo(() => header.navItems?.filter((i: any) => i.visible !== false) || [], [header.navItems])
  const socialAccounts = useMemo(() => socials?.accounts?.filter((a: any) => a.visible !== false) || [], [socials?.accounts])

  return (
    <div className="sticky top-0 left-0 w-full z-[9999] bg-white overflow-x-hidden">
      <div className="w-full h-1 bg-primary relative z-[100]" />

      <header
        className="w-full h-16 flex items-stretch border-b relative overflow-hidden"
        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}
      >
        <div className="flex md:hidden w-full items-center justify-between px-4 bg-white z-50">
          <div className="flex-1"><Suspense fallback={null}><MobileMenu menu={navItems} socials={socialAccounts} /></Suspense></div>
          <Link href="/"><LogoIcon className="h-5 w-auto" /></Link>
          <div className="flex-1 flex justify-end text-zinc-950"><Suspense fallback={null}><Cart /></Suspense></div>
        </div>

        <div
          className="hidden md:flex items-center px-12 border-r relative skew-x-[-15deg] -ml-6 bg-white z-20 pointer-events-auto"
          style={{ borderRightColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}
        >
          <Link href="/" className="skew-x-[15deg] relative z-10 flex items-center justify-center">
            <LogoIcon className="h-6 w-auto" />
          </Link>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-between min-w-0">
          <nav className="flex h-full items-stretch px-4 pointer-events-auto overflow-visible">
            <div className="flex h-full items-stretch border-l border-zinc-200">
              {navItems.map((item: any) => (
                <NavItem key={item.id} item={item} />
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-6 px-10 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-6 pr-6 border-r border-zinc-200">
              {socialAccounts.slice(0, 3).map((acc: any) => {
                const Icon = socialIcons[acc.platform] || Link2
                return (
                  <a
                    key={acc.id}
                    href={acc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-950 transition-all duration-200 hover:scale-110"
                    style={{ color: DESIGN_SYSTEM.COLORS.ZINC_950 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = DESIGN_SYSTEM.COLORS.PRIMARY)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = DESIGN_SYSTEM.COLORS.ZINC_950)}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>

            <div className="flex items-center gap-6">
              <Suspense fallback={null}>
                <div
                  className="text-zinc-950 p-2 transition-all cursor-pointer rounded-sm pointer-events-auto active:scale-90"
                  onMouseEnter={(e) => (e.currentTarget.style.color = DESIGN_SYSTEM.COLORS.PRIMARY)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = DESIGN_SYSTEM.COLORS.ZINC_950)}
                >
                  <Cart />
                </div>
              </Suspense>

              <AuthComboButton />

              {header.cta?.enable && header.cta.link && (
                <div className="hidden xl:block pointer-events-auto active:scale-95 transition-transform">
                  <ClippedButton size="sm" label={header.cta.label || header.cta.link.label}>
                    <div className="flex items-center gap-1.5">
                      <CMSLink {...header.cta.link} label={header.cta.label || header.cta.link.label} />
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </ClippedButton>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-64 h-[2.5px] z-[100] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, #22c55e 0%, transparent 85%)',
            boxShadow: '0 0 14px rgba(34, 197, 94, 0.5)'
          }}
        />
      </header>
    </div>
  )
}