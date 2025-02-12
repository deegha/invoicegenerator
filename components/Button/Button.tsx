import styled, { css } from 'styled-components'
import { colorWhite } from 'styles/commonStyles'

type Button = 'primary' | 'secondary' | 'warning' | 'success'

interface IButtonProps {
  value: string
  action: () => void
  type: Button
  loading?: boolean
  disabled?: boolean // New prop to handle disabled state
}

const ButtonContainer = styled.div<{
  type: Button
  disabled?: boolean
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

  border: none;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  ${colorWhite}
  height: 27px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  transition: all 0.3s ease-in-out; /* Adding smooth transition for all properties */
  transform: ${({ disabled }) =>
    disabled ? 'scale(0.95)' : 'scale(1)'}; /* Slight shrink when disabled */
  background: ${({ disabled, type }) =>
    disabled
      ? type === 'primary'
        ? 'linear-gradient(91.59deg, #2a124f -9.44%, #3f0a44 104.7%)'
        : '#61c1bb'
      : type === 'primary'
      ? 'linear-gradient(91.59deg, #5f2a8a -9.44%, #9f0b79 104.7%)'
      : '#48b29e'}; /* Lighter/darker background for disabled vs enabled */
`

export const Button: React.FC<IButtonProps> = ({
  value,
  action,
  type,
  loading,
  disabled,
}) => {
  const handleOnClick = () => {
    if (!loading && !disabled) {
      action()
    }
  }

  return (
    <ButtonContainer onClick={handleOnClick} type={type} disabled={disabled}>
      {loading ? 'Loading' : value}
    </ButtonContainer>
  )
}
