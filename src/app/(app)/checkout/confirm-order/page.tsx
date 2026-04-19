import { ConfirmOrder } from '@/components/checkout/ConfirmOrder'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import type { Metadata } from 'next'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function ConfirmOrderPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: SearchParams
}) {
  const searchParams = await searchParamsPromise

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      <div className="w-full max-w-4xl">
        <div className="mb-16 flex flex-col gap-2">
          <div className="h-4 w-32 bg-red-600" />
          <div className="h-4 w-10 bg-yellow-400" />
          <div className="h-4 w-20 bg-black" />
        </div>

        <div className="border-t-4 border-black pt-12">
          <header className="mb-12 flex flex-col items-start gap-6">
            <div className="flex gap-2">
              <div className="size-6 rounded-full bg-red-600" />
              <div className="size-6 bg-black" />
              <div className="size-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-yellow-400" />
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-bold uppercase tracking-tighter text-black leading-none">
                Order Finalization
              </h1>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                Processing Secure Transaction
              </p>
            </div>
          </header>

          <div className="bg-zinc-50 border-2 border-black p-8 md:p-12">
            <ConfirmOrder />
          </div>
        </div>

        <footer className="mt-20 pt-8 border-t-2 border-zinc-100 flex justify-between items-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-300">
            Status: Final_Authorization
          </p>
          <div className="flex gap-1">
            <div className="size-2 bg-black" />
            <div className="size-2 bg-black opacity-20" />
            <div className="size-2 bg-black opacity-10" />
          </div>
        </footer>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Confirm order.',
  openGraph: mergeOpenGraph({
    title: 'Confirming order',
    url: '/checkout/confirm-order',
  }),
  title: 'Confirming order',
}