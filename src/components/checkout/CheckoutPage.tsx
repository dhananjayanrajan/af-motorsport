'use client'

import { Media } from '@/components/Media'
import { Message } from '@/components/Message'
import { Price } from '@/components/Price'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
    [billingAddress, billingAddressSameAsShipping, shippingAddress],
  )

  if (!stripe) return null

  if (cartIsEmpty && isProcessingPayment) {
    return (
      <div className="py-24 w-full flex flex-col items-center justify-center bg-black">
        <div className="text-center mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00FF41] animate-pulse italic">Processing_Settlement_Protocol</p>
        </div>
        <LoadingSpinner />
      </div>
    )
  }

  if (cartIsEmpty) {
    return (
      <div className="py-24 w-full flex flex-col items-center bg-black border border-zinc-900">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-800 mb-8 italic">Manifest_Empty</p>
        <Link href="/search" className="text-[#00FF41] text-[9px] font-black uppercase tracking-widest underline decoration-[#00FF41]/30 underline-offset-8">Continue_Shopping</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-stretch justify-stretch my-8 md:flex-row grow gap-0 bg-zinc-950 border-t border-zinc-900">
      <div className="basis-full lg:basis-2/3 flex flex-col gap-16 justify-stretch bg-black p-8 lg:p-16 border-r border-zinc-900">
        <div className="flex items-center gap-4 border-l-2 border-[#00FF41] pl-6">
          <h2 className="text-xs font-black uppercase tracking-[0.6em] italic text-white">Contact</h2>
        </div>

        {!user && (
          <div className="bg-zinc-900/20 border border-zinc-900 p-8 w-full flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button asChild className="rounded-none border-zinc-800 bg-black text-[9px] font-black uppercase tracking-widest h-12 px-10 hover:bg-[#00FF41] hover:text-black transition-colors" variant="outline">
                <Link href="/login">Log in</Link>
              </Button>
              <span className="text-[9px] font-black uppercase text-zinc-800 tracking-widest italic">or</span>
              <Link href="/create-account" className="text-[9px] font-black uppercase tracking-widest text-[#00FF41] hover:underline">create an account</Link>
            </div>
          </div>
        )}

        {user ? (
          <div className="bg-zinc-900/10 border border-zinc-900 p-8 flex justify-between items-center">
            <p className="text-[11px] font-black text-[#00FF41] uppercase italic tracking-tight underline decoration-[#00FF41]/50 underline-offset-4">{user.email}</p>
            <p className="text-[9px] font-black uppercase text-zinc-700">
              Not you?{' '}
              <Link className="underline text-white ml-2" href="/logout">
                Log out
              </Link>
            </p>
          </div>
        ) : (
          <div className="bg-zinc-900/10 border border-zinc-900 p-8">
            <p className="text-[9px] font-black uppercase text-zinc-800 mb-8 tracking-widest">Guest_Checkout_Mode</p>

            <FormItem className="mb-10">
              <Label htmlFor="email" className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-700 mb-4 block italic">Email Address</Label>
              <Input
                disabled={!emailEditable}
                id="email"
                name="email"
                className="bg-black border-zinc-900 rounded-none text-white font-mono h-14 focus:border-[#00FF41] transition-colors"
                placeholder="OPERATOR@AF_MOTORSPORT.NET"
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
              />
            </FormItem>

            <Button
              disabled={!email || !emailEditable}
              onClick={(e) => {
                e.preventDefault()
                setEmailEditable(false)
              }}
              className="rounded-none bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] h-14 px-12 hover:bg-[#00FF41] hover:text-black transition-all"
              variant="default"
            >
              Continue as guest
            </Button>
          </div>
        )}

        <div className="flex items-center gap-4 border-l-2 border-[#00FF41] pl-6">
          <h2 className="text-xs font-black uppercase tracking-[0.6em] italic text-white">Address</h2>
        </div>

        {billingAddress ? (
          <div className="bg-zinc-900/10 border border-zinc-900 p-8">
            <AddressItem
              actions={
                <Button
                  variant={'outline'}
                  className="rounded-none border-zinc-800 text-[8px] font-black uppercase italic bg-black hover:bg-[#00FF41] hover:text-black h-10 px-6 transition-all"
                  disabled={Boolean(paymentData)}
                  onClick={(e) => {
                    e.preventDefault()
                    setBillingAddress(undefined)
                  }}
                >
                  Remove
                </Button>
              }
              address={billingAddress}
            />
          </div>
        ) : user ? (
          <CheckoutAddresses heading="Billing address" setAddress={setBillingAddress} />
        ) : (
          <CreateAddressModal
            disabled={!email || Boolean(emailEditable)}
            callback={(address) => {
              setBillingAddress(address)
            }}
            skipSubmission={true}
          />
        )}

        <div className="flex gap-4 items-center p-6 bg-zinc-900/10 border border-zinc-900">
          <Checkbox
            id="shippingTheSameAsBilling"
            checked={billingAddressSameAsShipping}
            disabled={Boolean(paymentData || (!user && (!email || Boolean(emailEditable))))}
            onCheckedChange={(state) => {
              setBillingAddressSameAsShipping(state as boolean)
            }}
            className="border-zinc-800 data-[state=checked]:bg-[#00FF41] data-[state=checked]:border-[#00FF41] rounded-none"
          />
          <Label htmlFor="shippingTheSameAsBilling" className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700 cursor-pointer italic">Shipping is the same as billing</Label>
        </div>

        {!billingAddressSameAsShipping && (
          <>
            {shippingAddress ? (
              <div className="bg-zinc-900/10 border border-zinc-900 p-8">
                <AddressItem
                  actions={
                    <Button
                      variant={'outline'}
                      className="rounded-none border-zinc-800 text-[8px] font-black uppercase italic bg-black hover:bg-[#00FF41] hover:text-black h-10 px-6 transition-all"
                      disabled={Boolean(paymentData)}
                      onClick={(e) => {
                        e.preventDefault()
                        setShippingAddress(undefined)
                      }}
                    >
                      Remove
                    </Button>
                  }
                  address={shippingAddress}
                />
              </div>
            ) : user ? (
              <CheckoutAddresses
                heading="Shipping address"
                description="Please select a shipping address."
                setAddress={setShippingAddress}
              />
            ) : (
              <CreateAddressModal
                callback={(address) => {
                  setShippingAddress(address)
                }}
                disabled={!email || Boolean(emailEditable)}
                skipSubmission={true}
              />
            )}
          </>
        )}

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

        {!paymentData?.['clientSecret'] && error && (
          <div className="my-8 p-8 border border-red-900 bg-red-900/5 space-y-6">
            <Message error={error} />
            <Button
              onClick={(e) => {
                e.preventDefault()
                router.refresh()
              }}
              className="rounded-none border-red-900 text-[9px] font-black uppercase italic hover:bg-red-900 hover:text-white"
              variant="outline"
            >
              Try again
            </Button>
          </div>
        )}

        <Suspense fallback={<React.Fragment />}>
          {/* @ts-ignore */}
          {paymentData && paymentData?.['clientSecret'] && (
            <div className="pb-16 space-y-12">
              <div className="flex items-center gap-4 border-l-2 border-[#00FF41] pl-6">
                <h2 className="text-xs font-black uppercase tracking-[0.6em] italic text-white">Payment</h2>
              </div>
              {error && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest">Error: {error}</p>}
              <div className="p-10 bg-zinc-950 border border-zinc-900">
                <Elements
                  options={{
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        borderRadius: '0px',
                        colorPrimary: '#00FF41',
                        colorBackground: '#000000',
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
                      className="self-start text-[9px] font-black uppercase tracking-widest text-zinc-800 hover:text-[#00FF41] hover:bg-transparent"
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
      </div>

      {!cartIsEmpty && (
        <aside className="basis-full lg:basis-1/3 bg-zinc-950 p-8 lg:p-16 space-y-16 h-fit sticky top-0">
          <h2 className="text-[11px] font-black uppercase tracking-[0.6em] italic text-white border-b border-zinc-900 pb-10">Your cart</h2>
          <div className="space-y-10">
            {cart?.items?.map((item, index) => {
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
                  const imageVariant = product.gallery?.find((item) => {
                    if (!item.variantOption) return false
                    const variantOptionID = typeof item.variantOption === 'object' ? item.variantOption.id : item.variantOption
                    return variant?.options?.some((option) => (typeof option === 'object' ? option.id === variantOptionID : option === variantOptionID))
                  })
                  if (imageVariant && typeof imageVariant.image !== 'string') image = imageVariant.image
                }

                return (
                  <div className="flex items-start gap-6 group" key={index}>
                    <div className="h-20 w-20 bg-black border border-zinc-900 p-1 flex-shrink-0" style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)' }}>
                      <div className="relative w-full h-full grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all">
                        {image && typeof image !== 'string' && (
                          <Media className="" fill imgClassName="object-cover" resource={image} />
                        )}
                      </div>
                    </div>
                    <div className="flex grow justify-between items-center min-w-0">
                      <div className="flex flex-col gap-1 min-w-0">
                        <p className="font-black text-[10px] uppercase text-white truncate italic tracking-tighter">{title}</p>
                        <div className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">x{quantity}</div>
                      </div>
                      {typeof price === 'number' && <Price className="text-xs font-black text-zinc-500 italic" amount={price} />}
                    </div>
                  </div>
                )
              }
              return null
            })}
          </div>
          <hr className="border-zinc-900" />
          <div className="flex justify-between items-end">
            <span className="text-[11px] font-black uppercase text-zinc-800 tracking-[0.3em] italic">Total</span>
            <Price className="text-4xl font-black italic text-white tracking-tighter" amount={cart.subtotal || 0} />
          </div>
        </aside>
      )}
    </div>
  )
}