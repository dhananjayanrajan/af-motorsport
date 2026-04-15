'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { ChevronRight, LogOut, MapPin, Package, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
  className?: string
}

const navItems = [
  {
    icon: User,
    href: '/account',
    label: 'Profile Settings',
  },
  {
    icon: MapPin,
    href: '/account/addresses',
    label: 'Shipping Addresses',
  },
  {
    icon: Package,
    href: '/orders',
    label: 'Order History',
  },
]

export const AccountNav: React.FC<Props> = ({ className }) => {
  const pathname = usePathname()

  return (
    <nav className={cn('flex flex-col gap-8 w-full', className)}>
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div
            className="h-3 w-1"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
          />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Navigation
          </span>
        </div>

        <ul className="flex flex-col border-l border-zinc-200">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== '/account' && pathname.includes(item.href))

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group relative flex items-center justify-between py-4 px-6 transition-all duration-200 border-b border-zinc-100 last:border-0',
                    isActive ? 'bg-white' : 'hover:bg-zinc-100/50',
                  )}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <div
                      className="absolute left-[-1px] top-0 bottom-0 w-1 z-10"
                      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                    />
                  )}

                  <div className="flex items-center gap-4">
                    <item.icon
                      className={cn(
                        'h-4 w-4 transition-colors',
                        isActive ? 'text-black' : 'text-zinc-400 group-hover:text-black',
                      )}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span
                      className={cn(
                        'text-[11px] font-black uppercase italic tracking-tight transition-colors',
                        isActive ? 'text-black' : 'text-zinc-500 group-hover:text-black',
                      )}
                    >
                      {item.label}
                    </span>
                  </div>

                  <ChevronRight
                    className={cn(
                      'h-3 w-3 transition-all',
                      isActive
                        ? 'text-black opacity-100 translate-x-0'
                        : 'text-zinc-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0',
                    )}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="pt-4 px-1">
        <Link
          href="/logout"
          className="group flex items-center gap-4 text-zinc-400 hover:text-black transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase italic tracking-widest">
            Sign Out
          </span>
        </Link>
      </div>
    </nav>
  )
}