import React from 'react'

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
    success: 'bg-green-500',
    error: 'bg-red-600',
    warn: 'bg-yellow-500',
  }

  return (
    <div
      className={`fixed left-0 top-0 flex w-full justify-center transition-transform duration-500 ease-in-out ${
        message ? 'translate-y-[50px]' : 'translate-y-[-100%]'
      }`}
    >
      <div
        className={`w-[250px] p-4 text-white ${
          typeStyles[type || 'success']
        } flex items-center justify-center rounded-md shadow-lg`}
      >
        {message}
      </div>
    </div>
  )
}
