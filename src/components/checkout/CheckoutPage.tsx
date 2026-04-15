'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { Media } from '@/components/Media'
import { Message } from '@/components/Message'
import { Price } from '@/components/Price'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/Auth'
import { useTheme } from '@/providers/Theme'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Suspense, useCallback, useEffect, useState } from 'react'

import { AddressItem } from '@/components/addresses/AddressItem'
import { CreateAddressModal } from '@/components/addresses/CreateAddressModal'
import { CheckoutAddresses } from '@/components/checkout/CheckoutAddresses'
import { CheckoutForm } from '@/components/forms/CheckoutForm'
import { FormItem } from '@/components/forms/FormItem'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Checkbox } from '@/components/ui/checkbox'
import { Address } from '@/payload-types'
import { useAddresses, useCart, usePayments } from '@payloadcms/plugin-ecommerce/client/react'
import { toast } from 'sonner'

const apiKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
const stripe = loadStripe(apiKey)

export const CheckoutPage: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()
  const { cart } = useCart()
  const [error, setError] = useState<null | string>(null)
  const { theme } = useTheme()
  const [email, setEmail] = useState('')
  const [emailEditable, setEmailEditable] = useState(true)
  const [paymentData, setPaymentData] = useState<null | Record<string, unknown>>(null)
  const { initiatePayment } = usePayments()
  const { addresses } = useAddresses()
  const [shippingAddress, setShippingAddress] = useState<Partial<Address>>()
  const [billingAddress, setBillingAddress] = useState<Partial<Address>>()
  const [billingAddressSameAsShipping, setBillingAddressSameAsShipping] = useState(true)
  const [isProcessingPayment, setProcessingPayment] = useState(false)

  const cartIsEmpty = !cart || !cart.items || !cart.items.length

  const canGoToPayment = Boolean(
    (email || user) && billingAddress && (billingAddressSameAsShipping || shippingAddress),
  )

  useEffect(() => {
    if (!shippingAddress) {
      if (addresses && addresses.length > 0) {
        const defaultAddress = addresses[0]
        if (defaultAddress) {
          setBillingAddress(defaultAddress)
        }
      }
    }
  }, [addresses])

  useEffect(() => {
    return () => {
      setShippingAddress(undefined)
      setBillingAddress(undefined)
      setBillingAddressSameAsShipping(true)
      setEmail('')
      setEmailEditable(true)
    }
  }, [])

  const initiatePaymentIntent = useCallback(
    async (paymentID: string) => {
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
        const errorData = error instanceof Error ? JSON.parse(error.message) : {}
        let errorMessage = 'An error occurred while initiating payment.'

        if (errorData?.cause?.code === 'OutOfStock') {
          errorMessage = 'One or more items in your cart are out of stock.'
        }

        setError(errorMessage)
        toast.error(errorMessage)
      }
    },
    [billingAddress, billingAddressSameAsShipping, shippingAddress, email, initiatePayment],
  )

  if (!stripe) return null

  if (cartIsEmpty && isProcessingPayment) {
    return (
      <div className="py-24 w-full flex flex-col items-center justify-center bg-zinc-950 min-h-screen">
        <div className="text-center mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00FF41] animate-pulse italic">Processing</p>
        </div>
        <LoadingSpinner />
      </div>
    )
  }

  if (cartIsEmpty) {
    return (
      <div className="py-24 w-full flex flex-col items-center justify-center bg-zinc-950 min-h-screen border border-zinc-900">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-8 italic">Empty</p>
        <Link href="/search" className="text-[#00FF41] text-[9px] font-black uppercase tracking-widest underline decoration-[#00FF41]/30 underline-offset-8">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-zinc-950 border-t border-zinc-900">
      <div className="flex-1 flex flex-col gap-16 bg-zinc-950 p-6 md:p-12 lg:p-20 border-r border-zinc-900">
        <section className="space-y-10">
          <div className="flex items-center gap-4 border-l-2 border-[#00FF41] pl-6">
            <h2 className="text-xs font-black uppercase tracking-[0.6em] italic text-white">01 Contact</h2>
          </div>

          {!user ? (
            <div className="space-y-10">
              <div className="bg-zinc-900/10 border border-zinc-900 p-8 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Button asChild className="rounded-none border-zinc-800 bg-zinc-950 text-[9px] font-black uppercase tracking-widest h-12 px-10 hover:bg-[#00FF41] hover:text-black transition-colors" variant="outline">
                    <Link href="/login">Log in</Link>
                  </Button>
                  <span className="text-[9px] font-black uppercase text-zinc-800 tracking-widest italic">or</span>
                  <Link href="/create-account" className="text-[9px] font-black uppercase tracking-widest text-[#00FF41] hover:underline">create account</Link>
                </div>
              </div>

              <div className="space-y-8 max-w-md">
                <FormItem>
                  <Label htmlFor="email" className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-4 block italic">Email Address</Label>
                  <ClippedInput
                    disabled={!emailEditable}
                    id="email"
                    name="email"
                    placeholder="EMAIL@MOTORSPORT.NET"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                  />
                </FormItem>

                {emailEditable && (
                  <Button
                    disabled={!email}
                    onClick={() => setEmailEditable(false)}
                    className="rounded-none bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] h-14 px-12 hover:bg-[#00FF41] transition-all"
                  >
                    Continue as guest
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900/5 border border-zinc-900 p-8 flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase text-zinc-700 tracking-widest">Logged in as</p>
                <p className="text-[11px] font-black text-[#00FF41] uppercase italic tracking-tight">{user.email}</p>
              </div>
              <Link className="text-[9px] font-black uppercase text-white underline decoration-zinc-800 hover:decoration-[#00FF41] transition-all" href="/logout">Logout</Link>
            </div>
          )}
        </section>

        <section className="space-y-12">
          <div className="flex items-center gap-4 border-l-2 border-[#00FF41] pl-6">
            <h2 className="text-xs font-black uppercase tracking-[0.6em] italic text-white">02 Address</h2>
          </div>

          <div className="space-y-6">
            <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700 italic">Billing Address</h3>
            {billingAddress ? (
              <div className="p-8 border border-zinc-800 bg-zinc-900/5">
                <AddressItem
                  address={billingAddress}
                  actions={
                    <Button
                      variant="outline"
                      className="rounded-none border-zinc-800 text-[8px] font-black uppercase italic bg-zinc-950 hover:bg-red-950 hover:text-white hover:border-red-900 h-10 px-8 transition-all mt-6"
                      disabled={Boolean(paymentData)}
                      onClick={() => setBillingAddress(undefined)}
                    >
                      Remove
                    </Button>
                  }
                />
              </div>
            ) : user ? (
              <CheckoutAddresses heading="" setAddress={setBillingAddress} />
            ) : (
              <CreateAddressModal
                disabled={!email || emailEditable}
                callback={(address) => setBillingAddress(address)}
                skipSubmission={true}
              />
            )}
          </div>

          <div className="flex gap-6 items-center p-8 bg-zinc-900/5 border border-zinc-900">
            <Checkbox
              id="shippingTheSameAsBilling"
              checked={billingAddressSameAsShipping}
              disabled={Boolean(paymentData || (!user && emailEditable))}
              onCheckedChange={(state) => setBillingAddressSameAsShipping(state as boolean)}
              className="border-zinc-800 data-[state=checked]:bg-[#00FF41] data-[state=checked]:border-[#00FF41] rounded-none w-5 h-5"
            />
            <Label htmlFor="shippingTheSameAsBilling" className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700 cursor-pointer italic">Shipping is the same as billing</Label>
          </div>

          {!billingAddressSameAsShipping && (
            <div className="space-y-6 pt-10 border-t border-zinc-900">
              <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700 italic">Shipping Address</h3>
              {shippingAddress ? (
                <div className="p-8 border border-zinc-800 bg-zinc-900/5">
                  <AddressItem
                    address={shippingAddress}
                    actions={
                      <Button
                        variant="outline"
                        className="rounded-none border-zinc-800 text-[8px] font-black uppercase italic bg-zinc-950 hover:bg-red-950 h-10 px-8 transition-all mt-6"
                        disabled={Boolean(paymentData)}
                        onClick={() => setShippingAddress(undefined)}
                      >
                        Remove
                      </Button>
                    }
                  />
                </div>
              ) : user ? (
                <CheckoutAddresses heading="" setAddress={setShippingAddress} />
              ) : (
                <CreateAddressModal
                  callback={(address) => setShippingAddress(address)}
                  disabled={!email || emailEditable}
                  skipSubmission={true}
                />
              )}
            </div>
          )}
        </section>

        {!paymentData && (
          <Button
            className="rounded-none bg-white text-black text-[11px] font-black uppercase tracking-[0.5em] italic h-16 px-16 hover:bg-[#00FF41] transition-all self-start"
            disabled={!canGoToPayment}
            onClick={(e) => {
              e.preventDefault()
              void initiatePaymentIntent('stripe')
            }}
          >
            Go to payment
          </Button>
        )}

        <Suspense fallback={<LoadingSpinner />}>
          {/* @ts-ignore */}
          {paymentData && paymentData?.['clientSecret'] && (
            <div className="pb-16 space-y-12">
              <div className="flex items-center gap-4 border-l-2 border-[#00FF41] pl-6">
                <h2 className="text-xs font-black uppercase tracking-[0.6em] italic text-white">03 Payment</h2>
              </div>
              {error && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest bg-red-950/20 p-6 border border-red-900">Error: {error}</p>}
              <div className="p-10 bg-zinc-950 border border-zinc-900">
                <Elements
                  options={{
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        borderRadius: '0px',
                        colorPrimary: '#00FF41',
                        colorBackground: '#0a0a0a',
                        colorText: '#ffffff',
                        fontFamily: 'Geist Mono, monospace',
                      },
                    },
                    clientSecret: paymentData['clientSecret'] as string,
                  }}
                  stripe={stripe}
                >
                  <div className="flex flex-col gap-10">
                    <CheckoutForm
                      customerEmail={email}
                      billingAddress={billingAddress}
                      setProcessingPayment={setProcessingPayment}
                    />
                    <Button
                      variant="ghost"
                      className="self-start text-[9px] font-black uppercase tracking-widest text-zinc-800 hover:text-[#00FF41] hover:bg-transparent transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        setPaymentData(null)
                      }}
                    >
                      Cancel payment
                    </Button>
                  </div>
                </Elements>
              </div>
            </div>
          )}
        </Suspense>

        {!paymentData?.['clientSecret'] && error && (
          <div className="my-8 p-10 border border-red-900 bg-red-950/10 space-y-8">
            <Message error={error} />
            <Button
              onClick={(e) => {
                e.preventDefault()
                router.refresh()
              }}
              className="rounded-none border-red-800 bg-zinc-950 text-red-500 text-[9px] font-black uppercase italic hover:bg-red-900 hover:text-white transition-all h-12 px-10"
              variant="outline"
            >
              Try again
            </Button>
          </div>
        )}
      </div>

      <aside className="w-full lg:w-[450px] bg-zinc-950 p-6 md:p-12 lg:p-16 space-y-16 h-fit sticky top-0 border-l border-zinc-900">
        <h2 className="text-[11px] font-black uppercase tracking-[0.6em] italic text-white border-b border-zinc-900 pb-10">Cart Manifest</h2>
        <div className="space-y-10">
          {cart?.items?.map((item: any, index: number) => {
            if (typeof item.product === 'object' && item.product) {
              const {
                product,
                product: { meta, title, gallery },
                quantity,
                variant,
              } = item

              if (!quantity) return null
              let image = gallery?.[0]?.image || meta?.image
              let price = product?.priceInUSD
              const isVariant = Boolean(variant) && typeof variant === 'object'

              if (isVariant) {
                price = variant?.priceInUSD
                const imageVariant = product.gallery?.find((gItem: any) => {
                  if (!gItem.variantOption) return false
                  const variantOptionID = typeof gItem.variantOption === 'object' ? gItem.variantOption.id : gItem.variantOption
                  return variant?.options?.some((option: any) => (typeof option === 'object' ? option.id === variantOptionID : option === variantOptionID))
                })
                if (imageVariant && typeof imageVariant.image !== 'string') image = imageVariant.image
              }

              return (
                <div className="flex gap-6 group" key={index}>
                  <div className="h-20 w-20 bg-zinc-900 border border-zinc-800 p-1 flex-shrink-0 relative overflow-hidden" style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)' }}>
                    <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500">
                      {image && typeof image !== 'string' && (
                        <Media fill imgClassName="object-cover" resource={image} />
                      )}
                    </div>
                  </div>
                  <div className="flex grow flex-col justify-center min-w-0">
                    <p className="font-black text-[10px] uppercase text-white truncate italic tracking-tighter group-hover:text-[#00FF41] transition-colors">{title}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">x{quantity}</span>
                      {typeof price === 'number' && <Price className="text-[11px] font-black text-zinc-500 italic" amount={price} />}
                    </div>
                  </div>
                </div>
              )
            }
            return null
          })}
        </div>

        <div className="pt-16 border-t border-zinc-900 space-y-6">
          <div className="flex justify-between items-end">
            <span className="text-[11px] font-black uppercase text-zinc-800 tracking-[0.3em] italic">Total</span>
            <Price className="text-4xl font-black italic text-white tracking-tighter" amount={cart.subtotal || 0} />
          </div>
        </div>
      </aside>
    </div>
  )
}