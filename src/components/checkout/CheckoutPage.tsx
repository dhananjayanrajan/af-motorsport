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

  const [showBillingForm, setShowBillingForm] = useState(false)
  const [showShippingForm, setShowShippingForm] = useState(false)

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

  const InlineAddressForm = ({
    onSave,
    onCancel
  }: {
    onSave: (address: Partial<Address>) => void,
    onCancel: () => void
  }) => {
    const [localState, setLocalState] = useState<Partial<Address>>({})

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-zinc-900/10 border border-zinc-900 animate-in fade-in slide-in-from-top-4 duration-500">
        <FormItem className="md:col-span-2">
          <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3 block italic">Logistics_Line_01</Label>
          <Input
            className="rounded-none border-zinc-800 bg-black text-white h-14 font-mono focus:border-[#00FF41]"
            onChange={(e) => setLocalState((prev) => ({ ...prev, line1: e.target.value }))}
          />
        </FormItem>
        <FormItem>
          <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3 block italic">City_Sector</Label>
          <Input
            className="rounded-none border-zinc-800 bg-black text-white h-14 font-mono focus:border-[#00FF41]"
            onChange={(e) => setLocalState((prev) => ({ ...prev, city: e.target.value }))}
          />
        </FormItem>
        <FormItem>
          <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3 block italic">State_Region</Label>
          <Input
            className="rounded-none border-zinc-800 bg-black text-white h-14 font-mono focus:border-[#00FF41]"
            onChange={(e) => setLocalState((prev) => ({ ...prev, state: e.target.value }))}
          />
        </FormItem>
        <FormItem className="md:col-span-2">
          <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3 block italic">Postal_Code</Label>
          <Input
            className="rounded-none border-zinc-800 bg-black text-white h-14 font-mono focus:border-[#00FF41]"
            onChange={(e) => setLocalState((prev) => ({ ...prev, postalCode: e.target.value }))}
          />
        </FormItem>
        <div className="md:col-span-2 flex gap-4 pt-4">
          <Button onClick={() => onSave(localState)} className="rounded-none bg-[#00FF41] text-black text-[10px] font-black uppercase tracking-widest px-10 h-14 hover:bg-white transition-all">Save_Destination</Button>
          <Button variant="outline" onClick={onCancel} className="rounded-none border-zinc-800 text-white text-[10px] font-black uppercase tracking-widest px-10 h-14">Cancel</Button>
        </div>
      </div>
    )
  }

  if (!stripe) return null

  if (cartIsEmpty && isProcessingPayment) {
    return (
      <div className="py-24 w-full flex flex-col items-center justify-center bg-black min-h-screen">
        <div className="text-center mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00FF41] animate-pulse italic">Processing_Settlement_Protocol</p>
        </div>
        <LoadingSpinner />
      </div>
    )
  }

  if (cartIsEmpty) {
    return (
      <div className="py-24 w-full flex flex-col items-center justify-center bg-black min-h-screen border border-zinc-900">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-800 mb-8 italic">Manifest_Empty</p>
        <Link href="/search" className="text-[#00FF41] text-[9px] font-black uppercase tracking-widest underline decoration-[#00FF41]/30 underline-offset-8">Continue_Shopping</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-zinc-950 border-t border-zinc-900">
      <div className="flex-1 flex flex-col gap-16 bg-black p-8 lg:p-24 border-r border-zinc-900">
        <section className="space-y-10">
          <div className="flex items-center gap-4 border-l-2 border-[#00FF41] pl-6">
            <h2 className="text-xs font-black uppercase tracking-[0.6em] italic text-white">01_Contact</h2>
          </div>
          {!user ? (
            <div className="space-y-10">
              <div className="bg-zinc-900/20 border border-zinc-900 p-10 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Button asChild className="rounded-none border-zinc-800 bg-black text-[9px] font-black uppercase tracking-widest h-12 px-10 hover:bg-[#00FF41] hover:text-black transition-colors" variant="outline">
                    <Link href="/login">Log in</Link>
                  </Button>
                  <span className="text-[9px] font-black uppercase text-zinc-800 tracking-widest italic">or</span>
                  <Link href="/create-account" className="text-[9px] font-black uppercase tracking-widest text-[#00FF41] hover:underline">create account</Link>
                </div>
              </div>
              <div className="space-y-8 max-w-xl">
                <FormItem>
                  <Label htmlFor="email" className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-4 block italic">Operator_Email</Label>
                  <Input
                    disabled={!emailEditable}
                    id="email"
                    name="email"
                    className="bg-black border-zinc-900 rounded-none text-white font-mono h-16 px-6 focus:border-[#00FF41] transition-colors"
                    placeholder="OPERATOR@AF_MOTORSPORT.NET"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                  />
                </FormItem>
                {emailEditable && (
                  <Button
                    disabled={!email}
                    onClick={() => setEmailEditable(false)}
                    className="rounded-none bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] h-16 px-14 hover:bg-[#00FF41] transition-all"
                  >
                    Set Identity
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900/10 border border-zinc-900 p-10 flex justify-between items-center group">
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase text-zinc-700 tracking-widest">Active_User</p>
                <p className="text-[11px] font-black text-[#00FF41] uppercase italic tracking-tight">{user.email}</p>
              </div>
              <Link className="text-[9px] font-black uppercase text-white underline decoration-zinc-800 hover:decoration-[#00FF41] transition-all" href="/logout">Logout</Link>
            </div>
          )}
        </section>

        <section className="space-y-12">
          <div className="flex items-center gap-4 border-l-2 border-[#00FF41] pl-6">
            <h2 className="text-xs font-black uppercase tracking-[0.6em] italic text-white">02_Logistics</h2>
          </div>
          <div className="space-y-6">
            <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700 italic">Billing_Target</h3>
            {billingAddress ? (
              <div className="p-12 border-2 border-[#00FF41]/30 bg-zinc-900/5 relative group">
                <div className="absolute top-6 right-6 text-[8px] font-black text-zinc-800 uppercase tracking-widest italic">Confirmed_Data</div>
                <AddressItem
                  address={billingAddress}
                  actions={
                    <Button
                      variant="outline"
                      className="rounded-none border-zinc-800 text-[8px] font-black uppercase italic bg-black hover:bg-red-950 hover:text-white hover:border-red-900 h-10 px-8 transition-all mt-8"
                      disabled={Boolean(paymentData)}
                      onClick={() => {
                        setBillingAddress(undefined)
                        setShowBillingForm(true)
                      }}
                    >
                      Reset_Address
                    </Button>
                  }
                />
              </div>
            ) : showBillingForm ? (
              <InlineAddressForm
                onSave={(addr) => {
                  setBillingAddress(addr)
                  setShowBillingForm(false)
                }}
                onCancel={() => setShowBillingForm(false)}
              />
            ) : (
              <div className="flex flex-col gap-4">
                {user && addresses && addresses.length > 0 && (
                  <CheckoutAddresses heading="" setAddress={setBillingAddress} />
                )}
                <button
                  onClick={() => setShowBillingForm(true)}
                  disabled={!user && emailEditable}
                  className="w-full h-32 border border-dashed border-zinc-800 bg-zinc-950 flex flex-col items-center justify-center gap-3 group hover:border-[#00FF41] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 group-hover:text-[#00FF41] transition-colors">+ Add_New_Billing_Destination</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-6 items-center p-8 bg-zinc-900/10 border border-zinc-900">
            <Checkbox
              id="shippingTheSameAsBilling"
              checked={billingAddressSameAsShipping}
              disabled={Boolean(paymentData || (!user && emailEditable))}
              onCheckedChange={(state) => setBillingAddressSameAsShipping(state as boolean)}
              className="border-zinc-700 data-[state=checked]:bg-[#00FF41] data-[state=checked]:border-[#00FF41] rounded-none w-5 h-5"
            />
            <Label htmlFor="shippingTheSameAsBilling" className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 cursor-pointer italic hover:text-[#00FF41] transition-colors">Mirror_Shipping_To_Billing</Label>
          </div>

          {!billingAddressSameAsShipping && (
            <div className="space-y-6 pt-10 border-t border-zinc-900">
              <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700 italic">Shipping_Target</h3>
              {shippingAddress ? (
                <div className="p-12 border-2 border-[#00FF41]/30 bg-zinc-900/5">
                  <AddressItem
                    address={shippingAddress}
                    actions={
                      <Button
                        variant="outline"
                        className="rounded-none border-zinc-800 text-[8px] font-black uppercase italic bg-black hover:bg-red-950 h-10 px-8 transition-all mt-8"
                        disabled={Boolean(paymentData)}
                        onClick={() => {
                          setShippingAddress(undefined)
                          setShowShippingForm(true)
                        }}
                      >
                        Reset_Address
                      </Button>
                    }
                  />
                </div>
              ) : showShippingForm ? (
                <InlineAddressForm
                  onSave={(addr) => {
                    setShippingAddress(addr)
                    setShowShippingForm(false)
                  }}
                  onCancel={() => setShowShippingForm(false)}
                />
              ) : (
                <div className="flex flex-col gap-4">
                  {user && addresses && addresses.length > 0 && (
                    <CheckoutAddresses heading="" setAddress={setShippingAddress} />
                  )}
                  <button
                    onClick={() => setShowShippingForm(true)}
                    className="w-full h-32 border border-dashed border-zinc-800 bg-zinc-950 flex flex-col items-center justify-center gap-3 group hover:border-[#00FF41] transition-all"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 group-hover:text-[#00FF41] transition-colors">+ Add_New_Shipping_Destination</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {!paymentData && (
          <Button
            className="rounded-none bg-[#00FF41] text-black text-[11px] font-black uppercase tracking-[0.6em] italic h-20 px-24 hover:bg-white transition-all self-start shadow-[0_20px_50px_rgba(0,255,65,0.1)]"
            disabled={!canGoToPayment}
            onClick={(e) => {
              e.preventDefault()
              void initiatePaymentIntent('stripe')
            }}
          >
            Go_To_Settlement
          </Button>
        )}

        <Suspense fallback={<LoadingSpinner />}>
          {/* @ts-ignore */}
          {paymentData && paymentData?.['clientSecret'] && (
            <div className="pb-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center gap-4 border-l-2 border-[#00FF41] pl-6">
                <h2 className="text-xs font-black uppercase tracking-[0.6em] italic text-white">03_Settlement</h2>
              </div>
              {error && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest bg-red-950/20 p-6 border border-red-900">Error_Payload: {error}</p>}
              <div className="p-12 bg-zinc-950 border border-zinc-900">
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
                  <div className="flex flex-col gap-12">
                    <CheckoutForm
                      customerEmail={email}
                      billingAddress={billingAddress}
                      setProcessingPayment={setProcessingPayment}
                    />
                    <Button
                      variant="ghost"
                      className="self-start text-[9px] font-black uppercase tracking-widest text-zinc-700 hover:text-red-600 hover:bg-transparent transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        setPaymentData(null)
                      }}
                    >
                      Abort_Transaction
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
              className="rounded-none border-red-800 bg-black text-red-500 text-[9px] font-black uppercase italic hover:bg-red-900 hover:text-white transition-all h-12 px-10"
              variant="outline"
            >
              Retry_Process
            </Button>
          </div>
        )}
      </div>

      <aside className="w-full lg:w-[480px] bg-zinc-950 p-8 lg:p-24 space-y-20 h-fit sticky top-0 border-l border-zinc-900">
        <h2 className="text-[11px] font-black uppercase tracking-[0.6em] italic text-white border-b border-zinc-900 pb-12">Manifest_Summary</h2>
        <div className="space-y-12">
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
                <div className="flex gap-8 group" key={index}>
                  <div className="h-24 w-24 bg-black border border-zinc-900 p-1 flex-shrink-0 relative overflow-hidden" style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)' }}>
                    <div className="relative w-full h-full grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all duration-700">
                      {image && typeof image !== 'string' && (
                        <Media fill imgClassName="object-cover" resource={image} />
                      )}
                    </div>
                  </div>
                  <div className="flex grow flex-col justify-center min-w-0">
                    <p className="font-black text-[11px] uppercase text-white truncate italic tracking-tighter group-hover:text-[#00FF41] transition-colors">{title}</p>
                    <div className="flex items-center gap-6 mt-3">
                      <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">Qty_{quantity}</span>
                      {typeof price === 'number' && <Price className="text-[11px] font-black text-zinc-500 italic" amount={price} />}
                    </div>
                  </div>
                </div>
              )
            }
            return null
          })}
        </div>

        <div className="pt-16 border-t border-zinc-900 space-y-8">
          <div className="flex justify-between items-end">
            <span className="text-[11px] font-black uppercase text-zinc-800 tracking-[0.4em] italic">Settlement_Total</span>
            <Price className="text-5xl font-black italic text-[#00FF41] tracking-tighter" amount={cart.subtotal || 0} />
          </div>
          <div className="bg-zinc-900/30 p-6 flex justify-between items-center border border-zinc-900/50">
            <span className="text-[8px] font-black uppercase text-zinc-700 tracking-[0.3em]">Protocol_Status</span>
            <span className="text-[8px] font-black uppercase text-[#00FF41] tracking-[0.5em] animate-pulse">Awaiting_Input</span>
          </div>
        </div>
      </aside>
    </div>
  )
}