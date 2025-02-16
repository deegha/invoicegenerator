import { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'

import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const CalendarInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }
`

interface DatePickerProps {
  label: string
  value?: Date | null
  onChange: (date: Date) => void
}

// DatePicker Component
export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [date, setDate] = useState<Date | null>(value || null)
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <Wrapper ref={ref}>
      <CalendarInput
        type="date"
        value={date ? format(date, 'yyyy-MM-dd') : ''}
        onChange={(e) => {
          const selectedDate = new Date(e.target.value)
          setDate(selectedDate)
          onChange(selectedDate)
          setIsOpen(false)
        }}
      />
    </Wrapper>
  )
}
