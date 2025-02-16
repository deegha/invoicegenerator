import { Button, InvoiceItem } from 'components'
import { useInvoice } from 'context/invoiceContext'
import jsPDF from 'jspdf'
import { usePreview } from 'context/previewContext'
import { LineItems, LineItemsContent, Amount } from 'styles'
import { XCircle } from 'react-feather'
import { useNotification } from 'hooks'
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
import { useState } from 'react'

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
    clearForm,
  } = useInvoice()
  const { modalVisibility, hideModal } = usePreview()
  const { notify } = useNotification()
  const [loading, setLoading] = useState(false)

  const save = async () => {
    try {
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
      notify('Invoice Successfully created', 'success')
    } catch (error) {
      console.log(error)

      if (error instanceof Error && 'code' in error) {
        notify(error.message, 'error')
      } else {
        notify('Something went wrong', 'error')
      }
    } finally {
      clearForm()
      hideModal()
    }
  }

  const generatePDF = async () => {
    try {
      if (
        fromAddress === '' ||
        toAddress === '' ||
        date === '' ||
        total === 0
      ) {
        return
      }

      await save()

      const doc = new jsPDF('p', 'pt', 'a4')
      const html = document.querySelector('#page') as HTMLElement
      doc.text('20', 30, 3)
      if (!html) return
      doc.html(html, {
        callback: function (pdf) {
          pdf.save(`invoice_#${invoiceNumber}.pdf`)
        },
      })
      notify('Invoice Successfully created', 'success')
    } catch {
      notify('Something went wrong', 'error')
    } finally {
      clearForm()
      hideModal()
    }
  }

  const saveInvoice = async () => {
    setLoading(true)
    await save()
    setLoading(false)
  }

  const saveAndDownload = async () => {
    setLoading(true)
    await save()
    await generatePDF()
    setLoading(false)
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
                  onClick={saveAndDownload}
                  variant={'secondary'}
                  loading={loading}
                >
                  Save and Download PDF
                </Button>
                <Button
                  loading={loading}
                  onClick={saveInvoice}
                  variant={'primary'}
                >
                  Save
                </Button>
              </ReviewButton>
            </ButtonArea>
          </Container>
        </Modal>
      </ModalWrapper>
    </ContainerOuter>
  )
}
