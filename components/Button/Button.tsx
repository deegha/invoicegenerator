import styled from 'styled-components'

type Button = 'primary' | 'secondary' | 'warning' | 'success'

interface IButtonProps {
  value: string
  action: () => void
  type: Button
  loading?: boolean
}

// const colors = {
//   primary: '#70a1ff',
//   secondary: '#5352ed',
//   warning: '#ff4757',
//   success: '#26de81',
// }

const ButtonContainer = styled.div<{
  type: Button
}>`
  padding: 15px 10px;
  width: 100%;
  background-color: #70a1ff;
  display: flex;
  justify-content: center;
  algin-items: center;
  border-radius: 0.3rem;
  color: #ffffff;
  cursor: pointer;
`

export const Button: React.FC<IButtonProps> = ({
  value,
  action,
  type,
  loading,
}) => {
  const handleOnclick = () => {
    !loading && action()
  }

  return (
    <ButtonContainer onClick={handleOnclick} type={type}>
      {loading ? 'Loading' : value}
    </ButtonContainer>
  )
}
