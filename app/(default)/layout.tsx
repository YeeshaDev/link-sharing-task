import React from 'react'
import { Instrument_Sans } from 'next/font/google'
import '../globals.css'
import { Toaster } from 'react-hot-toast'
import LandingHeader from '../../components/header/default-header'
import Main from '../../components/main/main'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Devlinks Link Sharing App',
  description: 'This is an HNG task given to improve your skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`h-screen box-border overflow-auto ${instrumentSans.className}`}
      >
        <LandingHeader />
        <Main>
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 5000,
              style: { background: '#333333', color: '#FAFAFA' },
            }}
          />
          {children}
        </Main>
      </body>
    </html>
  )
}
