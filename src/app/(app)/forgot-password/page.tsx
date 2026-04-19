import { ForgotPasswordForm } from '@/components/forms/ForgotPasswordForm'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import type { Metadata } from 'next'

export default async function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="mb-12 flex flex-col gap-2">
          <div className="h-4 w-32 bg-red-600" />
          <div className="h-4 w-10 bg-yellow-400" />
          <div className="h-4 w-20 bg-black" />
        </div>
        <div className="border-t-4 border-black pt-12">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Enter your email address to recover your password.',
  openGraph: mergeOpenGraph({
    title: 'Forgot Password',
    url: '/forgot-password',
  }),
  title: 'Forgot Password',
}