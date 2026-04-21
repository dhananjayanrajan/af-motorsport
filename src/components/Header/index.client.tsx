'use client'

import { Cart } from '@/components/Cart'
import { LogoIcon } from '@/components/icons/logo'
import { useAuth } from '@/providers/Auth'
import { cn } from '@/utilities/cn'
import {
  ArrowRight,
  Facebook,
  Github,
  Instagram,
  Link2,
  Linkedin,
  LogOut,
  LucideIcon,
  Twitter,
  User,
  Youtube
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suspense, useMemo } from 'react'
import type { Header, Social } from 'src/payload-types'
import { MobileMenu } from './MobileMenu'

const socialIcons: Record<string, LucideIcon> = {
  instagram: Instagram,
  x: Twitter,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  github: Github,
  other: Link2,
}

const NavItem = ({ item, index }: { item: any; index: number }) => {
  const pathname = usePathname()
  const isActive = item.link && (item.link === '/' ? pathname === '/' : pathname.startsWith(item.link))

  return (
    <Link
      href={item.link || '#'}
      className={cn(
        'h-full px-8 flex flex-col justify-center border-r border-black-pure transition-colors duration-100 group relative outline-none',
        isActive ? 'bg-primary-500' : 'bg-white-pure hover:bg-black-pure hover:text-white-pure'
      )}
    >
      <span className={cn(
        "text-[10px] font-mono font-black mb-1 transition-colors duration-100",
        isActive ? "text-black-pure/40" : "text-black-pure/20 group-hover:text-primary-500"
      )}>
        SEQ_0{index + 1}
      </span>
      <span className={cn(
        "text-sm font-mono font-black uppercase tracking-normal relative z-10 transition-transform duration-100",
        isActive ? "text-black-pure" : "group-hover:translate-x-1"
      )}>
        {item.label}
      </span>
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black-pure" />
      )}
    </Link>
  )
}

export function HeaderClient({ header, socials }: { header: Header; socials: Social }) {
  const { user, logout } = useAuth()
  const navItems = useMemo(() => header.navItems?.filter((i: any) => i.visible !== false) || [], [header.navItems])
  const socialAccounts = useMemo(() => socials?.accounts?.filter((a: any) => a.visible !== false) || [], [socials?.accounts])

  return (
    <header className="sticky top-0 left-0 w-full z-[110] bg-white-pure border-b border-black-pure h-16 flex items-stretch">
      <div className="w-16 md:w-24 flex items-center justify-center border-r border-black-pure bg-black-pure shrink-0 group transition-colors duration-100 hover:bg-primary-500">
        <Link href="/" className="flex items-center justify-center w-full h-full outline-none">
          <LogoIcon className="h-6 w-auto text-white-pure group-hover:text-black-pure transition-transform duration-100 group-hover:scale-110" />
        </Link>
      </div>

      <div className="flex md:hidden flex-1 items-center justify-between px-6">
        <Suspense fallback={null}>
          <MobileMenu menu={navItems} socials={socialAccounts} />
        </Suspense>
        <div className="h-full border-l border-black-pure flex items-center pl-6">
          <Cart />
        </div>
      </div>

      <div className="hidden md:flex flex-1 items-stretch">
        <nav className="flex items-stretch h-full">
          {navItems.map((item: any, index: number) => (
            <NavItem key={item.id} item={item} index={index} />
          ))}
        </nav>

        <div className="flex-1 bg-white-pure border-r border-black-pure relative overflow-hidden" />

        <div className="flex items-stretch">
          <div className="hidden lg:flex items-center gap-8 px-10 border-r border-black-pure bg-white-pure">
            {socialAccounts.slice(0, 3).map((acc: any) => {
              const Icon = socialIcons[acc.platform as keyof typeof socialIcons] || Link2
              return (
                <a
                  key={acc.id}
                  href={acc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black-pure hover:text-secondary-500 hover:scale-125 transition-all duration-100 outline-none"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>

          <div className="flex items-stretch">
            <div className="flex items-center border-r border-black-pure bg-white-pure hover:bg-primary-500 transition-colors duration-100 cursor-pointer">
              <Suspense fallback={null}>
                <Cart />
              </Suspense>
            </div>

            <div className="flex items-stretch border-r border-black-pure">
              {user ? (
                <div className="flex items-stretch">
                  <Link
                    href="/account"
                    className="px-6 flex items-center gap-3 bg-white-pure hover:bg-secondary-500 transition-colors duration-100 border-r border-black-pure outline-none"
                  >
                    <User className="h-4 w-4" />
                    <span className="text-[10px] font-mono font-black uppercase tracking-normal">PROFILE</span>
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="px-5 flex items-center justify-center bg-white-pure hover:bg-black-pure hover:text-white-pure transition-colors duration-100 outline-none"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-10 flex items-center bg-white-pure hover:bg-primary-500 transition-colors duration-100 outline-none"
                >
                  <span className="text-xs font-mono font-black uppercase tracking-normal">LOGIN</span>
                </Link>
              )}
            </div>

            {header.cta?.enable && header.cta.link && (
              <Link
                href={header.cta.link.url || '#'}
                className="px-10 flex items-center gap-4 bg-black-pure text-white-pure hover:bg-secondary-500 hover:text-black-pure transition-colors duration-100 group outline-none"
              >
                <span className="text-xs font-mono font-black uppercase tracking-normal">
                  {header.cta.label || 'INITIATE'}
                </span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}