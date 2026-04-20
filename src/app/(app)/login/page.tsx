'use client'

import { LoginForm } from '@/components/forms/LoginForm'
import { RenderParams } from '@/components/RenderParams'
import SectionFooter from '@/components/Section/Footer'
import SectionHeader from '@/components/Section/Header'
import { useRouter } from 'next/navigation'

export default function Login({ user }: { user: any }) {
  const router = useRouter()

  if (user) {
    return (
      <main className="min-h-screen bg-white-pure flex flex-col">
        <SectionHeader title="Account" subtitle="Session" variant={3} />

        <div className="flex-1 flex flex-col md:flex-row items-stretch">
          <div className="flex-1 flex flex-col border-r border-black-pure">
            <div className="h-12 border-b border-black-pure flex items-center px-8 bg-black-pure">
              <span className="text-[10px] font-mono font-black text-white-pure uppercase tracking-widest">Active Identity</span>
            </div>
            <div className="p-8 space-y-8">
              <p className="text-[10px] font-mono font-black uppercase text-black-pure/40 leading-relaxed max-w-sm">
                The current profile is authenticated. Access the management area or terminate the session.
              </p>
              <div className="flex flex-col border-t border-black-pure">
                <button
                  onClick={() => router.push('/account')}
                  className="h-14 px-8 flex items-center justify-between border-b border-black-pure hover:bg-primary transition-all duration-300 group"
                >
                  <span className="text-xs font-mono font-black uppercase tracking-widest">Dashboard</span>
                  <div className="w-2 h-2 bg-black-pure group-hover:scale-150 transition-transform" />
                </button>
                <button
                  onClick={() => router.push('/logout')}
                  className="h-14 px-8 flex items-center justify-between border-b border-black-pure hover:bg-secondary hover:text-white-pure transition-all duration-300 group"
                >
                  <span className="text-xs font-mono font-black uppercase tracking-widest">Sign Out</span>
                  <div className="w-2 h-2 bg-black-pure group-hover:bg-white-pure group-hover:rotate-45 transition-all" />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-80 bg-white-pure flex flex-col">
            <div className="h-12 border-b border-black-pure flex items-center px-8">
              <span className="text-[10px] font-mono font-black uppercase text-black-pure/20">System Info</span>
            </div>
            <div className="p-8 flex-1 border-b border-black-pure">
              <div className="flex gap-2">
                <div className="size-4 bg-primary" />
                <div className="size-4 bg-secondary" />
                <div className="size-4 bg-tertiary-500" />
              </div>
            </div>
          </div>
        </div>

        <SectionFooter variant={3} />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white-pure flex flex-col">
      <SectionHeader title="Identity" subtitle="Entry" variant={3} />

      <section className="flex-1 flex flex-col md:flex-row items-stretch">
        <div className="flex-1 p-8 md:p-16 border-r border-black-pure">
          <RenderParams />
          <LoginForm />
        </div>

        <div className="w-full md:w-80 flex flex-col">
          <div className="h-12 border-b border-black-pure flex items-center px-8 bg-black-pure">
            <span className="text-[10px] font-mono font-black text-white-pure uppercase tracking-widest">New Member</span>
          </div>
          <div className="p-8 space-y-6">
            <p className="text-[10px] font-mono font-black uppercase text-black-pure/40 leading-relaxed">
              Register a new profile to access championship data and driver records.
            </p>
            <button
              onClick={() => router.push('/create-account')}
              className="w-full h-14 border border-black-pure flex items-center justify-center font-mono text-xs font-black uppercase tracking-widest hover:bg-primary transition-colors duration-300 group"
            >
              Register
            </button>
          </div>
          <div className="flex-1 border-t border-black-pure bg-black-pure/5" />
        </div>
      </section>

      <SectionFooter variant={3} />
    </main>
  )
}