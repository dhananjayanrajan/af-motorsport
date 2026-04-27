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
  labels?: {
    navTitle?: string
    accountLink?: string
    logoutBtn?: string
    loginLink?: string
    signupLink?: string
    socialTitle?: string
    indexPrefix?: string
  }
}

export function MobileMenu({
  menu,
  socials,
  labels = {
    navTitle: "Navigation",
    accountLink: "Account",
    logoutBtn: "Log Out",
    loginLink: "Login",
    signupLink: "Register",
    socialTitle: "Socials",
    indexPrefix: "Line"
  }
}: Props) {
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
      <SheetTrigger className="flex h-14 w-14 items-center justify-center bg-black-pure text-white-pure transition-colors hover:bg-primary-500 hover:text-black-pure group outline-none border-r border-black-pure">
        <MenuIcon className="h-5 w-5 transition-transform group-active:scale-90" />
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col bg-white-pure border-r border-black-pure w-full sm:w-[380px] p-0 gap-0 z-[120]">
        <SheetHeader className="p-6 border-b border-black-pure bg-black-pure flex flex-row items-center justify-between text-left">
          <SheetTitle className="text-[10px] font-mono font-black uppercase tracking-widest text-primary-500">
            {labels.navTitle}
          </SheetTitle>
          <SheetClose className="size-10 flex items-center justify-center bg-white-pure border border-black-pure hover:bg-primary-500 hover:text-black-pure transition-all duration-75 outline-none">
            <X className="h-4 w-4" />
          </SheetClose>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto bg-white-pure custom-scrollbar">
          {menu?.length ? (
            <ul className="flex flex-col divide-y divide-black-pure">
              {menu.map((item: any, index: number) => {
                const isActive = item.link && (item.link === '/' ? pathname === '/' : pathname.startsWith(item.link))
                return (
                  <li key={item.id}>
                    <Link
                      href={item.link || '#'}
                      className={cn(
                        "flex flex-col justify-center h-24 px-8 transition-all duration-75 relative group outline-none",
                        isActive ? "bg-primary-500 text-black-pure" : "bg-white-pure hover:bg-black-pure hover:text-white-pure"
                      )}
                    >
                      <span className={cn(
                        "text-[9px] font-mono font-bold mb-1 transition-colors",
                        isActive ? "text-black-pure/50" : "text-black-pure/30 group-hover:text-primary-500"
                      )}>
                        {index + 1 < 10 ? `0${index + 1}` : index + 1} // {labels.indexPrefix}
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono font-black uppercase tracking-tight transition-transform group-hover:translate-x-1">
                          {item.label}
                        </span>
                        <ArrowRight className={cn(
                          "h-5 w-5 transition-all duration-150",
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

        <div className="p-8 bg-white-pure border-t-2 border-black-pure space-y-8">
          <div className="grid gap-2">
            {user ? (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/account"
                  className="flex items-center justify-center h-12 bg-secondary-500 border border-black-pure text-[10px] font-mono font-black uppercase hover:bg-black-pure hover:text-white-pure transition-all duration-75 outline-none"
                >
                  {labels.accountLink}
                </Link>
                <button
                  onClick={() => logout()}
                  className="flex items-center justify-center h-12 bg-white-pure border border-black-pure text-[10px] font-mono font-black uppercase hover:bg-primary-500 transition-all duration-75 outline-none"
                >
                  {labels.logoutBtn}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  className="flex items-center justify-center h-12 bg-white-pure border border-black-pure text-[10px] font-mono font-black uppercase hover:bg-primary-500 transition-all duration-75 outline-none"
                >
                  {labels.loginLink}
                </Link>
                <Link
                  href="/create-account"
                  className="flex items-center justify-center h-12 bg-primary-500 border border-black-pure text-[10px] font-mono font-black uppercase hover:bg-black-pure hover:text-white-pure transition-all duration-75 outline-none"
                >
                  {labels.signupLink}
                </Link>
              </div>
            )}
          </div>

          {validSocials.length > 0 && (
            <div className="flex items-center justify-between pt-6 border-t border-black-pure">
              <span className="text-[9px] font-mono font-black uppercase text-black-pure/40">{labels.socialTitle}</span>
              <div className="flex gap-6">
                {validSocials.map((account: any) => {
                  const Icon = socialIcons[account.platform as keyof typeof socialIcons] || Link2
                  return (
                    <a
                      key={account.id}
                      href={account.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black-pure hover:text-primary-500 transition-all duration-75 outline-none transform hover:-translate-y-1"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          <div className="h-2 bg-black-pure flex overflow-hidden">
            <div className="h-full bg-primary-500 w-1/4 animate-pulse" />
            <div className="h-full bg-secondary-500 w-1/2" />
            <div className="h-full bg-white-pure w-1/4" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}