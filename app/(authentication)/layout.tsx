import { Instrument_Sans } from 'next/font/google'
import '../globals.css'
import Provider from './provider'
import AuthHeader from '@/components/header/auth-header'
import { Toaster } from 'react-hot-toast'
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
})
export const metadata = {
  title: 'Devlinks App',
  description: 'This is an HNG task given to improve your skills',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`h-screen box-border  ${instrumentSans.className}`}>
        <Provider>
          <div className="overflow-hidden md:h-screen md:w-full md:flex md:flex-col  md:items-center md:justify-center bg-neutral-light-grey">
            <AuthHeader />
            <Toaster
              position="bottom-center"
              toastOptions={{
                duration: 5000,
                style: { background: '#333333', color: '#FAFAFA' },
              }}
            />
            <main className="bg-white mx-5 sm:mx-0 md:rounded-xl">
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
  )
}
