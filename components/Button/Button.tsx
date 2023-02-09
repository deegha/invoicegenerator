import styled, { css } from 'styled-components'
import { colorWhite } from 'styles/commonStyles'

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
  ${({ type }) => {
    if (type === 'primary') {
      return css`
        background: linear-gradient(91.59deg, #2a124f -9.44%, #3f0a44 104.7%);
        width: 100%;
      `
    }

    if (type === 'secondary') {
      return css`
        background: #61c1bb;
        width: 103px;
      `
    }
  }}
  border:none;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  ${colorWhite}
  height: 27px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
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
