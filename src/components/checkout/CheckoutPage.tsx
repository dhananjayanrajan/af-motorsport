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

  const canGoToPayment = Boolean((email || user) && billingAddress)

  useEffect(() => {
    if (user && addresses && addresses.length > 0 && !billingAddress) {
      const defaultAddress =
        addresses.find((addr: Address) => addr.id === user.id || true) || addresses[0]
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
      <div className="py-32 w-full flex flex-col items-center justify-center bg-white min-h-screen">
        <div className="size-20 bg-zinc-100 flex items-center justify-center border-4 border-black mb-10">
          <ShoppingBag className="size-10 text-black" strokeWidth={3} />
        </div>
        <p className="text-sm font-bold uppercase tracking-[0.4em] text-zinc-400 mb-10">
          Cart Status: Null
        </p>
        <Link
          href="/shop"
          className="h-16 px-12 bg-black text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center hover:bg-primary hover:text-black border-2 border-black transition-colors"
        >
          Return to Catalog
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white text-black">
      <div className="flex-1 p-8 md:p-12 lg:p-24 border-r-4 border-black">
        <div className="max-w-3xl mx-auto space-y-32">
          <section className="space-y-12">
            <div className="flex items-center gap-6">
              <span className="text-4xl font-bold text-primary border-b-4 border-black">01</span>
              <h2 className="text-xl font-bold uppercase tracking-widest text-black">
                Account Identification
              </h2>
            </div>

            {!user ? (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/login"
                    className="flex items-center justify-center h-16 border-2 border-black text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-100 transition-colors"
                  >
                    User Login
                  </Link>
                  <Link
                    href="/create-account"
                    className="flex items-center justify-center h-16 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-colors"
                  >
                    Create Profile
                  </Link>
                </div>

                <div className="relative flex items-center">
                  <div className="grow border-t-2 border-zinc-100" />
                  <span className="px-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Manual Input
                  </span>
                  <div className="grow border-t-2 border-zinc-100" />
                </div>

                <div className="space-y-8">
                  <FormItem>
                    <Label className="text-xs font-bold uppercase tracking-widest text-black mb-4 block">
                      Email Address
                    </Label>
                    <ClippedInput
                      disabled={!emailEditable}
                      className="bg-zinc-50 border-2 border-black h-16 px-6 focus:bg-white transition-all rounded-none font-bold uppercase text-sm"
                      placeholder="Enter contact email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormItem>

                  {emailEditable && (
                    <button
                      disabled={!email}
                      onClick={() => setEmailEditable(false)}
                      className="h-16 px-12 bg-black text-white text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-20 flex items-center gap-4 hover:bg-primary hover:text-black"
                    >
                      Lock Email & Continue <ChevronRight className="size-5" strokeWidth={3} />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-10 border-4 border-black bg-zinc-50 flex justify-between items-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
                    Verified User
                  </p>
                  <p className="text-lg font-bold text-black uppercase">{user.email}</p>
                </div>
                <Link
                  href="/logout"
                  className="text-xs font-bold uppercase text-black hover:text-error underline underline-offset-4 decoration-2 transition-colors"
                >
                  Logout
                </Link>
              </div>
            )}
          </section>

          <section className="space-y-12">
            <div className="flex items-center gap-6">
              <span className="text-4xl font-bold text-secondary border-b-4 border-black">02</span>
              <h2 className="text-xl font-bold uppercase tracking-widest text-black">
                Shipping & Logistics
              </h2>
            </div>

            <div className="space-y-12">
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-1 bg-black" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-black">
                    Billing Parameters
                  </h3>
                </div>
                {billingAddress ? (
                  <div className="border-2 border-black p-8 bg-zinc-50">
                    <AddressItem address={billingAddress} />
                    <button
                      onClick={() => setBillingAddress(undefined)}
                      className="mt-6 text-xs font-bold uppercase text-black hover:text-primary underline underline-offset-4 decoration-2"
                    >
                      Modify Entry
                    </button>
                  </div>
                ) : user ? (
                  <CheckoutAddresses heading="" setAddress={setBillingAddress} />
                ) : (
                  <div className="border-4 border-dashed border-zinc-200 p-16 flex flex-col items-center justify-center bg-zinc-50/50">
                    <CreateAddressModal
                      disabled={!user && (!email || emailEditable)}
                      callback={setBillingAddress}
                      skipSubmission={true}
                      buttonText="Set Billing Address"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-6 items-center p-8 border-2 border-black bg-white">
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
                  className="size-6 border-2 border-black rounded-none data-[state=checked]:bg-black data-[state=checked]:text-white"
                />
                <Label htmlFor="same" className="text-xs font-bold uppercase text-black cursor-pointer">
                  Sync billing with shipping data
                </Label>
              </div>

              {!billingAddressSameAsShipping && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-1 bg-black" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-black">
                      Shipping Parameters
                    </h3>
                  </div>
                  {shippingAddress ? (
                    <div className="border-2 border-black p-8 bg-zinc-50">
                      <AddressItem address={shippingAddress} />
                      <button
                        onClick={() => setShippingAddress(undefined)}
                        className="mt-6 text-xs font-bold uppercase text-black hover:text-primary underline underline-offset-4 decoration-2"
                      >
                        Modify Entry
                      </button>
                    </div>
                  ) : (
                    <div className="border-4 border-dashed border-zinc-200 p-16 flex flex-col items-center justify-center bg-zinc-50/50">
                      <CreateAddressModal
                        disabled={!user && (!email || emailEditable)}
                        callback={setShippingAddress}
                        skipSubmission={true}
                        buttonText="Set Shipping Address"
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
              className="h-20 w-full bg-black text-white text-sm font-bold uppercase tracking-widest transition-all disabled:opacity-10 flex items-center justify-center gap-6 border-2 border-black hover:bg-primary hover:text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              {isProcessingPayment ? (
                'Syncing...'
              ) : (
                <>
                  Commit Secure Checkout <Lock className="size-5" strokeWidth={3} />
                </>
              )}
            </button>
          )}

          {error && (
            <div className="p-8 border-4 border-error bg-error/10">
              <p className="text-xs font-bold uppercase tracking-widest text-error">
                System Error: {error}
              </p>
            </div>
          )}

          <Suspense fallback={<LoadingSpinner />}>
            {/* @ts-ignore */}
            {paymentData?.['clientSecret'] && (
              <section className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center gap-6">
                  <span className="text-4xl font-bold text-accent border-b-4 border-black">03</span>
                  <h2 className="text-xl font-bold uppercase tracking-widest text-black">
                    Payment Gateway
                  </h2>
                </div>
                <div className="p-10 md:p-16 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white">
                  <Elements
                    options={{
                      appearance: {
                        theme: 'stripe',
                        variables: {
                          colorPrimary: '#000',
                          borderRadius: '0px',
                          fontFamily: 'inherit',
                          colorBackground: '#ffffff',
                          colorText: '#000000',
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

      <aside className="w-full lg:w-[540px] bg-zinc-100 p-8 md:p-12 lg:p-20">
        <div className="sticky top-24">
          <div className="flex items-center justify-between border-b-4 border-black pb-8 mb-12">
            <h2 className="text-2xl font-bold uppercase tracking-tighter text-black">
              Order Summary
            </h2>
            <div className="flex gap-1">
              <div className="size-3 bg-primary" />
              <div className="size-3 bg-secondary" />
              <div className="size-3 bg-accent" />
            </div>
          </div>

          <div className="space-y-10 overflow-y-auto max-h-[45vh] pr-6 custom-scrollbar">
            {cart?.items?.map((item: any, i: number) => {
              const product = item.product
              const image = product?.gallery?.[0]?.image || product?.meta?.image
              return (
                <div className="flex gap-8 items-start border-b-2 border-black pb-10 group" key={i}>
                  <div className="h-28 w-24 bg-white border-2 border-black p-2 flex-shrink-0 transition-transform group-hover:rotate-2">
                    <div className="relative w-full h-full">
                      {image && <Media fill imgClassName="object-contain" resource={image} />}
                    </div>
                  </div>
                  <div className="flex grow flex-col">
                    <h4 className="font-bold text-base uppercase text-black leading-tight mb-2">
                      {product?.title}
                    </h4>
                    <div className="flex items-center justify-between mt-auto pt-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                        Qty: {item.quantity}
                      </span>
                      <Price
                        className="text-sm font-bold text-black"
                        amount={item.variant?.priceInUSD || product?.priceInUSD}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-16 pt-10 border-t-4 border-black space-y-6">
            <div className="flex justify-between items-center text-zinc-400">
              <span className="text-xs font-bold uppercase tracking-widest">Calculated Subtotal</span>
              <Price className="text-xl font-bold" amount={cart?.subtotal || 0} />
            </div>
            <div className="flex justify-between items-end bg-black p-8 text-white">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
                Final Total
              </span>
              <Price
                className="text-5xl font-bold uppercase tracking-tighter text-primary leading-none"
                amount={cart?.subtotal || 0}
              />
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}