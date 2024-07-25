import { Instrument_Sans } from 'next/font/google'
import { Suspense } from 'react'
import '../globals.css'
import PreviewHeader from '@/components/header/preview-header'
import { Toaster } from 'react-hot-toast'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
})
export const metadata = {
  title: 'Devlinks Link Sharing App',
  description: 'This is an HNG task given to improve your skills',
}

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={` h-screen box-border overflow-auto ${instrumentSans.className}`}
      >
        <PreviewHeader />
        <div className="hidden md:block absolute top-0 right-0 w-full h-[40vh] rounded-bl-3xl rounded-br-3xl bg-primary-index -z-10" />
        <div className="md:w-full md:flex md:items-center md:justify-center md:mt-20 lg:mt-10 md:pb-20">
          <main className="box-border w-full md:w-[50%] lg:w-[25%] md:rounded-3xl md:p-1 md:shadow-2xl bg-white">
            <Toaster
              position="bottom-center"
              toastOptions={{
                duration: 5000,
                style: { background: '#333333', color: '#FAFAFA' },
              }}
            />
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
