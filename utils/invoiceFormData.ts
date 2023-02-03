import { IInputs } from 'hooks/useHomePage'
import { InputType } from 'components/TextInput/d'

interface Ifeild {
  lable: string
  value: keyof IInputs
  name: string
  type: InputType
  placeHolder: string
}

export const detaislInputs: Array<Ifeild> = [
  {
    lable: 'Invoice number',
    value: 'invoiceNumber',
    name: 'invoiceNumber',
    type: 'text',
    placeHolder: 'Invoice number',
  },
  {
    lable: 'Date',
    value: 'date',
    name: 'date',
    type: 'text',
    placeHolder: 'Invoicing date',
  },
  {
    lable: 'Payment terms',
    value: 'paymentTerms',
    name: 'paymentTerms',
    type: 'text',
    placeHolder: 'Payment terms',
  },
  {
    lable: 'Due date',
    value: 'dueDate',
    name: 'dueDate',
    type: 'text',
    placeHolder: 'Invoice due date',
  },
  {
    lable: 'PO number',
    value: 'poNumber',
    name: 'poNumber',
    type: 'text',
    placeHolder: 'PO number',
  },
]

export const addressDetails: Array<Ifeild> = [
  {
    lable: 'Your address',
    value: 'fromAddress',
    name: 'fromAddress',
    type: 'text',
    placeHolder: 'Enter your address',
  },
  {
    lable: 'Billing address',
    value: 'toAddress',
    name: 'toAddress',
    type: 'text',
    placeHolder: 'To whom you are sending this invoice',
  },
]

export const footerDetails: Array<Ifeild> = [
  {
    lable: 'Notes',
    value: 'notes',
    name: 'notes',
    type: 'text',
    placeHolder: 'Add notes if any',
  },
  {
    lable: 'Terms',
    value: 'termsAndConditions',
    name: 'termsAndConditions',
    type: 'text',
    placeHolder: 'Terms and conditions - late fee etc',
  },
]
