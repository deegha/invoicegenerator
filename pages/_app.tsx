import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { InvoiceProvider } from 'context/invoiceContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <InvoiceProvider>
      <Component {...pageProps} />
    </InvoiceProvider>
  )
}

export default MyApp
