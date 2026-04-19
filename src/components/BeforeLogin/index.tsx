'use client'

import React from 'react'

export const BeforeLogin: React.FC = () => {
  return (
    <div className="bg-white px-8 md:px-12 py-12">
      <div className="flex flex-col gap-2 mb-12">
        <div className="h-4 w-32 bg-primary" />
        <div className="h-4 w-10 bg-accent" />
        <div className="h-4 w-20 bg-black" />
      </div>

      <div className="space-y-6">
        <header className="space-y-4">
          <h2 className="text-4xl font-bold uppercase tracking-tighter text-black leading-none">
            Admin Portal
          </h2>
          <div className="h-2 w-16 bg-black" />
        </header>

        <p className="text-sm font-bold uppercase tracking-tight text-black leading-normal max-w-sm">
          Access restricted. Internal store management protocol. Customers must{' '}
          <a
            href={`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/login`}
            className="bg-accent px-1 hover:bg-black hover:text-white transition-colors underline decoration-2 underline-offset-4"
          >
            authenticate via main site
          </a>
          {' '}for account and order access.
        </p>
      </div>
    </div>
  )
}