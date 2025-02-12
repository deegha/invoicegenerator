import styled, { keyframes } from 'styled-components'
import { colorWhite } from 'styles/commonStyles'

const fadeInAnimation = keyframes`
  0% { opacity: 0; transform: translateY(-50px);}
  100% { opacity: 1; transform: translateY(0);}
`

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  background: linear-gradient(143.19deg, #2b124f -7.07%, #3e0943 85.27%);
  ${colorWhite}
  animation: ${fadeInAnimation} 0.8s ease-in-out;
`

const Loader = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #fff;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${rotateAnimation} 1.5s linear infinite;
  margin-bottom: 20px;
`

const Heading = styled.h1`
  font-size: 30px;
  font-weight: 400;
  text-align: center;
  opacity: 0;
  animation: ${fadeInAnimation} 1.5s ease-out forwards;
  animation-delay: 1s;
`

export const Loading = () => {
  return (
    <Container>
      <Loader />
      <Heading>One sec</Heading>
    </Container>
  )
}
