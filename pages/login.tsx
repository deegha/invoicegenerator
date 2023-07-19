import styled from 'styled-components'
import { backgroundColorWhite } from 'styles/commonStyles'
import { useAuth } from 'context/authContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  height: 100vh;
  width: 100%;
`
const RightSide = styled.div`
  display: flex;
  background: url('/finance.jpg');
  background-size: cover;
  justify-content: center;
  position: relative;
`

const Overlay = styled.div`
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
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
  padding: 20px 40px;
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
  font-size: 14px;
  line-height: 14px;
  margin-top: 18px;
  color: #8a8d91;
  width: 200px;
`

const LoginButton = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 23px;
  cursor: pointer;
  color: #ffffff;
  background: #db4437;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  width: 347px;
  height: 40px;
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
        <Overlay />
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
            <BottomBarItems>
              <Link href="/privacy_policy">Privacy Policy</Link>
            </BottomBarItems>
            <BottomBarItems>Blog</BottomBarItems>
            <BottomBarItems>Contact</BottomBarItems>
          </BottomBar>
        </LeftInnerContainer>
      </LeftSide>
    </Container>
  )
}

export default LoginPage
