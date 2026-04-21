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
      <SheetTrigger className="flex h-16 w-16 items-center justify-center bg-black-pure text-white-pure transition-colors hover:bg-primary-500 hover:text-black-pure group outline-none border-r border-black-pure">
        <MenuIcon className="h-6 w-6 transition-transform group-active:scale-90" />
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col bg-white-pure border-r border-black-pure w-full sm:w-[400px] p-0 gap-0 z-[120]">
        <SheetHeader className="p-8 border-b border-black-pure bg-black-pure flex flex-row items-center justify-between text-left">
          <div className="space-y-1">
            <SheetTitle className="text-xs font-mono font-black uppercase tracking-normal text-primary-500">
              Navigation_System
            </SheetTitle>
          </div>
          <SheetClose className="size-12 flex items-center justify-center bg-white-pure border border-black-pure hover:bg-primary-500 hover:text-black-pure transition-colors duration-100 outline-none">
            <X className="h-5 w-5" />
          </SheetClose>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto bg-white-pure">
          {menu?.length ? (
            <ul className="flex flex-col divide-y divide-black-pure border-b border-black-pure">
              {menu.map((item: any, index: number) => {
                const isActive = item.link && (item.link === '/' ? pathname === '/' : pathname.startsWith(item.link))
                return (
                  <li key={item.id}>
                    <Link
                      href={item.link || '#'}
                      className={cn(
                        "flex flex-col justify-center h-28 px-10 transition-colors duration-100 relative group outline-none",
                        isActive ? "bg-primary-500 text-black-pure" : "bg-white-pure hover:bg-black-pure hover:text-white-pure"
                      )}
                    >
                      <span className={cn(
                        "text-[10px] font-mono font-black mb-2 transition-colors",
                        isActive ? "text-black-pure/40" : "text-black-pure/20 group-hover:text-primary-500"
                      )}>
                        0{index + 1} // AD_CHANNEL
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-mono font-black uppercase tracking-normal transition-transform group-hover:translate-x-2">
                          {item.label}
                        </span>
                        <ArrowRight className={cn(
                          "h-6 w-6 transition-all duration-100",
                          isActive ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        )} />
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </nav>

        <div className="p-10 bg-white-pure border-t border-black-pure space-y-10">
          <div className="grid gap-3">
            {user ? (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/account"
                  className="flex items-center justify-center h-16 bg-secondary-500 border border-black-pure text-xs font-mono font-black uppercase tracking-normal hover:bg-black-pure hover:text-white-pure transition-colors duration-100 outline-none"
                >
                  Dossier
                </Link>
                <button
                  onClick={() => logout()}
                  className="flex items-center justify-center h-16 bg-white-pure border border-black-pure text-xs font-mono font-black uppercase tracking-normal hover:bg-primary-500 transition-colors duration-100 outline-none"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  className="flex items-center justify-center h-16 bg-white-pure border border-black-pure text-xs font-mono font-black uppercase tracking-normal hover:bg-primary-500 transition-colors duration-100 outline-none"
                >
                  Access
                </Link>
                <Link
                  href="/create-account"
                  className="flex items-center justify-center h-16 bg-primary-500 border border-black-pure text-xs font-mono font-black uppercase tracking-normal hover:bg-black-pure hover:text-white-pure transition-colors duration-100 outline-none"
                >
                  Enlist
                </Link>
              </div>
            )}
          </div>

          {validSocials.length > 0 && (
            <div className="flex items-center justify-between py-8 border-t border-black-pure">
              <span className="text-[10px] font-mono font-black uppercase text-black-pure/40 tracking-normal">Signals</span>
              <div className="flex gap-8">
                {validSocials.map((account: any) => {
                  const Icon = socialIcons[account.platform as keyof typeof socialIcons] || Link2
                  return (
                    <a
                      key={account.id}
                      href={account.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black-pure hover:text-primary-500 hover:scale-125 transition-all duration-100 outline-none"
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          <div className="h-3 bg-black-pure flex">
            <div className="h-full bg-primary-500 w-1/3" />
            <div className="h-full bg-secondary-500 w-1/3" />
            <div className="h-full bg-white-pure w-1/3" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}