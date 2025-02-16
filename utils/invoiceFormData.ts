import { IInputs } from 'hooks/useHomePage'
import { InputType } from 'components/TextInput/d'

interface Ifeild {
  Label: string
  value: keyof IInputs
  name: string
  type: InputType
  placeHolder: string
}

export const detaislInputs: Array<Ifeild> = [
  {
    Label: 'Invoice number',
    value: 'invoiceNumber',
    name: 'invoiceNumber',
    type: 'text',
    placeHolder: 'Invoice number',
  },
  {
    Label: 'Payment terms',
    value: 'paymentTerms',
    name: 'paymentTerms',
    type: 'text',
    placeHolder: 'Payment terms',
  },
  {
    Label: 'PO number',
    value: 'poNumber',
    name: 'poNumber',
    type: 'text',
    placeHolder: 'PO number',
  },
]

export const addressDetails: Array<Ifeild> = [
  {
    Label: 'Your address',
    value: 'fromAddress',
    name: 'fromAddress',
    type: 'text',
    placeHolder: 'Enter your address',
  },
  {
    Label: 'Billing address',
    value: 'toAddress',
    name: 'toAddress',
    type: 'text',
    placeHolder: 'To whom you are sending this invoice',
  },
]

export const footerDetails: Array<Ifeild> = [
  {
    Label: 'Notes',
    value: 'notes',
    name: 'notes',
    type: 'text',
    placeHolder: 'Add notes if any',
  },
  {
    Label: 'Terms',
    value: 'termsAndConditions',
    name: 'termsAndConditions',
    type: 'text',
    placeHolder: 'Terms and conditions - late fee etc',
  },
]
