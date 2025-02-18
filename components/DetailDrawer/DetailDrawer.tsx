// components/Drawer.tsx
import React, { useEffect, useState } from 'react'
import { getSingleInvoice } from 'services/invoiceService'
import useSWR from 'swr'

type InvoiceItem = {
  id: number
  description: string
  quantity: number
  rate: number
  amount: number
}

export type IInvoice = {
  id: number
  invoiceNumber: string
  date: string
  paymentTerms: string
  dueDate: string
  poNumber: string
  yourAddress: string
  billingAddress: string
  items: InvoiceItem[]
  notes: string
  terms: string
  subTotal: number
  balanceDue: number
}

type DrawerProps = {
  isOpen: boolean
  id: number
  onClose: () => void
}

export const DetailDrawer: React.FC<DrawerProps> = ({
  isOpen,
  id,
  onClose,
}) => {
  const [loading, setLoading] = useState(false)
  const { data } = useSWR(`get-single-invoice${id}`, async () => {
    setLoading(true)
    const response = await getSingleInvoice(id)
    setLoading(false)
    return response.data
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden' // Prevent scrolling when drawer is open
    } else {
      document.body.style.overflow = 'auto' // Restore scrolling when drawer is closed
    }

    return () => {
      document.body.style.overflow = 'auto' // Cleanup on unmount
    }
  }, [isOpen])

  return (
    <div
      className={`z-11 fixed inset-0 transition-all transform bg-opacity-30 backdrop-blur-sm ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div
        className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg transition-all transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {loading && <InvoiceShimmer />}
        {data && !loading && (
          <div className="p-6 overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Invoice Details</h2>
            <div className="space-y-4">
              <p>
                <strong>Invoice Number:</strong> {data.invoiceNumber}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(data.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Payment Terms:</strong> {data.paymentTerms}
              </p>
              <p>
                <strong>Due Date:</strong>{' '}
                {data.dueDate
                  ? new Date(data.dueDate).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p>
                <strong>PO Number:</strong> {data.poNumber}
              </p>
              <p>
                <strong>Your Address:</strong> {data.yourAddress}
              </p>
              <p>
                <strong>Billing Address:</strong> {data.billingAddress}
              </p>
              <p>
                <strong>Notes:</strong> {data.notes || 'N/A'}
              </p>
              <p>
                <strong>Terms:</strong> {data.terms || 'N/A'}
              </p>
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Invoice Items</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1 text-left">
                        Description
                      </th>
                      <th className="border px-2 py-1 text-left">Quantity</th>
                      <th className="border px-2 py-1 text-left">Rate</th>
                      <th className="border px-2 py-1 text-left">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((item) => (
                      <tr key={item.id}>
                        <td className="border px-2 py-1">{item.description}</td>
                        <td className="border px-2 py-1">{item.quantity}</td>
                        <td className="border px-2 py-1">{item.rate}</td>
                        <td className="border px-2 py-1">{item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <p>
                  <strong>Subtotal:</strong> {data.subTotal}
                </p>
                <p>
                  <strong>Balance Due:</strong> {data.balanceDue}
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute bottom-0 left-0 right-0 p-4 bg-rose-600 text-white text-sm rounded-b-sm cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default function InvoiceShimmer() {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg animate-pulse">
      <div className="space-y-4">
        {/* Invoice Number */}
        <div className="h-4 bg-gray-300 w-40 rounded"></div>
        <div className="h-4 bg-gray-200 w-32 rounded"></div>

        {/* Date, Payment Terms, Due Date */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 w-24 rounded"></div>
          <div className="h-4 bg-gray-200 w-20 rounded"></div>
        </div>

        {/* PO Number, Address */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 w-32 rounded"></div>
          <div className="h-4 bg-gray-200 w-40 rounded"></div>
        </div>

        {/* Billing Address */}
        <div className="h-4 bg-gray-300 w-48 rounded"></div>

        {/* Notes & Terms */}
        <div className="h-4 bg-gray-200 w-20 rounded"></div>

        {/* Table Header */}
        <div className="grid grid-cols-4 gap-2 bg-gray-300 h-6 w-full rounded"></div>

        {/* Table Rows */}
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-2 h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>

        {/* Subtotal & Balance Due */}
        <div className="h-4 bg-gray-300 w-28 rounded"></div>
        <div className="h-4 bg-gray-300 w-28 rounded"></div>
      </div>
    </div>
  )
}
