import { Button } from 'components'
// import { useInvoice } from 'context/invoiceContext'
import styled from 'styled-components'
// import jsPDF from 'jspdf'

// import { LineItems, LineItemsContent, ButtonContainer, Amount } from 'styles'

const Container = styled.div`
  font-size: 12px;
  padding: 20px;
  background-color: #e8ecef;
  width: 100%;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
`
// const LineItemHeader = styled.div`
//   display: grid;
//   column-gap: 6px;
//   grid-template-columns: 56% 13% 10% 15%;
//   background-color: #34495e;
//   color: #ecf0f1;
//   padding: 10px;
// `

// const PageContainer = styled.div`
//   background-color: #ffffff;
//   padding: 40px;
//   width: 600px;
// `

// const DetailsContainer = styled.div`
//   background-color: #ffffff;

//   display: grid;
//   grid-row-gap: 40px;
//   grid-column-gap: 10%;
//   grid-template-columns: 50% 40%;
// `

// const Fromaddress = styled.div`
//   text-align: left;
//   letter-spacing: 1px;
//   line-height: 20px;
//   grid-area: a;
//   max-width: 200px;
// `
// const InvoiceNumber = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   font-size: 30px;
// `
// const BilllingAddress = styled.div`
//   grid-area: c;
//   letter-spacing: 1px;
//   line-height: 20px;
//   max-width: 200px;
// `
// const Details = styled.div`
//   text-align: right;
//   letter-spacing: 1px;
//   line-height: 20px;

//   display: grid;
//   gap: 10px;
//   grid-template-columns: 56% 38%;
// `

// const DetailsDescription = styled.div`
//   text-align: right;
//   color: #777;
// `

// const BalanceDue = styled.div`
//   text-align: right;
//   font-weight: 800;
// `

// const Detail = styled.div`
//   text-align: right;
// `

// const Items = styled.div`
//   margin: 40px 0;
// `
const ButtonArea = styled.div`
  margin: 40px 0;
  width: 30%;
`

const Preview: React.FC = () => {
  // const {
  //   total,
  //   lineItems,
  //   inputs: {
  //     fromaddress,
  //     shipToAddress,
  //     date,
  //     dueDate,
  //     poNumber,
  //     paymentTerms,
  //     termsAndConditions,
  //     invoiceNumber,
  //     currency,
  //   },
  // } = useInvoice()

  const generatePDF = () => {
    // const doc = new jsPDF('p', 'pt', 'a4')
    // const html = document.querySelector('#page') as HTMLElement
    // doc.text('20', 30, 3)
    // if (!html) return
    // doc.html(html, {
    //   callback: function (pdf) {
    //     pdf.save('mypdf.pdf')
    //   },
    // })
  }
  return (
    <Container>
      {/* <PageContainer id="page">
        <DetailsContainer>
          <div>
            <Fromaddress>
              Deegha Galkissa 693/3 Gramasanwardana mawatha Ambilla watta
              Boralasgamuwa Srilanka
            </Fromaddress>
          </div>
          <div>
            <InvoiceNumber>INVOICE #10</InvoiceNumber>
          </div>
          <div>
            <BilllingAddress>
              c/o Entain Operations Limited Suite 6 Atlantic Suites Europort
              Avenue Gibraltar GX11 1AA
            </BilllingAddress>
          </div>
          <div>
            <Details>
              <DetailsDescription>Date :</DetailsDescription>
              <Detail>{date}</Detail>
              <DetailsDescription>Payment Terms :</DetailsDescription>
              <Detail>{paymentTerms}</Detail>
              <DetailsDescription>PO Number :</DetailsDescription>
              <Detail>{poNumber}</Detail>
              <BalanceDue>Balance Due :</BalanceDue>
              <BalanceDue>
                {' '}
                {total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </BalanceDue>
            </Details>
          </div>
        </DetailsContainer>
        <Items>
          <LineItems>
            <LineItemHeader>
              <div>Item description</div>
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
      </PageContainer> */}
      <ButtonArea>
        <Button action={generatePDF} value={'generate PDF'} type={'primary'} />
      </ButtonArea>
    </Container>
  )
}

export default Preview
