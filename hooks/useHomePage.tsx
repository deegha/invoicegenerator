import { useEffect } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useCurrenncy, ICurrency } from 'hooks'

interface IInputs {
  fromaddress: string
  toaddress: string
  shipToAddress: string
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
  const { getSelectedCurrency } = useCurrenncy()
  const [inputs, setInputs] = useState<IInputs>({} as IInputs)
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    const selectedCur = getSelectedCurrency()
    if (selectedCur) {
      setInputs({
        ...inputs,
        currency: selectedCur,
      })
    }
  }, [])

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
    const total = lineItems.reduce((acc: number, currentval) => {
      acc = currentval.rate * currentval.quanity + acc

      return acc
    }, 0)

    setTotal(total)
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
