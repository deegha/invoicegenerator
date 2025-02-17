import React from 'react'
export const Switch = ({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: () => void
}) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition">
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all absolute top-0.5 left-1 ${
            checked ? 'translate-x-5' : ''
          }`}
        ></div>
      </div>
    </label>
  )
}
