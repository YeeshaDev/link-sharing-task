'use client'

import { useFormState } from 'react-dom'
import { signin } from '@/lib/actions/auth'
import AuthForm from '@/components/UI/form/auth-form'
import { useEffect, useState } from 'react'

const LoginForm: React.FC = () => {
  const [state, action] = useFormState(signin, undefined)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? <AuthForm action={action} state={state} /> : null
}

export default LoginForm
