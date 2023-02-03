import React, { useContext } from 'react'
import { usePreviewModal } from 'hooks'

interface IProps {
  children: React.ReactNode
}

const PreviewContext = React.createContext(
  {} as ReturnType<typeof usePreviewModal>
)

export const usePreview = () => {
  return useContext(PreviewContext)
}

export const PreviewProvider: React.FunctionComponent<IProps> = ({
  children,
}) => {
  return (
    <PreviewContext.Provider value={usePreviewModal()}>
      {children}
    </PreviewContext.Provider>
  )
}

export default PreviewContext
