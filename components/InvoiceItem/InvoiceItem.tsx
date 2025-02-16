import styled, { keyframes } from 'styled-components'
import { TextInput } from 'components/'
import { XCircle } from 'react-feather'
import { useCur } from 'context/currencyContext'

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

const ContainerReadOnly = styled.div`
  display: grid;
  grid-template-columns: 58% 13% 12% 12%;
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
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  gap: 6px;
`

export const AmountReadOnly = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  gap: 2px;
`

const ReadItem = styled.div`
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  color: #000000;
  display: flex;
  align-items: center;
  gap: 2px;
`

const ReadDiscription = styled.div`
  padding-left: 10px;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px
  color: #000000;
`

const CloseBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  svg {
    cursor: pointer;
  }
`

const CurrencyIcon = styled.div`
  font-size: 12px;
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
  const { activeCur } = useCur()
  const handleDescription = (value: string | number, name: string) => {
    if (changeDes) changeDes(value, id, name)
  }

  if (readonly) {
    return (
      <ContainerReadOnly>
        <ReadDiscription>{description}</ReadDiscription>
        <ReadItem>{quanity}</ReadItem>
        <ReadItem>
          <CurrencyIcon>{activeCur.currencyCode}</CurrencyIcon>
          {rate}
        </ReadItem>
        <AmountReadOnly>
          <CurrencyIcon>{activeCur.currencyCode}</CurrencyIcon>
          {amount}
        </AmountReadOnly>
      </ContainerReadOnly>
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
        icon={<CurrencyIcon>{activeCur.currencyCode}</CurrencyIcon>}
        value={rate}
        name="rate"
        onChangeText={handleDescription}
        type="number"
        placeHolder="0"
      />
      <Amount>
        <CurrencyIcon>{activeCur.currencyCode}</CurrencyIcon>
        {amount}
      </Amount>
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
