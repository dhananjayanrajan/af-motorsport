'use client'

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
    <nav className={cn('w-full flex flex-col px-8 md:px-12 py-12', className)}>
      <div className="flex flex-col">
        <div className="flex gap-2 mb-8">
          <div className="size-6 rounded-full bg-primary" />
          <div className="size-6 bg-secondary" />
          <div className="size-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-accent" />
        </div>

        <ul className="flex flex-col border-t-4 border-black">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== '/account' && pathname.includes(item.href))

            return (
              <li key={item.href} className="border-b-2 border-black">
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center justify-between p-6 transition-colors relative',
                    isActive ? 'bg-zinc-50' : 'hover:bg-zinc-50'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-1.5 h-6 transition-colors",
                      isActive ? "bg-black" : "bg-transparent group-hover:bg-black"
                    )} />
                    <item.icon
                      className={cn(
                        'h-5 w-5',
                        isActive ? 'text-black' : 'text-zinc-400 group-hover:text-black',
                      )}
                      strokeWidth={3}
                    />
                    <span
                      className={cn(
                        'text-sm font-bold uppercase tracking-tight transition-colors',
                        isActive ? 'text-black' : 'text-zinc-500 group-hover:text-black',
                      )}
                    >
                      {item.label}
                    </span>
                  </div>

                  <ChevronRight
                    className={cn(
                      'h-5 w-5 transition-transform',
                      isActive ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                    )}
                    strokeWidth={3}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-12">
        <Link
          href="/logout"
          className="group flex items-center justify-between px-6 h-16 border-2 border-black bg-white hover:bg-black hover:text-white transition-all"
        >
          <span className="text-xs font-bold uppercase tracking-widest">
            Sign Out
          </span>
          <LogOut className="h-4 w-4" strokeWidth={3} />
        </Link>
      </div>
    </nav>
  )
}