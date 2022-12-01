import styled, { keyframes } from 'styled-components'
import { TextInput } from 'components/'
import { XCircle } from 'react-feather'

const slideIn = keyframes`
 0% { transform: translateY(-10px); opacity: 0 }
 100% { transform: translateY(0px); opacity: 1}
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 60% 10% 10% 10% 5%;
  column-gap: 5px;
  animation-name: ${slideIn};
  animation-duration: 0.2s;
  margin: 5px 0;
`

export const Amount = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`

const ReadItem = styled.div``

const CloseBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  svg {
    cursor: pointer;
  }
`

interface IInvoiceItem {
  readonly?: boolean
  id: string
  description: string
  quanity: number
  rate: number
  amount: number
  changeDes?: (value: string | number, id: string, name: string) => void
  removeItem?: (id: string) => void
}

export const InvoiceItem: React.FC<IInvoiceItem> = ({
  description,
  quanity,
  rate,
  amount,
  changeDes,
  id,
  removeItem,
  readonly,
}) => {
  const handleDescription = (value: string | number, name: string) => {
    if (changeDes) changeDes(value, id, name)
  }

  if (readonly) {
    return (
      <Container>
        <ReadItem>{description}</ReadItem>
        <ReadItem>{quanity}</ReadItem>
        <ReadItem>{rate}</ReadItem>
        <Amount>{amount}</Amount>
      </Container>
    )
  }
  return (
    <Container>
      <TextInput
        value={description}
        name="description"
        onChangeText={handleDescription}
        type="text"
        placeHolder="Describe what you did"
      />
      <TextInput
        value={quanity}
        name="quanity"
        onChangeText={handleDescription}
        type="number"
        placeHolder="1"
      />
      <TextInput
        value={rate}
        name="rate"
        onChangeText={handleDescription}
        type="number"
        placeHolder="0"
      />
      <Amount>{amount}</Amount>
      <CloseBtn>
        <XCircle
          size={14}
          color={'#8f9dad'}
          onClick={() => removeItem && removeItem(id)}
        />
      </CloseBtn>
    </Container>
  )
}
