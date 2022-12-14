import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Eye, EyeOff } from 'react-feather'
import { IInputProps, InputType } from './d'

const Container = styled.div`
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #ced6e0;
  border-radius: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    font-size: 14px;
    width: 100%;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    margin: 0;
  }

  input::placeholder {
    opacity: 0.4;
  }
  input:focus {
    outline: none;
  }
`

const ShowHidePassword = ({
  showPassword,
  handleOnCliCk,
}: {
  showPassword: boolean
  handleOnCliCk: (type: InputType) => void
}) => {
  return showPassword ? (
    <EyeOff
      onClick={() => handleOnCliCk('password')}
      style={{ color: '#b2bec3', cursor: 'pointer' }}
    />
  ) : (
    <Eye
      onClick={() => handleOnCliCk('text')}
      style={{ color: '#b2bec3', cursor: 'pointer' }}
    />
  )
}

const regex = new RegExp(/[^0-9]/, 'g')

export const TextInput: React.FC<IInputProps> = ({
  name,
  value,
  type,
  placeHolder,
  onChangeText,
}) => {
  const [inputType, setInputType] = useState<InputType>()
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(typeof e.target.value)
    if (type === 'number' && e.target.value.match(regex)) {
      return
    }
    onChangeText(e.target.value, name)
  }

  useEffect(() => {
    setInputType(type)
  }, [])

  const changeInputType = (type: InputType) => {
    setInputType(type)
  }

  return (
    <Container>
      <input
        multiple
        inputMode={inputType === 'number' ? 'numeric' : 'text'}
        name={name}
        value={value}
        type={inputType === 'number' ? 'text' : inputType}
        placeholder={placeHolder}
        onChange={handleOnChange}
      />
      {type === 'password' && (
        <ShowHidePassword
          showPassword={inputType !== 'password'}
          handleOnCliCk={changeInputType}
        />
      )}
    </Container>
  )
}
