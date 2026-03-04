'use client'

import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import { ClippedButton } from '@/components/Custom/ui/ClippedButton'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ArrowRight, ChevronDown, Crosshair, User, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
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

const MegaMenuItem = ({ item, isOpen, onMouseEnter, onMouseLeave }: any) => {
  const { label, tagline, subItems, spotlight } = item
  const pathname = usePathname()
  const isActive = item.link?.url && item.link.url !== '/' ? pathname.startsWith(item.link.url) : pathname === item.link?.url

  return (
    <div className="relative h-full flex items-center" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        className={cn(
          'group relative h-full px-8 transition-all active:scale-95 flex items-center gap-2 border-none outline-none overflow-hidden',
          isOpen || isActive ? 'text-white' : 'text-zinc-500 hover:text-white',
        )}
        style={{ clipPath: 'polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)' }}
      >
        <div className={cn(
          "absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]",
          isOpen ? "bg-red-600" : (isActive ? "bg-red-900/40" : "bg-zinc-900")
        )} />
        <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] opacity-20" />

        <span className="relative z-10 text-[9px] font-black uppercase tracking-[0.4em] italic transition-all duration-300 group-hover:scale-105">
          {label}
        </span>

        {subItems && subItems.length > 0 && (
          <ChevronDown className={cn(
            'h-3 w-3 relative z-10 transition-transform duration-500',
            isOpen && 'rotate-180 text-white',
            !isOpen && 'group-hover:text-white'
          )} />
        )}

        <div className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-white transition-all duration-500",
          isOpen || isActive ? "w-1/2 opacity-100" : "w-0 opacity-0 group-hover:w-1/3 group-hover:opacity-50"
        )} />
      </button>

      <AnimatePresence>
        {isOpen && subItems && subItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full mt-2 w-[580px] bg-black border border-zinc-800 z-50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
          >
            <div className="grid grid-cols-12">
              <div className="col-span-7 border-r border-zinc-900">
                <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-zinc-950/50">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-[0.3em]">
                      {tagline || 'Sector_Access'}
                    </span>
                    <span className="text-[10px] font-black uppercase italic text-white tracking-widest">
                      Primary_Protocol_0{subItems.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-8 bg-zinc-900 relative overflow-hidden">
                      <div className="absolute inset-0 bg-red-600 animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  {subItems.map((subItem: any, idx: number) => {
                    const isSubActive = subItem.link?.url && pathname === subItem.link.url
                    return (
                      <CMSLink
                        key={subItem.id}
                        {...subItem.link}
                        className={cn(
                          "group/sub relative p-6 flex flex-col gap-1 border-b border-zinc-900 last:border-0 transition-all duration-300 overflow-hidden",
                          isSubActive ? "text-white bg-zinc-900/80" : (subItem.isFeatured ? "text-red-600 bg-red-950/5" : "text-zinc-400 hover:text-red-600 hover:bg-zinc-900/40")
                        )}
                      >
                        <div className="absolute inset-0 bg-red-600 translate-x-[-101%] group-hover/sub:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] opacity-10" />

                        <div className={cn(
                          "absolute left-0 top-0 bottom-0 w-[3px] bg-red-600 transition-transform duration-300 origin-top",
                          isSubActive ? "scale-y-100" : "scale-y-0 group-hover/sub:scale-y-100"
                        )} />

                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-4">
                            {subItem.isFeatured ? (
                              <div className="relative">
                                <Zap className="h-3 w-3 text-red-600 fill-red-600 animate-pulse" />
                                <div className="absolute inset-0 blur-sm bg-red-600 opacity-50" />
                              </div>
                            ) : (
                              <span className={cn(
                                "text-[8px] font-mono transition-colors",
                                isSubActive ? "text-red-600" : "text-zinc-800 group-hover/sub:text-red-500"
                              )}>
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                            )}
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "h-[1px] transition-all duration-500",
                                isSubActive ? "w-36 bg-red-600" : "w-6 bg-zinc-900 group-hover/sub:w-36 group-hover/sub:bg-red-600"
                              )} />
                              <ArrowRight className={cn(
                                "h-3.5 w-3.5 transition-all",
                                isSubActive ? "text-red-600 translate-x-1" : "text-zinc-800 group-hover/sub:text-red-600 group-hover/sub:translate-x-1"
                              )} />
                            </div>
                          </div>
                        </div>

                        {subItem.description && (
                          <span className={cn(
                            "pl-7 text-[8px] font-bold uppercase tracking-widest transition-colors relative z-10",
                            isSubActive ? "text-zinc-200" : "text-zinc-600 group-hover/sub:text-zinc-400"
                          )}>
                            {subItem.description}
                          </span>
                        )}
                      </CMSLink>
                    )
                  })}
                </div>
              </div>

              <div className="col-span-5 bg-zinc-950 flex flex-col h-full">
                <div className="p-6 border-b border-zinc-900 flex justify-between items-center">
                  <span className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-600">Spotlight_Target</span>
                  <Crosshair className="h-3.5 w-3.5 text-zinc-800 animate-spin-slow" />
                </div>

                {spotlight?.enable && (
                  <div className="p-8 flex-1 flex flex-col justify-end">
                    {(() => {
                      const entity = spotlight.entity?.value
                      let name = spotlight.label || ''
                      let image = null
                      let url = spotlight.overrideUrl || '#'

                      if (entity && typeof entity === 'object') {
                        name = name || entity.name || entity.title || ''
                        image = entity.logo || entity.cover || entity.thumbnail || null
                      }

                      return (
                        <Link href={url} className="group/spot flex flex-col h-full">
                          {image && typeof image === 'object' && (
                            <div className="relative aspect-square mb-8 border border-zinc-800 bg-black overflow-hidden group-hover/spot:border-red-600/50 transition-colors duration-500"
                              style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)' }}>
                              <Media resource={image} className="object-cover w-full h-full grayscale opacity-40 group-hover/spot:grayscale-0 group-hover/spot:opacity-100 group-hover/spot:scale-110 transition-all duration-1000 ease-out" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                            </div>
                          )}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-red-600 group-hover/spot:animate-ping" />
                              <span className="text-[7px] font-mono text-zinc-600 uppercase">Live_Sync</span>
                            </div>
                            <h4 className="text-[13px] font-black uppercase italic text-zinc-400 group-hover/spot:text-white transition-all tracking-tighter group-hover/spot:translate-x-1">
                              {name}
                            </h4>
                            <div className="h-[2px] w-full bg-zinc-900 overflow-hidden relative">
                              <div className="absolute inset-0 bg-red-600 translate-x-[-100%] group-hover/spot:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]" />
                            </div>
                          </div>
                        </Link>
                      )
                    })()}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
          <User className={cn('h-3 w-3 transition-all duration-300', isHovered ? 'text-red-600 scale-110' : 'text-zinc-600')} />
          <span className="text-[9px] font-black uppercase tracking-widest italic text-zinc-500 group-hover:text-zinc-300 transition-colors">Auth_Link</span>
        </div>
        <motion.div initial={false} animate={{ y: isHovered ? 0 : '100%' }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 flex items-center bg-zinc-900 z-20">
          {user ? (
            <>
              <Link href="/account" className="flex-1 flex items-center justify-center h-full hover:bg-zinc-800 transition-colors border-r border-zinc-800">
                <span className="text-[8px] font-black uppercase italic text-white">PROFILE</span>
              </Link>
              <button onClick={logout} className="flex-1 flex items-center justify-center h-full hover:bg-red-600 transition-colors">
                <span className="text-[8px] font-black uppercase italic text-white">EXIT</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="flex-1 flex items-center justify-center h-full hover:bg-zinc-800 transition-colors border-r border-zinc-800">
                <span className="text-[8px] font-black uppercase italic text-white">LOGIN</span>
              </Link>
              <Link href="/create-account" className="flex-1 flex items-center justify-center h-full hover:bg-red-600 transition-colors">
                <span className="text-[8px] font-black uppercase italic text-white">REGISTER</span>
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-zinc-900">
      <div className="container relative flex items-stretch min-h-[85px]">
        <div
          className="flex items-center pr-12 bg-black z-10"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)', borderRight: '1px solid #18181b' }}
        >
          <Link href="/" className="group relative">
            <LogoIcon className="h-8 w-auto md:h-10 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute -inset-2 bg-red-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        <div className="flex-1 flex flex-col -ml-4">
          <div className="flex justify-between items-center py-2 ml-8 mr-16 border-b border-zinc-900 bg-zinc-950/30">
            <div className="hidden md:flex items-center gap-6">
              {socialAccounts.map((account: any) => {
                const Icon = socialIcons[account.platform] || Link2
                return (
                  <a key={account.id} href={account.url} target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-red-600 transition-all hover:scale-110">
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                )
              })}
            </div>

            <div className="flex items-center gap-8 ml-auto h-full">
              {utilityNav.map((item: any) => (
                <CMSLink key={item.id} {...item.link} className={cn('text-[8px] font-black uppercase tracking-[0.4em] italic transition-all relative', pathname === item.link.url ? 'text-red-500' : 'text-zinc-600 hover:text-white')} />
              ))}
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
            <ul className="hidden md:flex items-center h-full -space-x-4">
              {navItems.map((item: any, index: number) => (
                <li key={item.id} className="relative h-full flex items-center">
                  <MegaMenuItem
                    item={item}
                    isOpen={activeIndex === index}
                    onMouseEnter={() => {
                      if (timeoutRef.current) clearTimeout(timeoutRef.current)
                      setActiveIndex(index)
                    }}
                    onMouseLeave={() => {
                      timeoutRef.current = setTimeout(() => setActiveIndex(null), 150)
                    }}
                  />
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