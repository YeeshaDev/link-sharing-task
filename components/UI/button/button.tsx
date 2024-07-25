'use client'
import { useFormStatus } from 'react-dom'
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  style: 'primary' | 'secondary'
  disabled?: boolean
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  children,
  style,
  disabled = false,
  onClick,
}) => {
  const { pending } = useFormStatus()
  let buttonStyle: string

  switch (style) {
    case 'primary':
      buttonStyle = `block w-full bg-primary-index hover:bg-primary-hover text-white text-sm font-medium rounded-md px-4 md:px-8 py-3 transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.03] disabled:opacity-50 hover:drop-shadow-xl disabled:cursor-not-allowed  disabled:bg-primary-index/50 disabled:shadow-none disabled:hover:shadow-none disabled:hover:scale-100 disabled:hover:bg-primary-index/50 disabled:hover:bg-primary-index disabled:hover:drop-shadow-none ${
        pending ? 'cursor-not-allowed cursor-wait' : ''
      }`
      break
    case 'secondary':
      buttonStyle = `block w-full bg-white border border-solid border-primary-index hover:bg-neutral-light-purple text-primary-index text-sm hover:scale-[1.03] font-medium rounded-md px-4 md:px-8 py-3 transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:text-neutral-grey disabled:border-neutral-borders disabled:bg-neutral-light-grey ${
        pending ? 'animate-pulse cursor-wait' : ''
      }`
      break

    default:
      buttonStyle = ''
      break
  }

  return (
    <button
      aria-disabled={pending}
      className={buttonStyle}
      disabled={disabled || pending}
      onClick={onClick}
    >
      {pending ? 'Submitting' : children}
    </button>
  )
}

export default Button
