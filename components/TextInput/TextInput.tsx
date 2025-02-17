import React, { ChangeEvent, useEffect, useState } from 'react'
import { Eye, EyeOff } from 'react-feather'
import { IInputProps, InputType } from './d'

const ShowHidePassword = ({
  showPassword,
  handleOnClick,
}: {
  showPassword: boolean
  handleOnClick: (type: InputType) => void
}) => {
  return showPassword ? (
    <EyeOff
      onClick={() => handleOnClick('password')}
      className="text-gray-400 cursor-pointer"
    />
  ) : (
    <Eye
      onClick={() => handleOnClick('text')}
      className="text-gray-400 cursor-pointer"
    />
  )
}

const regex = new RegExp(/[^0-9]/, 'g')

export const TextInput: React.FC<IInputProps> = ({
  name,
  value,
  type,
  placeholder,
  onChangeText,
  icon,
}) => {
  const [inputType, setInputType] = useState<InputType>()

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'number' && e.target.value.match(regex)) {
      return
    }
    onChangeText(
      type === 'number' ? parseInt(e.target.value) : e.target.value,
      name
    )
  }

  useEffect(() => {
    setInputType(type)
  }, [type])

  const changeInputType = (type: InputType) => {
    setInputType(type)
  }

  const IconElement = icon

  return (
    <div className="w-full p-2 border border-gray-300 rounded-sm flex items-center gap-2 h-[35px]">
      {IconElement && <span className="text-gray-500 ">{icon}</span>}
      <input
        inputMode={inputType === 'number' ? 'numeric' : 'text'}
        name={name}
        value={value}
        type={inputType === 'number' ? 'text' : inputType}
        placeholder={placeholder}
        onChange={handleOnChange}
        className="w-full border-none outline-none text-sm font-light  text-black placeholder-opacity-40"
      />
      {type === 'password' && (
        <ShowHidePassword
          showPassword={inputType !== 'password'}
          handleOnClick={changeInputType}
        />
      )}
    </div>
  )
}
