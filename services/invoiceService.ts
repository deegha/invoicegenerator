import { getAuth } from 'firebase/auth'
import { Invoice } from '@prisma/client'

export async function getInvoices() {
  const auth = await getAuth()
  const user = auth.currentUser

  if (!user) {
    throw new Error('User is not logged in')
  }

  console.log('here333')
  const token = await user.getIdToken()

  const response = await fetch('/api/invoice/get', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const data: Array<Invoice> = await response.json()
  if (!response.ok) {
    throw new Error('Failed to add invoice')
  }

  return data
}

export async function addInvoice(invoiceData: {
  invoiceNumber: string
  date: string
  paymentTerms?: string
  dueDate?: string
  poNumber?: string
  yourAddress?: string
  billingAddress?: string
  notes?: string
  terms?: string
  items: { description: string; quantity: number; rate: number }[]
}) {
  const auth = getAuth()
  const user = auth.currentUser

  if (!user) {
    throw new Error('User is not logged in')
  }

  const token = await user.getIdToken()

  const response = await fetch('/api/invoice/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(invoiceData),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Failed to add invoice')
  }

  return data
}
