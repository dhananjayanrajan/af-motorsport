'use client'

import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import { ClippedButton } from '@/components/Custom/ui/ClippedButton'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ChevronDown, LogIn, LogOut, User, UserPlus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import React, { Suspense, useEffect, useRef, useState } from 'react'

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

const MegaMenuItem = ({ item, isOpen, onMouseEnter, onMouseLeave, onClose }: any) => {
  const { label, tagline, description, subItems, spotlight } = item
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!subItems || subItems.length === 0) {
    return (
      <span className="text-sm font-light py-2 px-3 text-neutral-700 dark:text-neutral-300">
        {label}
      </span>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={dropdownRef}
    >
      <button
        className={cn(
          'relative flex items-center gap-1 text-sm font-light py-2 px-3 overflow-hidden group',
          isOpen && 'text-red-600 dark:text-red-500',
        )}
      >
        <span className="relative z-10">{label}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 relative z-10 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
        <motion.span
          className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 dark:bg-red-500 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 top-full mt-2 w-screen max-w-5xl -translate-x-1/2 bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-none shadow-xl p-6 z-50"
          >
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2">
                {tagline && (
                  <p className="text-xs uppercase tracking-wider font-light text-neutral-500 dark:text-neutral-400 mb-2">
                    {tagline}
                  </p>
                )}
                {description && (
                  <p className="text-sm font-light text-neutral-600 dark:text-neutral-300 mb-6">
                    {description}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-4">
                  {subItems?.map((subItem: any) => (
                    <div
                      key={subItem.id}
                      className={cn(
                        'space-y-1 p-2 rounded-none transition-colors',
                        subItem.isFeatured &&
                        'bg-neutral-50 dark:bg-neutral-900 border-l-2 border-red-500 pl-3',
                      )}
                    >
                      <CMSLink
                        {...subItem.link}
                        label={subItem.label || subItem.link.label}
                        className={cn(
                          'text-sm font-light hover:text-red-600 dark:hover:text-red-500 transition-colors',
                          subItem.isFeatured && 'font-light text-red-600 dark:text-red-500',
                        )}
                      />
                      {subItem.description && (
                        <p className="text-xs font-light text-neutral-500 dark:text-neutral-400">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {spotlight?.enable && (
                <div className="col-span-1 border-l border-neutral-200 dark:border-zinc-800 pl-6">
                  <p className="text-xs uppercase tracking-wider font-light text-neutral-500 dark:text-neutral-400 mb-2">
                    {spotlight.label || 'Spotlight'}
                  </p>
                  {spotlight.entity && (
                    <div className="space-y-3">
                      {(() => {
                        const entity = spotlight.entity.value
                        const relation = spotlight.entity.relationTo
                        let name = ''
                        let image = null
                        let url = spotlight.overrideUrl || '#'

                        if (entity && typeof entity === 'object') {
                          name = entity.name || entity.title || ''
                          image = entity.logo || entity.cover || entity.thumbnail || null
                          if (!spotlight.overrideUrl) {
                            if (relation === 'drivers') url = `/glory/${entity.slug}`
                            else if (relation === 'cars') url = `/craft/${entity.slug}`
                            else if (relation === 'series') url = `/pursuit/${entity.slug}`
                          }
                        }

                        return (
                          <Link href={url} className="block group">
                            {image && typeof image === 'object' && (
                              <Media
                                resource={image}
                                className="w-full h-32 object-cover rounded-none mb-2 group-hover:opacity-90 transition"
                              />
                            )}
                            <h4 className="font-light text-sm group-hover:text-red-600 transition">
                              {name}
                            </h4>
                          </Link>
                        )
                      })()}
                    </div>
                  )}
                </div>
              )}
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

  if (user) {
    return (
      <div
        className="hidden md:flex relative items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="group relative flex items-center h-7 min-w-[140px] bg-zinc-950 border border-zinc-800 transition-all duration-300 overflow-hidden"
          style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}
        >
          <div className="flex w-full items-center justify-center gap-2 px-3 z-10 transition-colors duration-300">
            <User
              className={cn(
                'h-3 w-3 transition-colors duration-300',
                isHovered ? 'text-red-600' : 'text-zinc-500',
              )}
            />
            <span className="text-[10px] font-black uppercase tracking-widest italic text-zinc-400">
              Account
            </span>
          </div>

          <motion.div
            initial={false}
            animate={{ x: isHovered ? 0 : '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center bg-zinc-900 z-20"
          >
            <Link
              href="/account"
              className="flex-1 flex items-center justify-center gap-1.5 h-full px-2 hover:bg-zinc-800 transition-colors border-r border-zinc-800"
            >
              <User className="h-3 w-3 text-red-600" />
              <span className="text-[9px] font-black uppercase tracking-tighter italic text-white whitespace-nowrap">
                Profile
              </span>
            </Link>
            <button
              onClick={logout}
              className="flex-1 flex items-center justify-center gap-1.5 h-full px-2 hover:bg-red-600 transition-colors"
            >
              <LogOut className="h-3 w-3 text-white" />
              <span className="text-[9px] font-black uppercase tracking-tighter italic text-white whitespace-nowrap">
                Exit
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="hidden md:flex relative items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="group relative flex items-center h-7 min-w-[140px] bg-zinc-950 border border-zinc-800 transition-all duration-300 overflow-hidden"
        style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}
      >
        <div className="flex w-full items-center justify-center gap-2 px-3 z-10 transition-colors duration-300">
          <User
            className={cn(
              'h-3 w-3 transition-colors duration-300',
              isHovered ? 'text-red-600' : 'text-zinc-500',
            )}
          />
          <span className="text-[10px] font-black uppercase tracking-widest italic text-zinc-400">
            Account
          </span>
        </div>

        <motion.div
          initial={false}
          animate={{ x: isHovered ? 0 : '100%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center bg-zinc-900 z-20"
        >
          <Link
            href="/login"
            className="flex-1 flex items-center justify-center gap-1.5 h-full px-2 hover:bg-zinc-800 transition-colors border-r border-zinc-800"
          >
            <LogIn className="h-3 w-3 text-red-600" />
            <span className="text-[9px] font-black uppercase tracking-tighter italic text-white whitespace-nowrap">
              Login
            </span>
          </Link>
          <Link
            href="/create-account"
            className="flex-1 flex items-center justify-center gap-1.5 h-full px-2 hover:bg-red-600 transition-colors"
          >
            <UserPlus className="h-3 w-3 text-white" />
            <span className="text-[9px] font-black uppercase tracking-tighter italic text-white whitespace-nowrap">
              Join
            </span>
          </Link>
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

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveIndex(index)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveIndex(null), 100)
  }

  const closeDropdown = () => setActiveIndex(null)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-zinc-950/70 border-b border-neutral-200 dark:border-zinc-800 transition-colors duration-500">
      <div className="container flex items-stretch min-h-[88px]">
        <div className="flex items-center pr-8 border-r border-neutral-200 dark:border-zinc-800">
          <Link href="/" className="block">
            <LogoIcon className="h-8 w-auto md:h-10" />
          </Link>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center py-2 px-4 text-xs uppercase tracking-[0.15em] font-light text-neutral-600 dark:text-neutral-400 border-b border-neutral-100 dark:border-zinc-900">
            {socials && socialAccounts.length > 0 && (
              <div className="hidden md:flex items-center gap-5">
                {socialAccounts.map((account: any) => {
                  const Icon = socialIcons[account.platform] || Link2
                  return (
                    <motion.a
                      key={account.id}
                      href={account.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 dark:text-neutral-500 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      title={account.label || account.handle || account.platform}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  )
                })}
              </div>
            )}

            <div className="flex items-center gap-6 ml-auto">
              {utilityNav.map((item: any) => (
                <CMSLink
                  key={item.id}
                  {...item.link}
                  className={cn(
                    'relative text-xs font-light py-1 overflow-hidden group',
                    pathname === item.link.url
                      ? 'text-black dark:text-white'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white',
                  )}
                />
              ))}
              <div className="flex items-center gap-4 pl-4 border-l border-neutral-100 dark:border-zinc-900">
                {user && (
                  <Suspense fallback={<OpenCartButton />}>
                    <Cart />
                  </Suspense>
                )}
                <AuthComboButton />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 px-4 flex-1">
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item: any, index: number) => (
                <li key={item.id} className="relative">
                  <MegaMenuItem
                    item={item}
                    isOpen={activeIndex === index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClose={closeDropdown}
                  />
                </li>
              ))}
            </ul>

            <div className="md:hidden">
              <Suspense fallback={null}>
                <MobileMenu menu={navItems} socials={socialAccounts} />
              </Suspense>
            </div>

            <div className="flex items-center gap-4">
              {cta?.enable && cta.link && (
                <ClippedButton size="sm" label={cta.label || cta.link.label}>
                  <CMSLink {...cta.link} label={cta.label || cta.link.label} />
                </ClippedButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}