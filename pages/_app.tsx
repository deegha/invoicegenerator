import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { InvoiceProvider } from 'context/invoiceContext'
import { PreviewProvider } from 'context/previewContext'
import { AuthProvider } from 'context/authContext'
import { CurrencyProvider } from 'context/currencyContext'
import { NotificationProvider } from 'context/notificationContext'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <AuthProvider>
        <CurrencyProvider>
          <InvoiceProvider>
            <PreviewProvider>
              <Component {...pageProps} />
            </PreviewProvider>
          </InvoiceProvider>
        </CurrencyProvider>
      </AuthProvider>
    </NotificationProvider>
  )
}

export default MyApp
