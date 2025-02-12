import { Layout, H1 } from 'components'
import styled from 'styled-components'
import { NextPage } from 'next'

import { InnerContainer } from 'styles'

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

const invoices = [
  {
    number: 'INV-12345',
    amount: '$1,500',
    billingCompany: 'TechCorp',
    date: '2025-02-10',
  },
  {
    number: 'INV-12346',
    amount: '$750',
    billingCompany: 'BizSolutions',
    date: '2025-02-05',
  },
  {
    number: 'INV-12347',
    amount: '$2,200',
    billingCompany: 'SoftWare Ltd.',
    date: '2025-01-30',
  },
  {
    number: 'INV-12348',
    amount: '$900',
    billingCompany: 'DevWorks',
    date: '2025-01-25',
  },
]

const Home: NextPage = () => {
  return (
    <Layout>
      <InnerContainer>
        <H1>INVOICES LIST</H1>
        <InvoiceListContainer>
          {invoices.map((invoice) => (
            <InvoiceCard key={invoice.number}>
              <CardItem>{invoice.number}</CardItem>
              <CardItem>{invoice.amount}</CardItem>
              <CardItem>{invoice.billingCompany}</CardItem>
              <CardItem>{invoice.date}</CardItem>
            </InvoiceCard>
          ))}
        </InvoiceListContainer>
      </InnerContainer>
    </Layout>
  )
}

export default Home
