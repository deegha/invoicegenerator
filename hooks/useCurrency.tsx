import { currencies } from 'utils/currency'

export interface ICurrency {
  countryCode: string
  countryName: string
  currencyCode: string
  continentName: string
}

export const useCurrenncy = () => {
  const setCurrency = (curr: ICurrency) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedCurrency', JSON.stringify(curr))
    }
  }

  const getSelectedCurrency = () => {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('selectedCurrency')
    ) {
      return JSON.parse(localStorage.getItem('selectedCurrency') as string)
    }

    return false
  }

  return {
    currencies,
    setCurrency,
    getSelectedCurrency,
  }
}
