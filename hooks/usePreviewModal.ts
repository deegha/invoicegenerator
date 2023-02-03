import { useState } from 'react'

export const usePreviewModal = () => {
  const [modalVisibility, setShowModal] = useState<boolean>(false)

  const hideModal = () => {
    setShowModal(false)
  }

  const showModal = () => {
    setShowModal(true)
  }

  return {
    showModal,
    hideModal,
    modalVisibility,
  }
}
