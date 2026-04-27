'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { CheckoutForm } from '@/components/forms/CheckoutForm'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import { Address } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { useAddresses, useCart, usePayments } from '@payloadcms/plugin-ecommerce/client/react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { ArrowRight, Lock, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { CheckoutAddresses } from './CheckoutAddresses'

const apiKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
const stripe = loadStripe(apiKey)

export const CheckoutPage: React.FC = () => {
  const { user } = useAuth()
  const { cart } = useCart()
  const { addresses } = useAddresses()
  const [email, setEmail] = useState('')
  const [emailEditable, setEmailEditable] = useState(true)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [paymentData, setPaymentData] = useState<null | Record<string, unknown>>(null)
  const { initiatePayment } = usePayments()
  const [billingAddress, setBillingAddress] = useState<Partial<Address> | undefined>()
  const [isProcessingPayment, setProcessingPayment] = useState(false)

  const cartIsEmpty = !cart || !cart.items || !cart.items.length
  const canGoToPayment = Boolean((email || user) && billingAddress)

  useEffect(() => {
    if (user && addresses?.length > 0 && !billingAddress) {
      setBillingAddress(addresses[0])
    }
  }, [user, addresses, billingAddress])

  const validateEmail = (emailToTest: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailToTest) return 'Email is required'
    if (!emailRegex.test(emailToTest)) return 'Please enter a valid email address'
    return null
  }

  const handleSaveEmail = () => {
    const error = validateEmail(email)
    if (error) {
      setEmailError(error)
      return
    }
    setEmailError(null)
    setEmailEditable(false)
  }

  const initiatePaymentIntent = useCallback(async () => {
    if (!user) {
      const error = validateEmail(email)
      if (error) {
        setEmailError(error)
        return
      }
    }

    if (!billingAddress?.addressLine1 || !billingAddress?.city || !billingAddress?.country || !billingAddress?.postalCode) {
      alert('Please select or enter a complete billing address.')
      return
    }

    setProcessingPayment(true)
    try {
      const data = await initiatePayment('stripe', {
        additionalData: {
          ...(email ? { customerEmail: email } : {}),
          billingAddress,
          shippingAddress: billingAddress,
        },
      })
      if (data && typeof data === 'object') setPaymentData(data as Record<string, unknown>)
    } catch (e) {
      console.error(e)
    } finally {
      setProcessingPayment(false)
    }
  }, [billingAddress, email, initiatePayment, user])

  if (cartIsEmpty) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-20">
        <div className="size-12 border border-black-pure flex items-center justify-center mb-8 group">
          <ShoppingBag size={16} className="group-hover:scale-125 transition-transform" />
        </div>
        <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] mb-12 text-black-pure/30">Your cart is empty</span>
        <Link href="/shop" className="h-14 px-10 border border-black-pure flex items-center gap-4 hover:bg-primary transition-all">
          <span className="text-xs font-mono font-black uppercase">Start shopping</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row items-stretch border-b border-black-pure">
      <div className="flex-1 border-r border-black-pure">
        <section className="border-b border-black-pure">
          <div className="h-12 border-b border-black-pure flex items-center justify-between px-8 bg-black-pure">
            <span className="text-[10px] font-mono font-black text-white-pure uppercase tracking-widest">01 // Account</span>
            <div className="size-2 bg-primary" />
          </div>
          <div className="p-8 md:p-12">
            {!user ? (
              <div className="max-w-sm space-y-8">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4">
                    <ClippedInput
                      label="Email"
                      disabled={!emailEditable}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (emailError) setEmailError(null)
                      }}
                      error={Boolean(emailError)}
                    />
                    {emailEditable && (
                      <button
                        onClick={handleSaveEmail}
                        disabled={!email}
                        className="h-12 px-6 bg-black-pure text-white-pure text-[10px] font-mono font-black uppercase hover:bg-primary hover:text-black-pure transition-colors disabled:opacity-20"
                      >
                        Save
                      </button>
                    )}
                  </div>
                  {emailError && (
                    <span className="text-[10px] font-mono font-black uppercase text-secondary tracking-tighter">
                      {emailError}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-[10px] font-mono font-black uppercase opacity-40">
                  <span>OR</span>
                  <Link href="/login" className="text-black-pure underline underline-offset-4 hover:text-primary transition-colors">Log In</Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between h-14 px-6 border border-black-pure bg-white-pure group hover:border-secondary transition-colors">
                <span className="text-xs font-mono font-black uppercase tracking-tight">{user.email}</span>
                <span className="text-[9px] font-mono font-black text-secondary">Verified</span>
              </div>
            )}
          </div>
        </section>

        <section className="border-b border-black-pure">
          <div className="h-12 border-b border-black-pure flex items-center justify-between px-8 bg-black-pure">
            <span className="text-[10px] font-mono font-black text-white-pure uppercase tracking-widest">02 // Address</span>
            <div className="size-2 bg-secondary" />
          </div>
          <div className="p-8 md:p-12">
            <CheckoutAddresses setAddress={setBillingAddress} />
          </div>
        </section>

        <section>
          {!paymentData ? (
            <button
              disabled={!canGoToPayment || isProcessingPayment}
              onClick={initiatePaymentIntent}
              className="w-full h-20 bg-black-pure text-white-pure flex items-center justify-between px-12 hover:bg-primary hover:text-black-pure transition-all duration-300 disabled:opacity-10 group"
            >
              <div className="flex items-center gap-6">
                <Lock size={16} className="group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-mono font-black uppercase tracking-[0.3em]">
                  {isProcessingPayment ? 'Initializing...' : 'Pay now'}
                </span>
              </div>
              <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform" />
            </button>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="h-12 border-b border-black-pure flex items-center justify-between px-8 bg-black-pure text-white-pure">
                <span className="text-[10px] font-mono font-black uppercase tracking-widest">03 // Secure payment</span>
                <div className="size-2 bg-white-pure" />
              </div>
              <div className="p-8 md:p-12">
                <Suspense fallback={<LoadingSpinner />}>
                  {/* @ts-ignore */}
                  {stripe && paymentData?.clientSecret && (
                    <Elements
                      options={{
                        appearance: {
                          theme: 'flat',
                          variables: { colorPrimary: '#000', fontFamily: 'monospace' },
                        },
                        clientSecret: paymentData.clientSecret as string,
                      }}
                      stripe={stripe}
                    >
                      <CheckoutForm
                        customerEmail={email || user?.email}
                        billingAddress={billingAddress}
                        setProcessingPayment={setProcessingPayment}
                      />
                    </Elements>
                  )}
                </Suspense>
              </div>
            </div>
          )}
        </section>
      </div>

      <aside className="w-full lg:w-96 flex flex-col bg-white-pure">
        <div className="h-12 border-b border-black-pure flex items-center justify-between px-8 bg-black-pure">
          <span className="text-[10px] font-mono font-black text-white-pure uppercase tracking-widest">Order Summary</span>
          <div className="flex gap-1">
            <div className="size-1.5 bg-primary" />
            <div className="size-1.5 bg-secondary" />
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6 overflow-y-auto max-h-[500px]">
          {cart?.items?.map((item: any, i: number) => {
            const image = item.product?.gallery?.[0]?.image || item.product?.meta?.image;
            return (
              <div key={i} className="flex gap-4 pb-6 border-b border-black-pure/10 last:border-0 items-start">
                <div className="size-16 border border-black-pure flex-shrink-0 bg-white-pure relative overflow-hidden">
                  {image && (
                    <Media
                      fill
                      resource={image}
                      imgClassName="object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-[10px] font-mono font-black uppercase leading-tight tracking-tight truncate">
                    {item.product?.title}
                  </span>
                  <div className="flex gap-4 text-[9px] font-mono font-black uppercase opacity-40">
                    <span>Qty {item.quantity}</span>
                    <Price amount={item.variant?.priceInUSD || item.product?.priceInUSD} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-auto border-t border-black-pure">
          <div className="h-14 px-8 flex items-center justify-between border-b border-black-pure">
            <span className="text-[10px] font-mono font-black uppercase opacity-20">Amount</span>
            <Price className="text-lg font-mono font-black tracking-tighter" amount={cart?.subtotal || 0} />
          </div>
          <div className="h-20 bg-secondary px-8 flex items-center justify-between text-white-pure">
            <span className="text-xs font-mono font-black uppercase tracking-widest">Total</span>
            <Price className="text-3xl font-mono font-black tracking-tighter" amount={cart?.subtotal || 0} />
          </div>
        </div>
      </aside>
    </div>
  )
}