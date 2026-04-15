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
import { FormItem } from '@/components/forms/FormItem'
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

  const canGoToPayment = Boolean(
    (email || user) && billingAddress,
  )

  useEffect(() => {
    if (user && addresses && addresses.length > 0 && !billingAddress) {
      const defaultAddress = addresses.find((addr: Address) =>
        addr.id === user.id || true
      ) || addresses[0]
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
        const errorMessage = error instanceof Error ? error.message : 'Payment initiation failed.'
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
      <div className="py-24 w-full flex flex-col items-center justify-center bg-white min-h-screen">
        <ShoppingBag className="size-12 text-zinc-200 mb-6" />
        <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400 mb-8 italic">Your cart is empty</p>
        <Link href="/search" className="h-14 px-10 bg-black text-white text-[11px] font-black uppercase italic flex items-center justify-center">
          Return to Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white text-black">
      <div className="flex-1 p-6 md:p-12 lg:p-20 border-r border-zinc-100">
        <div className="max-w-2xl mx-auto space-y-24">

          <section className="space-y-10">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-black italic text-zinc-200">01</span>
              <h2 className="text-[14px] font-black uppercase italic tracking-widest text-black">Customer Information</h2>
            </div>

            {!user ? (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/login" className="flex items-center justify-center h-14 border border-zinc-200 text-black text-[11px] font-black uppercase italic hover:bg-zinc-50 transition-colors">
                    Login to Account
                  </Link>
                  <Link href="/create-account" className="flex items-center justify-center h-14 bg-black text-white text-[11px] font-black uppercase italic hover:bg-zinc-800 transition-colors">
                    Register
                  </Link>
                </div>

                <div className="relative flex items-center">
                  <div className="grow border-t border-zinc-100" />
                  <span className="px-4 text-[10px] font-black text-zinc-300 uppercase italic">Or Checkout as Guest</span>
                  <div className="grow border-t border-zinc-100" />
                </div>

                <div className="space-y-6">
                  <FormItem>
                    <Label className="text-[11px] font-black uppercase italic text-zinc-500 mb-3 block">Email Address</Label>
                    <ClippedInput
                      disabled={!emailEditable}
                      className="bg-white border-zinc-300 h-14 px-5 focus:border-black transition-all rounded-none"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormItem>

                  {emailEditable && (
                    <button
                      disabled={!email}
                      onClick={() => setEmailEditable(false)}
                      className="h-14 px-12 bg-black text-white text-[11px] font-black uppercase italic transition-all disabled:opacity-20 flex items-center gap-3"
                    >
                      Continue to Shipping <ChevronRight className="size-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 border border-zinc-200 bg-zinc-50 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Signed in as</p>
                  <p className="text-[14px] font-black text-black uppercase italic">{user.email}</p>
                </div>
                <Link href="/logout" className="text-[10px] font-black uppercase text-zinc-400 hover:text-black underline transition-colors">Sign Out</Link>
              </div>
            )}
          </section>

          <section className="space-y-10">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-black italic text-zinc-200">02</span>
              <h2 className="text-[14px] font-black uppercase italic tracking-widest text-black">Shipping & Billing</h2>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-[11px] font-black uppercase text-zinc-400 italic">Billing Address</h3>
                {billingAddress ? (
                  <div className="border border-zinc-200 p-6 bg-zinc-50">
                    <AddressItem address={billingAddress} />
                    <button
                      onClick={() => setBillingAddress(undefined)}
                      className="mt-4 text-[10px] font-black uppercase text-zinc-400 hover:text-black underline italic"
                    >
                      Change Address
                    </button>
                  </div>
                ) : user ? (
                  <CheckoutAddresses heading="" setAddress={setBillingAddress} />
                ) : (
                  <div className="border border-dashed border-zinc-200 p-12 flex flex-col items-center justify-center bg-zinc-50/50">
                    <CreateAddressModal
                      disabled={!user && (!email || emailEditable)}
                      callback={setBillingAddress}
                      skipSubmission={true}
                      buttonText="Add Billing Address"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4 items-center p-6 border border-zinc-100 bg-zinc-50/50">
                <Checkbox
                  id="same"
                  checked={billingAddressSameAsShipping}
                  onCheckedChange={(checked) => {
                    setBillingAddressSameAsShipping(checked as boolean)
                    if (checked) {
                      setShippingAddress(billingAddress)
                    } else {
                      setShippingAddress(undefined)
                    }
                  }}
                  className="border-zinc-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
                <Label htmlFor="same" className="text-[11px] font-black uppercase text-zinc-500 cursor-pointer italic">
                  Billing matches shipping address
                </Label>
              </div>

              {!billingAddressSameAsShipping && (
                <div className="space-y-6">
                  <h3 className="text-[11px] font-black uppercase text-zinc-400 italic">Shipping Address</h3>
                  {shippingAddress ? (
                    <div className="border border-zinc-200 p-6 bg-zinc-50">
                      <AddressItem address={shippingAddress} />
                      <button
                        onClick={() => setShippingAddress(undefined)}
                        className="mt-4 text-[10px] font-black uppercase text-zinc-400 hover:text-black underline italic"
                      >
                        Change Address
                      </button>
                    </div>
                  ) : (
                    <div className="border border-dashed border-zinc-200 p-12 flex flex-col items-center justify-center bg-zinc-50/50">
                      <CreateAddressModal
                        disabled={!user && (!email || emailEditable)}
                        callback={setShippingAddress}
                        skipSubmission={true}
                        buttonText="Add Shipping Address"
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
              className="h-16 px-16 bg-black text-white text-[12px] font-black uppercase italic transition-all disabled:opacity-10 flex items-center gap-4"
            >
              {isProcessingPayment ? 'Processing...' : (
                <>
                  Initialize Secure Checkout <Lock className="size-4" />
                </>
              )}
            </button>
          )}

          {error && (
            <div className="p-6 border border-red-200 bg-red-50">
              <p className="text-[11px] font-black uppercase text-red-600 italic">{error}</p>
            </div>
          )}

          <Suspense fallback={<LoadingSpinner />}>
            {/* @ts-ignore */}
            {paymentData?.['clientSecret'] && (
              <section className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black italic text-zinc-200">03</span>
                  <h2 className="text-[14px] font-black uppercase italic tracking-widest text-black">Payment Details</h2>
                </div>
                <div className="p-8 md:p-12 border border-zinc-200 shadow-2xl bg-white">
                  <Elements
                    options={{
                      appearance: {
                        theme: 'stripe',
                        variables: {
                          colorPrimary: '#000',
                          borderRadius: '0px',
                          fontFamily: 'Inter, sans-serif'
                        },
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
              </section>
            )}
          </Suspense>
        </div>
      </div>

      <aside className="w-full lg:w-[480px] bg-zinc-50 p-6 md:p-12 lg:p-16 border-l border-zinc-100">
        <div className="sticky top-20">
          <h2 className="text-[16px] font-black uppercase italic text-black mb-12 tracking-tighter border-b border-zinc-200 pb-4">
            Order Summary
          </h2>

          <div className="space-y-8 overflow-y-auto max-h-[50vh] pr-4">
            {cart?.items?.map((item: any, i: number) => {
              const product = item.product
              const image = product?.gallery?.[0]?.image || product?.meta?.image
              return (
                <div className="flex gap-6 items-center" key={i}>
                  <div className="h-20 w-16 bg-white border border-zinc-200 p-1 flex-shrink-0">
                    <div className="relative w-full h-full">
                      {image && <Media fill imgClassName="object-cover" resource={image} />}
                    </div>
                  </div>
                  <div className="flex grow flex-col">
                    <h4 className="font-black text-[11px] uppercase text-black italic tracking-tight">{product?.title}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] font-bold text-zinc-400">Qty: {item.quantity}</span>
                      <Price className="text-[12px] font-black text-black italic" amount={item.variant?.priceInUSD || product?.priceInUSD} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-200 space-y-4">
            <div className="flex justify-between items-center text-zinc-400">
              <span className="text-[11px] font-black uppercase italic">Subtotal</span>
              <Price className="text-lg font-bold italic" amount={cart?.subtotal || 0} />
            </div>
            <div className="flex justify-between items-end pt-4">
              <span className="text-[13px] font-black uppercase italic text-black">Total</span>
              <Price className="text-4xl font-black italic text-black tracking-tighter" amount={cart?.subtotal || 0} />
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}