import React, { useContext } from 'react'
import { useCurrenncy } from 'hooks'

interface IProps {
  children: React.ReactNode
}

const CurrencyContext = React.createContext(
  {} as ReturnType<typeof useCurrenncy>
)

export const useCur = () => {
  return useContext(CurrencyContext)
}

export const CurrencyProvider: React.FunctionComponent<IProps> = ({
  children,
}) => {
  return (
    <CurrencyContext.Provider value={useCurrenncy()}>
      {children}
    </CurrencyContext.Provider>
  )
}

export default CurrencyContext
