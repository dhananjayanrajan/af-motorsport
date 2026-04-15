'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import React from 'react'

export const BeforeLogin: React.FC = () => {
  return (
    <div
      className="p-8 border bg-white skew-x-[-4deg]"
      style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
    >
      <div className="skew-x-[4deg] space-y-4">
        <h2
          className="text-2xl font-black italic uppercase tracking-tighter text-black leading-none"
          style={{ textShadow: `0 0 15px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}` }}
        >
          Admin Portal
        </h2>

        <div
          className="h-1 w-12"
          style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
        />

        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 leading-relaxed max-w-md">
          Welcome to your dashboard. This interface is restricted to site admins for store management.
          Customers should{' '}
          <a
            href={`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/login`}
            className="text-black underline decoration-2 transition-colors"
            style={{ textDecorationColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
          >
            login to the main site
          </a>
          {' '}to access orders and account settings.
        </p>
      </div>
    </div>
  )
}