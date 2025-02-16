import React from 'react'
import { motion } from 'framer-motion'
interface NotificationProps {
  message?: string
  type?: 'success' | 'error' | 'warn'
}

export const NotificationComponent: React.FC<NotificationProps> = ({
  message,
  type,
}) => {
  if (!message) return null

  const typeStyles = {
    success: 'bg-emerald-500',
    error: 'bg-rose-600',
    warn: 'bg-amber-500',
  }

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="z-50 fixed right-0 top-20 flex w-full justify-end"
    >
      <div
        className={`mr-4 min-w-[250px] p-4 text-white ${
          typeStyles[type || 'success']
        } flex items-center justify-center rounded-md shadow-lg`}
      >
        {message}
      </div>
    </motion.div>
  )
}
