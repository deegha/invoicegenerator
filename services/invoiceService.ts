import { getAuth } from 'firebase/auth'
import { Invoice } from '@prisma/client'

interface IInvoicesResponse {
  data: Array<Invoice>
  limit: number
  page: number
  total: number
  totalPages: number
}

interface InvoiceItem {
  id: number
  invoiceId: number
  description: string
  quantity: number
  rate: number
  amount: number
}

export interface InvoiceResponse {
  id: number
  userId: string
  invoiceNumber: string
  date: string
  paymentTerms?: string
  dueDate?: string
  poNumber?: string
  yourAddress?: string
  billingAddress?: string
  items: InvoiceItem[]
  notes?: string
  terms?: string
  subTotal: number
  balanceDue: number
  createdAt: string
  updatedAt: string
}

export interface IInvoiceResponse {
  data: InvoiceResponse
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
  params.set('limit', '6')

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

export async function getSingleInvoice(id?: number) {
  if (!id) return {} as IInvoiceResponse
  const auth = await getAuth()
  const user = auth.currentUser

  if (!user) {
    throw new Error('User is not logged in')
  }

  const token = await user.getIdToken()

  const params = new URLSearchParams()
  params.set('id', id.toString())

  const response = await fetch(`/api/invoice/getOne?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const data: IInvoiceResponse = await response.json()
  if (!response.ok) {
    throw new Error('Failed to fetch invoice')
  }

  return data
}
