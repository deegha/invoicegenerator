import { createContext, useContext, useState, ReactNode } from 'react'
import { NotificationComponent } from 'components'

type NotificationType = 'success' | 'error' | 'warn'

interface Notification {
  message: string
  type: NotificationType
}

export interface NotificationContextType {
  notify: (message: string, type: NotificationType) => void
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null)

  const notify = (message: string, type: NotificationType) => {
    setNotification({ message, type })

    setTimeout(() => {
      setNotification(null)
    }, 2500)
  }

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <NotificationComponent
        message={notification?.message}
        type={notification?.type}
      />
    </NotificationContext.Provider>
  )
}

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    )
  }
  return context
}
