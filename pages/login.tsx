import styled from 'styled-components'
import { backgroundColorWhite } from 'styles/commonStyles'
import { useAuth } from 'context/authContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { LogIn } from 'react-feather'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background: ${backgroundColorWhite};
`

const RightSide = styled.div`
  flex: 1;
  background: url('/finance.jpg') center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
`

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px;
  max-width: 400px;
`

const Heading = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
`

const TagLine = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.5;
`

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #db4437;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #c1351d;
  }
`

const BottomBar = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #888;
`

const BottomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
`

const LoginPage = () => {
  const { login, authenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (authenticated) {
      router.push('/')
    }
  }, [authenticated, router])

  return (
    <Container>
      <RightSide>
        <Overlay />
      </RightSide>
      <LeftSide>
        <Content>
          <Heading>Welcome Back</Heading>
          <TagLine>
            Sign in with Google to continue. If you don&lsquo;t have an account,
            one will be created for you.
          </TagLine>
          <LoginButton onClick={login}>
            <LogIn size={20} /> Continue with Google
          </LoginButton>
          <BottomBar>
            <BottomLink href="/privacy_policy">Privacy Policy</BottomLink>
            <BottomLink href="/blog">Blog</BottomLink>
            <BottomLink href="/contact">Contact</BottomLink>
          </BottomBar>
        </Content>
      </LeftSide>
    </Container>
  )
}

export default LoginPage
