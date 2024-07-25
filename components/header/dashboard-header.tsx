'use client'

import Link from 'next/link'
import Tabs from '../UI/tabs/tabs'
import Image from 'next/image'
import PreviewIcon from '../UI/icons/preview'
import { useAuthContext } from '@/app/auth-listener'

export default function DashboardHeader() {
  const { user } = useAuthContext()
  return (
    <div className="md:bg-neutral-light-grey md:pt-4 md:px-4">
      <header className="flex items-center justify-between px-5 py-4 md:bg-white md:rounded-xl">
        {/* sm logo */}
        <Link href="/" className="md:hidden">
          <Image
            src="/images/logo-devlinks-small.svg"
            alt="devlinks logo"
            width={42}
            height={42}
            priority
          />
        </Link>
        {/* md logo */}
        <Link href="/" className="hidden md:block">
          <Image
            src="/images/logo-devlinks-large.svg"
            alt="devlinks logo"
            width={146}
            height={32}
            priority
          />
        </Link>
        {/* sm tabs */}
        <Tabs className="md:hidden">
          <Tabs.Item id={'/customize-links'} href={`/customize-links`}>
            <Tabs.Title></Tabs.Title>
          </Tabs.Item>
          <Tabs.Item id={'/profile-details'} href={`/profile-details`}>
            <Tabs.Title></Tabs.Title>
          </Tabs.Item>
        </Tabs>
        {/* md tabs */}
        <Tabs className="hidden md:block">
          <Tabs.Item id={'/customize-links'} href={`/customize-links`}>
            <Tabs.Title>Links</Tabs.Title>
          </Tabs.Item>
          <Tabs.Item id={'/profile-details'} href={`/profile-details`}>
            <Tabs.Title>Profile Details</Tabs.Title>
          </Tabs.Item>
        </Tabs>
        {/* sm preview button */}
        <div className="md:hidden">
          <Link
            href={`/${user?.displayName}`}
            className="block w-full bg-white border border-solid border-primary-index hover:bg-neutral-light-purple text-primary-index text-sm font-semibold hover:scale-[1.03] rounded-md px-4 py-3 transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:text-neutral-grey disabled:border-neutral-borders disabled:bg-neutral-light-grey"
          >
            <PreviewIcon />
          </Link>
        </div>
        {/* md preview button */}
        <div className="hidden md:block">
          <Link
            href={`/${user?.displayName}`}
            className="block w-full bg-white border border-solid border-primary-index hover:bg-neutral-light-purple text-primary-index text-sm font-semibold hover:scale-[1.03] hover:transition-all hover:duration-400 rounded-md px-7 py-3 transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:text-neutral-grey disabled:border-neutral-borders disabled:bg-neutral-light-grey"
          >
            Preview
          </Link>
        </div>
      </header>
    </div>
  )
}
