import Link from 'next/link'
import styled from 'styled-components'
import { Home, Settings, BookOpen } from 'react-feather'
import { ReactNode } from 'react'
import {
  backgroundColor,
  BackgroundLinearGradient,
  colorInactive,
  colorWhite,
} from 'styles/commonStyles'
import { useAuth } from 'context/authContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Loading } from 'components'
import Image from 'next/image'

interface IProps {
  children: React.ReactNode
}

type TPageUrl =
  | ''
  | 'settings'
  | 'invoice-history'
  | 'invoice'
  | 'payments'
  | 'users'

export interface Ipage {
  name: string
  icon: ReactNode
  url: TPageUrl
}

const links: Array<Ipage> = [
  {
    name: 'Generate Invoice',
    icon: <Home />,
    url: '',
  },
  {
    name: 'Invoice History',
    icon: <BookOpen />,
    url: 'invoice-history',
  },
  {
    name: 'Settings',
    icon: <Settings />,
    url: 'settings',
  },
]

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  ${backgroundColor};
`

const MenuBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 2;

  ${BackgroundLinearGradient}
`

const MenuBar = styled.div`
  width: 954px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 5px;
  ul {
    display: flex;
    padding: 0;
    margin: 0;
    gap: 20px;

    li {
      list-style: none;
      cursor: pointer;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 18px;
      height: 21px;
      ${colorInactive}
      transition: all 0.2s;
      &:hover {
        ${colorWhite}
      }
    }
  }
`

const LogOutBtn = styled.div`
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  height: 21px;
  ${colorInactive}
  transition: all 0.2s;
  &:hover {
    ${colorWhite}
  }
`

const Content = styled.main`
  padding: 100px 0 37px 0;
`

export const Layout: React.FC<IProps> = ({ children }) => {
  const { authenticated, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authenticated) {
      router && router.push('login')
    }
  }, [authenticated])

  if (authenticated === 'loading') return <Loading />

  return (
    <Container>
      <MenuBarContainer>
        <MenuBar>
          <NavContainer>
            <Image
              src="/Invoicegen-logo-2.png"
              width="50"
              height="50"
              alt="invoice gen logo"
            />
            <ul>
              {links.map((link) => {
                return (
                  <Link href={`/${link.url}`} key={link.url}>
                    <li>{link.name}</li>
                  </Link>
                )
              })}
            </ul>
          </NavContainer>
          <LogOutBtn onClick={logout}>Logout</LogOutBtn>
        </MenuBar>
      </MenuBarContainer>
      <Content>{children}</Content>
    </Container>
  )
}
