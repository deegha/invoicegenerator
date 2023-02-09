import React from 'react'

export type InputType = 'password' | 'text' | 'number'

export interface IInputProps {
  name: string
  value: string | number
  type: InputType
  placeHolder?: string
  icon?: React.ReactNode
  onChangeText: (value: string | number, name: string) => void
}
