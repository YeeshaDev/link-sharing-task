import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function LandingHeader() {
  return (
    <header className="box-border w-full pt-8 pb-4 px-6">
      <Link href="/">
        <Image
          width={100}
          height={100}
          src={'/images/logo-devlinks-large.svg'}
          alt="devlinks logo"
          priority
        />
      </Link>
    </header>
  )
}

export default LandingHeader
