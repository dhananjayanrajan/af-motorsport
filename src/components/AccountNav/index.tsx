'use client'

import { cn } from '@/utilities/cn'
import { ChevronRight, LogOut, MapPin, Package, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface NavItem {
  icon: typeof User
  href: string
  label: string
}

type Props = {
  className?: string
  profileLabel?: string
  addressesLabel?: string
  ordersLabel?: string
  signOutLabel?: string
}

export const AccountNav: React.FC<Props> = ({
  className,
  profileLabel = "Profile Settings",
  addressesLabel = "Shipping Addresses",
  ordersLabel = "Order History",
  signOutLabel = "Sign Out"
}) => {
  const pathname = usePathname()

  const navItems = [
    {
      icon: User,
      href: '/account',
      label: profileLabel,
    },
    {
      icon: MapPin,
      href: '/account/addresses',
      label: addressesLabel,
    },
    {
      icon: Package,
      href: '/orders',
      label: ordersLabel,
    },
  ]

  return (
    <nav className={cn('w-full flex flex-col px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-12', className)}>
      <div className="flex flex-col">
        <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8">
          <div className="size-5 sm:size-6 bg-primary-500" />
          <div className="size-5 sm:size-6 bg-secondary-500" />
          <div className="size-5 sm:size-6 bg-tertiary-500" />
        </div>

        <ul className="flex flex-col border-t-2 sm:border-t-4 border-black-pure">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== '/account' && pathname.includes(item.href))

            return (
              <li key={item.href} className="border-b-2 border-black-pure">
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center justify-between p-3 sm:p-4 md:p-6 transition-colors relative',
                    isActive ? 'bg-primary-500' : 'hover:bg-black-pure'
                  )}
                >
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                    <div className={cn(
                      "w-1 sm:w-1.5 h-5 sm:h-6 transition-colors shrink-0",
                      isActive ? "bg-black-pure" : "bg-transparent group-hover:bg-primary-500"
                    )} />
                    <item.icon
                      className={cn(
                        'h-4 w-4 sm:h-5 sm:w-5 shrink-0',
                        isActive ? 'text-black-pure' : 'text-black-pure/40 group-hover:text-white-pure',
                      )}
                      strokeWidth={3}
                    />
                    <span
                      className={cn(
                        'text-xs sm:text-sm font-black uppercase tracking-wide sm:tracking-widest transition-colors truncate',
                        isActive ? 'text-black-pure' : 'text-black-pure/60 group-hover:text-white-pure',
                      )}
                    >
                      {item.label}
                    </span>
                  </div>

                  <ChevronRight
                    className={cn(
                      'h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-all ml-2',
                      isActive ? 'translate-x-0 text-black-pure' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-white-pure'
                    )}
                    strokeWidth={3}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12">
        <Link
          href="/logout"
          className="group flex items-center justify-between px-4 sm:px-6 h-12 sm:h-14 md:h-16 border-2 border-black-pure bg-white-pure hover:bg-black-pure transition-all"
        >
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-black-pure group-hover:text-white-pure transition-colors truncate">
            {signOutLabel}
          </span>
          <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-black-pure group-hover:text-white-pure transition-colors shrink-0 ml-2" strokeWidth={3} />
        </Link>
      </div>
    </nav>
  )
}