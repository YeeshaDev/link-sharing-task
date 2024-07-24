'use client'

import { auth } from '@/firebase-config'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loading from '@/components/UI/loading/loading'
import { createContext, useContext, useEffect, ReactNode } from 'react'
import { logout } from '@/lib/actions/auth'

interface AuthContextType {
  user: any
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthContextProvider')
  }
  return context
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, loading] = useAuthState(auth)
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

interface RouteProtectionProps {
  children: ReactNode
}

export const RouteProtection: React.FC<RouteProtectionProps> = ({
  children,
}) => {
  const { user, loading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/register')
    }
  }, [loading, user, router])

  if (loading) {
    return <Loading />
  }

  if (user) {
    return <>{children}</>
  }

  return null
}

interface AuthRouteProtectionProps {
  children: ReactNode
}

export const AuthRouteProtection: React.FC<AuthRouteProtectionProps> = ({
  children,
}) => {
  useEffect(() => {
    logout()
  }, [])

  return <>{children}</>
}
