'use client'
import React, { useState, useEffect } from 'react'
import HeadingGroup from '@/components/UI/heading/heading-group'
import LoginForm from './login-form'
import Loading from '@/app/(preview)/loading'

async function LoginPage() {
  const [isFormLoaded, setIsFormLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFormLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-5 px-8 pt-14 md:py-10 md:w-[476px] md:px-10">
      {isFormLoaded ? (
        <>
          <HeadingGroup
            title="Create account"
            subtitle="Let's get you started sharing your links!"
          />
          <LoginForm />
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default LoginPage
