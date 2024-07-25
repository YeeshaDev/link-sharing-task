import { Instrument_Sans } from 'next/font/google'
import '../globals.css'
import Provider from './provider'
import DashboardHeader from '@/components/header/dashboard-header'
import { Toaster } from 'react-hot-toast'
import PhoneMockup from '@/components/phone-mockup/phone-mockup'
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Devlinks Lnk Sharing App',
  description: 'This is an HNG task given to improve your skills',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`h-screen box-border overflow-auto ${instrumentSans.className}`}
      >
        <Provider>
          <main>
            <DashboardHeader />
            <div className="box-border bg-neutral-light-grey p-4 pb-20 lg:flex lg:gap-5">
              <div className="hidden lg:flex w-5/12 items-center justify-center bg-white rounded-xl">
                <PhoneMockup />
              </div>
              <div className="flex lg:w-7/12 lg:h-[810px] flex-col gap-10 bg-white rounded-xl pt-6 pb-4 md:pt-10">
                {children}
              </div>
            </div>
            <Toaster
              position="bottom-center"
              toastOptions={{
                duration: 5000,
                style: { background: '#333333', color: '#FAFAFA' },
              }}
            />
          </main>
        </Provider>
      </body>
    </html>
  )
}
