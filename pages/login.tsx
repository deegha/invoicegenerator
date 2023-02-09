import styled from 'styled-components'
import { backgroundColorWhite } from 'styles/commonStyles'
import { useAuth } from 'context/authContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  height: 100vh;
  width: 100%;
`
const RightSide = styled.div`
  background: linear-gradient(143.19deg, #2b124f -7.07%, #3e0943 85.27%);
  display: flex;
  justify-content: center;
`
const HeroText = styled.div`
  margin-top: 20vh;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 700;
  font-size: 100px;
  line-height: 115px;
  background: linear-gradient(
    135.89deg,
    #ffffff -27.52%,
    rgba(255, 255, 255, 0) 103.66%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  width: 605px;
  height: 567px;
`

const LeftSide = styled.div`
  background: ${backgroundColorWhite};
  display: flex;
  justify-content: center;
`

const LeftInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2;
  margin-top: 20vh;
  padding: 20px;
`

const Heading = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 47px;
  width: 312px;
  color: #000000;
  padding: 0;
  margin: 0;
`
const TagLine = styled.div`
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  margin-top: 18px;
  color: #8a8d91;
  width: 186px;
`

const LoginButton = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  cursor: pointer;
  color: #ffffff;
  background: #db4437;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  width: 347px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 90px;
`

const BottomBar = styled.ul`
  display: flex;
  gap: 15px;
  position: fixed;
  bottom: 0;
  padding: 0;
`
const BottomBarItems = styled.li`
  list-style: none;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  cursor: pointer;
  color: #8a8d91;
`

const LoginPage = () => {
  const { login, authenticated } = useAuth()
  const router = useRouter()

  const doLogin = async () => {
    try {
      await login()
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (authenticated) {
      router.push('/')
    }
  }, [authenticated])

  return (
    <Container>
      <RightSide>
        <HeroText>Create and manage your invoices for FREE</HeroText>
      </RightSide>
      <LeftSide>
        <LeftInnerContainer>
          <Heading>Simply continue with google</Heading>
          <TagLine>
            If you have an account you will be logged in. Or else a new account
            will be created
          </TagLine>
          <LoginButton onClick={doLogin}>Continue with Google</LoginButton>
          <BottomBar>
            <BottomBarItems>Privacy Policy</BottomBarItems>
            <BottomBarItems>Blog</BottomBarItems>
            <BottomBarItems>Contact</BottomBarItems>
          </BottomBar>
        </LeftInnerContainer>
      </LeftSide>
    </Container>
  )
}

export default LoginPage
