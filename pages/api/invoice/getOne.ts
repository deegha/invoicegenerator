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

    const { id } = req.query
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: 'Invalid invoice ID' })
    }

    const invoice = await prisma.invoice.findUnique({
      where: {
        id: Number(id),
        userId: user.localId,
      },
      include: {
        items: true, // Include invoice items
      },
    })

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' })
    }

    return res.status(200).json({ data: invoice })
  } catch (e) {
    console.error(e)
    return res
      .status(500)
      .json({ message: 'Something went wrong with the request' })
  }
}
