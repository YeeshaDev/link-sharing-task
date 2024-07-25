'use client'

import { useFormState } from 'react-dom'
import { signup } from '@/lib/actions/auth'
import AuthForm from '@/components/UI/form/auth-form'
import { useEffect, useState } from 'react'

const RegisterForm: React.FC = () => {
  const [state, action] = useFormState(signup, undefined)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? (
    <AuthForm action={action} state={state} type="register" />
  ) : null
}

export default RegisterForm
