import { AccountForm } from '@/components/forms/AccountForm'
import { OrderItem } from '@/components/OrderItem'
import { Order } from '@/payload-types'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import configPromise from '@payload-config'
import { ChevronRight, History } from 'lucide-react'
import type { Metadata } from 'next'
import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export default async function AccountPage() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  let orders: Order[] | null = null

  if (!user) {
    redirect(`/login?warning=${encodeURIComponent('Please login to access your account.')}`)
  }

  try {
    const ordersResult = await payload.find({
      collection: 'orders',
      limit: 5,
      user,
      overrideAccess: false,
      pagination: false,
      where: { customer: { equals: user?.id } },
    })
    orders = ordersResult?.docs || []
  } catch (error) { }

  return (
    <div className="space-y-40">
      <section className="space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-4 border-black-pure pb-12 relative">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-3 bg-primary-500 border-2 border-black-pure" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-black-pure">
                MEMBER PROFILE
              </span>
            </div>
            <h1 className="text-6xl font-black uppercase tracking-tighter text-black-pure leading-none">
              ACCOUNT <span className="text-secondary-500">SETTINGS</span>
            </h1>
          </div>
          <div className="hidden md:block border-l-4 border-black-pure pl-8 max-w-[240px]">
            <p className="text-xs font-black uppercase tracking-tight text-black-pure leading-tight">
              MANAGE PERSONAL DATA AND GLOBAL COMMUNICATION PREFERENCES.
            </p>
          </div>
          <div className="absolute -bottom-1 left-0 flex gap-1">
            <div className="h-1 w-24 bg-primary-500" />
            <div className="h-1 w-12 bg-secondary-500" />
            <div className="h-1 w-6 bg-tertiary-500" />
          </div>
        </div>

        <div className="bg-white-pure border-4 border-black-pure p-10 lg:p-16 relative">
          <div className="absolute top-0 right-0 p-4 flex gap-1">
            <div className="size-4 bg-primary-500 border-2 border-black-pure" />
          </div>
          <AccountForm />
        </div>
      </section>

      <section className="space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-4 border-black-pure pb-12 relative">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <History className="h-5 w-5 text-black-pure" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-black-pure">
                PURCHASE HISTORY
              </span>
            </div>
            <h2 className="text-6xl font-black uppercase tracking-tighter text-black-pure leading-none">
              RECENT <span className="text-tertiary-500">ORDERS</span>
            </h2>
          </div>
          <Link
            href="/orders"
            className="group flex items-center gap-4 bg-black-pure text-white-pure px-8 py-4 hover:bg-primary-500 hover:text-black-pure transition-colors duration-300 mb-1"
          >
            <span className="text-xs font-black uppercase tracking-widest">VIEW ALL DATA</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="absolute -bottom-1 left-0 h-1 w-40 bg-black-pure" />
        </div>

        <div className="bg-white-pure border-4 border-black-pure overflow-hidden">
          {(!orders || orders.length === 0) ? (
            <div className="py-32 flex flex-col items-center justify-center bg-white-pure">
              <div className="size-16 bg-white-pure border-4 border-black-pure flex items-center justify-center mb-6">
                <History className="h-8 w-8 text-black-pure opacity-20" />
              </div>
              <span className="text-sm font-black uppercase tracking-[0.4em] text-black-pure/30">
                DATABASE EMPTY
              </span>
            </div>
          ) : (
            <div className="divide-y-4 divide-black-pure">
              {orders.map((order) => (
                <div key={order.id} className="p-10 transition-colors hover:bg-primary-500/5">
                  <OrderItem order={order} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Manage your profile and view orders.',
  openGraph: mergeOpenGraph({ title: 'Account', url: '/account' }),
  title: 'Account',
}