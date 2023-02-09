import { useEffect } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useCurrenncy, ICurrency } from 'hooks'

export interface IInputs {
  fromAddress: string
  toAddress: string
  invoiceNumber: string
  date: string
  dueDate: string
  paymentTerms: string
  poNumber: string
  notes: string
  termsAndConditions: string
  discount: string
  tax: string
  shipping: string
  currency: ICurrency
}

interface IInvoiceItem {
  description: string
  quanity: number
  rate: number
  amount: number
  id: string
}

export const useHomePage = () => {
  const { getCurrency } = useCurrenncy()
  const [inputs, setInputs] = useState<IInputs>({
    fromAddress: '',
    toAddress: '',
    invoiceNumber: '',
    date: '',
    dueDate: '',
    paymentTerms: '',
    poNumber: '',
    notes: '',
    termsAndConditions: '',
    discount: '',
    tax: '',
    shipping: '',
  } as IInputs)
  const [total, setTotal] = useState<number>(0)
  const [lineItems, setLineItems] = useState<Array<IInvoiceItem>>([
    {
      id: uuidv4(),
      description: '',
      quanity: 1,
      rate: 0,
      amount: 0,
    },
  ])

  useEffect(() => {
    const selectedCur = getCurrency()
    if (selectedCur) {
      setInputs({
        ...inputs,
        currency: selectedCur,
      })
    }

    if (window) {
      const presist = JSON.parse(
        localStorage.getItem('inputs') as string
      ) as IInputs
      setInputs({
        ...inputs,
        fromAddress: (presist && presist.fromAddress) || '',
        toAddress: (presist && presist.toAddress) || '',
        invoiceNumber: (presist && presist.invoiceNumber) || '',
        date: (presist && presist.date) || '',
        dueDate: (presist && presist.dueDate) || '',
        paymentTerms: (presist && presist.paymentTerms) || '',
        poNumber: (presist && presist.poNumber) || '',
        notes: (presist && presist.notes) || '',
        termsAndConditions: (presist && presist.termsAndConditions) || '',
        discount: (presist && presist.discount) || '',
        tax: (presist && presist.tax) || '',
        shipping: (presist && presist.shipping) || '',
      })

      setLineItems(JSON.parse(localStorage.getItem('lineItems') as string))
    }
  }, [])

  useEffect(() => {
    if (window) {
      localStorage.setItem('inputs', JSON.stringify(inputs))
    }
  }, [inputs])

  useEffect(() => {
    const total = lineItems.reduce((acc: number, currentval) => {
      acc = currentval.rate * currentval.quanity + acc

      return acc
    }, 0)

    setTotal(total)
    localStorage.setItem('lineItems', JSON.stringify(lineItems))
  }, [lineItems])

  const addLineItem = () => {
    const newItem: Array<IInvoiceItem> = [
      ...lineItems,
      {
        id: uuidv4(),
        description: '',
        quanity: 0,
        rate: 0,
        amount: 0,
      },
    ]
    setLineItems(newItem)
  }

  const changeItem = (value: string | number, id: string, name: string) => {
    const itemIndex = lineItems.findIndex((item) => item.id === id)
    const newItems = [...lineItems]

    newItems[itemIndex] = {
      ...lineItems[itemIndex],
      [name]: value,
    }

    setLineItems(() => newItems)
  }

  const removeItem = (id: string) => {
    setLineItems([...lineItems.filter((item) => item.id !== id)])
  }

  return {
    total,
    inputs,
    setInputs,
    lineItems,
    addLineItem,
    changeItem,
    removeItem,
  }
}
