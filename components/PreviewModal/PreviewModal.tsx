import { Button, InvoiceItem } from 'components'
import { useInvoice } from 'context/invoiceContext'
import jsPDF from 'jspdf'
import { usePreview } from 'context/previewContext'
import { LineItems, LineItemsContent, Amount } from 'styles'
import { XCircle } from 'react-feather'
import {
  ContainerOuter,
  ModalWrapper,
  Modal,
  Container,
  LineItemHeader,
  PageContainer,
  DetailsContainer,
  BillingHeading,
  FromToAddress,
  InvoiceNumber,
  InvoiceNumberTitle,
  Details,
  DetailsDescription,
  BalanceDue,
  Detail,
  Items,
  ButtonArea,
  ReviewButton,
  HeaderRow,
  InvoiceNumberContainer,
  TotalArea,
  TotalTitle,
  TotalValue,
  CloseButton,
} from './styles'

import { addInvoice } from '../../services/invoiceService'

export const Preview = () => {
  const {
    total,
    lineItems,
    inputs: {
      fromAddress,
      toAddress,
      date,
      poNumber,
      paymentTerms,
      invoiceNumber,
      dueDate,
      notes,
      termsAndConditions,
    },
  } = useInvoice()
  const { modalVisibility, hideModal } = usePreview()

  const generatePDF = async () => {
    if (fromAddress === '' || toAddress === '' || date === '' || total === 0) {
      return
    }

    const doc = new jsPDF('p', 'pt', 'a4')
    const html = document.querySelector('#page') as HTMLElement
    doc.text('20', 30, 3)
    if (!html) return
    doc.html(html, {
      callback: function (pdf) {
        pdf.save(`invoice_#${invoiceNumber}.pdf`)
      },
    })

    await addInvoice({
      invoiceNumber: invoiceNumber,
      date: date,
      paymentTerms: paymentTerms,
      dueDate: dueDate,
      poNumber: poNumber,
      yourAddress: fromAddress,
      billingAddress: toAddress,
      notes: notes,
      terms: termsAndConditions,
      items: lineItems.map(({ description, quanity, rate }) => ({
        description,
        quantity: quanity,
        rate,
        amount: quanity * rate,
      })),
    })
  }

  const totalFormatted = total
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

  return (
    <ContainerOuter showModal={modalVisibility}>
      <ModalWrapper>
        <CloseButton onClick={hideModal}>
          <XCircle />
        </CloseButton>
        <Modal>
          <Container>
            <PageContainer id="page">
              <DetailsContainer>
                <HeaderRow>
                  <div>
                    <BillingHeading>Billing from</BillingHeading>
                    <FromToAddress>{fromAddress}</FromToAddress>
                  </div>
                  <div>
                    <BillingHeading>Billing to</BillingHeading>
                    <FromToAddress>{toAddress}</FromToAddress>
                  </div>
                </HeaderRow>
                <HeaderRow>
                  <InvoiceNumberContainer>
                    <InvoiceNumberTitle>INVOICE</InvoiceNumberTitle>
                    <InvoiceNumber>#{invoiceNumber}</InvoiceNumber>
                  </InvoiceNumberContainer>
                  <div>
                    <Details>
                      <DetailsDescription>Date :</DetailsDescription>
                      <Detail>{date}</Detail>
                      <DetailsDescription>Payment Terms :</DetailsDescription>
                      <Detail>{paymentTerms}</Detail>
                      <DetailsDescription>PO Number :</DetailsDescription>
                      <Detail>{poNumber}</Detail>
                      <BalanceDue>Balance Due :</BalanceDue>
                      <BalanceDue>{totalFormatted}</BalanceDue>
                    </Details>
                  </div>
                </HeaderRow>
              </DetailsContainer>
              <Items>
                <LineItems>
                  <LineItemHeader>
                    <div>Item</div>
                    <div>Quanity</div>
                    <div>Rate</div>
                    <Amount>Amount</Amount>
                  </LineItemHeader>
                  <LineItemsContent>
                    {lineItems.map((lineItem) => (
                      <InvoiceItem
                        readonly
                        id={lineItem.id}
                        key={lineItem.id}
                        description={lineItem.description}
                        quanity={lineItem.quanity}
                        rate={lineItem.rate}
                        amount={lineItem.rate * lineItem.quanity}
                      />
                    ))}
                  </LineItemsContent>
                </LineItems>
              </Items>
              <TotalArea>
                <TotalTitle>Total :</TotalTitle>
                <TotalValue>{totalFormatted}</TotalValue>
              </TotalArea>
            </PageContainer>

            <ButtonArea>
              <ReviewButton>
                <Button
                  action={generatePDF}
                  value={'Download PDF'}
                  type={'primary'}
                />
              </ReviewButton>
            </ButtonArea>
          </Container>
        </Modal>
      </ModalWrapper>
    </ContainerOuter>
  )
}
