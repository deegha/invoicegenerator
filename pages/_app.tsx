import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { InvoiceProvider } from 'context/invoiceContext'
import { PreviewProvider } from 'context/previewContext'
import { AuthProvider } from 'context/authContext'
import { CurrencyProvider } from 'context/currencyContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <InvoiceProvider>
          <PreviewProvider>
            <Component {...pageProps} />
          </PreviewProvider>
        </InvoiceProvider>
      </CurrencyProvider>
    </AuthProvider>
  )
}

export default MyApp
