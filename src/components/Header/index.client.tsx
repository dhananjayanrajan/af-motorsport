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
import { ClippedButton } from '@/components/Clipped/ClippedButton'
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
        'relative h-full px-4 lg:px-5 flex items-center justify-center transition-all duration-300 group skew-x-[-12deg] border-r overflow-hidden',
        isActive ? 'text-white bg-black' : 'text-zinc-950 hover:text-black hover:italic'
      )}
      style={{
        borderColor: DESIGN_SYSTEM.COLORS.ZINC[200],
      }}
    >
      <span
        className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out -z-10"
        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
      />

      <div className="skew-x-[12deg] flex items-center justify-center relative z-10">
        <span
          className="font-black uppercase italic tracking-tight lg:tracking-normal text-[12px] whitespace-nowrap transition-all duration-300"
          style={{
            textShadow: `0 0 12px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}`,
          }}
        >
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
      className="hidden md:flex items-center h-9 relative z-[100] pointer-events-auto flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="group relative flex items-center h-full min-w-[100px] border skew-x-[-12deg] overflow-hidden transition-all duration-200 bg-white"
        style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[300] }}
      >
        <div className="flex w-full items-center justify-center gap-2 px-3 z-10 skew-x-[12deg]">
          {user ? <User className="h-3 w-3 text-zinc-950" /> : <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />}
          <span className="text-[10px] font-black uppercase tracking-tight text-zinc-950">
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
              style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
            >
              {user ? (
                <div className="flex w-full h-full">
                  <Link
                    href="/account"
                    className="flex-1 flex items-center justify-center h-full hover:bg-black/10 transition-colors border-r border-black/10"
                  >
                    <span className="skew-x-[12deg] text-[9px] font-black text-black italic">PROFILE</span>
                  </Link>
                  <button
                    onClick={(e) => { e.preventDefault(); logout(); }}
                    className="flex-1 flex items-center justify-center h-full hover:bg-black transition-colors group/exit"
                  >
                    <LogOut className="skew-x-[12deg] h-3 w-3 text-black group-hover/exit:text-white" />
                  </button>
                </div>
              ) : (
                <div className="flex w-full h-full">
                  <Link
                    href="/login"
                    className="flex-1 flex items-center justify-center h-full hover:bg-black/10 transition-colors border-r border-black/10"
                  >
                    <span className="skew-x-[12deg] text-[9px] font-black text-black italic">IN</span>
                  </Link>
                  <Link
                    href="/create-account"
                    className="flex-1 flex items-center justify-center h-full transition-all hover:bg-black/10"
                  >
                    <span className="skew-x-[12deg] text-[9px] font-black text-black italic">JOIN</span>
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
    <div className="sticky top-0 left-0 w-full z-[110] bg-white">
      <div
        className="w-full h-1 relative z-[100] overflow-hidden"
        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
      >
        <motion.div
          className="absolute inset-0 w-20 bg-gradient-to-r from-transparent via-white to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <header
        className="w-full h-16 flex items-stretch border-b relative"
        style={{
          backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE,
          borderColor: DESIGN_SYSTEM.COLORS.ZINC[200]
        }}
      >
        <div className="flex md:hidden w-full items-center justify-between px-4 bg-white z-50">
          <div className="flex-1">
            <Suspense fallback={null}>
              <MobileMenu menu={navItems} socials={socialAccounts} />
            </Suspense>
          </div>
          <Link href="/">
            <LogoIcon className="h-5 w-auto" />
          </Link>
          <div className="flex-1 flex justify-end text-zinc-950">
            <Suspense fallback={null}>
              <Cart />
            </Suspense>
          </div>
        </div>

        <div
          className="hidden xl:flex items-center px-6 border-r relative skew-x-[-12deg] -ml-4 bg-white z-20 pointer-events-auto flex-shrink-0"
          style={{ borderRightColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
        >
          <Link href="/" className="skew-x-[12deg] relative z-10 flex items-center justify-center">
            <LogoIcon className="h-5 w-auto" />
          </Link>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-between min-w-0">
          <nav className="flex h-full items-stretch px-1 pointer-events-auto overflow-hidden">
            <div
              className="flex h-full items-stretch"
              style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
            >
              {navItems.map((item: any) => (
                <NavItem key={item.id} item={item} />
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-3 lg:gap-4 px-3 lg:px-6 flex-shrink-0">
            <div
              className="hidden lg:flex items-center gap-3 pr-3 border-r"
              style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
            >
              {socialAccounts.slice(0, 3).map((acc: any) => {
                const Icon = socialIcons[acc.platform] || Link2
                return (
                  <a
                    key={acc.id}
                    href={acc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-200 hover:scale-110"
                    style={{ color: DESIGN_SYSTEM.COLORS.BLACK[50] }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = DESIGN_SYSTEM.COLORS.PRIMARY[500])}
                    onMouseLeave={(e) => (e.currentTarget.style.color = DESIGN_SYSTEM.COLORS.BLACK[50])}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>

            <div className="flex items-center gap-3 lg:gap-4">
              <Suspense fallback={null}>
                <div
                  className="p-1 transition-all cursor-pointer rounded-sm pointer-events-auto active:scale-90"
                  style={{ color: DESIGN_SYSTEM.COLORS.BLACK[50] }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = DESIGN_SYSTEM.COLORS.PRIMARY[500])}
                  onMouseLeave={(e) => (e.currentTarget.style.color = DESIGN_SYSTEM.COLORS.BLACK[50])}
                >
                  <Cart />
                </div>
              </Suspense>

              <AuthComboButton />

              {header.cta?.enable && header.cta.link && (
                <div className="hidden xl:block pointer-events-auto active:scale-95 transition-transform flex-shrink-0">
                  <ClippedButton size="sm" label={header.cta.label || header.cta.link.label}>
                    <div className="flex items-center gap-1">
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
            background: `radial-gradient(ellipse at center, ${DESIGN_SYSTEM.COLORS.PRIMARY[500]} 0%, transparent 85%)`,
            boxShadow: `0 0 14px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}`
          }}
        />
      </header>
    </div>
  )
}