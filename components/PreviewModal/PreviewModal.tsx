import styled, { keyframes } from 'styled-components'
import { Button, InvoiceItem } from 'components'
import { useInvoice } from 'context/invoiceContext'
import jsPDF from 'jspdf'
import { usePreview } from 'context/previewContext'
import { LineItems, LineItemsContent, Amount } from 'styles'
import { XCircle } from 'react-feather'
import { colorWhite } from 'styles/commonStyles'

const appearAnimation = keyframes`
  0% { opacity: 0;  }
 100% { opacity: 1; }
`

const appearModalAnimation = keyframes`
 0% { opacity: 0; transform: translateY(10px);  }
 100% { opacity: 1; transform: translateY(0); }
`

const ContainerOuter = styled.div<{ showModal: boolean }>`
  animation-name: ${appearAnimation};
  animation-duration: 0.2s;

  position: fixed; /* Sit on top of the page content */
  display: none; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;

  background: linear-gradient(
    126.72deg,
    rgba(0, 0, 0, 0.71) -8.9%,
    rgba(0, 0, 0, 0.71) 105.79%
  );
  backdrop-filter: blur(2px);
  display: ${({ showModal }) => (showModal ? `flex` : 'none')};
  align-items: center;
  justify-content: center;
`

const ModalWrapper = styled.div`
  max-width: 595px;
  background: transparent;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`

const Modal = styled.div`
  width: 595px;
  background: #ffffff;
  padding: 50px 20px;
  animation-name: ${appearModalAnimation};
  animation-duration: 0.3s;
`

const Container = styled.div`
  font-size: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const LineItemHeader = styled.div`
  display: grid;
  column-gap: 6px;
  grid-template-columns: 58% 13% 10% 15%;
  background-color: #34495e;
  background: #2f2f2f;
  border-radius: 2px;
  padding: 6px 10px;
  color: #ffffff;

  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height */

  color: #ffffff;
`

const PageContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  width: 595px;
`

const DetailsContainer = styled.div`
  background-color: #ffffff;
  display: grid;
  grid-row-gap: 40px;
  grid-column-gap: 10%;
  grid-template-columns: 30% 60%;
`
const BillingHeading = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  margin-bottom: 12px;
`

const FromToaddress = styled.div`
  text-align: left;
  max-width: 200px;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #000000;
`
const InvoiceNumber = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #424447;
`
const InvoiceNumberTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 30px;
`

const Details = styled.div`
  text-align: right;
  letter-spacing: 1px;
  line-height: 20px;

  display: grid;
  gap: 10px;
  grid-template-columns: 56% 40%;
`

const DetailsDescription = styled.div`
  text-align: right;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height */

  color: #9a9a9a;
`

const BalanceDue = styled.div`
  text-align: right;

  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height */

  color: #000000;
`

const Detail = styled.div`
  text-align: right;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height */

  color: #000000;
`

const Items = styled.div`
  margin: 40px 0;
`
const ButtonArea = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const ReviewButton = styled.div`
  width: 226px;
`

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
`
const InvoiceNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const TotalArea = styled.div`
  display: grid;
  grid-template-columns: 15% 8%;
  justify-content: end;
  width: 100%;
  margin-bottom: 20px;
`

const TotalTitle = styled.div`
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #9a9a9a;
`

const TotalValue = styled.div`
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  color: #000000;
`
const CloseButton = styled.div`
  ${colorWhite};
  cursor: pointer;
`

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
    },
  } = useInvoice()
  const { modalVisibility, hideModal } = usePreview()

  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4')
    const html = document.querySelector('#page') as HTMLElement
    doc.text('20', 30, 3)
    if (!html) return
    doc.html(html, {
      callback: function (pdf) {
        pdf.save(`invoice_#${invoiceNumber}.pdf`)
      },
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
                    <FromToaddress>{fromAddress}</FromToaddress>
                  </div>
                  <div>
                    <BillingHeading>Billing to</BillingHeading>
                    <FromToaddress>{toAddress}</FromToaddress>
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
