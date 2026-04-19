'use client'

import {
  ArrowRight,
  Facebook,
  Github,
  Instagram,
  Link2,
  Linkedin,
  LucideIcon,
  MenuIcon,
  Twitter,
  X,
  Youtube
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useAuth } from '@/providers/Auth'
import { cn } from '@/utilities/cn'

import type { Header, Social } from 'src/payload-types'

const socialIcons: Record<string, LucideIcon> = {
  instagram: Instagram,
  x: Twitter,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  github: Github,
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
      <SheetTrigger className="flex h-12 w-12 items-center justify-center bg-black-pure text-white-pure transition-colors hover:bg-primary hover:text-black-pure group">
        <MenuIcon className="h-5 w-5 transition-transform group-active:scale-90" />
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col bg-white-pure border-r-2 border-black-pure w-full sm:w-[380px] p-0 gap-0 z-[120]">

        <SheetHeader className="p-8 border-b-2 border-black-pure bg-white-pure flex flex-row items-center justify-between text-left">
          <div className="space-y-1">
            <SheetTitle className="text-xs font-mono font-black uppercase tracking-[0.3em] text-black-pure">
              System Menu
            </SheetTitle>
            <div className="h-1 w-12 bg-primary" />
          </div>
          <SheetClose className="size-10 flex items-center justify-center bg-white-100 border border-black-pure hover:bg-tertiary-500 hover:text-white-pure transition-colors">
            <X className="h-4 w-4" />
          </SheetClose>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto bg-white-50">
          {menu?.length ? (
            <ul className="flex flex-col divide-y-2 divide-black-pure border-b-2 border-black-pure">
              {menu.map((item: any, index: number) => {
                const isActive = item.link && (item.link === '/' ? pathname === '/' : pathname.startsWith(item.link))
                return (
                  <li key={item.id}>
                    <Link
                      href={item.link || '#'}
                      className={cn(
                        "flex flex-col justify-center h-24 px-8 transition-all duration-300 relative group",
                        isActive ? "bg-primary text-black-pure" : "bg-white-pure hover:bg-black-pure hover:text-white-pure"
                      )}
                    >
                      <span className={cn(
                        "text-[10px] font-mono font-black mb-1 transition-colors",
                        isActive ? "text-black-pure/40" : "text-black-pure/20 group-hover:text-primary"
                      )}>
                        0{index + 1}
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-mono font-black uppercase tracking-widest transition-transform group-hover:translate-x-2">
                          {item.label}
                        </span>
                        <ArrowRight className={cn(
                          "h-5 w-5 transition-all duration-300",
                          isActive ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        )} />
                      </div>
                      {isActive && (
                        <div className="absolute left-0 top-0 w-2 h-full bg-black-pure" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </nav>

        <div className="p-8 bg-white-pure border-t-2 border-black-pure space-y-8">
          <div className="grid gap-2">
            {user ? (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/account"
                  className="flex items-center justify-center h-14 bg-secondary border-2 border-black-pure text-xs font-mono font-black uppercase tracking-widest hover:bg-black-pure hover:text-white-pure transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={() => logout()}
                  className="flex items-center justify-center h-14 bg-white-pure border-2 border-black-pure text-xs font-mono font-black uppercase tracking-widest hover:bg-tertiary-500 hover:text-white-pure transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  className="flex items-center justify-center h-14 bg-white-pure border-2 border-black-pure text-xs font-mono font-black uppercase tracking-widest hover:bg-white-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/create-account"
                  className="flex items-center justify-center h-14 bg-primary border-2 border-black-pure text-xs font-mono font-black uppercase tracking-widest hover:bg-black-pure hover:text-white-pure transition-colors"
                >
                  Join
                </Link>
              </div>
            )}
          </div>

          {validSocials.length > 0 && (
            <div className="flex items-center justify-between py-6 border-t border-black-pure/10">
              <span className="text-[10px] font-mono font-black uppercase opacity-30 tracking-widest">Connect</span>
              <div className="flex gap-6">
                {validSocials.map((account: any) => {
                  const Icon = socialIcons[account.platform as keyof typeof socialIcons] || Link2
                  return (
                    <a
                      key={account.id}
                      href={account.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black-pure opacity-40 hover:text-primary hover:opacity-100 hover:scale-110 transition-all"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          <div className="h-1 bg-black-pure flex">
            <div className="h-full bg-primary w-1/4" />
            <div className="h-full bg-secondary w-1/4" />
            <div className="h-full bg-tertiary-500 w-1/4" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}