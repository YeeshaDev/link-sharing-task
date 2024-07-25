'use client'
import React, { useState, useEffect } from 'react'
import HeadingGroup from '@/components/UI/heading/heading-group'
import Loading from '@/components/UI/loading/loading'
import RegisterForm from './register-form'

function RegisterPage() {
  const [isFormLoaded, setIsFormLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFormLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-5 px-8 pt-14 md:py-10 md:w-[476px] md:px-10 overflow-x-hidden  ">
      {isFormLoaded ? (
        <>
          <HeadingGroup
            title="Create account"
            subtitle="Let's get you started sharing your links!"
          />
          <RegisterForm />
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default RegisterPage
