import { useEffect } from 'react'
import { useState } from 'react'
import { currencies } from 'utils/currency'

export interface ICurrency {
  currencyCode: string
}

export const useCurrenncy = () => {
  const [activeCur, setActiveCur] = useState<ICurrency>({
    currencyCode: 'USD',
  })

  useEffect(() => {
    setActiveCur(getCurrency())
  }, [])

  const setCurrency = (curr: ICurrency) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedCurrency', JSON.stringify(curr))
    }
  }

  const getCurrency = () => {
    if (typeof window !== 'undefined') {
      const cur = localStorage.getItem('selectedCurrency')

      if (!cur) {
        return currencies.find((cur) => cur.currencyCode === 'USD')
      }

      return JSON.parse(cur as string)
    }

    return false
  }

  return {
    activeCur,
    currencies,
    setCurrency,
    getCurrency,
  }
}
