import {
  TextInput,
  TextArea,
  InvoiceItem,
  Button,
  Preview,
  Layout,
  H1,
  FooterItem,
  Currency,
} from 'components'
import { useInvoice } from 'context/invoiceContext'
import { usePreview } from 'context/previewContext'
import {
  detaislInputs,
  addressDetails,
  footerDetails,
} from 'utils/invoiceFormData'
import { NextPage } from 'next'

import {
  InnerContainer,
  InvoiceDetails,
  DetailedSectionLeft,
  DetailedSectionRight,
  Lable,
  LineItems,
  LineItemHeader,
  LineItemsContent,
  ButtonContainer,
  Amount,
  FooterContainer,
  InputContainer,
  Duetotal,
  FormWrapper,
  LineItemHeaderItem,
  FooterRight,
  FooterLeft,
  Subtotal,
} from 'styles'

const Home: NextPage = () => {
  const {
    total,
    inputs,
    setInputs,
    lineItems,
    addLineItem,
    changeItem,
    removeItem,
  } = useInvoice()
  const handleTextChange = (value: string | number, name: string) => {
    setInputs({
      ...inputs,
      [name]: value,
    })
  }
  const { showModal } = usePreview()

  // const { currencies, setCurrency } = useCurrenncy()

  // const handleSelectCurrency = (item: Option) => {
  //   const c = currencies.filter((cr) => cr.currencyCode === item.value)[0]
  //   setCurrency(c)
  //   setInputs({
  //     ...inputs,
  //     currency: c,
  //   })
  // }

  const handleCreate = () => {
    showModal()
  }

  const dissabled =
    total === 0 ||
    inputs.fromAddress === '' ||
    inputs.dueDate === '' ||
    inputs.invoiceNumber === ''

  return (
    <Layout>
      <InnerContainer>
        <H1>GENERATE INVOICES</H1>
        <FormWrapper>
          <InvoiceDetails>
            <DetailedSectionLeft>
              {detaislInputs.map((field) => (
                <InputContainer key={field.name}>
                  <Lable>{field.lable}</Lable>
                  <TextInput
                    value={inputs[field.value] as string}
                    onChangeText={handleTextChange}
                    name={field.name}
                    type={field.type}
                    placeHolder={field.placeHolder}
                  />
                </InputContainer>
              ))}
            </DetailedSectionLeft>
            <DetailedSectionRight>
              {addressDetails.map((field) => (
                <InputContainer key={field.name}>
                  <Lable>{field.lable}</Lable>
                  <TextArea
                    value={inputs[field.value] as string}
                    onChangeText={handleTextChange}
                    name={field.name}
                    placeHolder={field.placeHolder}
                  />
                </InputContainer>
              ))}
            </DetailedSectionRight>
          </InvoiceDetails>
          <LineItems>
            <LineItemHeader>
              <LineItemHeaderItem>Item</LineItemHeaderItem>
              <LineItemHeaderItem>Quantity</LineItemHeaderItem>
              <LineItemHeaderItem>Rate</LineItemHeaderItem>
              <Amount>Amount</Amount>
            </LineItemHeader>
            <LineItemsContent>
              {lineItems.map((lineItem) => (
                <InvoiceItem
                  removeItem={removeItem}
                  id={lineItem.id}
                  key={lineItem.id}
                  description={lineItem.description}
                  quanity={lineItem.quanity}
                  rate={lineItem.rate}
                  amount={lineItem.rate * lineItem.quanity}
                  changeDes={changeItem}
                />
              ))}
            </LineItemsContent>
          </LineItems>
          <ButtonContainer>
            <Button
              value="Add line Item"
              action={addLineItem}
              type="secondary"
            />
          </ButtonContainer>
          <FooterContainer>
            <FooterLeft>
              {footerDetails.map((field) => (
                <InputContainer key={field.name}>
                  <Lable>{field.lable}</Lable>
                  <TextArea
                    value={inputs[field.value] as string}
                    onChangeText={handleTextChange}
                    name={field.name}
                    placeHolder={field.placeHolder}
                  />
                </InputContainer>
              ))}
            </FooterLeft>
            <FooterRight>
              <FooterItem
                lable={'Sub total'}
                value={
                  <Subtotal>
                    <Currency />
                    {total}
                  </Subtotal>
                }
              />
              <FooterItem
                lable={<Duetotal>Balance Due</Duetotal>}
                value={
                  <Duetotal>
                    <Currency />
                    {total}
                  </Duetotal>
                }
              />
              <Button
                value="Review"
                action={handleCreate}
                type="primary"
                disabled={dissabled}
              />
            </FooterRight>
          </FooterContainer>
        </FormWrapper>
        <Preview />
      </InnerContainer>
    </Layout>
  )
}

export default Home
