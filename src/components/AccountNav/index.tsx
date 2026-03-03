'use client'

import { cn } from '@/utilities/cn'
import { ChevronRight, LogOut, MapPin, Package, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  className?: string
}

const navItems = [
  {
    label: 'Profile Settings',
    href: '/account',
    icon: User,
    code: 'USR-01'
  },
  {
    label: 'Shipping Registry',
    href: '/account/addresses',
    icon: MapPin,
    code: 'LOG-02'
  },
  {
    label: 'Order History',
    href: '/orders',
    icon: Package,
    code: 'ORD-03'
  }
]

export const AccountNav: React.FC<Props> = ({ className }) => {
  const pathname = usePathname()

  return (
    <nav className={cn('flex flex-col gap-8 w-full max-w-[280px]', className)}>
      <div className="space-y-1">
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 px-4">
          Terminal Menu
        </span>
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/account' && pathname.includes(item.href))

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group relative flex items-center justify-between h-14 px-6 transition-all duration-300',
                    isActive
                      ? 'bg-white text-black translate-x-2'
                      : 'bg-zinc-900/50 text-zinc-500 hover:bg-zinc-900 hover:text-white'
                  )}
                  style={{
                    clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)'
                  }}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <item.icon className={cn('h-4 w-4', isActive ? 'text-red-600' : 'text-zinc-700 group-hover:text-red-500')} />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                        {item.label}
                      </span>
                      <span className={cn(
                        'text-[7px] font-bold uppercase tracking-tighter mt-1',
                        isActive ? 'text-zinc-400' : 'text-zinc-800'
                      )}>
                        {item.code}
                      </span>
                    </div>
                  </div>

                  {isActive && (
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-red-600 z-20" style={{ clipPath: 'polygon(100% 0%, 100% 100%, 0% 50%)' }} />
                  )}

                  {!isActive && (
                    <ChevronRight className="h-3 w-3 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-red-600 relative z-10" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-auto pt-8 border-t border-zinc-900">
        <Link
          href="/logout"
          className="group flex items-center gap-4 px-6 py-4 text-zinc-600 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Terminate Session
          </span>
        </Link>
      </div>
    </nav>
  )
}