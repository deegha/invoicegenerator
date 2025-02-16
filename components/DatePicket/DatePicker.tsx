import { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'react-feather'
import styled from 'styled-components'
import { Label } from '../../styles/invoiceGeneration'

// Styled Components
const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  font-size: 0.875rem;
  text-align: left;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #f9fafb;
  }
`

const Icon = styled(CalendarIcon)`
  width: 20px;
  height: 20px;
  color: #6b7280;
  margin-right: 8px;
`

const Popover = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 8px;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
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

// Type Definitions
interface DatePickerProps {
  label: string
  value?: Date | null
  onChange: (date: Date) => void
}

// DatePicker Component
export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
}) => {
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
      <Label>{label}</Label>
      <Button onClick={() => setIsOpen(!isOpen)}>
        <Icon />
        {date ? format(date, 'PPP') : 'Select a date'}
      </Button>
      <Popover isOpen={isOpen}>
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
      </Popover>
    </Wrapper>
  )
}
