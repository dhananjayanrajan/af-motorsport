'use client'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { useCurrency } from '@payloadcms/plugin-ecommerce/client/react'
import React, { useMemo } from 'react'

type BaseProps = {
  className?: string
  currencyCodeClassName?: string
  as?: 'span' | 'p'
  style?: React.CSSProperties
}

type PriceFixed = {
  amount: number
  currencyCode?: string
  highestAmount?: never
  lowestAmount?: never
}

type PriceRange = {
  amount?: never
  currencyCode?: string
  highestAmount: number
  lowestAmount: number
}

type Props = BaseProps & (PriceFixed | PriceRange)

export const Price = ({
  amount,
  className,
  highestAmount,
  lowestAmount,
  currencyCode: currencyCodeFromProps,
  as = 'p',
  style,
}: Props & React.ComponentProps<'p'>) => {
  const { formatCurrency, supportedCurrencies } = useCurrency()

  const Element = as

  const currencyToUse = useMemo(() => {
    if (currencyCodeFromProps) {
      return supportedCurrencies.find((currency) => currency.code === currencyCodeFromProps)
    }
    return undefined
  }, [currencyCodeFromProps, supportedCurrencies])

  const baseStyle = {
    color: DESIGN_SYSTEM.COLORS.BLACK.PURE,
    ...style,
  }

  if (typeof amount === 'number') {
    return (
      <Element
        className={`${className} transition-colors duration-200 hover:text-primary-500`}
        style={baseStyle}
        suppressHydrationWarning
      >
        {formatCurrency(amount, { currency: currencyToUse })}
      </Element>
    )
  }

  if (highestAmount && highestAmount !== lowestAmount) {
    return (
      <Element
        className={`${className} transition-colors duration-200 hover:text-primary-500`}
        style={baseStyle}
        suppressHydrationWarning
      >
        {`${formatCurrency(lowestAmount, { currency: currencyToUse })} - ${formatCurrency(highestAmount, { currency: currencyToUse })}`}
      </Element>
    )
  }

  if (lowestAmount) {
    return (
      <Element
        className={`${className} transition-colors duration-200 hover:text-primary-500`}
        style={baseStyle}
        suppressHydrationWarning
      >
        {`${formatCurrency(lowestAmount, { currency: currencyToUse })}`}
      </Element>
    )
  }

  return null
}