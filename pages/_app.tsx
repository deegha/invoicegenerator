import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { InvoiceProvider } from 'context/invoiceContext'
import { PreviewProvider } from 'context/previewContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <InvoiceProvider>
      <PreviewProvider>
        <Component {...pageProps} />
      </PreviewProvider>
    </InvoiceProvider>
  )
}

export default MyApp
