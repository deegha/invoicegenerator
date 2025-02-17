import React from 'react'

interface IInputProps {
  name: string
  value: string | number
  placeholder?: string
  onChangeText: (value: string | number, name: string) => void
}

export const TextArea: React.FC<IInputProps> = ({
  name,
  value,
  placeholder,
  onChangeText,
}) => {
  return (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChangeText(e.target.value, name)}
      className="w-full p-2 border border-gray-300 rounded-md min-h-[103px] text-sm resize-none focus:outline-none placeholder-opacity-40"
    />
  )
}
