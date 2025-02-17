import { getAuth } from 'firebase/auth'
import { Invoice } from '@prisma/client'

interface IInvoicesResponse {
  data: Array<Invoice>
  limit: number
  page: number
  total: number
  totalPages: number
}

export async function getInvoices(page: string) {
  const auth = await getAuth()
  const user = auth.currentUser

  if (!user) {
    throw new Error('User is not logged in')
  }

  const token = await user.getIdToken()

  const params = new URLSearchParams()
  params.set('page', page)
  params.set('limit', '10')

  const response = await fetch(`/api/invoice/get?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const data: IInvoicesResponse = await response.json()
  if (!response.ok) {
    throw new Error('Failed to fetch invoice')
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
