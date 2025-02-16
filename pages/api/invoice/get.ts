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

    // Verify Firebase token
    const user = await verifyFirebaseToken(token)
    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token' })
    }

    const invoices = await prisma.invoice.findMany()

    return res.status(201).json(invoices)
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Something went wrong with the request' })
  }
}
