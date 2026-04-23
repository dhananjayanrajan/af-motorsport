'use client'

import { CreateAccountForm } from '@/components/forms/CreateAccountForm'
import { RenderParams } from '@/components/RenderParams'
import SectionFooter from '@/components/Section/Components/SectionFooter'
import SectionHeader from '@/components/Section/Components/SectionHeader'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

function CreateAccountContent({ user }: { user: any }) {
  const router = useRouter()

  if (user) {
    return (
      <main className="min-h-screen bg-white-pure flex flex-col">
        <SectionHeader title="Status" subtitle="Existing" variant={3} />
        <div className="flex-1 flex flex-col md:flex-row items-stretch">
          <div className="flex-1 p-8 md:p-16 border-r border-black-pure">
            <div className="h-12 border-b border-black-pure flex items-center bg-primary px-8 mb-8">
              <span className="text-[10px] font-mono font-black uppercase">Conflict Resolved</span>
            </div>
            <p className="text-[10px] font-mono font-black uppercase text-black-pure/40 mb-12">
              A session is already active. End the session to register a new account.
            </p>
            <button
              onClick={() => router.push('/logout')}
              className="h-14 px-8 border border-black-pure flex items-center justify-between hover:bg-secondary hover:text-white-pure transition-all duration-300 group"
            >
              <span className="text-xs font-mono font-black uppercase tracking-widest">Logout</span>
              <div className="size-2 bg-black-pure group-hover:bg-white-pure transition-colors" />
            </button>
          </div>
          <div className="w-full md:w-80 bg-black-pure/5 border-l border-black-pure" />
        </div>
        <SectionFooter variant={3} />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white-pure flex flex-col">
      <SectionHeader title="Register" subtitle="Profile" variant={3} />
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 p-8 md:p-16 border-r border-black-pure">
          <RenderParams />
          <CreateAccountForm />
        </div>
        <div className="w-full md:w-80 flex flex-col border-l border-black-pure">
          <div className="h-12 border-b border-black-pure flex items-center px-8 bg-black-pure">
            <span className="text-[10px] font-mono font-black text-white-pure uppercase">Member</span>
          </div>
          <div className="p-8 space-y-6">
            <p className="text-[10px] font-mono font-black uppercase text-black-pure/40 leading-relaxed">
              Already possess credentials? Use the access link.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="w-full h-14 border border-black-pure flex items-center justify-center font-mono text-xs font-black uppercase tracking-widest hover:bg-secondary hover:text-white-pure transition-all duration-300"
            >
              Login
            </button>
          </div>
          <div className="flex-1 bg-black-pure/5" />
        </div>
      </div>
      <SectionFooter variant={3} />
    </main>
  )
}

export default function CreateAccount({ user }: { user: any }) {
  return (
    <Suspense fallback={null}>
      <CreateAccountContent user={user} />
    </Suspense>
  )
}