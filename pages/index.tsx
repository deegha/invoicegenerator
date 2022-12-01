import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  TextInput,
  TextArea,
  InvoiceItem,
  Button,
  Select,
  Option,
} from 'components'
import { useCurrenncy } from 'hooks'
import { useInvoice } from 'context/invoiceContext'

import {
  Container,
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
  Subtotal,
  Title,
  LableContainer,
  LableInline,
  Duetotal,
} from 'styles'

const Home: NextPage = () => {
  const router = useRouter()
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

  const { currencies, setCurrency } = useCurrenncy()

  const handleSelectCurrency = (item: Option) => {
    const c = currencies.filter((cr) => cr.currencyCode === item.value)[0]
    setCurrency(c)
    setInputs({
      ...inputs,
      currency: c,
    })
  }

  const handleCreate = () => router.push('preview')

  return (
    <Container>
      <InnerContainer>
        <Title>INVOICE</Title>
        <InvoiceDetails>
          <DetailedSectionLeft>
            <Lable>From Address</Lable>
            <TextArea
              value={inputs.fromaddress}
              placeHolder="Who is this invoice from"
              name="fromaddress"
              onChangeText={handleTextChange}
            />
            <Lable>To Address</Lable>
            <TextArea
              value={inputs.toaddress}
              placeHolder="Who is this invoice to"
              name="toaddress"
              onChangeText={handleTextChange}
            />
            <Lable>Ships to Address</Lable>
            <TextArea
              value={inputs.shipToAddress}
              placeHolder="Ships to address"
              name="shipToAddress"
              onChangeText={handleTextChange}
            />
          </DetailedSectionLeft>

          <DetailedSectionRight>
            <LableContainer>
              <LableInline>Invoice Number</LableInline>
              <TextInput
                onChangeText={handleTextChange}
                value={inputs.invoiceNumber}
                name="invoiceNumber"
                type="text"
                placeHolder="#455609"
              />
            </LableContainer>
            <LableContainer>
              <LableInline>Invoice Date</LableInline>
              <TextInput
                onChangeText={handleTextChange}
                value={inputs.date}
                name="date"
                type="text"
                placeHolder="yyyy-mm-dd"
              />
            </LableContainer>
            <LableContainer>
              <LableInline>Payment Terms</LableInline>
              <TextInput
                onChangeText={handleTextChange}
                value={inputs.paymentTerms}
                name="paymentTerms"
                type="text"
                placeHolder="How many payment terms"
              />
            </LableContainer>
            <LableContainer>
              <LableInline>Due Date</LableInline>
              <TextInput
                onChangeText={handleTextChange}
                value={inputs.dueDate}
                name="dueDate"
                type="text"
                placeHolder="yyyy-mm-dd"
              />
            </LableContainer>
            <LableContainer>
              <LableInline>PO Number</LableInline>
              <TextInput
                onChangeText={handleTextChange}
                value={inputs.poNumber}
                name="poNumber"
                type="text"
                placeHolder="#4545098"
              />
            </LableContainer>
            <LableContainer>
              <LableInline>Currency</LableInline>
              <Select
                onSelect={(item) => handleSelectCurrency(item)}
                selected={
                  inputs.currency
                    ? {
                        value: inputs.currency.currencyCode,
                        label: inputs.currency.countryName,
                      }
                    : undefined
                }
                options={currencies.map((currency) => ({
                  value: currency.currencyCode,
                  label: currency.countryName,
                }))}
              />
            </LableContainer>
          </DetailedSectionRight>
        </InvoiceDetails>
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
          <ButtonContainer>
            <Button value="Add Item" action={addLineItem} type="primary" />
          </ButtonContainer>
        </LineItems>
        <InvoiceDetails>
          <DetailedSectionLeft>
            <Lable>Notes</Lable>
            <TextArea
              value={inputs.notes}
              placeHolder="Notes about the invoice"
              name="notes"
              onChangeText={handleTextChange}
            />
            <Lable>Terms and conditions</Lable>
            <TextArea
              value={inputs.termsAndConditions}
              placeHolder="Terms and condition on this invoice"
              name="termsAndConditions"
              onChangeText={handleTextChange}
            />
          </DetailedSectionLeft>
          <DetailedSectionRight>
            <Subtotal>Sub total ${total}</Subtotal>
            <LableContainer>
              <LableInline>Discount</LableInline>
              <TextInput
                onChangeText={handleTextChange}
                value={inputs.discount}
                name="discount"
                type="number"
                placeHolder="Invoice number"
              />
            </LableContainer>
            <LableContainer>
              <LableInline>Tax</LableInline>
              <TextInput
                onChangeText={handleTextChange}
                value={inputs.tax}
                name="tax"
                type="number"
                placeHolder="Invoice number"
              />
            </LableContainer>
            <LableContainer>
              <LableInline>Shpping</LableInline>
              <TextInput
                onChangeText={handleTextChange}
                value={inputs.shipping}
                name="shipping"
                type="number"
                placeHolder="Invoice number"
              />
            </LableContainer>
            <Duetotal>Total balance due ${total}</Duetotal>
          </DetailedSectionRight>
        </InvoiceDetails>

        <FooterContainer>
          <Button value="Create" action={handleCreate} type="primary" />
        </FooterContainer>
      </InnerContainer>
    </Container>
  )
}

export default Home
