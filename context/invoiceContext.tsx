import React, { useContext } from 'react'
import { useHomePage } from 'hooks'

interface IProps {
  children: React.ReactNode
}

const InvoiceContext = React.createContext({} as ReturnType<typeof useHomePage>)

export const useInvoice = () => {
  return useContext(InvoiceContext)
}

export const InvoiceProvider: React.FunctionComponent<IProps> = ({
  children,
}) => {
  return (
    <InvoiceContext.Provider value={useHomePage()}>
      {children}
    </InvoiceContext.Provider>
  )
}

export default InvoiceContext
