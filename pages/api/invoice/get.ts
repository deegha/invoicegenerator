import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { verifyFirebaseToken } from '../../../utils/auth'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const token = req.headers.authorization?.split('Bearer ')[1]
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' })
    }

    // Verify Firebase token and get user data
    const user = await verifyFirebaseToken(token)
    if (!user || !user.localId) {
      return res.status(401).json({ message: 'Invalid or expired token' })
    }

    // Extract query parameters
    const { page = '1', limit = '10', search = '' } = req.query

    const pageNumber = parseInt(page as string, 10) || 1
    const pageSize = parseInt(limit as string, 10) || 10
    const skip = (pageNumber - 1) * pageSize

    // Build search filter
    const searchFilter = search
      ? {
          OR: [
            {
              invoiceNumber: {
                contains: search as string,
                mode: 'insensitive',
              },
            },
            {
              billingAddress: {
                contains: search as string,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {}

    // Fetch only the authenticated user's invoices with pagination and search
    const invoices = await prisma.invoice.findMany({
      where: {
        userId: user.localId, // Filter invoices by authenticated user
        ...searchFilter,
      },
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    })

    // Get total count for pagination
    const totalInvoices = await prisma.invoice.count({
      where: {
        userId: user.localId, // Ensure count only considers the user's invoices
        ...searchFilter,
      },
    })

    return res.status(200).json({
      total: totalInvoices,
      page: pageNumber,
      limit: pageSize,
      totalPages: Math.ceil(totalInvoices / pageSize),
      data: invoices,
    })
  } catch (e) {
    console.error(e)
    return res
      .status(500)
      .json({ message: 'Something went wrong with the request' })
  }
}
