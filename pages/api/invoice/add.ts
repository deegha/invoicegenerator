import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
import { verifyFirebaseToken } from '../../../utils/auth'

const prisma = new PrismaClient()

interface InvoiceItemInput {
  description: string
  quantity: number
  rate: number
}

interface AddInvoiceRequest {
  invoiceNumber: string
  date: string
  paymentTerms?: string
  dueDate?: string
  poNumber?: string
  yourAddress?: string
  billingAddress?: string
  notes?: string
  terms?: string
  items: InvoiceItemInput[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const token = req.headers.authorization?.split('Bearer ')[1]
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' })
    }

    // Verify Firebase token
    const user = await verifyFirebaseToken(token)
    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token' })
    }

    const {
      invoiceNumber,
      date,
      paymentTerms,
      dueDate,
      poNumber,
      yourAddress,
      billingAddress,
      notes,
      terms,
      items,
    }: AddInvoiceRequest = req.body

    if (!invoiceNumber || !date || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Calculate subTotal and balanceDue
    const subTotal = items.reduce((sum, item) => {
      const amount = new Prisma.Decimal(item.quantity).mul(
        new Prisma.Decimal(item.rate)
      )
      return sum.add(amount)
    }, new Prisma.Decimal(0))

    // Create invoice with items in a single transaction
    const newInvoice = await prisma.invoice.create({
      data: {
        userId: user.localId,
        invoiceNumber,
        date: new Date(date),
        paymentTerms,
        dueDate: dueDate ? new Date(dueDate) : null,
        poNumber,
        yourAddress,
        billingAddress,
        notes,
        terms,
        subTotal,
        balanceDue: subTotal,
        items: {
          create: items.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            rate: new Prisma.Decimal(item.rate),
            amount: new Prisma.Decimal(item.quantity).mul(
              new Prisma.Decimal(item.rate)
            ),
          })),
        },
      },
      include: { items: true },
    })

    return res.status(201).json(newInvoice)
  } catch (error) {
    console.error('Error adding invoice:', error)

    let message = 'Something went wrong while saving the invoice'

    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      message = 'An invoice is created for this invoice number already'
    }
    return res.status(500).json({ message })
  }
}
