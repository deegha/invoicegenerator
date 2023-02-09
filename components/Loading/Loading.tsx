import styled, { keyframes } from 'styled-components'
import { colorWhite } from 'styles/commonStyles'

const breatheAnimation = keyframes`
  0% { opacity: 0; transform: translateY(-100px); border-radius: 100%;}  
  100% { opacity: 1; transform: translateY(0); border-radius: 0;}
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 60px;
  animation-name: ${breatheAnimation};
  animation-duration: 0.2s;
  background: linear-gradient(143.19deg, #2b124f -7.07%, #3e0943 85.27%);
  ${colorWhite}
`

export const Loading = () => {
  return (
    <Container>
      <h1>One sec</h1>
    </Container>
  )
}
