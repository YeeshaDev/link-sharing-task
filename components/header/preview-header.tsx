'use client'

import Link from 'next/link'
import Button from '../UI/button/button'
import toast from 'react-hot-toast'
import { auth } from '@/firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'
import CopiedIcon from '../UI/icons/link-copied-clipboard'
import React from 'react'

const PageHeader: React.FC = () => {
  const [user] = useAuthState(auth)
  const isAuthenticated = !!user

  const copyCurrentURL = () => {
    const currentURL = window.location.href

    const tempInputField = document.createElement('input')
    tempInputField.value = currentURL
    document.body.appendChild(tempInputField)

    tempInputField.select()
    document.execCommand('copy')

    document.body.removeChild(tempInputField)

    toast('Link copied to your clipboard!', {
      icon: <CopiedIcon />,
    })
  }

  return (
    <header className="w-full h-[78px] md:p-4">
      {isAuthenticated && (
        <div className="p-4 flex items-center justify-between gap-3 md:bg-white md:rounded-xl">
          <div className="flex-1 md:flex-none">
            <Link
              href="/customize-links"
              className="block w-full bg-white border border-solid border-primary-index hover:bg-neutral-light-purple text-primary-index text-sm font-bold rounded-md px-4 py-3 transition-colors duration-300 ease-in-out text-center"
            >
              Back to Editor
            </Link>
          </div>
          <div className="flex-1 md:flex-none">
            <Button style={'primary'} onClick={copyCurrentURL}>
              Share Link
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default PageHeader
