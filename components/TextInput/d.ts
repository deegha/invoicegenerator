export type InputType = 'password' | 'text' | 'number'

export interface IInputProps {
  name: string
  value: string | number
  type: InputType
  placeHolder?: string
  onChangeText: (value: string | number, name: string) => void
}
