import React from 'react'
import styled from 'styled-components'

interface IInputProps {
  name: string
  value: string | number
  placeHolder?: string
  onChangeText: (value: string | number, name: string) => void
}

const Container = styled.textarea`
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #ced6e0;
  border-radius: 0.3rem;
  height: 80px;
  font-size: 14px;
  resize: none;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  &:focus {
    outline: none;
  }

  &::placeholder {
    opacity: 0.4;
  }
`

export const TextArea: React.FC<IInputProps> = ({
  name,
  value,
  placeHolder,
  onChangeText,
}) => {
  return (
    <Container
      name={name}
      value={value}
      placeholder={placeHolder}
      onChange={(e) => onChangeText(e.target.value, name)}
    ></Container>
  )
}
