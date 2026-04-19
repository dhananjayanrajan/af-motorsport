'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/Auth'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Link from 'next/link'
import React, { Suspense, useCallback, useEffect, useState } from 'react'

import { AddressItem } from '@/components/addresses/AddressItem'
import { CreateAddressModal } from '@/components/addresses/CreateAddressModal'
import { CheckoutForm } from '@/components/forms/CheckoutForm'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Checkbox } from '@/components/ui/checkbox'
import { Address } from '@/payload-types'
import { useAddresses, useCart, usePayments } from '@payloadcms/plugin-ecommerce/client/react'
import { ChevronRight, Lock, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { CheckoutAddresses } from './CheckoutAddresses'

const apiKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
const stripe = loadStripe(apiKey)

export const CheckoutPage: React.FC = () => {
  const { user } = useAuth()
  const { cart } = useCart()
  const { addresses } = useAddresses()
  const [email, setEmail] = useState('')
  const [emailEditable, setEmailEditable] = useState(true)
  const [paymentData, setPaymentData] = useState<null | Record<string, unknown>>(null)
  const { initiatePayment } = usePayments()
  const [shippingAddress, setShippingAddress] = useState<Partial<Address> | undefined>()
  const [billingAddress, setBillingAddress] = useState<Partial<Address> | undefined>()
  const [billingAddressSameAsShipping, setBillingAddressSameAsShipping] = useState(true)
  const [isProcessingPayment, setProcessingPayment] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cartIsEmpty = !cart || !cart.items || !cart.items.length
  const canGoToPayment = Boolean((email || user) && billingAddress)

  useEffect(() => {
    if (user && addresses && addresses.length > 0 && !billingAddress) {
      const defaultAddress = addresses[0]
      setBillingAddress(defaultAddress)
    }
  }, [user, addresses, billingAddress])

  useEffect(() => {
    if (billingAddressSameAsShipping) {
      setShippingAddress(billingAddress)
    }
  }, [billingAddressSameAsShipping, billingAddress])

  const initiatePaymentIntent = useCallback(
    async (paymentID: string) => {
      setError(null)
      setProcessingPayment(true)

      try {
        const paymentData = (await initiatePayment(paymentID, {
          additionalData: {
            ...(email ? { customerEmail: email } : {}),
            billingAddress,
            shippingAddress: billingAddressSameAsShipping ? billingAddress : shippingAddress,
          },
        })) as Record<string, unknown>

        if (paymentData) {
          setPaymentData(paymentData)
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Action failed.'
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setProcessingPayment(false)
      }
    },
    [billingAddress, billingAddressSameAsShipping, shippingAddress, email, initiatePayment],
  )

  if (!stripe) return null

  if (cartIsEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white-pure">
        <div className="size-20 bg-primary flex items-center justify-center mb-10">
          <ShoppingBag size={32} className="text-black-pure" />
        </div>
        <h2 className="text-xl font-mono font-black uppercase tracking-tight mb-8">Cart is empty</h2>
        <Link
          href="/shop"
          className="h-14 px-10 bg-black-pure text-white-pure text-sm font-mono font-black uppercase tracking-widest hover:bg-secondary transition-colors"
        >
          Return to shop
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-white-pure">
      <div className="flex-1 flex flex-col border-r border-black-pure">

        <section className="flex flex-col">
          <div className="flex items-stretch h-16 border-b border-black-pure">
            <div className="w-16 bg-secondary flex items-center justify-center text-white-pure text-lg font-mono font-black">1</div>
            <div className="flex-1 px-8 flex items-center">
              <h2 className="text-sm font-mono font-black uppercase tracking-widest">Account</h2>
            </div>
          </div>

          <div className="p-10 lg:p-16">
            {!user ? (
              <div className="space-y-12">
                <div className="grid grid-cols-2 bg-black-pure gap-px border border-black-pure">
                  <Link href="/login" className="flex items-center justify-center h-16 bg-white-pure text-xs font-mono font-black uppercase tracking-widest hover:bg-primary transition-colors">
                    Log in
                  </Link>
                  <Link href="/create-account" className="flex items-center justify-center h-16 bg-white-pure text-xs font-mono font-black uppercase tracking-widest hover:bg-primary transition-colors">
                    Sign up
                  </Link>
                </div>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-xs font-mono font-black uppercase tracking-widest opacity-40">Email</Label>
                    <ClippedInput
                      disabled={!emailEditable}
                      className="bg-white-pure border border-black-pure h-14 px-6 text-sm font-mono uppercase focus:bg-primary/5 transition-colors"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {emailEditable && (
                    <button
                      disabled={!email}
                      onClick={() => setEmailEditable(false)}
                      className="h-14 px-10 bg-black-pure text-white-pure text-xs font-mono font-black uppercase tracking-widest hover:bg-secondary transition-colors disabled:opacity-20 flex items-center gap-4"
                    >
                      Save and continue <ChevronRight size={18} />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-8 bg-white-pure border border-black-pure border-l-8 border-l-secondary">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono font-black uppercase opacity-40">Account active</span>
                  <span className="text-base font-mono font-black uppercase">{user.email}</span>
                </div>
                <Link href="/logout" className="text-xs font-mono font-black uppercase underline underline-offset-4 hover:text-secondary">Logout</Link>
              </div>
            )}
          </div>
        </section>

        <section className="flex flex-col border-t border-black-pure">
          <div className="flex items-stretch h-16 border-b border-black-pure">
            <div className="w-16 bg-primary flex items-center justify-center text-black-pure text-lg font-mono font-black">2</div>
            <div className="flex-1 px-8 flex items-center">
              <h2 className="text-sm font-mono font-black uppercase tracking-widest">Shipping</h2>
            </div>
          </div>

          <div className="p-10 lg:p-16 space-y-16">
            <div className="space-y-8">
              {billingAddress ? (
                <div className="p-8 bg-white-pure border border-black-pure relative">
                  <div className="absolute top-0 right-0 size-10 bg-primary border-l border-b border-black-pure flex items-center justify-center">
                    <div className="size-2 bg-black-pure" />
                  </div>
                  <AddressItem address={billingAddress} />
                  <button onClick={() => setBillingAddress(undefined)} className="mt-8 text-xs font-mono font-black uppercase underline underline-offset-4 hover:text-primary">Change</button>
                </div>
              ) : user ? (
                <CheckoutAddresses heading="Addresses" setAddress={setBillingAddress} />
              ) : (
                <div className="p-16 border border-black-pure border-dashed flex items-center justify-center bg-white-pure">
                  <CreateAddressModal
                    disabled={!user && (!email || emailEditable)}
                    callback={setBillingAddress}
                    skipSubmission={true}
                    buttonText="Add address"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-6 items-center p-8 bg-black-pure text-white-pure">
              <Checkbox
                id="same"
                checked={billingAddressSameAsShipping}
                onCheckedChange={(checked) => {
                  setBillingAddressSameAsShipping(checked as boolean)
                  if (checked) setShippingAddress(billingAddress)
                  else setShippingAddress(undefined)
                }}
                className="size-6 border-white-pure data-[state=checked]:bg-primary"
              />
              <Label htmlFor="same" className="text-xs font-mono font-black uppercase tracking-widest cursor-pointer">Shipping same as billing</Label>
            </div>

            {!billingAddressSameAsShipping && (
              <div className="space-y-8 animate-in fade-in duration-500">
                {shippingAddress ? (
                  <div className="p-8 bg-white-pure border border-black-pure">
                    <AddressItem address={shippingAddress} />
                    <button onClick={() => setShippingAddress(undefined)} className="mt-8 text-xs font-mono font-black uppercase underline underline-offset-4 hover:text-primary">Change</button>
                  </div>
                ) : (
                  <div className="p-16 border border-black-pure border-dashed flex items-center justify-center bg-white-pure">
                    <CreateAddressModal
                      disabled={!user && (!email || emailEditable)}
                      callback={setShippingAddress}
                      skipSubmission={true}
                      buttonText="Add shipping address"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {!paymentData && (
          <button
            disabled={!canGoToPayment || isProcessingPayment}
            onClick={() => initiatePaymentIntent('stripe')}
            className="h-20 w-full bg-black-pure text-white-pure text-sm font-mono font-black uppercase tracking-[0.2em] hover:bg-secondary transition-colors disabled:opacity-10 flex items-center justify-center gap-6 border-t border-black-pure"
          >
            {isProcessingPayment ? 'Syncing...' : <><Lock size={20} /> Continue to payment</>}
          </button>
        )}

        <Suspense fallback={<LoadingSpinner />}>
          {/* @ts-ignore */}
          {paymentData?.['clientSecret'] && (
            <section className="flex flex-col border-t border-black-pure animate-in fade-in duration-700">
              <div className="flex items-stretch h-16 border-b border-black-pure">
                <div className="w-16 bg-black-pure flex items-center justify-center text-white-pure text-lg font-mono font-black">3</div>
                <div className="flex-1 px-8 flex items-center">
                  <h2 className="text-sm font-mono font-black uppercase tracking-widest">Payment</h2>
                </div>
              </div>
              <div className="p-10 lg:p-16">
                <div className="p-8 border border-black-pure bg-white-pure">
                  <Elements
                    options={{
                      appearance: {
                        theme: 'stripe',
                        variables: { colorPrimary: '#000', borderRadius: '0px', fontFamily: 'monospace' },
                      },
                      clientSecret: paymentData['clientSecret'] as string,
                    }}
                    stripe={stripe}
                  >
                    <CheckoutForm
                      customerEmail={email || user?.email}
                      billingAddress={billingAddress}
                      setProcessingPayment={setProcessingPayment}
                    />
                  </Elements>
                </div>
              </div>
            </section>
          )}
        </Suspense>
      </div>

      <aside className="w-full lg:w-[450px] bg-white-pure flex flex-col">
        <div className="p-8 border-b border-black-pure bg-primary flex justify-between items-center">
          <h2 className="text-lg font-mono font-black uppercase tracking-widest">Summary</h2>
          <div className="flex gap-2">
            <div className="size-3 bg-secondary" />
            <div className="size-3 bg-black-pure" />
          </div>
        </div>

        <div className="flex-1 p-8 space-y-10 overflow-y-auto max-h-[50vh]">
          {cart?.items?.map((item: any, i: number) => {
            const product = item.product
            const image = product?.gallery?.[0]?.image || product?.meta?.image
            return (
              <div className="flex gap-6 pb-8 border-b border-black-pure last:border-0" key={i}>
                <div className="size-20 bg-white-pure border border-black-pure flex-shrink-0 relative overflow-hidden">
                  {image && <Media fill imgClassName="object-cover" resource={image} />}
                </div>
                <div className="flex flex-col justify-between py-1">
                  <span className="text-xs font-mono font-black uppercase leading-tight">{product?.title}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono font-black uppercase opacity-40">Qty: {item.quantity}</span>
                    <Price className="text-xs font-mono font-black" amount={item.variant?.priceInUSD || product?.priceInUSD} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-auto border-t border-black-pure bg-black-pure">
          <div className="flex justify-between items-center p-8 bg-white-pure border-b border-black-pure">
            <span className="text-xs font-mono font-black uppercase opacity-40">Subtotal</span>
            <Price className="text-base font-mono font-black" amount={cart?.subtotal || 0} />
          </div>
          <div className="flex justify-between items-center p-10 bg-secondary text-white-pure">
            <span className="text-sm font-mono font-black uppercase">Total</span>
            <Price className="text-4xl font-mono font-black tracking-tighter" amount={cart?.subtotal || 0} />
          </div>
        </div>
      </aside>
    </div>
  )
}