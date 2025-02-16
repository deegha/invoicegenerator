import { Layout, H1 } from 'components'
import styled from 'styled-components'
import { NextPage } from 'next'
import { getInvoices } from 'services/invoiceService'
import { InnerContainer } from 'styles'
import useSWR from 'swr'

const InvoiceListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 1200px;

  background: #f4f4f9;
  border-radius: 10px;
  gap: 20px;
`

const InvoiceCard = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 1000px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`

const CardItem = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: 500;

  &:nth-child(1) {
    font-weight: 700;
  }
`

const InvoiceHistory: NextPage = () => {
  const { data: invoices, isLoading } = useSWR('fetch-invoices', getInvoices)

  return (
    <Layout>
      <InnerContainer>
        <H1>INVOICES LIST</H1>
        <InvoiceListContainer>
          {isLoading ? (
            <ShimmerLoader />
          ) : (
            invoices?.map((invoice) => (
              <InvoiceCard key={invoice.invoiceNumber}>
                <CardItem>{invoice.invoiceNumber}</CardItem>
                <CardItem> {invoice.subTotal.toString()} USD</CardItem>
                <CardItem>{invoice?.billingAddress}</CardItem>
                <CardItem>{invoice?.createdAt.toDateString()}</CardItem>
              </InvoiceCard>
            ))
          )}
        </InvoiceListContainer>
      </InnerContainer>
    </Layout>
  )
}

export default InvoiceHistory

function ShimmerLoader() {
  return (
    <div className=" w-full">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center p-4 bg-gray-100 animate-pulse rounded-lg"
        >
          <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
          <div className="w-1/6 h-6 bg-gray-300 rounded"></div>
          <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
          <div className="w-1/5 h-6 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  )
}
