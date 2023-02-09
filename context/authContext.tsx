import React, { useContext, useState, useEffect } from 'react'
import {
  onAuthStateChanged,
  signOut,
  User,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from 'utils/firebase'

interface IAuthContext {
  authenticated: boolean | 'loading'
  loading: boolean
  user: unknown
  logout: () => void
  login: () => void
}

interface IProps {
  children: React.ReactNode
}

const authContextDefaultValues: IAuthContext = {
  authenticated: false,
  user: {},
  loading: false,
  logout: () => {
    return false
  },
  login: () => {
    return false
  },
}

const AuthContext = React.createContext(authContextDefaultValues)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean | 'loading'>(
    'loading'
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
      setAuthenticated(firebaseUser ? true : false)
    })
    return () => unsubscribe()
  }, [])

  const logout = () => {
    console.log('signing out')
    signOut(auth)
  }

  const login = async () => {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()
    return await signInWithPopup(auth, provider)
  }
  // console.log(user, authenticated, 'authenticated')
  const value = {
    authenticated,
    loading,
    user,
    logout,
    login,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
