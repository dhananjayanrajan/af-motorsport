'use client'

import { ForgotPasswordForm } from '@/components/forms/ForgotPasswordForm'
import SectionFooter from '@/components/Section/Footer'
import SectionHeader from '@/components/Section/Header'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-white-pure flex flex-col">
      <SectionHeader title="Recovery" subtitle="Access" variant={3} />
      <div className="flex-1 flex flex-col md:flex-row items-stretch">
        <div className="flex-1 p-8 md:p-16 border-r border-black-pure">
          <ForgotPasswordForm />
        </div>
        <div className="w-full md:w-80 flex flex-col border-l border-black-pure">
          <div className="h-12 border-b border-black-pure flex items-center px-8 bg-tertiary-500">
            <span className="text-[10px] font-mono font-black text-white-pure uppercase">Protocol</span>
          </div>
          <div className="p-8 space-y-6">
            <p className="text-[10px] font-mono font-black uppercase text-black-pure/40 leading-relaxed">
              If the recovery email does not arrive, check the secondary folder or contact support.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="w-full h-14 border border-black-pure flex items-center justify-center font-mono text-xs font-black uppercase tracking-widest hover:bg-black-pure hover:text-white-pure transition-all duration-300"
            >
              Sign In
            </button>
          </div>
          <div className="flex-1 bg-black-pure/5" />
        </div>
      </div>
      <SectionFooter variant={3} />
    </main>
  )
}