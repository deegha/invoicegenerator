import { useInvoice } from 'context/invoiceContext'
import { usePreview } from 'context/previewContext'
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
  DatePicker,
} from 'components'
import {
  detaislInputs,
  addressDetails,
  footerDetails,
} from 'utils/invoiceFormData'
import { NextPage } from 'next'

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
  const { showModal } = usePreview()

  const handleTextChange = (value: string | number | Date, name: string) => {
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const handleCreate = () => {
    showModal()
  }

  const disabled =
    total === 0 ||
    inputs.fromAddress === '' ||
    inputs.dueDate === '' ||
    inputs.invoiceNumber === ''

  return (
    <Layout>
      <div className="flex flex-col gap-8 w-[954px] mx-auto  bg-gray-100 min-h-screen">
        <H1 className="text-4xl font-light">GENERATE INVOICES</H1>
        <div className="bg-white p-8 rounded shadow-md flex flex-col gap-8">
          <div className="flex gap-6">
            <div className="grid w-1/3 gap-4">
              {detaislInputs.map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-sm font-bold">{field.Label}</label>
                  <TextInput
                    value={inputs[field.value] as string}
                    onChangeText={handleTextChange}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeHolder}
                  />
                </div>
              ))}
              <DatePicker
                label="Invoicing date"
                onChange={(selectedDate) =>
                  handleTextChange(selectedDate.toDateString(), 'date')
                }
              />
              <DatePicker
                label="Due date"
                onChange={(selectedDate) =>
                  handleTextChange(selectedDate.toDateString(), 'dueDate')
                }
              />
            </div>
            <div className="grid w-2/5 gap-4">
              {addressDetails.map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-sm font-bold">{field.Label}</label>
                  <TextArea
                    value={inputs[field.value] as string}
                    onChangeText={handleTextChange}
                    name={field.name}
                    placeholder={field.placeHolder}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-[60%_10%_10%_10%_5%] gap-2 p-2 bg-sky-400 text-white rounded-sm">
              <span className="text-sm">Item</span>
              <span className="text-sm">Quantity</span>
              <span className="text-sm">Rate</span>
              <span className="text-sm text-right">Amount</span>
            </div>
            <div className="mt-2">
              {lineItems.map((lineItem) => (
                <InvoiceItem
                  key={lineItem.id}
                  id={lineItem.id}
                  removeItem={removeItem}
                  description={lineItem.description}
                  quanity={lineItem.quanity}
                  rate={lineItem.rate}
                  amount={lineItem.rate * lineItem.quanity}
                  changeDes={changeItem}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={addLineItem} variant="secondary">
              Add line item
            </Button>
          </div>
          <div className="grid grid-cols-[50%_40%] gap-20">
            <div className="flex flex-col gap-4">
              {footerDetails.map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-sm font-bold">{field.Label}</label>
                  <TextArea
                    value={inputs[field.value] as string}
                    onChangeText={handleTextChange}
                    name={field.name}
                    placeholder={field.placeHolder}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <FooterItem
                label={'Sub total'}
                value={
                  <div className="flex gap-1 text-lg">
                    <Currency />
                    {total}
                  </div>
                }
              />
              <FooterItem
                label={<span className="font-bold">Balance Due</span>}
                value={
                  <div className="flex gap-1 font-bold text-lg">
                    <Currency />
                    {total}
                  </div>
                }
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleCreate}
                  size="large"
                  variant="primary"
                  disabled={disabled}
                >
                  Review
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Preview />
      </div>
    </Layout>
  )
}

export default Home
