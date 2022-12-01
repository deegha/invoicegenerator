import { useState } from 'react'
import styled from 'styled-components'

export type Option = {
  value: string
  label: string
}

interface ISelectProps {
  options: Array<Option>
  selected: Option | undefined
  onSelect: (option: Option) => void
}

const Container = styled.div`
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #ced6e0;
  border-radius: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
`
const OptionsContainer = styled.div`
  padding: 10px;
  height: 400px;
  /* overflow: scroll; */
  position: absolute;
  z-index: 2;
  width: 100%;
  background-color: #fff;
  top: 42px;
  overflow: scroll;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`

const Selected = styled.div`
  cursor: pointer;
`

const OptionItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  margin: 2px 0;
  cursor: pointer;

  &:hover {
    background-color: #e8ecef;
  }
`

export const Select: React.FC<ISelectProps> = ({
  options,
  selected,
  onSelect,
}) => {
  const [visible, setVisible] = useState<boolean>(false)

  const chnageVisibility = (visibility: boolean) => {
    setVisible(visibility)
  }

  const handleOnSelect = (item: Option) => {
    onSelect(item)
    chnageVisibility(false)
  }

  return (
    <Container>
      <Selected onClick={() => chnageVisibility(!visible)}>
        {selected?.value ? selected.label : 'Select option'}
      </Selected>
      {visible && (
        <OptionsContainer>
          <div>
            {options.map((item) => (
              <OptionItem
                key={item.value + item.label}
                onClick={() => handleOnSelect(item)}
              >
                {item.label}
              </OptionItem>
            ))}
          </div>
        </OptionsContainer>
      )}
    </Container>
  )
}
